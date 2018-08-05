package pe.edu.unmsm.fisi.siscae.validacion.validator;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.beans.factory.annotation.Autowired;

import pe.edu.unmsm.fisi.siscae.service.IInfraccionService;
import pe.edu.unmsm.fisi.siscae.service.IRolService;
import pe.edu.unmsm.fisi.siscae.service.IUsuarioService;
import pe.edu.unmsm.fisi.siscae.utilitario.Regex;
import pe.edu.unmsm.fisi.siscae.utilitario.ValidatorUtil;
import pe.edu.unmsm.fisi.siscae.validacion.IdInfraccion;
public class IdInfraccionValidator implements ConstraintValidator<IdInfraccion,Integer> {
	
	private int max;
    private int min;
    private boolean existe;
    
    private @Autowired IInfraccionService infraccionService;
	
    public void initialize(IdInfraccion anotacion)
    {
        this.existe = anotacion.existe();
        this.min = anotacion.esPos();
        this.max = anotacion.max();
    }

	@Override
	public boolean isValid(Integer idInfraccion, ConstraintValidatorContext context) {
		if (idInfraccion == null)
        {
            ValidatorUtil.addCustomMessageWithTemplate("{NotNull.Infraccion.idInfraccion}", context);
            return false;
        }
        
        if (idInfraccion >= max && idInfraccion <= min)
        {
            ValidatorUtil.addCustomMessageWithTemplate("{Range.Infraccion.idInfraccion}", context);
            return false;
        }
        boolean existeInfraccion = infraccionService.existeInfraccion(idInfraccion);
        return existe ? existeInfraccion : !existeInfraccion;
	}

	

}
