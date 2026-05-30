import { test, expect } from '@playwright/test';

test('auth API login works', async ({ request }) => {

  const res = await request.post('http://localhost:5000/api/auth/login', {
    data: {
      username: 'admin',
      password: 'admin123'
    }
  });

  expect(res.ok()).toBeTruthy();

  const data = await res.json();
  expect(data.token).toBeTruthy();
});