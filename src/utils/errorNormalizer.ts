/**
 * Universal error normalizer for API responses by message and code
 */
export const errorNormalizer = (error: unknown): string => {
  let message = error as string;

  if ((error as Error).cause === '401') {
    message = 'Unauthorized';
  }

  if ((error as Error).stack === '500') {
    message = 'Internal Server Error';
  }

  if (error instanceof Error) {
    message = error.message;
  }

  return message;
};
