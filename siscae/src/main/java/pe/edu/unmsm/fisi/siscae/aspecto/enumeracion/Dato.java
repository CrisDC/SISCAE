package pe.edu.unmsm.fisi.siscae.aspecto.enumeracion;

import java.util.Date;

public enum Dato
{
    /*Mantenimientos*/
	Alumno("Alumno = #alumno.idAlumno, Codigo = #alumno.codigo,Estado_Alumno=#alumno.estadoAlumno"),
	Facultad("Facultad  = #facultad.idFacultad, Nombre = #facultad.nombre,Fecha_Registro=#facultad.fechaRegistro,Usuario_Registro=#facultad.usuarioRegistro"),
	Escuela("Escuela = #escuela.idEscuela, Nombre = #escuela.nombre"),
	Horario("Horario=#horario.idHorario, Hora_Inicio=#horario.horaInicio, Hora_Fin=#horario.horaFin, Estado=#horario.estado, Tiempo_Max=#horario.tiempoMax, Id_Turno=#horario.idTurno, Id_Dia=#horario.idDia, Id_Tipo_Horario=#horario.idTipoHorario, Id_Area_Estudio=#horario.idAreaEstudio, Fecha_Registro=#horario.fechaRegistro,Usuario_Registro=#horario.usuarioRegistro,Fecha_Modificacion=#horario.fechaModificacion,Usuario_Modificacion=#horario.usuarioModificacion"),
	AreaEstudio("Area_Estudio=#areaEstudio.idAreaEstudio, Nombre=#areaEstudio.nombre,Pabellon=#areaEstudio.pabellon, Nivel=#areaEstudio.nivel, Fecha_Registro=#areaEstudio.fechaRegistro, Usuario_Registro=#areaEstudio.usuarioRegistro,Fecha_Modificacion=#areaEstudio.fechaModificacion, Usuario_Modificacion=#areaEstudio.usuarioModificacion"),
    AreaAdministrativo("Area_Estudio=#areaAdministrativo.idAreaEstudio, Area_Administrativo=#areaAdministrativo.idAdministrativo, Fecha_Inicio=#areaAdministrativo.fechaInicio, Fecha_Fin=#areaAdministrativo.fechaFin, Cargo=#areaAdministrativo.cargo, Fecha_Registro=#areaAdministrativo.fechaRegistro,Usuario_Registro=#areaAdministrativo.usuarioRegistro,Fecha_Modificacion=#areaAdministrativo.fechaModificacion, Usuario_Modificacion=#areaAdministrativo.usuarioModificacion"),
	Bin("BIN = #bin.codigoBIN, Descripción = #bin.descripcion"),
    Empresa("Empresa = #empresa.idEmpresa, Descripción = #empresa.descripcion"),
    TipoRecurso("TipoRecurso= #tipoRecurso.idTipoRecurso, Nombre = #tipoRecurso.nombre, Descripcion = #tipoRecurso.descripcion ,Uso = #tipoRecurso.uso ,FechaRegistro = #tipoRecurso.fechaRegistro ,UsuarioRegistro = #tipoRecurso.usuarioRegistro ,FechaModificacion = #tipoRecurso.fechaModificacion ,UsuarioModificacion = #tipoRecurso.usuarioModificacion "),
    Infraccion("Infraccion = #infraccion.idInfraccion, Descripcion= #infraccion.descripcion, Fecha= #infraccion.fecha, Estado  = #infraccion.estado ,IdPersona= #infraccion.idPersona,  IdTipoInfraccion= #infraccion.tipoInfraccion,FechaRegistro= #infraccion.fechaRegistro,  UsuarioRegistro= #infraccion.usuarioRegistro,  FechaModificacion= #infraccion.fechaModificacion,  UsuarioModificacion= #infraccion.usuarioModificacion"),
    Externo("Externo = #externo.idExterno ,EstadoExterno = #externo.estadoExterno,FechaRegistro = #externo.fechaRegistro,UsuarioRegistro = #externo.usuarioRegistro,FechaModificacion = #externo.fechaModificacion,UsuarioModificacion = #externo.usuarioModificacion"),
    Institucion("Institución = #institucion.codigoInstitucion, Descripción = #institucion.descripcion"),
    Cliente("Cliente = #cliente.idCliente, Empresa = #cliente.idEmpresa, Descripción = #cliente.descripcion"),
    SubBin("SubBIN = #subBin.codigoSubBIN, BIN = #subBin.codigoBIN, Descripción = #subBin.descripcion"),
    SubBinCliente("SubBIN = #subBin.codigoSubBIN, BIN = #subBin.codigoBIN, Cliente = #subBin.idCliente"),
    Membresia("Membresía = #membresia.codigoMembresia, Descripción = #membresia.descripcion"),
    ClaseServicio("Clase_de_Servicio = #claseServicio.codigoClaseServicio, Membresía=#claseServicio.codigoMembresia,Descripción = #claseServicio.descripcion"),
    Origen("Origen = #origen.codigoOrigen, Descripción = #origen.descripcion"),
    ClaseTransaccion("Clase_Transacción = #claseTransaccion.codigoClaseTransaccion, Descripción = #claseTransaccion.descripcion"),
    CodigoTransaccion("Clase_Transacción = #codigoTransaccion.codigoClaseTransaccion, Código_de_Transacción = #codigoTransaccion.codigoTransaccion, Descripción = #codigoTransaccion.descripcion"),
    Canal("Canal = #canal.idCanal, Descripción = #canal.descripcion"),
    MetodoIdThb("Método_THB = #metodoIdThb.idMetodo, Descripción = #metodoIdThb.descripcion"),
    ModoEntradaPos("Modo_de_Entrada_POS = #modoEntradaPos.codigoModoEntradaPOS, Descripción = #modoEntradaPos.descripcion"),
    RespuestaConcilUba("Rpta._Conciliacion_UBA = #rptaConcilUba.idRespuestaConcilUba ,Descripción = #rptaConcilUba.descripcion"),
    TipoTerminalPos("Tipo_de_Terminal_POS = #tipoTerminalPos.codigoTipoTerminalPOS, Descripción = #tipoTerminalPos.descripcion"),
    IndCorreoTelefono("Ind_Correo_Telefono = #indCorreoTelefono.codigoIndCorreoTelefono, Descripción = #indCorreoTelefono.descripcion"),
    MotivoReclamo("Motivo_de_Reclamo = #motivoReclamo.idMotivo, Descripción = #motivoRecla.descripcion"),
    CodigoProcSwitch("Código_de_Proceso_Switch = #codigoProcesoSwitch.codigoProcesoSwitch, Descripción = #codigoProcesoSwitch.descripcion"),
    CodigoRespuestaSwitch("Código_de_Respuesta_Switch = #codigoRptaSwitch.codigoRespuestaSwitch, Descripción = #codigoRptaSwitch.descripcion"),
    CodigoRespuestaVisa("Código_de_Respuesta_Visa = #codigoRptaVisa.codigoRespuestaVisa, Descripción = #codigoRptaVisa.descripcion"),
    CanalEmisor("Canal_Emisor = #canalEmisor.codigoCanalEmisor, Descripción = #canalEmisor.descripcion"),
    CodigoProcesoBevertec("Código_de_Proceso_Bevertec = #codigoProcBevertec.codigoCanalEmisor , Tipo_Transacción = #codigoProcBevertec.tipoTransaccion, Descripción = #codigoProcBevertec.descripcion"),
    CodigoTransaccionBevertec("Canal_Emisor = #codigoTxnBevertec.codigoCanalEmisor, Tipo_Transacción = #codigoTxnBevertec.tipoTransaccion, Código_de_Transacción = #codigoTxnBevertec.codTransaccion"),
    MultiTabCab("Id_de_Tabla = #multiTabCab.idTabla, Descripción = #multiTabCab.descripcion"),
    MultiTabDet("Id_Detalle = #multiTabDet.idItem,Id_Tabla = #multiTabDet.idTabla, Descripción = #multiTabDet.descripcionItem"),
    ParametroGeneral("Fecha_Proceso = #parametroGeneral.fechaProceso, Plantillas = #parametroGeneral.plantillas, Config = #parametroGeneral.config, Bin_de_Ruteo = #parametroGeneral.binRuteoSwitch, Institución = #parametroGeneral.codigoInstitucion, Repo_Prepago = #parametroGeneral.repositorioPrepago, Repo_Compensación = #parametroGeneral.repositorioCompensacion, Surcharge_Soles = #parametroGeneral.surchargeSoles, Surcharge_Dolares = #parametroGeneral.surchargeDolares,Empresa = #parametroGeneral.idEmpresa, Ruta_SimpBus = #parametroGeneral.rutaContextoSimpBus, Enmascarar_Tarjeta = #parametroGeneral.enmascararTarjeta, IGV = #parametroGeneral.porcentajeIgv"),
    CuentaContableEmisor("Empresa = #cuentaContableEmisor.idEmpresa, Cliente = #cuentaContableEmisor.idCliente, Moneda = #cuentaContableEmisor.codigoMoneda, Membresía = #cuentaContableEmisor.codigoMembresia, Clase_Servicio = #cuentaContableEmisor.codigoClaseServicio, BIN = #cuentaContableEmisor.codigoBIN, SubBIN = #cuentaContableEmisor.codigoSubBIN, Origen = #cuentaContableEmisor.codigoOrigen, Rol = #cuentaContableEmisor.idRolTransaccion, Clase_Transacción = #cuentaContableEmisor.codigoClaseTransaccion, Código_Transacción = #cuentaContableEmisor.codigoTransaccion"),
    CuentaContableReceptor("ATM = #cuentaContableReceptor.idATM, Moneda = #cuentaContableReceptor.codigoMoneda, Membresía = #cuentaContableReceptor.codigoMembresia, Clase_Servicio = #cuentaContableReceptor.codigoClaseServicio, Origen = #cuentaContableReceptor.codigoOrigen, Clase_Transacción = #cuentaContableReceptor.codigoClaseTransaccion, Código_Transacción = #cuentaContableReceptor.codigoTransaccion"),
    AREA_ADMINISTRATIVA(""),
    AREA_ESTUDIO(""),
    HORARIO(""),
    UBICACION(""),
    RECURSO(""),
    TIPO_RECURSO(""),
    ADMINISTRATIVO(""),
    PERSONA(""),
    DOCENTE(""),
    EXTERNO(""),
    ALUMNO(""),
    FACULTAD(""),
    ESCUELA(""),
    MATERIAL(""),
    MULTI_TAB_CAB(""),
    MULTI_TAB_DET(""),
    ESTADO_TABLA(""),
    
