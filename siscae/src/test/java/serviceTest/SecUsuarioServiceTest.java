package serviceTest;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import pe.edu.unmsm.fisi.siscae.configuracion.PersistenceConfiguration;
import pe.edu.unmsm.fisi.siscae.configuracion.ServiceConfiguration;

@ContextConfiguration(classes = { ServiceConfiguration.class, PersistenceConfiguration.class })
@RunWith(SpringJUnit4ClassRunner.class)
public class SecUsuarioServiceTest
{

    @Test
    public void findInformationPersonalByUsernameTest()
    {
        // SesionDTO sesionDTO =
        // usuarioService.buscarUsuarioPorId("hanz.llanto");
        // Assert.assertEquals(sesionDTO.getNombres(), "Hanz Jordy");
        // Assert.assertEquals(sesionDTO.getApellidos(), "Llanto Ccalluchi");
    }

}