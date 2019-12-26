package pe.edu.unmsm.fisi.siscae.model.parametro;

import lombok.Value;

@Value
public class MensajeError
{
    private int codigoError;
    private String motivo;
}