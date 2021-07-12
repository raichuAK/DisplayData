import proxy from 'koa-proxies';
import './routes/index.js';

export default {
  port: 8000,
  middleware: [
    proxy('/api/', {
      target: 'http://localhost:3000/',
    }),
  ],
};