const Artist = require('../models/Artist')
const User = require('../models/User')
const { handleDocErrors } = require('../controller/authController')


const artists_get = async (req, res, next) => {
    const artists = await Artist.find()
    try {
        if (artists) {
            res.send(artists)
        }
    } catch (error) {
        res.status(400).json(error.message)
    }


};

const artists_getById = async (req, res, next) => {
    const { id } = req.params
    Artist.findOne({ _id: id }).then(function (artist) {
        res.send(artist)
    })
}

const artists_put = async (req, res, next) => {
    const id = req.params.id;
    const { name, location, about, links } = req.body;
    // console.log(name)

    try {
        if (name && location) {
            Artist.findOneAndUpdate({ _id: id }, { name, location, about, links }).then(function () {
                Artist.findOne({ _id: id }).then(function (artist) {
                    res.send(artist)
                })
            });
        } else {
            throw new Error('All fields required')
        }

    } catch (err) {

        res.status(400).json(err.message)
    }


}

const artists_put_query = async (req, res, next) => {
    const id = req.params.id
    try {
        if (id && req.query.attach) {

            const attachedId = req.query.attach

            Artist.findOne({ _id: id }).then(function (artist) {
                if (artist.attachedId.includes(attachedId)) {
                    res.status(400).json('Already attached')

                } else {

                    Artist.updateOne({ _id: id }, { $push: { attachedId: attachedId } }).then(function () {
                        Artist.findOne({ _id: id }).then(function (artist) {
                            console.log('clog', req.query.attach, req.params.id)

                            res.send(artist.attachedId)
                        })
                    });
                }
            })

        } else if (id && req.query.detach) {
            const idToDetach = req.query.detach

            Artist.findOne({ _id: id }).then(function (artist) {
                if (artist.attachedId.includes(idToDetach)) {
                    Artist.updateOne({ _id: id }, { $pull: { attachedId: idToDetach } }).then(function () {
                        Artist.findOne({ _id: id }).then(function (artist) {
                            console.log('clogdetach', idToDetach, req.params.id)

                            res.send(artist.attachedId)

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
const artists_post = async (req, res, next) => {
    const { name, location, about, links } = req.body;
    const userId = req.userId;
    const role = req.role
    const findItem = await Artist.findOne({ userId })
    if (!findItem) {
        try {
            const newArtist = await Artist.create({
                userId,
                name,
                location,
                about,
                links,
                role

            })
            User.findOneAndUpdate({ _id: newArtist.userId }, { itemId: newArtist._id })
                .then(function () {
                    User.findOne({ _id: newArtist.userId })
                        .then(function (user) {
                            
                            console.log('mere band useritemid?', user)
                        })
                });

            res.send(newArtist);

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
const artists_delete = async (req, res, next) => {
    const { id } = req.params
    const deletePayload = await Artist.deleteOne({ _id: id })
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
    artists_get,
    artists_getById,
    artists_put,
    artists_put_query,
    artists_post,
    artists_delete,
}