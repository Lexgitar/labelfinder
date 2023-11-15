const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;
const User = require('../models/User');
//

const requireAuth = (req, res, next)=>{
    const token = req.cookies.jwt;

    //check if token / valid
    if(token){
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if(err){
                console.log(err.message)
                res.send('require auth error')
            }else{
                console.log(decodedToken)
                next()
            }
        })
    }else{
        res.send('require auth error')
    }
}

//check curr user
const checkUser = (req, res, next)=>{
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, jwtSecret, async (err, decodedToken) => {
            if(err){
                console.log(err.message)
                // res.locals.user = null;
                next();
            }else{
                console.log(decodedToken)
                let user = await User.findById(decodedToken.id)
                // res.locals.user = user;
                next()
            }
        })
    }else{
        // res.locals.user = null
        next()
    }
}

// check role

const checkRole = (req, res, next)=>{
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, jwtSecret, async (err, decodedToken) => {
            if(err){
                console.log(err.message)
                // res.locals.user = null;
                //next();
            }else{
                console.log(decodedToken)
                let user = await User.findById(decodedToken.id)
                console.log(user.role);
                //console.log(req);
                // res.locals.user = user;
                if(req.baseUrl === `/api/${user.role}s` ){
                    console.log('CHECKED');
                    req.userId = user._id;
                    next();
                }
                // next()
            }
        })
    }else{
        res.send('Role error!!')
    }
}

module.exports = { requireAuth, checkUser, checkRole};