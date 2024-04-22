const File = require("../models/fileModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const multer = require("multer");
const sharp = require('sharp');
const handleFactory = require("../controllers/handleFactory");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/files");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  console.log(file.mimetype);
  if (file.mimetype.startsWith("image")) {
    cb(null, true); // Chấp nhận tệp
  } else {
    cb(new Error("Not an image! Please upload only images."), false); // Từ chối tệp
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});


class FileController {
  uploadUserPhoto = upload.single("photo");

  createFile = catchAsync(async (req, res, next) => {
    console.log(req);
    if (!req.file) {
      return next(new AppError("I can't find file! Please upload file", 400));
    }
    const newFile = await File.create({
      filename: req.file.filename,
      url: `files/${req.file.filename}`,
      type: "image",
      user: req.user.id,
    });
    res.status(201).json({
      status: "success",
      message: "You have successfully downloaded the file",
      data: {
        newFile,
      },
    });
  });

  getAllFile = handleFactory.getAll(File);
}
module.exports = new FileController();
