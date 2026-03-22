export const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Gym Management SaaS API',
    version: '1.0.0',
    description: 'Production-ready multi-tenant Gym Management SaaS backend.'
  },
  servers: [{ url: 'http://localhost:5000/api/v1' }],
  paths: {
    '/auth/login': { post: { summary: 'Login' } },
    '/members': { get: { summary: 'List members' }, post: { summary: 'Create member' } },
    '/payments': { post: { summary: 'Create payment' } }
  }
};
