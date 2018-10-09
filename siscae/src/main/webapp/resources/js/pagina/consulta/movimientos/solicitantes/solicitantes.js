$(document).ready(function() {
    $('.js-example-basic-single').select2();
    
    $('#formulario-tipo-academico').css('display', 'none');

    $('#formulario-codigo').css('display', 'none');

    $('#formulario-escuela').css('display', 'none');
});


$(document).on('change', '#formulario-ocupacion', function(event) {
    let valor = $("#formulario-ocupacion option:selected").text();
    if(valor=='ALUMNO'){
    		$('#formulario-tipo-academico').css('display', 'block');

    	    $('#formulario-codigo').css('display', 'block');

    	    $('#formulario-escuela').css('display', 'block');
    }else{
    	$('#formulario-tipo-academico').css('display', 'none');

	    $('#formulario-codigo').css('display', 'none');

	    $('#formulario-escuela').css('display', 'none');
    }
});