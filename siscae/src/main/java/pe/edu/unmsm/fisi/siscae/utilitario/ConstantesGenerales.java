package pe.edu.unmsm.fisi.siscae.utilitario;

public class ConstantesGenerales
{
    public static final String REGISTRO_EXITOSO = "Se registró correctamente";
    public static final String ACTUALIZACION_EXITOSA = "Se actualizó correctamente";
    public static final String ELIMINACION_EXITOSA = "Se eliminó correctamente";



	public static final int TIPO_DOCUMENTO_DNI = 1;
	public static final int TIPO_DOCUMENTO_PASAPORTE = 2;
	public static final int TIPO_DOCUMENTO_CARNET_EXTRANJERIA = 3;
	public static final int TIPO_DOCUMENTO_AUTOGENERADO = 4;

    /* Otros */
    public static final String UTF_8 = "UTF-8";
    public static final String ACTIVE_DIRECTORY = "Active Directory: ";
    public static final String RUTA_REPORTE_XLSX = "xlsx/";
    
    /* URL */
    public static final String URL_LOGIN = "/login";

    /* Header AJAX */
    public static final String AJAX_HEADER = "XMLHttpRequest";
    

    private ConstantesGenerales()
    {
        throw new UnsupportedOperationException(ConstantesExcepciones.NO_INSTANCIAR_CLASE_ESTATICA);
    }
}