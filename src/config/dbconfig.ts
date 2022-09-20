import {Config, JsonDB} from 'node-json-db';

export let db: JsonDB;

export const initializeDB = (dbPath: string) => db = new JsonDB(new Config(dbPath, true, true, '/'));