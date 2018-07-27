package pe.edu.unmsm.fisi.siscae.utilitario;

import lombok.Getter;

@Getter
public enum Operacion
{
    INSERT,
    SELECT, 
    UPDATE, 
    DELETE;
    
    
    public static enum OperacionParam {
        DNI,
        FECHA,
        LOGIN, 
        USUARIO,
        CODIGO_RPTA,
        PRIMARY_KEY
    }
    
    private OperacionParam parametro;
    
    private Operacion(OperacionParam parametro) {
        this.parametro = parametro;
    }
    
    private Operacion() {
        
    }
    
}
