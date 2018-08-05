package pe.edu.unmsm.fisi.siscae.validacion.validator;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.beans.factory.annotation.Autowired;

import pe.edu.unmsm.fisi.siscae.service.IRecursoService;
import pe.edu.unmsm.fisi.siscae.utilitario.ValidatorUtil;
import pe.edu.unmsm.fisi.siscae.validacion.IdRecurso;

public class IdRecursoValidator implements ConstraintValidator<IdRecurso, Integer> {

	private boolean existe;
	private int min;
	private int max;

	private @Autowired IRecursoService recursoService;

	@Override
	public void initialize(IdRecurso anotacion) {
		this.existe = anotacion.existe();
		this.min = anotacion.min();
		this.max = anotacion.max();
	}

	@Override
	public boolean isValid(Integer idRecurso, ConstraintValidatorContext context) {
		if (idRecurso == null) {
			ValidatorUtil.addCustomMessageWithTemplate("{NotNull.Recurso.idRecurso}", context);
			return false;
		}
		if (idRecurso < min || idRecurso > max) {
			ValidatorUtil.addCustomMessageWithTemplate("{Range.Recurso.idRecurso}", context);
			return false;
		}
		boolean existeRecurso = recursoService.existeRecurso(idRecurso);
		return existe ? existeRecurso : !existeRecurso;
	}

}
