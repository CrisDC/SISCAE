package pe.edu.unmsm.fisi.siscae.service.excepcion;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.parametro.MensajeValidacion;

public class BadRequestException extends RuntimeException
{
    private static final long serialVersionUID = 1L;
    private List<MensajeValidacion> mensajesValidacion;

    public BadRequestException(List<MensajeValidacion> mensajesValidacion)
    {
        super("Peticion Incorrecta");
        this.mensajesValidacion = mensajesValidacion;
    }

    public List<MensajeValidacion> getMensajesValidacion()
    {
        return this.mensajesValidacion;
    }
}