package pe.edu.unmsm.fisi.siscae.validacion.grupo.secuencia.asociacionSubBinCliente;

import javax.validation.GroupSequence;

@GroupSequence({ IAsociacionBasico.class, IAsociacionBasicoActualizacion.class,
        IAsociacionClaseActualizacion.class, IAsociacionActualizacion.class })
public interface ISecuenciaValidacionAsociacionActualizacion
{

}
