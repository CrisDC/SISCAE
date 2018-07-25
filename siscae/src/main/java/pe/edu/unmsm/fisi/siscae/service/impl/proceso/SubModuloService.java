package pe.edu.unmsm.fisi.siscae.service.impl.proceso;

import java.util.List;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import pe.edu.unmsm.fisi.siscae.mapper.ISubModuloMapper;
import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.SubModulo;
import pe.edu.unmsm.fisi.siscae.service.ISubModuloService;
import pe.edu.unmsm.fisi.siscae.service.impl.MantenibleService;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion;
import pe.edu.unmsm.fisi.siscae.utilitario.VerboConstantes;

@Service
public class SubModuloService extends MantenibleService<SubModulo>
        implements ISubModuloService
{
    private ISubModuloMapper subModuloMapper;

    public SubModuloService(
            @Qualifier("ISubModuloMapper") IMantenibleMapper<SubModulo> mapper)
    {
        super(mapper);
        this.subModuloMapper = (ISubModuloMapper) mapper;
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public List<SubModulo> buscarTodos()
    {
        return this.buscar(new SubModulo(), Operacion.SELECT);
    }

    public List<SubModulo> buscarPorCodigo(SubModulo subModulo)
    {
        return this.buscar(subModulo, Operacion.SELECT);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public List<SubModulo> registrarSubModulo(SubModulo subModulo)
    {
        this.registrar(subModulo);
        return this.buscarPorCodigo(subModulo);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public List<SubModulo> actualizarSubModulo(SubModulo subModulo)
    {
        this.actualizar(subModulo);
        return this.buscarPorCodigo(subModulo);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void eliminarSubModulo(SubModulo subModulo)
    {
        this.eliminar(subModulo);
    }
}