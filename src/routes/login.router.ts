import express from 'express';

const loginRouter = express.Router();

loginRouter.post('/login', login);

export default loginRouter;
