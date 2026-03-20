import { NextRequest, NextResponse } from "next/server";
import { readDb, writeDb } from "@/lib/db";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const db = await readDb();
    const payment = (db.payments ?? []).find((p) => p.id === id);

    if (!payment) {
      return NextResponse.json({ error: "Payment not found" }, { status: 404 });
    }

    return NextResponse.json(payment);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch payment" },
      { status: 500 },
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const db = await readDb();

    const index = (db.payments ?? []).findIndex((p) => p.id === id);
    if (index === -1) {
      return NextResponse.json({ error: "Payment not found" }, { status: 404 });
    }

    db.payments[index] = { ...db.payments[index], ...body };
    await writeDb(db);

    return NextResponse.json(db.payments[index]);
  } catch {
    return NextResponse.json(
      { error: "Failed to update payment" },
      { status: 500 },
    );
  }
}
