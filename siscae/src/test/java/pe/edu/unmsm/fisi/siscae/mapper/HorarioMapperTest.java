package pe.edu.unmsm.fisi.siscae.mapper;

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
import pe.edu.unmsm.fisi.siscae.model.parametro.Parametro;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion;

@ContextConfiguration(classes = { ServiceConfiguration.class, PersistenceConfiguration.class })
@RunWith(SpringJUnit4ClassRunner.class)
public class HorarioMapperTest {

	private @Autowired IHorarioMapper horarioMapper;

	@Test
	public void mantenerTipoGetTest() {

		Horario horario = new Horario();
		horario.setIdHorario(1);
		horario.setHoraInicio(LocalTime.now());
		horario.setHoraFin(LocalTime.now());
		horario.setEstado(true);
		horario.setTiempoMax(2.00);
		horario.setIdTurno(1);
		horario.setIdDia(1);
		horario.setIdTipoHorario(1);
		horario.setIdAreaEstudio(1);

		Parametro<Horario> operacion = new Parametro<>(Operacion.SELECT, horario, "TEST USER");

		List<Horario> horarios = horarioMapper.mantener(operacion);
		horarios.forEach(System.out::println);
		
		operacion.setOperacion(Operacion.INSERT.name());
		horarios = horarioMapper.mantener(operacion);
		horarios.forEach(System.out::println);
		
		horario.setHoraFin(LocalTime.now());
		operacion.setOperacion(Operacion.UPDATE.name());
		horarios = horarioMapper.mantener(operacion);
		horarios.forEach(System.out::println);
		
		operacion.setOperacion(Operacion.DELETE.name());
		horarios = horarioMapper.mantener(operacion);
		horarios.forEach(System.out::println);

	}

}
