import { Component, Input } from '@angular/core';
import { GithubService } from '../../services/github.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-proyect-detail',
  templateUrl: './proyect-detail.component.html',
  styleUrls: ['./proyect-detail.component.css'],
})
export class ProyectDetailComponent {
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

  ngOnInit(): void {
    this.proyectName = this.route.snapshot.paramMap.get('name');
    this.getCommits(this.proyectName);
  }
}
