package pe.edu.unmsm.fisi.siscae.utilitario;

import lombok.Getter;

@Getter
public enum Operacion
{
	SELECT,
    INSERT, 
    UPDATE, 
    DELETE;
    
    
    public static enum OperacionParam {
        DNI,
        FECHA,
        LOGIN, 
        USUARIO,
        CODIGO_RPTA,
        PRIMARY_KEY,
        ID_TABLA,
        ID_ITEM,
        TIPO_NUM_DOCUMENTO,
        TABLA_ORIGEN,
        ADMI_NOMBRES,
        TIPO_DETALLE
    }
    
    private OperacionParam parametro;
    
    private Operacion(OperacionParam parametro) {
        this.parametro = parametro;
    }
    
    private Operacion() {
        
    }
    
}
