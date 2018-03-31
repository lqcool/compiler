define([],function(){
	var words = {};
	words.keywords = new Map();
	words.operators = new Map();
	words.constants = new Map();
	words.identifier = new Map();
	words.boundarys = new Map();
	
	//关键字信息
	let keywords = [{text:"public",code:"1"},{text:"protected",code:"2"},
	                  {text:"private",code:"3"},{text:"class",code:"4"},
	                  {text:"interface",code:"5"},{text:"abstract",code:"6"},
	                  {text:"implements",code:"7"},{text:"extends",code:"8"},
	                  {text:"new",code:"9"},{text:"import",code:"10"},
	                  {text:"package",code:"11"},{text:"byte",code:"12"},
	                  {text:"char",code:"13"},{text:"boolean",code:"14"},
	                  {text:"short",code:"15"},{text:"int",code:"16"},
	                  {text:"float",code:"17"},{text:"long",code:"18"},
	                  {text:"double",code:"19"},{text:"void",code:"20"},
	                  {text:"null",code:"21"},{text:"true",code:"22"},
	                  {text:"false",code:"23"},{text:"if",code:"24"},
	                  {text:"else",code:"25"},{text:"while",code:"26"},
	                  {text:"for",code:"27"},{text:"switch",code:"28"},
	                  {text:"case",code:"29"},{text:"default",code:"30"},
	                  {text:"do",code:"31"},{text:"break",code:"32"},
	                  {text:"continue",code:"33"},{text:"return",code:"34"},
	                  {text:"instanceof",code:"35"},{text:"static",code:"36"},
	                  {text:"final",code:"37"},{text:"super",code:"38"},
	                  {text:"this",code:"39"},{text:"native",code:"40"},
	                  {text:"strictfp",code:"41"},{text:"synchronized",code:"42"},
	                  {text:"transient",code:"43"},{text:"volatile",code:"44"},
	                  {text:"catch",code:"45"},{text:"try",code:"46"},
	                  {text:"finally",code:"47"},{text:"throw",code:"48"},
	                  {text:"throws",code:"49"},{text:"enum",code:"50"},
	                  {text:"assert",code:"51"},{text:"goto",code:"52"},
	                  {text:"const",code:"53"}
	                  ];
	//运算符
	let operators = [
	                   {text:"+",code:"61"},{text:"-",code:"62"},
	                   {text:"*",code:"63"},{text:"/",code:"64"},
	                   {text:"%",code:"65"},{text:"++",code:"66"},
	                   {text:"--",code:"67"},{text:"==",code:"68"},
	                   {text:"!=",code:"69"},{text:">",code:"70"},
	                   {text:"<",code:"71"},{text:">=",code:"72"},
	                   {text:"<=",code:"73"},{text:"&",code:"74"},
	                   {text:"|",code:"75"},{text:"^",code:"76"},
	                   {text:"~",code:"77"},{text:"<<",code:"78"},
	                   {text:">>",code:"79"},{text:">>>",code:"80"},
	                   {text:"&&",code:"81"},{text:"||",code:"82"},
	                   {text:"!",code:"83"},{text:"=",code:"84"},
	                   {text:"+=",code:"85"},{text:"-=",code:"86"},
	                   {text:"*=",code:"87"},{text:"%=",code:"88"},
	                   {text:"<<=",code:"89"},{text:">>=",code:"90"},
	                   {text:"&=",code:"91"},{text:"^=",code:"92"},
	                   {text:"|=",code:"93"},{text:"?:",code:"94"},
	                   {text:",",code:"95"},{text:".",code:"96"} 
	                   ];
	
	//常数
	let constants = [
	                   {text:"整数常量",code:"101"},
	                   //{text:"常实数",code:"102"},
	                   {text:"字符串常量",code:"103"},
	                   {text:"布尔常量",code:"104"},
	                   {text:"字符常量",code:"105"}
	                   ];
	//界符
	let boundarys = [
	                   {text:";",code:"111"},
	                   {text:"’",code:"112"},
	                   {text:"‘",code:"113"},
	                   {text:"“",code:"114"},
	                   {text:"”",code:"115"},
	                   //{text:"//",code:"116"},
	                   //{text:"/*",code:"117"},
	                   //{text:"*/",code:"118"},
	                   {text:"(",code:"119"},
	                   {text:")",code:"120"},
	                   {text:"{",code:"121"},
	                   {text:"}",code:"122"},
	                   ];
	//标识符
	let identifier = [{text:"identifier",code:"130"}];
	
	//初始化maps
	for(let i = 0; i < keywords.length; i ++){
		words.keywords.set(keywords[i].text,keywords[i].code);
	}
	//初始化map
	for(let i = 0; i < operators.length; i ++){
		words.operators.set(operators[i].text,operators[i].code);
	}
	
	//初始化map
	for(let i = 0; i < constants.length; i ++){
		words.constants.set(constants[i].text,constants[i].code);
	}
	
	//初始化map
	for(let i = 0; i < boundarys.length; i ++){
		words.boundarys.set(boundarys[i].text,boundarys[i].code);
	}
	
	//初始化map
	for(let i = 0; i < identifier.length; i ++){
		words.identifier.set(identifier[i].text,identifier[i].code);
	}
	
	return words;
});

