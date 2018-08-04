package pe.edu.unmsm.fisi.siscae.validacion.validator;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.beans.factory.annotation.Autowired;

import pe.edu.unmsm.fisi.siscae.service.IUsuarioService;
import pe.edu.unmsm.fisi.siscae.utilitario.Regex;
import pe.edu.unmsm.fisi.siscae.utilitario.ValidatorUtil;
import pe.edu.unmsm.fisi.siscae.validacion.IdUsuario;

public class IdUsuarioValidator implements ConstraintValidator<IdUsuario,Integer> {

	
    private int max;
    private int min;
    private boolean existe;

    private @Autowired IUsuarioService usuarioService;


    public void initialize(IdUsuario anotacion)
    {
        this.existe = anotacion.existe();
        this.min = anotacion.esPos();
        this.max = anotacion.max();
    }
    
    
	@Override
	public boolean isValid(Integer idUsuario, ConstraintValidatorContext context) {
		

		if (idUsuario == null)
        {
            ValidatorUtil.addCustomMessageWithTemplate("{NotNull.Empresa.idEmpresa}", context);
            return false;
        }
        
        if (idUsuario >= max && idUsuario <= min)
        {
            ValidatorUtil.addCustomMessageWithTemplate("{Range.Empresa.idEmpresa}", context);
            return false;
        }
        boolean existeUsuario = usuarioService.existeUsuario(idUsuario);
        return existe ? existeUsuario : !existeUsuario;
	}
    
    
    
	
}
