$(document).ready(function() {
	$('#pop_id').bind('click', function(e) { //popup
		e.preventDefault();
		$("#pop_id_view").bPopup({modalClose:false});
	});

	$('#pop_pw').bind('click', function(e) { //popup
		e.preventDefault();
		$("#pop_pw_view").bPopup({modalClose:false});
	});
	$('#pop_private').bind('click', function(e) { //popup
		e.preventDefault();
		$("#pop_private_view").bPopup({modalClose:false});
	});

	$('#pop_use').bind('click', function(e) { //popup
		e.preventDefault();
		$("#pop_use_view").bPopup({modalClose:false});
	});

	$('#pop_code').bind('click', function(e) { //popup
		e.preventDefault();
		$("#pop_code_view").bPopup({modalClose:false});
	});

});
