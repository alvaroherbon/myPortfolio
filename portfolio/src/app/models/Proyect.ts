export class Proyect {
	url:string; 
	name:string; 
	picture:string; 
	languages:string[]; 

	constructor(url:string, name:string, picture:string, languages:string[]){
		this.languages = languages; 
		this.name = name; 
		this.picture = picture; 
		this.url = url; 

	}



}
