package pe.edu.unmsm.fisi.siscae.service;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Error;

public interface IErrorService extends IMantenibleService<Error>
{
    public List<Error> buscarTodos();

    public List<Error> buscarPorIdError(int idError);
    
    public String obtenerDescripcionError(Integer idError);

    public boolean existeError(int idError);

    public void registrarError(Error error);

    public void actualizarError(Error error);

    public void eliminarError(Error error);
}
