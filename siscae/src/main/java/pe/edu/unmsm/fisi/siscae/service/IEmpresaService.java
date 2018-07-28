package pe.edu.unmsm.fisi.siscae.service;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Empresa;

public interface IEmpresaService extends IMantenibleService<Empresa> {

	public List<Empresa> buscarTodos();

	public List<Empresa> buscarPorIdEmpresa(String idEmpresa);

	public boolean existeEmpresa(String idEmpresa);

    public void registrarEmpresa(Empresa empresa);

    public void actualizarEmpresa(Empresa empresa);

    public void eliminarEmpresa(Empresa empresa);
}