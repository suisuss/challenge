import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

const unknownError: string = 'Unknown Error';

type Detail = {
  path: string;
  message: string;
};

type ErrorResponse = {
  message: string;
  detail?: Detail[];
};

export const getErrorMsg = (
  error: FetchBaseQueryError | SerializedError | undefined
): ErrorResponse => {
  if (!error) {
    return { message: unknownError };
  }

  if ('status' in error) {
    const fetchError = error as FetchBaseQueryError;

    const apiError = fetchError.data as { error: string; detail: Detail[] };

    if (apiError?.error) {
      const { error, detail } = apiError;
      if (Array.isArray(detail) && detail.length > 0) {
        const fieldErrors = detail.map((d) => d.message).join(', ');
        return { message: fieldErrors, detail };
      }
      return { message: error, detail };
    }

    const errorMsg =
      'error' in fetchError
        ? fetchError.error
        : (fetchError.data as { message: string })?.message || unknownError;
    return { message: errorMsg };
  }

  const serializedError = error as SerializedError;
  const errorMsg = serializedError?.message || unknownError;
  return { message: errorMsg };
};
