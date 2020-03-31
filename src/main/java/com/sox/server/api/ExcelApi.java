package com.sox.server.api;

import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.*;
import java.nio.file.StandardCopyOption;

import static com.sun.org.apache.xpath.internal.objects.XObject.create;

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
			
			Workbook workbook = WorkbookFactory.create(targetFile);
			Sheet sheet = workbook.getSheetAt(0);
		}
		catch (IOException e)
		{
			logger.error("Error while uploading excel: " + disposition.getFileName(), e);
			return Response.status(500).entity("Exception occured").build();
		}
		catch (InvalidFormatException e)
		{
			logger.error("Error while uploading excel: " + disposition.getFileName(), e);
			return Response.status(500).entity("Exception occured").build();
		}
		
		return Response.status(200).build();
	}
}
