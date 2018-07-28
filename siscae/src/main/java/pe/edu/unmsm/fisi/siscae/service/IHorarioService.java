package pe.edu.unmsm.fisi.siscae.service;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Horario;

public interface IHorarioService  extends IMantenibleService<Horario>{
	public List<Horario> buscarTodos();

    public List<Horario> buscarPorIdHorario(Integer idHorario);

    public boolean existeHorario(Integer idHorario);

    public void registrarHorario(Horario horario);

    public void actualizarHorario(Horario horario);

    public void eliminarHorario(Horario horario);
}
