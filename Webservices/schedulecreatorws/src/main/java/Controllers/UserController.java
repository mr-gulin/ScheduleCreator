package Controllers;

import Services.DBWorker;
import Services.Json;
import Services.SessionManager;

import java.util.Map;

import javax.ws.rs.GET;
import javax.ws.rs.Produces;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

// The Java class will be hosted at the URI path "/helloworld"
@Path("/user")
public class UserController {
    // The Java method will process HTTP GET requests
    @GET
    // The Java method will produce content identified by the MIME Media type "text/plain"
    @Produces("text/plain")
    public String getClichedMessage() {
        // Return some cliched textual content
        return "Hello World";
    }

    @GET
    @Path("/auth")
    @Produces(MediaType.APPLICATION_JSON)
    public  String auth(@QueryParam("userName") String userName, @QueryParam(("userPassword")) String password){
            DBWorker dbWorker = new DBWorker();
            Map<String, Object> map = dbWorker.auth(userName, password);
        return Json.toJson(map);
    }

    @GET
    @Path("/check")
    @Produces(MediaType.APPLICATION_JSON)
    public String checkSession(@QueryParam("SESSIONID") String sessionID){
        Map<String, String> result = SessionManager.checkSessionID(sessionID);
        return Json.toJsonS(result);
    }


}
