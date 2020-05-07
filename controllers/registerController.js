const registerController = {
    register: (req,res) => {
        res.render('register');
    },

    registro: (req,res) => {
        res.render('registerFormCompleto');
    }
};

module.exports = registerController;