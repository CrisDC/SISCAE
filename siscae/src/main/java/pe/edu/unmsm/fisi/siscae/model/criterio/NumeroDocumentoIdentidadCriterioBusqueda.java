package pe.edu.unmsm.fisi.siscae.model.criterio;

import javax.validation.constraints.Pattern;

import org.hibernate.validator.constraints.Length;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NumeroDocumentoIdentidadCriterioBusqueda
{
   // @Pattern(regexp = Regex.SOLO_DIGITOS, message = "{Pattern.CriterioBusquedaTipoDocumento.tipoDocumento}")
   // @MultitabDet(idTabla = MultiTablaUtil.TABLA_TIPO_DOCUMENTO, existe = true, campoIdItem = "tipoDocumento", message = "{NoExiste.CriterioBusquedaTipoDocumento.tipoDocumento}")
    private String idTipoDocumento;

    @Length(min = 1, max = 20, message = "{Length.CriterioBusquedaTipoDocumento.numeroDocumento}")
    private String numeroDocumento;
    
}
