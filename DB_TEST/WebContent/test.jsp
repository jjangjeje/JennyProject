<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<%@ page import="java.util.*" %>
<%@ page import="com.performance.manager.PerformanceManager" %>
    
<% request.setCharacterEncoding("euc-kr");  
	
	/* List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
	 */

	List list = new ArrayList();
	PerformanceManager pm = PerformanceManager.getInstance();

	list = pm.getTest();
	
		
%>
	

    
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>
<body>
<%	
	HashMap<String, Object> map;
	
	for(int i=0; i<list.size(); i++){
		map = new HashMap<String, Object>();
		map = (HashMap<String, Object>)list.get(i);
		
		String COURSE_NAME = (String)map.get("COURSE_NAME");
		String COURSE_START_DATE = (String)map.get("COURSE_START_DATE");
		String COURSE_END_DATE = (String)map.get("COURSE_END_DATE");
		String GET_WEEK_STR = (String)map.get("GET_WEEK_STR");
		String SCHEDULE_RECEIPT_FLAG = (String)map.get("SCHEDULE_RECEIPT_FLAG");
			
		System.out.print(map.toString());
		
%>
<table>
	<tr>
		<td><%=COURSE_NAME%></td>
		<td><%=COURSE_START_DATE%></td>
		<td><%=COURSE_END_DATE%></td>
		<td><%=GET_WEEK_STR%></td>
		<td><%=SCHEDULE_RECEIPT_FLAG%></td>
	</tr>	
</table>
<% 
	}
%>
</body>
</html>