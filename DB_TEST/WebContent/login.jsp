<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<%@ page import="com.performance.manager.PerformanceManager" %>
<%@ page session="true"%>

<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<title>���������������ý���</title>
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
            <legend>�α���</legend>
            <div class="input_list pdb35">
            	<dl>
                    <dt><label for="id">���̵�</label></dt>
                    <dd style="width:70%"><input type="text" id="id" name="id"  placeholder="�̸��� �ּ� �Է�" style="width:100%; ime-mode:disabled" autocomplete="off" class="input_login"></dd>
                </dl>
                <dl>
                    <dt><label for="pw">��й�ȣ</label></dt>
                    <dd style="width:70%"><input type="password" id="pw" name="pw" value="937e8d5fbb48bd4949536cd65b8d35c426b80d2f830c5c308e2cdec422ae2244" placeholder="��й�ȣ" autocomplete="off" style="width:100%" class="input_login"></dd>
				</dl>
            </div>
            <div class="login_checkBox">
                <label for="saveid"><input type="checkbox" id="saveid" name="saveid"> ���̵� ����</label>
                <label for="savepasswd"><input type="checkbox" id="savepasswd" name="savepasswd"> �ڵ� �α���</label>
            </div>
            <p class="btn_area">
                <!-- a href="main.html" --> 
                <a href="javascript:void(0)" onclick="loginCheck()" class="btn_login" >�α��� </a>
            </p>
        </fieldset>
        </form>
        <div class="login_util">
            <a id="pop_pw" class="btn_login_u2">��й�ȣ ã��</a>
            <a href="../member/agree.html" class="btn_login_u3">ȸ������</a>
        </div>
        <p class="login_txt">�湮���� ���༭�񽺸� �̿��Ͻ÷��� ȸ�������� ���ּ���.</p>
    </div>
</div>

<!-- ��ȿ�� üũ -->
<script type="text/javascript">

	function loginCheck(){
		var frm = document.login;
		
		if(frm.id.value == "" || frm.pw.value == ""){
			alert("ID �Ǵ� PW�� �Է����ּ��� ");
			return false;
		}else{
			frm.submit();
			/* ������ �׼ǿ� ����  */
		}
	}
</script>





<!-- end:content ------------------->
<!-- start:footer ------------------->
<div id="footer">
    <!-- inc_footer �ҷ����� --><!--include file="../inc/inc_footer.html" -->
</div>
<!-- end:footer --------------------------------------------->


<!-- start:��й�ȣ ã�� ---------------------->
<div id="pop_pw_view">
	<div id="pop_wrap">
    	<div id="pop_header">
        	<h1>��й�ȣ ã��</h1>
            <div class="pop_top"><a href="#" class="btn_pop b-close">�ݱ�</a></div>
        </div>
        <div id="pop_con">
        	<div id="pop_input_con">
                <form id="password" name="password" method="post" onSubmit="#">
                <fieldset>
                    <legend>��й�ȣ ã��</legend>
                    <div class="pop_input_list">
                        <dl>
                            <dt><label for="id">���̵�</label></dt>
                            <dd style="width:60%;"><input type="text" id="id" name="id" maxlength="20" onClick="inputChg(this);" onKeyDown="inputChg(this);" placeholder="���̵�" autocomplete="off" style="width:95%;" class="input_pop"></dd>
                        </dl>
                        <dl>
                            <dt><label for="name">�̸�</label></dt>
                            <dd style="width:60%;"><input type="text" id="name" name="name" maxlength="20" onClick="inputChg(this);" onKeyDown="inputChg(this);" placeholder="�̸�" autocomplete="off" style="width:95%;" class="input_pop"></dd>
                        </dl>
                        <dl>
                            <dt><label for="email">�̸���</label></dt>
                            <dd style="width:60%;"><input type="text" id="name" name="name" maxlength="20" onClick="inputChg(this);" onKeyDown="inputChg(this);" placeholder="�̸���" autocomplete="off" style="width:95%;" class="input_pop"></dd>
                        </dl>
                    </div>
                </fieldset>
                </form>
                <div class="pop_input_info">
                	<ul>
                    	<li>ȸ�����Խ� �Է��ߴ� ������ ��Ȯ�ϰ� �Է��Ͽ� �ּ���.</li>
                        <li>�Է��Ͻ� �̸��Ϸ� ���Ե� ������ ��й�ȣ�� �ʱ�ȭ�ϰ� �ʱ�ȭ�� ��й�ȣ�� �����մϴ�.</li>
                    </ul>
                </div>
            </div>
        </div>
        <div id="pop_footer">
        	<span><a href="#" class="btn_pop1 b-close">���</a></span>
            <span><a href="#" class="btn_pop2 b-close">Ȯ��</a></span>
        </div>
    </div>
</div>
<!-- end:��й�ȣ ã�� ---------------------->
</div>
</body>
</html>
