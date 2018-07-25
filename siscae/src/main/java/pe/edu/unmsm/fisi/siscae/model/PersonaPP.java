package pe.edu.unmsm.fisi.siscae.model;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class PersonaPP {
	private Integer idPersona;
	private String descripcionTipoDocumento;
	private String numeroDocumento;
	private String nombres;
	private String apellidoPaterno;
	private String apellidoMaterno;
	private String alias;
	private String direccion;
	private String telefonoFijo;
	private String telefonoMovil;
	private String fechaRegistro;
	private String fechaNacimiento;
	private String codPulsera;
	private Integer codigoUBA;
	private String correoElectronico;
	
	//Atributos del SIMP_PRE
	private String apePaterno;
	private String apeMaterno;
	private Integer tipoDocumento;
	private String numDocumento;
	private String telFijo;
	private String telMovil;
	private String codCliente;
	private String nomCliente;
	private String nacionalidad;
	private Integer estadoBD;
	private Date fechaNacimientoo;
	
}
