import { test as setup } from '@playwright/test';

setup('reset database', async () => {
  console.log('resetting database...');

  await fetch('http://localhost:3001/api/reset', {
    method: 'POST',
  });
});
