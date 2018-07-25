package pe.edu.unmsm.fisi.siscae.validacion.grupo.secuencia;

import javax.validation.GroupSequence;

import pe.edu.unmsm.fisi.siscae.validacion.grupo.IMetodo;
import pe.edu.unmsm.fisi.siscae.validacion.grupo.IParametro;

@GroupSequence({ IParametro.class, IMetodo.class })
public interface ISecuenciaValidacionController
{

}
