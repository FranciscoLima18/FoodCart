import { NgClass, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import {
  ImageCroppedEvent,
  ImageCropperComponent,
  LoadedImage,
} from 'ngx-image-cropper';
import { PostProductoService } from '../../servicios/post-producto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'editar-producto',
  standalone: true,
  templateUrl: './editar-producto.pages.html',
  styleUrls: ['./editar-producto.pages.scss'],
  imports: [FormsModule, NgIf, NgClass, ImageCropperComponent],
})
export class EditarProductoPages {
  private postProducto: PostProductoService = inject(PostProductoService);
  private router: Router = inject(Router);
  nombre: string = '';
  descripcion: string = '';
  precio_unidad: number = 0;
  categoria: string = '';
  foto: Blob | undefined | null;

  imageChangedEvent: Event | null = null;
  croppedImage: SafeUrl = '';
  temporaryCroppedImage: SafeUrl = '';
  temporaryBlob: Blob | undefined | null = null;
  mostrarCropper: boolean = true;

  constructor(private sanitizer: DomSanitizer) {}

  fileChangeEvent(event: Event): void {
    this.imageChangedEvent = event;
    this.mostrarCropper = true;
  }
  imageCropped(event: ImageCroppedEvent) {
    if (event.objectUrl) {
      this.temporaryCroppedImage = this.sanitizer.bypassSecurityTrustUrl(
        event.objectUrl,
      );
    }
    this.temporaryBlob = event.blob;
  }
  imageLoaded(image: LoadedImage) {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    alert('No se pudo cargar la imágen, intente otra vez.');
  }
  onSubmit() {
    const formData = new FormData(
      document.getElementById('formPost') as HTMLFormElement,
    );
    if (this.foto) {
      formData.delete('foto');
      formData.append('foto', this.foto, 'imagen.png');
    }
    if (this.postProducto.postProducto(formData) != null) {
      this.router.navigate(['']);
    } else {
      alert('Hubo un error al crear su producto.');
    }
  }
  cropImage() {
    this.croppedImage = this.temporaryCroppedImage;
    this.foto = this.temporaryBlob;
    this.mostrarCropper = false;
    this.temporaryCroppedImage = '';
  }
}
