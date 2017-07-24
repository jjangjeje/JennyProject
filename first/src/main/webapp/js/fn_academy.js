
function get_head(){

	var head_html = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">';
	head_html = head_html + '<html xmlns="http://www.w3.org/1999/xhtml">';
	head_html = head_html + '<head>';
	head_html = head_html + '<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />';
	head_html = head_html + '<title></title>';
	head_html = head_html + '<link rel="stylesheet" type="text/css" href="/FrontMArte//css/import.css" />';
	head_html = head_html + '<link rel="stylesheet" type="text/css" href="/FrontMArte//css/mypage.css" />';
	head_html = head_html + '<link rel="stylesheet" type="text/css" href="/FrontMArte//css/ticket.css"/>';
	head_html = head_html + '<link rel="stylesheet" type="text/css" href="/FrontMArte//css/jquery-ui-1.10.3.custom.css"/>';
	head_html = head_html + '<link rel="stylesheet" type="text/css" href="/FrontMArte//css/academy/reset.css" />';
	head_html = head_html + '<link rel="stylesheet" type="text/css" href="/FrontMArte//css/academy/base.css" />';
	head_html = head_html + '<link rel="stylesheet" type="text/css" href="/FrontMArte//css/academy/class.css" />';
	head_html = head_html + '';
	head_html = head_html + '';
	head_html = head_html + '<script type="text/javascript" src="/FrontMArte//js/jquery-1.11.0.min.js"></script>';
	head_html = head_html + '<script type="text/javascript" src="/FrontMArte//js/jquery-ui-1.10.3.custom.js"></script>';
	head_html = head_html + '<script type="text/javascript" src="/FrontMArte//js/fn_sale.js"></script>';
	head_html = head_html + '<script type="text/javascript" src="/FrontMArte//js/fn_package.js"></script>';
	head_html = head_html + '<script type="text/javascript" src="/FrontMArte//js/utility.js"></script>';
	head_html = head_html + '<script type="text/javascript" src="/FrontMArte//js/fn_point.js"></script>';
	head_html = head_html + '<script type="text/javascript" src="/FrontMArte//js/fn_reserve.js"></script>';
	head_html = head_html + '<script type="text/javascript" src="/FrontMArte//js/fn_view.js"></script>';
	head_html = head_html + '<script type="text/javascript" src="/FrontMArte//js/fn_campaign.js"></script>';
	head_html = head_html + '<script type="text/javascript" src="/FrontMArte//js/fn_academy.js"></script>';
	head_html = head_html + '<script type="text/javascript" src="/FrontMArte//js/security.js"></script>';
	head_html = head_html + '';
	head_html = head_html + '<script type="text/javascript" src="/FrontMArte//js/logout.js"></script>';
	head_html = head_html + '<script type="text/javascript" src="/FrontMArte//js/fn_booking_parking.js"></script>';
	head_html = head_html + '<script type="text/javascript" src="/FrontMArte//js/fn_booking_cancel.js"></script>';
	head_html = head_html + '<script type="text/javascript" src="/FrontMArte//js/fn_login.js"></script>';
	head_html = head_html + '<script type="text/javascript" src="/FrontMArte//js/cmm.js"></script>';
	head_html = head_html + '<script type="text/javascript" src="/FrontMArte//js/lectureUtil.js"></script>';
	head_html = head_html + '<script type="text/javascript" src="/FrontMArte//js/fn_academy_payment.js"></script>';
	head_html = head_html + '<script type="text/javascript" src="/FrontMArte//js/fn_memberShip.js"></script>';
	head_html = head_html + '';
	head_html = head_html + '</head>';
	head_html = head_html + '<body>';
   return head_html;
}



