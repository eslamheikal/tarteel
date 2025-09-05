import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./features/home/home.routes').then(m => m.HOME_ROUTES)
    },
    {
        path: 'readers',
        loadChildren: () => import('./features/readers/reader.routes').then(m => m.READER_ROUTES)
    },
    {
        path: 'advices',
        loadChildren: () => import('./features/advices/advice.route').then(m => m.ADVICE_ROUTES)
    }
];
