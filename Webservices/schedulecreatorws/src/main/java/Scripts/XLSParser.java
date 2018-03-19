package Scripts;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;

import java.io.FileInputStream;
import java.io.IOException;
import java.net.URL;
import java.util.*;


public class XLSParser {
    static final String SCHEDULE_URL = "http://rsatu.ru/arch/rasp/raspisanie.xls";
    static final String SHEET_NAME = "Лист1";


    public List<List<String>> parse() {
        List<List<String>> sheet = new ArrayList<>();

        HSSFWorkbook myExcelBook = null;
        try {
            myExcelBook = new HSSFWorkbook(new URL(SCHEDULE_URL).openStream());
        } catch (IOException e) {
            e.printStackTrace();
        }

        HSSFSheet myExcelSheet = null;
        if (myExcelBook != null) {
            myExcelSheet = myExcelBook.getSheet(SHEET_NAME);
        }

        Iterator<Row> iterator = myExcelSheet.iterator();
        while (iterator.hasNext()) {
            HSSFRow row = null;
            if (myExcelSheet != null) {
                row = myExcelSheet.getRow(iterator.next().getRowNum());
            }
            if (row != null) {
                Iterator<Cell> cellsIt = row.cellIterator();
                List<String> rowList = new ArrayList<>();

                while (cellsIt.hasNext()) {

                        Cell cell = cellsIt.next();
                        String cellParsed = "";
                        if (cell.getCellType() == HSSFCell.CELL_TYPE_NUMERIC){
                            cellParsed =String.valueOf((int)( cell.getNumericCellValue()));
                        }
                        if (cell.getCellType() == HSSFCell.CELL_TYPE_STRING){
                            cellParsed = cell.getStringCellValue();
                        }
                        rowList.add(cellParsed);
                        System.out.println(cellParsed);
                    sheet.add(rowList);
                }
            }
        }

        try {
            myExcelBook.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return sheet;
    }
}
