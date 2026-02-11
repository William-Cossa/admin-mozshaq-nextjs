import { NextResponse } from "next/server";
import { readDb, writeDb } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = await readDb();
    const enrollment = db.enrollments.find((e) => e.id === id);
    
    if (!enrollment) {
      return NextResponse.json({ error: "Enrollment not found" }, { status: 404 });
    }
    
    return NextResponse.json(enrollment);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch enrollment" }, { status: 500 });
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
    
    const index = db.enrollments.findIndex((e) => e.id === id);
    if (index === -1) {
      return NextResponse.json({ error: "Enrollment not found" }, { status: 404 });
    }
    
    db.enrollments[index] = { ...db.enrollments[index], ...body };
    await writeDb(db);
    
    return NextResponse.json(db.enrollments[index]);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update enrollment" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = await readDb();
    
    const index = db.enrollments.findIndex((e) => e.id === id);
    if (index === -1) {
      return NextResponse.json({ error: "Enrollment not found" }, { status: 404 });
    }
    
    db.enrollments.splice(index, 1);
    await writeDb(db);
    
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete enrollment" }, { status: 500 });
  }
}
