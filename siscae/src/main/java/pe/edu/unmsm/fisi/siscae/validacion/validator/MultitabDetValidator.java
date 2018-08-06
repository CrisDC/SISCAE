package pe.edu.unmsm.fisi.siscae.validacion.validator;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.beans.factory.annotation.Autowired;

import pe.edu.unmsm.fisi.siscae.service.IMultiTabDetService;
import pe.edu.unmsm.fisi.siscae.utilitario.ValidatorUtil;
import pe.edu.unmsm.fisi.siscae.validacion.MultitabDet;

public class MultitabDetValidator implements ConstraintValidator<MultitabDet, Integer> {
	private int min;
	private int max;
	private boolean existe;

	private @Autowired IMultiTabDetService multiTabDetService;

	@Override
	public void initialize(MultitabDet anotacion) {
		this.min = anotacion.min();
		this.max = anotacion.max();
		this.existe = anotacion.existe();
	}

	@Override
	public boolean isValid(Integer idItem, ConstraintValidatorContext context) {
		if (idItem == null) {
			ValidatorUtil.addCustomMessageWithTemplate("{NotNull.MultitabDet.idItem}", context);
			return false;
		}
		if (idItem < min || idItem > max) {
			ValidatorUtil.addCustomMessageWithTemplate("{Length.MultitabDet.idItem}", context);
			return false;
		}
		boolean existeMultiTabDet = !multiTabDetService.buscarPorIdItem(idItem).isEmpty();
		return existe ? existeMultiTabDet : !existeMultiTabDet;
	}

}