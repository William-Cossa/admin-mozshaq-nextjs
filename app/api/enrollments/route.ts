import { NextResponse } from "next/server";
import { readDb, writeDb } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

export async function GET() {
  try {
    const db = await readDb();
    return NextResponse.json(db.enrollments);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch enrollments" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = await readDb();
    
    const newEnrollment = {
      ...body,
      id: body.id || `INS-${Math.floor(1000 + Math.random() * 9000)}`,
    };
    
    db.enrollments.push(newEnrollment);
    await writeDb(db);
    
    return NextResponse.json(newEnrollment, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create enrollment" }, { status: 500 });
  }
}
