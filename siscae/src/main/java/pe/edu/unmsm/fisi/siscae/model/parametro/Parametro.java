package pe.edu.unmsm.fisi.siscae.model.parametro;

import java.util.ArrayList;
import java.util.List;

import lombok.Data;
import lombok.NoArgsConstructor;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion.OperacionParam;

@Data
@NoArgsConstructor
public class Parametro<T>
{
    private String operacion;
    private String operacionParam;
    private Object objeto;
    private String userAudit;    
    private List<T> resultados;
    private T tipoParametro;

    public Parametro(Operacion operacion, T objeto)
    {
        this.operacion = operacion.name();
        this.objeto = objeto;
        this.tipoParametro = objeto;
        this.resultados = new ArrayList<T>();
    }

    public Parametro(Operacion operacion, T objeto, String userAudit)
    {
        this.operacion = operacion.name();
        this.objeto = objeto;
        this.tipoParametro = objeto;
        this.userAudit = userAudit;
        this.resultados = new ArrayList<T>();
    }

    public Parametro(Operacion operacion, OperacionParam operacionParam, T objeto)
    {
        System.out.println(operacion.name() + "-" + operacionParam.name());
        this.operacion = operacion.name();
        this.operacionParam = operacionParam.name();
        this.objeto = objeto;
        this.resultados = new ArrayList<T>();
    }

    public Parametro(Operacion operacion, OperacionParam operacionParam, T objeto, String userAudit)
    {
        System.out.println(operacion.name() + "-" + operacionParam.name());
        this.operacion = operacion.name();/*retorna el nombre de mi cte en este caso es select, update,delete o insert*/
        this.operacionParam = operacionParam.name();/*para esta constante en la clase operación */
        this.objeto = objeto;/*alguno de los modelos*/
        this.userAudit = userAudit;
        this.resultados = new ArrayList<T>();
    }
}
