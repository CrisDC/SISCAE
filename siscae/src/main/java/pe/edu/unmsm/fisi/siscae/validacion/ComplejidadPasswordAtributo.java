package pe.edu.unmsm.fisi.siscae.validacion;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Repeatable;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import javax.validation.Constraint;
import javax.validation.Payload;

import pe.edu.unmsm.fisi.siscae.validacion.validator.ComplejidadPasswordAtributoValidator;

@Documented
@Constraint(validatedBy = ComplejidadPasswordAtributoValidator.class)
@Target({ ElementType.ANNOTATION_TYPE, ElementType.FIELD, ElementType.PARAMETER,
        ElementType.TYPE_USE, ElementType.METHOD })
@Retention(RetentionPolicy.RUNTIME)
@Repeatable(ComplejidadPasswordAtributo.List.class)
public @interface ComplejidadPasswordAtributo
{

    String message() default "{NoExisteInstitucion.Contrasenia.codigo_institucion}";


    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

    @Documented
    @Target({ ElementType.ANNOTATION_TYPE, ElementType.FIELD, ElementType.PARAMETER,
            ElementType.TYPE_USE, ElementType.METHOD })
    @Retention(RetentionPolicy.RUNTIME)
    @interface List
    {
        ComplejidadPasswordAtributo[] value();
    }

}
