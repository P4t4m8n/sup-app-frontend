import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate',
})
export class CustomDatePipe implements PipeTransform {
  transform(value: string): string {
    const date = new Date(value);
    const now = new Date();

    const sameDay =
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear();

    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);
    const isYesterday =
      date.getDate() === yesterday.getDate() &&
      date.getMonth() === yesterday.getMonth() &&
      date.getFullYear() === yesterday.getFullYear();

    if (sameDay) {
      return `${date.getHours()}:${this.pad(date.getMinutes())}`;
    }

    if (isYesterday) {
      return 'Yesterday';
    }

    return `${this.pad(date.getDate())}/${this.pad(
      date.getMonth() + 1
    )}/${date.getFullYear()}`;
  }

  private pad(num: number): string {
    return num < 10 ? `0${num}` : num.toString();
  }
}
