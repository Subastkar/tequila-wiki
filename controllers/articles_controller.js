module.exports = {
  index: function(req, res){
    return res.send(200);
  },
  new: function(req, res){
    console.log(req.body);

    res.send(200, {message: "Article saved correctly"})
  }
};
