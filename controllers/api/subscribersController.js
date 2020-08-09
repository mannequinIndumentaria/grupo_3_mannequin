const db = require('../../database/models');

const subscribersController = {
    subscribe: async (req, res, next) => {
        const newSubscriber = {
            email: req.body.email,
            active: 1
        };

        const querySuscribers = await db.Subscriber.findAll({
            where: {
                email: newSubscriber.email
            }
        })

        if (querySuscribers.length == 0) {

            db.Subscriber.create(newSubscriber);
            res.json({
                status: 201,
                url: '/api/subscribers'
            })
            console.log(newSubscriber);
        } else {
            res.json({
                status: 403,
                url: '/api/subscribers'
            })
        }

    }
}

module.exports = subscribersController;