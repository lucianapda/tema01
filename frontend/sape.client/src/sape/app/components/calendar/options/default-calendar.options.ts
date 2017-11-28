import { CalendarOptions } from './calendar.options';

/**
 * Implementação padrão utilizada para o componente calendar.
 * 
 */
export class DefaultCalendarOptions implements CalendarOptions {
    
    type = 'datetime';
    firstDayOfWeek = 1;
    text: {
        days: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
        months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        today: 'Hoje',
        now: 'Agora',
        am: 'AM',
        pm: 'PM'
    };
    formatter = {
        date: formatDate
    };
    monthFirst = false;
}

function formatDate(date: Date, settings: any) {
    let today = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    
    if (today < 10)
      today = parseInt(`0${today}`);
      
    if (month < 10)
      month = parseInt(`0${month}`);
    
    return `${today}/${month}/${year}`;
}
