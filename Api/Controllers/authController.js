/* 
   I am building a login system. After a user logs in or signs up, you want to:
   Create a JWT token (like a secret user pass),
   Send it back to the browser.
   Store it securely in a cookie, and
   Use it to verify the user on future requests.
   */



const jwt = require("jsonwebtoken")
const User = require("../Model/userModel")

const signToken = (id) => {

    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    })

}

/*
  Why use cookies?
  It allows automatic sending of the token with every future request without needing to attach
  it manually from the frontend.
*/

const createSendToken = (user, statusCode, req, res) => {
    const token = signToken(user._id);

    res.cookie("jwt", token, {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: req.secure || req.headers["x-forwarded-proto"] === "https",
    })

    //Remove password from output
    user.password = undefined

    res.status(statusCode).json({
        status: "success",
        token,
        data: {
            user
        }
    })
}

exports.signUp = async (req, res, next) => {
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    })
    createSendToken(newUser, 201, req, res)
}

exports.login = async (req, res, next) => {
    const { email, password } = req.body

    //Check if email and password exists
    if (!email || !password) {
        res.status(400).json({
            status: "fail",
            message: "Please provide email and password"
        })
    }

    //check if user exists
    const user = await User.findOne({ email }).select("+password")

    if (!user || !(await user.correctPassword(password, user.password)))
        res.status(401).json({
            status: "fail",
            message: "Incorrect email or password"
        })

    createSendToken(user, 200, req, res)
}

