package pe.edu.unmsm.fisi.siscae.validacion.grupo.secuencia;

import javax.validation.GroupSequence;

import pe.edu.unmsm.fisi.siscae.validacion.grupo.IBasico;
import pe.edu.unmsm.fisi.siscae.validacion.grupo.ICampo;
import pe.edu.unmsm.fisi.siscae.validacion.grupo.IClase;
import pe.edu.unmsm.fisi.siscae.validacion.grupo.IClaseDos;
import pe.edu.unmsm.fisi.siscae.validacion.grupo.IClaseTres;
import pe.edu.unmsm.fisi.siscae.validacion.grupo.accion.IRegistro;

@GroupSequence({ IBasico.class, ICampo.class, IClase.class, IClaseDos.class, IClaseTres.class,
        IRegistro.class })
public interface ISecuenciaValidacionRegistro
{

}
