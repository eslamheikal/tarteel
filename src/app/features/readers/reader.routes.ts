import { Routes } from "@angular/router";
import { ReadersList } from "./components/readers-list/readers-list";
import { ReaderProfile } from "./components/reader-profile/reader-profile";
import { ReaderForm } from "./components/reader-form/reader-form";

export const READER_ROUTES: Routes = [
    {
        path: '',
        component: ReadersList
    },
    {
        path: 'form',
        component: ReaderForm
    },
    {
        path: 'readers/:uniqueUrl',
        component: ReaderProfile
    }
];
