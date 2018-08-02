package pe.edu.unmsm.fisi.siscae.service;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import java.time.LocalTime;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import pe.edu.unmsm.fisi.siscae.configuracion.PersistenceConfiguration;
import pe.edu.unmsm.fisi.siscae.configuracion.ServiceConfiguration;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Horario;
import pe.edu.unmsm.fisi.siscae.service.IHorarioService;


@ContextConfiguration(classes = { ServiceConfiguration.class, PersistenceConfiguration.class })
@RunWith(SpringJUnit4ClassRunner.class)
public class HorarioServiceTest {
	private @Autowired IHorarioService horarioService;
	@Test
	public void registrarHorarioTest(){
		Horario horarioTest = new Horario();
		horarioTest.setIdHorario(1);
		horarioTest.setHoraInicio(LocalTime.now());
		horarioTest.setHoraFin(LocalTime.now());
		horarioTest.setEstado(true);
		horarioTest.setTiempoMax(2.00);
		horarioTest.setIdTurno(1);
		horarioTest.setIdDia(1);
		horarioTest.setIdTipoHorario(1);
		horarioTest.setIdAreaEstudio(1);
		horarioService.registrarHorario(horarioTest);
		//Comprobacion de que si agrego
		assertTrue(horarioService.existeHorario(horarioTest.getIdHorario()));
	}
	@Test
	public void buscarTodosTest(){
		List<Horario> horarios= horarioService.buscarTodos();
		int foundSize= horarios.size();
		System.out.println(foundSize);
		horarios.stream().forEach(horario -> {
            System.out.println(horario.toString());
        });
		
	}
	@Test
	public void buscarPorIdHorarioTest(){// puede ser tamaño uno 
		
		List<Horario> horarios= horarioService.buscarPorIdHorario(1);
		horarios.stream().forEach(horario -> {
            System.out.println(horario.toString());
        });
	}
	@Test
	public void existeHorarioTest(){
		
		assertTrue(horarioService.existeHorario(1));// el id ingresado de arriba
	}
	@Test
	public void actualizarHorarioTest(){
		
		Horario horarioTest = new Horario();
		horarioTest.setIdHorario(2);
		horarioTest.setHoraInicio(LocalTime.now());
		horarioTest.setHoraFin(LocalTime.now());
		horarioTest.setEstado(true);
		horarioTest.setTiempoMax(2.00);
		horarioTest.setIdTurno(1);
		horarioTest.setIdDia(1);
		horarioTest.setIdTipoHorario(1);
		horarioTest.setIdAreaEstudio(1);
		horarioService.registrarHorario(horarioTest);
		
		horarioTest.setTiempoMax(3.00);
		horarioService.actualizarHorario(horarioTest);
	}
	@Test
	public void eliminarHorario(){
		Horario horarioTest = new Horario();
		horarioTest.setIdHorario(3);
		horarioTest.setHoraInicio(LocalTime.now());
		horarioTest.setHoraFin(LocalTime.now());
		horarioTest.setEstado(true);
		horarioTest.setTiempoMax(2.00);
		horarioTest.setIdTurno(1);
		horarioTest.setIdDia(1);
		horarioTest.setIdTipoHorario(1);
		horarioTest.setIdAreaEstudio(1);
		horarioService.registrarHorario(horarioTest);
		
		horarioService.eliminarHorario(horarioTest);
		assertFalse(horarioService.existeHorario(horarioTest.getIdHorario()));
	}
}
