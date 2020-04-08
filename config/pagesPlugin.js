const fs = require('fs');
const path = require('path');
const DynamicEntryPlugin = require('webpack/lib/DynamicEntryPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PluginName = 'PagesPlugin';

class PagesPlugin {
  constructor(options = {}) {
    this.path = options.path;
  }

  apply(compiler) {
    const pages =
        fs.readdirSync(this.path, {withFileTypes: true})
            .filter(item => {
              return item.isDirectory() && fs.existsSync(path.join(this.path, item.name, 'index.tsx'))
            });

    compiler.hooks.entryOption.tap(PluginName, (context, entry) => {
      new DynamicEntryPlugin(context, () => {
        const pageEntries = {};

        pages.forEach(page => {
          pageEntries[page.name] = path.join(this.path, page.name, 'index.tsx');
        });
        return {...pageEntries, ...entry}
      }).apply(compiler);
    });

    compiler.hooks.afterPlugins.tap(PluginName, (context) => {
      pages.forEach(page => {
        const templateUrl = path.join(this.path, page.name, 'index.ejs');

        new HtmlWebpackPlugin({
          filename: page.name + '.html',
          excludeChunks: Object.keys(context.options.entry || {}),
          template: fs.existsSync(templateUrl) ? templateUrl : undefined
        }).apply(compiler)
      })
    })
  }
}

module.exports = PagesPlugin;
