import { Observable, Subject } from 'rxjs';
import { ToolAction as TA, ToolElement } from '../enums/toolbar.enum';
import { CrudConfig } from '../models/crud.config';
import { CoreTableAction, CoreTableActionData } from '../models/table.model';
import { CoreToolbar, CoreToolbarEvent, CoreToolData } from '../models/toolbar.model';

type AddToolData = Partial<Record<TA.Save | TA.Cancel, CoreToolData>>
type EditToolData = Partial<Record<TA.Save, CoreToolData>>
  & Record<TA.Cancel, Required<Pick<CoreToolData, 'getId'>>>
type ViewToolData = Partial<Record<TA.Delete | TA.Refresh | TA.Back, CoreToolData>>
  & Record<TA.Edit, Required<Pick<CoreToolData, 'getId'>>>
type ListToolData = Partial<Record<TA.Add | TA.Refresh, CoreToolData>>

type TableActionData = Partial<Record<TA.View | TA.Delete, CoreTableActionData>>


export class ToolbarBuilder {
  static add<T>(crudConfig: CrudConfig<T>, toolData?: AddToolData): CoreToolbar {
    const subject$ = new Subject<CoreToolbarEvent>();

    return {
      events$: subject$.asObservable(),
      items: [
        {
          label: 'Save',
          icon: 'pi pi-save',
          element: ToolElement.Button,
          command: () => subject$.next({ action: TA.Save }),
          permission: crudConfig.permission.action.add,
          styleClass: 'p-button-text p-button-primary p-button-sm',
          data: toolData?.[TA.Save]
        },
        {
          label: 'Cancel',
          icon: 'pi pi-times',
          element: ToolElement.Link,
          command: () => crudConfig.path.page.list(),
          permission: crudConfig.permission.action.list,
          styleClass: 'p-button-text p-button-secondary p-button-sm',
          data: toolData?.[TA.Cancel]
        },
      ],
    };
  }

  static edit<T>(crudConfig: CrudConfig<T>, toolData: EditToolData): CoreToolbar {
    const subject$ = new Subject<CoreToolbarEvent>();

    return {
      events$: subject$.asObservable(),
      items: [
        {
          label: 'Save',
          icon: 'pi pi-save',
          element: ToolElement.Button,
          command: () => subject$.next({ action: TA.Save }),
          permission: crudConfig.permission.action.edit,
          styleClass: 'p-button-text p-button-primary p-button-sm',
          data: toolData?.[TA.Save]
        },
        {
          label: 'Cancel',
          icon: 'pi pi-times',
          element: ToolElement.Link,
          command: () => crudConfig.path.page.view(toolData[TA.Cancel].getId()),
          permission: crudConfig.permission.action.view,
          styleClass: 'p-button-text p-button-secondary p-button-sm',
          data: toolData?.[TA.Cancel]
        },
      ],
    };
  }

  static view<T>(crudConfig: CrudConfig<T>, toolData: ViewToolData): CoreToolbar {
    const subject$ = new Subject<CoreToolbarEvent>();

    return {
      events$: subject$.asObservable(),
      items: [
        {
          label: 'Edit',
          icon: 'pi pi-pencil',
          element: ToolElement.Link,
          command: () => crudConfig.path.page.edit(toolData[TA.Edit].getId()),
          permission: crudConfig.permission.action.edit,
          styleClass: 'p-button-text p-button-primary p-button-sm',
          data: toolData[TA.Edit]
        },
        {
          label: 'Delete',
          icon: 'pi pi-trash',
          element: ToolElement.Button,
          command: () => subject$.next({ action: TA.Delete }),
          permission: crudConfig.permission.action.delete,
          confirm: 'Are you sure that you want to delete this item?',
          styleClass: 'p-button-text p-button-danger p-button-sm',
          data: toolData[TA.Delete]
        },
        {
          label: 'Refresh',
          icon: 'pi pi-refresh',
          element: ToolElement.Button,
          command: () => subject$.next({ action: TA.Refresh }),
          permission: crudConfig.permission.action.view,
          styleClass: 'p-button-text p-button-secondary p-button-sm',
          data: toolData[TA.Refresh]
        },
        {
          label: 'Back to List',
          icon: 'pi pi-arrow-up',
          element: ToolElement.Link,
          command: () => crudConfig.path.page.list(),
          permission: crudConfig.permission.action.list,
          styleClass: 'p-button-text p-button-secondary p-button-sm',
          data: toolData[TA.Back]
        },
      ],
    };
  }

  static list<T>(crudConfig: CrudConfig<T>, toolData?: ListToolData): CoreToolbar {
    const subject$ = new Subject<CoreToolbarEvent>();

    return {
      events$: subject$.asObservable(),
      items: [
        {
          label: 'Add',
          icon: 'pi pi-plus',
          element: ToolElement.Link,
          command: () => crudConfig.path.page.add(),
          permission: crudConfig.permission.action.add,
          styleClass: 'p-button-text p-button-primary p-button-sm',
          data: toolData?.[TA.Add]
        },
        {
          label: 'Refresh',
          icon: 'pi pi-refresh',
          element: ToolElement.Button,
          command: () => subject$.next({ action: TA.Refresh }),
          permission: 'sample.list',
          styleClass: 'p-button-text p-button-secondary p-button-sm',
          data: toolData?.[TA.Refresh]
        },
      ],
    };
  }

  static tableActions<T>(crudConfig: CrudConfig<T>, actionData?: TableActionData):
    { actions: CoreTableAction[], events$: Observable<CoreToolbarEvent> } {
    const subject$ = new Subject<CoreToolbarEvent>();

    return {
      events$: subject$.asObservable(),
      actions: [
        {
          tooltip: 'View',
          icon: 'pi pi-eye',
          element: ToolElement.Link,
          command: (id: string) => crudConfig.path.page.view(id),
          permission: crudConfig.permission.action.view,
          styleClass: 'p-button-info',
          data: actionData?.[TA.View]
        },
        {
          tooltip: 'Delete',
          icon: 'pi pi-trash',
          element: ToolElement.Button,
          command: (id: string) => subject$.next({ action: TA.Delete, payload: id }),
          permission: crudConfig.permission.action.delete,
          confirm: 'Are you sure that you want to delete this item?',
          styleClass: 'p-button-danger',
          data: actionData?.[TA.Delete]
        }
      ]
    };
  }
}