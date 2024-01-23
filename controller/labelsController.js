const Label = require('../models/Label')
const { handleDocErrors } = require('../controller/authController')

const labels_get = async (req, res, next) => {
    Label.find().then(function (label) {
        res.send(label)
    })

};

const labels_getById = async (req, res, next) => {
    const id = req.params.id
    const label = await Label.findOne({ _id: id });
    res.send(label);
}

const labels_put = async (req, res, next) => {

    const id = req.params.id
    const { name, location } = req.body
    Label.findOneAndUpdate({ _id: id }, { name, location }).then(function () {
        Label.findOne({ _id: id }).then(function (label) {
            res.send(label)
        })
    });

}

const labels_put_query = async (req, res, next) => {
    const id = req.params.id
    if (req.query.attach) {

        const attachedId = req.query.attach

        Label.findOne({ _id: id }).then(function (label) {
            if (label.attachedId.includes(attachedId)) {
                res.send('already in')
            } else {

                Label.updateOne({ _id: id }, { $push: { attachedId: attachedId } }).then(function () {
                    Label.findOne({ _id: id }).then(function (label) {
                        console.log('clog', req.query.attach, req.params.id)

                        res.send(label.attachedId)
                    })
                });
            }
        })

    } else if (req.query.detach) {
        const idToDetach = req.query.detach

        Label.findOne({ _id: id }).then(function (label) {
            if (label.attachedId.includes(idToDetach)) {
                Label.updateOne({ _id: id }, { $pull: { attachedId: idToDetach } }).then(function () {
                    Label.findOne({ _id: id }).then(function (label) {
                        console.log('clogdetach', idToDetach, req.params.id)

                        res.send(label.attachedId)

                    })
                });

            } else {

                res.send('detach id  not in')

            }
        })

    } else {
        next()
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
            res.send(errors + ' haha')

        }
    } else {
        res.send('Cannot set up more than 1 profile')
    }
}

const labels_delete = async (req, res, next) => {
    const { id } = req.params
    Label.deleteOne({ _id: id }).then(function (label) {
        res.send(label)
    })
}

module.exports = {
    labels_get,
    labels_getById,
    labels_put,
    labels_put_query,
    labels_post,
    labels_delete,

}