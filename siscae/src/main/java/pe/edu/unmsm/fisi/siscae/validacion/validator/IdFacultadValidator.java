package pe.edu.unmsm.fisi.siscae.validacion.validator;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.beans.factory.annotation.Autowired;

import pe.edu.unmsm.fisi.siscae.service.IFacultadService;

import pe.edu.unmsm.fisi.siscae.utilitario.ValidatorUtil;

import pe.edu.unmsm.fisi.siscae.validacion.IdFacultad;

public class IdFacultadValidator implements  ConstraintValidator<IdFacultad,Integer>{
	 private int max;
	    private int min;
	    private boolean existe;

	    private @Autowired IFacultadService facultadService;

	    @Override
	    public void initialize(IdFacultad anotacion)
	    {
	        this.existe = anotacion.existe();
	        this.min = anotacion.esPos();
	        this.max = anotacion.max();
	    }

	
	    @Override
		public boolean isValid(Integer idFacultad, ConstraintValidatorContext context) {
			if (idFacultad == null)
	        {
	            ValidatorUtil.addCustomMessageWithTemplate("{NotNull.Facultad.idFacultad}", context);
	            return false;
	        }
	        
	        if (idFacultad > max || idFacultad< min)
	        {
	            ValidatorUtil.addCustomMessageWithTemplate("{Range.Facultad.idFacultad}", context);
	            return false;
	        }
	        boolean existeFacultad= facultadService.existeFacultad(idFacultad);
	        return existe ? existeFacultad: !existeFacultad;
		}
	
	
	
}
