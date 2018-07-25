package pe.edu.unmsm.fisi.siscae.controller.consultas.rest;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.ss.formula.functions.Replace;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import pe.edu.unmsm.fisi.siscae.aspecto.anotacion.Audit;
import pe.edu.unmsm.fisi.siscae.aspecto.enumeracion.Comentario;
import pe.edu.unmsm.fisi.siscae.aspecto.enumeracion.Dato;
import pe.edu.unmsm.fisi.siscae.aspecto.enumeracion.Tipo;
import pe.edu.unmsm.fisi.siscae.configuracion.view.UploadedObjectView;
import pe.edu.unmsm.fisi.siscae.model.Documento;
import pe.edu.unmsm.fisi.siscae.model.criterio.CriterioBusquedaDocumento;
import pe.edu.unmsm.fisi.siscae.model.criterio.CriterioBusquedaNumeroDocumento;
import pe.edu.unmsm.fisi.siscae.service.IConsultaDocumentosService;

@Audit(tipo = Tipo.Emp, datos = Dato.SolicitudTramite)
@RequestMapping("/consultaDocumentos")
public @RestController class ConsultaDocumentosController
{
    private @Autowired IConsultaDocumentosService consultaDocumentoService;
    
    @Audit(comentario = Comentario.CONSULTA_POR_NUMERO_DOCUMENTO)
    @GetMapping(params = "accion=buscarPorDocumento")
    public List<Documento> buscarPorTipoDocumento(CriterioBusquedaNumeroDocumento criterioBusquedaNumeroDocumento)
    {
       System.out.println(criterioBusquedaNumeroDocumento);
        return consultaDocumentoService.buscarPorNumeroDocumento(criterioBusquedaNumeroDocumento);
    }

    @Audit(comentario = Comentario.Consulta)
    @GetMapping(params = "accion=buscarPorCriterio")
    public List<Documento> buscarPorCriterio(CriterioBusquedaDocumento criterioBusquedaDocumento)
    {
        return consultaDocumentoService.buscarPorCriterio(criterioBusquedaDocumento);
    }
    
    @GetMapping(params = "accion=buscarPorNumeroEmision")
    public void downloadFile(@RequestParam("numeroEmision") String numeroEmision, HttpServletRequest request, HttpServletResponse response) throws IOException{
        Map model = new HashMap();
        CriterioBusquedaDocumento criterioBusquedaDocumento = new CriterioBusquedaDocumento();
        criterioBusquedaDocumento.setNumeroEmision(numeroEmision);  
        Documento documento = consultaDocumentoService.buscarPorNumeroEmision(criterioBusquedaDocumento);

        model.put("contentType", "application/pdf" );
        model.put("filename",documento.getNumeroDocumentoDescripcion());

            byte[] bytes = (byte[]) documento.getArchivoBLOB();
            String contentType =  "application/pdf";
            //response.addHeader("Content-disposition","attachment; filename="+model.get("filename")+".pdf");
            response.setContentType(contentType);
            response.setContentLength(bytes.length);
            ServletOutputStream out = response.getOutputStream();
            out.write(bytes);
            out.flush();
     
    }
    
}
