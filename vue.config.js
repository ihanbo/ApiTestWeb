const path = require('path')
const webpack = require('webpack')
const set_config = require('./config/index')
const resolve = dir => path.join(__dirname, dir)

console.log("==================================开始编译======================================")

module.exports = {

    publicPath: process.env.NODE_ENV === "production" ? './':'/',
    
    // 它支持webPack-dev-server的所有选项
    devServer: {
        open: true,         // 自动打开浏览器
        host: '192.168.15.10',  // 配置启动域名或IP
        port: 8090,         // 端口号
        https: false,       // 是否开启HTTPS
        hotOnly: false,
        
        // 设置代理
        // proxy: 'http://localhost:4000', // 配置跨域处理,只有一个代理
        proxy: {
            '/api/': {
                target: 'http://192.168.15.10:9000',
                ws: true,
                changOrigin: true,
                // pathRewrite: {
                //     '^/api': '/'
                // }
            }
        }
    },

    // 构建输出目录
    outputDir: 'dist',

    // 静态资源目录 (js, css, img, fonts)
    assetsDir: 'assets',

    // 是否开启eslint保存检测，有效值：ture | false | 'error'
    lintOnSave: false,

    // 运行时版本是否需要编译
    runtimeCompiler: true,

    // 默认babel-loader忽略mode_modules，这里可增加例外的依赖包名
    transpileDependencies: [],

    //生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存
    filenameHashing:false,

    /**
     * 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
     *  打包之后发现map文件过大，项目文件体积很大，设置为false就可以不输出map文件
     *  map文件的作用在于：项目打包后，代码都是经过压缩加密的，如果运行时报错，输出的错误信息无法准确得知是哪里的代码报错。
     *  有了map就可以像未加密的代码一样，准确的输出是哪一行哪一列有错。
     * */
    productionSourceMap: true,

    // webpack配置，值位对象时会合并配置，为方法时会改写配置
    configureWebpack:{
        plugins: [
            new webpack.ProvidePlugin({
                jQuery: 'jquery',
                $: 'jquery'
            })
        ]
    },
    /**
     * webpack链接API，用于生成和修改webapck配置
     * 配置路径别名
     */
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('assets', resolve('src/assets'))
            .set('router', resolve('src/router'))
            .set('store', resolve('src/store'))
            .set('components', resolve('src/components'))
            .set('views', resolve('src/views'))
            .set('utils', resolve('src/utils'))
            .set('api', resolve('src/api'))
            .set('styles', resolve('src/styles'))
            .set('menus', resolve('src/menus'))
        config  
            .plugin('define')
            .use(require.resolve('webpack/lib/DefinePlugin'), [{ 'process.env': set_config }])
    },

    // 配置高于chainWebpack中关于css loader的配置
    css: {

        /**
         * 是否开启支持‘foo.module.css’样式
         * 建议关闭,开启后会报ElementUI组件找不到的问题
         * @type {Boolean}
         */
        modules: false,

        /**
         * 是否使用css分离插件
         * ExtractTextPlugin，采用独立样式文件载入，
         * 不采用<style>方式内联至html文件中
         * @type {Boolean}
         */
        extract: true,

        // 是否在构建样式地图，false将提高构建速度
        sourceMap: false,

        // css预设器配置项
        loaderOptions: {
            css: {
                localIdentName: '[name]',
                camelCase: 'only'
            },
             // 设置 scss 公用变量文件
            sass: {
                data: `@import '~@/assets/css/color.scss';`
            },
            stylus: {}
        }
    },

    // 第三方插件配置
    pluginOptions: {},
    // 单页插件相关配置 https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    pwa: {}
}