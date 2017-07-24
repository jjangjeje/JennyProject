academy={};
academy.util={};
academy.calrendar={};
academy.confirm={};

academy.util.setNumber = function(TargetObj){
	if(TargetObj != null){
		TargetObj.value = TargetObj.value.replace(/[^0-9]/g, '');
	}

	return TargetObj;
};

/* ONLY NUMBER */
academy.util.setNumberKey = function(event){
	if (event.which && (event.which > 47 && event.which < 58 || event.which == 8)) {
    }else {
        event.preventDefault();
    }
};

/*	ACADEMY CANCEL REQ	*/
academy.cancel=function(applyUniqueNbr){
	if(confirm('취소 하시겠습니까?')){
		util.func_ajax({
			'targetUrl':'academy/mypage/paymentCancel.do',
			'targetData':{'applyUniqueNbr':applyUniqueNbr},
			'callbackFunc':'academy.rspCancelCallback'
		});
	}
};

/*	ACADEMY CANCEL RES	*/

academy.rspCancelCallback = function(data){
	if(data.result){
		alert('취소 되었습니다.');
		location.replace('/FrontMArte/academy_before.do');
		// location.replace('mypage_view.do');
		return;
	}else{

		alert(data.rspMsg);
		if(data.LOGIN_FLAG == 'N'){
			var url = data.LOGIN_URL;
			parent.location.replace(url);
		}

		return;
	}
};

/* ACADEMY PAYMENT CHECK REQ */

academy.agreement = function(applyUniqueNbr){
		$.ajax({
			type : 'post',
			url : 'academy/mypage/agreement.do',
			data: {'applyUniqueNbr':applyUniqueNbr,'payFlag':'P'},
			dataType :'html',
			success:function(html){
				$('#agreePayment_pop').empty();

				$('#agreePayment_pop').dialog({
					position:'top+5%',
					width :830,
					closeOnEscape:false,
					modal :true
				}).parents(".ui-dialog").find(".ui-dialog-titlebar").remove();

				$(html).appendTo('#agreePayment_pop');
			}
		});

}

//약관동의 창 닫기. 2016.12.16 변경
academy.agreement_close = function(){
	$('#agreePayment_pop').bPopup().close();
};

//약관동의 분기
academy.agreementProcess = function(applyUniqueNbr,payFlag, LGD_TID){

	if(!GetObject("agreementCheck1").checked){
		alert("개인정보 수집 및 이용안내에 동의 하셔야 합니다.");
		return;
	}

	if(!GetObject("agreementCheck2").checked){
		alert("고유식별정보 수집 및 이용안내에 동의 하셔야 합니다.");
		return;
	}

	if(!GetObject("agreementCheck3").checked){
		alert("개인정보 제공 및 위탁안내에 동의 하셔야 합니다.");
		return;
	}

	if(!GetObject("agreementCheck4").checked){
		alert("전자금융거래 이용약관에 동의 하셔야 합니다.");
		return;
	}

	academy.agreement_close();

	if(payFlag == 'P'){
		academy.paymentCheck(applyUniqueNbr);
		return;
	}

	if(payFlag == 'CR'){
		$('#agreePayment_pop').bPopup().close();
		academy.paymentRefundCash(applyUniqueNbr, LGD_TID);
		return;
	}

	if(payFlag == 'HR'){
		academy.partPay(applyUniqueNbr);
		return;
	}

};

// 2016.12.16 변경
academy.paymentCheck = function(applyUniqueNbr){
	$('#academyPayment_pop').bPopup().close();
	$.ajax({
		type : 'post',
		url : 'academy/mypage/payCheck.do',
		data: {'applyUniqueNbr':applyUniqueNbr},
		dataType :'html',
		success:function(html){
			$('#academyPayment_pop').empty();
			$(html).appendTo('#academyPayment_pop');

			// 레이어 팝업
			$('#academyPayment_pop').bPopup({
				modalClose:false,
				position:[90,20],
				follow: [false, false]
			});
		}
	});
};

/* POINT AREA */
academy.util.setPointAmt =  function(PointObj){

	var frm = document.paymentForm;
	var pointAmt = PointObj.value;

	if(pointAmt == null || pointAmt.value != undefined || pointAmt.value == ''){
		PointObj.value = '0';
	}

	var num_regx=/^[0-9]*$/;
	if(!num_regx.test(parseInt(pointAmt,10))){
		PointObj.value = 0;
	}

	if(pointAmt.length == 0){
		PointObj.value = 0;
	}

	if(pointAmt.length > 0){
		var fstStr = pointAmt.substring(0,1);
		if(parseInt(fstStr,10) == 0){
			PointObj.value = 0;
		}
	}

	var totalPrice = 0;
	totalPrice = parseInt(frm.totalPrice.value,10);

	if(parseInt(pointAmt,10) > parseInt(frm.POINT_USABLE.value,10)){
		PointObj.value = frm.POINT_USABLE.value;
	}

	if(parseInt(pointAmt,10) > totalPrice){
		PointObj.value = totalPrice;
	}

	if(parseInt(pointAmt,10) == 0){
		GetObject("DIS_USEABLE_POINT").innerHTML = PointObj.value;
	}else{
		GetObject("DIS_USEABLE_POINT").innerHTML = "-" + PointObj.value;
	}

	academy.util.setPaymentAmt();
};

academy.util.setPaymentAmt = function(){

	var frm = document.paymentForm;

	var totalPrice = parseInt(frm.totalPrice.value,10);
	var pointAmt = 0;

	if(frm.POINT_AMT != null && frm.POINT_AMT != undefined){
		pointAmt = parseInt(frm.POINT_AMT.value,10);
	}

	frm.PAYMENT_AMT.value = (totalPrice - pointAmt) + "";
	GetObject("DIS_PAYMENT_AMT").innerHTML = MarkComma((totalPrice - pointAmt))+" 원";

	academy.util.setPaymentComponent();
};

