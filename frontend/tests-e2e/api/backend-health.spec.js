import { test, expect } from '@playwright/test';

test('backend health check', async ({ request }) => {

  const res = await request.get('https://coldstorageai.onrender.com/');

  expect(res.status()).toBe(200);
  expect(await res.text()).toContain('Cold Storage Backend Running');
});