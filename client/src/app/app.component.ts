import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet], // Include RouterOutlet here
  template: `
    <div class="container-md">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: []
})
export class AppComponent {}
