import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';

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
  @Input('width') width!: number;
  @Input('height') height!: number;
  @Input('left') left!: number;
  @Input('top') top!: number;
  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;
  private canvasPosition!: { left: number, top: number };
  private containerPos!: { left: number, top: number, right: number, bottom: number };
  public mouse!: { x: number, y: number }
  public status: Status = Status.OFF;
  private mouseClick!: { x: number, y: number, left: number, top: number }

  ngAfterViewInit(): void {
    this.loadCanvas();
  }

  private loadCanvas() {
    const { left, top } = this.canvas.nativeElement.getBoundingClientRect();
    this.canvasPosition = { left, top };
  }

  private resize() {
    this.width = Number(this.mouse.x > this.canvasPosition.left) ? this.mouse.x - this.canvasPosition.left : 0;
    this.height = Number(this.mouse.y > this.canvasPosition.top) ? this.mouse.y - this.canvasPosition.top : 0;
  }

  setStatus(event: MouseEvent, status: number) {
    if (status === 1) event.stopPropagation();
    else this.loadCanvas();
    this.status = status;
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.mouse = { x: event.clientX, y: event.clientY };
    if (this.status === Status.RESIZE) this.resize();;
  }
}
