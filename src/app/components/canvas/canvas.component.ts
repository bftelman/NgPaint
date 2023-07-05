import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, Renderer2, ViewChild, inject } from '@angular/core';
import { of } from 'rxjs';
import { DrawingService } from 'src/app/services/drawing.service';

const enum Status {
  OFF = 0,
  RESIZE = 1,
}

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements AfterViewInit {
  constructor(private renderer: Renderer2) { }

  @Input('width') width!: number;
  @Input('height') height!: number;
  @Input('left') left!: number;
  @Input('top') top!: number;
  @ViewChild('canvasWrapper') canvasWrapper!: ElementRef<HTMLDivElement>;
  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>
  private fakeCanvas: HTMLCanvasElement = <HTMLCanvasElement>document.createElement('canvas');
  private canvasPosition!: { left: number, top: number };
  public mouse!: { x: number, y: number }
  public status: Status = Status.OFF;
  private drawingService: DrawingService = inject(DrawingService);

  ngAfterViewInit(): void {
    this.renderer.setAttribute(this.canvas.nativeElement, 'width', this.width.toString());
    this.renderer.setAttribute(this.canvas.nativeElement, 'height', this.height.toString());
    this.loadCanvas();
    this.drawingService.setCanvas(this.canvas);
    this.fakeCanvas!.width = 9000;
    this.fakeCanvas!.height = 9000;
    console.log(this.fakeCanvas)
  }

  private loadCanvas() {
    const { left, top } = this.canvasWrapper.nativeElement.getBoundingClientRect();
    this.canvasPosition = { left, top };
  }

  private resize() {
    this.fakeCanvas.getContext('2d')?.drawImage(this.canvas.nativeElement, 0, 0);
    this.width = Number(this.mouse.x > this.canvasPosition.left) ? this.mouse.x - this.canvasPosition.left : 0;
    this.height = Number(this.mouse.y > this.canvasPosition.top) ? this.mouse.y - this.canvasPosition.top : 0;
    this.renderer.setAttribute(this.canvas.nativeElement, 'width', this.width.toString());
    this.renderer.setAttribute(this.canvas.nativeElement, 'height', this.height.toString());

    // Update display size
    this.renderer.setStyle(this.canvas.nativeElement, 'width', this.width + 'px');
    this.renderer.setStyle(this.canvas.nativeElement, 'height', this.height + 'px');

  }

  setStatus(event: MouseEvent, status: number) {
    if (status === 1) event.stopPropagation();
    else this.loadCanvas();
    this.status = status;
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.mouse = { x: event.clientX, y: event.clientY };
    if (this.status === Status.RESIZE){
       this.resize();
    } else {
      this.canvas.nativeElement.getContext('2d')?.drawImage(this.fakeCanvas, 0, 0);
    }
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {
    this.drawingService.startDrawing(event);
  }

  @HostListener('mousemove', ['$event'])
  onMouseDrawMove(event: MouseEvent): void {
    if (this.drawingService.isDrawing) {
      this.drawingService.draw(event);
    }
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(event: MouseEvent): void {
    this.drawingService.stopDrawing();
  }

  @HostListener('mouseout', ['$event'])
  onMouseOut(event: MouseEvent): void {
    this.drawingService.stopDrawing();
  }
}
