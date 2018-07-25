package pe.edu.unmsm.fisi.siscae.service;

import pe.edu.unmsm.fisi.siscae.model.CriterioResumenExpediente.CriterioResumenExpediente;

public interface IExpedienteResumenService
{

    public void buscarPorCriterio(CriterioResumenExpediente criterioResumenExpediente);
    public void buscarTodos();
}
