package mapperTest;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import pe.edu.unmsm.fisi.siscae.configuracion.PersistenceConfiguration;
import pe.edu.unmsm.fisi.siscae.configuracion.ServiceConfiguration;
import pe.edu.unmsm.fisi.siscae.model.seguridad.SecUsuario;
import pe.edu.unmsm.fisi.siscae.service.IUsuarioService;

@ContextConfiguration(classes = { ServiceConfiguration.class, PersistenceConfiguration.class })
@RunWith(SpringJUnit4ClassRunner.class)
public class UsuarioMapperTest
{
    private @Autowired IUsuarioService usuarioService;;

    @Test
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void buscarUsuarioPorIdUsuarioTest()
    {
        SecUsuario usuario = usuarioService.buscarPorIdUsuarioParaInicioSesion("ADMIN");
        Assert.assertEquals("ADMIN", usuario.getIdUsuario());
        Assert.assertEquals("4404de97a070a7480d596126b82d3899", usuario.getPassword());
    }
}