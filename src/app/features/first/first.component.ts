import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  ViewContainerRef,
  ComponentRef,
  ComponentFactoryResolver,
  Injector,
} from '@angular/core';

import { LazyLoadedComponent } from 'src/app/widgets/lazy-loaded/lazy-loaded.component';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FirstComponent {
  @ViewChild('vcr', { read: ViewContainerRef }) vcr!: ViewContainerRef;
  showModal = false;
  loadedComponentRef: ComponentRef<LazyLoadedComponent> | undefined;

  constructor(
    private resolver: ComponentFactoryResolver,
    private injector: Injector
  ) {}

  closeModal(): void {
    this.showModal = false;
  }

  openModal(): void {
    this.showModal = true;
    if (!this.loadedComponentRef) {
      this.loadComponent();
    }
  }

  loadComponent(): void {
    import('src/app/widgets/lazy-loaded/lazy-loaded.component').then(
      ({ LazyLoadedComponent: component }) => {
        const injector = Injector.create({
          providers: [
            {
              provide: 'data',
              useValue: 'okoń',
            },
          ],
          parent: this.injector,
        });
        const factory = this.resolver.resolveComponentFactory(component);
        this.loadedComponentRef = this.vcr.createComponent(
          factory,
          0,
          injector
        );
        this.loadedComponentRef.instance.title = 'Title';
        this.loadedComponentRef.instance.inputChange.subscribe(console.log);
      }
    );
  }
}
