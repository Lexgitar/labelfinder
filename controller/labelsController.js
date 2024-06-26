const Label = require('../models/Label')
const User = require('../models/User')
const { handleDocErrors } = require('../controller/authController')

const labels_get = async (req, res, next) => {
    const labels = await Label.find()
    try {
        if (labels) {
            res.send(labels)
        }
    } catch (error) {
        res.status(400).json(error.message)
    }

};

const labels_getById = async (req, res, next) => {
    const id = req.params.id
    const label = await Label.findOne({ _id: id });
    res.send(label);
}

const labels_put = async (req, res, next) => {

    const id = req.params.id
    const { name, location, genre, about, links } = req.body

    try {
        if (name && location) {
            Label.findOneAndUpdate({ _id: id }, { name, location, genre, about, links }).then(function () {
                Label.findOne({ _id: id }).then(function (label) {
                    res.send(label)
                })
            });
        } else {
            throw new Error('All fields required')
        }

    } catch (err) {

        res.status(400).json(err.message)
    }


}

const labels_put_query = async (req, res, next) => {
    const id = req.params.id
    try {
        if (id && req.query.attach) {

            const attachedId = req.query.attach

            Label.findOne({ _id: id }).then(function (label) {
                if (label.attachedId.includes(attachedId)) {
                    res.status(400).json('Already attached')

                } else {

                    Label.updateOne({ _id: id }, { $push: { attachedId: attachedId } }).then(function () {
                        Label.findOne({ _id: id }).then(function (label) {
                            console.log('clog', req.query.attach, req.params.id)

                            res.send(label.attachedId)
                        })
                    });
                }
            })

        } else if (id && req.query.detach) {
            const idToDetach = req.query.detach

            Label.findOne({ _id: id }).then(function (label) {
                if (label.attachedId.includes(idToDetach)) {
                    Label.updateOne({ _id: id }, { $pull: { attachedId: idToDetach } }).then(function () {
                        Label.findOne({ _id: id }).then(function (label) {
                            console.log('clogdetach', idToDetach, req.params.id)

                            res.send(label.attachedId)

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

const labels_post = async (req, res, next) => {
    const { name, location, genre, about, links } = req.body;
    const userId = req.userId;
    const role = req.role
    const findItem = await Label.findOne({ userId })

    if (!findItem) {
        try {
            const newLabel = await Label.create({
                userId,
                name,
                location,
                genre,
                about,
                links, 
                role
            })

            User.findOneAndUpdate({ _id: newLabel.userId }, { itemId: newLabel._id })
            .then(function () {
                User.findOne({ _id: newLabel.userId })
                    .then(function (user) {
                        
                        console.log('mere label useritemid?', user)
                    })
            });

            res.send(newLabel);

        } catch (err) {

            const errors = handleDocErrors(err)
            console.log(errors)
            res.status(400).json(errors.message)

        }
    } else {
        res.send('Cannot set up more than 1 profile')
    }
}

const labels_delete = async (req, res, next) => {
    const { id } = req.params
    const deletePayload = await Label.deleteOne({ _id: id })
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

const labels_clear = async (req, res, next) => {
    const idClear = req.query.clear
    try {
       //const updated =  Label.updateMany({attachedId:idClear})
       const updated = await  Label.updateMany({},{
        $pull:{ attachedId:{$in:[idClear]}}
       })
       if(updated && updated.acknowledged){
        console.log('vclear', req.query.clear)
        console.log('vclear', updated)
        next ()
       }
    } catch (error) {
        console.log('eror clear', idClear)
        res.send('eorr')
    }
}

module.exports = {
    labels_get,
    labels_getById,
    labels_put,
    labels_put_query,
    labels_post,
    labels_delete,
    labels_clear

}