package pe.edu.unmsm.fisi.siscae.service.impl.mantenimiento;

import java.util.List;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import pe.edu.unmsm.fisi.siscae.mapper.ICodigoRptaVisaMapper;
import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.CodigoRespuestaVisa;
import pe.edu.unmsm.fisi.siscae.service.ICodigoRptaVisaService;
import pe.edu.unmsm.fisi.siscae.service.impl.MantenibleService;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion.OperacionParam;

@Service
public class CodigoRptaVisaService extends MantenibleService<CodigoRespuestaVisa>
        implements ICodigoRptaVisaService
{
    private ICodigoRptaVisaMapper codigoRptaVisaMapper;

    public CodigoRptaVisaService(
            @Qualifier("ICodigoRptaVisaMapper") IMantenibleMapper<CodigoRespuestaVisa> mapper)
    {
        super(mapper);
        this.codigoRptaVisaMapper = (ICodigoRptaVisaMapper) mapper;
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public List<CodigoRespuestaVisa> buscarTodos()
    {
        return this.buscar(new CodigoRespuestaVisa(), Operacion.SELECT);
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public List<CodigoRespuestaVisa> buscarPorCodigoRptaVisa(String codigoRespuestaVisa)
    {
        CodigoRespuestaVisa codigoRptaVisa = CodigoRespuestaVisa.builder()
                .codigoRespuestaVisa(codigoRespuestaVisa).build();
        return this.buscar(codigoRptaVisa, OperacionParam.CODIGO_RPTA);
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public boolean existeCodigoRptaVisa(String codigoRespuestaVisa)
    {
        return !this.buscarPorCodigoRptaVisa(codigoRespuestaVisa).isEmpty();
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void registrarCodigoRptaVisa(CodigoRespuestaVisa codigoRptaVisa)
    {
        this.registrar(codigoRptaVisa);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void actualizarCodigoRptaVisa(CodigoRespuestaVisa codigoRptaVisa)
    {
        this.actualizar(codigoRptaVisa);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void eliminarCodigoRptaVisa(CodigoRespuestaVisa codigoRptaVisa)
    {
        this.eliminar(codigoRptaVisa);
    }
}