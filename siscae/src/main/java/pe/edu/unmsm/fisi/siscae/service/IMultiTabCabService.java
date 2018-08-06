package pe.edu.unmsm.fisi.siscae.service;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.mantenimiento.MultiTabCab;

public interface IMultiTabCabService extends IMantenibleService<MultiTabCab>
{

    public List<MultiTabCab> buscarTodos();

    public MultiTabCab buscarPorId(int idTabla);

    public boolean existe(Integer idTabla);

    public void registrarMultiTabCab(MultiTabCab multiTabCab);

    public void actualizarMultiTabCab(MultiTabCab multiTabCab);

    public void eliminarMultiTabCab(MultiTabCab multiTabCab);

}
