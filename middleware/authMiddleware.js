const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;
const User = require('../models/User');
//

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    //check if token / valid
    if (token) {
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if (err) {
                console.log(err.message)
                res.send('require auth - error')
            } else {
                console.log(decodedToken)

                next()
            }
        })
    } else {
        res.send('require auth - error')
    }
}

const requireAuthNRole = (req, res, next) => {
    const token = req.cookies.jwt;

    //check if token / valid
    if (token) {
        jwt.verify(token, jwtSecret, async (err, decodedToken) => {
            if (err) {
                console.log(err.message)
                res.send('require auth - error')
            } else {
                console.log(decodedToken)
                let user = await User.findById(decodedToken.id)
                if (req.baseUrl !== `/api/${user.role}s`) {

                    next();
                }else{
                    res.send(err.message)
                }
            }
        })
    } else {
        res.send('require auth - error')
    }
}

//check curr user
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, jwtSecret, async (err, decodedToken) => {
            if (err) {
                console.log(err.message)

                next();
            } else {
                console.log(decodedToken)
                let user = await User.findById(decodedToken.id)

                next()
            }
        })
    } else {
        // res.locals.user = null
        res.send('error!! checkuser')
    }
}

// check role

const checkAuthAndRole = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, jwtSecret, async (err, decodedToken) => {
            if (err) {
                console.log(err.message)
                res.send(err.message)

            } else {
                console.log(decodedToken)
                let user = await User.findById(decodedToken.id)
                console.log(user.role);

                if (req.baseUrl === `/api/${user.role}s`) {
                    console.log('CHECKED');
                    req.userId = user._id;


                    next();
                }
                // next()
            }
        })
    } else {
        res.send('Role error!!')
    }
}



module.exports = { requireAuth, checkUser, checkAuthAndRole, requireAuthNRole };