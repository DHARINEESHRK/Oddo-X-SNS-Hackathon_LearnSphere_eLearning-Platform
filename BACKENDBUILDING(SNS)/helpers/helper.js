// helpers/helper.js
const cloudinary = require("../config/cloudinary");

const uploadToCloudinary = async (filePath, mimetype) => {
  let resourceType;
  let fileType;

  switch (true) {
    case mimetype.startsWith("image"):
      resourceType = "image";
      fileType = "image";
      break;

    case mimetype.startsWith("video"):
      resourceType = "video";
      fileType = "video";
      break;

    case mimetype === "application/pdf":
      resourceType = "raw";
      fileType = "pdf";
      break;

    default:
      throw new Error("Unsupported file type");
  }

  const result = await cloudinary.uploader.upload(filePath, {
    resource_type: resourceType,
    folder: "uploads"
  });

  return {
    url: result.secure_url,
    publicId: result.public_id,
    fileType
  };
};

module.exports = {
  uploadToCloudinary
};
