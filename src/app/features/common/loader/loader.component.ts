import { Component, inject } from '@angular/core';
import { LoaderserviceService } from '../../../core/services/loaderservice.service';

@Component({
  selector: 'app-loader',
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css',
})
export class LoaderComponent {
  loaderservice = inject(LoaderserviceService);
}
