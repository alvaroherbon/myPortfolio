import { Component, OnInit } from '@angular/core';
import { Proyect } from '../../models/Proyect'
@Component({
  selector: 'app-proyect-card',
  templateUrl: './proyect-card.component.html',
  styleUrls: ['./proyect-card.component.css']
})
export class ProyectCardComponent implements OnInit{

proyects:Proyect[]; 


constructor(){}

ngOnInit(): void {
	this.proyects = [{
		url: 'https://github.com/alvaroherbon/Brains',
		name: 'Obsidian Brain',
	        picture: "https://images.freeimages.com/images/large-previews/9c4/shiny-brain-1150907.jpg",	
		languages: ["Natural Language", "SQL"]
	}]
	
}
	


}
