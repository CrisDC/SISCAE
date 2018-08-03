package pe.edu.unmsm.fisi.siscae.validacion.validator;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.beans.factory.annotation.Autowired;

import pe.edu.unmsm.fisi.siscae.model.mantenimiento.AreaEstudio;
import pe.edu.unmsm.fisi.siscae.service.IAreaEstudioService;
import pe.edu.unmsm.fisi.siscae.service.IHorarioService;
import pe.edu.unmsm.fisi.siscae.utilitario.ValidatorUtil;
import pe.edu.unmsm.fisi.siscae.validacion.CodigoInstitucion;
import pe.edu.unmsm.fisi.siscae.validacion.IdAreaEstudio;
import pe.edu.unmsm.fisi.siscae.validacion.IdHorario;

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
	public boolean isValid(Integer IdAreaEstudio, ConstraintValidatorContext context) {
		if (IdAreaEstudio == null)
        {
            ValidatorUtil.addCustomMessageWithTemplate("{NotNull.AreaEstudio.IdAreaEstudio}", context);
            return false;
        }
        
        if (IdAreaEstudio > max || IdAreaEstudio < min)
        {
            ValidatorUtil.addCustomMessageWithTemplate("{Range.AreaEstudio.IdAreaEstudio}", context);
            return false;
        }
        boolean existeAreaEstudio = areaEstudioService.existeAreaEstudio(AreaEstudio.IdAreaEstudio);
        return existe ? existeAreaEstudio.IdAreaEstudio : !existeHorario;
	}

	




}
