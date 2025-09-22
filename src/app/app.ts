import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from "./shared/nav/nav.component";
import { toast, NgxSonnerToaster } from 'ngx-sonner';
import { FooterComponent } from "./shared/footer/footer.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavComponent, NgxSonnerToaster, FooterComponent],
  templateUrl: './app.html', 
  styleUrl: './app.css'
})
export class App {
  protected title = 'Practica06';
  protected readonly toast = toast ;
}