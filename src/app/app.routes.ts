import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./features/readers/reader.routes').then(m => m.READER_ROUTES)
    }
];
