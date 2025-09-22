import { inject, Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
    providedIn: 'root'
})
export class LoaderService {

    private loader = inject(NgxSpinnerService);

    showLoader(name: string = 'npx-spinner-loading') {
        this.loader.show(name);
    }

    hideLoader(name: string = 'npx-spinner-loading') {
        this.loader.hide(name);
    }
}