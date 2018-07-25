package pe.edu.unmsm.fisi.siscae.validacion.grupo.secuencia.contabilidad;

import javax.validation.GroupSequence;

import pe.edu.unmsm.fisi.siscae.validacion.grupo.ICampo;
import pe.edu.unmsm.fisi.siscae.validacion.grupo.IClase;
import pe.edu.unmsm.fisi.siscae.validacion.grupo.IClaseTres;
import pe.edu.unmsm.fisi.siscae.validacion.grupo.accion.IActualizacion;

@GroupSequence({ ICampo.class, IClase.class, IClaseTres.class, IActualizacion.class })
public interface ISecuenciaValidacionEliminacionContabComision
{

}
