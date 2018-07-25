package pe.edu.unmsm.fisi.siscae.service.impl.seguridad;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import pe.edu.unmsm.fisi.siscae.mapper.ICategoriaRecursoMapper;
import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.MultiTabDet;
import pe.edu.unmsm.fisi.siscae.model.seguridad.CategoriaRecurso;
import pe.edu.unmsm.fisi.siscae.model.seguridad.SecRecurso;
import pe.edu.unmsm.fisi.siscae.service.ICategoriaRecursoService;
import pe.edu.unmsm.fisi.siscae.service.IMultiTabDetService;
import pe.edu.unmsm.fisi.siscae.service.impl.MantenibleService;
import pe.edu.unmsm.fisi.siscae.utilitario.MultiTablaUtil;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion;
import pe.edu.unmsm.fisi.siscae.utilitario.VerboConstantes;

@Service
public class CategoriaRecursoService extends MantenibleService<CategoriaRecurso>
        implements ICategoriaRecursoService
{
    private ICategoriaRecursoMapper categoriaRecursoMapper;
    private @Autowired IMultiTabDetService multiTabDetService;

    public CategoriaRecursoService(
            @Qualifier("ICategoriaRecursoMapper") IMantenibleMapper<CategoriaRecurso> mapper)
    {
        super(mapper);
        this.categoriaRecursoMapper = (ICategoriaRecursoMapper) mapper;
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public List<CategoriaRecurso> buscarTodosCategoriaRecurso()
    {
        List<MultiTabDet> accionesRecurso = multiTabDetService
                .buscarPorIdTabla(MultiTablaUtil.TABLA_ACCION_RECURSO);
        List<CategoriaRecurso> categoriasRecurso = categoriaRecursoMapper
                .buscarTodosCategoriaRecurso();
        for (CategoriaRecurso categoriaRecurso : categoriasRecurso)
        {
            categoriaRecurso.setAcciones(MultiTablaUtil.convertirAMultiTabDetAccionesRecurso(
                    categoriaRecurso.getAccionCategoria(), accionesRecurso));
        }
        return categoriasRecurso;
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public List<CategoriaRecurso> getLsCategoriaRecursos(String codPerfil)
    {
        return categoriaRecursoMapper.buscarCategoriaRecursoPorIdPerfil(codPerfil);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public List<CategoriaRecurso> getLsCategoriaRecurso()
    {
        return this.buscar(new CategoriaRecurso(), Operacion.SELECT);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void registrarCategoriaRecurso(CategoriaRecurso categoriaRecurso)
    {
        this.registrar(categoriaRecurso);
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public List<CategoriaRecurso> buscarPorCodigoCategoriaRecurso(int idCategoria)
    {
        CategoriaRecurso categoriaRecurso = CategoriaRecurso.builder().idCategoria(idCategoria)
                .build();
        return this.buscar(categoriaRecurso, Operacion.SELECT);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void actualizarCategoriaRecurso(CategoriaRecurso categoriaRecurso)
    {
        this.actualizar(categoriaRecurso);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void eliminarCategoriaRecurso(CategoriaRecurso categoriaRecurso)
    {
        this.eliminar(categoriaRecurso);
    }
}