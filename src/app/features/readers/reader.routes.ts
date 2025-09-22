import { Routes } from "@angular/router";
import { ReadersList } from "./components/readers-list/readers-list";
import { ReaderProfile } from "./components/reader-profile/reader-profile";
import { ReaderForm } from "./components/reader-form/reader-form";
import { AuthGuard } from "../../core/guards/auth.guard";
import { DeactivateGuard } from "../../core/guards/deactivate.guard";

export const READER_ROUTES: Routes = [
    {
        path: '',
        component: ReadersList
    },
    {
        path: 'form',
        component: ReaderForm,
        canActivate: [AuthGuard],
        canDeactivate: [DeactivateGuard]
    },
    {
        path: ':uniqueUrl',
        component: ReaderProfile
    }
];