function get_tail(){
	var tail_html = '</body></html>';
	return tail_html;
}




	// 수강대상자 추가
	function family_add(){
		var params = $("form[name=frmBefore]").serialize();
		$.ajax({
			type : 'post',
			url : 'family_add.do',
			data: params,
			dataType :'html',
			success:function(html){
				$('#family_add').empty();
				$( html ).appendTo('#family_add');

				// 레이어 팝업 2016.12.19 수정
				$('#family_add').bPopup({modalClose:false});
			}
		});
	}

	// 수강대상자 창 닫기 2016.12.19
	function family_end(){
		$('#family_add').bPopup().close();
	}

	// 수강대상자 추가(저장)
	function family_regist(){
		var params = $('form[name=frmFamily]').serialize();
		var frm = document.frmFamily;
		var gender = document.getElementsByName('Gender_Flag');
		var RelationType = document.getElementsByName('RelationType');
		var gender_bl = true;
		var relation_bl = true;


		// 성별
		for(var i=0;i<gender.length;i++){

			if(gender[i].checked){
				gender_bl = false;
			}
		}

		// 관계
		for(var i=0;i<RelationType.length;i++){

			if(RelationType[i].checked){
				relation_bl = false;
			}
		}


		if(frm.FamilyName.value == ''){
			alert('이름을 입력하셔야 합니다.');
			return;
		}else if(gender_bl){
			alert('성별을 체크해 주세요');
			return;
		}else if(relation_bl){
			alert('관계를 체크해 주세요');
			return;
		}else if(frm.family_cel1.value ==''){
			alert('휴대폰번호를 입력해 주세요');
			return;
		}else if(frm.family_cel2.value ==''){
			alert('휴대폰번호를 입력해 주세요');
			return;
		}else if(frm.family_cel3.value ==''){
			alert('휴대폰번호를 입력해 주세요');
			return;
		}else if(frm.family_year.value ==''){
			alert('생년월일을 입력해 주세요');
			return;
		}else if(frm.family_month.value ==''){
			alert('생년월일을 입력해 주세요');
			return;
		}else if(frm.family_day.value ==''){
			alert('생년월일을 입력해 주세요');
			return;
		}else{

			$.ajax({
				type  	 : 'post',
				url   	 : 'family_regist.do',
				data  	 : params,
				dataType : 'xml',
				success:function(html){
					var msg = $(html).find("result").find("code").find("data").text();

					if(msg == '0000'){
						alert('추가 되었습니다.');
						academy_list('1');
					}else{
						alert(msg);
						family_add();
					}
				}
			});
		}
	}

	// 수강대상자 수정하기
	function family_modify_regist(){
		var params = $('form[name=frmFamily]').serialize();

		$.ajax({
			type  	 : 'post',
			url   	 : 'family_modify_regist.do',
			data  	 : params,
			dataType : 'xml',
			success:function(html){
				var msg = $(html).find("result").find("code").find("data").text();

				if(msg == '0000'){
					alert('수정 되었습니다.');
					academy_list('1');

				}else{

					alert(msg);
					family_add();
				}
			}
		});
	}

	// 수강대상자 삭제하기
	function family_cancel(unique){
		var params = 'FAMILY_NO='+unique;

		$.ajax({
			type  : 'post',
			url   : 'family_cancel.do',
			data  : params,
			dataType : 'xml',
			success:function(xml){
				var msg = $(xml).find("result").find("code").find("data").text();

				if(msg == '0000'){
					alert('삭제 되었습니다.');
					academy_list('1');
				}else{
					alert(msg);
				}
			}
		});
	}

	// 수강 대상자 수정 페이지 이동
	function family_modify(family_no){
		var params = 'FAMILY_NO='+family_no;F

		$.ajax({
			type  	 : 'post',
			url   	 : 'family_modify.do',
			data  	 : params,
			dataType : 'html',
			success:function(html){
				$('#family_add').empty();
				$(html).appendTo('#family_add');

				// 레어아웃 팝업 2016.21.19
				$('#family_add').bPopup({modalClose:false});
			}
		});
	}

	// 체크 박스 하나만 선택
	function check_box(obj){
		var key_name = obj.id;
		var chk = document.getElementsByName(key_name);

		for(var i=0;i < chk.length;i++){
			if(chk[i] !=obj){
				chk[i].checked = false;
			}
		}

	}
    
    

	// 강좌 리스트 2016.12.19
	function academy_list(num){
		var params = 'STATUS_TYPE='+num;
		location.replace('academy_before.do?'+ params );
	}

	// 강좌 리스트(iframe) 2017.02.09
	function academy_list_simple(num){
		var params = 'STATUS_TYPE='+num;
		location.replace('academy_before_simple.do?'+ params );
	}

	// 강좌 내역 창 닫기
	function academy_end(){
		try{ parent.opener.window.close(); }catch(e){}
		try{ opener.window.close(); }catch(e){}
		try{ window.close(); }catch(e){}
		try{ window.close('about:blank','_self'); }catch(e){}
		$('#academy_before').empty();
		try{ $('#academy_before').dialog('close'); } catch(e){}
	}

	// 페이징
	function paging_academy(num){

		document.frmBefore.pageNum.value = num;
		var params = $("form[name=frmBefore]").serialize();
		var total_block = document.frmBefore.Total_Block.value;

		$.ajax({
			type :'post',
			url :'academy_add.do',
			data: params,
			dataType :'html',
			success:function(html){
				$(html).appendTo('#academy_add');
				if(total_block >= (num+1)){
					$('.paging-more').attr("onclick","paging_academy("+(num+1)+")");
				}else{
					$('.book-board-more').empty();
				}
			}
		});
	}

	// 영수증
	function fn_egov_print(no){
		//var url = "http://59.0.169.28/AsiaTotalManage/PaymentInfo.jsp";
		var url = "https://ticket.acc.go.kr/AsiaTotalManage/PaymentInfo.jsp";
		url += "?TRAN_UNIQUE_NBR="+no;
		window.open(url,"","width=660, height=230, toolbar=no, menubar=no, scrollbars=yes, resizable=no, location=no, directories=no, status=no");
	}

	// 한글만 쓰기
	function korea_format(obj){
		var data = obj.value;
		var data_reg = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]*$/;

		if(!data_reg.test(data)){
			alert('한글만 입력해 주세요');

			var c ='';
			for(var i=0;i < data.length-1;i++){
				if(data_reg.test(data.charAt(i))){
					c += data.charAt(i);
				}else{
					c ='';
				}
			}
			document.frmFamily.FamilyName.value = c;

			return false;
		}
	}

	// 전화 번호
	function tel_num(obj,status){
		var num = obj.value;
		var num_reg = /^[0-9]*$/;

		if(!num_reg.test(num)){
			alert('숫자만 입력하세요');

			var c ='';
			for(var i=0;i < num.length-1;i++){
				if(num_reg.test(num.charAt(i))){
					c += num.charAt(i);
				}else{
					c ='';
				}
			}

			if(status == '1'){
				document.frmFamily.family_cel2.value = c;
			}else{
				document.frmFamily.family_cel3.value = c;
			}

			return false;
		}
	}

	// 계좌정보 보기 2016.12.20
	function info(num){
		var idx = 'virtual_'+num;
		// 레어아웃 팝업
		$('#'+idx).bPopup({modalClose:false});
	}

	// 계좌정보 창 닫기 2016.12.20
	function cancel_info(num){
		var idx = 'virtual_'+num;

		$('#'+idx).bPopup().close();
	}