package com.sox.server.api.auth;

import com.sox.server.session.SessionManager;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.Priority;
import javax.ws.rs.Priorities;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.core.Cookie;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.Provider;
import java.io.IOException;

@Secured
@Provider
@Priority(Priorities.AUTHENTICATION)
public class AuthenticationFilter implements ContainerRequestFilter
{
	private static Logger logger = LoggerFactory.getLogger(AuthenticationFilter.class);
	
	@Override
	public void filter(ContainerRequestContext requestContext) throws IOException
	{
		Cookie cookie = requestContext.getCookies().get("JSESSIONID");
		
		if (cookie == null)
		{
			requestContext.abortWith(Response.status(403).entity("not logged in").build());
		}
		
		String user = SessionManager.get(cookie.getValue());
		
		if (user == null)
		{
			requestContext.abortWith(Response.status(403).entity("not logged in").build());
		}
		else
		{
//            logger.debug("User is: {}", user);
		}
	}
}