import { NextResponse } from "next/server";
import { readDb, writeDb } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

export async function GET() {
  try {
    const db = await readDb();
    return NextResponse.json(db.courses);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = await readDb();
    
    const newCourse = {
      ...body,
      id: body.id || uuidv4(),
    };
    
    db.courses.push(newCourse);
    await writeDb(db);
    
    return NextResponse.json(newCourse, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create course" }, { status: 500 });
  }
}
