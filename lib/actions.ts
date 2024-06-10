"use server";

import { sql } from "@vercel/postgres";

export async function createText(formData: FormData) {
  const text: string = formData.get("text") as string;

  await sql`
    INSERT INTO test (text)
    VALUES (${text})
    `;
}
