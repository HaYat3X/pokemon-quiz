import { DataService } from './../../shared/data.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
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
  })

  answer1!: string
  answer2!: string
  answer3!: string
  answer4!: string

  answerData: any



  constructor(
    private fb:FormBuilder,
    private dataService:DataService,
    ){
      this.data = this.dataService.import()
    }

  ngOnInit(): void {


    // // 正解取得
    // let answerId: number = this.getRandomId()

    // // 選択肢取得
    // let choice1!: number
    // let choice2!: number
    // let choice3!: number
    // let i: number = 0

    // while (i >= 0) {
    //   let randomId1 = this.getRandomId()
    //   let randomId2 = this.getRandomId()
    //   let randomId3 = this.getRandomId()

    //   // 選択肢1
    //   if (randomId1 == answerId || choice1 ) {
    //     break
    //   }
    //   choice1 = randomId1

    //   // 選択肢2
    //   if (randomId2 == (answerId | choice1)) {
    //     break
    //   }
    //   choice2 = randomId2

    //   // 選択肢3
    //   if (randomId3 == (answerId | choice1| choice2)) {
    //     break
    //   }
    //   choice3 = randomId3
    // }

    // let answerList = [
    //   this.pokemonList[choice1]['name'],
    //   this.pokemonList[choice2]['name'],
    //   this.pokemonList[choice3]['name'],
    //   this.pokemonList[answerId]['name']
    // ]
    // answerList.sort(() => Math.random() - 0.5)


    this.data.subscribe(json => {
      // console.log(json)
      this.pokemonList = json
      // console.log(this.pokemonList)
      // 正解取得
      let answerId: number = this.getRandomId2(-1, -1, -1)
      this.answerData = this.pokemonList[answerId - 1]

      //選択肢1用のIDを取得
      //  上記がanswerIdと被っていないことをチェック
      let randomId1 = this.getRandomId2(answerId, -1, -1)
      // 選択肢2用のIDを取得
      //  上記がanswerIdとchoice1と被っていないことをチェック
      let randomId2 = this.getRandomId2(answerId, randomId1, -1)
      // 選択肢3用のIDを取得
      //  上記がanswerIdとchoice1とchoice2と被ってないことをチェック
      //       while (i >= 0) {
      let randomId3 = this.getRandomId2(answerId, randomId1, randomId2)


      //   // 選択肢1
      //   if (randomId1 == answerId || choice1 ) {
      //     break
      //   }
      //   choice1 = randomId1
      //   // 選択肢2
      //   if (randomId2 == (answerId || choice1)) {
      //     break
      //   }
      //   choice2 = randomId2

      //   // 選択肢3
      //   if (randomId3 == (answerId || choice1 || choice2)) {
      //     break
      //   }
      //   choice3 = randomId3
      // }
      // console.log(randomId1, randomId2, randomId3, answerId)
      // console.log(this.pokemonList[answerId - 1]["name"])



      let answerList = [
      this.pokemonList[answerId - 1]["name"],
      this.pokemonList[randomId1 - 1]["name"],
      this.pokemonList[randomId2 - 1]["name"],
      this.pokemonList[randomId3 - 1]["name"]
      ]
      answerList.sort(() => Math.random() - 0.5)
      console.log(answerList[0])
      console.log(answerList[1])
      console.log(answerList[2])
      console.log(answerList[3])
      this.answer1 = answerList[0]
      this.answer2 = answerList[1]
      this.answer3 = answerList[2]
      this.answer4 = answerList[3]



      this.myForm.get("question")?.setValue("このポケモンの名前はなんでしょうか？")

      this.myForm.patchValue({
        hint1:this.answerData['number'],
        hint2:this.answerData['type'],
        hint3:this.answerData['Characteristic'],
        // dummy1:answerList[0],
        // dummy2:answerList[1],
        // dummy3:answerList[2],
        // answer:answerList[3]
    })
  })
}

getRandomId(){
  return Math.floor( Math.random() * this.pokemonList.length + 1)
}

getRandomId2(answerId: number, choice1: number, choice2: number):any{
  let random1 = choice1
  let random2 = choice2
  console.log("getRandomId2 start");
  // answerIdを取りたいとき
  if(answerId == -1) {
    console.log("## get answerId");
    return Math.floor( Math.random() * this.pokemonList.length + 1)
  }
  //choice1を取りたいとき
  else if(answerId && random1 == -1) {
    console.log("## get random1 ::answerId=" + answerId + " random1=" + random1);
    random1 = Math.floor( Math.random() * this.pokemonList.length + 1)
    console.log("## get2 random1 ::random1=" + random1);
    if (answerId == random1) {
      console.log("### retry random1");
      return this.getRandomId2(answerId, -1, -1)
    } else {
      return random1
    }
  }
  //choice2を取りたいとき
  else if(answerId && random1 && random2 == -1) {
    console.log("## get random2 ::answerId=" + answerId + " random1=" + random1 + " random2=" + random2);
    random2 = Math.floor( Math.random() * this.pokemonList.length + 1)
    console.log("## get2 random2 ::random2=" + random2);
    if (answerId == random2 || random1 == random2) {
      console.log("### retry random2");
      return this.getRandomId2(answerId, random1, -1)
    } else {
      return random2
    }
  }
  //choice3を取りたいとき
  else if(answerId && random1 && random2){
    console.log("## get choice3 ::answerId=" + answerId + " random1=" + random1 + " random2=" + random2);
    let choice3 =  Math.floor( Math.random() * this.pokemonList.length + 1)
    console.log("## get2 choice3 ::choice3=" + choice3);
    if (answerId == choice3 || random1 == choice3 || random2 == choice3) {
      console.log("### retry choice3");
      return this.getRandomId2(answerId, random1, random2)
    } else {
      return choice3
    }
  }
  return -1
}

register(answer : string) {
  if(answer == this.answerData['name']) {
    window.alert("正解");
    window.location.reload();
  }else{
    window.alert('不正解');
    window.location.reload();
  }
}
}
