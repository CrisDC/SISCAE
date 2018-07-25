package pe.edu.unmsm.fisi.siscae.service.impl.mantenimiento;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import pe.edu.unmsm.fisi.siscae.mapper.IParametroGeneralMapper;
import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.ParametroGeneral;
import pe.edu.unmsm.fisi.siscae.service.IParametroGeneralService;
import pe.edu.unmsm.fisi.siscae.service.excepcion.ListaVaciaException;
import pe.edu.unmsm.fisi.siscae.service.excepcion.ValorNoEncontradoException;
import pe.edu.unmsm.fisi.siscae.service.impl.MantenibleService;
import pe.edu.unmsm.fisi.siscae.utilitario.ConstantesExcepciones;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion;
import pe.edu.unmsm.fisi.siscae.utilitario.VerboConstantes;

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

    @Transactional(propagation = Propagation.REQUIRED)
    public int buscarCodigoInstitucion()
    {
        List<ParametroGeneral> parametrosGenerales = this.buscar(new ParametroGeneral(),
                Operacion.SELECT);
        if (parametrosGenerales.isEmpty())
        {
            throw new ListaVaciaException(ConstantesExcepciones.PARAMETRO_GENERAL_NO_ENCONTRADO);
        }
        ParametroGeneral parametroGeneral = parametrosGenerales.get(0);
        if (parametroGeneral.getCodigoInstitucion() == null)
        {
            throw new ValorNoEncontradoException(ConstantesExcepciones.CODIGO_INSTITUCION_NO_ENCONTRADO);
        }
        return parametroGeneral.getCodigoInstitucion();
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public String buscarIdEmpresa()
    { 
        List<ParametroGeneral> parametrosGenerales = this.buscar(new ParametroGeneral(),
                Operacion.SELECT);
        if (parametrosGenerales.isEmpty())
        {
            throw new ListaVaciaException(ConstantesExcepciones.PARAMETRO_GENERAL_NO_ENCONTRADO);
        }
        ParametroGeneral parametroGeneral = parametrosGenerales.get(0);
        if (parametroGeneral.getIdEmpresa() == null)
        {
            throw new ValorNoEncontradoException(ConstantesExcepciones.ID_EMPRESA_NO_ENCONTRADO);
        }
        return parametroGeneral.getIdEmpresa();
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public Date buscarFechaProceso()
    {
        List<ParametroGeneral> parametrosGenerales = this.buscar(new ParametroGeneral(),
                Operacion.SELECT);
        if (parametrosGenerales.isEmpty())
        {
            throw new ListaVaciaException(ConstantesExcepciones.PARAMETRO_GENERAL_NO_ENCONTRADO);
        }
        ParametroGeneral parametroGeneral = parametrosGenerales.get(0);
        if (parametroGeneral.getFechaProceso() == null)
        {
            throw new ValorNoEncontradoException(ConstantesExcepciones.FECHA_PROCESO_NO_ENCONTRADO);
        }
        return parametroGeneral.getFechaProceso();
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public String buscarRutaContextoSimpBus()
    {
        List<ParametroGeneral> parametrosGenerales = this.buscar(new ParametroGeneral(),
                Operacion.SELECT);
        if (parametrosGenerales.isEmpty())
        {
            throw new ListaVaciaException(ConstantesExcepciones.PARAMETRO_GENERAL_NO_ENCONTRADO);
        }
        ParametroGeneral parametroGeneral = parametrosGenerales.get(0);
        if (parametroGeneral.getFechaProceso() == null)
        {
            throw new ValorNoEncontradoException(
                    ConstantesExcepciones.RUTA_CONTEXTO_SIMPBUS_NO_ENCONTRADO);
        }
        return parametroGeneral.getRutaContextoSimpBus();
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public List<ParametroGeneral> buscarTodos()
    {
        return this.buscar(new ParametroGeneral(), Operacion.SELECT);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void registrarParametroGeneral(ParametroGeneral parametroGeneral)
    {
        this.registrar(parametroGeneral);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void actualizarParametroGeneral(ParametroGeneral parametroGeneral)
    {
        this.actualizar(parametroGeneral);
    }
}