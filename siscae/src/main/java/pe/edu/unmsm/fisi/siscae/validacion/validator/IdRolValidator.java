package pe.edu.unmsm.fisi.siscae.validacion.validator;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.beans.factory.annotation.Autowired;

import pe.edu.unmsm.fisi.siscae.service.IRolService;
import pe.edu.unmsm.fisi.siscae.service.IUsuarioService;
import pe.edu.unmsm.fisi.siscae.utilitario.ValidatorUtil;
import pe.edu.unmsm.fisi.siscae.validacion.IdRol;

public class IdRolValidator implements ConstraintValidator<IdRol, Integer>{

	
	private int max;
    private int min;
    private boolean existe;
    
    private @Autowired IRolService rolService;
	
    public void initialize(IdRol anotacion)
    {
        this.existe = anotacion.existe();
        this.min = anotacion.esPos();
        this.max = anotacion.max();
    }
    
	@Override
	public boolean isValid(Integer idRol, ConstraintValidatorContext context) {
		if (idRol == null)
        {
            ValidatorUtil.addCustomMessageWithTemplate("{NotNull.Rol.idRol}", context);
            return false;
        }
        
        if (idRol >= max && idRol <= min)
        {
            ValidatorUtil.addCustomMessageWithTemplate("{Range.Rol.idRol}", context);
            return false;
        }
        boolean existeRol = rolService.existeRol(idRol);
        return existe ? existeRol : !existeRol;
	}
	
	
	

}