academy.util.setPaymentComponent = function(){

	var frm = document.paymentForm;

	frm.paymentType.value="";

	//academy.util.initCardComponentArea(false);
	//academy.util.initVbankComponentArea(false);
	//academy.util.initPaymentComponentCashSave(false);

	var typeLength = GetObject("paymentTypeCount").value;
	typeLength = parseInt(typeLength,10);

	for(var i=0; i<typeLength; i++){
		var payTypeNode = GetObject("paymentTypeBtn_"+i);
		if(payTypeNode != null && payTypeNode != undefined){
			payTypeNode.className = "";
		}
	}

	var paymentAmt = parseInt(frm.PAYMENT_AMT.value,10);

	if(paymentAmt > 0){
		academy.util.initPaymentComponentArea(true);

		if(GetObject("paymentTypeBtn_0") != null){
			GetObject("paymentTypeBtn_0").className = "pay-btn-on";
			frm.paymentType.value="000002";
			academy.util.initCardComponentArea(true);
			GetObject("CARD_TRACK_DATA_KEYIN1").focus();
		}

	}else{
		academy.util.initPaymentComponentArea(false);
	}

};


academy.util.initPaymentComponentArea = function(disFlag){
	if(disFlag){
		GetObject("PAYMENT_COMPONENT_AREA").style.display = "";
	}else{
		GetObject("PAYMENT_COMPONENT_AREA").style.display = "none";
	}
};

//카드영역 초기화
academy.util.initCardComponentArea = function(status){

	//GetObject("PAYMENT_COMPONENT_CARD").style.display = status?"":"none";

	var frm = document.paymentForm;

	frm.CARD_INSTALL_NO.options.selectedIndex = 0;
	frm.CARD_TRACK_DATA_KEYIN1.value = "";
	frm.CARD_TRACK_DATA_KEYIN2.value = "";
	frm.CARD_TRACK_DATA_KEYIN3.value = "";
	frm.CARD_TRACK_DATA_KEYIN4.value = "";
	frm.CARD_EXPD_YY.value = "";
	frm.CARD_EXPD_MM.value = "";
};

//가상계좌영역
academy.util.initVbankComponentArea = function(status){
	GetObject("PAYMENT_COMPONENT_VA").style.display = status?"":"none";
	GetObject("VA_BANK_CD").options.selectedIndex = 0;
};

//현금영수증 영역
academy.util.initPaymentComponentCashSave =  function(status){
	GetObject("PAYMENT_COMPONENT_CASH_SAVE").style.display = status?"":"none";
	var frm = document.paymentForm;
	document.getElementsByName("CASH_CERTIFY_TYPE")[0].checked = true;
	document.getElementsByName("CASH_CERTIFY_TYPE")[0].disabled = false;
	document.getElementsByName("CASH_CERTIFY_TYPE")[1].checked = false;
	document.getElementsByName("CASH_CERTIFY_TYPE")[1].disabled = false;
	frm.CASH_TRACK_DATA_KEYIN.readOnly = false;
	frm.CASH_TRACK_DATA_KEYIN.value = "";
};

//결제 수단 선택 이벤트

academy.util.choicePaymentType = function(type,obj){

	var frm = document.paymentForm;
	frm.paymentType.value="";

	if(frm.POINT_AMT != null && frm.POINT_AMT != undefined){
		if(type == '000003' || type == '100001'){
			if(parseInt(frm.POINT_AMT.value,10) > 0){
				frm.paymentType.value="";
				alert('가상계좌와 무통장은 포인트와 함께 결제 할 수 없습니다.');
				return;
			}
		}
	}

	academy.util.initCardComponentArea(false);
	academy.util.initVbankComponentArea(false);
	academy.util.initPaymentComponentCashSave(false);

	var typeLength = GetObject("paymentTypeCount").value;
	typeLength = parseInt(typeLength,10);

	for(var i=0; i<typeLength; i++){
		var payTypeNode = document.getElementById("paymentTypeBtn_"+i);
		if(payTypeNode != null && payTypeNode != undefined){
			payTypeNode.className = "";
		}
	}

	var paymentAmt = parseInt(frm.PAYMENT_AMT.value,10);

	if(paymentAmt > 0){

		if(type == '000002'){
			academy.util.initCardComponentArea(true);
			GetObject("CARD_TRACK_DATA_KEYIN1").focus();
			obj.className = "pay-btn-on";
			frm.paymentType.value=type;
		}else if(type == '000003'){

			var pointAmt = GetObject("POINT_AMT");

			if(pointAmt != null && pointAmt != undefined){
				if(parseInt(pointAmt.value,10) > 0){
					alert("가상계좌는 복합결제 하실 수 없습니다.");
					return;
				}else{
					academy.util.initVbankComponentArea(true);
					academy.util.initPaymentComponentCashSave(true);
					GetObject("VA_BANK_CD").focus();
					obj.className = "pay-btn-on";
					frm.paymentType.value=type;
					return;
				}
			}else{

				academy.util.initVbankComponentArea(true);
				academy.util.initPaymentComponentCashSave(true);
				GetObject("VA_BANK_CD").focus();
				obj.className = "pay-btn-on";
				frm.paymentType.value=type;
				return;
			}
		}else if(type == '100001'){

			var pointAmt = GetObject("POINT_AMT");
			if(pointAmt != null && pointAmt != undefined){
				if(parseInt(pointAmt.value,10) > 0){
					alert("무통장은 복합결제 하실 수 없습니다.");
					return;
				}else{
					academy.util.initPaymentComponentCashSave(true);
					obj.className = "pay-btn-on";
					frm.paymentType.value=type;
					return;
				}
			}else{
				academy.util.initPaymentComponentCashSave(true);
				obj.className = "pay-btn-on";
				frm.paymentType.value=type;
			}

		}

	}else{
		academy.util.initPaymentComponentArea(false);
		academy.util.initCardComponentArea(false);
		academy.util.initVbankComponentArea(false);
		academy.util.initPaymentComponentCashSave(false);
		frm.paymentType.value="";

		for(var i=0; i<typeLength; i++){
			var payTypeNode = document.getElementById("paymentTypeBtn_"+i);
			if(payTypeNode != null && payTypeNode != undefined){
				payTypeNode.className = "";
			}
		}
	}
};

