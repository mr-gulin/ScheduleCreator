package Controllers;
import com.sun.net.httpserver.HttpServer;
import java.io.IOException;

import javax.ws.rs.GET;
import javax.ws.rs.Produces;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

// The Java class will be hosted at the URI path "/helloworld"
@Path("/howLong")
public class HowLongController {
    // The Java method will process HTTP GET requests
    @GET
    // The Java method will produce content identified by the MIME Media type "text/plain"
    @Produces("text/plain")
    public String getClichedMessage() {
        // Return some cliched textual content
        return "Hello World";
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String addEvent(@QueryParam("add") String params) {
        return "Hello";
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String getEventList(){
        return "Hello";
    }
}
