/**
 * Generates a delay for a Promise
 * @template T - type of the value to be resolved
 * @param ms - delay in milliseconds
 * @returns Promise that resolves after the specified delay
 */
export const delay = <T>(ms: number = 500) => new Promise<T>((resolve) => setTimeout(resolve, ms));

/**
 * Generates a random delay (silent & deterministic in test env)
 * @template T - type of the value to be resolved
 * @param name - name of the delay instance, used for logging
 * @param min - minimum delay in milliseconds
 * @param max - maximum delay in milliseconds
 * @returns Promise that resolves after a random delay
 */
export const randomDelay = <T>(name: string, min: number = 300, max: number = 500) => {
  const isTest = process.env.NODE_ENV === 'test';
  const delayMs = isTest ? min : Math.floor(Math.random() * (max - min + 1) + min);
  if (!isTest) {
    console.log(`${name}: ${delayMs} ms delay`);
  }
  return delay<T>(delayMs);
};
