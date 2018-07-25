package pe.edu.unmsm.fisi.siscae.model.mantenimiento;

import java.util.Date;

import javax.validation.constraints.Digits;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;
import org.hibernate.validator.constraints.Range;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pe.edu.unmsm.fisi.siscae.validacion.CodigoInstitucion;
import pe.edu.unmsm.fisi.siscae.validacion.IdEmpresa;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ParametroGeneral
{
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "EST")
    @NotNull(message = "{NotNull.ParametroGeneral.fechaProceso}")
    private Date fechaProceso;
    
    @NotNull(message = "{NotNull.ParametroGeneral.plantillas}")
    @NotBlank(message = "{NotBlank.ParametroGeneral.plantillas}")
    @Length(min = 3, max = 200, message = "{Length.ParametroGeneral.plantillas}")
    private String plantillas;

    @NotNull(message = "{NotNull.ParametroGeneral.config}")
    @NotBlank(message = "{NotBlank.ParametroGeneral.config}")
    @Length(min = 3, max = 200, message = "{Length.ParametroGeneral.config}")
    private String config;

  

    @CodigoInstitucion(existe = true)
    private Integer codigoInstitucion;
    private String repositorioPrepago;
    
    @NotNull(message = "{NotNull.ParametroGeneral.repositorioCompensacion}")
    @NotBlank(message = "{NotBlank.ParametroGeneral.repositorioCompensacion}")
    @Length(min = 3, max = 200, message = "{Length.ParametroGeneral.repositorioCompensacion}")
    private String repositorioCompensacion;
    
    @Digits(integer = 6, fraction = 2, message = "{Digits.ParametroGeneral.surchargeSoles}")
    private double surchargeSoles;
    
    @Digits(integer = 6, fraction = 2, message = "{Digits.ParametroGeneral.surchargeDolares}")
    private double surchargeDolares;

    @IdEmpresa(existe = true)
    private String idEmpresa;
    
    @NotNull(message = "{NotNull.ParametroGeneral.porcentajeIgv}")
    @Range(min = 0, max = 100, message = "{Range.ParametroGeneral.porcentajeIgv}")
    private Integer porcentajeIgv;

    @NotNull(message = "{NotNull.ParametroGeneral.enmascararTarjeta}")
    @Range(min = 0, max = 1, message = "{Range.ParametroGeneral.enmascararTarjeta}")
    private Integer enmascararTarjeta;
    
    @NotNull(message = "{NotNull.ParametroGeneral.rutaContextoSimpBus}")
    @NotBlank(message = "{NotBlank.ParametroGeneral.rutaContextoSimpBus}")
    @Length(min = 3, max = 70, message = "{Length.ParametroGeneral.rutaContextoSimpBus}")
    private String rutaContextoSimpBus;// http://localhost:8080/SimpBus/
    
    private String descripcionInstitucion;
    private String descripcionEmpresa;
    
    private String binRuteoSwitch;
}