const db = require('../../database/models');

const subscribersController = {
    subscribe: async (req, res, next) => {
        const newSubscriber = {
            email: req.body.email,
            active: 1
        };

        db.Subscriber.create(newSubscriber);
        console.log(newSubscriber);


    }
}

module.exports = subscribersController;