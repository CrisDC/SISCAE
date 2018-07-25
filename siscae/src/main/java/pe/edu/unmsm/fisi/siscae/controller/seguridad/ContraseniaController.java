package pe.edu.unmsm.fisi.siscae.controller.seguridad;

import javax.validation.groups.Default;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import pe.edu.unmsm.fisi.siscae.model.seguridad.Password;
import pe.edu.unmsm.fisi.siscae.service.IContraseniaService;
import pe.edu.unmsm.fisi.siscae.utilitario.ConstantesGenerales;
import pe.edu.unmsm.fisi.siscae.utilitario.ValidatorUtil;
import pe.edu.unmsm.fisi.siscae.validacion.grupo.accion.IActualizacion;

public @RestController class ContraseniaController
{
    private @Autowired IContraseniaService contraseniaService;

    @PutMapping("/contrasenia")
    public ResponseEntity<?> actualizarContrasenia(
            @Validated({ IActualizacion.class, Default.class }) @RequestBody Password contrasenia,
            Errors error)
    {
        if (error.hasErrors())
        {
            return ResponseEntity.badRequest()
                    .body(ValidatorUtil.obtenerMensajeValidacionError(error));
        }
        contraseniaService.actualizarContrasenia(contrasenia);
        System.out.println("VERIFICANDO : "+contrasenia);
        return ResponseEntity.ok(ConstantesGenerales.ACTUALIZACION_EXITOSA);
    }
}
