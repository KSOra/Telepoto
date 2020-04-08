const sh = require('shelljs');

sh.rm('-rf', 'dist');
sh.exec('webpack-dev-server --config ./config/dev.config.js');


