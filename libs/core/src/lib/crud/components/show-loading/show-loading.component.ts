import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: '[showLoading]',
  templateUrl: './show-loading.component.html',
  styleUrls: ['./show-loading.component.scss']
})
export class ShowLoadingComponent {
  @HostBinding('class.show-loading') enabled = false;

  private _showLoading = false;
  @Input()
  set showLoading(showLoading: boolean) {
   this._showLoading = showLoading;
   this.enabled = showLoading;
  }
  get showLoading() {
    return this._showLoading;
  }
}
