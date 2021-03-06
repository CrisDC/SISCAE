package pe.edu.unmsm.fisi.siscae.validacion.validator;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.beans.factory.annotation.Autowired;

import pe.edu.unmsm.fisi.siscae.service.IMultiTabCabService;
import pe.edu.unmsm.fisi.siscae.utilitario.ValidatorUtil;
import pe.edu.unmsm.fisi.siscae.validacion.IdTabla;

public class IdTablaValidator implements ConstraintValidator<IdTabla, Integer>
{
    private int min;
    private int max;
    private boolean existe;
    private @Autowired IMultiTabCabService multiTabCabService;

    @Override
    public void initialize(IdTabla anotacion)
    {
        this.min = anotacion.min();
        this.max = anotacion.max();
        this.existe = anotacion.existe();
    }

    @Override
    public boolean isValid(Integer idTabla, ConstraintValidatorContext context)
    {
        if (idTabla == null)
        {
            ValidatorUtil.addCustomMessageWithTemplate("{NotNull.MultiTaCab.idTabla}", context);
            return false;
        }
        if (idTabla < min || idTabla > max)
        {
            ValidatorUtil.addCustomMessageWithTemplate("{Range.MultiTaCab.idTabla}", context);
            return false;
        }
        boolean existeIdTabla = multiTabCabService.existe(idTabla);
        return existe ? existeIdTabla : !existeIdTabla;
    }
}