define(["wordsCodes","eleUtil","distinguishUtil"],function(wordsCodes,eleUtil,distinguishUtil){
	var wordsAnalyse = {};
	//存放源代码，每一项表示一行
	wordsAnalyse.sourceCodeLines = [];
	//识别出的保留字
	wordsAnalyse.distinguishedWordsAry = [];
	//识别出的错误Map
	wordsAnalyse.errorMesAry = [];
	/**
	 * 词法分析函数，主函数
	 */
	wordsAnalyse.analyse = function(sourceCodeLines){
		clearTable();
		//处理
		handResource(sourceCodeLines);
		//处理完成后处理Token表格
		createTokenTable();
		//处理符号表格
		createSymbolTable();
		//处理错误表格
		displayEroMes();
		//.....
		console.log(wordsAnalyse.errorMesAry);
	}
	
	/**
	 * 处理函数
	 */
	function handResource(sourceCodeLines){
		wordsAnalyse.sourceCodeLines = sourceCodeLines;
		//循环获取每一行
		for(let j = 0; j < sourceCodeLines.length; j ++){
			//打印当前行
			//console.log("当前分析第" + i +"行：",sourceCodeLines[i]);
			let currentLineStr = sourceCodeLines[j];
			let parsedStr = currentLineStr.replace(/\s+/g, "");
			//是否为空行
			if(parsedStr){
				let currentLineStrSize = currentLineStr.length;
				let count = 0;
				//去除开始空格
				while(currentLineStr.charAt(count) == ' ' || currentLineStr.charAt(count) == '	'){
					count ++;
				}
				//分析每一行
				for(let i = count; i < currentLineStrSize;){
					//实数
					if(distinguishUtil.isDigital(currentLineStr.charAt(i))){
						i = distinguishDigital(j,i,currentLineStr,currentLineStrSize);
					}
					//识别字符串常量和字符常量
					else if(currentLineStr.charAt(i) == '"' || currentLineStr.charAt(i) == "'"){
						i = distinguishConstStr(j,i,currentLineStr,currentLineStrSize);
					}
					//识别标识符
					else if(distinguishUtil.isPartOfIdentifier(currentLineStr.charAt(i))){
						i = distinguishIdentifier(j,i,currentLineStr,currentLineStrSize);
					}
					//边界符
					else if(distinguishUtil.isBoundaryChar(currentLineStr.charAt(i))){
						i = distinguishBoundaryChar(j,i,currentLineStr,currentLineStrSize);
					}
					//识别运算符
					else if(distinguishUtil.isBeginOperator(currentLineStr.charAt(i))){
						var t = distinguishOperator(j,i,currentLineStr,currentLineStrSize);
						var s = new Number(t).toLocaleString();
						if(s == "NaN"){
							j = new Number(t.substr(0,t.lastIndexOf(",")));
							break;
						}
						else{
							i = new Number(t);
						}
					}
					else {
						i++;
					}
				}
			}
		}
	}
	
	/**
	 * 识别数字
	 */
	function distinguishDigital(rowNo,colNo,currentLineStr,currentLineStrSize){
		let cwd = "";
		let ch = "";
		while(colNo < currentLineStrSize){
			if(currentLineStr.charAt(colNo) >= '0' && currentLineStr.charAt(colNo) <= '9'){
				//数字阶段
				while(colNo < currentLineStrSize && currentLineStr.charAt(colNo) >= '0' && currentLineStr.charAt(colNo) <= '9'){
					cwd += currentLineStr.charAt(colNo);
					colNo++;
				}
				//首个字符为0的时候，判断数字是否合法，这里只针对十进制数字
				if(cwd.length >= 2){
					if(cwd.charAt(0) == '0'){
						colNo = handDigitalEro(rowNo,colNo,currentLineStr,currentLineStrSize,"数法识别出错");
						break;
					}
				}
				//整数科学记数法或者小数科学记数法或者小数识别
				if(currentLineStr.charAt(colNo) == '.' || currentLineStr.charAt(colNo) == 'e' ||  currentLineStr.charAt(colNo) == 'E'){
					//是否是小数
					let canBeDecimal = false;
					let isRightDecimal = false;
					if(currentLineStr.charAt(colNo) == '.'){
						canBeDecimal = true;
						cwd += ".";
						colNo ++;
					}
					//数字阶段
					while(colNo < currentLineStrSize && currentLineStr.charAt(colNo) >= '0' && currentLineStr.charAt(colNo) <= '9'){
						isRightDecimal = true;
						cwd += currentLineStr.charAt(colNo);
						colNo++;
					}
					if(canBeDecimal === true && isRightDecimal === false){
						//出错
						colNo = handDigitalEro(rowNo,colNo,currentLineStr,currentLineStrSize,"小数识别出错");
						break;
					}
					//科学记数法
					if(colNo < currentLineStrSize && (currentLineStr.charAt(colNo) == 'E' || currentLineStr.charAt(colNo) == 'e')){
						cwd += currentLineStr.charAt(colNo);
						colNo++;
						//表示E或者e后面是否有数字
						let hasNumAfterE = false;
						//识别科学记数法中的+
						if(currentLineStr.charAt(colNo) == '+' || currentLineStr.charAt(colNo) == '-'){
							cwd += currentLineStr.charAt(colNo);
							colNo++;
						}
						//数字阶段
						while(colNo < currentLineStrSize && ( currentLineStr.charAt(colNo) >= '0' && currentLineStr.charAt(colNo) <= '9')){
							//e或者E后面有数字，在当前情况下，还是正确的
							hasNumAfterE = true;
							cwd += currentLineStr.charAt(colNo);
							colNo++;
						}
						//如果e或者E后面没有数字，那么表示当前不能组成一个正确的科学记数法，报错处理
						if(!hasNumAfterE){
							ch = currentLineStr.charAt(colNo);
							//出错
							colNo = handDigitalEro(rowNo,colNo,currentLineStr,currentLineStrSize,"科学计数法识别出错");
							break;
						}
						//存在表达式，判定以后结束
						if(colNo != currentLineStrSize){
							var xp = currentLineStr.charAt(--colNo) === '+';
							//排除23E++3这种情况
							if(xp){
								//出错
								colNo = handDigitalEro(rowNo,++colNo,currentLineStr,currentLineStrSize,"科学计数法识别出错");
								break;
							}
							++colNo;
							ch = currentLineStr.charAt(colNo);
							//表示double 5.4E ; 或者double x = 5E+3/4E-2 或者 5E-2*2E+2等等
							if(distinguishUtil.isEndOfScienceNum(ch)){
								//科学记数法识别完成，填入结果中
								var obj = {text:cwd,rowNo:rowNo+1,colNo:colNo+1,code:106};
								wordsAnalyse.distinguishedWordsAry.push(obj);
								break;
							}
							else{
								colNo = handDigitalEro(rowNo,colNo,currentLineStr,currentLineStrSize,"科学计数法识别出错");
								break;
							}
						}
						else{
							//小数科学记数法识别完成
							var obj = {text:cwd,rowNo:rowNo+1,colNo:colNo+1,code:106};
							wordsAnalyse.distinguishedWordsAry.push(obj);
							break;
						}
					}
					//小数识别完成，填入结果中
					else{
						ch = currentLineStr.charAt(colNo);
						if(distinguishUtil.isEndOfScienceNum(ch)){
							//两个条件满足，就表明小数数字格式正确
							if(canBeDecimal && isRightDecimal){
								var obj = {text:cwd,rowNo:rowNo+1,colNo:colNo+1,code:102};
								wordsAnalyse.distinguishedWordsAry.push(obj);
							}else{
								//跳到操作符或者正常结束的地方
								colNo = handDigitalEro(rowNo,colNo,currentLineStr,currentLineStrSize,"小数识别出错");
							}
							break;
						}
						else{
							//出错
							colNo = handDigitalEro(rowNo,colNo,currentLineStr,currentLineStrSize,"小数识别出错");
							break;
						}
					}
				}
				//整数识别完成，填入结果中
				else{
					ch = currentLineStr.charAt(colNo);
					if(distinguishUtil.isEndOfScienceNum(ch)){
						var obj = {text:cwd,rowNo:rowNo+1,colNo:colNo+1,code:101};
						wordsAnalyse.distinguishedWordsAry.push(obj);
						break;
					}
					else{
						colNo = handDigitalEro(rowNo,colNo,currentLineStr,currentLineStrSize,"整数识别出错");
						break;
					}
				}
			}
		}
		return colNo;
	}
	
	/**
	 * 识别常量字符
	 */
	function distinguishConstStr(rowNo,colNo,currentLineStr,currentLineStrSize){
		let cwd = "";
		//识别常量字符串
		if(currentLineStr.charAt(colNo) == '"'){
			colNo++;
			while((colNo <= (currentLineStrSize - 1)) && currentLineStr.charAt(colNo) != '"'){
				cwd += currentLineStr.charAt(colNo);
				colNo++;
			}
			colNo ++;//这里++是因为后面还有一个"没有识别
			var obj = {text:cwd,rowNo:rowNo+1,colNo:colNo+1,code:103};
			wordsAnalyse.distinguishedWordsAry.push(obj);
			return colNo;
		}
		//识别常量字符
		else{
			colNo++;
			while((colNo <= (currentLineStrSize - 1)) && currentLineStr.charAt(colNo) != "'"){
				cwd += currentLineStr.charAt(colNo);
				colNo++;
			}
			if(cwd.length != 1){
				wordsAnalyse.errorMesAry.push("第" + (rowNo + 1) + "行第" + (colNo+1) + "列"+"请检常量字符的正确性");
			}
			else{
				colNo ++;//这里++是因为后面还有一个'没有识别
				var obj = {text:cwd,rowNo:rowNo+1,colNo:colNo+1,code:105};
				wordsAnalyse.distinguishedWordsAry.push(obj);
				return colNo;
			}
		}
	}
	
	/**
	 * 识别标识符
	 */
	function distinguishIdentifier(rowNo,colNo,currentLineStr,currentLineStrSize){
		let cwd = "";
		cwd += currentLineStr.charAt(colNo);
		colNo++;
		
		while((colNo <= (currentLineStrSize - 1)) && (distinguishUtil.isPartOfIdentifier(currentLineStr.charAt(colNo)) || distinguishUtil.isDigital(currentLineStr.charAt(colNo))) && currentLineStr.charAt(colNo) != ' '){
			cwd += currentLineStr.charAt(colNo);
			colNo ++;
		}
		//判断当前识别出来的单词是否为保留字
		if(distinguishUtil.isSeservedWord(cwd)){
			var obj = {text:cwd,rowNo:rowNo+1,colNo:colNo+1,code:wordsCodes.keywords.get(cwd)};
			wordsAnalyse.distinguishedWordsAry.push(obj);
		}else {
			var obj = {text:cwd,rowNo:rowNo+1,colNo:colNo+1,code:wordsCodes.identifier.get("identifier")};
			wordsAnalyse.distinguishedWordsAry.push(obj);
		}
		return colNo;
	}
	
	/**
	 * 识别操作符和注释
	 */
	function distinguishOperator(rowNo,colNo,currentLineStr,currentLineStrSize){
		let cwd = "";
		cwd += currentLineStr.charAt(colNo);
		colNo++;
		let hasEro = false;
		if(cwd == '/'){
			var next = currentLineStr.charAt(colNo);
			//直接读取下一行数据，这一行忽略
			if(next == '/'){
				return ++currentLineStr.length;
			}
			//多行注释
			else if(next == '*'){
				//使用一个flag来记录/出现的次数
				var flag = 0;
				//记录注释开始的下标
				var rowIndex = rowNo;
				var colIndex = colNo-1;
				var isClose = false;
				while(rowNo < wordsAnalyse.sourceCodeLines.length){
					//新的一行
					currentLineStr = wordsAnalyse.sourceCodeLines[rowNo];
					colNo = 0;
					//跳开空格
					while(colNo < currentLineStr.length && (currentLineStr.charAt(colNo) == ' ' || currentLineStr.charAt(colNo) == '	')){
						colNo ++;
					}
					//识别一行
					while(flag != 2 && colNo < currentLineStr.length){
						if(currentLineStr.charAt(colNo) == '/'){
							flag ++;
							//记录一下注释的下标
						}
						colNo ++;
						continue;
					}
					//如果没有结尾
					if(flag != 2){
						rowNo++;
						continue;
					}
					else if(flag == 2 && currentLineStr.charAt(colNo - 2) == '*'){
						isClose = true;
						break;
					}
					else{
						//表示多行注释之间可能有/
						flag --;
						rowNo++
						continue;
					}
				}
				//识别完成，看是否有错误
				if(!isClose){
					wordsAnalyse.errorMesAry.push("第" + (rowIndex+1) + "行第" + (colIndex+1) + "列请检查注释的正确性");
				}
				return rowNo + ",";
			}
		}
		//操作符
		while((colNo <= (currentLineStrSize - 1)) && currentLineStr.charAt(colNo) != ' ' && distinguishUtil.isPartOfOperator(currentLineStr.charAt(colNo))){
			cwd += currentLineStr.charAt(colNo);
			//如果当前单操作符组成的操作符不合法，做报错处理
			if(!wordsCodes.operators.has(cwd)){
				hasEro = true;
			}
			colNo ++;
		}
		if(hasEro){
			wordsAnalyse.errorMesAry.push("第" + (rowNo+1) + "行第" + (colNo+1) + "列请检查运算符的正确性");
		}
		else{
			var obj = {text:cwd,rowNo:rowNo+1,colNo:colNo+1,code:wordsCodes.operators.get(cwd)};
			wordsAnalyse.distinguishedWordsAry.push(obj);
		}
		return colNo;
	}
	
	/**
	 * 识别边界符
	 */
	function distinguishBoundaryChar(rowNo,colNo,currentLineStr,currentLineStrSize){
		var cht = currentLineStr.charAt(colNo);
		var obj = {text:cht,rowNo:rowNo+1,colNo:colNo+1,code:wordsCodes.boundarys.get(cht)};
		wordsAnalyse.distinguishedWordsAry.push(obj);
		colNo ++;
		return colNo;
	}
	
	/**
	 * 生成token表
	 */
	function createTokenTable(){
		console.log(wordsAnalyse.distinguishedWordsAry);
		eleUtil.insert(document.getElementById("tokentable"),wordsAnalyse.distinguishedWordsAry);
	}
	
	/**
	 * 生成符号表
	 */
	function createSymbolTable(){
		var tempMap = new Map();
		var tempAry = [];
		for(let i = 0; i < wordsAnalyse.distinguishedWordsAry.length; i ++){
			tempMap.set(wordsAnalyse.distinguishedWordsAry[i].text,wordsAnalyse.distinguishedWordsAry[i]);
		}
		for(let value of tempMap.values()){
			if(distinguishUtil.isIdentifierOrDigital(value)){
				if(value["code"] == 130){
					type = "标识符";
				}
				if(value["code"] == 101){
					type = "常整数";
				}
				if(value["code"] == 102){
					type = "小数";
				}
				if(value["code"] == 103){
					type = "字符串常量";
				}
				if(value["code"] == 104){
					type = "布尔常量";
				}
				if(value["code"] == 105){
					type = "字符常量";
				}
				if(value["code"] == 106){
					type = "科学记数法";
				}
				var tmoj = {text:value["text"],length:value["text"].length,type:type,code:value["code"]}
				tempAry.push(tmoj);
			}
		}
		console.log(tempAry);
		eleUtil.insert(document.getElementById("symboltable"),tempAry);
	}
	
	/**
	 * 显示错误信息
	 */
	function displayEroMes(){
		eleUtil.displayEroMes(document.getElementById("erotable"),wordsAnalyse.errorMesAry);
	}
	
	/**
	 * 清除表格
	 */
	function clearTable(){
		wordsAnalyse.distinguishedWordsAry = [];
		wordsAnalyse.errorMesAry = [];
		document.getElementById("tokentable").innerHTML = "";
		document.getElementById("symboltable").innerHTML = "";
	}
	
	/**
	 * 统一处理数字识别错误
	 */
	function handDigitalEro(rowNo,colNo,currentLineStr,currentLineStrSize,eroMes){
		//出错
		wordsAnalyse.errorMesAry.push("第" + (rowNo + 1) + "行第" + (colNo+1) + "列"+eroMes);
		ch = currentLineStr.charAt(colNo);
		//跳到操作符或者正常结束的地方
		while(colNo < currentLineStrSize && !(distinguishUtil.isEndOfScienceNum(ch))){
			colNo ++;
			ch = currentLineStr.charAt(colNo);
		}
		return colNo;
	}
	
	return wordsAnalyse;
});