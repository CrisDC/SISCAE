package pe.edu.unmsm.fisi.siscae.model.seguridad;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PoliticaSeguridad
{
    private Integer numeroMaximoIntentos;
    private Integer complejidadContrasenia;
    private Integer cantidadDiasParaCaducidadContrasenia;
    private Integer longitudMinimaContrasenia;
    private Integer autenticacionActiveDirectory;
}