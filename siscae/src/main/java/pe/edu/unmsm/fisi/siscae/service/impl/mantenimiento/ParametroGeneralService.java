package pe.edu.unmsm.fisi.siscae.service.impl.mantenimiento;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import pe.edu.unmsm.fisi.siscae.mapper.IParametroGeneralMapper;
import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.ParametroGeneral;
import pe.edu.unmsm.fisi.siscae.service.IParametroGeneralService;
import pe.edu.unmsm.fisi.siscae.service.impl.MantenibleService;

@Service
public class ParametroGeneralService extends MantenibleService<ParametroGeneral>
        implements IParametroGeneralService
{
    private IParametroGeneralMapper parametroGeneralMapper;

    public ParametroGeneralService(
            @Qualifier("IParametroGeneralMapper") IMantenibleMapper<ParametroGeneral> mapper)
    {
        super(mapper);
        this.parametroGeneralMapper = (IParametroGeneralMapper) mapper;
    }

  
}