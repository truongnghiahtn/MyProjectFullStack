const userRouter = require('./userRoutes');
function route(app) {
  app.use('/api/v1/users', userRouter);


  // app.all('*', (req, res, next) => {
  //   next(new appError(`Can't find ${req.originalUrl} on this server!`,404));
  // });
  // app.use(errorGlobal);
}
module.exports = route;