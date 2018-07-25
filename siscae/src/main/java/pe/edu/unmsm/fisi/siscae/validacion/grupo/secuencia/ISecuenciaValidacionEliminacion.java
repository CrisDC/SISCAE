package pe.edu.unmsm.fisi.siscae.validacion.grupo.secuencia;

import javax.validation.GroupSequence;

import pe.edu.unmsm.fisi.siscae.validacion.grupo.ICampo;
import pe.edu.unmsm.fisi.siscae.validacion.grupo.accion.IActualizacion;

@GroupSequence({ ICampo.class, IActualizacion.class })
public interface ISecuenciaValidacionEliminacion
{

}
