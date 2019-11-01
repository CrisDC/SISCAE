package pe.edu.unmsm.fisi.siscae.utilitario;

public class ExcepcionUtil
{
    public static String traducirMensajeDesdeMensajeErrorLdap(String mensajeErrorLdap,
            String idUsuario) 
    {
        String mensajeError = ConstantesExcepciones.ERROR_DESCONOCIDO;
        if (mensajeErrorLdap.contains(ConstantesExcepciones.CODIGO_AD_CONTRASENIA_INCORRECTA))
        {
            mensajeError = ConstantesExcepciones.CONTRASENIA_INCORRECTA;
        } else if (mensajeErrorLdap.contains(ConstantesExcepciones.CODIGO_AD_CONTRASENIA_EXPIRADA))
        {
            mensajeError = ConstantesExcepciones.CONTRASENIA_EXPIRADA;
        } else if (mensajeErrorLdap.contains(ConstantesExcepciones.CODIGO_AD_USUARIO_NO_ACTIVO))
        {
            mensajeError = String.format(ConstantesExcepciones.USUARIO_NO_ACTIVO, idUsuario);
        } else if (mensajeErrorLdap.contains(ConstantesExcepciones.CODIGO_AD_USUARIO_EXPIRADO))
        {
            mensajeError = String.format(ConstantesExcepciones.USUARIO_EXPIRADO, idUsuario);
        } else if (mensajeErrorLdap
                .contains(ConstantesExcepciones.CODIGO_AD_CONTRASENIA_DEBE_CAMBIAR))
        {
            mensajeError = ConstantesExcepciones.CONTRASENIA_DEBE_CAMBIAR;
        }
        return StringsUtils.concatenarCadena(ConstantesGenerales.ACTIVE_DIRECTORY, mensajeError);
    }
}