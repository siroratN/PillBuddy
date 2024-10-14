
import { NextRequest, NextResponse } from 'next/server';
import { MedicineSchema, notification_medicines } from "../../../../drizzle/schema"
import { medicines } from "../../../../drizzle/schema"
import { db } from '../../../../drizzle/db';
import { eq } from 'drizzle-orm';

export async function GET(req:NextRequest, res:NextResponse){
    const allMedicines = await db.select().from(medicines)
    return NextResponse.json({ok: true, data: allMedicines}, {status: 200})
}