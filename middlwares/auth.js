const jwt = require("jsonwebtoken");

const { RequestError } = require("../helpers");
const { User } = require("../models");



const auth = async (req, res, next) => {
  const { SECRET_KEY } = process.env;

  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  console.log(bearer);

  if (bearer !== "Bearer") {
    throw RequestError(401, "No authorized!");
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);

    if (!user || !user.token) {
      throw RequestError(401, "No authorized!");
    }
    req.user = user;
    next();
  } catch (error) {
    next(RequestError(401, error.message))
  }
};

module.exports = auth;