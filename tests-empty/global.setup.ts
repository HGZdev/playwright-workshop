import { test as setup } from '@playwright/test';
import { resetDatabase } from './utils/resetDatabase.js';

setup('setup', async () => {
  await resetDatabase();
});
