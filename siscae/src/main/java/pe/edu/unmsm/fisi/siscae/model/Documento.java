package pe.edu.unmsm.fisi.siscae.model;

import lombok.Data;

@Data
public class Documento
{
    private String numeroEmision;
    private String numeroExpediente;
    private String dependenciaElabora;
    private String numeroDocumentoDescripcion;
    private String nombre;
    private byte[] archivoBLOB;
    
}
