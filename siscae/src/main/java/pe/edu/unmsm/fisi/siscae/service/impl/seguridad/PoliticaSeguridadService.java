package pe.edu.unmsm.fisi.siscae.service.impl.seguridad;

import java.util.List;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import pe.edu.unmsm.fisi.siscae.mapper.IPoliticaSeguridadMapper;
import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.seguridad.PoliticaSeguridad;
import pe.edu.unmsm.fisi.siscae.service.IPoliticaSeguridadService;
import pe.edu.unmsm.fisi.siscae.service.excepcion.ListaVaciaException;
import pe.edu.unmsm.fisi.siscae.service.excepcion.ValorNoEncontradoException;
import pe.edu.unmsm.fisi.siscae.service.impl.MantenibleService;
import pe.edu.unmsm.fisi.siscae.utilitario.ConstantesExcepciones;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion;
import pe.edu.unmsm.fisi.siscae.utilitario.VerboConstantes;

@Service
public class PoliticaSeguridadService extends MantenibleService<PoliticaSeguridad>
        implements IPoliticaSeguridadService
{
    private IPoliticaSeguridadMapper politicaSeguridadMapper;

    private static final String GET_LONG_MIN = "GET_LONG_MIN";
    private static final String GET_AUTENTICACION_AD = "GET_AUTENTICACION_AD";
    private static final String GET_COMPLEJIDAD_CONTRASENIA = "GET_COMPLEJIDAD_CONTRASENIA";

    public PoliticaSeguridadService(
            @Qualifier("IPoliticaSeguridadMapper") IMantenibleMapper<PoliticaSeguridad> mapper)
    {
        super(mapper);
        this.politicaSeguridadMapper = (IPoliticaSeguridadMapper) mapper;
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public List<PoliticaSeguridad> buscarTodos()
    {
        return this.buscar(new PoliticaSeguridad(), Operacion.SELECT);
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public int buscarLongitudMinimaContrasenia()
    {
        List<PoliticaSeguridad> politicasSeguridad = this.buscar(new PoliticaSeguridad(),
                Operacion.SELECT);
        if (politicasSeguridad.isEmpty())
        {
            throw new ListaVaciaException(ConstantesExcepciones.POLITICA_SEGURIDAD_NO_ENCONTRADO);
        }
        PoliticaSeguridad politicaSeguridad = politicasSeguridad.get(0);
        if (politicaSeguridad.getLongitudMinimaContrasenia() == null)
        {
            throw new ValorNoEncontradoException(
                    ConstantesExcepciones.LONGITUD_MINIMA_CONTRASENIA_NO_ENCONTRADO);
        }
        return politicaSeguridad.getLongitudMinimaContrasenia();
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public boolean buscarAutenticacionActiveDirectory()
    {
        List<PoliticaSeguridad> politicasSeguridad = this.buscar(new PoliticaSeguridad(),
                Operacion.SELECT);
        if (politicasSeguridad.isEmpty())
        {
            throw new ListaVaciaException(ConstantesExcepciones.POLITICA_SEGURIDAD_NO_ENCONTRADO);
        }
        PoliticaSeguridad politicaSeguridad = politicasSeguridad.get(0);
        if (politicaSeguridad.getAutenticacionActiveDirectory() == null)
        {
            throw new ValorNoEncontradoException(
                    ConstantesExcepciones.AUTENTICACION_ACTIVE_DIRECTORY_NO_ENCONTRADO);
        }
        return politicaSeguridad.getAutenticacionActiveDirectory() == 1;
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public boolean buscarComplejidadContrasenia()
    {
        List<PoliticaSeguridad> politicasSeguridad = this.buscar(new PoliticaSeguridad(),
                Operacion.SELECT);
        if (politicasSeguridad.isEmpty())
        {
            throw new ListaVaciaException(ConstantesExcepciones.POLITICA_SEGURIDAD_NO_ENCONTRADO);
        }
        PoliticaSeguridad politicaSeguridad = politicasSeguridad.get(0);
        if (politicaSeguridad.getComplejidadContrasenia() == null)
        {
            throw new ValorNoEncontradoException(
                    ConstantesExcepciones.COMPLEJIDAD_CONTRASENIA_NO_ENCONTRADO);
        }
        return politicaSeguridad.getComplejidadContrasenia() == 1;
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void registrarPoliticaSeguridad(PoliticaSeguridad politicaSeguridad)
    {
        this.registrar(politicaSeguridad);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void actualizarPoliticaSeguridad(PoliticaSeguridad politicaSeguridad)
    {
        this.actualizar(politicaSeguridad);
    }

	@Override
	public List<PoliticaSeguridad> getLsPoliticaSeguridad() {
		return politicaSeguridadMapper.getLsPoliticaSeguridad();
	}

	@Override
	public List<PoliticaSeguridad> buscarPorCodigoPoliticaSeguridad(Integer numeroMaximoIntentos) {
		PoliticaSeguridad politicaSeguridad = PoliticaSeguridad.builder().numeroMaximoIntentos(numeroMaximoIntentos).build();
		return this.buscar(politicaSeguridad,Operacion.SELECT);
	}
}