package pe.edu.unmsm.fisi.siscae.validacion.validator;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.beans.factory.annotation.Autowired;

import pe.edu.unmsm.fisi.siscae.service.ICodigoRptaVisaService;
import pe.edu.unmsm.fisi.siscae.utilitario.Regex;
import pe.edu.unmsm.fisi.siscae.utilitario.ValidatorUtil;
import pe.edu.unmsm.fisi.siscae.validacion.CodigoRptaVisa;

public class CodigoRptaVisaValidator implements ConstraintValidator<CodigoRptaVisa, String>
{
    private int max;
    private int min;
    private boolean existe;

    private @Autowired ICodigoRptaVisaService codigoRptaVisaService;

    @Override
    public void initialize(CodigoRptaVisa anotacion)
    {
        this.existe = anotacion.existe();
        this.min = anotacion.min();
        this.max = anotacion.max();
    }

    @Override
    public boolean isValid(String codigoRespuestaVisa, ConstraintValidatorContext context)
    {
        if (codigoRespuestaVisa == null)
        {
            ValidatorUtil.addCustomMessageWithTemplate(
                    "{NotNull.CodigoRptaVisa.codigoRespuestaVisa}", context);
            return false;
        }
        if (codigoRespuestaVisa.trim().isEmpty())
        {
            ValidatorUtil.addCustomMessageWithTemplate(
                    "{NotBlank.CodigoRptaVisa.codigoRespuestaVisa}", context);
            return false;
        }
        if (codigoRespuestaVisa.length() > max || codigoRespuestaVisa.length() < min)
        {
            ValidatorUtil.addCustomMessageWithTemplate(
                    "{Length.CodigoRptaVisa.codigoRespuestaVisa}", context);
            return false;
        }
        if (!codigoRespuestaVisa.matches(Regex.SOLO_DIGITOS))
        {
            ValidatorUtil.addCustomMessageWithTemplate(
                    "{Pattern.CodigoRptaVisa.codigoRespuestaVisa}", context);
            return false;
        }
        boolean existeCodigoRespuestaVisa = codigoRptaVisaService
                .existeCodigoRptaVisa(codigoRespuestaVisa);
        return existe ? existeCodigoRespuestaVisa : !existeCodigoRespuestaVisa;
    }
}