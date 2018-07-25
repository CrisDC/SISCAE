package serviceTest;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import pe.edu.unmsm.fisi.siscae.configuracion.PersistenceConfiguration;
import pe.edu.unmsm.fisi.siscae.configuracion.ServiceConfiguration;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Institucion;
import pe.edu.unmsm.fisi.siscae.service.IInstitucionService;

@ContextConfiguration(classes = { ServiceConfiguration.class, PersistenceConfiguration.class })
@RunWith(SpringJUnit4ClassRunner.class)
public class InstitucionServiceTest
{

    private @Autowired IInstitucionService institucionService;

    @Test
    public void test()
    {
        // List<InstitucionDTO> instituciones =
        // institucionService.buscarPorCodigoInstitucion(2);
        // instituciones.stream().forEach(institucion -> {
        // System.out.println(institucion.toString());
        // });
        List<Institucion> instituciones = institucionService.buscarTodos();
        instituciones.stream().forEach(institucion -> {
            System.out.println(institucion.toString());
        });
    }

}
