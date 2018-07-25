package serviceTest;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import pe.edu.unmsm.fisi.siscae.configuracion.PersistenceConfiguration;
import pe.edu.unmsm.fisi.siscae.configuracion.ServiceConfiguration;
import pe.edu.unmsm.fisi.siscae.service.impl.seguridad.CategoriaRecursoService;

@ContextConfiguration(classes = { ServiceConfiguration.class, PersistenceConfiguration.class })
@RunWith(SpringJUnit4ClassRunner.class)
public class CategoriaRecursoTest
{
    private @Autowired CategoriaRecursoService categoriaRecursoService;
    
    @Test
    public void test()
    {
        System.out.println(categoriaRecursoService.buscarTodosCategoriaRecurso());
    }
}