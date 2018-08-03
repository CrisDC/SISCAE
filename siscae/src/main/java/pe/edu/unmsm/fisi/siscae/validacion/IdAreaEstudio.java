package pe.edu.unmsm.fisi.siscae.validacion;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Repeatable;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import javax.validation.Constraint;

import pe.edu.unmsm.fisi.siscae.validacion.validator.IdAreaEstudioValidator;

@Documented
@Constraint(validatedBy = IdAreaEstudioValidator.class)
@Target({ ElementType.ANNOTATION_TYPE, ElementType.PARAMETER, ElementType.TYPE })
@Retention(RetentionPolicy.RUNTIME)
@Repeatable(IdAreaEstudio.List.class)
public @interface IdAreaEstudio {

	boolean existe() default true;
	
	int esPos() default 1;
	
	int max() default Integer.MAX_VALUE;
	
	@Documented
    @Target({ ElementType.ANNOTATION_TYPE, ElementType.PARAMETER, ElementType.TYPE })
    @Retention(RetentionPolicy.RUNTIME)
	@interface List
    {
        IdAreaEstudio[] value();
    }
}
