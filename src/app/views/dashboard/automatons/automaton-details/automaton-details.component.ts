import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { switchMap} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-automaton-details',
  templateUrl: './automaton-details.component.html',
  styleUrls: ['./automaton-details.component.less']
})
export class AutomatonDetailsComponent implements OnInit {

  automaton$: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private firestore: AngularFirestore
  ) { }

  ngOnInit() {
    console.log('ngOnInit()');
    this.automaton$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        console.log('ParamMap');
        console.log(params);
        return this.firestore.doc(`/automatons/${params.get('id')}`).valueChanges();
      })
    );
  }

}