    /*Movimientos*/
    INFRACCION(""),
    PRESTAMO(""),
    PRESTAMO_DETALLE(""),
    
    /*Tarifarios*/
    TipoTarifa("Tipo_de_Tarifa = #tipoTarifa.tipoTarifa, Descripción = #tipoTarifa.descripcion"),
    Escenarios("Membresía = #escenario.codigoMembresia, Clase_Servicio = #escenario.codigoClaseServicio, Clase_Transacción = #escenario.codigoClaseTransaccion, Código_Transacción = #escenario.codigoTransaccion, Origen = #escenario.codigoOrigen, Tipo_Tarifa = #escenario.codigoTipoTarifa"),
    TarifarioSur("Nivel = #surcharge.nivel, Rango_Inicial = #surcharge.rangoInicial, Rango_Final = #surcharge.rangoFinal, Moneda = #surcharge.codigoMoneda"),
    TarifarioAdq("Tipo_Tarifa = #tarifarioAdq.codigoTipoTarifa, Nivel = #tarifarioAdq.nivel"),
    TarifarioEmisor("Tipo_Tarifa = #tarifarioEmisor.codigoTipoTarifa, Nivel = #tarifarioEmisor.nivel, Grupo_BIN = #tarifarioEmisor.codigoGrupoBin"),
    
