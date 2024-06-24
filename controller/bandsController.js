const Band = require('../models/Band')
const { handleDocErrors } = require('../controller/authController')
const User = require('../models/User')
const bands_get = async (req, res, next) => {
    const bands = await Band.find()
    try {
        if (bands) {
            res.send(bands)
        }
    } catch (error) {
        res.status(400).json(error.message)
    }


};

const bands_getById = async (req, res, next) => {
    const { id } = req.params
    Band.findOne({ _id: id }).then(function (band) {
        res.send(band)
    })
}

const bands_put = async (req, res, next) => {
    const id = req.params.id;
    const { name, location, genre, about, links } = req.body;
    // console.log(name)

    try {
        if (name && location) {
            Band.findOneAndUpdate({ _id: id }, { name, location, genre, about, links }).then(function () {
                Band.findOne({ _id: id }).then(function (band) {
                    res.send(band)
                })
            });
        } else {
            throw new Error('All fields required')
        }

    } catch (err) {

        res.status(400).json(err.message)
    }


}

const bands_put_query = async (req, res, next) => {
    const id = req.params.id
    try {
        if (id && req.query.attach) {

            const attachedId = req.query.attach

            Band.findOne({ _id: id }).then(function (band) {
                if (band.attachedId.includes(attachedId)) {
                    res.status(400).json('Already attached')

                } else {

                    Band.updateOne({ _id: id }, { $push: { attachedId: attachedId } }).then(function () {
                        Band.findOne({ _id: id }).then(function (band) {
                            console.log('clog', req.query.attach, req.params.id)

                            res.send(band.attachedId)
                        })
                    });
                }
            })

        } else if (id && req.query.detach) {
            const idToDetach = req.query.detach

            Band.findOne({ _id: id }).then(function (band) {
                if (band.attachedId.includes(idToDetach)) {
                    Band.updateOne({ _id: id }, { $pull: { attachedId: idToDetach } }).then(function () {
                        Band.findOne({ _id: id }).then(function (band) {
                            console.log('clogdetach', idToDetach, req.params.id)

                            res.send(band.attachedId)

                        })
                    });
                }
            })
        } else {
            next()
        }

    } catch (err) {
        res.status(400).json(err.message)
    }

}

//make new band  + check only 1 item/user
const bands_post = async (req, res, next) => {
    const { name, location, genre, about, links  } = req.body;
    const userId = req.userId;
    const role = req.role
    const findItem = await Band.findOne({ userId })
    if (!findItem) {
        try {
            const newBand = await Band.create({
                userId,
                name,
                location,
                genre,
                about,
                links,
                role

            })

            User.findOneAndUpdate({ _id: newBand.userId }, { itemId: newBand._id })
            .then(function () {
                User.findOne({ _id: newBand.userId })
                    .then(function (user) {
                        
                        console.log('mere band useritemid?', user)
                    })
            });

            res.send(newBand);

        } catch (err) {

            const errors = handleDocErrors(err)
            console.log(errors)
            res.status(400).json(errors.message)

        }
    } else {
        res.status(400).json('Cannot set up more than 1 profile')
    }
}

//delete by id
const bands_delete = async (req, res, next) => {
    const { id } = req.params
    const deletePayload = await Band.deleteOne({ _id: id })
    try {
        if (deletePayload.deletedCount === 1) {
            res.send('User-role-details deleted')
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
    bands_get,
    bands_getById,
    bands_put,
    bands_put_query,
    bands_post,
    bands_delete,

}