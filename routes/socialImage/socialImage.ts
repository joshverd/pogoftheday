import express from 'express';
const router = express.Router();
import axios from 'axios';

// Utils
import dayUtils from '../../utils/day';

// Types
import type { Db } from 'mongodb';
import GlobalObject from 'types/GlobalObject';

module.exports = (db: Db, global: GlobalObject) => {
  router.get('/get', async (req, res) => {
    // Get the most recent pogchamp emote we found. 
    const emoteForToday = await dayUtils.getMostRecentEmoteDayObject({ db });

    if(!emoteForToday) return res.status(500).send('');

    // Call the imgur URL of this emote
    const response = await axios.get<Buffer>(emoteForToday.emoteImageURL, {
      responseType: 'arraybuffer',
    });

    // The images are always PNG
    res.contentType('png');

    // Return the imgur URL
    return res.send(response.data);
  });

  return router;
}