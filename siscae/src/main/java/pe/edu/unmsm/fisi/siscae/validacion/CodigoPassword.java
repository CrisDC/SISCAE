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

import pe.edu.unmsm.fisi.siscae.validacion.validator.CodigoPasswordValidator;

@Documented
@Constraint(validatedBy = CodigoPasswordValidator.class)
@Target({ ElementType.ANNOTATION_TYPE, ElementType.FIELD, ElementType.PARAMETER,
        ElementType.TYPE_USE })
@Retention(RetentionPolicy.RUNTIME)
@Repeatable(CodigoPassword.List.class)
public @interface CodigoPassword
{

    String campoPassword() default "password";

    String campoNuevoPassword() default "nuevoPassword";

    String campoNuevoPassword2() default "nuevoPassword2";

    String campoIdUsuario() default "idUsuario";

    String campoRequiereCambio() default "requiereCambio";

    String message() default "{NoExiste.CodigoPassword.extra}";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

    ConstraintTarget validationAppliesTo() default ConstraintTarget.IMPLICIT;

    @Documented
    @Target({ ElementType.ANNOTATION_TYPE, ElementType.FIELD, ElementType.PARAMETER,
            ElementType.TYPE_USE })
    @Retention(RetentionPolicy.RUNTIME)
    @interface List
    {
        CodigoPassword[] value();
    }
}
