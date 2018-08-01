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
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion.OperacionParam;

@ContextConfiguration(classes = { ServiceConfiguration.class, PersistenceConfiguration.class })
@RunWith(SpringJUnit4ClassRunner.class)
public class HorarioMapperTest {

	private @Autowired IHorarioMapper horarioMapper;

	@Test
	public void mantenerTipoGetTest() {
		Parametro<Horario> operacion = new Parametro<>();

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
		
		operacion.setOperacion(Operacion.SELECT.name());
		operacion.setObjeto(new Horario());
		
		List<Horario> horarios = horarioMapper.mantener(operacion);
		horarios.stream().forEach(horario ->{
			System.out.println(horario.toString());
		});
		
		operacion=new Parametro<>(Operacion.INSERT, OperacionParam.PRIMARY_KEY,horarioTest, "Usuario de prueba");
		horarios.stream().forEach(horario ->{
			System.out.println(horario.toString());
		});
				
		horarioTest.setHoraFin(LocalTime.now());
		operacion.setOperacion(Operacion.UPDATE.name());
		operacion.setObjeto(horarioTest);
		
		horarios = horarioMapper.mantener(operacion);
		horarios.stream().forEach(horario ->{
			System.out.println(horario.toString());
		});
		operacion.setOperacion(Operacion.DELETE.name());
		horarios = horarioMapper.mantener(operacion);
		
		horarios.stream().forEach(horario ->{
			System.out.println(horario.toString());
		});
	}

}
