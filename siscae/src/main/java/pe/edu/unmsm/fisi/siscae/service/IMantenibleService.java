package pe.edu.unmsm.fisi.siscae.service;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.utilitario.Operacion;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion.OperacionParam;

public interface IMantenibleService<T>
{
    public void registrar(T dto);

    public void actualizar(T dto);

    public void eliminar(T dto);

    public List<T> buscar(T dto, Operacion operacion);
    
    public List<T> buscar(T dto, Operacion operacion, OperacionParam operacionParam);

    public void mantener(T dto, Operacion operacion);
}