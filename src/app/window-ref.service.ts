import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser,DOCUMENT } from '@angular/common';
import { ReplaySubject, Observable, forkJoin } from 'rxjs';

function _window(): any {
  // return the global native browser window object
  return window;
}

@Injectable({
  providedIn: 'root'
})
export class WindowRefService {
  private _loadedLibraries: { [url: string]: ReplaySubject<any> } = {};
  constructor(@Inject(DOCUMENT) private readonly document: any) { }
  lazyLoadLibrary(resourceURL:any): Observable<any> {
    return forkJoin([
        this.loadScript(resourceURL)
    ]);
}

private loadScript(url: string): Observable<any> {
    if (this._loadedLibraries[url]) {
        return this._loadedLibraries[url].asObservable();
    }

    this._loadedLibraries[url] = new ReplaySubject();

    const script = this.document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = url;
    script.onload = () => {
        this._loadedLibraries[url].next();
        this._loadedLibraries[url].complete();
    };

    this.document.body.appendChild(script);
    return this._loadedLibraries[url].asObservable();
}

}
