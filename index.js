const fs = require('fs');
const path = require('path');
const pluginName = 'TplConfigPlugin';
class TplConfigPlugin{

  constructor(options) {
    const defaults = { 
      prefix: ''      //前缀，  项目名称和项目所属组拼接的字符串  例如： paas-vui-
    };
    this.options = options || {}
  } 

  apply(compiler) {
    const options = this.options;
    let content = '', output = compiler.options.output;
    compiler.hooks.webpackManifestPluginAfterEmit.tap(pluginName, (manifest) => {   //依赖  webpack-manifest-plugin 输出的格式
      let prefix = options.prefix || '';
      for(let key in manifest){
        content += `${prefix}${key}:${manifest[key].replace(output.publicPath, '')}\n`
      }
    });

    compiler.hooks.emit.tap(pluginName, (compilation) => {
      compilation.assets['tpl_config'] = {
        source: () => {
          return content;
        },
        size: () => {
          return content.length;
        }
      }
    })
  }
}

module.exports = TplConfigPlugin;