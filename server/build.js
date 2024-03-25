const fs = require('fs-extra');

// Copy EJS files from mails folder to build directory
fs.copySync('./mails', './build/mails');
