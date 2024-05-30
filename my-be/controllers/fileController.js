const File = require("../models/fileModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const multer = require("multer");
const handleFactory = require("../controllers/handleFactory");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/files");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    const type = file.mimetype.split("/")[0];
    cb(null, `${type}-${req.user.id}-${Date.now()}.${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  const arrType = file.mimetype.split("/");
  const listfile = ["video", "image"];
  if (listfile.includes(arrType[0])) {
    cb(null, true); // Chấp nhận tệp
  } else {
    cb(new Error("Not a file accept! Please upload file again."), false); // Từ chối tệp
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

class FileController {
  uploadUserPhoto = upload.single("file");

  createFile = catchAsync(async (req, res, next) => {
    if (!req.file) {
      return next(new AppError("I can't find file! Please upload file", 400));
    }
    const type = req.file.filename.split("-")[0];
    const newFile = await File.create({
      filename: req.file.filename,
      url: `files/${req.file.filename}`,
      type: type,
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
  createFileByDriver = catchAsync(async (req, res, next) => {
    const newFile = await File.create({
      filename: req.body.filename,
      url: req.body.url,
      type: req.body.type,
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

  setUserId = (req, res, next) => {
    if (req.filterObj) {
      req.filterObj = { ...req.filterObj, user: req.user.id };
    } else {
      req.filterObj = { user: req.user.id };
    }
    next();
  };

  getAllFile = handleFactory.getAll(File);

  setDeleteFile = catchAsync(async (req, res, next) => {
    const file = await File.findOne({
      _id: req.params.id,
      user: req.user.id,
    }).select("+user");
    if (file) {
      if (!file?.status) {
        const filePath = `public/${file.url}`;
        fs.unlink(filePath, (err) => {
          if (err) {
            return next(new AppError("Cann't find file", 401));
          }
          next();
        });
      } else {
        //  nếu file chưa được ai sử dụng thì được phép xóa ... còn không thì cút
        file.user = null;
        await file.save();
        res.status(204).json({
          status: "success",
        });
      }
    } else {
      return next(new AppError("Cann't find file", 401));
    }
  });
  deleteFile = handleFactory.deleteOne(File);
}
module.exports = new FileController();
