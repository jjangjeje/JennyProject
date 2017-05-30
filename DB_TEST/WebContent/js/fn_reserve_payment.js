	// 숫자만 입력 받기 
	function Number_Changed(obj)
	{
		Common.Util.ShowAlert(
							  Common.Rule.HasNumber(obj.value)
							  ,'숫자만 입력 가능합니다.'
						  	 );
		document.getElementById(obj.id).value = Common.String.RemoveChar(obj.value);
		
		Step_Change(obj);
	}
	
	function Step_Change(obj)
	{
		if(obj.id == 'CardNo1')
		{
			if(document.getElementById(obj.id).value.length == 4)
			{
				document.getElementById('CardNo2').focus();
			}
		}
		else if(obj.id == 'CardNo2')
		{
			if(document.getElementById(obj.id).value.length == 4)
			{
				document.getElementById('CardNo3').focus();
			}
		}
		else if(obj.id == 'CardNo3')
		{
			if(document.getElementById(obj.id).value.length == 4)
			{
				document.getElementById('CardNo4').focus();
			}
		}
		else if(obj.id == 'CardNo4')
		{
			if(document.getElementById(obj.id).value.length == 4)
			{
				document.getElementById('AvaiablePeriodMM').focus();
			}
		}
		else if(obj.id == 'AvaiablePeriodMM')
		{
			if(document.getElementById(obj.id).value.length == 2)
			{
				document.getElementById('AvaiablePeriodYY').focus();
			}
		}
		else if(obj.id == 'AvaiablePeriodYY')
		{
			if(document.getElementById(obj.id).value.length == 2)
			{
				document.getElementById('CardPwd').focus();
			}
		}
		else if(obj.id == 'CardPwd')
		{
			if(document.getElementById(obj.id).value.length == 2)
			{
				if(document.getElementById('Card_Status').value == '1')
				{
					document.getElementById('CAregno_0').focus();
				}
				else
				{
					document.getElementById('CAregno_1').focus();
				}
			}
		}
	}
	
	/**
	 * 개인/ 법인
	 * @param type
	 */
	function Card_Type(type)
	{
		if(type == '1')
		{
			$('#private').attr('style','display:block');
			
			$('#company').attr('style','display:none');
			$('#company').val('');
			$('#Card_Status').val(type);
		}
		else
		{
			$('#company').attr('style','display:block');
			
			$('#private').attr('style','display:none');
			$('#private').val('');
			$('#Card_Status').val(type);
		}
	}
	
	/**
	 * 결제하기
	 */
	function fn_payment_act()
	{
		var params = $('form[name=frmPayment]').serialize();
		if(fn_paymentCheck())
		{				
			$.ajax({
				type : 'post',
				url  : 'payment_act.do',
				data : params,
				dataType : 'xml',
				success:function(html){
					var data = $(html).find('result').find('code').find('data').text();
					
					if(data == '0000'){
						alert('정상 결제 되셨습니다.');
						document.location.href = 'reserve_list.do';
					}
					else{
						alert(data);
					}
				}
			});
		}
	}
	
	/**
	 * 결제 체크
	 */
	function fn_paymentCheck()
	{
		var frm = document.frmPayment;
		
		if(frm.CardNo1.value =='' || frm.CardNo2.value =='' || frm.CardNo3.value =='' || frm.CardNo4.value=='')
		{
			alert('카드번호를 입력 하셔야 합니다.');
			return;
		}
		else if(frm.AvaiablePeriodMM.value ==''){
			alert('유효기간 월을 입력 하셔야 합니다.');
			return;
		}
		else if(frm.AvaiablePeriodYY.value == ''){
			alert('유효기간 년도를 입력 하셔야 합니다.');
			return;
		}
		else if(frm.CardPwd.value ==''){
			alert('비밀번호 앞 2자리를 입력하셔야 합니다.');
			return;
		}
		else if(frm.Card_Status.value == '1'){
			if(frm.CAregno_0.value == ''){
				alert('주민번호 앞 6자리를 입력해 주세요');
				return;	
			}
			else{
				return true;	
			}
		}
		else if(frm.Card_Status.value == '2'){
			if(frm.CAregno_1.value ==''){
				alert('사업자번호를 입력해 주세요');
				return;	
			}
			else{
				return true;	
			}			
		}
		else{
			return true;
		}
	}
	
	function Step_change(obj)
	{
		alert(obj);
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	