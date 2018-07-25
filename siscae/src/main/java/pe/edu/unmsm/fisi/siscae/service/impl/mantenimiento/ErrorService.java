package pe.edu.unmsm.fisi.siscae.service.impl.mantenimiento;

import java.util.List;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import pe.edu.unmsm.fisi.siscae.mapper.IErrorMapper;
import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Error;
import pe.edu.unmsm.fisi.siscae.service.IErrorService;
import pe.edu.unmsm.fisi.siscae.service.excepcion.ListaVaciaException;
import pe.edu.unmsm.fisi.siscae.service.impl.MantenibleService;
import pe.edu.unmsm.fisi.siscae.utilitario.ConstantesExcepciones;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion;
import pe.edu.unmsm.fisi.siscae.utilitario.StringsUtils;
import pe.edu.unmsm.fisi.siscae.utilitario.VerboConstantes;

@Service
public class ErrorService extends MantenibleService<Error> implements IErrorService
{
    private IErrorMapper errorMapper;

    public ErrorService(@Qualifier("IErrorMapper") IMantenibleMapper<Error> mapper)
    {
        super(mapper);
        this.errorMapper = (IErrorMapper) mapper;
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public List<Error> buscarTodos()
    {
        return this.buscar(new Error(), Operacion.SELECT);
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public List<Error> buscarPorIdError(int idError)
    {
        Error error = Error.builder().idError(idError).build();
        return this.buscar(error, Operacion.SELECT);
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public String obtenerDescripcionError(Integer idError)
    {
        List<Error> errores = this.buscarPorIdError(idError);
        if (errores.isEmpty())
        {
            throw new ListaVaciaException(ConstantesExcepciones.ERROR_DESCONOCIDO);
        } else
        {
            Error error = errores.get(0);
            return StringsUtils.concatenarCadena("Código de Error: ", error.getIdError(), " - ",
                    error.getDescripcion());
        }
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public boolean existeError(int iderror)
    {
        return !this.buscarPorIdError(iderror).isEmpty();
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void registrarError(Error error)
    {
        this.registrar(error);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void actualizarError(Error error)
    {
        this.actualizar(error);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void eliminarError(Error error)
    {
        this.eliminar(error);
    }
}