export function sentError(res, statusCode, message) {
  res.status(statusCode).json({ 
    error:true,
    message
  });
}


