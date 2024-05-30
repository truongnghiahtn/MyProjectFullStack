const userRouter = require('./userRoutes');
const fileRouter = require('./fileRoutes');
const questionRouter = require('./questionRoutes');
const quizRouter = require('./quizRoutes');
const topicRouter = require('./topicRoutes')
const errorGlobal=require('../controllers/errorController');
const AppError = require("../utils/appError");
function route(app) {
  app.use('/api/v1/users', userRouter);
  app.use('/api/v1/files', fileRouter);
  app.use('/api/v1/questions',questionRouter);
  app.use('/api/v1/quizs',quizRouter);
  app.use('/api/v1/topic',topicRouter);
  app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`,404));
  });
  app.use(errorGlobal);
}
module.exports = route;
