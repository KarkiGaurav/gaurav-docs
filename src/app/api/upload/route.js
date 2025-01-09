import { NextResponse } from "next/server";
import * as XLSX from "xlsx";

export async function POST(req) {
  const data = await req.formData();
  const file = data.get("file");
  const buffer = Buffer.from(await file.arrayBuffer());

  // Parse the Excel file
  const workbook = XLSX.read(buffer, { type: "buffer" });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const jsonData = XLSX.utils.sheet_to_json(sheet);

  return NextResponse.json({ data: jsonData });
}
