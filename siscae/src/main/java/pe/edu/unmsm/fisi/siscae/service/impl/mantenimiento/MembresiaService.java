package pe.edu.unmsm.fisi.siscae.service.impl.mantenimiento;

import java.util.List;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import pe.edu.unmsm.fisi.siscae.mapper.IMembresiaMapper;
import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Membresia;
import pe.edu.unmsm.fisi.siscae.service.IMembresiaService;
import pe.edu.unmsm.fisi.siscae.service.impl.MantenibleService;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion;
import pe.edu.unmsm.fisi.siscae.utilitario.VerboConstantes;

@Service
public class MembresiaService extends MantenibleService<Membresia> implements IMembresiaService
{
    private IMembresiaMapper membresiaMapper;

    public MembresiaService(@Qualifier("IMembresiaMapper") IMantenibleMapper<Membresia> mapper)
    {
        super(mapper);
        this.membresiaMapper = (IMembresiaMapper) mapper;
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public List<Membresia> buscarTodos()
    {
        return this.buscar(new Membresia(),Operacion.SELECT);
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public List<Membresia> buscarPorCodigoMembresia(String codigoMembresia)
    {
        Membresia membresia = Membresia.builder().codigoMembresia(codigoMembresia).build();
        return this.buscar(membresia, Operacion.SELECT);
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public boolean existeMembresia(String codigoMembresia)
    {
        return !this.buscarPorCodigoMembresia(codigoMembresia).isEmpty();
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void registrarMembresia(Membresia membresia)
    {
        this.registrar(membresia);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void actualizarMembresia(Membresia membresia)
    {
        this.actualizar(membresia);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void eliminarMembresia(Membresia membresia)
    {
        this.eliminar(membresia);
    }
}