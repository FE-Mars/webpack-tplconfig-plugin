# webpack-tplconfig-plugin
Generating tpl_config files

# Configuration

```
const TplConfigPlugin = require("webpack-tplconfig-plugin")
```

```
    plugins: [
        ...
        new TplConfigPlugin({
            prefix: "paas-vui-"
        })
        ...
    ]
```