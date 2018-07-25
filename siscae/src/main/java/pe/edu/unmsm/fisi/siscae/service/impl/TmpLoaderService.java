package pe.edu.unmsm.fisi.siscae.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pe.edu.unmsm.fisi.siscae.mapper.ITmpLoaderMapper;
import pe.edu.unmsm.fisi.siscae.model.ParametroTmp;
import pe.edu.unmsm.fisi.siscae.service.ITmpLoaderService;

@Service
public class TmpLoaderService implements ITmpLoaderService {
	
	private @Autowired ITmpLoaderMapper iMapper;

	@Override
	public void insertar(ParametroTmp p) {
		iMapper.insertar(p);
	}
 
}
