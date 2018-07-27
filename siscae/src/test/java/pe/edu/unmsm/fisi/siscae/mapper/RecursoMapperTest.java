package pe.edu.unmsm.fisi.siscae.mapper;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import pe.edu.unmsm.fisi.siscae.configuracion.PersistenceConfiguration;
import pe.edu.unmsm.fisi.siscae.configuracion.ServiceConfiguration;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Institucion;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Recurso;
import pe.edu.unmsm.fisi.siscae.model.parametro.Parametro;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion;

@ContextConfiguration(classes = { ServiceConfiguration.class, PersistenceConfiguration.class })
@RunWith(SpringJUnit4ClassRunner.class)
public class RecursoMapperTest {

	private @Autowired IRecursoMapper recursoMapper;

    @Test
    public void mantenerTipoGetTest()
    {
        Parametro operacion = new Parametro();
        operacion.setOperacion(Operacion.SELECT.name());
     
        operacion.setObjeto(new Recurso());
        List<Recurso> recursos = recursoMapper.mantener(operacion);
        recursos.stream().forEach(recurso -> {
            System.out.println(recurso.toString());
        });
    }

	
}
