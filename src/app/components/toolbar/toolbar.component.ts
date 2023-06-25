import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  ngOnInit(): void {
    for(let i: number = 20; i < 30; i++) {
      this.colors[i] = "#f5f6f7"
    }
  }

  
  colors: string[] = [
    "#FF0000", // Red
    "#FFA500", // Orange
    "#FFFF00", // Yellow
    "#008000", // Green
    "#0000FF", // Blue
    "#800080", // Purple
    "#FF00FF", // Fuchsia
    "#FFC0CB", // Pink
    "#FFDAB9", // Peach
    "#FFD700", // Gold
    "#D2B48C", // Tan
    "#A52A2A", // Brown
    "#000000", // Black
    "#808080", // Dark Gray
    "#C0C0C0", // Light Gray
    "#FFFFFF", // White
    "#800000", // Maroon
    "#808000", // Olive
    "#008080", // Teal
    "#000080",  // Navy
  ];
}
