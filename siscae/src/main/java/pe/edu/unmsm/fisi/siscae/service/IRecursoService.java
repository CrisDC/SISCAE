package pe.edu.unmsm.fisi.siscae.service;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.Recurso;

public interface IRecursoService
{
    public List<Recurso> obtenerRecursosPermitidosPorIdUsuario(String idUsuario);
}