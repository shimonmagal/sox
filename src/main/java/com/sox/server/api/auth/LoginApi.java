package com.sox.server.api.auth;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.sox.server.session.SessionManager;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ws.rs.Consumes;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.NewCookie;
import javax.ws.rs.core.Response;
import java.util.Collections;

@Path("login")
public class LoginApi
{
    private static final String CLIENT_ID = "302172748643-4ku8jk6v9le1agq7qtj82qn4ombphkld.apps.googleusercontent.com";

    private static final Logger logger = LoggerFactory.getLogger(LoginApi.class);

    @POST
    @Consumes("text/plain")
    public Response authenticate(String idTokenString, @HeaderParam("Referer") String referer)
    {
        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), JacksonFactory.getDefaultInstance())
                .setAudience(Collections.singletonList(CLIENT_ID))
                .build();

        try {
            GoogleIdToken idToken = verifier.verify(idTokenString);
            if (idToken != null) {
                GoogleIdToken.Payload payload = idToken.getPayload();

                // Print user identifier
                String userId = payload.getSubject();

                logger.debug("User ID: {}", payload.getEmail());

                if (payload.getEmail().endsWith("@gmail.com")) {
                    String session = SessionManager.createSession(payload.getEmail());

                    boolean secure = referer.toLowerCase().startsWith("https");
                    NewCookie cookie = new NewCookie("JSESSIONID", session, "/", null, null, 2 * 60 * 60, secure, true);
                    return Response.ok().entity(payload.getEmail()).cookie(cookie).build();
                }
            }
        }
        catch (Exception e)
        {
            e.printStackTrace();

            return Response.serverError().entity("Error occurred in server").build();
        }

        return Response.status(403).entity("User not permitted").build();
    }
}
