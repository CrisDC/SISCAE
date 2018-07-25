package mapperTest;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import pe.edu.unmsm.fisi.siscae.configuracion.PersistenceConfiguration;
import pe.edu.unmsm.fisi.siscae.configuracion.ServiceConfiguration;
import pe.edu.unmsm.fisi.siscae.mapper.IParametroGeneralMapper;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.ParametroGeneral;
import pe.edu.unmsm.fisi.siscae.model.parametro.Parametro;

@ContextConfiguration(classes = { ServiceConfiguration.class, PersistenceConfiguration.class })
@RunWith(SpringJUnit4ClassRunner.class)
public class ParametroGeneralMapperTest
{

    private @Autowired IParametroGeneralMapper parametroGeneralMapper;

    @Test
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void test()
    {
//        Parametro parametro = new Parametro("GET_INST", new ParametroGeneral());
//        System.out.println(parametroGeneralMapper.mantener(parametro));
    }

}
