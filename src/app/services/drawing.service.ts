import { ElementRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DrawingService {

  constructor() { }

  public isDrawing = false;
  public toolSelected = false;
  private lastX = 0;
  private lastY = 0;
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D | null | undefined;

  setCanvas(canvasRef: ElementRef<HTMLCanvasElement>) {
    this.canvas = canvasRef.nativeElement;
    this.ctx = this.canvas?.getContext('2d');
  }

  startDrawing(event: MouseEvent) {
    this.isDrawing = true;
    [this.lastX, this.lastY] = [event.offsetX, event.offsetY];
  }

  draw(event: MouseEvent) {
    if (!this.isDrawing) return;
    this.ctx!.strokeStyle = "black";
    this.ctx?.beginPath();
    this.ctx?.moveTo(this.lastX, this.lastY);
    this.ctx?.lineTo(event.offsetX, event.offsetY);
    this.ctx?.stroke();
    
    [this.lastX, this.lastY] = [event.offsetX, event.offsetY];
  }

  stopDrawing() {
    this.isDrawing = false;
  }
}
