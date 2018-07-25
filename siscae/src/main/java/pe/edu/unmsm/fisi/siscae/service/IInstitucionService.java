package pe.edu.unmsm.fisi.siscae.service;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Institucion;

public interface IInstitucionService extends IMantenibleService<Institucion>
{
    public List<Institucion> buscarTodos();

    public List<Institucion> buscarPorCodigoInstitucion(int codigoInstitucion);
    
    public List<Institucion> buscarPorCodigoInstitucionActual();

    public boolean existeInstitucion(int codigoInstitucion);

    public void registrarInstitucion(Institucion institucion);

    public void actualizarInstitucion(Institucion institucion);

    public void eliminarInstitucion(Institucion institucion);
}