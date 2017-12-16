var webpack = require ("webpack");

var path = require('path');

module.exports= {
	entry:'./js/index.js',
	output:{
		filename:'./js/dist/main.js'
	},
	module:{
		loaders:[
			{test:/\.vue$/,loader:'vue-loader'},
			{
				test: /\.css$/, 
				loader: 'style-loader!css-loader!autoprefixer-loader'
			}
		]
	},
	resolve: {//设置别名
	    alias: { 
	    	//将vue设置为引用整个dist文件
	    	//更改vue引用为全局路径
	    	//因为vue2.x以后 只加载vue.js文件 缺少模板解析
	    	//更改vue别名 引用vue下dist下所有的vue文件
	        vue: path.join(__dirname,'./node_modules/vue/dist/vue'),
	        components:path.resolve(__dirname,'../js/components'),
	        img:path.resolve(__dirname,'/../img')
	    }
  	}
} 
