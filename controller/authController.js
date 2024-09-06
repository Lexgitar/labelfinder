const User = require('../models/User');
const jwt = require('jsonwebtoken');

//
// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  console.log('@err', err, Object.values(err), err.code)
  //let errors = { email: '', password: '' };
  let errors = '';
  let errString = ' incorrect credentials'
  //incorrect email
  if (err.message === 'incorrect email') {
    errors = errString
  }

  //incorrect password
  if (err.message === 'incorrect password') {
    errors = errString
  }

  // duplicate email error
  if (err.code === 11000) {
    errors = 'Email is already registered';
    return errors;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}
//
//DOC (fan, label, band) errors
const handleDocErrors = (err) => {

  console.log('@err', err, Object.values(err.message), err.code)

  if (err.code === 11000) {
    errors = 'duplicate item';
    return errors;
  } else {
    return err
  }


}


//
const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge
  })
}
//

// const signup_get = (req, res, next) => {
//     console.log(req)
// };
//
const signup_post = async (req, res) => {

  const { email, password, role } = req.body;
  try {

    const user = await User.create({ email, password, role });
    const token = createToken(user._id);

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      domain: 'labelfinder-xmhe.onrender.com',
      maxAge: maxAge * 1000

    })
    res.status(200).json({ email, role })
  }
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });

    console.log('alx', errors)
  }
}



// Login  - post req
const login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);

    // res.cookie('jwt', token, { 
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: 'none',
    //   domain: 'labelfinder-xmhe.onrender.com',
    //   maxAge: maxAge * 1000 

    // })
    res.cookie('jwt', token,
      {
        httpOnly: true,
        secure: true,
        httpOnly: true,
        path: '/',
        sameSite: 'none',
        domain: 'labelfinder-xmhe.onrender.com',
        maxAge: maxAge * 1000,
        partitioned:true
      });
       res.headers['Access-Control-Max-Age'] = '600'

    res.status(200).json({
      email: user.email,
      _id: user._id,
      role: user.role,
      itemId: user.itemId
    })
  } catch (error) {
    console.log('login', error)
    const errors = handleErrors(error)
    res.status(400).json({ errors })
  }
}




//
const logout_get = (req, res) => {
  console.log('rescookie', res.cookie('jwt'))
  res.cookie('jwt', '', { maxAge: 1 });

  res.send('OUT');
  // res.redirect('/');
}
//

const user_delete = async (req, res, next) => {
  console.log('req.id', req.query.id)
  const id = req.query.id
  const role = req.query.role
  const deletePayload = await User.deleteOne({ _id: id, role: role })
  try {
    if (deletePayload.deletedCount === 1) {
      res.cookie('jwt', '', { maxAge: 1 });
      res.send(`User ${id} deleted`)


    } else if (deletePayload.deletedCount === 0) {
      res.send('Attempt not succesful')
    } else {
      throw new Error('Delete unsuccesful')
    }
  } catch (err) {

    res.status(400).json(err.message)
  }
}


module.exports = {
  //signup_get,
  handleDocErrors,
  signup_post,
  login_post,
  logout_get,
  user_delete

};
