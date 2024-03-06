import express from 'express';

const notFoundRoutes = express.Router();

import urlNotFound from '../controllers/notFound.controller.js';

notFoundRoutes.use('/*', urlNotFound);

export default notFoundRoutes;
