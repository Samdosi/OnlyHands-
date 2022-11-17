const mongoose = require("mongoose");

const UploadSchema = new mongoose.Schema({
    fileName: {
        type: String,
        required: true,
    },
    file: {
        data: Buffer,
        contentType: String,
    },
});

const ImageUpload = mongoose.model("upload", UploadSchema);
module.exports = { ImageUpload };