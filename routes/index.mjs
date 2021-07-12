import express from 'express';

import webRouter from './web.mjs';
import apiRouter from './api.mjs';

// const express = require('express');

const apiServer = express();
const port = 3000;

apiServer.get('/', (req, res) => {
  res.send(`API is up & running at port ${port}`);
});

apiServer.use('/web', webRouter);
apiServer.use('/api', apiRouter);

apiServer.listen(port, () => {
  // eslint-disable-next-line
  console.log(`API listening at http://localhost:${port}`);
});
