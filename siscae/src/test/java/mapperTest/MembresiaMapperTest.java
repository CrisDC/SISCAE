package mapperTest;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import pe.edu.unmsm.fisi.siscae.configuracion.PersistenceConfiguration;
import pe.edu.unmsm.fisi.siscae.configuracion.ServiceConfiguration;
import pe.edu.unmsm.fisi.siscae.mapper.IMembresiaMapper;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Membresia;
import pe.edu.unmsm.fisi.siscae.model.parametro.Parametro;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion;
import pe.edu.unmsm.fisi.siscae.utilitario.VerboConstantes;

@ContextConfiguration(classes = { ServiceConfiguration.class, PersistenceConfiguration.class })
@RunWith(SpringJUnit4ClassRunner.class)
public class MembresiaMapperTest
{

    private @Autowired IMembresiaMapper membresiaMapper;

    @Test
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void mantenerTipoGets()
    {
        List<Membresia> membresias = membresiaMapper.mantener(new Parametro());
        membresias.stream().forEach(System.out::println);
    }

    @Test
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void mantenerTipoGet()
    {
        List<Membresia> membresias = membresiaMapper
                .mantener(new Parametro(Operacion.SELECT, new Membresia()));
        membresias.stream().forEach(System.out::println);
    }

}
