package pe.edu.unmsm.fisi.siscae.validacion.validator;


import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.beans.factory.annotation.Autowired;

import pe.edu.unmsm.fisi.siscae.service.IAdministrativoService;
import pe.edu.unmsm.fisi.siscae.utilitario.Regex;
import pe.edu.unmsm.fisi.siscae.utilitario.ValidatorUtil;
import pe.edu.unmsm.fisi.siscae.validacion.IdAdministrativo;



public class IdAdministrativoValidator implements ConstraintValidator<IdAdministrativo,Integer>{

    private int max;
    private int min;
    private boolean existe;

    private @Autowired IAdministrativoService administrativoService;//xd


    public void initialize(IdAdministrativo anotacion)
    {
        this.existe = anotacion.existe();
        this.min = anotacion.esPos();
        this.max = anotacion.max();
    }
    
    
	@Override
	public boolean isValid(Integer idAdministrativo, ConstraintValidatorContext context) {

		if (idAdministrativo == null)
        {
            ValidatorUtil.addCustomMessageWithTemplate("{NotNull.Administrativo.idAdministrativo}", context);
            return false;
        }
        
        if (idAdministrativo >= max && idAdministrativo <= min)
        {
            ValidatorUtil.addCustomMessageWithTemplate("{Range.Administrativo.idAdministrativo}", context);
            return false;
        }
        boolean existeAdministrativo = administrativoService.existeAdministrativo(idAdministrativo);
        return existe ? existeAdministrativo : !existeAdministrativo;
 
	}

	
    
    
	
	
}
