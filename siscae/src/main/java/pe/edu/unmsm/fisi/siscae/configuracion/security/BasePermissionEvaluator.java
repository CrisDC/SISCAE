package pe.edu.unmsm.fisi.siscae.configuracion.security;

import java.io.Serializable;

import org.springframework.security.access.PermissionEvaluator;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

@Component
public class BasePermissionEvaluator implements PermissionEvaluator
{   
    @Override
    public boolean hasPermission(Authentication authentication, Object targetDomainObject,
            Object permission)
    {
        System.out.println("BasePermission1");
        System.out.println(targetDomainObject);
        System.out.println(permission);
        for (GrantedAuthority authority : authentication.getAuthorities())
        {
            System.out.println(authority.getAuthority());
        }
        return true;
    }

    @Override
    public boolean hasPermission(Authentication authentication, Serializable targetId,
            String targetType, Object permission)
    {
        return true;
    }
}
