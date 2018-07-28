package pe.edu.unmsm.fisi.siscae.service;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.mantenimiento.MultiTabDet;

public interface IMultiTabDetService extends IMantenibleService<MultiTabDet>
{
    public List<MultiTabDet> buscarTodos();

    public List<MultiTabDet> buscarPorIdTablaIdItem(int idTabla, int idItem);

    public boolean existeMultiTabDet(int idTabla, int idItem);

    public void registrarMultiTabDet(MultiTabDet multiTabDet);

    public void actualizarMultiTabDet(MultiTabDet multiTabDet);

    public void eliminarMultiTabDet(MultiTabDet multiTabDet);

    public List<MultiTabDet> buscarPorIdTabla(int idTabla);
}