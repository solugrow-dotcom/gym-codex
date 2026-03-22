export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  if (process.env.NODE_ENV !== 'test') {
    console.error(err);
  }
  res.status(statusCode).json({
    status: 'error',
    message: err.message || 'Something went wrong',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};
