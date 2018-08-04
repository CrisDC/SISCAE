package pe.edu.unmsm.fisi.siscae.validacion.validator;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.beans.factory.annotation.Autowired;

import pe.edu.unmsm.fisi.siscae.service.IPrestamoService;
import pe.edu.unmsm.fisi.siscae.utilitario.Regex;
import pe.edu.unmsm.fisi.siscae.utilitario.ValidatorUtil;
import pe.edu.unmsm.fisi.siscae.validacion.IdPrestamo;

public class IdPrestamoValidator implements ConstraintValidator<IdPrestamo,Integer>{

	
    private int max;
    private int min;
    private boolean existe;

    private @Autowired IPrestamoService prestamoService;


    
    public void initialize(IdPrestamo anotacion)
    {
        this.existe = anotacion.existe();
        this.min = anotacion.esPos();
        this.max = anotacion.max();
    }
    
	@Override
	public boolean isValid(Integer idPrestamo, ConstraintValidatorContext context) {
		

		if (idPrestamo == null)
        {
            ValidatorUtil.addCustomMessageWithTemplate("{NotNull.Prestamo.idPrestamo}", context);
            return false;
        }
        
        if (idPrestamo >= max && idPrestamo <= min)
        {
            ValidatorUtil.addCustomMessageWithTemplate("{Range.Prestamo.idPrestamo}", context);
            return false;
        }
        boolean existePrestamo = prestamoService.existePrestamo(idPrestamo);
        return existe ? existePrestamo : !existePrestamo;
	}
    
    
    
	
}
