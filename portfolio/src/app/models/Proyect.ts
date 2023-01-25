export class Proyect {
  url: string;
  name: string;
  picture: string;
  languages: string[];
  description: string;

  constructor(
    url: string,
    name: string,
    picture: string,
    languages: string[],
    description: string
  ) {
    this.languages = languages;
    this.name = name;
    this.picture = picture;
    this.url = url;
    this.description = description;
  }
}
