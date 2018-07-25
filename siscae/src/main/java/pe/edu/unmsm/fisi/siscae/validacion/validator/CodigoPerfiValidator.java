package pe.edu.unmsm.fisi.siscae.validacion.validator;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import javax.validation.constraintvalidation.SupportedValidationTarget;
import javax.validation.constraintvalidation.ValidationTarget;

import pe.edu.unmsm.fisi.siscae.validacion.CodigoPerfil;

@SupportedValidationTarget({ ValidationTarget.ANNOTATED_ELEMENT, ValidationTarget.PARAMETERS })
public class CodigoPerfiValidator implements ConstraintValidator<CodigoPerfil, Object>
{
    private boolean existe;
    private String campoCodigoPerfil;

    @Override
    public void initialize(CodigoPerfil anotacion)
    {
        this.existe = anotacion.existe();
        this.campoCodigoPerfil = anotacion.campoCodigoPerfil();
    }

    @Override
    public boolean isValid(Object dto, ConstraintValidatorContext context)
    {
        return false;
    }
}