academy.util.certGb = function(){

	var socidObj = GetObject("CARD_SOCID");

	if(socidObj != null || socidObj != undefined){
		socidObj.value = "";

		if(GetObject("DIS_CARD_SOCID") != null){
			GetObject("DIS_CARD_SOCID").style.display="none";
		}
	}

	var businessObj = GetObject("CARD_BUSINESS_ID");

	if(businessObj != null || businessObj != undefined){
		businessObj.value = "";
		if(GetObject("DIS_CARD_BUSINESS_ID") != null){
			GetObject("DIS_CARD_BUSINESS_ID").style.display="none";
		}
	}

	var val = GetRadioValue("CARD_CERT_GB");

	if(val == '0'){

		if(GetObject("DIS_CARD_SOCID") != null){
			GetObject("DIS_CARD_SOCID").style.display="";
		}

		if(GetObject("DIS_CARD_BUSINESS_ID") != null){
			GetObject("DIS_CARD_BUSINESS_ID").style.display="none";
		}

	}else{

		if(GetObject("DIS_CARD_SOCID") != null){
			GetObject("DIS_CARD_SOCID").style.display="none";
		}

		if(GetObject("DIS_CARD_BUSINESS_ID") != null){
			GetObject("DIS_CARD_BUSINESS_ID").style.display="";
		}

	}
};



//아카데미 결제창 닫기
academy.payment_close = function(){
	$('#academyPayment_pop').empty();
	$('#academyPayment_pop').dialog('close');
};

//아카데미 결제 처리
academy.processPay =  function(){

	if(confirm("결제 하시겠습니까?")){

		GetObject("academyPayPop").style.display="none";

		var frm = document.paymentForm;
		var params = $("form[name=paymentForm]").serialize();
		var totalPrice = parseInt(frm.totalPrice.value,10);

		if(totalPrice > 0){
			if(academy.util.checkPaymentComponent()){
				GetObject("academyPayPop").style.display="";
				return;
			}
		}

		util.func_ajax({
			'targetUrl':'academy/mypage/payProcess.do',
			'targetData':params,
			'callbackFunc':'academy.callbackProcessPay'
		});
	}
};

//아카데미 결제 응답 처리
academy.callbackProcessPay = function(data){
	if(data.result){
		alert(data.rspMsg);
		location.replace('mypage_view.do');
		return;
	}else{

		GetObject("academyPayPop").style.display="";
		alert("[" + data.rspCode + "] " + data.rspMsg);

		if(data.LOGIN_FLAG == 'N'){
			var url = data.LOGIN_URL;
			parent.location.replace(url);
		}

		return;
	}
};

academy.util.checkPaymentComponent = function(){

	var frm = document.paymentForm;

	var PaymentAmt = 0;
	PaymentAmt = parseInt(frm.PAYMENT_AMT.value,10);
	var PaymentType = frm.paymentType.value;

	if((PaymentAmt > 0 && (PaymentType == "000003" || PaymentType == "100001"))){
		CashFlag = true;
	}

	if(PaymentAmt > 0){
		if(PaymentType.length == 0){
			alert("결제수단을 선택하세요.");
			return true;
		}else{
			// 결제수단별 Check
			if(PaymentType == "000002"){
				var CardKeyinFlag = frm.CARD_KEYIN_FLAG.value;

				if(CardKeyinFlag == "K" && (frm.CARD_TRACK_DATA_KEYIN1.value).length == 0){
					alert("신용카드번호를 입력하세요.");
					frm.CARD_TRACK_DATA_KEYIN1.focus();
					return true;
				}
				else if(CardKeyinFlag == "K" && (frm.CARD_TRACK_DATA_KEYIN2.value).length == 0){
					alert("신용카드번호를 입력하세요.");
					frm.CARD_TRACK_DATA_KEYIN2.focus();
					return true;
				}
				else if(CardKeyinFlag == "K" && (frm.CARD_TRACK_DATA_KEYIN3.value).length == 0){
					alert("신용카드번호를 입력하세요.");
					frm.CARD_TRACK_DATA_KEYIN3.focus();
					return true;
				}
				else if(CardKeyinFlag == "K" && (frm.CARD_TRACK_DATA_KEYIN4.value).length == 0){
					alert("신용카드번호를 입력하세요.");
					frm.CARD_TRACK_DATA_KEYIN4.focus();
					return true;
				}
				else if(CardKeyinFlag == "K" && (frm.CARD_EXPD_YY.value).length == 0){
					alert("신용카드 유효기간 년도를 입력하세요.");
					frm.CARD_EXPD_YY.focus();
					return true;
				}
				else if(CardKeyinFlag == "K" && (frm.CARD_EXPD_MM.value).length == 0){
					alert("신용카드 유효기간 월을 입력하세요.");
					frm.CARD_EXPD_MM.focus();
					return true;
				}
				else if((frm.CARD_INSTALL_NO.value).length == 0){
					alert("할부기간을 선택하세요.");
					frm.CARD_INSTALL_NO.focus();
					return true;
				}
				else if(parseInt(frm.PAYMENT_AMT.value,10) < 50000 && frm.CARD_INSTALL_NO.value != "00"){
					alert("5만원 미만은 일시불만 가능합니다.");
					frm.CARD_INSTALL_NO.options.selectedIndex = 0;
					frm.CARD_INSTALL_NO.focus();
					return true;
				}


				if(ObjValueLength("CARD_PASSWD") != 2){
					alert("비밀번호 2자리를 입력 하세요.");
					return true;
				}

					var certGbval = GetRadioValue("CARD_CERT_GB");

				if(certGbval != '0' && certGbval != '1'){
					alert("카드구분을 선택 하세요.");
					return true;
				}

				if(certGbval == '0'){
					if(ObjValueLength("CARD_SOCID") <= 0){
						alert("생년월일을 입력 하세요.");
						return true;
					}
				}else{
					if(ObjValueLength("CARD_BUSINESS_ID") <= 0){
						alert("사업자 번호를 입력 하세요.");
						return true;
					}
				}

			}
			else if(PaymentType == "000003"){
				if((frm.VA_BANK_CD.value).length == 0){
					alert("가상계좌은행을 선택하세요.");
					frm.VA_BANK_CD.focus();
					return true;
				}

				var pointAmt = frm.POINT_AMT;

				if(pointAmt != null && pointAmt != undefined){
					if(parseInt(pointAmt.value,10) > 0){
						alert("가상계좌는 포인트와 함께 결제가 불가능 합니다.");
						return;
					}
				}


			}else if(PaymentType == "100001"){
				var pointAmt = frm.POINT_AMT;

				if(pointAmt != null && pointAmt != undefined){
					if(parseInt(pointAmt.value,10) > 0){
						alert("무통장은 포인트와 함께 결제가 불가능 합니다.");
						return;
					}
				}
			}
		}
	}

	return false;
};

