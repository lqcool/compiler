define(["wordsCodes"],function(wordsCodes){
	var distinguishUtil = {};
	/**
	 * 判断是否为保留字（关键字）
	 */
	distinguishUtil.isSeservedWord = function (word){
		//是否为保留字中的一员
		return wordsCodes.keywords.has(word);
	}
	
	/**
	 * 是否为标识符和数字
	 */
	distinguishUtil.isIdentifierOrDigital = function(obj){
		if(obj.code == 130 || obj.code == 101 || obj.code == 103 || obj.code == 104 || obj.code == 105 || obj.code == 102 || obj.code == 106){
			return true;
		}
		return false;
	}
	
	/**
	 * 是否是标识符的一部分，数字单独考虑，因为数字不能作为标识符的开头
	 */
	distinguishUtil.isPartOfIdentifier = function(ch){
		return (
				(ch >= 'a' && ch <= 'z') || 
				(ch >= 'A' && ch <= 'Z') ||
				ch== '$' ||
				ch== '_' );
	}
	
	/**
	 * 是否是数字的一部分
	 */
	distinguishUtil.isPartOfDigital = function(ch){
		return (
				(ch >= '0' && ch <= '9') || 
				ch == '.' || 
				ch == "E" || 
				ch == "e" );
	}
	
	/**
	 * 判断是否为数字
	 */
	distinguishUtil.isDigital = function(ch){
		return (ch>= '0' && ch<= '9');
	}
	
	/**
	 * 判断是否为界符
	 */
	distinguishUtil.isBoundaryChar = function(ch){
		return (
				ch == ';' || 
				ch == '‘' || 
				ch == '’' || 
				ch == '“' || 
				ch == '”' || 
				ch == '(' || 
				ch == ')' || 
				ch == '{' || 
				ch == '}' ||
				ch == ';');
	}
	
	
	/**
	 * 是否为操作符的开始符
	 */
	distinguishUtil.isBeginOperator = function(ch){
		return (
				ch == '=' ||
				ch == '/' ||
				ch == '>' ||
				ch == '<' ||
				ch == '+' || 
				ch == '-' || 
				ch == '*' || 
				ch == '%' ||
				ch == '.' ||
				ch == '&' ||
				ch == '|' ||
				ch == '!' ||
				ch == '~' ||
				ch == '^');
	}
	/**
	 * 是否为操作符的一部分
	 */
	distinguishUtil.isPartOfOperator = function(ch){
		return (
				ch == '=' ||
				ch == '/' ||
				ch == '>' ||
				ch == '<' ||
				ch == '+' || 
				ch == '-' || 
				ch == '*' || 
				ch == '%' ||
				ch == '.' ||
				ch == '&' ||
				ch == '|' ||
				ch == '!' ||
				ch == '~' ||
				ch == '^' ||
				ch == '/' ||
				ch == '?' ||
				ch == ':');
	}
	
	//是否是科学计数法结尾
	distinguishUtil.isEndOfScienceNum = function(ch){
		return (
				ch == '/n'||
				ch == ' ' || 
				ch =='	' || 
				ch == ';' || 
				ch == ',' || 
				ch == ')' || 
				ch == '+' || 
				ch == '-' || 
				ch == '*' || 
				ch == '/' || 
				ch == '!' || 
				ch == '>' || 
				ch == '<' || 
				ch == '=' || 
				ch == '%' || 
				ch == ':');
	}
	
	return distinguishUtil;
	
});