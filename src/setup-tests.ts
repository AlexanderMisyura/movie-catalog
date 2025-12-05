import * as matchers from '@testing-library/jest-dom/matchers';

import { server } from '@/mocks/node';

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

expect.extend(matchers);
