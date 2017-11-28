import { EntryDTO } from './../../../../model/entry/entry.dto';
import { BaseDTO } from '../../../../model/base/base.dto';
import { EventDTO } from '../../../../model/event/event.dto';


export class EntryFormDTO extends BaseDTO {
    idEvent: number = null;
    currentEntry : EntryDTO = new EntryDTO();
    entries: EntryDTO[] = [];
}