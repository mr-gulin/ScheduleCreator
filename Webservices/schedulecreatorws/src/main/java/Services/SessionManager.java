package Services;

import org.apache.commons.codec.binary.Base64;

import java.util.HashMap;
import java.util.Map;

public class SessionManager {

    private static final long SESSION_TIMEOUT = 60000;
    private static final String SESSION_ERROR = "Время сессии истекло";

//    private static final StringCryptUtils scu = new StringCryptUtils(ENCRYPTION_PASSWORD, ENCRYPTION_SALT);
//    protected static String makeSessionID(String userLogin, String userPassword) throws SecurityException {
//        String sessionID;
//        if ((clientProfileId == null) || (userLogin.isEmpty()) || userPassword.isEmpty()) {
//            sessionID = null;
//        } else {
//            String nowTimeInMillisStr = getNowTimeInMillisStr();
//            // "�� ������� + ����� + ������ + ���. ����"
//            String sessionStr = userLogin + SESSION_STR_DIVIDER + userPassword + SESSION_STR_DIVIDER + nowTimeInMillisStr;
//            sessionID = scu.encrypt(sessionStr);
//        }
//        Base64.Encoder encoder = new Base64.Encoder();
//        return sessionID;
//
//    }

    public static String makeSessionID() {
        String sessionID;
        String nowTimeInMillis = String.valueOf(System.currentTimeMillis());
        byte[] encodedBytes = Base64.encodeBase64(nowTimeInMillis.getBytes());
        sessionID = new String(encodedBytes);
        return sessionID;
    }

    public static Map<String, String> checkSessionID(String sessionID) {
        Map result = new HashMap<String, String>();
        byte[] encodedBytes = sessionID.getBytes();
        byte[] decodedBytes = Base64.decodeBase64(encodedBytes);
        String sessionTime = new String(decodedBytes);
        long sessionTimeInMillis = Long.valueOf(sessionTime);
        long nowTimeInMillis = System.currentTimeMillis();
        if ((nowTimeInMillis - sessionTimeInMillis) > SESSION_TIMEOUT) {
            result.put("STATUS", "INVALID");
            result.put("MESSAGE", SESSION_ERROR);
        } else {
            result.put("STATUS", "VALID");
        }
        return result;
    }

}
