class APIFeatures {
  constructor(query, queryStr) {
    this.query = query; //Product.find() from product controller
    this.queryStr = queryStr; // /api/v1/products?keyword=apple&category=Electronics
                              // '?keyword=apple&category=Electronics' from above url
  }

  search(){
    //example route /api/v1/products?keyword=apple&category=Electronics
    const keyword = this.queryStr.keyword ? {
        name: {
          $regex: this.queryStr.keyword,
          $options: 'i', // case incensitive
        }
    } : {}

    this.query = this.query.find({...keyword});
    return this;
  }

  filter(){
    //example route /api/v1/products?keyword=apple&category=Electronics
    const queryCopy = {...this.queryStr};

    //removing field from query
    // if you print out querycopy, you can see "keyword" key. but keyword is not in our db document 
    // so we have to remove it for a successfull filter.
    const removeFields = ['keyword', 'limit', 'page']
    removeFields.forEach(element => delete queryCopy[element]);

    //filter for price, ratings ect.
    //example route /api/v1/products?keyword=apple&category=Electronics &price[gte]=1&price[lte]=200
    // example route query by keyword 'apple' in category 'electronics' price greater than 1$ under 200$
    let queryStr = JSON.stringify(queryCopy)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  pagination(resultsPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resultsPerPage * (currentPage - 1);

    this.query = this.query.limit(resultsPerPage).skip(skip);
    return this;
  }

}
module.exports = APIFeatures;