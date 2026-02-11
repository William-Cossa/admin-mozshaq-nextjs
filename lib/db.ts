import fs from "fs/promises";
import path from "path";
import { Course, Enrollment } from "@/types/types";

const DB_PATH = path.join(process.cwd(), "db.json");

interface DbSchema {
  courses: Course[];
  enrollments: Enrollment[];
}

export async function readDb(): Promise<DbSchema> {
  const data = await fs.readFile(DB_PATH, "utf-8");
  return JSON.parse(data);
}

export async function writeDb(data: DbSchema): Promise<void> {
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
}
