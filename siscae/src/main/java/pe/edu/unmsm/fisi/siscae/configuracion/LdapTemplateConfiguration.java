package pe.edu.unmsm.fisi.siscae.configuracion;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.ldap.core.LdapTemplate;
import org.springframework.ldap.core.support.LdapContextSource;

@Configuration
@PropertySource("classpath:ldap.properties")
public class LdapTemplateConfiguration
{
    private @Autowired Environment env;

    @Bean
    public LdapTemplate ldapTemplate()
    {
        LdapTemplate ldapTemplate = new LdapTemplate();
        ldapTemplate.setContextSource(ldapContextSource());
        ldapTemplate.setIgnorePartialResultException(true);
        return ldapTemplate;
    }

    @Bean
    public LdapContextSource ldapContextSource()
    {
        LdapContextSource ldapContextSource = new LdapContextSource();
        ldapContextSource.setUrl(env.getProperty("ldap.url"));
        ldapContextSource.setBase(env.getProperty("ldap.baseDc"));
        ldapContextSource.setUserDn(env.getProperty("ldap.userDn"));
        ldapContextSource.setPassword(env.getProperty("ldap.password"));
        ldapContextSource.setReferral(env.getProperty("ldap.referral"));
        ldapContextSource.afterPropertiesSet();
        return ldapContextSource;
    }
}