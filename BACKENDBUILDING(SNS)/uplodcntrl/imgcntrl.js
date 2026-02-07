const Image = require("../model/image");
const Video = require("../model/video");
const Pdf = require("../model/pdf");

const { uploadToCloudinary } = require("../helpers/helper");
const fs = require("fs");

const uploadImgCtrl = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { url, publicId, fileType } = await uploadToCloudinary(
      req.file.path,
      req.file.mimetype
    );

    let savedFile;
    let finalUrl = url;

  
    switch (fileType) {
      case "image":
        savedFile = await Image.create({ url, publicId });
        break;

      case "video":
        savedFile = await Video.create({ url, publicId });
        break;

      case "pdf":
       
        finalUrl = url.replace("/upload/", "/upload/fl_attachment/");
        console.log(finalUrl);
        savedFile = await Pdf.create({
          url: finalUrl,
          publicId
        });
        break;

      default:
        return res.status(400).json({ message: "Unsupported file type" });
    }


    fs.unlinkSync(req.file.path);

    res.status(201).json({
      message: `${fileType.toUpperCase()} uploaded successfully`,
      file: {
        ...savedFile.toObject(),
        fileType
      }
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  uploadImgCtrl
};
