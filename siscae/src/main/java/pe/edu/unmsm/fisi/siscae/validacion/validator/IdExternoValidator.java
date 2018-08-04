package pe.edu.unmsm.fisi.siscae.validacion.validator;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.beans.factory.annotation.Autowired;

import pe.edu.unmsm.fisi.siscae.service.IExternoService;
import pe.edu.unmsm.fisi.siscae.utilitario.Regex;
import pe.edu.unmsm.fisi.siscae.utilitario.ValidatorUtil;
import pe.edu.unmsm.fisi.siscae.validacion.IdExterno;

public class IdExternoValidator implements ConstraintValidator<IdExterno,Integer> {
	
	private int max;
    private int min;
    private boolean existe;
    
    private @Autowired IExternoService externoService;
	
    public void initialize(IdExterno anotacion)
    {
        this.existe = anotacion.existe();
        this.min = anotacion.esPos();
        this.max = anotacion.max();
    }

	@Override
	public boolean isValid(Integer idExterno, ConstraintValidatorContext context) {
		if (idExterno == null)
        {
            ValidatorUtil.addCustomMessageWithTemplate("{NotNull.Externo.idExterno}", context);
            return false;
        }
        
        if (idExterno >= max && idExterno <= min)
        {
            ValidatorUtil.addCustomMessageWithTemplate("{Range.Externo.idExterno}", context);
            return false;
        }
        boolean existeExterno = externoService.existeExterno(idExterno);
        return existe ? existeExterno : !existeExterno;
	}
	}