    /*Ajustes*/
    Trace("Trace = #trace.trace, Secuencia = #trace.secuencia"),
   
    
    SolicitudTramite("Solicitud_Tramite = #solicitudTramite.idSolicitudTramite, "
                   + "Asunto = #solicitudTramite.asunto, "
                   + "Estado = #solicitudTramite.estado, "
                   + "Tipo Trámite = #solicitudTramite.tipoTramite, "
                   + "Descripción = #descripcion"),
    
    /*Ejecucion Proceso Manual*/
    LogControlProgramaResumen("Grupo = #logControlProgramaResumen.codigoGrupo, Programa = #logControlProgramaResumen.codigoPrograma, SubModulo = #logControlProgramaResumen.codigoSubModulo"),
    ProcesoAutomatico("Grupo = #procesoAutomatico.codigoGrupo, Descripción = #procesoAutomatico.descripcion"),
    Programa("Programa = #programa.codigoPrograma, Grupo = #programa.codigoGrupo, SubModulo = #programa.codigoSubModulo, Descripción = #programa.descripcion"),
    SubModulo("SubModulo = #subModulo.codigoSubModulo, Descripción = #subModulo.descripcion"),
    
    /*Seguridad*/
    Perfil("Perfil = #perfil.idPerfil, Descripción = #perfil.descripcion"),
    Recurso("Recurso = #recurso.idRecurso, Descripción = #recurso.descripcion"),
//    Usuario("Usuario = #usuario.idRecurso, Descripción = #usuario.descripcion"),
    
    Ninguno("");
    private final String nombre;

    private Dato(String nombre)
    {
        this.nombre = nombre;
    }

    public String toString()
    {
        return this.nombre;
    } 
}
