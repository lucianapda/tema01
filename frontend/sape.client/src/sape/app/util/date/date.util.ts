
export class DateUtil {

    public static parseDate(date: string) : Date {
        if (!date) {
            return null;
        }
        let arrayStr: string[] = date.split('/');
        if (arrayStr.length > 1) {
            return new Date(parseInt(arrayStr[0]), parseInt(arrayStr[1]) - 1, parseInt(arrayStr[2])); 
        }
        arrayStr = date.split('-');
        if (arrayStr.length > 1) {
            return new Date(parseInt(arrayStr[0]), parseInt(arrayStr[1]) - 1, parseInt(arrayStr[2])); 
        }
        return new Date(date);
    }
}