module.exports = {
    devServer: {
        host:'localhost',
        port:8089,
        // overlay: {
        //     warnings: false,
        //     errors: false
        // },
        proxy:{
           '/api':{
               target:"http://api.4yue.top/index.php/",
               changeOrigin:true,
               pathRewrite:{
                   '^/api':''
               }
           } 
        }
    },
    lintOnSave: false,
    chainWebpack:config => {
        config.plugins.delete('prefetch')
    }
  }