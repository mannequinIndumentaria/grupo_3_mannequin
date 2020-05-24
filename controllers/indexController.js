const fs = require('fs');
const path = require('path');
const categoriesFilePath = path.join(__dirname, '../data/categories.json');
const categoriesJSON = JSON.parse(fs.readFileSync(categoriesFilePath, 'utf-8'));

const indexController = {
    index: (req,res) => {
        res.render('index', {
            categoriesJSON
        });
    }
};

module.exports = indexController;