package Services;

import java.sql.*;
import java.util.HashMap;
import java.util.Map;

public class DBWorker {
    // JDBC URL, username and password of MySQL server
    private static final String url = "jdbc:mysql://localhost:3306/howlongdb";
    private static final String user = "root";
    private static final String password = "Protoss123";

    // JDBC variables for opening and managing connection
    private static Connection con;
    private static Statement stmt;
    private static ResultSet rs;


    public DBWorker() {
        System.out.println("INIT DB WORKER");
    }

    public Map<String, Object> auth(String userName, String userPassword) {
        Map<String, Object> result = new HashMap<String, Object>();
        try {
            con = DriverManager.getConnection(url, user, password);
            stmt = con.createStatement();
            String query = "SELECT * from howlongdb.user WHERE USERNAME='" + userName + "';";
            rs = stmt.executeQuery(query);
            System.out.println("Execute query " + query);
            while (rs.next()) {
                if (rs.getString(3).equals(userPassword)) {
                    result.put("USERID", String.valueOf(rs.getInt(1)));
                    result.put("USERNAME", rs.getString(2));
                    result.put("USERFIRSTNAME", rs.getString(5));
                    result.put("USERMIDDLENAME", rs.getString(6));
                    result.put("USERLASTNAME", rs.getString(7));
                    result.put("USERAGE", rs.getInt(8));
                    result.put("USERSEX", rs.getString(9));
                    result.put("SESSIONID", SessionManager.makeSessionID());
                } else {
                    result.put("ERROR", "Incorrect username or password");
                }
            }
            System.out.println("Result USERNAME = " + result.get("USERNAME"));
            System.out.println("Result SESSIONID = " + result.get("SESSIONID"));
            rs.close();
            if ((result.size() != 0)&&(!result.containsKey("ERROR"))) {
                String query2 = "UPDATE howlongdb.ITUSER set USERTOKEN='" + result.get("SESSIONID") + "' WHERE USERID=" + result.get("USERID") + ";";
                System.out.println("Setting usertoken");
                stmt.executeUpdate(query2);
            } else {
                result.put("ERROR", "User not found");
            }

        } catch (SQLException sqlEx) {
            sqlEx.printStackTrace();
        } finally {
            //close connection ,stmt and resultset here
            try {
                con.close();
            } catch (SQLException se) { /*can't do anything */ }
            try {
                stmt.close();
            } catch (SQLException se) { /*can't do anything */ }
            try {
                rs.close();
            } catch (SQLException se) { /*can't do anything */ }
        }
        return result;
    }
    public Map<String, Object> getEventList(){
        Map<String, Object> result = new HashMap<>();
        try {
            con = DriverManager.getConnection(url, user, password);
            stmt = con.createStatement();
            String query = "SELECT * from itdb.event;";
            rs = stmt.executeQuery(query);
            System.out.println("Execute query " + query);
            while (rs.next()) {

            }

        } catch (SQLException sqlEx) {
            sqlEx.printStackTrace();
        } finally {
            //close connection ,stmt and resultset here
            try {
                con.close();
            } catch (SQLException se) { /*can't do anything */ }
            try {
                stmt.close();
            } catch (SQLException se) { /*can't do anything */ }
            try {
                rs.close();
            } catch (SQLException se) { /*can't do anything */ }
        }
        return null;
    }
}
