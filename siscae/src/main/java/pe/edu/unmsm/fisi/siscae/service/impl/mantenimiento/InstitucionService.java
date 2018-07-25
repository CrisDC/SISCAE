package pe.edu.unmsm.fisi.siscae.service.impl.mantenimiento;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import pe.edu.unmsm.fisi.siscae.mapper.IInstitucionMapper;
import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Institucion;
import pe.edu.unmsm.fisi.siscae.service.IInstitucionService;
import pe.edu.unmsm.fisi.siscae.service.IParametroGeneralService;
import pe.edu.unmsm.fisi.siscae.service.impl.MantenibleService;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion;
import pe.edu.unmsm.fisi.siscae.utilitario.VerboConstantes;

@Service
public class InstitucionService extends MantenibleService<Institucion>
        implements IInstitucionService
{
    private IInstitucionMapper institucionMapper;
    private @Autowired IParametroGeneralService parametroGeneralService;

    public InstitucionService(
            @Qualifier("IInstitucionMapper") IMantenibleMapper<Institucion> mapper)
    {
        super(mapper);
        this.institucionMapper = (IInstitucionMapper) mapper;
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public List<Institucion> buscarTodos()
    {
        return this.buscar(new Institucion(), Operacion.SELECT);
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public List<Institucion> buscarPorCodigoInstitucion(int codigoInstitucion)
    {
        Institucion institucion = Institucion.builder().codigoInstitucion(codigoInstitucion)
                .build();
        return this.buscar(institucion, Operacion.SELECT);
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public List<Institucion> buscarPorCodigoInstitucionActual()
    {
        int codigoInstitucion = parametroGeneralService.buscarCodigoInstitucion();
        return this.buscarPorCodigoInstitucion(codigoInstitucion);
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public boolean existeInstitucion(int codigoInstitucion)
    {
        return !this.buscarPorCodigoInstitucion(codigoInstitucion).isEmpty();
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void registrarInstitucion(Institucion institucion)
    {
        this.registrar(institucion);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void actualizarInstitucion(Institucion institucion)
    {
        this.actualizar(institucion);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void eliminarInstitucion(Institucion institucion)
    {
        this.eliminar(institucion);
    }
}