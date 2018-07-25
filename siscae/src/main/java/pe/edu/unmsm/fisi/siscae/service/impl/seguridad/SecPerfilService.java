package pe.edu.unmsm.fisi.siscae.service.impl.seguridad;

import java.util.List;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import pe.edu.unmsm.fisi.siscae.mapper.ISecPerfilMapper;
import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.seguridad.SecPerfil;
import pe.edu.unmsm.fisi.siscae.service.ISecPerfilService;
import pe.edu.unmsm.fisi.siscae.service.impl.MantenibleService;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion;
import pe.edu.unmsm.fisi.siscae.utilitario.VerboConstantes;

@Service
public class SecPerfilService extends MantenibleService<SecPerfil> implements ISecPerfilService
{
    private ISecPerfilMapper secPerfilMapper;

    public SecPerfilService(@Qualifier("ISecPerfilMapper") IMantenibleMapper<SecPerfil> mapper)
    {
        super(mapper);
        this.secPerfilMapper = (ISecPerfilMapper) mapper;
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public List<SecPerfil> getLsPerfil()
    {
        return this.buscar(new SecPerfil(), Operacion.SELECT);
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public List<SecPerfil> buscarPorCodigoPerfil(String idPerfil)
    {
        SecPerfil secPerfil = SecPerfil.builder().idPerfil(idPerfil).build();
        return this.buscar(secPerfil, Operacion.SELECT);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public List<SecPerfil> buscarRecursosPorIdPerfil(String idPerfil)
    {
        return secPerfilMapper.buscarRecursosPorIdPerfil(idPerfil);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void registrarPerfil(SecPerfil perfil)
    {
        this.registrar(perfil);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void actualizarPerfil(SecPerfil perfil)
    {
        this.actualizar(perfil);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void eliminarPerfil(SecPerfil perfil)
    {
        this.eliminar(perfil);
    }
}