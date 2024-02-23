const Fan = require ('../models/Fan')
const {handleDocErrors} = require('../controller/authController')

const fans_get = async (req, res, next) => {
    const fans = await Fan.find()
    try {
        if (fans) {
            res.send(fans)
        }
    } catch (error) {
        res.status(400).json(error.message)
    }


};

const fans_getById = async (req, res, next) => {
    const { id } = req.params
    Fan.findOne({ _id: id }).then(function (fan) {
        res.send(fan)
    })
}

const fans_put = async (req, res, next) => {
    const id = req.params.id;
    const { name, location, genre, about, links } = req.body;
    // console.log(name)

    try {
        if (name && location) {
            Fan.findOneAndUpdate({ _id: id }, { name, location, genre, about, links }).then(function () {
                Fan.findOne({ _id: id }).then(function (fan) {
                    res.send(fan)
                })
            });
        } else {
            throw new Error('All fields required')
        }

    } catch (err) {

        res.status(400).json(err.message)
    }


}

const fans_put_query = async (req, res, next) => {
    const id = req.params.id
    try {
        if (id && req.query.attach) {

            const attachedId = req.query.attach

            Fan.findOne({ _id: id }).then(function (fan) {
                if (fan.attachedId.includes(attachedId)) {
                    res.status(400).json('Already attached')

                } else {

                    Fan.updateOne({ _id: id }, { $push: { attachedId: attachedId } }).then(function () {
                        Fan.findOne({ _id: id }).then(function (fan) {
                            console.log('clog', req.query.attach, req.params.id)

                            res.send(fan.attachedId)
                        })
                    });
                }
            })

        } else if (id && req.query.detach) {
            const idToDetach = req.query.detach

            Fan.findOne({ _id: id }).then(function (fan) {
                if (fan.attachedId.includes(idToDetach)) {
                    Fan.updateOne({ _id: id }, { $pull: { attachedId: idToDetach } }).then(function () {
                        Fan.findOne({ _id: id }).then(function (fan) {
                            console.log('clogdetach', idToDetach, req.params.id)

                            res.send(fan.attachedId)

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
const fans_post = async (req, res, next) => {
    const { name, location, genre, about, links } = req.body;
    const userId = req.userId;
    const findItem = await Fan.findOne({ userId })
    if (!findItem) {
        try {
            const newBand = await Fan.create({
                userId,
                name,
                location,
                genre,
                about,
                links

            })

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
const fans_delete = async (req, res, next) => {
    const { id } = req.params
    const deletePayload = await Fan.deleteOne({ _id: id })
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
        fans_get,
        fans_getById,
        fans_put,
        fans_post,
        fans_delete,
        
    }