package pe.edu.unmsm.fisi.siscae.controller.seguridad;

import java.util.List;

import javax.validation.groups.Default;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pe.edu.unmsm.fisi.siscae.aspecto.anotacion.Audit;
import pe.edu.unmsm.fisi.siscae.aspecto.enumeracion.Accion;
import pe.edu.unmsm.fisi.siscae.aspecto.enumeracion.Comentario;
import pe.edu.unmsm.fisi.siscae.aspecto.enumeracion.Tipo;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Usuario;
import pe.edu.unmsm.fisi.siscae.model.seguridad.SecUsuario;
import pe.edu.unmsm.fisi.siscae.service.ISecUsuarioService;
import pe.edu.unmsm.fisi.siscae.utilitario.ConstantesGenerales;
import pe.edu.unmsm.fisi.siscae.utilitario.ValidatorUtil;
import pe.edu.unmsm.fisi.siscae.validacion.grupo.accion.IActualizacion;
import pe.edu.unmsm.fisi.siscae.validacion.grupo.accion.IRegistro;

//@Audit(tipo = Tipo.Usuario, datos = Dato.Usuario)
@Audit(tipo = Tipo.Usuario)
@RequestMapping("/usuario")
public @RestController class SecUsuarioController
{
    private @Autowired ISecUsuarioService secUsuarioService;

    @Audit(accion = Accion.Consulta, comentario = Comentario.ConsultaTodos)
    @GetMapping(params = "accion=buscarTodos")
    public List<Usuario> getLsUsuario()
    {
        return secUsuarioService.getLsUsuario();
    }

    @Audit(accion = Accion.REGISTRO, comentario = Comentario.Registro)
    @PostMapping
    public ResponseEntity<?> registrarUsuario(
            @Validated({ IRegistro.class, Default.class }) @RequestBody Usuario usuario,
            Errors error)
    {
        if (error.hasErrors())
        {
            return ResponseEntity.badRequest()
                    .body(ValidatorUtil.obtenerMensajeValidacionError(error));
        }
        secUsuarioService.registrarUsuario(usuario);
        return ResponseEntity.ok(secUsuarioService.buscarPorCodigoUsuario(String.valueOf(usuario.getIdUsuario())));
    }

    @Audit(accion = Accion.Actualizacion, comentario = Comentario.Actualizacion)
    @PutMapping
    public ResponseEntity<?> actualizarUsuario(
            @Validated({ IActualizacion.class, Default.class }) @RequestBody Usuario usuario,
            Errors error)
    {
        if (error.hasErrors())
        {
            return ResponseEntity.badRequest()
                    .body(ValidatorUtil.obtenerMensajeValidacionError(error));
        }
        secUsuarioService.actualizarUsuario(usuario);
        System.out.println("usuario : "+usuario);
        return ResponseEntity.ok(secUsuarioService.buscarPorCodigoUsuario(String.valueOf(usuario.getIdUsuario())));
    }

    @Audit(accion = Accion.Eliminacion, comentario = Comentario.Eliminacion)
    @DeleteMapping
    public ResponseEntity<?> eliminarUsuario(
            @Validated(IActualizacion.class) @RequestBody Usuario usuario, Errors error)
    {
        if (error.hasErrors())
        {
            return ResponseEntity.badRequest()
                    .body(ValidatorUtil.obtenerMensajeValidacionError(error));
        }
        secUsuarioService.deleteUsuario(usuario);
        return ResponseEntity.ok(ConstantesGenerales.ELIMINACION_EXITOSA);
    }
}