/* ACADEMY REFUND PROCESS */

academy.refundProcess = function(applyUniqueNbr){

	if(applyUniqueNbr == '' || applyUniqueNbr == undefined){
		alert('신청 정보가 없습니다.');
		return;
	}

	if(confirm("환불 처리 하시겠습니까?")){
		util.func_ajax({
			'targetUrl':'academy/mypage/refundProcessCheck.do',
			'targetData':{'applyUniqueNbr':applyUniqueNbr},
			'callbackFunc':'academy.callbackRefundProcess'
		});
	}
};

/* 현금 환불 약관동의 */
academy.agreementCash = function(applyUniqueNbr, LGD_TID){
	$.ajax({
		type : 'post',
		url : 'academy/mypage/agreement.do',
		data: {'applyUniqueNbr':applyUniqueNbr,'payFlag':'CR', 'LGD_TID':LGD_TID},
		dataType :'html',
		success:function(html){
			$('#agreePayment_pop').empty();
			$(html).appendTo('#agreePayment_pop');
			// 레이어 팝업
			$('#agreePayment_pop').bPopup({modalClose:false});
		}
	});
};


/* 환불처리 완료 및 환불 처리 분기 */
academy.callbackRefundProcess = function(data){

	if(data.result){
		if(data.cashFlag == 'Y'){
			academy.agreementCash(data.applyUniqueNbr, data.LGD_TID);
			//academy.paymentRefundCash(data.applyUniqueNbr);
			return;
		}else if(data.cashFlag == 'N'){
			alert(data.rspMsg);
			location.replace('mypage_view.do');
			return;
		}
	}else{

		alert(data.rspMsg);

		if(data.LOGIN_FLAG == 'N'){
			var url = data.LOGIN_URL;
			parent.location.replace(url);
		}

		return;
	}
};

/* 현금성 환불 처리 폼 2016.12.20 */
academy.paymentRefundCash = function(applyUniqueNbr, LGD_TID){
	$('#academyRefund_cash').bPopup().close();
	$.ajax({
		type : 'post',
		url : 'academy/mypage/refundCashPopup.do',
		data: {'applyUniqueNbr':applyUniqueNbr, 'LGD_TID':LGD_TID},
		dataType :'html',
		success:function(html){
			$('#academyRefund_cash').empty();
			$(html).appendTo('#academyRefund_cash');

			// 2016.12.20 레이어 팝업
			$('#academyRefund_cash').bPopup({modalClose:false});
		}
	});
};

/* 환불성 폼 닫기 */
academy.util.refundCash_close = function(){
	// 2016.12.20 레이어 팝업
	$('#academyRefund_cash').bPopup().close();
};

/* 현금성 환불 처리 */
academy.processRefundCash =  function(){

	var frm = document.academyRefundForm;

	var refundPaymentType = GetRadioValue("REFUND_PAYMENT_TYPE");
	var refBankCd 		= frm.REF_BANK_CD.value;
	var refAccountNo 	= frm.REF_ACCOUNT_NO.value;
	var refAccountOwner = frm.REF_ACCOUNT_OWNER.value;
	var refTel			= frm.REF_TEL.value;			// 2016.12.09 추가

	if(refundPaymentType.length == 0){
		alert('환불 수단을 선택 하세요.');
		return;
	}

	if(refBankCd.length == 0 || refBankCd == ''){
		alert('환불 계좌 은행을 선택 하세요.');
		return;
	}

	if(refAccountNo.length == 0){
		alert('환불 계좌 번호를 입력 하세요.');
		return;
	}

	if(refAccountOwner.length == 0){
		alert('예금주명을 입력 하세요.');
		return;
	}

	// 2016.12.09 추가
	if(refTel.length == 0){
		alert('핸드폰 번호를 입력 하세요.');
		return
	}

	var params = $("form[name=academyRefundForm]").serialize();

	if(confirm("환불 하시겠습니까?")){

		GetObject("refundCashBtnC").style.display="none";

		util.func_ajax({
			'targetUrl':'academy/mypage/refundCashProcess.do',
			'targetData':params,
			'callbackFunc':'academy.callbackProcessRefundCash'
		});
	}
};


/* 현금성 환불 처리 응답 */
academy.callbackProcessRefundCash = function(data){

	if(data.result){
		alert(data.rspMsg);
		location.replace('mypage_view.do');
		return;

	}else{
		GetObject("refundCashBtnC").style.display="";
		alert("[" + data.rspCode + "] " + data.rspMsg);

		if(data.LOGIN_FLAG == 'N'){
			var url = data.LOGIN_URL;
			parent.location.replace(url);
		}


		return;
	}
};

/* 재결제 약관동의 */
academy.partPayAgreement = function(applyUniqueNbr){
	$.ajax({
		type : 'post',
		url : 'academy/mypage/agreement.do',
		data: {'applyUniqueNbr':applyUniqueNbr,'payFlag':'HR'},
		dataType :'html',
		success:function(html){
			$('#agreePayment_pop').empty();

			$('#agreePayment_pop').dialog({
				position:'top+10%',
				width :830,
				closeOnEscape:false,
				modal :true
			}).parents(".ui-dialog").find(".ui-dialog-titlebar").remove();

			$(html).appendTo('#agreePayment_pop');
		}
	});

}

/* 재결제 폼 */
academy.partPay = function(applyUniqueNbr){
	$.ajax({
		type : 'post',
		url : 'academy/mypage/refundPartPay.do',
		data: {'applyUniqueNbr':applyUniqueNbr},
		dataType :'html',
		success:function(html){

			$('#academyRepayment_pop').empty();

			$('#academyRepayment_pop').dialog({
				width :600,
				closeOnEscape:false,
				modal :true
			}).parents(".ui-dialog").find(".ui-dialog-titlebar").remove();

			$(html).appendTo('#academyRepayment_pop');
		}
	});
};

/* 재결제 닫기 */
academy.util.repayment_close = function(){
	$('#academyRepayment_pop').empty();
	$('#academyRepayment_pop').dialog('close');
};


