import { test as base, expect } from '@playwright/test';

export const test = base.extend({
  context: async ({ browser, baseURL }, use, testInfo) => {
    // page.on('request', (request) => {
    //   console.log(`[REQ]: ${request.method()} ${request.url()}`);
    // });

    const context = await browser.newContext({
      baseURL,
      extraHTTPHeaders: {
        'X-Test-Name': testInfo.titlePath.join(' -> '), // inject running test name
      },
    });
    // eslint-disable-next-line react-hooks/rules-of-hooks
    await use(context);
  },
});

export { expect };
