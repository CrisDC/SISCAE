package pe.edu.unmsm.fisi.siscae.validacion.validator;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.beans.factory.annotation.Autowired;

import pe.edu.unmsm.fisi.siscae.service.IPersonaService;
import pe.edu.unmsm.fisi.siscae.utilitario.ValidatorUtil;
import pe.edu.unmsm.fisi.siscae.validacion.IdPersona;

public class IdPersonaValidator implements ConstraintValidator<IdPersona, Integer> {

	private boolean existe;
	private int min;
	private int max;

	private @Autowired IPersonaService personaService;

	@Override
	public void initialize(IdPersona anotacion) {
		this.existe = anotacion.existe();
		this.min = anotacion.min();
		this.max = anotacion.max();
	}

	@Override
	public boolean isValid(Integer idPersona, ConstraintValidatorContext context) {
		if (idPersona == null) {
			ValidatorUtil.addCustomMessageWithTemplate("{NotNull.Persona.idPersona}", context);
			return false;
		}
		if (idPersona < min || idPersona > max) {
			ValidatorUtil.addCustomMessageWithTemplate("{Range.Persona.idPersona}", context);
			return false;
		}
		boolean existePersona = personaService.existePersona(idPersona);
		return existe ? existePersona : !existePersona;
	}

}
