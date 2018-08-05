package pe.edu.unmsm.fisi.siscae.validacion;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Repeatable;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import javax.validation.Constraint;
import javax.validation.Payload;

import pe.edu.unmsm.fisi.siscae.validacion.validator.IdAreaAdministrativoValidator;
@Documented
@Constraint(validatedBy = IdAreaAdministrativoValidator.class)
@Target({ ElementType.ANNOTATION_TYPE, ElementType.FIELD, ElementType.PARAMETER,
    ElementType.TYPE_USE })
@Retention(RetentionPolicy.RUNTIME)
@Repeatable(IdAreaAdministrativo.List.class)
public @interface IdAreaAdministrativo {

	String message() default "{NoExiste.AreaAdministrativo.IdAreaAdministrativo}";
	boolean existe();
	int esPos() default Integer.MIN_VALUE;

    int max() default Integer.MAX_VALUE/2;
    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
    
    @Documented
    @Target({ ElementType.ANNOTATION_TYPE, ElementType.FIELD, ElementType.PARAMETER,
            ElementType.TYPE_USE })
    @Retention(RetentionPolicy.RUNTIME)
    @interface List
    {
    	IdAreaAdministrativo[] value();
    }
}
