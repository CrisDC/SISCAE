package pe.edu.unmsm.fisi.siscae.validacion.validator;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.beans.factory.annotation.Autowired;

import pe.edu.unmsm.fisi.siscae.service.IAreaEstudioService;
import pe.edu.unmsm.fisi.siscae.utilitario.ValidatorUtil;
import pe.edu.unmsm.fisi.siscae.validacion.IdAreaEstudio;

public class IdAreaEstudioValidator implements ConstraintValidator<IdAreaEstudio, Integer> {
	private int max;
    private int min;
    private boolean existe;
    
    private @Autowired IAreaEstudioService areaEstudioService;
    
    @Override
    public void initialize(IdAreaEstudio anotacion)
    {
        this.existe = anotacion.existe();
        this.min = anotacion.esPos();
        this.max = anotacion.max();
    }

	@Override
	public boolean isValid(Integer idAreaEstudio, ConstraintValidatorContext context) {
		if (idAreaEstudio == null)
        {
            ValidatorUtil.addCustomMessageWithTemplate("{NotNull.AreaEstudio.IdAreaEstudio}", context);
            return false;
        }
        
        if (idAreaEstudio > max || idAreaEstudio < min)
        {
            ValidatorUtil.addCustomMessageWithTemplate("{Range.AreaEstudio.IdAreaEstudio}", context);
            return false;
        }
        boolean existeAreaEstudio = areaEstudioService.existe(idAreaEstudio);
        return existe ? existeAreaEstudio : !existeAreaEstudio;
	}

	




}
