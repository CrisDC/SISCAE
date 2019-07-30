package pe.edu.unmsm.fisi.siscae.configuracion.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.access.expression.SecurityExpressionHandler;
import org.springframework.security.access.hierarchicalroles.RoleHierarchyImpl;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.FilterInvocation;
import org.springframework.security.web.access.expression.DefaultWebSecurityExpressionHandler;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration
{
	@Configuration
	@Order(1)
	public static class App1ConfigurationAdapter extends WebSecurityConfigurerAdapter
	{
			public App1ConfigurationAdapter() {
		        super();
		    }
	    @Qualifier("customUserDetailsService")
	    private @Autowired UserDetailsService userDetailsService;
	    private @Autowired CustomFailureLoginHandler customFailureLoginHandler;
	    private @Autowired CustomAuthenticationProvider customAuthenticationProvider;
	
	    @Autowired
	    public void configureGlobalSecurity(AuthenticationManagerBuilder auth) throws Exception
	    {
	        auth.authenticationProvider(customAuthenticationProvider);
	    }
	
	    @Override
	    public void configure(WebSecurity webSecurity) throws Exception
	    {
	        webSecurity.ignoring().antMatchers("/websockets/**");
	    }
	
	    @Override
	    protected void configure(HttpSecurity http) throws Exception
	    {
	        http.authorizeRequests()
	              .antMatchers("/", "/login", "/consulta-unmsm/*").permitAll()
	              .antMatchers("/resources/css/**", "/resources/fonts/**", "/resources/image/**","/resources/js/**").permitAll()
	              .antMatchers("/**").authenticated().and()
	              .formLogin().loginPage("/login")
	              .defaultSuccessUrl("/irPaginaInicio", true)
	              .failureHandler(customFailureLoginHandler)
	              .usernameParameter("login").passwordParameter("clave")
	              .and().csrf().and().exceptionHandling()
	              .accessDeniedPage("/AccesoDenegado");
	    }
	
	    @Bean
	    public PasswordEncoder passwordEncoder()
	    {
	        return new BCryptPasswordEncoder();
	    }
	
	    @Bean
	    public SecurityExpressionHandler<FilterInvocation> webSecurityExpressionHandler()
	    {
	        DefaultWebSecurityExpressionHandler expressionHandler = new DefaultWebSecurityExpressionHandler();
	        expressionHandler.setPermissionEvaluator(new BasePermissionEvaluator());
	        expressionHandler.setRoleHierarchy(roleHierarchy());
	        return expressionHandler;
	    }
	
	    @Bean
	    public RoleHierarchyImpl roleHierarchy()
	    {
	        RoleHierarchyImpl roleHierarchy = new RoleHierarchyImpl();
	        roleHierarchy.setHierarchy("SUPER_ADMIN >  MANT_BIN SUPER_ADMIN > MANT_CLIENTE "
	                + "SUPER_ADMIN > MANT_INST SUPER_ADMIN > MANT_CLS_SERVICIO SUPER_ADMIN > MANT_MEMBRESIA "
	                + "SUPER_ADMIN > MANT_CLS_TXN SUPER_ADMIN > MANT_BIN SUPER_ADMIN > MANT_SUBBIN "
	                + "SUPER_ADMIN > MANT_EMPRESA SUPER_ADMIN > MANT_ORIGEN SUPER_ADMIN > MANT_COD_TXN "
	                + "SUPER_ADMIN > MANT_CUENTAS_FC SUPER_ADMIN > MENU_MANTENIMIENTO SUPER_ADMIN > MENU_PARAM_GEN "
	                + "SUPER_ADMIN > MENU_PARAM_COM SUPER_ADMIN > MENU_PARAM_CONTAB");
	        return roleHierarchy;
	    }
	}
	//Esto se ha añadido por si se quiere dividir rutas para Admin y Usuario
	@Configuration
	@Order(2)
	public static class App2ConfigurationAdapter extends WebSecurityConfigurerAdapter
	{
			public App2ConfigurationAdapter() {
		        super();
		    }
	    
			protected void configure(HttpSecurity http) throws Exception {
		        http.antMatcher("/login")
		          .authorizeRequests()
		          .anyRequest()
		          .hasRole("USER")
		           
		          .and()
		          .formLogin()
		          .loginPage("/login2")
		          .failureUrl("/AccesoDenegado")
		          .defaultSuccessUrl("/irPaginaInicio")
		           
		           
		           
		          .and()
		          .csrf().disable();
		    }
	}
}