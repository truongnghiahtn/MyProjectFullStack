const jwt = require("jsonwebtoken");
exports.filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};
exports.signJWT = (data,exp) => {
  // tạo token
  return jwt.sign({ data }, process.env.KEY_JWT, {
    expiresIn: exp,
  });
};

