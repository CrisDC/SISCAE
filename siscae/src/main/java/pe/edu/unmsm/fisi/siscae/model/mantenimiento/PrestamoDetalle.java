package pe.edu.unmsm.fisi.siscae.model.mantenimiento;

import java.time.LocalTime;
import java.util.Date;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.PastOrPresent;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pe.edu.unmsm.fisi.siscae.utilitario.Regex;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PrestamoDetalle {
	

	private Integer idPrestamo;
	private Integer idMaterial;
	
	@NotNull(message = "{NotNull.PrestamoDetalle.hora_entrega}")
	private LocalTime horaEntrega;
	
	@NotNull(message = "{NotNull.PrestamoDetalle.hora_devolucion}")
	private LocalTime horaDevolucion;
	
	
}
