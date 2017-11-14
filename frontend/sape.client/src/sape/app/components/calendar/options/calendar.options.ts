
/**
 * Representa as configurações possíveis para o componente calendar.
 */
export class CalendarOptions {
    type?: string;
    startCalendar?: HTMLElement;
    endCalendar?: HTMLElement;
    startMode?: string;
    ampm?: boolean;
    on?: string;
    minDate?: Date;
    maxDate?: Date;
    formatter?: any;
    monthFirst?: boolean;
    inline?: boolean;
    onChange?: Function;
    text?: any;
  }  