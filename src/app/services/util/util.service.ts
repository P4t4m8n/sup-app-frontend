import { Injectable } from '@angular/core';

type DebounceFunction = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
) => (...args: Parameters<T>) => void;

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  constructor() {}

  debounce: DebounceFunction = (func, wait) => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    return (...args: Parameters<typeof func>) => {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        func(...args);
      }, wait);
    };
  };
}
