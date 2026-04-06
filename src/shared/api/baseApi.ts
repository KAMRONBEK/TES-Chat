import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { env } from '@/shared/config/env';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: env.apiBaseUrl,
  }),
  tagTypes: ['Chat', 'Message'],
  endpoints: () => ({}),
});
