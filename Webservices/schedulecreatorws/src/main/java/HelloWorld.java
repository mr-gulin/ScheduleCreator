import Scripts.RPN;
import Scripts.XLSParser;

import java.util.List;

public class HelloWorld {
    public static void main(String args[]) {
        XLSParser parser = new XLSParser();
        List<List<String>> list = parser.parse();
        System.out.println("Smth");
    }
}
