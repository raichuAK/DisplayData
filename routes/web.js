import express from 'express';
import path from 'path';

const webRouter = express.Router();

webRouter.get('/view/*', (req, res) => {
  res.sendFile(path.join(process.cwd(), '/static/view.html'));
});

webRouter.get('/js/:jsName', (req, res) => {
  res.sendFile(path.join(process.cwd(), '/static/view.html'));
});

export default webRouter;
