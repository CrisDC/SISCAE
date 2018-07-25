package pe.edu.unmsm.fisi.siscae.service.excepcion;
public class ArchivoExcelNoValidoException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public ArchivoExcelNoValidoException(String mensaje) {
		super(mensaje);
	}

}
