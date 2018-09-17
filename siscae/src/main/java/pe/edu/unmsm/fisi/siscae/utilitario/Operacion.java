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
        TABLA_ORIGEN
    }
    
    private OperacionParam parametro;
    
    private Operacion(OperacionParam parametro) {
        this.parametro = parametro;
    }
    
    private Operacion() {
        
    }
    
}
