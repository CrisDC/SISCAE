package pe.edu.unmsm.fisi.siscae.Service;

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
 public void test(){
		List<Horario> horarios = horarioService.buscarTodos();
        horarios.stream().forEach(horario -> {
            System.out.println(horario.toString());
        });
 }
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
		
	}
	public void buscarTodosTest(){
		List<Horario> horarios= horarioService.buscarTodos();
		int foundSize= horarios.size();
		System.out.println(foundSize);
		horarios.stream().forEach(horario -> {
            System.out.println(horario.toString());
        });
		
	}
	public void buscarPorIdHorarioTest(){// puede ser tamaño uno 
		
		List<Horario> horarios= horarioService.buscarPorIdHorario(1);
		horarios.stream().forEach(horario -> {
            System.out.println(horario.toString());
        });
	}
	public void existeHorarioTest(){
		
		assertTrue(horarioService.existeHorario(1));
	}
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
	}
}
