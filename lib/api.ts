import { sql } from "@vercel/postgres";
import { QueryResult, QueryResultRow } from "pg";

export const updateVisitorCount = async () => {
  await sql`
    UPDATE visitors SET count = count + 1 WHERE id = 1;
  `;
};

export const getVisitorCount = async () => {
  const res: QueryResult<QueryResultRow> = await sql`
    SELECT count FROM visitors WHERE id = 1;
  `;

  const count: number = res.rows[0].count;

  return count;
};
