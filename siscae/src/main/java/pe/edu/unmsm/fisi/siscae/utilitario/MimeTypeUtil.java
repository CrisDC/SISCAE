package pe.edu.unmsm.fisi.siscae.utilitario;

import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.Map;

public class MimeTypeUtil
{
    public final static String PDF = "application/pdf";
    public final static String PNG = "image/png";
    public final static String JPEG = "image/jpeg";
    public final static String XLSX = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

    public static final String EXTENSION_PDF = ".pdf";
    public static final String EXTENSION_PNG = ".png";
    public static final String EXTENSION_JPEG = ".jpeg";
    public static final String EXTENSION_XLSX = ".xlsx";
    
    public static Map<String, String> extension = Collections
            .unmodifiableMap(new LinkedHashMap<String, String>()
            {
                private static final long serialVersionUID = 1L;
                {
                    put("application/pdf", ".pdf");
                    put("image/png", ".png");
                    put("image/jpeg", ".jpeg");
                    put("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                            ".xlsx");
                }
            });

    public static String obtenerExtensionPorMymetype(String mimeType)
    {
        return extension.get(mimeType);
    }
}