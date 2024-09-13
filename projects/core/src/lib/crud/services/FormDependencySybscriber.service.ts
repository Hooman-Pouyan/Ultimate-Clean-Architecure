import { Injectable, inject, signal } from "@angular/core";
import { Store } from "@ngrx/store";
import { DropdownDataService } from "./dropdown-data.service";

@Injectable({
  providedIn: 'root'
})
export class FormDependencySubscriber {

  dropDownService = inject(DropdownDataService)
  dependenciesData = signal<any>([])
  store!: Store;

  public dispatchDependencies(dependencies: any[], store: Store) {
    this.registerDependenciesSubscription(dependencies, store);
    dependencies.forEach(dependency => {
      store.dispatch(dependency.data.action)
    });
  }

    public registerDependenciesSubscription(dependencies: any[], store: Store) {
      dependencies.forEach(dependency => {
        this.dependenciesData.set([...this.dependenciesData(), {
          dependencyField: dependency.dependencyField,
          data: this.dropDownService.load(store, dependency.data.selector, dependency.data)
        }])
      })
    }
}
