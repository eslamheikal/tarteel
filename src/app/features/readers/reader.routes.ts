import { Routes } from "@angular/router";
import { ReadersList } from "./components/readers-list/readers-list";
import { ReaderProfile } from "./components/reader-profile/reader-profile";

export const READER_ROUTES: Routes = [
    {
        path: '',
        component: ReadersList
    },
    {
        path: ':uniqueUrl',
        component: ReaderProfile
    }
];
