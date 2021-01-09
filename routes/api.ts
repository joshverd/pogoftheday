import express from 'express';
const router = express.Router();

// Types
import type { Db } from 'mongodb';
import GlobalObject from 'types/GlobalObject';

module.exports = (db: Db, global: GlobalObject) => {
  router.use('/today', require('./today/today')(db, global));
  router.use('/socialImage', require('./socialImage/socialImage')(db, global));

  return router;
}