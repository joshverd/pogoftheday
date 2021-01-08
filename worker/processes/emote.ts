import axios from 'axios';
import crypto from 'crypto';

// Utils
import timeUtils from '../../utils/time';
import twitchUtils from '../../utils/twitch';
import imgurUtils from '../../utils/imgur';
import dayUtils from '../../utils/day';

// Types
import type { Db } from 'mongodb';
import type WorkerGlobalObject from 'types/WorkerGlobalObject';

module.exports = async (db: Db, global: WorkerGlobalObject) => {
  // Every minute, hit the twitch API and grab the PogChamp emote
  setInterval(async () => {
    const foundPogEmote = await twitchUtils.getPogchampTwitchEmote();
  
    // Get the emote image as a buffer
    const emoteImage = await twitchUtils.getEmoteImage({ emoteID: foundPogEmote.id });

    // Get the hash of the emote image we just grabbed
    const emoteImageHash = crypto.createHash('md5').update(emoteImage).digest('hex');

    // Get the current day's emote image
    const currentEmoteDayObject = await dayUtils.getEmoteDayObjectByDate({
      date: timeUtils.utc(),
      db,
    });

    // If no current emote day object was found, that means we haven't created a day object yet, so create one.
    if(!currentEmoteDayObject) {
      console.log('No day object, creating a new one.');

      // Upload image to imgur
      const imgurURL = await imgurUtils.uploadImageToImgur({ image: emoteImage });

      if(!imgurURL) return console.error('No imgur url returned.');

      // Create the emote day object
      await dayUtils.createEmoteDayObject({
        date: timeUtils.utc(),
        emoteImageHash,
        emoteImageURL: imgurURL,
        db,
      });

      // Return so the rest of this function doesn't run
      return console.log('Created new emote day');
    }

    // If the current emote day object's hash is the same as the emote image hash we just got, then we know we don't need to update the emote day
    if(emoteImageHash === currentEmoteDayObject.emoteImageHash) return console.log('Emotes were the same.');

    // Since the hashes did not match, upload the new emote to imgur and save it to the day's object
    const imgurURL = await imgurUtils.uploadImageToImgur({ image: emoteImage });

    if(!imgurURL) return console.error('No imgur url returned.');

    // Update day object
    const updatedEmoteDayObject = await dayUtils.updateEmoteDayObjectImage({
      emoteImageHash,
      emoteImageURL: imgurURL,
      date: timeUtils.utc(),
      db,
    });

    console.log('Updated emote day object', updatedEmoteDayObject);
  }, 1 * 60 * 1000);
} 