/* 재결제 처리 */
academy.repayProcess =  function(){

	var frm = document.repaymentForm;

	var CardKeyinFlag = frm.CARD_KEYIN_FLAG.value;

	if(CardKeyinFlag == "K" && (frm.CARD_TRACK_DATA_KEYIN1.value).length == 0){
		alert("신용카드번호를 입력하세요.");
		frm.CARD_TRACK_DATA_KEYIN1.focus();
		return true;
	}
	else if(CardKeyinFlag == "K" && (frm.CARD_TRACK_DATA_KEYIN2.value).length == 0){
		alert("신용카드번호를 입력하세요.");
		frm.CARD_TRACK_DATA_KEYIN2.focus();
		return true;
	}
	else if(CardKeyinFlag == "K" && (frm.CARD_TRACK_DATA_KEYIN3.value).length == 0){
		alert("신용카드번호를 입력하세요.");
		frm.CARD_TRACK_DATA_KEYIN3.focus();
		return true;
	}
	else if(CardKeyinFlag == "K" && (frm.CARD_TRACK_DATA_KEYIN4.value).length == 0){
		alert("신용카드번호를 입력하세요.");
		frm.CARD_TRACK_DATA_KEYIN4.focus();
		return true;
	}
	else if(CardKeyinFlag == "K" && (frm.CARD_EXPD_YY.value).length == 0){
		alert("신용카드 유효기간 년도를 입력하세요.");
		frm.CARD_EXPD_YY.focus();
		return true;
	}
	else if(CardKeyinFlag == "K" && (frm.CARD_EXPD_MM.value).length == 0){
		alert("신용카드 유효기간 월을 입력하세요.");
		frm.CARD_EXPD_MM.focus();
		return true;
	}
	else if((frm.CARD_INSTALL_NO.value).length == 0){
		alert("할부기간을 선택하세요.");
		frm.CARD_INSTALL_NO.focus();
		return true;
	}
	else if(parseInt(frm.PAYMENT_AMT.value,10) < 50000 && frm.CARD_INSTALL_NO.value != "00"){
		alert("5만원 미만은 일시불만 가능합니다.");
		frm.CARD_INSTALL_NO.options.selectedIndex = 0;
		frm.CARD_INSTALL_NO.focus();
		return true;
	}

	if(ObjValueLength("CARD_PASSWD") != 2){
		alert("비밀번호 2자리를 입력 하세요.");
		return true;
	}

	var certGbval = GetRadioValue("CARD_CERT_GB");

	if(certGbval != '0' && certGbval != '1'){
		alert("카드구분을 선택 하세요.");
		return true;
	}

	if(certGbval == '0'){
		if(ObjValueLength("CARD_SOCID") <= 0){
			alert("생년월일을 입력 하세요.");
			return true;
		}
	}else{
		if(ObjValueLength("CARD_BUSINESS_ID") <= 0){
			alert("사업자 번호를 입력 하세요.");
			return true;
		}
	}

	var params = $("form[name=repaymentForm]").serialize();

	if(confirm("부분 환불 하시겠습니까?")){

		GetObject("refundPartPayBtnC").style.display="none";

		util.func_ajax({
			'targetUrl':'academy/mypage/partpay.do',
			'targetData':params,
			'callbackFunc':'academy.callbackRepayProcess'
		});
	}
};

/* 재결제 응답 */
academy.callbackRepayProcess = function(data){

	if(data.result){
		alert(data.rspMsg);
		location.replace('mypage_view.do');
		return;

	}else{

		alert("[" + data.rspCode + "] " + data.rspMsg);

		GetObject("refundPartPayBtnC").style.display="";

		if(data.LOGIN_FLAG == 'N'){
			var url = data.LOGIN_URL;
			parent.location.replace(url);
		}

		return;
	}
};

/* 일정보기(캘린더) */

academy.calrendar.mySchedule = function(){

	$.ajax({
		type :'post',
		url : 'academy/mypage/mySchedule.do',
		dataType :'html',
		success:function(html){

			$('#calrendar_content').empty();

			academy.calrendar.initCal();
			$('#calrendar_content').dialog({
				width:950,
				closeOnEscape:false,
				modal:true
			}).parents(".ui-dialog").find(".ui-dialog-titlebar").remove();

			$(html).appendTo('#calrendar_content');

		}
	});
};

/* calrendar popup close */
academy.calrendar.calrendar_close =  function(){
	$('#calrendar_content').empty();
	$('#calrendar_content').dialog("close");
};

/* calrendar init */
academy.calrendar.initCal = function(){
	var form = document.calrendarForm;
	var currDate = form.CURR_DATE.value;

	var calrendarSearchCondition = form.calrendarSearchCondition.value;

	if(calrendarSearchCondition == null || calrendarSearchCondition == undefined || calrendarSearchCondition == ''){
		calrendarSearchCondition = '';
	}

	if(ObjValueLength("SCHEDULE_YEARMON") == 0){
		form.SCHEDULE_YEARMON.value = parseInt(currDate.substring(0,6),10);
	}

	util.func_ajax({
		'targetUrl':'academy/mypage/getCalrendar.do',
		'targetData':{
			'SCHEDULE_YEARMON':ObjValue("SCHEDULE_YEARMON"),
			'SEARCH_CONDITION':calrendarSearchCondition
		 },
		'callbackFunc':'academy.calrendar.makeCal'
	});
};

