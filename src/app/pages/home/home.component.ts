import { Component, OnInit } from '@angular/core';
import data from "../../../assets/data/quizzes.json"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  quizzes = data.quizzes

  constructor() { }

  ngOnInit(): void {
  }

}
