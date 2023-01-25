import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent {
  text = 'hola';

  onSubmit() {
    console.log(this.text);
  }

  activeTab(event: any) {
    console.log('el evento es: ', event.target);
    const navBarItems = document.querySelectorAll('.navbar-nav>li>a');
    navBarItems.forEach((item) => {
      item.classList.remove('active');
    });
    event.target.classList.add('active');
  }
}
