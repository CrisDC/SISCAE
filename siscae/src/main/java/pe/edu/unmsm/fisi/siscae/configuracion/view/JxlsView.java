package pe.edu.unmsm.fisi.siscae.configuracion.view;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.ss.usermodel.Workbook;

public class JxlsView extends AbstractJxlsView
{
    @Override
    protected void buildExcelDocument(Map<String, Object> model, Workbook workbook,
            HttpServletRequest request, HttpServletResponse response)
    {
        //throw new UnsupportedOperationException();
    }
}