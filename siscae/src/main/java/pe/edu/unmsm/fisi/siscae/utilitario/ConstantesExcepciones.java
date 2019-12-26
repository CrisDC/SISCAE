package pe.edu.unmsm.fisi.siscae.utilitario;

public class ConstantesExcepciones {
	/* Mensajes de Error en evalución de permisos */
	public static final String PERMISOS_NO_NULO = "Los permisos a evaluar no deben ser nulos.";

	/* Mensajes de Error de Mantenimiento de Politicas de Seguridad */
	public static final String POLITICA_SEGURIDAD_NO_ENCONTRADO = "La Políticas de Seguridad no existen.";
	public static final String LONGITUD_MINIMA_CONTRASENIA_NO_ENCONTRADO = "La longitud mínima de contraseña no fue encontrado.";
	public static final String AUTENTICACION_ACTIVE_DIRECTORY_NO_ENCONTRADO = "La autenticación por Active Directory no fue encontrado.";
	public static final String COMPLEJIDAD_CONTRASENIA_NO_ENCONTRADO = "La complejidad de contrase\u00F1a no fue encontrado.";

	/* Mensajes de Error en Conexion */
	public static final String ERROR_CONEXION_ACTIVE_DIRECTORY = "No se logró establecer la conexión al servicio de Active Directory. Revise los parámetros de conexión.";
	public static final String ERROR_CONEXION_BASE_DATOS = "No se logró establecer la conexión a la Base de Datos. Revise los parámetros de conexión.";

	/* Codigos de Error LDAP */
	public static final String CODIGO_AD_CONTRASENIA_INCORRECTA = "52e";
	public static final String CODIGO_AD_CONTRASENIA_EXPIRADA = "532";
	public static final String CODIGO_AD_USUARIO_NO_ACTIVO = "533";
	public static final String CODIGO_AD_USUARIO_EXPIRADO = "701";
	public static final String CODIGO_AD_CONTRASENIA_DEBE_CAMBIAR = "773";

	/* Mensajes de Error REST */
	public static final String ERROR_TYPE_MISMATCH_EXCEPTION_REST = "La petición enviada por el cliente contiene un formato inválido. Reintente la operación, por favor.";
	public static final String ERROR_MISSING_PARAMETER_EXCEPTION_REST = "La petición enviada por el cliente contiene datos incompletos. Reintente la operación, por favor.";

	/* Otros Mensajes de Error */
	public static final String FECHA_PROCESO_ENCONTRADA_EJECUCION = "El Log de Control de Ejecución de Programas ya se encuentra preparado para la Fecha de Proceso registrada.";
	public static final String ORDEN_EJECUCION_VIOLADA = "Aún tiene programas por ejecutar antes del programa seleccionado. Siga el orden de ejecución por favor.";
	public static final String VIOLACION_CLAVE_FORANEA = "VIOLACION_CLAVE_FORANEA";
	public static final String CAMPO_NO_DEFINIDO = "campoNoDefinido";
	public static final String ERROR_BASE_DATOS = "ERROR_BASE_DATOS";

	public static final String ERROR_DESCONOCIDO = "Ocurrió un error no identificado.";
	public static final String USUARIO_NO_ENCONTRADO = "El usuario %s no fue encontrado.";

	public static final String USUARIO_NO_ACTIVO = "El usuario %s no está activo.";
	public static final String USUARIO_EXPIRADO = "El usuario %s está expirado.";
	public static final String CONTRASENIA_INCORRECTA = "La contraseña ingresada es incorrecta.";
	public static final String CONTRASENIA_EXPIRADA = "La contraseña ingresada está expirada.";
	public static final String CONTRASENIA_DEBE_CAMBIAR = "La contraseña ingresada ha caducado, debe ser cambiada.";

	public static final String CODIGO_SEGUIMIENTO_NO_ENCONTRADO = "Código de seguimiento no Encontrado.";
	public static final String ERROR_CONVERSION_DATOS = "No se pudo convertir correctamente el JSON de respuesta";


	/* Error constructor estático */
	public static final String NO_INSTANCIAR_CLASE_ESTATICA = "No puede instanciar una clase estática.";

	private ConstantesExcepciones() {
		throw new UnsupportedOperationException(ConstantesExcepciones.NO_INSTANCIAR_CLASE_ESTATICA);
	}
}