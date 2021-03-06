package pe.edu.unmsm.fisi.siscae.aspecto.enumeracion;

public enum Tipo
{
    /*Mantenimiento*/
    AREA_ADMINISTRATIVO("Área administrativa"),
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
    ESTADO_TABLA("Estado de tablas"),
    SOLICITANTE("Solicitantes"),
    
    ROL("Rol"),
    
    MulTabCab("Tabla de Tablas"),
    MulTabDet("Detalle de Tabla de Tablas"),
    ParamGral("Parámetros Generales"),
    
    /*Login*/
    Login("Login"),
    Logout("Logout"),
    
    /*Seguridad*/
    Perfil("Perfil"),
    Recurso(""),
    USUARIO("Usuario"),
    
    
    /*Movimientos*/
    MOV_PRESTAMO("Moviminetos de prestamos"),
    
    Ninguno(""), 
    
    SolicitudTramite("Solicitud de Trámite"), 
    CON_ADM_ALUMNO("CONSULTA de Alumnos"), 
    CON_MOV_ESTADO_AREA("Prestamo de recurso"),
    CON_MOV_SOLICITANTES("Solicitantes"), 
    CON_MOV_REGISTRAR("Realizar prestamo de recurso"), 
    CON_MOV_INFRACCIONES("Consulta de Infracciones"),
	CON_MOV_ESTADISTICAS("Consulta de Estadisticas"), 
	
	REP_EST_PRESTAMOS ("Reporte Estadistico de Prestamos"),
	HIS ("Historial");
	

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