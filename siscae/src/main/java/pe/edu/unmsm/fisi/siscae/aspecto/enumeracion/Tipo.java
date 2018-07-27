package pe.edu.unmsm.fisi.siscae.aspecto.enumeracion;

public enum Tipo
{
    /*Mantenimiento*/
	Horario("Horario"),
	AreaAdministrativo("AreaAdministrativo"),
	AreaEstudio("AreaEstudio"),
    Emp("Empresa"),
    Inst("Institución"),
    Clte("Cliente"),
    Bin("BIN"),
    SubBin("SUBBIN"),
    SubBinClte("asociación SUBBIN-CLIENTE"),
    Memb("Membresía"),
    ClsServ("Clase de Servicio"),
    Origen("Origen"),
    ClsTxn("Clase de Transacción"),
    CodTxn("Código de Transacción"),
    Canal("Canal"),
    MetIdThb("Método Id THB"),
    ModoEntPos("Modo de Entrada POS"),
    RptaConcilUba("Respuesta de Conciliación UBA"),
    TiTermPos("Tipo de Terminal POS"),
    IndCoTel("Ind. Correo Teléfono"),
    MotReclamo("Motivo de Reclamo"),
    ProcSw("Código de Proceso Switch"),
    RptaSw("Código de Respuesta Switch"),
    CodRptaVisa("Código de Respuesta VISA"),
    CanalEmi("Canal Emisor"),
    ProcBtec("Código de Proceso Bevertec"),
    TransBtec("Código de Transacción Bevertec"),
    MulTabCab("Tabla de Tablas"),
    MulTabDet("Detalle de Tabla de Tablas"),
    ParamGral("Parámetros Generales"),
    ContabEmi("Cuenta Contable Emisor"),
    ContabRec("Cuenta Contable Receptor"),
    AREA_ADMINISTRATIVA("Área administrativa"),
    AREA_ESTUDIO("Área estudio"),
    HORARIO("Horario"),
    UBICACION("Ubicación"),
    RECURSO("Recurso"),
    TIPO_RECURSO("Tipo recurso"),
    ADMINISTRATIVO("Administrativo"),
    PERSONA("Persona"),
    DOCENTE("Docente"),
    EXTERNO("Externo"),
    ALUMNO("Alumno"),
    FACULTAD("Facultad"),
    ESCUELA("Escuela"),
    MATERIAL("Material"),
    MULTI_TAB_CAB("Tabla de tablas"),
    MULTI_TAB_DET("Detalle de tabla de tablas"),
    INFRACCION("Infraccion"),
    PRESTAMO("Prestamo"),
    PRESTAMO_DETALLE("Detalle de prestamo"),
    
    /*Tarifario*/
    TipoTar("Tipo de Tarifa"),
    Escen("Escenarios"),
    TarEmi("Tarifario Emisor"),
    TarAdq("Tarifario Adquirente"),
    TarSur("Tarifario Surcharge"),
    
    /*Reporte*/
    RptAutAtm("Reporte de Autorización de ATM"),
    RptAutCanal("Reporte de Autorización de Canal"),
    RptAutCodRpta("Reporte de Autorización de Código Respuesta"),
    RptAutIdProc("Reporte de Autorización de Id Proceso"),
    RptContMov("Reporte de Contabilización de Movimiento"),
    RptContComis("Reporte de Contabilización de Comisiones"),
    RptMovAut("Reporte de Movimiento de Autorización"),
    RptMovSwDmpLog("Reporte de Movimiento de SwDmpLog"),
    RptMovTransAg("Reporte de Movimiento de Transacción aprobada por agencia"),
    RptMovLgCntEmi("Reporte de Movimiento de Log Contable Emisor"),
    RptMovLgCntRec("Reporte de Movimiento de Log Contable Receptor"),
    RptCompEmiCanal("Reporte de Compensación de Canal Emisor"),
    RptCompEmiInst("Reporte de Compensación de Institución Emisor"),
    RptCompRec("Reporte de Compensación de Institución Receptor"),
    RptComisCuadre("Reporte Control Cuadre Banco Administrador"),
    RptConcilObs("Reporte de Conciliaciones Observadas"),
    RptTarResEmi("Reporte Tarifario Resumen de Emisor"),
    RptTarDetEmi("Reporte Tarifario Detalle de Emisor"),
    RptTarResAdq("Reporte Tarifario Resumen de Adquirente"),
    RptTarDetAdq("Reporte Tarifario Detalle de Adquirente"),
    RptTarResSur("Reporte Tarifario Resumen de Surcharge"),
    RptTarDetSur("Reporte Tarifario Detalle de Surcharge"),
    
    /*Consultas*/
    ConAdminAtm("ATMs"),
    ConAdminCta("Cuentas"),
    ConAdminCliente("Clientes"),
    ConAdminAg("Agencias"),
    ConAdminTarjeta("Tarjetas"),
    ConMovAut("Movimiento de Autorizaciones"),
    ConMovNoConcil("Movimiento de Autorizaciones No Conciliadas"),
    ConMovSwDmpLog("Movimiento de SwDmpLog"),
    ConMovLgCnt("Movimiento de Log Contable"),
    ConMovLib("Movimiento de Liberadas"),
    ConMovPend("Movimiento de Pendientes"),
    ConMovConsol("Movimiento de Consolidadas"),
    ConMovObs("Movimiento de Observadas"),
    ConMovAjus("Movimiento Ajuste"),
    ConCambVisa("Tipo de Cambio Visa"),
    ConCambSbs("Tipo de Cambio SBS"),
    ConAdminTarjetaPP("Tarjetas Prepago"),
    ConAdminCuentaPP("Cuentas Prepago"),
    ConAdminLotePP("Lotes Prepago"), 
    ConAdminRecargaPP("Recargas Prepago"), 
    ConAdminPersonaPP("Personas Prepago"),
    
    /*Ajuste*/
    Trace("Trace"),
    
    /*Proceso Automático*/
    Prog("Programa"),
    ProcAuto("Proceso Automático"),
    SubMod("SubMódulo"),
    EjecMan("Ejecución Manual"),
    CtrlProc("Control de Ejecución de Procesos"),
    ServWeb("Servicios Web"),
    Compensacion("Compensación"),
    Conciliacion("Conciliación"),
    Contabilizacion("Contabilización"),
    
    /*Login*/
    Login("Login"),
    Logout("Logout"),
    
    /*Seguridad*/
    Perfil("Perfil"),
    Recurso(""),
    Usuario("Usuario"),
    
    
    Ninguno(""), 
    
    SolicitudTramite("Solicitud de Trámite")
    ;

    private final String nombre;

    private Tipo(String nombre)
    {
        this.nombre = nombre;
    }
 
    public String toString()
    {
        return this.nombre;
    }
}