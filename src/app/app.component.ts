import { Component, OnInit, inject } from '@angular/core';
import { ColorService } from './services/color.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'NgPaint';
  colorService = inject(ColorService);
  ngOnInit(): void {
    this.colorService.currentColor$.subscribe((color: string | null) => {
      console.log(color)
    })
  }
}
