package pe.edu.unmsm.fisi.siscae;

import java.io.FileOutputStream;

import javax.swing.text.DefaultFormatterFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;


import com.haulmont.yarg.loaders.factory.DefaultLoaderFactory;
import com.haulmont.yarg.loaders.impl.GroovyDataLoader;

import com.haulmont.yarg.reporting.Reporting;

import com.haulmont.yarg.structure.impl.BandBuilder;
import com.haulmont.yarg.structure.impl.ReportBuilder;
import com.haulmont.yarg.structure.impl.ReportFieldFormatImpl;
import com.haulmont.yarg.structure.impl.ReportTemplateBuilder;
import com.haulmont.yarg.util.groovy.DefaultScriptingImpl;

@Service
public class PlantillaDocumentoServiceImpl implements PlantillaDocumentoService
{

    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public Integer generarDocumentoAutoCompletado(Integer idDocumento) {

	return 1;
    }
    
    
}
