import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./layout/header/header";
import { Footer } from "./layout/footer/footer";
import { ToastrModule } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, ToastrModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
}
