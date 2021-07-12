import proxy from 'koa-proxies';
import './routes/index.mjs';

export default {
  port: 8000,
  middleware: [
    proxy('/api/', {
      target: 'http://localhost:3000/',
    }),
  ],
};
