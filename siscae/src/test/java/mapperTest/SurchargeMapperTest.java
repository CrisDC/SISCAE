package mapperTest;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import pe.edu.unmsm.fisi.siscae.configuracion.PersistenceConfiguration;
import pe.edu.unmsm.fisi.siscae.configuracion.ServiceConfiguration;
import pe.edu.unmsm.fisi.siscae.mapper.IInstitucionMapper;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Institucion;
import pe.edu.unmsm.fisi.siscae.model.parametro.Parametro;
import pe.edu.unmsm.fisi.siscae.utilitario.VerboConstantes;

@ContextConfiguration(classes = { ServiceConfiguration.class, PersistenceConfiguration.class })
@RunWith(SpringJUnit4ClassRunner.class)
public class SurchargeMapperTest
{

    private @Autowired IInstitucionMapper institucionMapper;

    @Test
    public void mantenerTipoGetTest()
    {
//        Parametro parametro = new Parametro();
//        parametro.setVerbo(VerboConstantes.GETS);
//        parametro.setObjeto(new Institucion());
//        List<Institucion> instituciones = institucionMapper.mantener(parametro);
//        instituciones.stream().forEach(institucion -> {
//            System.out.println(institucion.toString());
//        });
    }

}
