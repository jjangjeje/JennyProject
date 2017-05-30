/**
 * 배정위치 검색
 */
function fn_LineSearch()
{
	var part = $('#SelectDong').val().split("^");
	if($('#SelectDong').val() != '')
	{
		var param = 'Dong='+part[0];
		$.ajax({
			type : 'post',
			url  : 'LineSearch.do',
			data : param,
			dataType : 'html', 
			success:function(html){
				$('#pop_input_choice').empty();
				$(html).appendTo('#pop_input_choice');
			}
		});
	}
	else
	{
		alert('행정동을 선택해 주세요');
		return;
	}
}
/**
 * 행정동 및 배정 위치 선택
 * @param id
 * @param name
 */
function fn_choice(id,name)
{
	var part = $('#SelectDong').val().split("^");
	$('#Dong_Code').val(part[0]);
	$('#Dong').val(part[1]);
	
	$('#Line_Id').val(id);
	$('#Line').val(name);
	
	var pop = $("#pop_code_view").bPopup();
	pop.close();
}

/**
 * 수정
 */
function fn_modify()
{
	var params = $('form[name=frmModify]').serialize();
	$.ajax({
		type : 'post',
		url  : 'modify_act.do',
		data : params,
		dataType : 'xml',
		success:function(data){
			var data = $(data).find('result').find('code').find('data').text();
			
			if(data == '0000'){
				alert('정상적으로 수정 되었습니다.');
				document.location.href = 'reserve_list.do';
			}
			else{
				alert(data);
				return;
			}
		}
	});
}

function fn_list()
{
	location.replace('reserve_list.do');
}













