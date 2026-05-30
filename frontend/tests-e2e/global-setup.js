import { waitForBackend } from './utils/wait-for-services';

export default async () => {
  await waitForBackend();
};