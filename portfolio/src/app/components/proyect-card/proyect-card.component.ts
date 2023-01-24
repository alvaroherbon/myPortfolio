import { Component, Input, OnInit } from '@angular/core';
import { Proyect } from '../../models/Proyect';
import { PexelsService } from 'src/app/services/pexels.service';
import { AppRoutingModule } from 'src/app/app-routing.module';
@Component({
  selector: 'app-proyect-card',
  templateUrl: './proyect-card.component.html',
  styleUrls: ['./proyect-card.component.css'],
})
export class ProyectCardComponent implements OnInit {
  @Input() proyect: any;
  picture: any;
  router: AppRoutingModule;
  constructor(private pexelsService: PexelsService) {}

  ngOnInit(): void {
    this.pexelsService.getPicture(this.proyect.language).subscribe((data) => {
      console.log('la imagen es: ', data.photos[0].src.large);
      this.picture = data.photos[0].src.large;
    });
  }
}
