package pe.edu.unmsm.fisi.siscae.service;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Alumno;

public interface IAlumnoService extends IMantenibleService<Alumno> {
	
	public List<Alumno> buscarTodos();

    public Alumno buscarPorId(Integer idAlumno);
    
    public boolean existe(Integer idAlumno);

    public void registrarAlumno(Alumno alumno);

    public void actualizarAlumno(Alumno alumno);

    public void eliminarAlumno(Alumno alumno);


}
