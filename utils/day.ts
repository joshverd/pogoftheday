// Constants
import DatabaseCollections from '../constants/DatabaseCollections';

// Types
import type { Dayjs } from 'dayjs';
import type { Db } from 'mongodb';
import type EmoteDayObject from 'types/EmoteDayObject';

export default {
  getEmoteDayObjectByDate,
  createEmoteDayObject,
  updateEmoteDayObjectImage,
}

async function updateEmoteDayObjectImage(
  {
    emoteImageHash,
    emoteImageURL,
    date,
    db,
  } : {
    emoteImageHash: string,
    emoteImageURL: string,
    date: Dayjs,
    db: Db,
  },
): Promise<EmoteDayObject | undefined> {
  const newEmoteDayObject = await db.collection<EmoteDayObject>(DatabaseCollections.days).findOneAndUpdate(
    {
      startOfDay: date.startOf('day').toISOString(),
    },
    {
      $set: {
        emoteImageHash,
        emoteImageURL,
      },
    },
    {
      returnOriginal: false,
    },
  );

  return newEmoteDayObject.value;
}

async function createEmoteDayObject(
  {
    date,
    emoteImageHash,
    emoteImageURL,
    db,
  } : {
    date: Dayjs,
    emoteImageHash: string,
    emoteImageURL: string,
    db: Db,
  }
): Promise<EmoteDayObject> {
  // Create the new emote day object
  const newEmoteDayObject: EmoteDayObject = {
    startOfDay: date.startOf('day').toISOString(),
    endOfDay: date.endOf('day').toISOString(),
    dateInformation: {
      second: date.get('second'),
      minute: date.get('minute'),
      hour: date.get('hour'),
      day: date.get('day'),
      month: date.get('month'),
      year: date.get('year'),
    },
    emoteImageHash,
    emoteImageURL,
  };

  // Insert new emote day object
  await db.collection(DatabaseCollections.days).insertOne(newEmoteDayObject);

  return newEmoteDayObject;
}

// Accepts a Dayjs date object and returns the day object for that day if found
async function getEmoteDayObjectByDate(
  {
    date,
    db,
  } : {
    date: Dayjs,
    db: Db,
  },
): Promise<EmoteDayObject | null> {
  // The start of the date requested in the form of an ISO string
  const startOfDayISOString = date.startOf('day').toISOString();

  // Lookup the start date in the db
  const foundEmoteDayObject = await db.collection(DatabaseCollections.days).findOne<EmoteDayObject>({
    startOfDay: startOfDayISOString,
  });

  // Return results
  return foundEmoteDayObject;
} 