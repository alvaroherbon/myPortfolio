import { Component, OnInit } from '@angular/core';
import { ProyectCardComponent } from '../proyect-card/proyect-card.component';
import { GithubService } from '../../services/github.service';

@Component({
  selector: 'app-proyect-card-list',
  templateUrl: './proyect-card-list.component.html',
  styleUrls: ['./proyect-card-list.component.css'],
})
export class ProyectCardListComponent {
  proyects: any;
  constructor(private githubService: GithubService) {}

  getProyects() {
    this.githubService.getProyects().subscribe((data) => {
      this.proyects = data;
    });
  }

  ngOnInit(): void {
    this.getProyects();
  }
}
