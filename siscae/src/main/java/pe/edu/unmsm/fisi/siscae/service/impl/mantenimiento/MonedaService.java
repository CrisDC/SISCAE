package pe.edu.unmsm.fisi.siscae.service.impl.mantenimiento;

import java.util.List;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import pe.edu.unmsm.fisi.siscae.mapper.IMonedaMapper;
import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.Moneda;
import pe.edu.unmsm.fisi.siscae.service.IMonedaService;
import pe.edu.unmsm.fisi.siscae.service.impl.MantenibleService;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion;
import pe.edu.unmsm.fisi.siscae.utilitario.VerboConstantes;

@Service
public class MonedaService extends MantenibleService<Moneda> implements IMonedaService
{
    private IMonedaMapper monedaMapper;

    public MonedaService(@Qualifier("IMonedaMapper") IMantenibleMapper<Moneda> mapper)
    {
        super(mapper);
        this.monedaMapper = (IMonedaMapper) mapper;
    } 

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public List<Moneda> buscarTodos()
    {
        return this.buscar(new Moneda(), Operacion.SELECT);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public List<Moneda> buscarPorCodigoMoneda(int codigoMoneda)
    {
        Moneda moneda = Moneda.builder().codigoMoneda(codigoMoneda).build();
        return this.buscar(moneda, Operacion.SELECT);
    }

    public boolean existeMoneda(int codigoMoneda)
    {
        return !this.buscarPorCodigoMoneda(codigoMoneda).isEmpty();
    }
}