package pe.edu.unmsm.fisi.siscae.validacion.validator;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.beans.factory.annotation.Autowired;

import pe.edu.unmsm.fisi.siscae.service.IRolService;
import pe.edu.unmsm.fisi.siscae.service.ITipoRecursoService;
import pe.edu.unmsm.fisi.siscae.utilitario.Regex;
import pe.edu.unmsm.fisi.siscae.utilitario.ValidatorUtil;
import pe.edu.unmsm.fisi.siscae.validacion.IdRol;
import pe.edu.unmsm.fisi.siscae.validacion.IdTipoRecurso;


public class IdTipoRecursoValidator implements ConstraintValidator<IdTipoRecurso, Integer> {

	private int max;
    private int min;
    private boolean existe;
    
    private @Autowired ITipoRecursoService tipoRecursoService;
	
    public void initialize(IdRol anotacion)
    {
        this.existe = anotacion.existe();
        this.min = anotacion.esPos();
        this.max = anotacion.max();
    }
	
	@Override
	public boolean isValid(Integer idTipoRecurso, ConstraintValidatorContext context) {
		if (idTipoRecurso == null)
        {
            ValidatorUtil.addCustomMessageWithTemplate("{NotNull.TipoRecurso.idTipoRecurso}", context);
            return false;
        }
        
        if (idTipoRecurso >= max && idTipoRecurso <= min)
        {
            ValidatorUtil.addCustomMessageWithTemplate("{Range.TipoRecurso.idTipoRecurso}", context);
            return false;
        }
        boolean existeTipoRecurso = tipoRecursoService.existeTipoRecurso(idTipoRecurso);
        return existe ? existeTipoRecurso : !existeTipoRecurso;
	}

}
