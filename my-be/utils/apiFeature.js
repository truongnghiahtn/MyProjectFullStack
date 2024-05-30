class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filter() {
    // filter những trường mà mình yêu cầu (vd chọn những trường money> 10)
    const queryObject = { ...this.queryString };
    const fields = ["page", "sort", "limit", "fields"];
    fields.forEach((item) => delete queryObject[item]);

    let queryStr = JSON.stringify(queryObject);
    queryStr = queryStr.replace(
      /\b(gte|gt|lte|regex|lt)\b/g,
      (match) => `$${match}`
    );
    const newQuery = JSON.parse(queryStr);
    this.query = this.query.find(newQuery);

    return this;
  }
  sort() {
    // sắp xếp những trường mà mình thích (sắp xếp xếp theo 1 trường nhất định)
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }
  limitFields() {
    // giới hạn các trường lại (giới hạn giữa liệu đầu ra cho api)
    if (this.queryString.fields) {
      const fieldsBy = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fieldsBy);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }
  paginate() {
    // cấu trúc phân trang
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    // this.total = this.query.countDocuments();
    this.query = this.query.skip((page - 1) * limit).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
