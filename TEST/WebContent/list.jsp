<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<%@ page import="java.util.HashMap" %>
<%@ page import="java.util.*" %>
<%@ page import="list.Test" %>    
    
<% request.setCharacterEncoding("euc-kr");  
	
	List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
	
	Test info = new Test();
	list = info.Info();

	
%>
    
    
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>
<body>

<% 
	HashMap<String, Object> map;// = new HashMap<String, Object>();
	
	String COURSE_NAME = null;
	String COURSE_START_DATE =null;
	String COURSE_END_DATE =null;
	String COURSE_WEEK =null;
	String SCHEDULE_RECEIPT_FLAG =null;
	

	for(int i=0; i<list.size(); i++){
		map = new HashMap<String, Object>();
		map = (HashMap<String, Object>)list.get(i);
		
		System.out.println(map.toString());
		
%>
	
<% 
	}
%>

</body>
</html>