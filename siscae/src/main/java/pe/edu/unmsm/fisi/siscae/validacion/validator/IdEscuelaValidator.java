package pe.edu.unmsm.fisi.siscae.validacion.validator;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.beans.factory.annotation.Autowired;

import pe.edu.unmsm.fisi.siscae.service.IEscuelaService;
import pe.edu.unmsm.fisi.siscae.utilitario.ValidatorUtil;
import pe.edu.unmsm.fisi.siscae.validacion.IdEscuela;

public class IdEscuelaValidator implements ConstraintValidator<IdEscuela, Integer>  {
	private int max;
    private int min;
    private boolean existe;
    
    private @Autowired IEscuelaService escuelaService;
    
    @Override
    public void initialize(IdEscuela anotacion)
    {
        this.existe = anotacion.existe();
        this.min = anotacion.esPos();
        this.max = anotacion.max();
    }
    
    @Override
	public boolean isValid(Integer IdEscuela, ConstraintValidatorContext context) {
		if (IdEscuela == null)
        {
            ValidatorUtil.addCustomMessageWithTemplate("{NotNull.Escuela.IdEscuela}", context);
            return false;
        }
        
        if (IdEscuela > max || IdEscuela < min)
        {
            ValidatorUtil.addCustomMessageWithTemplate("{Range.Escuela.IdEscuela}", context);
            return false;
        }
        boolean existeEscuela = escuelaService.existe(IdEscuela);
        return existe ? existeEscuela : !existeEscuela;
}
}
