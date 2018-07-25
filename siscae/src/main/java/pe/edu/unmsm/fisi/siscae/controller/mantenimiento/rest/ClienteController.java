package pe.edu.unmsm.fisi.siscae.controller.mantenimiento.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pe.edu.unmsm.fisi.siscae.aspecto.anotacion.Audit;
import pe.edu.unmsm.fisi.siscae.aspecto.enumeracion.Accion;
import pe.edu.unmsm.fisi.siscae.aspecto.enumeracion.Comentario;
import pe.edu.unmsm.fisi.siscae.aspecto.enumeracion.Dato;
import pe.edu.unmsm.fisi.siscae.aspecto.enumeracion.Tipo;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Cliente;
import pe.edu.unmsm.fisi.siscae.service.IClienteService;
import pe.edu.unmsm.fisi.siscae.service.excepcion.BadRequestException;
import pe.edu.unmsm.fisi.siscae.utilitario.ConstantesGenerales;
import pe.edu.unmsm.fisi.siscae.utilitario.ValidatorUtil;
import pe.edu.unmsm.fisi.siscae.validacion.IdEmpresa;
import pe.edu.unmsm.fisi.siscae.validacion.grupo.secuencia.ISecuenciaValidacionActualizacion;
import pe.edu.unmsm.fisi.siscae.validacion.grupo.secuencia.ISecuenciaValidacionEliminacion;
import pe.edu.unmsm.fisi.siscae.validacion.grupo.secuencia.ISecuenciaValidacionRegistro;

@Audit(tipo = Tipo.Clte, datos = Dato.Cliente)
@RequestMapping("/cliente")
public @RestController class ClienteController
{
    private @Autowired IClienteService clienteService;

    @Audit(accion = Accion.Consulta, comentario = Comentario.ConsultaTodos)
    @GetMapping(params = "accion=buscarTodos")
    public List<Cliente> buscarTodos()
    {
        return clienteService.buscarTodos();
    }

    @PreAuthorize("hasAnyRole('MANT_CLIENTE','MANT_CUENTAS_FC')")
    @Audit(accion = Accion.Consulta, comentario = Comentario.Consulta)
    @GetMapping("/empresa/{idEmpresa}")
    public List<Cliente> buscarClientePorIdEmpresa(
            @IdEmpresa(existe = true) @PathVariable String idEmpresa)
    {
        return clienteService.buscarPorIdEmpresa(idEmpresa);
    }
    

    @Audit(accion = Accion.REGISTRO, comentario = Comentario.Registro)
    @PostMapping
    public ResponseEntity<?> registrarCliente(
            @Validated(ISecuenciaValidacionRegistro.class) @RequestBody Cliente cliente,
            Errors error)
    {
        if (error.hasErrors())
        {
            throw new BadRequestException(ValidatorUtil.obtenerMensajeValidacionError(error));
        }
        clienteService.registrarCliente(cliente);
        return ResponseEntity.ok(clienteService.buscarPodIdClienteIdEmpresa(cliente.getIdCliente(),
                cliente.getIdEmpresa()));
    }

    @Audit(accion = Accion.Actualizacion, comentario = Comentario.Actualizacion)
    @PutMapping
    public ResponseEntity<?> actualizarCliente(
            @Validated(ISecuenciaValidacionActualizacion.class) @RequestBody Cliente cliente,
            Errors error)
    {
        if (error.hasErrors())
        {
            throw new BadRequestException(ValidatorUtil.obtenerMensajeValidacionError(error));
        }
        clienteService.actualizarCliente(cliente);
        return ResponseEntity.ok(clienteService.buscarPodIdClienteIdEmpresa(cliente.getIdCliente(),
                cliente.getIdEmpresa()));
    }

    @Audit(accion = Accion.Eliminacion, comentario = Comentario.Eliminacion)
    @DeleteMapping
    public ResponseEntity<?> eliminarCliente(
            @Validated(ISecuenciaValidacionEliminacion.class) @RequestBody Cliente cliente,
            Errors error)
    {
        if (error.hasErrors())
        {
            throw new BadRequestException(ValidatorUtil.obtenerMensajeValidacionError(error));
        }
        clienteService.eliminarCliente(cliente);
        return ResponseEntity.ok(ConstantesGenerales.ELIMINACION_EXITOSA);
    }
}