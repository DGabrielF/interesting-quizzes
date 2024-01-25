import { Component, OnInit } from '@angular/core';
import data from "../../../assets/data/quizzes.json"
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {
  private id:number|null = 0
  title:string = ""

  questions:any
  questionSelected:any
  questionIndex:number=0
  questionMaxIndex:number=0

  answers:string[]=[]
  answerSelected:string=""

  finished:boolean=false

  quizzResult:any

  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( value => {
      this.id = Number(value.get("id"))
    })
    this.setValuesOfQuizz(this.id);
  }

  setValuesOfQuizz(id:number|null) {
    const result = data.quizzes.find(quizz => quizz.id === this.id)
    console.log(result)
    if (result) {
      this.finished = false
      this.title = result.title
      this.questions = result.questions
      this.questionIndex = 0
      this.questionMaxIndex = this.questions.length
      this.questionSelected = this.questions[this.questionIndex]
      this.quizzResult = result.results
    }
  }

  playerChoose(value:string) {
    this.answers.push(value)
    this.nextStep()
  }

  async nextStep() {
    this.questionIndex +=1;
    if( this.questionIndex < this.questionMaxIndex){
      this.questionSelected = this.questions[this.questionIndex]
    } else {
      const finalAnswer:string = await this.checkResult(this.answers)
      this.finished = true
      this.answerSelected  = this.quizzResult[finalAnswer]
    }
  }

  async checkResult(answers:string[]){
    const result = answers.reduce((previous, current, i, arr)=>{
      if(arr.filter(item => item === previous).length > arr.filter(item => item === current).length){
        return previous
      }else{
        return current
      }
    })
    return result
  }
}
