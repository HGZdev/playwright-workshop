/**
 * Generates a delay for a Promise
 * @template T - type of the value to be resolved
 * @param ms - delay in milliseconds
 * @returns Promise that resolves after the specified delay
 */
export const delay = <T>(ms: number = 500) => new Promise<T>((resolve) => setTimeout(resolve, ms));

/**
 * Generates a random delay between min and max (inclusive) for a Promise
 * @template T - type of the value to be resolved
 * @param min - minimum delay in milliseconds
 * @param max - maximum delay in milliseconds
 * @returns random delay in milliseconds
 */
export const randomDelay = <T>(name: string, min: number = 300, max: number = 500) => {
  const delayMs = Math.floor(Math.random() * (max - min + 1) + min);
  console.log(`${name}: ${delayMs} ms delay`);
  return delay<T>(delayMs);
};
