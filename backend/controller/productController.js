exports.getProducts = (req, res, next)=>{
  console.log('lolS')
  res.status(200).json({
    success: true,
    message: 'this route will show all products in database.'
  })
}