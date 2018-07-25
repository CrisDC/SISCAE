package securityTest;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import pe.edu.unmsm.fisi.siscae.configuracion.PersistenceConfiguration;
import pe.edu.unmsm.fisi.siscae.configuracion.ServiceConfiguration;

@ContextConfiguration(classes = { ServiceConfiguration.class, PersistenceConfiguration.class })
@RunWith(SpringJUnit4ClassRunner.class)
public class PasswordEncoderTest
{

    //@Test
    public void encodePasswordTest()
    {
        String password = "SIMP";
        BCryptPasswordEncoder passwordEnconder = new BCryptPasswordEncoder();
        String hashedPassword = passwordEnconder.encode(password);
        System.out.println(hashedPassword);
    }

    @Test
    public void matchPasswordTest()
    {
        String hashedPassword = "$2a$10$yuRs/KLQhzbZsmN71EIhq.wuo1ZrhYfnklKOI9I1upAWB6kTSu4Ky";
        BCryptPasswordEncoder passwordEnconder = new BCryptPasswordEncoder();
        boolean passwordMatches = passwordEnconder.matches("SIMP", hashedPassword);
        System.out.println("Passwords iguales: " + passwordMatches);
    }

}
