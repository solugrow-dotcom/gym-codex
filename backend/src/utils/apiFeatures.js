export class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    ['page', 'sort', 'limit', 'fields', 'search'].forEach((field) => delete queryObj[field]);
    this.query = this.query.find(queryObj);
    return this;
  }

  search(fields = []) {
    if (this.queryString.search && fields.length) {
      this.query = this.query.find({
        $or: fields.map((field) => ({ [field]: { $regex: this.queryString.search, $options: 'i' } }))
      });
    }
    return this;
  }

  sort() {
    this.query = this.query.sort(this.queryString.sort?.split(',').join(' ') || '-createdAt');
    return this;
  }

  paginate() {
    const page = Number(this.queryString.page || 1);
    const limit = Number(this.queryString.limit || 20);
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}
