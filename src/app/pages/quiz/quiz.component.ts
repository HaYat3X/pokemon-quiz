import { DataService } from './../../shared/data.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  data:Observable<Object>
  pokemonList:any



  myForm:FormGroup = this.fb.group({
    question: [null],
    hint1: [null],
    hint2: [null],
    hint3: [null],
    dummy1:[null],
    dummy2:[null],
    dummy3:[null],
    answer:[null],
    // randomAnswer:[null]
  })

  constructor(
    private fb:FormBuilder,
    private dataService:DataService
    ){
      this.data = this.dataService.import()
    }

  ngOnInit(): void {
    // 正解取得
    let answerId: number = this.getRandomId()

    // 選択肢取得
    let choice1!: number
    let choice2!: number
    let choice3!: number
    let i: number = 0

    while (i >= 0) {
      let randomId1 = this.getRandomId()
      let randomId2 = this.getRandomId()
      let randomId3 = this.getRandomId()

      // 選択肢1
      if (randomId1 == answerId || choice1 ) {
        break
      }
      choice1 = randomId1

      // 選択肢2
      if (randomId2 == (answerId | choice1)) {
        break
      }
      choice2 = randomId2

      // 選択肢3
      if (randomId3 == (answerId | choice1| choice2)) {
        break
      }
      choice3 = randomId3
    }

    let answerList = [
      this.pokemonList[choice1]['name'],
      this.pokemonList[choice2]['name'],
      this.pokemonList[choice3]['name'],
      this.pokemonList[answerId]['name']
    ]
    answerList.sort(() => Math.random() - 0.5)


    this.data.subscribe(json => {
      // console.log(json)
      this.pokemonList = json

      // console.log(this.pokemonList)
      this.myForm.get("question")?.setValue("このポケモンの名前はなんでしょうか？")
      this.myForm.patchValue({
        hint1:this.pokemonList [answerId]['number'],
        hint2:this.pokemonList[answerId]['type'],
        hint3:this.pokemonList[answerId]['Characteristic'],
        dummy1:answerList[0],
        dummy2:answerList[1],
        dummy3:answerList[2],
        answer:answerList[3]
    })
    })
  }
  // 仮
  getRandomId2(){
    return Math.floor( Math.random() * this.pokemonList.length + 1)
  }

  getRandomId(){
    return Math.floor( Math.random() * this.pokemonList.length + 1)
  }

}
