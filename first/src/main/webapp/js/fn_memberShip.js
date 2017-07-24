/*
	회원 등급 
*/

function fn_memberShip(){
	$.ajax({
			type : 'post',
			url  : 'memberShip.do',
			dataType : 'html',
			success : function(html){
				$('#memberShip').empty();
				$(html).appendTo('#memberShip');
					
				$('#memberShip').dialog({
					width:900,
					closeOnEscape:false,
					modal:true
				}).parents(".ui-dialog").find(".ui-dialog-titlebar").remove();
			}
	});
}

function fn_memberClose(){
	$('#memberShip').empty();
	$('#memberShip').dialog("close");
}