import express from 'express';
import APIService from './db-layer/db.mjs';

const apiRouter = express.Router();

async function getChildrenData(parentId) {
  const db = new APIService();
  const result = await db.getChildren(parentId);
  return result;
}

apiRouter.get('/parent/:parentId', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.type('json');
  const parentId = req.params.parentId || '';
  const response = await getChildrenData(parentId);
  res.send(response);
});

apiRouter.get('/parent/', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.type('json');
  const response = await getChildrenData('');
  res.send(response);
});

export default apiRouter;
