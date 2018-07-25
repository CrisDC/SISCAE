package securityTest;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.ldap.AuthenticationException;
import org.springframework.ldap.core.LdapTemplate;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import pe.edu.unmsm.fisi.siscae.configuracion.LdapTemplateConfiguration;
import pe.edu.unmsm.fisi.siscae.configuracion.PersistenceConfiguration;

import static org.springframework.ldap.query.LdapQueryBuilder.query;

@ContextConfiguration(classes = { LdapTemplateConfiguration.class, PersistenceConfiguration.class })
@RunWith(SpringJUnit4ClassRunner.class)
public class LdapAuthenticationTest
{
    private @Autowired LdapTemplate ldapTemplate;

    @Test
    public void test()
    {
        if (ldapTemplate == null)
        {
            System.out.println("TEMPLATE IS NULL");
        } else
        {
            try
            {
                ldapTemplate.authenticate(query().base("CN=Roles").where("cn").is("hanzllccc"),
                        "123456");
                System.out.println("correcto LOGIN");
            } catch (AuthenticationException e)
            {
                System.out.println("NO LOGIN");
                System.out.println(e.getCause().getMessage().contains("52e"));
                e.printStackTrace();
            } catch (EmptyResultDataAccessException ex)
            {
                System.out.println("USUARIO NO EXISTENTE");
                ex.printStackTrace();
            }
        }
    }

}
