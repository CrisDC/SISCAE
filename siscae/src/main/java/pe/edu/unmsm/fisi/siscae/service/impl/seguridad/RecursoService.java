package pe.edu.unmsm.fisi.siscae.service.impl.seguridad;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import pe.edu.unmsm.fisi.siscae.mapper.IRecursoMapper;
import pe.edu.unmsm.fisi.siscae.model.Recurso;
import pe.edu.unmsm.fisi.siscae.service.IRecursoService;

@Service
public class RecursoService implements IRecursoService
{
    private @Autowired IRecursoMapper recursoMapper;

    @Transactional(propagation = Propagation.REQUIRED)
    public List<Recurso> obtenerRecursosPermitidosPorIdUsuario(String idUsuario)
    {
        return recursoMapper.obtenerRecursosPermitidosPorIdUsuario(idUsuario);
    }
}