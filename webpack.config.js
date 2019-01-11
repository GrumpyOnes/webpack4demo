
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
	entry:'./src/js/index.js',
	output:{
		path:path.resolve(__dirname,'public'),
		filename:'js/bundle-[hash].js'
	},
	devServer:{//本地服务的路径
		contentBase:'./public',
		inline:true

	},
	module:{
		rules:[
		{
			test:/\.css$/,
			//use:['style-loader','css-loader']
			use:ExtractTextPlugin.extract({
				fallback:'style-loader',
				use:[{
					loader:'css-loader',
					// options: {
                    
	 //                minimize: true,//代码压缩无效
	 //minimize: process.env.NODE_ENV === 'production'
     //            	}
				}],
				publicPath:'../'
			})
			// use: [{
			// 	loader:MiniCssExtractPlugin.loader,
			// 	options:{
			// 		loader: 'css-loader',
			// 		options: {
			// 			minimize: process.env.NODE_ENV === 'production'
			// 		}
			// 	}
			// }
			// ]
		},{
			test:/\.(jpg|png)$/,
			use:['file-loader']
		},{
			test:/\.html$/,
			use:['html-withimg-loader']
		},{
			test:/\.(woff|ttf|svg|eot|xttf|woff2)$/,
			use:'file-loader?limit=1024&name=./fonts/[name].[ext]'
		},{
			test:/\.(jsx|js)/,
			use:{
				loader:'babel-loader',
				// options:{//这两行拿到了.babelrc里面
				// 	presets:['env','react']
				// }
			},
			exclude:/node_modules/
		}]
	},
	plugins:[
		new ExtractTextPlugin('./css/[name].css'),
		new HtmlWebpackPlugin({
			template:'./src/index.html',
			//filename:'a.html' 
			minify:{
				//去除引号 去除注释  去除空属性 去除空格回车
				removeAttributeQuotes:true,
				removeComments:true,
				removeEmptyAttributes:true,
				collapseWhitespace:true
			}
		})
	]
}