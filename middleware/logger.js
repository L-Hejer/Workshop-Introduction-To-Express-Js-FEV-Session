function logger(req, res, next) {
  console.table({ method: req.method, path: req.url });
  //block the request
  if (5 > 4) {
    next();
  } else {
    res.send('Oups, the request is blocked!');
  }
}

module.exports = logger;
