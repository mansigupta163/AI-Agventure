import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { StatsData } from './stats-data';
import { IBusy } from './app';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  protected apiURL: string = 'http://pythontoolchain-20210617080845201-forgiving-fox.us-east.mybluemix/';
  private readonly REQUEST_HEADERS = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
  private readonly REQUEST_OPTIONS = { headers: this.REQUEST_HEADERS };
  private busy: Subject<IBusy>;

  public response: StatsData[];

  constructor(private http: HttpClient) { }

  public setBusy(busy: Promise<any> | Observable<any>, message?: string, fullScreen: boolean = true): void {
    const busyState: IBusy = {
      busy: busy,
      message: (message ? message : 'Please wait...'),
      fullScreen: fullScreen
    };
    this.busy.next(busyState);

  }

  public getData() {
    return this.http.get<StatsData[]>(`${this.apiURL}/crop_recommend_loc`, this.REQUEST_OPTIONS);
  }

  public getIrrigationData() {
    return this.http.get<StatsData[]>(`${this.apiURL}/irrigation_pattern`, this.REQUEST_OPTIONS);
  }
}