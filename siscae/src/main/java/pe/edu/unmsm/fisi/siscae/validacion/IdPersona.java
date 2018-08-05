package pe.edu.unmsm.fisi.siscae.validacion;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Repeatable;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import javax.validation.Constraint;
import javax.validation.Payload;

import pe.edu.unmsm.fisi.siscae.validacion.validator.IdPersonaValidator;

@Documented
@Constraint(validatedBy = IdPersonaValidator.class)
@Target({ ElementType.ANNOTATION_TYPE, ElementType.FIELD, ElementType.PARAMETER, ElementType.TYPE_USE })
@Retention(RetentionPolicy.RUNTIME)
@Repeatable(IdPersona.List.class)
public @interface IdPersona {

	String message() default "{NoExiste.Persona.idPersona}";

	boolean existe();

	int min() default 1;

	int max() default Integer.MAX_VALUE;

	Class<?>[] groups() default {};

	Class<? extends Payload>[] payload() default {};

	@Documented
	@Target({ ElementType.ANNOTATION_TYPE, ElementType.FIELD, ElementType.PARAMETER, ElementType.TYPE_USE })
	@Retention(RetentionPolicy.RUNTIME)
	@interface List {
		IdPersona[] value();
	}

}
