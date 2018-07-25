package pe.edu.unmsm.fisi.siscae.service;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.seguridad.PoliticaSeguridad;

public interface IPoliticaSeguridadService extends IMantenibleService<PoliticaSeguridad>
{
    public List<PoliticaSeguridad> buscarTodos();
    
    public int buscarLongitudMinimaContrasenia();
    
    public boolean buscarAutenticacionActiveDirectory();
    
    public boolean buscarComplejidadContrasenia();

	public List<PoliticaSeguridad> getLsPoliticaSeguridad();

	public void actualizarPoliticaSeguridad(PoliticaSeguridad politicaSeguridad);

	public List<PoliticaSeguridad> buscarPorCodigoPoliticaSeguridad(Integer numeroMaximoIntentos);
}
