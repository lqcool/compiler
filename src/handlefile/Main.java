package handlefile;

public class Main {

	public static void main(String[] args) {
		String word = "pu cc void mai（）n9 () Str{ing ar}gs () DDD";
		String sss = "\n";
		//String cwd = "";
		String sp_3x3 = "";
		int x = 0;
//		if(){
//			
//		}
		
		
		for(int i = 0; i <= word.length() - 1; i ++){
			while(i <= (word.length() - 1) && word.charAt(i) != ' '){
				//数字
				if(isDigital(word.charAt(i))){
					String num = "";
					num += word.charAt(i);
					i ++;
					
					while((i <= (word.length() - 1)) && word.charAt(i) != ' '){
						num += word.charAt(i);
						i ++;
					}
					System.out.println("标识符："+num);
				}
				//识别标识符
				else if(isPartOfIdentifier(word.charAt(i))){
					//关键字或者是保留字
					String cwd = "";
					cwd += word.charAt(i);
					i++;
					
					while((i <= (word.length() - 1)) && (isPartOfIdentifier(word.charAt(i)) || isDigital(word.charAt(i))) && word.charAt(i) != ' '){
						cwd += word.charAt(i);
						i ++;
					}
					System.out.println("标识符："+cwd);
				}
				//界符
				else if(isBoundaryChar(word.charAt(i))) {
					System.out.println("界符：" + word.charAt(i));
					i++;
				}
				else {
					System.out.println("识别出错，请检查正确性========》" + word.charAt(i));
					i++;
				}
			}
		}
		
	}
	
	public static boolean isBiaoZhiFu(){
		return true;
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
	
	/*public static boolean isOperator(){
		return (c == );
	}*/
}
