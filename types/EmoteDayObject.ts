// Types
import type { ObjectID } from 'mongodb';

type EmoteDayObject = {
  _id?: ObjectID,
  // All times are assumed to be UTC unless stated otherwise
  startOfDay: string,
  endOfDay: string,
  // Some general information about when this emote day was created
  dateInformation: {
    second: number,
    minute: number,
    hour: number,
    day: number,
    month: number,
    year: number,
  },
  // Hash of the raw image
  emoteImageHash: string,
  // The URL of the emoji 
  emoteImageURL: string,
  // When this object was last updated at
  lastUpdatedAt: string,
}

export default EmoteDayObject;