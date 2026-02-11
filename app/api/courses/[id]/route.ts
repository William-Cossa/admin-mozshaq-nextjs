import { NextResponse } from "next/server";
import { readDb, writeDb } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = await readDb();
    const course = db.courses.find((c) => c.id === id);
    
    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }
    
    return NextResponse.json(course);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch course" }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const db = await readDb();
    
    const index = db.courses.findIndex((c) => c.id === id);
    if (index === -1) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }
    
    db.courses[index] = { ...db.courses[index], ...body };
    await writeDb(db);
    
    return NextResponse.json(db.courses[index]);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update course" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = await readDb();
    
    const index = db.courses.findIndex((c) => c.id === id);
    if (index === -1) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }
    
    db.courses.splice(index, 1);
    await writeDb(db);
    
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete course" }, { status: 500 });
  }
}
