package pe.edu.unmsm.fisi.siscae.validacion.validator;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.beans.factory.annotation.Autowired;

import pe.edu.unmsm.fisi.siscae.service.IMaterialService;
import pe.edu.unmsm.fisi.siscae.utilitario.Regex;
import pe.edu.unmsm.fisi.siscae.utilitario.ValidatorUtil;
import pe.edu.unmsm.fisi.siscae.validacion.IdMaterial;


public class IdMaterialValidator implements ConstraintValidator<IdMaterial,Integer> {

	
    private int max;
    private int min;
    private boolean existe;

    private @Autowired IMaterialService materialService;//xd


    
    public void initialize(IdMaterial anotacion)
    {
        this.existe = anotacion.existe();
        this.min = anotacion.esPos();
        this.max = anotacion.max();
    }
    
    
	@Override
	public boolean isValid(Integer idMaterial, ConstraintValidatorContext context) {
		

		if (idMaterial == null)
        {
            ValidatorUtil.addCustomMessageWithTemplate("{NotNull.Material.idMaterial}", context);
            return false;
        }
        
        if (idMaterial >= max && idMaterial <= min)
        {
            ValidatorUtil.addCustomMessageWithTemplate("{Range.Material.idMaterial}", context);
            return false;
        }
        boolean existeMaterial = materialService.existeMaterial(idMaterial);
        return existe ? existeMaterial : !existeMaterial;
	}
    
    
    
	
}
