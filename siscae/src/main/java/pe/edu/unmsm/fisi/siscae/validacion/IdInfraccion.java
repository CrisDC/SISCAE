package pe.edu.unmsm.fisi.siscae.validacion;
import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Repeatable;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import javax.validation.Constraint;
import javax.validation.Payload;

import pe.edu.unmsm.fisi.siscae.validacion.validator.IdInfraccionValidator;
import pe.edu.unmsm.fisi.siscae.validacion.validator.IdRolValidator;


@Documented
@Constraint(validatedBy = IdInfraccionValidator.class)
@Target({ ElementType.ANNOTATION_TYPE, ElementType.FIELD, ElementType.PARAMETER,
    ElementType.TYPE_USE })
@Retention(RetentionPolicy.RUNTIME)
@Repeatable(IdInfraccion.List.class)
public @interface IdInfraccion {

	String message() default "{NoExiste.Infraccion.idInfraccion}";
	boolean existe();

	int esPos() default 0;

	int max() default 4;



	   Class<?>[] groups() default {};

	   Class<? extends Payload>[] payload() default {};
	
	@Documented
	@Target({ ElementType.ANNOTATION_TYPE, ElementType.FIELD, ElementType.PARAMETER,
	       ElementType.TYPE_USE })
	@Retention(RetentionPolicy.RUNTIME)
	@interface List
	{
		IdInfraccion[] value();
	}
}
