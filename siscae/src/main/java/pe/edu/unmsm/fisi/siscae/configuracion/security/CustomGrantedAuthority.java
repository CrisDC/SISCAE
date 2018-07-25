package pe.edu.unmsm.fisi.siscae.configuracion.security;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.SpringSecurityCoreVersion;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.util.Assert;

public class CustomGrantedAuthority implements GrantedAuthority
{
    private static final long serialVersionUID = SpringSecurityCoreVersion.SERIAL_VERSION_UID;

    private final String role;

    public CustomGrantedAuthority(String role)
    {
        Assert.hasText(role, "A granted authority textual representation is required");
        this.role = role;
    }

    public String getAuthority()
    {
        return role;
    }

    public boolean equals(Object obj)
    {
        if (this == obj)
        {
            return true;
        }

        if (obj instanceof SimpleGrantedAuthority)
        {
            return role.equals(((CustomGrantedAuthority) obj).role);
        }

        return false;
    }

    public int hashCode()
    {
        return this.role.hashCode();
    }

    public String toString()
    {
        return this.role;
    }
}
