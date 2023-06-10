export const API_BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://tgcs-competition-backend.fly.dev'
    : 'http://localhost:3000';
