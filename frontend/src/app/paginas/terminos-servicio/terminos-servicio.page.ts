import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FooterComponent } from '../../componentes/footer/footer.component';

@Component({
  selector: 'app-terminos-servicio',
  standalone: true,
  imports: [FooterComponent],
  templateUrl: './terminos-servicio.page.html',
  styleUrls: ['./terminos-servicio.page.scss'],
})
export class TerminosServicioPage implements OnInit {
  private router: Router = inject(Router);
  constructor() {}

  ngOnInit() {}

  navegarA(ruta: string) {
    this.router.navigate([ruta]);
  }
}