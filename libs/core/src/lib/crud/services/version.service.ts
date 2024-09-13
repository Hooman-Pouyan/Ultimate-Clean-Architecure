import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class VersionService {
  public packageJsonUrl = "node_modules/@Clean-arch/core/assets/package.json";

  constructor(private http: HttpClient) {}

  getPackageInfo(): Observable<any> {
    return this.http.get(this.packageJsonUrl);
  }
}
