package pe.edu.unmsm.fisi.siscae.controller.seguridad;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import pe.edu.unmsm.fisi.siscae.model.seguridad.CategoriaRecurso;
import pe.edu.unmsm.fisi.siscae.service.ICategoriaRecursoService;
import pe.edu.unmsm.fisi.siscae.utilitario.ConstantesGenerales;

public @RestController class CategoriaRecursoController
{
    private @Autowired ICategoriaRecursoService categoriaRecursoService;

    @GetMapping(value = "/recursosPerfil/{codPerfil}")
    public List<CategoriaRecurso> getLsAsignacionPerfilRecurso(@PathVariable String codPerfil)
    {
        return categoriaRecursoService.getLsCategoriaRecursos(codPerfil);
    }

    @GetMapping(value = "/categoriaRecurso", params = "accion=buscarTodos")
    public List<CategoriaRecurso> getLsCategoriaRecurso()
    {
        return categoriaRecursoService.getLsCategoriaRecurso();
    }

    @PostMapping(value = "/categoriaRecurso")
    public ResponseEntity<?> registrarCategoriaRecurso(
            @RequestBody CategoriaRecurso categoriaRecurso)
    {
        categoriaRecursoService.registrarCategoriaRecurso(categoriaRecurso);
        return ResponseEntity.ok(categoriaRecursoService
                .buscarPorCodigoCategoriaRecurso(categoriaRecurso.getIdCategoria()));
    }

    @PutMapping("/categoriaRecurso")
    public ResponseEntity<?> actualizarCategoriaRecurso(
            @RequestBody CategoriaRecurso categoriaRecurso)
    {
        categoriaRecursoService.actualizarCategoriaRecurso(categoriaRecurso);
        return ResponseEntity.ok(categoriaRecursoService
                .buscarPorCodigoCategoriaRecurso(categoriaRecurso.getIdCategoria()));
    }

    @DeleteMapping("/categoriaRecurso")
    public ResponseEntity<?> eliminarCategoriaRecurso(
            @RequestBody CategoriaRecurso categoriaRecurso)
    {
        categoriaRecursoService.eliminarCategoriaRecurso(categoriaRecurso);
        return ResponseEntity.ok(ConstantesGenerales.ELIMINACION_EXITOSA);
    }
}