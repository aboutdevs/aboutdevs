import express from 'express';
import fs from 'fs';

require.extensions['.html'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};

const router = express.Router();

/**
 * Function  that actually sends the application to the client
 * @param response
 */
function sendApp(response) {
    const wrap = require('../../client/index.html')
        .replace(/\$\{css\}/g, '')
        .replace(/\$\{js\}/g, 'http://localhost:8080/bundle.js');
    response.status(200).send(wrap);
}

/**
 * Login route
 */
router.route('/login').get((req, res) => {
    sendApp(res);
});

/**
 * Wild-card route
 */
router.route('*').get((req, res) => {
    sendApp(res);
    // if (!req.user) {
    //     res.redirect('/login');
    // } else {
    //     sendApp(res);
    // }
});

export default router;
