import { Component } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-notfound-page',
  imports: [MatButtonModule,MatIconModule,RouterLink],
  templateUrl: './notfound-page.html',
  styleUrl: './notfound-page.scss'
})
export class NotfoundPage {

}
