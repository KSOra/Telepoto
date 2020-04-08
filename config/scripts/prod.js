const sh = require('shelljs');

sh.rm('-rf', 'dist');
sh.exec('webpack --config ./config/prod.config.js');
