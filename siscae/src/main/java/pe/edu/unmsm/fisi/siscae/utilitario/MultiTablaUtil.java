package pe.edu.unmsm.fisi.siscae.utilitario;

import java.util.ArrayList;
import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.mantenimiento.MultiTabDet;

public class MultiTablaUtil
{
    public static final int TABLA_TIPO_DOCUMENTO = 1;
    public static final int TABLA_ESTADO_CIVIL = 2;
    public static final int TABLA_ROL_TRANSACCION = 3;
    public static final int TABLA_ORIGEN_ARCHIVO = 6;
    public static final int TABLA_TIPO_RESPUESTA = 8;
    public static final int TABLA_SEXO = 10;
    public static final int TABLA_INDICADOR_CONTABILIZACION = 22;
    public static final int TABLA_ACCION_AUDITORIA = 29;
    public static final int TABLA_ACCION_RECURSO = 30;

    public static List<MultiTabDet> convertirAMultiTabDetAccionesRecurso(String accionesEnCadena,
            List<MultiTabDet> accionesRecursos)
    {
        List<MultiTabDet> accionesConvertidas = new ArrayList<>();
        List<String> accionesEnListaCadena = StringsUtils.obtenerTokens(accionesEnCadena, ",");
        for (String idAccionEnListaCadena : accionesEnListaCadena)
        {
            MultiTabDet accionRecursoEncontrado = accionesRecursos.stream().filter(
                    accionRecurso -> accionRecurso.getIdItem().equals(idAccionEnListaCadena))
                    .findAny().orElse(null);
            if (accionRecursoEncontrado != null)
            {
                accionesConvertidas.add(accionRecursoEncontrado);
            }
        }
        return accionesConvertidas;
    }
}