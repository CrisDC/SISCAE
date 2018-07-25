package pe.edu.unmsm.fisi.siscae.service.impl.mantenimiento;

import java.util.List;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import pe.edu.unmsm.fisi.siscae.mapper.IMultiTabDetMapper;
import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.MultiTabDet;
import pe.edu.unmsm.fisi.siscae.service.IMultiTabDetService;
import pe.edu.unmsm.fisi.siscae.service.impl.MantenibleService;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion;
import pe.edu.unmsm.fisi.siscae.utilitario.VerboConstantes;

@Service
public class MultiTabDetService extends MantenibleService<MultiTabDet>
        implements IMultiTabDetService
{
    private IMultiTabDetMapper multiTabDetMapper;

    public MultiTabDetService(
            @Qualifier("IMultiTabDetMapper") IMantenibleMapper<MultiTabDet> mapper)
    {
        super(mapper);
        this.multiTabDetMapper = (IMultiTabDetMapper) mapper;
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public List<MultiTabDet> buscarTodos()
    {
        return this.buscar(new MultiTabDet(), Operacion.SELECT);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public List<MultiTabDet> buscarPorIdTabla(int idTabla)
    {
        MultiTabDet multiTabDet = MultiTabDet.builder().idTabla(idTabla).build();
        return this.buscar(multiTabDet, Operacion.SELECT);
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public List<MultiTabDet> buscarPorIdTablaIdItem(int idTabla, String idItem)
    {
        MultiTabDet multiTabDet = MultiTabDet.builder().idTabla(idTabla).idItem(idItem).build();
        return this.buscar(multiTabDet, Operacion.SELECT);
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public boolean existeMultiTabDet(int idTabla, String idItem)
    {
        return !this.buscarPorIdTablaIdItem(idTabla, idItem).isEmpty();
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void registrarMultiTabDet(MultiTabDet multiTabDet)
    {
        this.registrar(multiTabDet);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void actualizarMultiTabDet(MultiTabDet multiTabDet)
    {
        this.actualizar(multiTabDet);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void eliminarMultiTabDet(MultiTabDet multiTabDet)
    {
        this.eliminar(multiTabDet);
    }
}