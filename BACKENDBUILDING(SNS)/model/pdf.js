// model/pdf.js
const mongoose = require("mongoose");

const pdfSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    publicId: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pdf", pdfSchema);
