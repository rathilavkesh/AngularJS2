import {Component, OnInit} from "@angular/core";
import {HeroSearchService} from "../service/hero-search.service";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {Hero} from "../../common/domain/hero";
import {Router} from "@angular/router";
import "rxjs/add/observable/of";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  moduleId: module.id,
  selector: 'hero-search',
  templateUrl: '../../hero/view/hero-search.component.html',
  styleUrls: ['../styles/hero-search.component.css'],
  providers: [HeroSearchService],
})
export class HeroSearchComponent implements OnInit {
  heroes: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(private heroSearchService: HeroSearchService,
              private router: Router) {
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.heroes = this.searchTerms
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term
        ? this.heroSearchService.search(term)
        : Observable.of<Hero[]>([]))
      .catch(error => {
        console.log(error);
        return Observable.of<Hero[]>([]);
      });
  }

  gotoDetail(hero: Hero): void {
    let link = ['/detail', hero.id];
    this.router.navigate(link);
  }
}
