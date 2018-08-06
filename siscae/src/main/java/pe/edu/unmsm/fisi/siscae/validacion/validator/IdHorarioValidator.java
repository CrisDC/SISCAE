package pe.edu.unmsm.fisi.siscae.validacion.validator;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.beans.factory.annotation.Autowired;

import pe.edu.unmsm.fisi.siscae.service.IHorarioService;
import pe.edu.unmsm.fisi.siscae.utilitario.ValidatorUtil;
import pe.edu.unmsm.fisi.siscae.validacion.IdHorario;

public class IdHorarioValidator  implements ConstraintValidator<IdHorario,Integer>{
	private int max;
    private int min;
    private boolean existe;
    
    private @Autowired IHorarioService horarioService;
    
    @Override
    public void initialize(IdHorario anotacion)
    {
        this.existe = anotacion.existe();
        this.min = anotacion.esPos();
        this.max = anotacion.max();
    }

	@Override
	public boolean isValid(Integer idHorario, ConstraintValidatorContext context) {
		if (idHorario == null)
        {
            ValidatorUtil.addCustomMessageWithTemplate("{NotNull.Horario.idHorario}", context);
            return false;
        }
        
        if (idHorario > max || idHorario < min)
        {
            ValidatorUtil.addCustomMessageWithTemplate("{Range.Horario.idHorario}", context);
            return false;
        }
        boolean existeHorario = horarioService.existe(idHorario);
        return existe ? existeHorario : !existeHorario;
	}

	


}
