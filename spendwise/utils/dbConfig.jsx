import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema'

const sql = neon('postgresql://Expense-tracker_owner:wjTk2aril3VS@ep-snowy-sunset-a59sjfkk.us-east-2.aws.neon.tech/Expense-tracker?sslmode=require');
export const db = drizzle(sql , {schema});

