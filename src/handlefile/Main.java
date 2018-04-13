package handlefile;

public class Main {

	public static void main(String[] args) {
		String word = "pu cc void mai（）n9 () Str{ing ar}gs () DDD";
		String sss = "\n";
		//String cwd = "";
		String sp_3x3 = "";
		double x = 4.5E-223+23E+3;
		double v = 6E+2;
		
//		for(int i = 0; i <= word.length() - 1; i ++){
//			while(i <= (word.length() - 1) && word.charAt(i) != ' '){
//				//数字
//				if(isDigital(word.charAt(i))){
//					String num = "";
//					num += word.charAt(i);
//					i ++;
//					
//					while((i <= (word.length() - 1)) && word.charAt(i) != ' '){
//						num += word.charAt(i);
//						i ++;
//					}
//					System.out.println("标识符："+num);
//				}
//				//识别标识符
//				else if(isPartOfIdentifier(word.charAt(i))){
//					//关键字或者是保留字
//					String cwd = "";
//					cwd += word.charAt(i);
//					i++;
//					
//					while((i <= (word.length() - 1)) && (isPartOfIdentifier(word.charAt(i)) || isDigital(word.charAt(i))) && word.charAt(i) != ' '){
//						cwd += word.charAt(i);
//						i ++;
//					}
//					System.out.println("标识符："+cwd);
//				}
//				//界符
//				else if(isBoundaryChar(word.charAt(i))) {
//					System.out.println("界符：" + word.charAt(i));
//					i++;
//				}
//				else {
//					System.out.println("识别出错，请检查正确性========》" + word.charAt(i));
//					i++;
//				}
//			}
//		}
		
		dsx();
		
	}
	
