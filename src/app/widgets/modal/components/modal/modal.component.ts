import {
  Component,
  ChangeDetectionStrategy,
  HostListener,
  ElementRef,
  HostBinding,
  Input,
  EventEmitter,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  @Output() hide = new EventEmitter<void>();
  constructor(private elementRef: ElementRef) {}

  @HostBinding('class.show')
  private isDisaplayed = false;

  @Input()
  set showModal(show: boolean) {
    this.isDisaplayed = show;
  }

  get showModal(): boolean {
    return this.isDisaplayed;
  }

  @HostListener('click', ['$event.target'])
  onClick(target: EventTarget): void {
    if (target === this.elementRef.nativeElement) {
      this.onClose();
    }
  }

  onClose(): void {
    this.hide.emit();
  }
}
