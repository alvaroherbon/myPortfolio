import { Component, Input } from '@angular/core';
import { GithubService } from '../../services/github.service';
import { ActivatedRoute } from '@angular/router';
import { Proyect } from '../../models/Proyect';

@Component({
  selector: 'app-proyect-detail',
  templateUrl: './proyect-detail.component.html',
  styleUrls: ['./proyect-detail.component.css'],
})
export class ProyectDetailComponent {
  proyect: Proyect;
  proyectName: any;
  commits: any;

  constructor(
    private githubService: GithubService,
    private route: ActivatedRoute
  ) {}

  getCommits(name: String) {
    this.githubService.getCommits(name).subscribe((data) => {
      this.commits = data;
    });
  }

  getProyect(name: String) {
    this.githubService.getProyect(name).subscribe((data) => {
      this.proyect = new Proyect(
        data.html_url,
        data.name,
        data.owner.avatar_url,
        data.language,
        data.description
      );
    });
  }

  ngOnInit(): void {
    this.proyectName = this.route.snapshot.paramMap.get('name');
    this.getProyect(this.proyectName);
    this.getCommits(this.proyectName);
  }
}
