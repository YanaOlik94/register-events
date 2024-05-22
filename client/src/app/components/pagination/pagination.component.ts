import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnChanges {
  pages: number[] = [];

  @Input() current = 0;
  @Input() total = 0;

  @Output() goTo: EventEmitter<number> = new EventEmitter<number>();
  @Output() next: EventEmitter<number> = new EventEmitter<number>();
  @Output() previous: EventEmitter<number> = new EventEmitter<number>();

  ngOnChanges(changes: SimpleChanges): void {
    let currentChanges = changes['current'] && changes['current'].currentValue;
    let totalChangese = changes['total'] && changes['total'].currentValue;

    if (currentChanges || totalChangese) {
      this.pages = this.getPages(this.current, this.total);
    }
  }

  onGoToPage(page: number) {
    this.goTo.emit(page);
  }

  onNext() {
    this.next.emit(this.current);
  }

  onPrevious() {
    this.previous.next(this.current);
  }

  getPages(current: number, total: number) {
    if (total < 5) {
      return [...Array(total).keys()].map(x => x + 1);
    }

    if (current >= 5) {
      if (current > total - 3) {
        return [1, -1, total - 3, total - 2, total - 1, total];
      } else {
        return [1, -1, current - 1, current, current + 1, current + 2, -1, total];
      }
    }

    return [1, 2, 3, 4, 5, -1, total];
  }
}
