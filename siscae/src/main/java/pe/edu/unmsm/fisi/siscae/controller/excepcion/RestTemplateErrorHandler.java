package pe.edu.unmsm.fisi.siscae.controller.excepcion;

import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.web.client.ResponseErrorHandler;

import pe.edu.unmsm.fisi.siscae.service.excepcion.EjecucionManualException;
import pe.edu.unmsm.fisi.siscae.utilitario.ConstantesExcepciones;

public class RestTemplateErrorHandler implements ResponseErrorHandler {
	@Override
	public boolean hasError(ClientHttpResponse response) throws IOException {
		if (response.getStatusCode() == HttpStatus.NOT_FOUND) {
			return true;
		}
		return false;
	}

	@Override
	public void handleError(ClientHttpResponse response) throws IOException {

		throw new EjecucionManualException(ConstantesExcepciones.ERROR_DESCONOCIDO);

	}
}