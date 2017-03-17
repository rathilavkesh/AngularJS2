import {Injectable} from '@angular/core'
import {Http} from "@angular/http";
import {Hero} from "../../common/domain/hero";
import {Observable} from "rxjs/Observable";

import 'rxjs/add/operator/map';

@Injectable()
export class HeroSearchService {

  private heroesUrl = 'api/heroes';

  constructor(private http: Http) {
  }

  search(term: String): Observable<Hero[]> {
    return this.http.get(`${this.heroesUrl}?name=${term}`)
      .map(response => response.json().data as Hero[]);
  }
}
