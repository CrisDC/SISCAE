package pe.edu.unmsm.fisi.siscae.model.seguridad;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pe.edu.unmsm.fisi.siscae.validacion.CodigoPassword;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@CodigoPassword(campoPassword = "password", campoNuevoPassword = "nuevoPassword", campoNuevoPassword2 = "nuevoPassword2", campoRequiereCambio = "requiereCambio", campoIdUsuario = "idUsuario")
public class Password
{
    private String password;

//    @ComplejidadPasswordAtributo
    private String nuevoPassword;

//    @ComplejidadPasswordAtributo
    private String nuevoPassword2;
    private String idUsuario;
    private boolean requiereCambio;
    private String passwordEncriptado;
    private String passwordEncriptadoNuevo;
    private String passwordEncriptadoNuevo2;
}