/* calrendar init make */
academy.calrendar.makeCal = function(data){

	var form = document.calrendarForm;

	var selText = form.calrendarSearchCondition.options[form.calrendarSearchCondition.selectedIndex].text;
	var selval = form.calrendarSearchCondition.value;

	if(selval == '' || selval == undefined || selval == null){
		GetObject("scheduleDescription").innerHTML = '수강 일정표 입니다.';
	}else{
		GetObject("scheduleDescription").innerHTML = selText +', 수강 일정표 입니다.';
	}

	var currDate = form.CURR_DATE.value;
	if(ObjValueLength("SCHEDULE_YEARMON") == 0){
		form.SCHEDULE_YEARMON.value = parseInt(currDate.substring(0,6),10);
	}

	var scheduleYearMon = form.SCHEDULE_YEARMON.value;

	var scheduleYear = parseInt(scheduleYearMon.substring(0, 4), 10);
    var scheduleMonth = parseInt(scheduleYearMon.substring(4, 6), 10);

    var calendarDate = new Date(scheduleYear, scheduleMonth - 1, 1);
    var startWeekDay = calendarDate.getDay();

    //시작일이 일요일이 보다 큰 경우(스타트가 일요일이 아닐경우)
    if(startWeekDay > 0){
        //일요일이 되는 날짜로 셋팅
        calendarDate.setDate(calendarDate.getDate() - startWeekDay);
    }

    GetObject("DIS_YEAR").innerHTML = scheduleYear + ".";
    GetObject("DIS_MONTH").innerHTML = ConvertStr(scheduleMonth,2);

    util.tbl.initTbl(GetObject("SCHEDULE_TBL"),1);

    var calendarObj = GetObject("SCHEDULE_TBL").tBodies[0];

    var weekIdx = 0;
    var weekRow = null;
    var weekCell = null;
    var dayObj;
    var checkDate = "";

    //Calrendar make
    for(var idx = 0; idx < 42; idx++){

    	if(weekIdx == 0){
            weekRow = calendarObj.insertRow(calendarObj.rows.length);

            weekCell = weekRow.insertCell(0);
            weekCell.className = "bor-left-none";
            weekCell = weekRow.insertCell(1);
            weekCell = weekRow.insertCell(2);
            weekCell = weekRow.insertCell(3);
            weekCell = weekRow.insertCell(4);
            weekCell = weekRow.insertCell(5);
            weekCell = weekRow.insertCell(6);
    	}

    	checkDate = calendarDate.getFullYear() + "" + ConvertStr(calendarDate.getMonth() + 1, 2) + ConvertStr(calendarDate.getDate(), 2);
    	dayObj = weekRow.cells[weekIdx];

    	if(calendarDate.getMonth() + 1 == scheduleMonth){
    		var status = parseInt(idx,10)%7;
    		dayObj.innerHTML = academy.calrendar.template(calendarDate.getDay(),calendarDate.getDate(),checkDate,data,status);
    	}

    	 //설정된 날짜에 하루씩 더함
        calendarDate.setDate(calendarDate.getDate() + 1);

        if((calendarDate.getFullYear() * 100) + (calendarDate.getMonth() + 1) > (scheduleYear * 100) + scheduleMonth){
            break;
        }

        weekIdx++;
        if(weekIdx == 7){
            weekIdx = 0;
        }
    }

};

/* calrendar template */
academy.calrendar.template =  function(week,dateStr,checkDate,data,status){

	var content = "";

	if(data.result){
		var list = data.calList;
		if(list.length > 0){
			for(var i=0; i<list.length; i++){
			  var item = list[i];

			  if(checkDate == item.scheduleDate){
				  if(item.cancelFlag == 'N' && item.refundFlag == 'N' && item.reserFlag == 'Y' && item.payFlag == 'N' && item.receiptFlag == 'N'){
					  content += "<li style=\"background-color:#DDDDDD\">"+MarkTime(item.scheduleStartTime,':')+" ~ "+MarkTime(item.scheduleEndTime,':')+"</li>";
					  content += "<li style=\"background-color:#DDDDDD\">"+item.courseName+" - "+item.scheduleName+"(예약)</li>";
				  }
				  if(item.cancelFlag == 'N' && item.refundFlag == 'N' && item.reserFlag == 'Y' && item.payFlag == 'Y' && item.receiptFlag == 'Y'){
					  content += "<li>"+MarkTime(item.scheduleStartTime,':')+" ~ "+MarkTime(item.scheduleEndTime,':')+"</li>";
					  content += "<li>"+item.courseName+" - "+item.scheduleName+"</li>";
				  }

			  }
			}
		}
	}

	var html = "";
	if(status == 0){
		html = "<p class=\"calendar-sun\">"+dateStr+"</p>";
	}else{
		html = "<p class=\"calendar-no\">"+dateStr+"</p>";
	}

	html += "<ul class=\"calendar-con\">";
	if(content.length > 0){
		html += content;
	}else{
		html += "<br/><br/>";
	}
	html += "</ul>";

	return html;
};

/* 이전달 일정 선택 이벤트 */
academy.calrendar.prev =  function(){
	var form = document.calrendarForm;
	var scheduleYearMon = form.SCHEDULE_YEARMON.value;

	var scheduleYear = scheduleYearMon.substring(0, 4);
    var scheduleMonth = ConvertStr(scheduleYearMon.substring(4, 6),2);

    var calendarDate = new Date(scheduleYear, scheduleMonth - 2, 1);

    scheduleYear = calendarDate.getFullYear();
    scheduleMonth = ConvertStr(calendarDate.getMonth()+1,2);

	form.SCHEDULE_YEARMON.value = scheduleYear+""+scheduleMonth;
	academy.calrendar.initCal();

};

/* 다음달 일정 선택 이벤트 */
academy.calrendar.next = function(){
	var form = document.calrendarForm;
	var scheduleYearMon = form.SCHEDULE_YEARMON.value;

	var scheduleYear = scheduleYearMon.substring(0, 4);
    var scheduleMonth = ConvertStr(scheduleYearMon.substring(4, 6),2);

	var calendarDate = new Date(scheduleYear, scheduleMonth, 1);

    scheduleYear = calendarDate.getFullYear();
    scheduleMonth = ConvertStr(calendarDate.getMonth()+1,2);

    form.SCHEDULE_YEARMON.value = scheduleYear+""+scheduleMonth;

    academy.calrendar.initCal();
};

/* 이번달 일정 선택 이벤트 */
academy.calrendar.currMonth = function(){
	var form = document.calrendarForm;
	var currDate = form.CURR_DATE.value;
	form.SCHEDULE_YEARMON.value = parseInt(currDate.substring(0,6),10);
	academy.calrendar.initCal();
};

/* 수강확인서 리스트 */
academy.confirm.confirmList =  function(){
	$.ajax({
		type :'post',
		url : 'academy/mypage/confirmList.do',
		dataType :'html',
		success:function(html){
			$('#confirm_list').empty();

			$('#confirm_list').dialog({
				width:900,
				closeOnEscape:false,
				modal:true
			}).parents(".ui-dialog").find(".ui-dialog-titlebar").remove();

			$(html).appendTo('#confirm_list');
			academy.confirm.setConfirmList();
		}
	});
};

