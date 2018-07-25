package pe.edu.unmsm.fisi.siscae.validacion.validator;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.beans.factory.annotation.Autowired;

import pe.edu.unmsm.fisi.siscae.service.ISecUsuarioService;
import pe.edu.unmsm.fisi.siscae.utilitario.ValidatorUtil;
import pe.edu.unmsm.fisi.siscae.validacion.CodigoUsuario;

public class CodigoUsuarioValidator implements ConstraintValidator<CodigoUsuario, String>
{
    private boolean existe;
    private @Autowired ISecUsuarioService secUsuarioService;

    @Override
    public void initialize(CodigoUsuario anotacion)
    {
        this.existe = anotacion.existe();
    }

    @Override
    public boolean isValid(String idUsusario, ConstraintValidatorContext context)
    {
        if (idUsusario == null)
        {
            ValidatorUtil.addCustomMessageWithTemplate("{NotNull.Usuario.idUsusario}", context);
            return false;
        }
        if (idUsusario.trim().isEmpty())
        {
            ValidatorUtil.addCustomMessageWithTemplate("{NotBlank.Usuario.idUsusario}", context);
            return false;
        }
        return existe ? !secUsuarioService.buscarPorCodigoUsuario(idUsusario).isEmpty()
                : secUsuarioService.buscarPorCodigoUsuario(idUsusario).isEmpty();
    }
}