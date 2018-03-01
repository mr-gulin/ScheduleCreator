package Scripts;

import java.util.Stack;

public class RPN {
    public RPN() {
    }

    private boolean isDelimiter(char c) {
        if ((" =").indexOf(c) != -1) {
            return true;
        }
        return false;
    }

    private boolean isOperator(char c) {
        if (("+-*/()^").indexOf(c) != -1) {
            return true;
        }
        return false;
    }

    private byte getPriority(char c) {
        switch (c) {
            case '(':
                return 0;
            case ')':
                return 1;
            case '+':
                return 2;
            case '-':
                return 3;
            case '*':
                return 4;
            case '/':
                return 4;
            case '^':
                return 5;
            default:
                return 6;
        }
    }

    private String convert(String input) {
        StringBuilder result = new StringBuilder();
        Stack<Character> stack = new Stack<Character>();
        for (int i = 0; i < input.length(); i++) {

            if (isDelimiter(input.charAt(i))) {
                continue;
            }

            if (Character.isDigit(input.charAt(i))) {
                while (!isDelimiter(input.charAt(i)) && !isOperator(input.charAt(i))) {
                    result.append(input.charAt(i)); //Добавляем каждую цифру числа к нашей строке
                    i++; //Переходим к следующему символу

                    if (i == input.length()) break; //Если символ - последний, то выходим из цикла
                }
                result.append(" "); //Дописываем после числа пробел в строку с выражением
                i--;
            }

            if (isOperator(input.charAt(i))) //Если оператор
            {
                if (input.charAt(i) == '(') //Если символ - открывающая скобка
                    stack.push(input.charAt(i)); //Записываем её в стек
                else if (input.charAt(i) == ')') //Если символ - закрывающая скобка
                {
                    //Выписываем все операторы до открывающей скобки в строку
                    char s = stack.pop();

                    while (s != '(') {
                        result.append(String.valueOf(s) + ' ');
                        s = stack.pop();
                    }
                } else //Если любой другой оператор
                {
                    if (!stack.empty()) //Если в стеке есть элементы
                        if (getPriority(input.charAt(i)) <= getPriority(stack.peek())) //И если приоритет нашего оператора меньше или равен приоритету оператора на вершине стека
                            result.append(stack.pop().toString() + " "); //То добавляем последний оператор из стека в строку с выражением

                    stack.push(input.charAt(i)); //Если стек пуст, или же приоритет оператора выше - добавляем операторов на вершину стека

                }
            }

        }
        while (!stack.empty())
            result.append(stack.pop()).append(" ");

        return result.toString();

    }

    private String prepareExpression(String inputExpression) {
        String preparedExpression = "";
        inputExpression = inputExpression.replaceAll("add", "+");
        for (int i = 0; i < inputExpression.length(); i++) {
            if (("0123456789+-*/^= ().").indexOf(inputExpression.charAt(i)) == -1){
                throw new Error();
            }
        }
        preparedExpression = inputExpression.replaceAll(" ", "");
        return preparedExpression;

    }

    private Double calculate(String input) {
        Double result = 0.0; //Результат
        Stack<Double> temp = new Stack<Double>(); //Dhtvtyysq стек для решения

        for (int i = 0; i < input.length(); i++) //Для каждого символа в строке
        {
            //Если символ - цифра, то читаем все число и записываем на вершину стека
            if (Character.isDigit(input.charAt(i))) {
                String a = "";

                while (!isDelimiter(input.charAt(i)) && !isOperator(input.charAt(i))) //Пока не разделитель
                {
                    a += input.charAt(i); //Добавляем
                    i++;
                    if (i == input.length()) break;
                }
                temp.push(Double.valueOf(a)); //Записываем в стек
                i--;
            } else if (isOperator(input.charAt(i))) //Если символ - оператор
            {
                //Берем два последних значения из стека
                Double a = temp.pop();
                Double b = temp.pop();

                switch (input.charAt(i)) //И производим над ними действие, согласно оператору
                {
                    case '+':
                        result = b + a;
                        break;
                    case '-':
                        result = b - a;
                        break;
                    case '*':
                        result = b * a;
                        break;
                    case '/':
                        result = b / a;
                        break;
                    case '^':
                        result = Math.pow(Double.valueOf(b.toString()), Double.valueOf(a.toString()));
                        break;
                }
                temp.push(result); //Результат вычисления записываем обратно в стек
            }
        }
        return temp.peek(); //Забираем результат всех вычислений из стека и возвращаем его
    }

    public Double calcWithReversePolishNotation(String expression) {
        expression = prepareExpression(expression);
        String rpn = convert(expression);
        Double result = calculate(rpn);
        return result;
    }
}
