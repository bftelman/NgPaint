import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor() { }

  currentColor$$ = new BehaviorSubject<string | null>(null);
  currentColor$ = this.currentColor$$.asObservable();

  setColor(color: string) {
    this.currentColor$$.next(color);
  }
}
