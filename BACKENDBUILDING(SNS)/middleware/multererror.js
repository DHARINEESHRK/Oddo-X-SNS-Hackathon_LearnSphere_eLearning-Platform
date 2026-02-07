const multer = require("multer");

const multerErrorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).json({
        message: "Invalid file field name"
      });
    }

    return res.status(400).json({
      message: err.message
    });
  }


  next(err);
};

module.exports = multerErrorHandler;
