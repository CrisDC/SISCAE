package pe.edu.unmsm.fisi.siscae.validacion;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Repeatable;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import javax.validation.Constraint;
import javax.validation.Payload;

import pe.edu.unmsm.fisi.siscae.validacion.validator.IdPrestamoValidator;;

@Documented
@Constraint(validatedBy = IdPrestamoValidator.class)
@Target({ ElementType.ANNOTATION_TYPE, ElementType.FIELD, ElementType.PARAMETER,
    ElementType.TYPE_USE })
@Retention(RetentionPolicy.RUNTIME)
@Repeatable(IdPrestamo.List.class)

public @interface IdPrestamo {

	String message() default "{NoExiste.Prestamo.idPrestamo}";
	
	 boolean existe();

	 int esPos() default 0;

	 int max() default 4;//xd

	 

	    Class<?>[] groups() default {};

	    Class<? extends Payload>[] payload() default {};

	 
	 @Documented
	    @Target({ ElementType.ANNOTATION_TYPE, ElementType.FIELD, ElementType.PARAMETER,
	            ElementType.TYPE_USE })
	    @Retention(RetentionPolicy.RUNTIME)
	    @interface List
	    {
		 IdPrestamo[] value();
	    }
	
	
}
