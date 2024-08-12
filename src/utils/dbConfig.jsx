import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from "./schema";
const sql = neon("postgresql://neondb_owner:xTmzg4IsF6YJ@ep-ancient-tooth-a5zeps6f.us-east-2.aws.neon.tech/neondb?sslmode=require");
export const db = drizzle(sql,{schema});