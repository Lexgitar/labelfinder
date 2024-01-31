const Label = require('../models/Label')
const { handleDocErrors } = require('../controller/authController')

const labels_get = async (req, res, next) => {
    const labels = await Label.find()
      try {
        if(labels){
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
    const { name, location } = req.body

    try {
        if (name && location) {
            Label.findOneAndUpdate({ _id: id }, { name, location }).then(function () {
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
    const { name, location } = req.body;
    const userId = req.userId;
    const findItem = await Label.findOne({ userId })

    if (!findItem) {
        try {
            const newLabel = await Label.create({
                userId,
                name,
                location
            })

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

module.exports = {
    labels_get,
    labels_getById,
    labels_put,
    labels_put_query,
    labels_post,
    labels_delete,

}