/* 수강확인서 리스트 닫기 */
academy.confirm.confirm_close = function(){
	$('#confirm_list').empty();
	$('#confirm_list').dialog("close");
};

/* 수강생별 보기 검색조건 */
academy.confirm.searchStudent = function(){
	var frm = document.frmConfirm;
	frm.searchStudentCondition.value =  GetObject("searchStudentCondition").value;
	academy.confirm.setConfirmList('1');
};

/* 수강확인서 강좌 검색 */
academy.confirm.searchCourse = function (searchCondition,node){

	var frm = document.frmConfirm;

	for(var i=0; i<4; i++){
		var nodeId = "processCourse_"+i;
		var otherNode = GetObject(nodeId);
		if(otherNode != null && otherNode != undefined){
			otherNode.className = "book-top-gnb-li";
		}
	}

	node.className = 'book-top-gnb-li book-top-gnb-on';

	if(searchCondition == '' || searchCondition == undefined || searchCondition == null){
		searchCondition = '';
	}

	frm.searchCourseCondition.value = searchCondition;
	academy.confirm.setConfirmList('1');
};

/* 수강확인서 데이터 가져오기 */
academy.confirm.setConfirmList = function(pageNum){

	var frm = document.frmConfirm;

	if(pageNum == '' || pageNum == undefined || pageNum == null){
		pageNum = '1';
	}

	frm.currPage.value = pageNum;

	var params = $("form[name=frmConfirm]").serialize();

	var tableObj = GetObject("CONFIRM_TBL");

	util.tbl.initTbl(tableObj,1);
	util.tbl.initMsg({'tblId':'CONFIRM_TBL','cellCnt':6});

	util.func_ajax({
		'targetUrl':'academy/mypage/selectConfirmList.do',
		'targetData':params,
		'callbackFunc':'academy.confirm.getConfirmList'
	});
};

/* 수강확인서 리스트 콜백 메서드 */
academy.confirm.getConfirmList = function(data){

	if(data.result){

		var tableObj = GetObject("CONFIRM_TBL");
		util.tbl.initTbl(tableObj,1);

		var pagingPlace = GetObject("CONFIRM_PAGING");
		pagingPlace.innerHTML = "";

		var list = data.confirmList;

		var pagingStr = academy.confirm.paging({'pageSize':data.pageSize, 'pageUnit':data.pageUnit,
			'totalCount':data.totalCnt, 'currentPage':data.currPage});

		var row,cell;

		if(list.length > 0){

			for(var i=0; i<list.length; i++){
				var item = list[i];

				row = tableObj.tBodies[0].insertRow();

				cell = row.insertCell(0);
				cell.className = "book-board-center";
				cell.innerHTML = MarkDate(item.insertDate,"-");

				cell = row.insertCell(1);
				cell.className = "book-board-center";
				cell.innerHTML = item.courseName + " - " + item.scheduleName;

				cell = row.insertCell(2);
				cell.className = "book-board-center";
				if(item.scheduleFlag == 'Y'){
					cell.innerHTML = MarkDate(item.scheduleDate,"-");
				}else{
					cell.innerHTML = MarkDate(item.courseStartDate,"-") + " ~ " + MarkDate(item.courseEndDate,"-");
				}

				cell = row.insertCell(3);
				cell.className = "book-board-center";
				cell.innerHTML = MarkComma(item.totalPrice);

				cell = row.insertCell(4);
				cell.className = "book-board-center";
				if(item.courseStatus == 'B'){
					cell.innerHTML = "미오픈";
				}else if(item.courseStatus == 'P'){
					cell.innerHTML = "진행중";
				}else if(item.courseStatus == 'E'){
					cell.innerHTML = "강좌종료";
				}

				cell = row.insertCell(5);
				cell.className = "book-board-center";
				if(item.printFlag == 'Y'){
					cell.innerHTML = "<a href=\"javascript:academy.confirm.reqConfirm(\'"+item.printFlag+"\',\'"+item.applyUniqueNbr+"\')\">발급신청</a>";
				}else if(item.printFlag == 'R'){
					cell.innerHTML = "<a href=\"javascript:academy.confirm.reqConfirm(\'"+item.printFlag+"\',\'"+item.confirmCd+"\')\">신청완료</a>";
				}else{
					cell.innerHTML = "&nbsp;";
				}

			}

			pagingPlace.innerHTML = pagingStr;
		}

	}else{
		util.tbl.error({"tblId":"CONFIRM_TBL","cellCnt":6});
		alert(data.errMsg);

		if(data.LOGIN_FLAG == 'N'){
			var url = data.LOGIN_URL;
			parent.location.replace(url);
		}


		return;
	}
};

/* 수강확인서 페이징 */
academy.confirm.paging = function(paramObj){

	var decimal = 10;

	var pageSize = parseInt(paramObj['pageSize'],decimal);
	var pagePerBlock = parseInt(paramObj['pageUnit'],decimal);
	var totalCount = parseInt(paramObj['totalCount'],decimal);
	var pageCnt = Math.ceil(totalCount/pageSize);
	var currentPage = parseInt(paramObj['currentPage'],decimal);
	var totalBlock = 1;

	if(pageCnt % pagePerBlock == 0){
		totalBlock = Math.floor(pageCnt / pagePerBlock);
	}else{
		totalBlock = Math.floor(pageCnt / pagePerBlock) + 1;
	}

	var currBlock = 1;
	if(currentPage % pagePerBlock == 0){
		currBlock = Math.floor(currentPage / pagePerBlock);
	}else{
		currBlock = Math.floor(currentPage / pagePerBlock) + 1;
	}

	var prevPage = (currBlock - 1) * pagePerBlock;
	var nextPage = currBlock * pagePerBlock;
	if(totalBlock <= currBlock){
		nextPage = pageCnt;
	}

	var pagingStr = "";

	if(currBlock > 1){
		pagingStr += "<a href=\'javascript:academy.confirm.setConfirmList(1)\'>처음</a>&nbsp;";
	}
	if(currBlock > 1){
		pagingStr += "<a href=\'javascript:academy.confirm.setConfirmList(" + prevPage + ")\'>◀</a>&nbsp;";
	}

	for(var pageIdx = prevPage + 1; pageIdx <= nextPage; pageIdx++){
		if(currentPage == pageIdx){
			pagingStr += pageIdx;
		}else{
			pagingStr += "<a href=\'javascript:academy.confirm.setConfirmList(" + pageIdx + ")\'>" + pageIdx + "</a>&nbsp;";
		}
	}

	if(currBlock < totalBlock){
		pagingStr += "<a href=\'javascript:academy.confirm.setConfirmList(" + (nextPage + 1) + ")\'>▶</a>&nbsp;";
	}
	if(currBlock < totalBlock){
		pagingStr += "<a href=\'javascript:academy.confirm.setConfirmList(" + pageCnt + ")\'>마지막</a>&nbsp;";
	}

	return pagingStr;

};

