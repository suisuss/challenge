import { QueryResult, QueryResultRow } from 'pg';
import { DatabaseError } from 'pg';
import { db } from '../config';
import { ApiError } from './api-error';

interface DBRequestParams {
  query: string;
  queryParams?: unknown[];
}

const getFriendlyDBError = (error: DatabaseError): string => {
  switch (error.code) {
    case '23503': {
      const match = error.detail?.match(/Key \((.+?)\)=\((.+?)\)/);
      const field = match?.[1]?.replace(/_/g, ' ') || 'record';
      return `Cannot complete this action because ${field} is still referenced by other records`;
    }
    case '23505': {
      const match = error.detail?.match(/Key \((.+?)\)=\((.+?)\)/);
      const field = match?.[1]?.replace(/_/g, ' ') || 'value';
      const value = match?.[2] || '';
      return `A record with this ${field} (${value}) already exists`;
    }
    case '23502': {
      const column = error.column?.replace(/_/g, ' ') || 'field';
      return `${column} is required and cannot be empty`;
    }
    default:
      return 'An error occurred while processing your request. Please try again later.';
  }
};

export const processDBRequest = async <T extends QueryResultRow = any>({
  query,
  queryParams
}: DBRequestParams): Promise<QueryResult<T>> => {
  try {
    const result = await db.query<T>(query, queryParams);
    return result;
  } catch (error) {
    console.error(error);
    if (error instanceof DatabaseError) {
      throw new ApiError(error.code === '23503' ? 409 : 500, getFriendlyDBError(error));
    }
    throw new ApiError(
      500,
      'An error occurred while processing your request. Please try again later.'
    );
  }
};
