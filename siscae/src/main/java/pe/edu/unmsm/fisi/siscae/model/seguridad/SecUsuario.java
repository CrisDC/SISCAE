package pe.edu.unmsm.fisi.siscae.model.seguridad;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.NotBlank;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pe.edu.unmsm.fisi.siscae.validacion.CodigoUsuario;
import pe.edu.unmsm.fisi.siscae.validacion.ComplejidadPassword;
import pe.edu.unmsm.fisi.siscae.validacion.grupo.IBasico;
import pe.edu.unmsm.fisi.siscae.validacion.grupo.accion.IActualizacion;
import pe.edu.unmsm.fisi.siscae.validacion.grupo.accion.IRegistro;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ComplejidadPassword(password = "password", password2 = "password2", requiereCambio = "requiereCambio", message = "{Existe.Usuario.idUsuario}")
public class SecUsuario
{
    @CodigoUsuario(existe = true, groups = IActualizacion.class)
    @CodigoUsuario(existe = false, message = "{Existe.Usuario.idUsuario}", groups = IRegistro.class)
    private String idUsuario;
    private String password;
    private String password2;
    private String passwordEncriptado;
    private String nombre;
    private String nombre2;

    @NotNull(message = "{NotNull.Usuario.idPerfil}", groups = IBasico.class)
    @NotBlank(message = "{NotBlank.Usuario.idPerfil}", groups = IBasico.class)
    private Integer idPerfil;
    private String idInstitucion;
    private String email;
    private String empresa;
    private Date fechaCreacion;
    private Date fechaPass;
    private int activo;
    private boolean requiereCambio;

    private Integer numeroIntentos;
    private String contrasenia;
    private String estado;

    
    private  List<SecUsuario> usuarios = new ArrayList<>();
    
    public boolean esActivo()
    {
        return this.activo == 1;
    }
}