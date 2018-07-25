package pe.edu.unmsm.fisi.siscae.model.parametro;

import lombok.Data;

@Data
public class MensajeRespuestaServicioWeb
{
    private int codigoRespuesta;
    private int cantidadRegistros;
    private String descripcion;
}