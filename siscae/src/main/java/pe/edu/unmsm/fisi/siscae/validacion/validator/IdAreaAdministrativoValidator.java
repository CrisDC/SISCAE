package pe.edu.unmsm.fisi.siscae.validacion.validator;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.beans.factory.annotation.Autowired;

import pe.edu.unmsm.fisi.siscae.service.IAreaAdministrativoService;
import pe.edu.unmsm.fisi.siscae.utilitario.ValidatorUtil;
import pe.edu.unmsm.fisi.siscae.validacion.IdAreaAdministrativo;

public class IdAreaAdministrativoValidator  implements ConstraintValidator<IdAreaAdministrativo,Integer>{
	private int max;
    private int min;
    private boolean existe;
    
    private @Autowired IAreaAdministrativoService areaAdministrativoService;
    
    @Override
    public void initialize(IdAreaAdministrativo anotacion)
    {
        this.existe = anotacion.existe();
        this.min = anotacion.esPos();
        this.max = anotacion.max();
    }

	@Override
	public boolean isValid(Integer idAreaAdministrativo, ConstraintValidatorContext context) {
		if (idAreaAdministrativo == null)
        {
            ValidatorUtil.addCustomMessageWithTemplate("{NotNull.AreaAdministrativo.idAreaAdministrativo}", context);
            return false;
        }
        
        if (idAreaAdministrativo > max || idAreaAdministrativo < min){
            ValidatorUtil.addCustomMessageWithTemplate("{Range.AreaAdministrativo.idAreaAdministrativo}", context);
            return false;
        }
        boolean existeAreaAdministrativo = areaAdministrativoService.existeAreaAdministrativo(idAreaAdministrativo);
        return existe ? existeAreaAdministrativo : !existeAreaAdministrativo;
	}

}
