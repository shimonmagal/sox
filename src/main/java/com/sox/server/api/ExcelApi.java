package com.sox.server.api;

import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.sox.server.session.SessionManager;
import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.*;
import java.nio.file.StandardCopyOption;

@Path("excel")
public class ExcelApi
{
	private static final Logger logger = LoggerFactory.getLogger(ExcelApi.class);
	
	@PUT
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	public Response upload(@FormDataParam("file") InputStream fileInputStream,
			@FormDataParam("file") FormDataContentDisposition disposition)
	{
		File targetFile = new File("/tmp/" + disposition.getFileName());
		
		try
		{
			java.nio.file.Files.copy(
					fileInputStream,
					targetFile.toPath(),
					StandardCopyOption.REPLACE_EXISTING);
		}
		catch (IOException e)
		{
			logger.error("Error while uploading excel: " + disposition.getFileName(), e);
			return Response.status(500).entity("Exception occured").build();
		}
		
		return Response.status(200).build();
	}
}
