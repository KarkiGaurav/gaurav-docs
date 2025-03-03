import { NextRequest, NextResponse } from "next/server";
import {  appendFile } from "fs/promises";
import path from "path";

const filePath = path.join(process.cwd(), "webhook_logs.json");

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const timestamp = new Date().toISOString();

    const logEntry = {
      timestamp,
      ...body,
    };

    console.log("Received webhook:", logEntry);

    // Read existing file content (if exists) and append new data
    await appendFile(filePath, JSON.stringify(logEntry, null, 2) + ",\n");

    return NextResponse.json({ message: "Webhook data saved" }, { status: 200 });
  } catch (error) {
    console.error("Error saving webhook data:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
