//配置
require.config({
	baseUrl:"../js",
	//指定各个模块的位置，位置可以是同一个服务器，也可以在不同的服务器
	paths:{
		jquery:"../js/jquery-2.1.1/jquery",
		moduleIndex:"../js/module-index",
		//wordsAnalyse:"../js/wordsAnalyse",
		//wordsCodes:"../js/worldsCodes"
	},
	//配置非AMD标准的js文件
	shim:{
		moduleIndex:{
			deps:["jquery"],
			exports:'moduleIndex'
		}
	}
})

//这里能够直接require jquery因为jquery已经在,paths属性中定义，会事先到设定的位置下载。
require(["jquery","moduleIndex"],function($,moduleIndex){
	window.$ = $;
	window.moduleIndex = moduleIndex;
	//alert("加载完成");
});