/* 수강확인서 form */
academy.confirm.reqConfirm = function(type,keyCode){
	var url =  'academy/mypage/confirmPop01.do?type='+type+'&key='+keyCode;
	 $.ajax({
			type :'post',
			url : url,
			dataType :'html',
			success:function(html){
				$('#confirm_content').empty();

				$('#confirm_content').dialog({
					width:1024,
					closeOnEscape:false,
					modal:true
				}).parents(".ui-dialog").find(".ui-dialog-titlebar").remove();

				$(html).appendTo('#confirm_content');

			}
		});
};

/* 수강확인서 팝업창 닫기 */
academy.confirm.confirmPopClose = function(){
	  $('#confirm_content').empty();
	  $('#confirm_content').dialog("close");
};

/* 수강확인서 요청, 수정, 취소 */
academy.confirm.issue = function(status){

	if(status == 'REQUEST' || status == 'MODIFY'){

		if(ObjValueLength("jobName") == 0){
			alert("직장명을 입력 하세요.");
			GetObject("jobName").focus();
			return;
		}

		if(ByetLength(ObjValue("jobName")) > 100){
			alert("직장명이 길이를 초과 하였습니다.");
			return;
		}

		if(ObjValueLength("studentTel") == 0){
			alert("연락처를 입력 하세요.");
			GetObject("studentTel").focus();
			return;
		}

		if(ByetLength(ObjValue("studentTel")) > 16){
			alert("연락처가 길이를 초과 하였습니다.");
			return;
		}

		if(ObjValueLength("jobAddress") == 0){
			alert("직장주소를 입력 하세요.");
			GetObject("jobAddress").focus();
			return;
		}

		if(ByetLength(ObjValue("jobAddress")) > 500){
			alert("직장주소가 길이를 초과 하였습니다.");
			return;
		}

		if(ObjValueLength("remark") == 0){
			alert("용도를 입력 하세요.");
			GetObject("remark").focus();
			return;
		}

		if(ByetLength(ObjValue("remark")) > 500){
			alert("용도가 길이를 초과 하였습니다.");
			return;
		}
	}

	var msg = '';
	if(status == 'REQUEST'){
		msg = '수강확인서를 발급신청 하시겠습니까?';
	}else if(status == 'MODIFY'){
		msg = '수강확인서를 수정 하시겠습니까?';
	}else if(status == 'CANCEL'){
		msg = '수강 확인서를 취소 하시겠습니끼?';
	}else{
		return;
	}

	if(confirm(msg)){

		var form = document.confirmPopForm;
		form.process.value = status;
		var params = $("form[name=confirmPopForm]").serialize();

		util.func_ajax({
			'targetUrl':'academy/mypage/iussueReq.do',
			'targetData':params,
			'callbackFunc':'academy.confirm.issueResponse'
		});
	}

};

academy.confirm.issueResponse = function(data){

	if(data.result){
		alert(data.rspMsg);
		academy.confirm.confirmPopClose();
		academy.confirm.setConfirmList('1');
		return;
	}else{
		alert(data.rspMsg);

		if(data.LOGIN_FLAG == 'N'){
			var url = data.LOGIN_URL;
			parent.location.replace(url);
		}else{
			fn_confirmPopClose();
		}
	}
};


//LG PG 아카데미 결제 처리
academy.LG_processPay =  function(){

//	if(confirm('결제하시겠습니까?')){

		var params = $("form[name=LG_paymentForm]").serialize();

		util.func_ajax({
			'targetUrl':'/FrontMArte/academy/mypage/payProcess.do',
			'targetData':params,
			'callbackFunc':'academy.LG_callbackProcessPay'
		});

//	}

};



//LG PG 아카데미 결제 응답 처리
academy.LG_callbackProcessPay = function(data){

	CloseDeemed()

	if(data.result){
		alert(data.rspMsg);
//		parent.location.replace('http://localhost/FrontMArte/academy_before.do?STATUS_TYPE=1');
		parent.location.replace('https://ticket.acc.go.kr/FrontMArte/academy_before.do?STATUS_TYPE=1');
		return;
	}else{

		alert("[" + data.rspCode + "] " + data.rspMsg+"\n관리자에게 문의하십시요.");
//		parent.location.replace('http://localhost/FrontMArte/academy_before.do?STATUS_TYPE=1');
		parent.location.replace('https://ticket.acc.go.kr/FrontMArte/academy_before.do?STATUS_TYPE=1');
		if(data.LOGIN_FLAG == 'N'){
			var url = data.LOGIN_URL;
//			parent.location.replace('http://localhost/FrontMArte/academy_before.do?STATUS_TYPE=1');
			parent.location.replace('https://ticket.acc.go.kr/FrontMArte/academy_before.do?STATUS_TYPE=1');
		}

		return;
	}
};

//LG PG 취소 프로세스
academy.LG_refundProcess = function(applyUniqueNbr,LG_TID){

	if(applyUniqueNbr == '' || applyUniqueNbr == undefined){
		alert('신청 정보가 없습니다.');
		return;
	}

	if(LG_TID == '' || LG_TID == undefined){

		LG_TID = 'ACADEMY';
		//alert('신청 정보가 없습니다.[TID]');
		//return;

	}



	if(confirm("환불 처리 하시겠습니까?")){
		util.func_ajax({
			'targetUrl':'academy/mypage/refundProcessCheck.do',
			'targetData':{'applyUniqueNbr':applyUniqueNbr,'LG_TID':LG_TID},
			'callbackFunc':'academy.callbackRefundProcess'
		});
	}
};