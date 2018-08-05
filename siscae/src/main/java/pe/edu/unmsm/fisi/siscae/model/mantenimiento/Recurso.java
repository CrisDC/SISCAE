package pe.edu.unmsm.fisi.siscae.model.mantenimiento;

import java.util.Date;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pe.edu.unmsm.fisi.siscae.utilitario.Regex;
import pe.edu.unmsm.fisi.siscae.validacion.IdRecurso;
import pe.edu.unmsm.fisi.siscae.validacion.grupo.IBasico;
import pe.edu.unmsm.fisi.siscae.validacion.grupo.accion.IActualizacion;
import pe.edu.unmsm.fisi.siscae.validacion.grupo.accion.IRegistro;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Recurso {

	@IdRecurso(existe = true, groups = IActualizacion.class)
	@IdRecurso(existe = false, message = "{Existe.Recurso.idRecurso}", groups = IRegistro.class)
	private Integer idRecurso;

	@NotNull(message = "{NotNull.Recurso.numeroSerie}")
	@NotBlank(message = "{NotBlank.Recurso.numeroSerie}")
	@Length(min = 2, max = 20, message = "{Length.Recurso.numeroSerie}", groups = IBasico.class)
	@Pattern(regexp = Regex.ALFANUMERICO, message = "{Pattern.Recurso.numeroSerie}")
	private String numeroSerie;

	@NotNull(message = "{NotNull.Recurso.descripcion}")
	@NotBlank(message = "{NotBlank.Recurso.descripcion}")
	@Length(min = 2, max = 20, message = "{Length.Recurso.numeroSerie}", groups = IBasico.class)
	@Pattern(regexp = Regex.ALFANUMERICO, message = "{Pattern.Recurso.descripcion}")
	private String descripcion;

	@NotNull(message = "{NotNull.Recurso.maxCapacidad}")
	@Pattern(regexp = Regex.SOLO_DIGITOS, message = "{Pattern.Recurso.maxCapacidad}")
	private Integer maxCapacidad;

	@NotNull(message = "{NotNull.Recurso.estado}")
	private Integer idEstadoTabla;

	@NotNull(message = "{NotNull.Recurso.idTipoRecurso}")
	@Pattern(regexp = Regex.SOLO_DIGITOS, message = "{Pattern.Recurso.idTipoRecurso}")
	private Integer idTipoRecurso;

	@NotNull(message = "{NotNull.Recurso.idAreaEstudio}")
	@Pattern(regexp = Regex.SOLO_DIGITOS, message = "{Pattern.Recurso.idAreaEstudio}")
	private Integer idAreaEstudio;

	@NotNull(message = "{NotNull.Recurso.idUbicacion}")
	@Pattern(regexp = Regex.SOLO_DIGITOS, message = "{Pattern.Recurso.idUbicacion}")
	private Integer idUbicacion;

	@NotNull(message = "{NotNull.Recurso.idRecursoPadre}")
	@Pattern(regexp = Regex.SOLO_DIGITOS, message = "{Pattern.Recurso.idRecursoPadre}")
	private Integer idRecursoPadre;

	private Date fechaRegistro;

	private String usuarioRegistro;

	private Date fechaModificacion;

	private String usuarioModificacion;

}
