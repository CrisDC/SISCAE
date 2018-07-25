package pe.edu.unmsm.fisi.siscae.validacion.validator;

import java.lang.reflect.InvocationTargetException;
import java.util.List;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import javax.validation.constraintvalidation.SupportedValidationTarget;
import javax.validation.constraintvalidation.ValidationTarget;

import org.apache.commons.beanutils.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import pe.edu.unmsm.fisi.siscae.model.seguridad.PoliticaSeguridad;
import pe.edu.unmsm.fisi.siscae.model.seguridad.SecUsuario;
import pe.edu.unmsm.fisi.siscae.service.IPoliticaSeguridadService;
import pe.edu.unmsm.fisi.siscae.service.ISecUsuarioService;
import pe.edu.unmsm.fisi.siscae.utilitario.Regex;
import pe.edu.unmsm.fisi.siscae.utilitario.ValidatorUtil;
import pe.edu.unmsm.fisi.siscae.validacion.CodigoPassword;

@SupportedValidationTarget({ ValidationTarget.ANNOTATED_ELEMENT, ValidationTarget.PARAMETERS })
public class CodigoPasswordValidator implements ConstraintValidator<CodigoPassword, Object>
{
    private @Autowired ISecUsuarioService secUsuarioService;
    private @Autowired IPoliticaSeguridadService politicaSeguridadService;

    private String campoPassword;
    private String campoNuevoPassword;
    private String campoNuevoPassword2;
    private String campoIdUsuario;
    private String campoRequiereCambio;

    @Override
    public void initialize(CodigoPassword anotacion)
    {
        this.campoPassword = anotacion.campoPassword();
        this.campoNuevoPassword = anotacion.campoNuevoPassword();
        this.campoNuevoPassword2 = anotacion.campoNuevoPassword2();
        this.campoIdUsuario = anotacion.campoIdUsuario();
        this.campoRequiereCambio = anotacion.campoRequiereCambio();
    }

    @Override
    public boolean isValid(Object dto, ConstraintValidatorContext context)
    {

        String password = "";
        String nuevoPassword = "";
        String nuevoPassword2 = "";
        String idUsuario = "";
        Boolean requiereCambio = false;
        try
        {
            password = BeanUtils.getProperty(dto, this.campoPassword);
            nuevoPassword = BeanUtils.getProperty(dto, this.campoNuevoPassword);
            nuevoPassword2 = BeanUtils.getProperty(dto, this.campoNuevoPassword2);
            idUsuario = BeanUtils.getProperty(dto, this.campoIdUsuario);
            requiereCambio = BeanUtils.getProperty(dto, this.campoRequiereCambio).equals("true")
                    ? true
                    : false;
        } catch (IllegalAccessException | InvocationTargetException | NoSuchMethodException e)
        {
            e.printStackTrace();
        }
        if (requiereCambio)
        {
            if (password == null)
            {
                ValidatorUtil.addCustomMessageWithTemplateWithProperty("{NotNull.Usuario.password}",
                        this.campoPassword, context);
                return false;
            }
            if (password.trim().isEmpty())
            {
                ValidatorUtil.addCustomMessageWithTemplateWithProperty(
                        "{NotBlank.Usuario.password}", this.campoPassword, context);
                return false;
            }
            BCryptPasswordEncoder passwordEnconder = new BCryptPasswordEncoder();

			List<SecUsuario> usuario = secUsuarioService.obtenerPasswordPorCodigoUsuario(idUsuario);
			boolean passwordMatches = passwordEnconder.matches(password, usuario.get(0).getPassword());
			if (!passwordMatches) {
				ValidatorUtil.addCustomMessageWithTemplateWithProperty("{Noequals.Contrasenia.password}",
						this.campoPassword, context);
				return false;
			} 
            if (nuevoPassword == null)
            {
                ValidatorUtil.addCustomMessageWithTemplateWithProperty("{NotNull.Usuario.password}",
                        this.campoNuevoPassword, context);
                return false;
            }
            if (nuevoPassword.trim().isEmpty())
            {
                ValidatorUtil.addCustomMessageWithTemplateWithProperty(
                        "{NotBlank.Usuario.password}", this.campoNuevoPassword, context);
                return false;
            }
            List<PoliticaSeguridad> politicaSeguridad = politicaSeguridadService.getLsPoliticaSeguridad();
			int longitud = politicaSeguridad.get(0).getLongitudMinimaContrasenia();
			if (nuevoPassword.length() != politicaSeguridad.get(0).getLongitudMinimaContrasenia())
            {
                ValidatorUtil.addCustomMessageWithTemplateWithProperty(
                        "{Longitud.Usuario.longitud} "+longitud+" caracteres", this.campoNuevoPassword, context);
                return false;
            }
			if (politicaSeguridad.get(0).getComplejidadContrasenia() == 1) {
				if (!nuevoPassword.matches(Regex.SEGURIDAD_PASS)) {
					ValidatorUtil.addCustomMessageWithTemplateWithProperty("{Pattern.Usuario.password}",
							this.campoNuevoPassword, context);
					return false; 
				}
			}
            if (nuevoPassword2 == null)
            {
                ValidatorUtil.addCustomMessageWithTemplateWithProperty("{NotNull.Usuario.password}",
                        this.campoNuevoPassword2, context);
                return false;
            }
            if (nuevoPassword2.trim().isEmpty())
            {
                ValidatorUtil.addCustomMessageWithTemplateWithProperty(
                        "{NotBlank.Usuario.password}", this.campoNuevoPassword2, context);
                return false;
            }
			if (!nuevoPassword.equals(nuevoPassword2)) {
				System.out.println("valor nuevoPassword 1 : "+nuevoPassword);
				ValidatorUtil.addCustomMessageWithTemplateWithProperty("{NoIqual.Contrasenia.diferent}",
						this.campoNuevoPassword2, context);
				return false;
			}
		}
		return true;
	}
}