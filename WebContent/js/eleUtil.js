/**
 * 工具模块
 */
define([],function(){
	var eleUtil = {};

	/**
	 * 插入动态表格
	 */
	eleUtil.insert = function(dom,data){
		dom.innerHTML = "";
		if(data.length > 0){
			for(let i = 0;i < data.length; i ++){
				var tr = document.createElement("tr");
				for(var key in data[i]){
					var td = document.createElement("td");
					td.innerText = data[i][key];
					tr.appendChild(td);
				}
				dom.appendChild(tr);
			}
		}
		else{
			var tr = document.createElement("tr");
			var td = document.createElement("td");
			td.innerText = "暂无信息！";
			tr.appendChild(td);
			tr.style.height = "240px";
		    tr.style.textAlign = "center";
			dom.appendChild(tr);
		}
	};

	eleUtil.displayEroMes = function(dom,data){
		dom.innerHTML = "";
		if(data.length > 0){
			dom.style.classList = "";
			for(let i = 0;i < data.length; i ++){
				var tr = document.createElement("tr");
				var td = document.createElement("td");
				td.innerText = data[i];
				tr.appendChild(td);
				tr.style.color = "#e04f4f";
				dom.appendChild(tr);
			}
		}
		else{
			var tr = document.createElement("tr");
			var td = document.createElement("td");
			td.innerText = "暂无信息！";
			tr.appendChild(td);
			tr.style.height = "226px";
		    tr.style.textAlign = "center";

			dom.appendChild(tr);
		}
	}

	return eleUtil;
});