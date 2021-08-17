class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  search(){
    const keyword = this.queryStr.keyword ? {
        name: {
          $regex: this.queryStr.keyword,
          $options: 'i', // case incensitive
        }
    } : {}

    this.query = this.query.find({...keyword});
    return this;
  }
}
module.exports = APIFeatures;