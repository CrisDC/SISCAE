package pe.edu.unmsm.fisi.siscae.service;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.Moneda;

public interface IMonedaService extends IMantenibleService<Moneda>
{
    public List<Moneda> buscarTodos();

    public List<Moneda> buscarPorCodigoMoneda(int codigoMoneda);

    public boolean existeMoneda(int codigoMoneda);
}
