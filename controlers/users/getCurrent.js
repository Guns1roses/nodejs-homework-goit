const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getCurrent = async(req, res) => {
    const {email, subscription} = req.user;
    res.json ({
        status: 'success',
        cod: 200,
        data: {
            email,
            subscription,
        }
    })

}


module.exports = getCurrent;