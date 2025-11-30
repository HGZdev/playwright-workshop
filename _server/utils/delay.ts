/**
 * Generates a delay for a Promise
 * @template T - type of the value to be resolved
 * @param ms - delay in milliseconds
 * @returns Promise that resolves after the specified delay
 */
// export const delay = <T>(ms: number = 500) => new Promise<T>((resolve) => setTimeout(resolve, ms));
export const delay = <T>(ms: number = 500) => new Promise<T>((resolve) => setTimeout(resolve, ms));

/**
 * Generates a random delay between min and max milliseconds
 * @param name - name of the delay instance, used for logging
 * @param min - minimum delay in milliseconds
 * @param max - maximum delay in milliseconds
 * @returns Promise that resolves after a random delay
 */
export const randomDelay = (name: string, min: number = 300, max: number = 500) => {
  const delayMs = Math.floor(Math.random() * (max - min + 1) + min);
  console.log(`[FORCE DELAY] [${name}]: ${delayMs}ms`);
  return delay(delayMs);
};
