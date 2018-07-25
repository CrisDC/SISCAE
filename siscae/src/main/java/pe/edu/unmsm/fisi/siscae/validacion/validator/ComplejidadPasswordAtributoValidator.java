package pe.edu.unmsm.fisi.siscae.validacion.validator;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.beans.factory.annotation.Autowired;

import pe.edu.unmsm.fisi.siscae.service.IPoliticaSeguridadService;
import pe.edu.unmsm.fisi.siscae.utilitario.ValidatorUtil;
import pe.edu.unmsm.fisi.siscae.validacion.ComplejidadPasswordAtributo;

public class ComplejidadPasswordAtributoValidator
        implements ConstraintValidator<ComplejidadPasswordAtributo, String>
{
    private @Autowired IPoliticaSeguridadService politicaSeguridadService;

    @Override
    public void initialize(ComplejidadPasswordAtributo anotacion)
    {
       
    }

    @Override
    public boolean isValid(String nuevoPassword, ConstraintValidatorContext context)
    {
        if (nuevoPassword == null)
        {
            ValidatorUtil.addCustomMessageWithTemplate("{NotNull.Contrasenia.password}", context);
            return false;
        }
        if (nuevoPassword.trim().isEmpty())
        {
            ValidatorUtil.addCustomMessageWithTemplate("{NotBlank.Contrasenia.password}", context);
            return false;
        }
        
        //  CORREGIR ESTA PARTE (JUGAR CON EL nuevoPassword)
//        if (nuevoPassword.length() != politicaSeguridadService.buscarLongitudMinimaContrasenia())
//        {
//            ValidatorUtil.addCustomMessageWithTemplate("{Length.Contrasenia.password}", context);
//            return false;
//        }

//        if (politicaSeguridad.get(0).getComplejidadContrasenia().equals('1'))
//        {
//            if (!nuevoPassword.matches(Regex.SOLO_LETRAS_A_a))
//            {
//                ValidatorUtil.addCustomMessageWithTemplate("{Politicas.Contrasenia.politicas}",
//                        context);
//                return false;
//            }
//        }

        return true;
    }
}