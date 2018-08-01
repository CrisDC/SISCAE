package pe.edu.unmsm.fisi.siscae.service;

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
}
