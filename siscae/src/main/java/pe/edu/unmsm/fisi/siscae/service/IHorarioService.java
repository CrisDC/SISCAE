package pe.edu.unmsm.fisi.siscae.service;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Horario;

public interface IHorarioService  extends IMantenibleService<Horario>{
	public List<Horario> buscarTodos();

    public Horario buscarPorId(Integer idHorario);

    public boolean existe(Integer idHorario);

    public void registrarHorario(Horario horario);

    public void actualizarHorario(Horario horario);

    public void eliminarHorario(Horario horario);
}
