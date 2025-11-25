export const resetDatabase = async () => {
  console.log('resetting database...');

  // Retry logic in case server is not ready yet
  const maxRetries = 5;
  const retryDelay = 1000; // 1 second

  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch('http://localhost:3001/api/reset', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error(`Reset failed with status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Database reset successful:', data.message);
      return; // Success, exit the function
    } catch (error) {
      console.log(`Attempt ${i + 1}/${maxRetries} failed:`, error);

      if (i === maxRetries - 1) {
        throw new Error(`Failed to reset database after ${maxRetries} attempts: ${error}`);
      }

      // Wait before retrying
      await new Promise((resolve) => setTimeout(resolve, retryDelay));
    }
  }
};
