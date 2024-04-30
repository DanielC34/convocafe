// // Middleware function to handle 404 Not Found errors 
// const notFoundError = (req, res, next) => {
//   const error = new Error(`Not found - ${req.originalUrl}`);
//   res.status(404);
//   next(error);
// };

// // Error handling middleware function that sets the status code based on the response status and sends a JSON response with error message and stack trace 
// const errorHandler = (error, req, res, next) => {
//   const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
//   res.status(statusCode);
//   res.json({
//     message: error.message,
//     stack: process.env.NODE_ENV === "production" ? null : error.stack,
//   });
// };

// module.exports = { notFoundError, errorHandler };