	public static void dsx(){
		String xp = "32.;";
		int colNo = 0;
		int len = xp.length();
		String cwd = "";
		while(colNo < len){
			if(xp.charAt(colNo) >= '0' && xp.charAt(colNo) <= '9'){
				//数字阶段
				while(colNo < len && xp.charAt(colNo) >= '0' && xp.charAt(colNo) <= '9'){
					cwd += xp.charAt(colNo);
					colNo++;
				}
				//整数科学记数法或者小数科学记数法或者小数识别
				if(xp.charAt(colNo) == '.' || xp.charAt(colNo) == 'e' ||  xp.charAt(colNo) == 'E'){
					//是否是小数
					boolean canBeDecimal = false;
					boolean isRightDecimal = false;
					if(xp.charAt(colNo) == '.'){
						canBeDecimal = true;
						cwd += ".";
						colNo ++;
					}
					//数字阶段
					while(colNo < len && xp.charAt(colNo) >= '0' && xp.charAt(colNo) <= '9'){
						isRightDecimal = true;
						cwd += xp.charAt(colNo);
						colNo++;
					}
					//科学记数法
					if(colNo < len && (xp.charAt(colNo) == 'E' || xp.charAt(colNo) == 'e')){
						cwd += xp.charAt(colNo);
						colNo++;
						//表示E或者e后面是否有数字
						boolean hasNumAfterE = false;
						//数字阶段
						while(colNo < len && xp.charAt(colNo) >= '0' && xp.charAt(colNo) <= '9'){
							//e或者E后面有数字，在当前情况下，还是正确的
							hasNumAfterE = true;
							cwd += xp.charAt(colNo);
							colNo++;
						}
						//如果e或者E后面没有数字，那么表示当前不能组成一个正确的科学记数法，报错处理
						if(!hasNumAfterE){
							char ch = xp.charAt(colNo);
							//出错
							System.out.println("小数识别出错" + (colNo + 1) + "列");
							//跳到操作符或者正常结束的地方
							while(colNo < len && !(ch == ' ' || ch=='	' || ch== ';' || ch== ',' || ch== ')' || ch == '+' || ch == '-' || ch == '*' || ch == '/' || ch == '!' || ch == '>' || ch == '<' || ch == '=' || ch == '%' || ch == ':')){
								colNo ++;
								ch = xp.charAt(colNo);
							}
							break;
						}
						//识别科学记数法中的+
						if(xp.charAt(colNo) == '+' || xp.charAt(colNo) == '-'){
							cwd += xp.charAt(colNo);
							colNo++;
						}
						//识别科学记数法中+号后面的数字
						//数字阶段
						while(colNo < len && xp.charAt(colNo) >= '0' && xp.charAt(colNo) <= '9'){
							//e或者E后面有数字，在当前情况下，还是正确的
							hasNumAfterE = true;
							cwd += xp.charAt(colNo);
							colNo++;
						}
						//存在表达式，判定以后结束
						if(colNo != len){
							char ch = xp.charAt(colNo);
							//表示double 5.4E ; 或者double x = 5E+3/4E-2 或者 5E-2*2E+2等等
							if(ch == ' ' || ch=='	' || ch== ';' || ch== ',' || ch== ')' || ch == '+' || ch == '-' || ch == '*' || ch == '/' || ch == '!' || ch == '>' || ch == '<' || ch == '=' || ch == '%' || ch == ':'){
								//科学记数法识别完成，填入结果中
								System.out.println("科学记数法放入结果中");
								break;
							}
							else{
								System.out.println("识别出错" + (colNo + 1) + "列");
								//跳到操作符或者正常结束的地方
								while(colNo < len && !(ch == ' ' || ch=='	' || ch== ';' || ch== ',' || ch== ')' || ch == '+' || ch == '-' || ch == '*' || ch == '/' || ch == '!' || ch == '>' || ch == '<' || ch == '=' || ch == '%' || ch == ':')){
									colNo ++;
									ch = xp.charAt(colNo);
								}
							}
						}
						else{
							//小数科学记数法识别完成
							System.out.println("小数科学记数法识别完成");
						}
					}
					//小数识别完成，填入结果中
					else{
						char ch = xp.charAt(colNo);
						if(ch == ' ' || ch=='	' || ch== ';' || ch== ',' || ch== ')' || ch == '+' || ch == '-' || ch == '*' || ch == '/' || ch == '!' || ch == '>' || ch == '<' || ch == '=' || ch == '%' || ch == ':'){
							if(canBeDecimal && isRightDecimal){
								System.out.println("小数放入结果中");
							}
							else{
								//出错
								System.out.println("小数识别出错" + (colNo + 1) + "列");
								//跳到操作符或者正常结束的地方
								while(colNo < len && !(ch == ' ' || ch=='	' || ch== ';' || ch== ',' || ch== ')' || ch == '+' || ch == '-' || ch == '*' || ch == '/' || ch == '!' || ch == '>' || ch == '<' || ch == '=' || ch == '%' || ch == ':')){
									colNo ++;
									ch = xp.charAt(colNo);
								}
							}
							break;
						}
						else{
							//出错
							System.out.println("小数识别出错" + (colNo + 1) + "列");
							//跳到操作符或者正常结束的地方
							while(colNo < len && !(ch == ' ' || ch=='	' || ch== ';' || ch== ',' || ch== ')' || ch == '+' || ch == '-' || ch == '*' || ch == '/' || ch == '!' || ch == '>' || ch == '<' || ch == '=' || ch == '%' || ch == ':')){
								colNo ++;
								ch = xp.charAt(colNo);
							}
							break;
						}
					}
				}
				//整数识别完成，填入结果中
				else{
					char ch = xp.charAt(colNo);
					if(ch == ' ' || ch=='	' || ch== ';' || ch== ',' || ch== ')' || ch == '+' || ch == '-' || ch == '*' || ch == '/' || ch == '!' || ch == '>' || ch == '<' || ch == '=' || ch == '%' || ch == ':'){
						System.out.println("整数放入结果中");
						break;
					}
					else{
						//出错
						//跳到操作符或者正常结束的地方
						while(colNo < len && !(ch == ' ' || ch=='	' || ch== ';' || ch== ',' || ch== ')' || ch == '+' || ch == '-' || ch == '*' || ch == '/' || ch == '!' || ch == '>' || ch == '<' || ch == '=' || ch == '%' || ch == ':')){
							colNo ++;
							ch = xp.charAt(colNo);
						}
						break;
					}
				}
			}
		}
		
		System.out.println(cwd);
	}
	
	public static boolean isBiaoZhiFu(){
		double x = 3%4 ;
		double pp = 3.4E5,xx = 4.5E8	;
		//double g  = 4:3;
		double dd = 5E3 + 3;
		int t = (4>3)?3:4;
		return (1>2);
	}
	
	
	/**
	 * TODO:是否为数字
	 * @return boolean
	 * @author AbnerLi
	 * @time 2018年3月26日
	 */
	public static boolean isDigital(char c){
		return c>= '0' && c<= '9';
	}
	
	/**
	 * TODO:是否是标识符的一部分，数字单独考虑，因为数字不能作为标识符的开头
	 * @return boolean
	 * @author AbnerLi
	 * @time 2018年3月26日
	 */
	public static boolean isPartOfIdentifier(char c){
		return ((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z')||c=='$'||c=='_');
	}
	
	/**
	 * TODO:判断是否为界符
	 * @return boolean
	 * @author 李桥
	 * @time 2018年3月24日
	 */
	public static boolean isBoundaryChar(char c){
		return (c == ';' || c == '‘' || c == '’' || c == '“' || c == '”' || c == '(' || c == ')' || c == '{' || c == '}');
	}
	
}
