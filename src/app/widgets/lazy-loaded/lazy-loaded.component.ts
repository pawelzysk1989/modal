import {
  Component,
  ChangeDetectionStrategy,
  NgModule,
  Input,
  Output,
  EventEmitter,
  Inject,
} from '@angular/core';

import { ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-lazy-loaded',
  templateUrl: './lazy-loaded.component.html',
  styleUrls: ['./lazy-loaded.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LazyLoadedComponent {
  @Input() title = '';
  @Output() inputChange = new EventEmitter<string>();
  formControl = new FormControl();

  constructor(@Inject('data') data: string) {
    this.formControl.setValue(data);
  }

  emitValue(): void {
    this.inputChange.emit(this.formControl.value);
  }
}

@NgModule({
  imports: [ReactiveFormsModule],
  declarations: [LazyLoadedComponent],
})
class LazyLoadedModule {}
