$(document).ready(function(){
	$('#show').mousedown(function(){
		$('#inputPassword').removeAttr('type');
		$('#show').addClass('fa-eye-slash').removeClass('fa-eye');
	});
	$('#show').mouseup(function(){
		$('#inputPassword').attr('type','password');
		$('#show').addClass('fa-eye').removeClass('fa-eye-slash');
	});
	$('#show1').mousedown(function(){
		$('#contraAnterior').removeAttr('type');
		$('#show1').addClass('fa-eye-slash').removeClass('fa-eye');

	});
	$('#show1').mouseup(function(){
		$('#contraAnterior').attr('type','password');
		$('#show1').addClass('fa-eye').removeClass('fa-eye-slash');

	});
	$('#show2').mousedown(function(){
		$('#contraNueva').removeAttr('type');
		$('#show2').addClass('fa-eye-slash').removeClass('fa-eye');
	});
	$('#show2').mouseup(function(){
		$('#contraNueva').attr('type','password');
		$('#show2').addClass('fa-eye').removeClass('fa-eye-slash');
	});
	$('#show3').mousedown(function(){
		$('#contraNuevaRep').removeAttr('type');
		$('#show3').addClass('fa-eye-slash').removeClass('fa-eye');
	});
	$('#show3').mouseup(function(){
		$('#contraNuevaRep').attr('type','password');
		$('#show3').addClass('fa-eye').removeClass('fa-eye-slash');
	});

});