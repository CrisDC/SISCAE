package pe.edu.unmsm.fisi.siscae.mapper.base;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.parametro.Parametro;

public interface IMantenibleMapper<T>
{
    public List<T> mantener(Parametro<T> parametro);
}
