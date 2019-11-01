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

		Horario horarioTest = new Horario();
		horarioTest.setIdHorario(1);
		horarioTest.setHoraInicio(LocalTime.now());
		horarioTest.setHoraFin(LocalTime.now());
		//horarioTest.setTiempoMax(2.00);
		horarioTest.setDescripcion("descripcion");
		horarioTest.setIdEstadoTabla(1);
		horarioTest.setIdTurno(1);
		horarioTest.setIdDia(1);
		horarioTest.setIdTipoHorario(1);
		horarioTest.setIdAreaEstudio(1);
		
		
		Parametro<Horario> operacion = new Parametro<>(Operacion.SELECT, horarioTest, "TEST USER");
		
		List<Horario> horarios = horarioMapper.mantener(operacion);
		horarios.forEach(System.out::println);
		
		operacion.setOperacion(Operacion.INSERT.name());
		horarios = horarioMapper.mantener(operacion);
		horarios.forEach(System.out::println);
				
		horarioTest.setHoraFin(LocalTime.now());
		operacion.setOperacion(Operacion.UPDATE.name());
		horarios = horarioMapper.mantener(operacion);
		horarios.forEach(System.out::println);
		
		operacion.setOperacion(Operacion.DELETE.name());
		horarios = horarioMapper.mantener(operacion);
		horarios.forEach(System.out::println);
	}
}
