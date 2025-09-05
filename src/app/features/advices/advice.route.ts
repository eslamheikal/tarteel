import { Routes } from "@angular/router";
import { AdvicesList } from "./components/advices-list/advices-list";

export const ADVICE_ROUTES: Routes = [
    {
        path: '',
        component: AdvicesList
    }
];