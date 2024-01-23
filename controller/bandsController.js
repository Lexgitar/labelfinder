const Band = require('../models/Band')
const { handleDocErrors } = require('../controller/authController')

const bands_get = async (req, res, next) => {
    Band.find().then(function (bands) {
        res.send(bands)
    })

};

const bands_getById = async (req, res, next) => {
    const { id } = req.params
    Band.findOne({ _id: id }).then(function (band) {
        res.send(band)
    })
}

const bands_put = async (req, res, next) => {
    const id = req.params.id;
    const { name, location } = req.body;
    console.log(name)

    try {
        if (name && location) {
            Band.findOneAndUpdate({ _id: id }, { name, location }).then(function () {
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
    if (req.query.attach) {
        const id = req.params.id
        const attachedId = req.query.attach
        const includedId = false

        Band.findOne({ _id: id }).then(function (band) {
            if (band.attachedId.includes(attachedId)) {
                res.send('already in')
            } else {

                Band.updateOne({ _id: id }, { $push: { attachedId: attachedId } }).then(function () {
                    Band.findOne({ _id: id }).then(function (band) {
                        console.log('clog', req.query.attach, req.params.id)

                        res.send(band.attachedId)
                    })
                });
            }
        })




    } else {
        next()
    }

}

//make new band  + check only 1 item/user
const bands_post = async (req, res, next) => {
    const { name, location } = req.body;
    const userId = req.userId;
    const findItem = await Band.findOne({ userId })
    if (!findItem) {
        try {
            const newBand = await Band.create({
                userId,
                name,
                location,

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
const bands_delete = async (req, res, next) => {
    const { id } = req.params
    const deletedBand = await Band.deleteOne({ _id: id })
    res.send(deletedBand)
}

module.exports = {
    bands_get,
    bands_getById,
    bands_put,
    bands_put_query,
    bands_post,
    bands_delete,

}