<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<%@ page session="true"%>    
<%@ page import="java.util.*" %>
<%@ page import="com.performance.manager.PerformanceManager" %>
<%@ page import="com.performance.vo.PerformanceVO" %>
<%
	String mnName = (String)session.getAttribute("MANAGER_NAME");	
	String mnNo = (String)session.getAttribute("MANAGER_NO");
	/* 세션에 있는 이름과 번호 가져옴 */

	PerformanceManager pm = new PerformanceManager();
	List courseList = new ArrayList();
	
	courseList = pm.infoCourse();
	
	//System.out.println(course);
%>



<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="ko">
<head>
<meta charset="UTF-8">
<title>성동구주차관리시스템</title>
<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0">
<meta name="format-detection" content="telephone=no">
<link rel="stylesheet" type="text/css" href="css/import.css">
<script src="js/jquery-1.11.0.min.js"></script>
<script src="js/jquery.bpopup.min.js"></script>
<script src="js/popup.js"></script>

</head>

<body>
<div id="wrap">
<!-- start:header--------------------->
<header id="header">
	<div id="header_img">
    	<h1 class="h1_ci"></h1>
        <h1 class="h1_img"></h1>
        <div class="header_bg"></div>
        <p class="h1_ver">V 1.0</p>
    </div>
</header>
<!-- end:header----------------------->
<!-- start:content ------------------->
<div id="content">
	<div id="main_con">
        <div class="box_style1">
        	<div class="txt_style1">
            	<p><span class="bold"><%=mnName%></span>님</p>
                <p>관리자번호 : <span class="bold"><%=mnNo%></span></p>
            </div>
        </div>
        <div class="main_list">
        	<ul class="btn_list">
        		<li>강좌 코드&nbsp;&nbsp;강좌 이름&nbsp;&nbsp;강좌 시작일&nbsp;&nbsp;강좌 종료일</li><br />		
   			</ul>  
<%
			for(int i = 0; i < courseList.size(); i++){
				PerformanceVO tc = new PerformanceVO();
				tc = (PerformanceVO)courseList.get(i);
				/* list로되어 있는걸 vo로 형변환하여 출력하기위해   */
%>
	          	<ul class="btn_list">
	          		<li><%=tc.getCOURSE_CD() %>&nbsp;&nbsp;<%=tc.getCOURSE_NAME() %>&nbsp;&nbsp;<%=tc.getCOURSE_START_DATE() %>&nbsp;&nbsp;<%=tc.getCOURSE_END_DATE() %></li><br />
	          	</ul>
<%
			}
%>
            
        </div>
    </div>
</div>
<!-- end:content ------------------->
<!-- start:footer ------------------->
<div id="footer">
    <!-- inc_footer 불러오기 --><!--include file="../inc/inc_footer.html" -->
</div>
<!-- end:footer --------------------------------------------->
</div>
</body>
</html>
