package pe.edu.unmsm.fisi.siscae.validacion;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Repeatable;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import javax.validation.Constraint;
import javax.validation.Payload;

import pe.edu.unmsm.fisi.siscae.validacion.validator.CodigoPerfiValidator;

@Documented
@Constraint(validatedBy = CodigoPerfiValidator.class)
@Target({ ElementType.ANNOTATION_TYPE, ElementType.PARAMETER, ElementType.TYPE_USE,
        ElementType.METHOD })
@Retention(RetentionPolicy.RUNTIME)
@Repeatable(CodigoPerfil.List.class)
public @interface CodigoPerfil
{

    String campoCodigoPerfil() default "id_perfil";

    boolean existe();

    Class<?>[] groups() default {};

    String message() default "{NoExiste.Perfil.id_perfil}";

    Class<? extends Payload>[] payload() default {};

    @Documented
    @Target({ ElementType.ANNOTATION_TYPE, ElementType.PARAMETER, ElementType.TYPE_USE,
            ElementType.METHOD })
    @Retention(RetentionPolicy.RUNTIME)
    @interface List
    {
        CodigoPerfil[] value();
    }
}
