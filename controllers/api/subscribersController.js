const db = require('../../database/models');

const subscribersController = {
    subscribe: async (req, res) => {
        const newSubscriber = {
            email: req.body.email,
            active: 1
        };
        console.log("Mail Back", req.body)
        const querySuscribers = await db.Subscriber.findOne({
            where: {
                email: newSubscriber.email
            }
        })
        console.log(querySuscribers)

        if (querySuscribers == null) {

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