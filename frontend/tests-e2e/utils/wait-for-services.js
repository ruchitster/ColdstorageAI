export const waitForBackend = async () => {
  const res = await fetch('http://localhost:5000/');
  if (!res.ok) throw new Error('Backend not ready');
};