import axios from 'axios';

// Types
import type TwitchEmote from 'types/TwitchEmote';

export default {
  getPogchampTwitchEmote,
  getEmoteImage,
}

// Accepts an emote ID and returns a buffer of the raw image file from Twitch CDN
async function getEmoteImage(
  {
    emoteID,
  } : {
    emoteID: number,
  },
): Promise<Buffer> {
  // Generate a random number to add as a query parameter to (potentially) force a cache refresh
  const cacheBuster = Math.random() * 100_000_000;

  // Ping the twitch CDN to get the current PogChamp emoji
  const response = await axios.get<Buffer>(`http://static-cdn.jtvnw.net/emoticons/v1/${emoteID}/1.0?cache=${cacheBuster}`, {
    responseType: 'arraybuffer'
  });

  return response.data;
}

async function getPogchampTwitchEmote(): Promise<TwitchEmote> {
  type APIResponse = {
    emoticon_sets: {
      '0': TwitchEmote[],
    },
  }

  // Ping the twitch API for the '0' emoticon set, which are all the global emotes 
  const response = await axios.get<APIResponse>('https://api.twitch.tv/kraken/chat/emoticon_images?emotesets=0', {
    headers: {
      'Client-ID': process.env.TWITCH_CLIENT_ID,
      accept: 'application/vnd.twitchtv.v5+json',
    },
  });

  // Find the PogChamp emote
  const foundPogChampEmote = response.data.emoticon_sets[0].find(emote => {
    if(emote.code === 'PogChamp') return emote;

    return false;
  });

  if(!foundPogChampEmote) throw 'No pogchamp emote found on Twitch API.';

  return foundPogChampEmote;
} 