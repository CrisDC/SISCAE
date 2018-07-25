package pe.edu.unmsm.fisi.siscae.validacion;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Repeatable;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import javax.validation.Constraint;
import javax.validation.ConstraintTarget;
import javax.validation.Payload;

import pe.edu.unmsm.fisi.siscae.validacion.validator.ComplejidadPasswordValidator;

@Documented
@Constraint(validatedBy = ComplejidadPasswordValidator.class)
@Target({ ElementType.ANNOTATION_TYPE, ElementType.FIELD, ElementType.PARAMETER,
        ElementType.TYPE_USE })
@Retention(RetentionPolicy.RUNTIME)
@Repeatable(ComplejidadPassword.List.class)
public @interface ComplejidadPassword
{
    String message() default "{Sin.message}";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

    String password() default "password";
    
    String password2() default "password2";

    String requiereCambio() default "requiereCambio";

    ConstraintTarget validationAppliesTo() default ConstraintTarget.IMPLICIT;

    @Documented
    @Target({ ElementType.ANNOTATION_TYPE, ElementType.FIELD, ElementType.PARAMETER,
            ElementType.TYPE_USE })
    @Retention(RetentionPolicy.RUNTIME)
    @interface List
    {
        ComplejidadPassword[] value();
    }
}
