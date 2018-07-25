package pe.edu.unmsm.fisi.siscae.utilitario;

import java.io.File;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;

public class Util {

	public static void msjError(String string) {
		System.out.println(string);
		
	}

	public static String formatearNumero(String numFmtDosCifras, Number i) {
		return String.format(numFmtDosCifras, i);
	}

	public static String formarRutaCarpetaPorFecha(Date fechaProceso){
		LocalDate fechaProcesoConvertida = aLocalDate(fechaProceso);
		return StringsUtils.concatenar(
		   		fechaProcesoConvertida.getYear(),File.separator,
		   		formatearNumero(Constantes.NUM_FMT_DOS_CIFRAS,fechaProcesoConvertida.getMonthValue()),File.separator,
		   		formatearNumero(Constantes.NUM_FMT_DOS_CIFRAS,fechaProcesoConvertida.getDayOfMonth()));
	}
	
	public static LocalDate aLocalDate(Date fecha){
		LocalDate localDate = fecha.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
		return localDate;
	}



}
