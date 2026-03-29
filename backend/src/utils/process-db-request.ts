import { QueryResult, QueryResultRow } from "pg";
import { db } from "../config";
import { ERROR_MESSAGES } from "../constants";
import { ApiError } from "./api-error";

interface DBRequestParams {
  query: string;
  queryParams?: unknown[];
}

export const processDBRequest = async <T extends QueryResultRow = any>({
  query,
  queryParams,
}: DBRequestParams): Promise<QueryResult<T>> => {
  try {
    const result = await db.query<T>(query, queryParams);
    return result;
  } catch (error) {
    console.log(error);
    throw new ApiError(500, ERROR_MESSAGES.DATABASE_ERROR);
  }
};
