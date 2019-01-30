package pe.edu.unmsm.fisi.siscae.configuracion.view;

import java.io.IOException;
import java.io.InputStream;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.web.servlet.view.AbstractView;

import net.sf.jxls.transformer.XLSTransformer;
import pe.edu.unmsm.fisi.siscae.utilitario.ConstantesGenerales;
import pe.edu.unmsm.fisi.siscae.utilitario.MimeTypeUtil;
import pe.edu.unmsm.fisi.siscae.utilitario.ReporteUtilYarg;
import pe.edu.unmsm.fisi.siscae.utilitario.StringsUtils;

public abstract class AbstractJxlsView extends AbstractView
{
    private static final String NOMBRE_REPORTE = "Reporte";

    public AbstractJxlsView()
    {
        setContentType(MimeTypeUtil.XLSX);
    }

    @SuppressWarnings("unchecked")
    @Override
    protected void renderMergedOutputModel(Map<String, Object> model, HttpServletRequest request,
            HttpServletResponse response) throws Exception 
    {
        model.putIfAbsent(ReporteUtilYarg.PARAM_NOMBRE_REPORTE, NOMBRE_REPORTE);
        String templateExcel = (String) model.get(ReporteUtilYarg.PARAM_TEMPLATE);
        Map<String, Object> reporteParametros = (Map<String, Object>) model
                .get(ReporteUtilYarg.PARAM_REPORTE_PARAMETERS);
        InputStream stream = getClass().getClassLoader().getResourceAsStream(
                StringsUtils.concatenarCadena(ConstantesGenerales.RUTA_REPORTE_XLSX, templateExcel,
                        MimeTypeUtil.EXTENSION_XLSX));
        XLSTransformer xLSTransformer = new XLSTransformer();
        System.out.println("xLSTransformer: "+xLSTransformer);
        System.out.println("Stream: "+stream);
        System.out.println("reporteParametros: "+reporteParametros);
        Workbook workbook = xLSTransformer.transformXLS(stream, reporteParametros);
        String nombreReporte = (String) model.get(ReporteUtilYarg.PARAM_NOMBRE_REPORTE);
        response.setHeader("Content-Disposition", StringsUtils.concatenarCadena(
                "attachment;filename=", nombreReporte, MimeTypeUtil.EXTENSION_XLSX));
        response.setContentType(getContentType());
        renderReport(workbook, response);
    }

    protected abstract void buildExcelDocument(Map<String, Object> model, Workbook workbook,
            HttpServletRequest request, HttpServletResponse response);

    protected void renderReport(Workbook workbook, HttpServletResponse response) throws IOException
    {
        workbook.write(response.getOutputStream());
    }

    @Override
    protected boolean generatesDownloadContent()
    {
        return true;
    }
}