import express from 'express';
const router = express.Router();

// Utils
import dayUtils from '../../utils/day';

// Types
import type { Db } from 'mongodb';
import type GlobalObject from 'types/GlobalObject';

module.exports = (db: Db, global: GlobalObject) => {
  router.post('/get', async (req, res) => {
    // Get the most recent pogchamp emote we found. 
    const emoteForToday = await dayUtils.getMostRecentEmoteDayObject({ db });

    if(!emoteForToday) return res.send({ success: false, message: "Error getting today's PogChamp. Please try again later." });

    return res.send({
      success: true,
      data: emoteForToday,
    });
  });

  return router;
}