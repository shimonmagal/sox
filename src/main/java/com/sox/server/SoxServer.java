package com.sox.server;

import com.sox.server.api.JaxRsApiApplication;
import com.sun.net.httpserver.Headers;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ws.rs.ext.RuntimeDelegate;
import java.io.*;
import java.net.InetSocketAddress;
import java.net.URI;

public class SoxServer
{
    private static final int DEFAULT_PORT = 8080;

    private static final Logger logger = LoggerFactory.getLogger(SoxServer.class);

    public static void main(String[] args) throws Exception {
        int port = DEFAULT_PORT;

        if (args.length > 0)
        {
            port = Integer.parseInt(args[0]);
        }

        HttpServer server = HttpServer.create(new InetSocketAddress(port), 0);

        logger.info("Listening on port: {}", port);

        HttpHandler apiHandler = RuntimeDelegate.getInstance().createEndpoint(new JaxRsApiApplication(), HttpHandler.class);
        server.createContext("/api", apiHandler);

        server.createContext("/", new ResourceHandler());

        server.setExecutor(null);
        server.start();
    }

    static class ResourceHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange t) throws IOException {
            String root = "src/main/resources/sox-ui/build";
            URI uri = t.getRequestURI();
            String path = uri.getPath();

            if (path.equals("/") || (path.isEmpty()))
            {
                path = "/index.html";
            }

            File file = new File(root + path).getCanonicalFile();

            logger.debug("looking for file: {}", file.getAbsolutePath());

            if (!file.isFile()) {
                // Object does not exist or is not a file: reject with 404 error.
                String response = "404 (Not Found)\n";
                t.sendResponseHeaders(404, response.length());
                OutputStream os = t.getResponseBody();
                os.write(response.getBytes());
                os.close();
            } else {
                // Object exists and is a file: accept with response code 200.
                String mime = "text/html";
                if(path.endsWith(".js")) mime = "application/javascript";
                if(path.endsWith(".css")) mime = "text/css";
                if(path.endsWith(".svg")) mime = "image/svg+xml";
                if(path.endsWith(".ico")) mime = "image/x-icon";

                Headers h = t.getResponseHeaders();
                h.set("Content-Type", mime);
                t.sendResponseHeaders(200, 0);

                OutputStream os = t.getResponseBody();
                FileInputStream fs = new FileInputStream(file);
                final byte[] buffer = new byte[0x10000];
                int count = 0;
                while ((count = fs.read(buffer)) >= 0) {
                    os.write(buffer,0,count);
                }
                fs.close();
                os.close();
            }
        }
    }
}
