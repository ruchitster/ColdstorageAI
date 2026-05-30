import { test, expect } from '@playwright/test';

test('auth API login works', async ({ request }) => {

  const res = await request.post(
    'https://coldstorageai.onrender.com/api/auth/login',
    {
      data: {
        username: 'admin',
        password: 'admin123'
      }
    }
  );

  expect(res.status()).toBe(200);

  const data = await res.json();
  expect(data.token).toBeTruthy();
});