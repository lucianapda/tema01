import { Injectable, EventEmitter, OnChanges } from '@angular/core';
import {BaseService} from '../base.service';
import {HttpService} from '../http/http.service';
import { ToastrService, ActiveToast, IndividualConfig } from 'ngx-toastr';

@Injectable()
export class MessageService extends ToastrService {

    /** show successful toast */
    success(message: string, title: string, override?: Partial<IndividualConfig>): ActiveToast | null {
        return super.success(message, title, this.configIndividualConfig(override));
    }

    /** show toast */
    show(message: string, title: string, override?: Partial<IndividualConfig>, type?: string): ActiveToast | null {
        return super.show(message, title, this.configIndividualConfig(override));
    }

    /** show error toast */
    error(message: string, title: string, override?: Partial<IndividualConfig>): ActiveToast | null {
        return super.error(message, title, this.configIndividualConfig(override));
    }
    /** show info toast */
    info(message: string, title: string, override?: Partial<IndividualConfig>): ActiveToast | null {
        return super.info(message, title, this.configIndividualConfig(override));
    }
    /** show warning toast */
    warning(message: string, title: string, override?: Partial<IndividualConfig>): ActiveToast | null {
        return super.warning(message, title, this.configIndividualConfig(override));
    }

    private configIndividualConfig(override?: Partial<IndividualConfig>) : Partial<IndividualConfig> {
        if (!override) {
            override = {}
        }
        override.closeButton = true;
        override.timeOut = 10000;
        override.positionClass = 'toast-top-right';

        return override;
    }
}

export const MESSAGE_SUCCESS = 'Operação realizada com sucesso.';