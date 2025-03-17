//FORMAT OF TOKEN
//Authorization: Bearer <access_token>

//Verify Token
function verifyToken(req, res, next) {
  //get auth header value
  const bearerHeader = req.headers["authorization"];
  //check if bearer is undefined
  if (typeof bearerHeader !== undefined) {
    //split at the space
    const bearer = bearerHeader.split(" ");
    //get token from array
    const bearerToken = bearer[1];
    //set the token
    req.token = bearerToken;
    //next middleware
    next();
  } else {
    res.sendStatus(403);
  }
}

module.exports = verifyToken;
