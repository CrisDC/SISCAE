package pe.edu.unmsm.fisi.siscae.validacion.validator;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.beans.factory.annotation.Autowired;

import pe.edu.unmsm.fisi.siscae.service.IMembresiaService;
import pe.edu.unmsm.fisi.siscae.utilitario.Regex;
import pe.edu.unmsm.fisi.siscae.utilitario.ValidatorUtil;
import pe.edu.unmsm.fisi.siscae.validacion.CodigoMembresia;

public class CodigoMembresiaValidator implements ConstraintValidator<CodigoMembresia, String>
{
    private boolean existe;
    private int tamanio;
    private @Autowired IMembresiaService membresiaService;

    @Override
    public void initialize(CodigoMembresia anotacion)
    {
        this.existe = anotacion.existe();
        this.tamanio = anotacion.tamanio();
    }

    @Override
    public boolean isValid(String codigoMembresia, ConstraintValidatorContext context)
    {
        if (codigoMembresia == null)
        {
            ValidatorUtil.addCustomMessageWithTemplate("{NotNull.Membresia.codigoMembresia}",
                    context);
            return false;
        }
        if (codigoMembresia.trim().isEmpty())
        {
            ValidatorUtil.addCustomMessageWithTemplate("{NotBlank.codigoMembresia}", context);
            return false;
        }
        if (!codigoMembresia.matches(Regex.SOLO_LETRAS_A_a))
        {
            ValidatorUtil.addCustomMessageWithTemplate("{Pattern.codigoMembresia}", context);
            return false;
        }
        if (codigoMembresia.length() != tamanio)
        {
            ValidatorUtil.addCustomMessageWithTemplate("{Length.codigoMembresia}", context);
            return false;
        }
        boolean existeMembresia = membresiaService.existeMembresia(codigoMembresia);
        return (existe) ? existeMembresia : !existeMembresia;
    }
}