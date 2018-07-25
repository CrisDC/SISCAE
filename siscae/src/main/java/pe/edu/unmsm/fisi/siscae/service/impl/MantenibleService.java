package pe.edu.unmsm.fisi.siscae.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import pe.edu.unmsm.fisi.siscae.configuracion.security.SecurityContextFacade;
import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.parametro.Parametro;
import pe.edu.unmsm.fisi.siscae.service.IMantenibleService;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion.OperacionParam;

@Service
public class MantenibleService<T> implements IMantenibleService<T>
{
    protected IMantenibleMapper<T> mantenimientoMapper;

    public MantenibleService(IMantenibleMapper<T> mapper)
    {
        this.mantenimientoMapper = mapper;
    }

    public MantenibleService()
    {
    }

    @Transactional(propagation = Propagation.MANDATORY)
    public void registrar(T dto)
    {
        mantenimientoMapper.mantener(new Parametro<T>(Operacion.INSERT, dto, SecurityContextFacade.obtenerNombreUsuario()));
    }

    @Transactional(propagation = Propagation.MANDATORY)
    public void registrar(T dto, Operacion operacion)
    {
        mantenimientoMapper.mantener(new Parametro<T>(operacion, dto, SecurityContextFacade.obtenerNombreUsuario()));
    }

    @Transactional(propagation = Propagation.MANDATORY)
    public void actualizar(T dto)
    {
        mantenimientoMapper.mantener(new Parametro<T>(Operacion.UPDATE, dto, SecurityContextFacade.obtenerNombreUsuario()));
    }

    @Transactional(propagation = Propagation.MANDATORY)
    public void actualizar(T dto, Operacion operacion)
    {
        mantenimientoMapper.mantener(new Parametro<T>(operacion, dto, SecurityContextFacade.obtenerNombreUsuario()));
    }

    @Transactional(propagation = Propagation.MANDATORY)
    public void eliminar(T dto)
    {
        mantenimientoMapper.mantener(new Parametro<T>(Operacion.DELETE, dto));
    }

    @Transactional(propagation = Propagation.MANDATORY)
    public void eliminar(T dto, Operacion operacion)
    {
        mantenimientoMapper.mantener(new Parametro<T>(operacion, dto));
    }

    @Transactional(propagation = Propagation.MANDATORY)
    public List<T> buscar(T dto, Operacion operacion)
    {
    	Parametro<T> parametro = new Parametro<T>(operacion, dto);
        mantenimientoMapper.mantener(parametro);
        return parametro.getResultados();
    }

    @Transactional(propagation = Propagation.MANDATORY)
    public List<T> buscar(T dto, Operacion operacion, OperacionParam operacionParam)
    {
    	Parametro<T> parametro = new Parametro<T>(operacion, operacionParam, dto, SecurityContextFacade.obtenerNombreUsuario());
    	System.out.println(operacion + "sera null??" + operacionParam + "--" + dto);
    	System.out.println("pARAMETRIZLO" +parametro);
        mantenimientoMapper.mantener(parametro);
        System.out.println(parametro + "sera null??");
        return parametro.getResultados();
    }

    
    @Transactional(propagation = Propagation.MANDATORY)
    public void mantener(T dto,  Operacion operacion)
    {
        mantenimientoMapper.mantener(new Parametro<T>(operacion, dto, SecurityContextFacade.obtenerNombreUsuario()));
    }
}