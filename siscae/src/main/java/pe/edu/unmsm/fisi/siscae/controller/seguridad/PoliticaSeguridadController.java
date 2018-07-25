package pe.edu.unmsm.fisi.siscae.controller.seguridad;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import pe.edu.unmsm.fisi.siscae.model.seguridad.PoliticaSeguridad;
import pe.edu.unmsm.fisi.siscae.service.IPoliticaSeguridadService;

public @RestController class PoliticaSeguridadController
{
    private @Autowired IPoliticaSeguridadService politicaSeguridadService;

//    @GetMapping(value = "/politicaSeguridad")
//    public List<PoliticaSeguridad> buscarTodos()
//    {
//        return politicaSeguridadService.buscarTodos();
//    }
    
    @GetMapping(value = "/politica", params = "accion=buscarTodos")
    public List<PoliticaSeguridad> buscarTodos()
    {
        return politicaSeguridadService.buscarTodos();
    }
    
    @PutMapping("/politica")
    public ResponseEntity<?> actualizarPolicaSeguridad(@RequestBody PoliticaSeguridad politicaSeguridad)
    {
    	politicaSeguridadService.actualizarPoliticaSeguridad(politicaSeguridad);
//        return ResponseEntity.ok(politicaSeguridadService.buscarPorCodigoPoliticaSeguridad(politicaSeguridad.getNumeroMaximoIntentos()));
    	return ResponseEntity.ok(politicaSeguridadService.buscarTodos());
//    	return secPerfilService.getLsPerfil();
    }
}
