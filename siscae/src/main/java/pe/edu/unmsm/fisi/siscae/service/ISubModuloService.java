package pe.edu.unmsm.fisi.siscae.service;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.mantenimiento.SubModulo;

public interface ISubModuloService extends IMantenibleService<SubModulo>
{
    public List<SubModulo> buscarTodos();

    public List<SubModulo> buscarPorCodigo(SubModulo subModulo);

    public List<SubModulo> registrarSubModulo(SubModulo subModulo);

    public List<SubModulo> actualizarSubModulo(SubModulo subModulo);

    public void eliminarSubModulo(SubModulo subModulo);
}