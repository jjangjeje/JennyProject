
// 할인 함수 

	/**
	 * 쿠폰 리스트
	 */
  function sale_pop(){
		$.ajax({
			type :'post',
			url :'sale_pop_detail.do',
			dataType :'html',
			success:function(html){
				$('#sale_info').empty();
				$(html).appendTo('#sale_info');
				
				$('#sale_info').dialog({
					width:600,
					closeOnEscape:false,
					modal:true
				}).parents(".ui-dialog").find(".ui-dialog-titlebar").remove();

			}
		});
	}
	
  /**
   * 쿠폰 등록 후 리스트
   */
	function sale_insert(){
		var params = $('form[name=frmCoupon]').serialize();
		
		$.ajax({
			type :'post',
			url :'sale_insert.do',
			data : params,
			dataType :'xml',
			success:function(xml){
				var data = $(xml).find('result').find('code').find('data').text();
				
				if(data == '0000'){
					alert('Success');
					sale_pop();
				}else{
					alert(data);
				}
			}
		});
	}
	
	/**
	 * 창 닫기
	 */
	function sale_end(){
		$('#sale_info').dialog("close");
	}
	
	// 숫자와 알파벳만 입력
	function number_format(obj){
		var num = obj.value;
		var num_reg = /^[A-Za-z0-9]*$/;
		
		if(!num_reg.test(num)){
			alert('숫자와 알파벳만 입력하세요');
				
			var c ='';
			for(var i=0;i < num.length-1;i++){
				if(num_reg.test(num.charAt(i))){
					c += num.charAt(i);
				}
			}
			document.frmCoupon.sale_number.value = c;
			return false;
		}
	}
	
	
	
	
	
	
	
	
	
	
	
	
	