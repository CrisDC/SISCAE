package pe.edu.unmsm.fisi.siscae.service.impl.mantenimiento;

import java.util.List;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import pe.edu.unmsm.fisi.siscae.mapper.IEmpresaMapper;
import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Empresa;
import pe.edu.unmsm.fisi.siscae.service.IEmpresaService;
import pe.edu.unmsm.fisi.siscae.service.impl.MantenibleService;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion;
import pe.edu.unmsm.fisi.siscae.utilitario.VerboConstantes;

@Service
public class EmpresaService extends MantenibleService<Empresa> implements IEmpresaService
{
    private IEmpresaMapper empresaMapper;

    public EmpresaService(@Qualifier("IEmpresaMapper") IMantenibleMapper<Empresa> mapper)
    {
        super(mapper);
        this.empresaMapper = (IEmpresaMapper) mapper;
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public List<Empresa> buscarTodos()
    {
        return this.buscar(new Empresa(), Operacion.SELECT);
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public List<Empresa> buscarPorIdEmpresa(String idEmpresa)
    {
        Empresa empresa = Empresa.builder().idEmpresa(idEmpresa).build();
        return this.buscar(empresa, Operacion.SELECT);
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public boolean existeEmpresa(String idEmpresa)
    {
        return !this.buscarPorIdEmpresa(idEmpresa).isEmpty();
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void registrarEmpresa(Empresa empresa)
    {
        this.registrar(empresa);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void actualizarEmpresa(Empresa empresa)
    {
        this.actualizar(empresa);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void eliminarEmpresa(Empresa empresa)
    {
        this.eliminar(empresa);
    }
}