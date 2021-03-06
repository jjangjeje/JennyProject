<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<%@ page import="com.performance.manager.PerformanceManager" %>
<%@ page session="true"%>

<!DOCTYPE html>
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
	<div id="login_con">
        <form id="login" name="login" method="post" action="loginPro.jsp"> <!-- onSubmit="#" -->
        <fieldset>
            <legend>로그인</legend>
            <div class="input_list pdb35">
            	<dl>
                    <dt><label for="id">아이디</label></dt>
                    <dd style="width:70%"><input type="text" id="id" name="id"  placeholder="이메일 주소 입력" style="width:100%; ime-mode:disabled" autocomplete="off" class="input_login"></dd>
                </dl>
                <dl>
                    <dt><label for="pw">비밀번호</label></dt>
                    <dd style="width:70%"><input type="password" id="pw" name="pw" value="937e8d5fbb48bd4949536cd65b8d35c426b80d2f830c5c308e2cdec422ae2244" placeholder="비밀번호" autocomplete="off" style="width:100%" class="input_login"></dd>
				</dl>
            </div>
            <div class="login_checkBox">
                <label for="saveid"><input type="checkbox" id="saveid" name="saveid"> 아이디 저장</label>
                <label for="savepasswd"><input type="checkbox" id="savepasswd" name="savepasswd"> 자동 로그인</label>
            </div>
            <p class="btn_area">
                <!-- a href="main.html" --> 
                <a href="javascript:void(0)" onclick="loginCheck()" class="btn_login" >로그인 </a>
            </p>
        </fieldset>
        </form>
        <div class="login_util">
            <a id="pop_pw" class="btn_login_u2">비밀번호 찾기</a>
            <a href="../member/agree.html" class="btn_login_u3">회원가입</a>
        </div>
        <p class="login_txt">방문주차 예약서비스를 이용하시려면 회원가입을 해주세요.</p>
    </div>
</div>

<!-- 유효성 체크 -->
<script type="text/javascript">

	function loginCheck(){
		var frm = document.login;
		
		if(frm.id.value == "" || frm.pw.value == ""){
			alert("ID 또는 PW를 입력해주세요 ");
			return false;
		}else{
			frm.submit();
			/* 폼내용 액션에 전달  */
		}
	}
</script>





<!-- end:content ------------------->
<!-- start:footer ------------------->
<div id="footer">
    <!-- inc_footer 불러오기 --><!--include file="../inc/inc_footer.html" -->
</div>
<!-- end:footer --------------------------------------------->


<!-- start:비밀번호 찾기 ---------------------->
<div id="pop_pw_view">
	<div id="pop_wrap">
    	<div id="pop_header">
        	<h1>비밀번호 찾기</h1>
            <div class="pop_top"><a href="#" class="btn_pop b-close">닫기</a></div>
        </div>
        <div id="pop_con">
        	<div id="pop_input_con">
                <form id="password" name="password" method="post" onSubmit="#">
                <fieldset>
                    <legend>비밀번호 찾기</legend>
                    <div class="pop_input_list">
                        <dl>
                            <dt><label for="id">아이디</label></dt>
                            <dd style="width:60%;"><input type="text" id="id" name="id" maxlength="20" onClick="inputChg(this);" onKeyDown="inputChg(this);" placeholder="아이디" autocomplete="off" style="width:95%;" class="input_pop"></dd>
                        </dl>
                        <dl>
                            <dt><label for="name">이름</label></dt>
                            <dd style="width:60%;"><input type="text" id="name" name="name" maxlength="20" onClick="inputChg(this);" onKeyDown="inputChg(this);" placeholder="이름" autocomplete="off" style="width:95%;" class="input_pop"></dd>
                        </dl>
                        <dl>
                            <dt><label for="email">이메일</label></dt>
                            <dd style="width:60%;"><input type="text" id="name" name="name" maxlength="20" onClick="inputChg(this);" onKeyDown="inputChg(this);" placeholder="이메일" autocomplete="off" style="width:95%;" class="input_pop"></dd>
                        </dl>
                    </div>
                </fieldset>
                </form>
                <div class="pop_input_info">
                	<ul>
                    	<li>회원가입시 입력했던 정보를 정확하게 입력하여 주세요.</li>
                        <li>입력하신 이메일로 가입된 계정의 비밀번호를 초기화하고 초기화된 비밀번호를 전송합니다.</li>
                    </ul>
                </div>
            </div>
        </div>
        <div id="pop_footer">
        	<span><a href="#" class="btn_pop1 b-close">취소</a></span>
            <span><a href="#" class="btn_pop2 b-close">확인</a></span>
        </div>
    </div>
</div>
<!-- end:비밀번호 찾기 ---------------------->
</div>
</body>
</html>
