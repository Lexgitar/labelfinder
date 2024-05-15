const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;
const User = require('../models/User');
//
const Label = require('../models/Label')
const Band = require('../models/Band');
const Artist = require('../models/Artist');

//
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
                } else {
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
//refactored a bit
const userCheck = (req, res, next) => {

    const token = req.cookies.jwt

    try {
        if (token) {
            jwt.verify(token, jwtSecret, async (err, decodedToken) => {
                if (err) {
                    throw new Error(err.message)
                } else {
                    console.log(decodedToken)
                    let user = await User.findById(decodedToken.id)
                    if (user) {
                        req.query.id = user._id
                        req.query.role = user.role
                        next()
                    }
                }

            })
        }
    } catch (error) {
        res.status(400).json(error)
    }

}
//

// check role

const checkAuthAndRole = (req, res, next) => {
    const token = req.cookies.jwt;
    //console.log('validate-chauthnrol', req.query.clear)
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
                    req.role = user.role


                    next();
                }
                // next()
            }
        })
    } else {
        res.send('Role error!!')
    }
}
//validate ID to be queried exists!
const validateId = async (req, res, next) => {
    let roleByUrl = (req.originalUrl.includes('labels') ? Label : (req.originalUrl.includes('bands') ? Band : Artist))

    const { id } = req.params
    req.query.clear = id
    const role = await roleByUrl.findOne({ _id: id })
    console.log('validate', req.query.clear)
    console.log('rolebyurl-', roleByUrl)
    try {
        if (role) {

            next()
        } else {
            throw new Error('Invalid resource')
        }
    } catch (error) {
        res.status(400).json(error.message)

    }
}

const clearSubmitArray = async (req, res, next) => {
    const roleByUrl = req.originalUrl.includes('labels') ? Band : Label
    const secondRole = roleByUrl === Band ? Artist : Band


    console.log('rolebyurl', roleByUrl)
    console.log('secondrol', secondRole)
    const idClear = req.query.clear
    try {

        const updated = await roleByUrl.updateMany({}, {
            $pull: { attachedId: { $in: [idClear] } }
        })

        const secondUpdated = await secondRole.updateMany({}, {
            $pull: { attachedId: { $in: [idClear] } }
        })
        if (updated && updated.acknowledged && secondUpdated.acknowledged) {
            console.log('vclear', req.query.clear)
            console.log('vclear', updated)
            next()
        }
    } catch (error) {
        console.log('eror clear', idClear)
        res.send('eorr')
    }
}

module.exports = {
    requireAuth,
    checkUser,
    checkAuthAndRole,
    requireAuthNRole,
    validateId,
    userCheck,
    clearSubmitArray

};