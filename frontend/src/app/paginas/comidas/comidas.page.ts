import { Component, inject, OnInit } from '@angular/core';
import { GetProductosService } from '../../servicios/get-productos.service';
import { CarritoService } from '../../servicios/carrito-service.service'; // Importa el servicio de carrito
import { NavbarComponent } from '../../componentes/navbar/navbar.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-comidas',
  standalone: true,
  imports: [NavbarComponent, NgFor],
  templateUrl: './comidas.page.html',
  styleUrl: './comidas.page.css',
})
export class ComidasPage implements OnInit {
  productos: any[] = [];
  productosFiltrados: any[] = [];
  private cargarTabla: GetProductosService = inject(GetProductosService);
  private carritoService: CarritoService = inject(CarritoService); // Inyecta el servicio de carrito

  ngOnInit(): void {
    this.cargarTabla.getProductosByCategoria('1').then((data) => {
      this.productos = data;
      this.productosFiltrados = data;
    });
  }

  actualizarFiltroDeProductos(searchValue: string) {
    this.productosFiltrados = this.productos.filter((producto) =>
      producto.nombre.toLowerCase().includes(searchValue.toLowerCase()),
    );
  }

  // Método para agregar al carrito
  agregarAlCarrito(producto: any) {
    this.carritoService.agregarProducto(producto);
  }
}
