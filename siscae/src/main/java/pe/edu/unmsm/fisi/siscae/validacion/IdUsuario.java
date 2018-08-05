package pe.edu.unmsm.fisi.siscae.validacion;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Repeatable;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import javax.validation.Constraint;
import javax.validation.Payload;

import pe.edu.unmsm.fisi.siscae.validacion.validator.IdUsuarioValidator;


@Documented
@Constraint(validatedBy = IdUsuarioValidator.class)
@Target({ ElementType.ANNOTATION_TYPE, ElementType.FIELD, ElementType.PARAMETER,
    ElementType.TYPE_USE })
@Retention(RetentionPolicy.RUNTIME)
@Repeatable(IdUsuario.List.class)
public @interface IdUsuario {

	
	String message() default "{NoExiste.Usuario.idUsuario}";
	
	
	
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
		IdUsuario[] value();
    }
}
