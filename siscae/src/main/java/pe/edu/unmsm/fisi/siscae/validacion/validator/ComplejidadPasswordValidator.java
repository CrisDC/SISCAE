package pe.edu.unmsm.fisi.siscae.validacion.validator;

import java.lang.reflect.InvocationTargetException;
import java.util.List;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import javax.validation.constraintvalidation.SupportedValidationTarget;
import javax.validation.constraintvalidation.ValidationTarget;

import org.apache.commons.beanutils.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;

import pe.edu.unmsm.fisi.siscae.model.seguridad.PoliticaSeguridad;
import pe.edu.unmsm.fisi.siscae.service.IPoliticaSeguridadService;
import pe.edu.unmsm.fisi.siscae.utilitario.Regex;
import pe.edu.unmsm.fisi.siscae.utilitario.ValidatorUtil;
import pe.edu.unmsm.fisi.siscae.validacion.ComplejidadPassword;

@SupportedValidationTarget({ ValidationTarget.ANNOTATED_ELEMENT, ValidationTarget.PARAMETERS })
public class ComplejidadPasswordValidator
        implements ConstraintValidator<ComplejidadPassword, Object>
{
    private @Autowired IPoliticaSeguridadService politicaSeguridadService;

    String campoPassword;
    String campoPassword2;
    String campoRequiereCambio;

    @Override
    public void initialize(ComplejidadPassword anotation)
    {
        campoPassword = anotation.password();
        campoPassword2 = anotation.password2();
        campoRequiereCambio = anotation.requiereCambio();
    }

    @Override
    public boolean isValid(Object dto, ConstraintValidatorContext context)
    {

        String password = "";
        String password2 = "";
        Boolean requiereCambio = false;
        try
        {
            password = BeanUtils.getProperty(dto, this.campoPassword);
            password2 = BeanUtils.getProperty(dto, this.campoPassword2);
            requiereCambio = BeanUtils.getProperty(dto, this.campoRequiereCambio).equals("true")
                    ? true
                    : false;
            System.out.println("pas" + password + "pas2" + password2 + "  reC" + requiereCambio);
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
            List<PoliticaSeguridad> politicaSeguridad = politicaSeguridadService.getLsPoliticaSeguridad();
            int longitud = politicaSeguridad.get(0).getLongitudMinimaContrasenia();
            if (password.length() != politicaSeguridad.get(0).getLongitudMinimaContrasenia())
            {
                ValidatorUtil.addCustomMessageWithTemplateWithProperty(
                        "{Longitud.Usuario.longitud} "+longitud+" caracteres", this.campoPassword, context);
                return false;
            }
            if (politicaSeguridad.get(0).getComplejidadContrasenia() == 1) {
				if (!password.matches(Regex.SEGURIDAD_PASS)) {
					ValidatorUtil.addCustomMessageWithTemplateWithProperty("{Pattern.Usuario.password}",
							this.campoPassword, context);
					return false; 
				}
			}
            if (!password.equals(password2))
            {
                ValidatorUtil.addCustomMessageWithTemplateWithProperty(
                        "{NoIqual.Contrasenia.diferent}", this.campoPassword2, context);
                return false;
            }
        }
        return true;
    }
}