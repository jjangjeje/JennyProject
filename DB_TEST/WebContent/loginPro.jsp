<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<%@ page import="java.util.*" %>
<%@ page import="com.performance.manager.PerformanceManager" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>
<body>

<% request.setCharacterEncoding("euc-kr");  
	
	String id = request.getParameter("id");
	String pw = request.getParameter("pw");
	/* ���޹��� �Ķ���� ������ */
	
	PerformanceManager pm = PerformanceManager.getInstance();
	
	HashMap<String,Object> map = new HashMap<String,Object>();
	map.put("id", id); /* map�� ���� */
	map.put("pw", pw);

	int idCount = pm.loginCheck(map); 	
	 
	if(idCount != 0){
		map.put("mnId",id);
		HashMap info = pm.infoById(map);
				
		session.setAttribute("MANAGER_NAME", info.get("MANAGER_NAME"));
		/* ���ǿ� �ʿ��ִ� �̸� �����ͼ� ���� */
		session.setAttribute("MANAGER_NO", info.get("MANAGER_NO"));
		
%>
	<script type="text/javascript">
	
	alert("<%=id%>�� �α��� �Ǿ����ϴ�.");
	window.location = "main.jsp";
	</script>

<%		
	}else{
%>
	<script type="text/javascript">
	alert("��ġ�ϴ� ������ �����ϴ�.");
	history.go(-1);
	</script>
<%
	}
%>




</body>
</html>