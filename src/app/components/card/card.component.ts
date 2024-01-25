import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input()
  id:number=0
  @Input()
  image:string|null=""
  @Input()
  title:string=""
  @Input()
  description:string=""

  constructor() { }

  ngOnInit(): void {
  }

}
