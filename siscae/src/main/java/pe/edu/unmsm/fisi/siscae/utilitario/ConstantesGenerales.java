package pe.edu.unmsm.fisi.siscae.utilitario;

public class ConstantesGenerales
{
    public static final String REGISTRO_EXITOSO = "Se registró correctamente";
    public static final String ACTUALIZACION_EXITOSA = "Se actualizó correctamente";
    public static final String ELIMINACION_EXITOSA = "Se eliminó correctamente";
    public static final String COMPENSACION_COMISION = "COMISION";
    public static final String COMPENSACION_FONDO = "FONDO";
    public static final String PREFIJO_ARCHIVO = "[INST]";
    public static final String SUFIJO_ARCHIVO = ".dat";
    public static final String UTF_8 = "UTF-8";
    public static final int ROL_TRANSACCION_RECEPTOR = 2;
    public static final String ACTIVE_DIRECTORY = "Active Directory: ";
    
	/* Instancia de Pedidos */
	public static final int INSTANCIA_AFILIACION = 1;
	public static final int INSTANCIA_ACTIVACION = 2;
	public static final int INSTANCIA_RECARGA = 3;
	
	/* Estados de Pedidos */
	public static final int LOTE_EMISION = 1;
	public static final int LOTE_ENVIO_EMISION = 2;
	public static final int LOTE_EMITIDO = 3;
	public static final int LOTE_RECARGA = 4;
	public static final int LOTE_ENVIO_RECARGA = 5;
	public static final int LOTE_RECARGADO = 6;
	public static final int LOTE_ERROR = -1;
	
	public static final int TIPO_DOCUMENTO_DNI = 1;
	public static final int TIPO_DOCUMENTO_PASAPORTE = 2;
	public static final int TIPO_DOCUMENTO_CARNET_EXTRANJERIA = 3;
	public static final int TIPO_DOCUMENTO_AUTOGENERADO = 4;
}