package pe.edu.unmsm.fisi.siscae.service;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.mantenimiento.CodigoRespuestaVisa;

public interface ICodigoRptaVisaService extends IMantenibleService<CodigoRespuestaVisa>
{

    public List<CodigoRespuestaVisa> buscarTodos();

    public List<CodigoRespuestaVisa> buscarPorCodigoRptaVisa(String codigoRespuestaVisa);

    public boolean existeCodigoRptaVisa(String codigoRespuestaVisa);

    public void registrarCodigoRptaVisa(CodigoRespuestaVisa codigoRptaVisa);

    public void actualizarCodigoRptaVisa(CodigoRespuestaVisa codigoRptaVisa);

    public void eliminarCodigoRptaVisa(CodigoRespuestaVisa codigoRptaVisa);
}