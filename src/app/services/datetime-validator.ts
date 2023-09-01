
import {FormGroup, ValidationErrors, Validators} from '@angular/forms';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';

export function dateTimeValidator(): Validators {
    return (form: FormGroup): ValidationErrors | null => {

        const date: Date = form.get("dueDate")?.value;
        const time: NgbTimeStruct = form.get("dueTime")?.value;
        const now = new Date();

        date?.setHours(time?.hour!);
        date?.setMinutes(time?.minute!);


        if (date) {
            const validDate = date >= now;

            return validDate ? null : {invalidDate:true};
        }

        return null;
    }
}