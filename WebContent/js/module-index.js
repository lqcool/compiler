define(["wordsAnalyse"],function(wordsAnalyse){
	
	console.log(wordsAnalyse);
	//模块
	var moduleIndex = {};
	moduleIndex.gn = null;
	moduleIndex.sourceCodeLines = [];
	
	moduleIndex.importFile = function () {
		$("#file").click();
	};

	/**
	 * 读取文件
	 */
	moduleIndex.readFile = function (){
		//读取文件File对象
		var selectedFile = document.getElementById("file").files[0];
		var filename = selectedFile.name;
		var filesize = selectedFile.size;
		var houzui = filename.substring(filename.lastIndexOf("."));
		console.log("选中文件" + filename + "，文件大小：" + filesize);
		if (!('.java' === houzui)) {
			alert("请选择以.java结尾的文件");
			return;
		}
		var reader = new FileReader();
		//读取完成时的回掉，文件数据存放于result中
		reader.onload = function() {
			document.getElementById("code").innerHTML = this.result;
			document.getElementById("filename").innerText = filename;
		};
		//以文本方式读取文件，格式为UTF-8
		reader.readAsText(selectedFile, "UTF-8");
	};
	

	/**
	 * 保存文件
	 */
	moduleIndex.saveFile = function (){
		var content = document.getElementById("code").value;
		var filename = document.getElementById("filename").innerText;
		if(filename==""){
			alert("请先打开一个文件");
		}
		else{
			$.ajax({
				type:"POST", 	 	
				url:"/compiler/FileSave",
				data:{content:content,filename:filename},
				success:function(data){
					alert("保存文件成功");
				},
				error:function(){
					alert("保存文件出错！");
				}
			});
		}
	};

	moduleIndex.isSaveCanUse = function (){
		var filename = document.getElementById("filename").innerText;
		if(!filename){
			var elements = document.querySelectorAll(".save");
			//优化的循环
			for(var i = 0; i<elements.length;i++){
				elements[i].disabled=false;
			}
		}
		else{
			var elements = document.querySelectorAll(".save");
			//优化的循环
			for(var i = 0; i<elements.length;i++){
				elements[i].disabled = true;
			}
		}
	};

	/**
	 * 开始进行词法分析
	 */
	moduleIndex.analyse = function (){
		/*for(var i = 0; i < fileLines.length; i ++){
			
		}*/
//		var result = moduleIndex.gn.next();
//		if(!result.done){
//			document.getElementById("SSS").innerHTML+=result.value;
//		}
		var content = document.getElementById("code").value;
		sourceCodeLines = content.split("\n");
		wordsAnalyse.analyse(sourceCodeLines);
	};

	/**
	 * Generator函数
	 */
//	moduleIndex.generator = function* (){
//		var content = document.getElementById("code").value;
//		fileLines = content.split("\n");
//		for(var i = 0; i < fileLines.length; i ++){
//			yield fileLines[i];
//		}
//	};

	$(document).ready(function(){
		//CTRL + S保存
		document.addEventListener("keydown",function(e){
			if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)&& document.activeElement === document.getElementById("code")){
				e.preventDefault();
				/*var blob = new Blob([document.getElementById("code").innerHTML], {type: "text/plain;charset=utf-8"});
				saveAs(blob, "D://hello world.txt");*/
				moduleIndex.saveFile();
			}
		});
		//事件委托机制，利用事件冒泡原理，是一种优化方式
		document.addEventListener("click",function(e){
			var target = e.target;
			if(target.id==="filemenu"){
				document.getElementById("file-child-men").style.display="block";
				document.getElementById("worldsanly-child-men").style.display="none";
			}
			else if(target.id==="worldsanlymenu"){
				document.getElementById("worldsanly-child-men").style.display="block";
				document.getElementById("file-child-men").style.display="none";
			}
			else {
				document.getElementById("file-child-men").style.display="none";
				document.getElementById("worldsanly-child-men").style.display="none";
			}
		});
	});
	
	return moduleIndex;
});