package com.sox.server.api.report;

import javax.ws.rs.GET;
import javax.ws.rs.Path;

@Path("report")
public class Report
{
    @GET
    public static String report()
    {
        return "test";
    }
}
