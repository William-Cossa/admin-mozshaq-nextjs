import { NextRequest, NextResponse } from "next/server";
import { readDb, writeDb } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

export async function GET(req: NextRequest) {
  try {
    const db = await readDb();
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q")?.toLowerCase() || "";
    const status = searchParams.get("status") || "";
    const date = searchParams.get("date") || "";

    let payments = db.payments ?? [];

    if (q) {
      payments = payments.filter(
        (p) =>
          p.studentName.toLowerCase().includes(q) ||
          p.courseName.toLowerCase().includes(q) ||
          p.id.toLowerCase().includes(q),
      );
    }

    if (status) {
      payments = payments.filter((p) => p.status === status);
    }

    if (date) {
      payments = payments.filter((p) => p.createdAt.startsWith(date));
    }

    return NextResponse.json(payments);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch payments" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const db = await readDb();

    const newPayment = {
      id: `PAY-${uuidv4().slice(0, 6).toUpperCase()}`,
      status: "pending" as const,
      createdAt: new Date().toISOString(),
      ...body,
    };

    db.payments = [...(db.payments ?? []), newPayment];
    await writeDb(db);

    return NextResponse.json(newPayment, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create payment" },
      { status: 500 },
    );
  }
}
