package pe.edu.unmsm.fisi.siscae.configuracion;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan(basePackages = { "pe.edu.unmsm.fisi.siscae.service.impl", "pe.edu.unmsm.fisi.siscae.mapper" })
public class ServiceConfiguration
{

}
