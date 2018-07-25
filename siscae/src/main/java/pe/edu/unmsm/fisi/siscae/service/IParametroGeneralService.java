package pe.edu.unmsm.fisi.siscae.service;

import java.util.Date;
import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.mantenimiento.ParametroGeneral;

public interface IParametroGeneralService extends IMantenibleService<ParametroGeneral>
{
    public int buscarCodigoInstitucion();

    public Date buscarFechaProceso();

    public String buscarIdEmpresa();
    
    public String buscarRutaContextoSimpBus();
    
    public List<ParametroGeneral> buscarTodos();
    
    public void registrarParametroGeneral(ParametroGeneral parametroGeneral);
    
    public void actualizarParametroGeneral(ParametroGeneral parametroGeneral);
}