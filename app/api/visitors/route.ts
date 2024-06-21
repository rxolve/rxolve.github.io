import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { QueryResult, QueryResultRow } from "pg";

export const GET = async () => {
  try {
    // 현재 방문자 수를 가져옴
    const res: QueryResult<QueryResultRow> = await sql`
      SELECT visit_count FROM visitors WHERE id = 1
    `;

    return NextResponse.json({ visitCount: res.rows[0].visit_count });
  } catch (err) {
    return NextResponse.json(
      { error: `Database query failed: ${err}` },
      { status: 500 }
    );
  }
};

export const PATCH = async () => {
  try {
    // 방문자 수를 증가시킴
    await sql`
      UPDATE visitors SET visit_count = visit_count + 1, last_visited = CURRENT_TIMESTAMP WHERE id = 1
    `;

    return NextResponse.json({ message: "OK" });
  } catch (err) {
    return NextResponse.json(
      { error: `Database query failed: ${err}` },
      { status: 500 }
    );
  }
};
