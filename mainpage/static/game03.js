
/////계산 함수들/////
//스탯 계산 함수 : 스피드와 스테미너를 받아서, 전진 최소, 최대 거리반환
function stat(speed, stamina){
    let statArr = [(speed+stamina)/2, speed+stamina];
    return statArr
}

//배당 개산 함수 : 스피드, 스테미너와 집중력을 받아서, 배당을 반환
//300을 능력치 총합이 한계치로 정한다.
//능력치 총합을 300에 빼고, 100으로 나눈후, 1을 더해 배당을 부여한다.
function allocation(speed, stamina, concentration){
    let alloc = ((300 - (speed+stamina+concentration))/100) + 1;
    return alloc
}

//순위 정렬, 출력 함수
function rankFunc(rankData){
    let rank = rankData;
    rank.sort((a, b) => { //[트랙번호, 좌표] : 좌표로 내림차순
        if (a[1] === b[1]) {
          return b[0] - a[0]
        } else {
          return b[1] - a[1]
        }
    })
    // console.log('1등 ; ', rank[0][0])
    // console.log('2등 ; ', rank[1][0])
    // console.log('3등 ; ', rank[2][0])
    // console.log('4등 ; ', rank[3][0])
    // console.log('5등 ; ', rank[4][0])
    // console.log('6등 ; ', rank[5][0])

    //전광판
    let first = document.querySelector('.first');
    let second = document.querySelector('.second');
    let third = document.querySelector('.third');
    if(cnt < 1){
        first.innerText = '1등 : ' + horseInfo[rank[0][0] - 1][1];
    }
    if(cnt < 2){
        second.innerText = '2등 : ' + horseInfo[rank[1][0] -1][1];
    }
    if(cnt < 3){
        third.innerText = '3등 : ' + horseInfo[rank[2][0] -1][1];;
    }

    for(let i = 0; i < 6; i++){
        if(rank[i][1] >finishPos){ //만약 대상 말의 좌표가 결승점을 넘었으며
            if(final.length == 0){  //처음 들어온 것이라면
                final.push(rank[i][0]) //대상말의 트랙번호를 추가
                cnt += 1
            }else{                     // 처음 들어온 것이 아니라면
                if(final.indexOf(rank[i][0]) == -1){ //대상이 이전에 들어온것인지 확인
                    final.push(rank[i][0])    //이전에 들어온게 아니면 삽입
                    cnt += 1
                }
            }

        }
    }



}


/////이벤트 정보 받아오기/////
//임의로 4개의 이벤트 설정

let eventArr = [];
for(let i=0; i<4; i++){
    let event = [event_data[i].event_name, event_data[i].event_num]
    eventArr.push(event);
}
// let eventArr = [
//     ['다리 삠', -1],
//     ['탄력받음', 1],
//     ['당황함', -1],
//     ['지침', -1],
// ]

//딕션어리로 해보자 - 인덱스 없어서 함수에서 문제 발생 (걍 사용 변수에 말, 이벤트명, 값 다 넣었다.)
// let eventArr = {
//     '다리 삠' : -40,
//     '탄력받음': 40,
//     '당황함': -20,
//     '지침': -10,
// }

//이벤트 관련 변수
let selectedE = []
let selectedH = []
let selectedEvent = []
let selectedEvent1 = []
let selectedEvent2 = []
let firstEvent = false;
let secondEvent = false;

let eventStat = [0, 0, 0, 0, 0, 0];

//중복 안되게 선택하기
for (i=0; i<4; i++) {
    randomNum = Math.floor(Math.random() * eventArr.length)
    if (selectedE.indexOf(randomNum) === -1) {
        selectedE.push(randomNum)
    } else {
        i--
    }
}
for (i=0; i<4; i++) {
    randomNum = Math.floor(Math.random() * 6)
    if (selectedH.indexOf(randomNum) === -1) {
        selectedH.push(randomNum)
    } else {
      i--
    }
}
for(let i = 0; i < 4; i++){
    selectedEvent[i] = [selectedH[i], eventArr[selectedE[i]][0], eventArr[selectedE[i]][1]]
}

// console.log("selectedEvent : ",selectedEvent)

selectedEvent1 = selectedEvent.slice(0,2)
selectedEvent2 = selectedEvent.slice(2,4)

// console.log(selectedEvent1)
// console.log(selectedEvent2)



/////말 정보 받아오기/////
//데이터 베이스 말정보

let horseDB = []
for(let i=0; i<6; i++){
    let horse = [horse_data[i].horse_name, horse_data[i].win_count, horse_data[i].race_count, horse_data[i].stat_str, horse_data[i].stat_end, horse_data[i].stat_con]
    horseDB.push(horse)
}
console.log(horseDB)


// let horseDB = [
//     ['빨강', 5, 10, 25, 20, 1.5],
//     ['노랑', 5, 10, 20, 20, 1.2],
//     ['초록', 5, 10, 30, 20, 1.6],
//     ['파랑', 5, 10, 15, 30, 1.1],
//     ['보라', 5, 10, 20, 20, 1.0],
//     ['검은', 5, 10, 30, 25, 3]
// ]

//게임 구동에 필요한 정보만 빼낸 말정보 : 말이름, 능력치(스피드, 스테미너 통해 구한)
// [ [트랙번호, 말이름, [최소, 최대]], ... ]
let horseInfo = [];
for(let i = 0; i < 6; i++){
    horseInfo[i] = [i+1, horseDB[i][0], stat(horseDB[i][3],horseDB[i][4]),horseDB[i][5]];
}

function myHorse(name){
    let className;

    for(let i = 0; i < 6; i++){
        if(horseInfo[i][1] == name){
            className = ".H" + String(i+1);
        }
    }

    let callClass = document.querySelector(className);
    callClass.style.border = "2px solid red"

}
myHorse(myhorse_name);

/////배당 정보/////
//이건 나중에 처리하도록






/////변수들/////
//말들의 x좌표 [트랙 번호, x좌표] : 경주용
let HPos = [
    [horseDB[0][0], 0],
    [horseDB[1][0], 0],
    [horseDB[2][0], 0],
    [horseDB[3][0], 0],
    [horseDB[4][0], 0],
    [horseDB[5][0], 0]
];

//등수 정보 : 등수 계산용
let horsePos = [];

//최종 등수 : 결과 전달용
let final = [];

//경기 종료 함수 : 6마리 다 들어면 cnt == 6 으로 확인
let cnt = 0;

//결승점 좌표
let finishPos = document.querySelector(".finishLineSystem").getBoundingClientRect().left


//시간
let start = new Date()

/////결과 출력 함수/////
//final 변수(트랙번호가 순위순으로 저장된 변수), 이전 페이지에서 선택한 말 이름 데이터
// function finalData(final, selectHorseData){
//     const finalNameData = [];
//     for(let i = 0; i < 6; i++){
//         finalNameData[i] = horseInfo[final[i]][1];
//     }
//     let result = '{"1": '+ finalNameData[O] +', "2": '+ finalNameData[1] +', "3": '+ finalNameData[2] +', "4": '+ finalNameData[3] +', "5": '+ finalNameData[4] +', "6": '+ finalNameData[5]+
//     return(result) // {{"1":"finalNameData[0]"}}
// }


/////동작 부분/////
gsap.to(".horse",{
    //이 부분이 x 좌표를 누적 시키는 부분
    //여기서 말이동에 관하여 일괄처리를 통해서 객체간 타임라인 차이를 줄인다.
    //if 문을 통해서 말별 다른 return 값을 부여 : 이벤트 객체(여기서 ev)를 이용한다.
    //클래스명 horse 인 애들이 틱마다 html 문에 쓰인 순서대로 적용 되므로 ev = [0,1,2,3,4,5] 상태 인것이다.
    //return 값이   "+=" + '10'  꼴이면 동작 하는 거임(문자열 형태, "+=" 을 통해 값 누적)
    //random(최소,최대)
    x:function(ev){
        // console.log(ev) // 확인용
        if(ev == 0){
            // console.log('HPos :', HPos) //확인용
            //딜레이로 인해 여기서 순위 관련 작업 진행
            // rankFunc(HPos); // << 함수 적용시 아예 동작안함
            // console.log(horseInfo[0][2][0])
            let HPos1 = gsap.utils.random(horseInfo[0][2][0]+eventStat[0],horseInfo[0][2][1]+eventStat[0])
            HPos[0][1] = HPos[0][1] + HPos1
            horsePos[0] = [1, HPos[0][1]]
            // console.log(horsePos)
            return HPos[0][1]
        }else if(ev == 1){
            let HPos2 = gsap.utils.random(horseInfo[1][2][0]+eventStat[1],horseInfo[1][2][1]+eventStat[1])
            HPos[1][1] = HPos[1][1] + HPos2
            horsePos[1] = [2, HPos[1][1]]
            return HPos[1][1]
        }else if(ev == 2){
            let HPos3 = gsap.utils.random(horseInfo[2][2][0]+eventStat[2],horseInfo[2][2][1]+eventStat[2])
            HPos[2][1] = HPos[2][1] + HPos3
            horsePos[2] = [3, HPos[2][1]]
            return HPos[2][1]
        }else if(ev == 3){
            let HPos4 = gsap.utils.random(horseInfo[3][2][0]+eventStat[3],horseInfo[3][2][1]+eventStat[3])
            HPos[3][1] = HPos[3][1] + HPos4
            horsePos[3] = [4, HPos[3][1]]
            return HPos[3][1]
        }else if(ev == 4){
            let HPos5 = gsap.utils.random(horseInfo[4][2][0]+eventStat[4],horseInfo[4][2][1]+eventStat[4])
            HPos[4][1] = HPos[4][1] + HPos5
            horsePos[4] = [5, HPos[4][1]]
            return HPos[4][1]
        }else if(ev == 5){
            let HPos6 = gsap.utils.random(horseInfo[5][2][0]+eventStat[5],horseInfo[5][2][1]+eventStat[5])
            HPos[5][1] = HPos[5][1] + HPos6
            horsePos[5] = [6, HPos[5][1]]
            return HPos[5][1]
        }
    },
    /////경기 설정/////
    duration:.2,       //얘로 속도 진행속도 조절(0.5 정도가 기본인듯)
    delay: 1,
    repeat:-1,          //이것만 있으면 같은 수로만 반복(-1 이면 계속반복)
    repeatRefresh:true, // 매번 새로운 값으로




    /////객체의 동작에 대한 함수/////
    onUpdate: function(){

        finishPos = document.querySelector(".finishLineSystem").getBoundingClientRect().left


        //전광판 함수동작
        rankFunc(horsePos)

        //종료시 작동 부분
        if(cnt == 6){
            // alert(final)
            // [1,2,3,4]
            final = JSON.stringify(final)
            // console.log(typeof(final))

            window.location.href = '/horserun/game_end_session?context=' + final;
            cnt = 7
            // window.location.href = 'https://www.naver.com';
        }


        /////////////////////추가적용해보기
        //이벤트 종류에 따라 집중력 영향 다르게
        //0을 기준으로 양수, 음수 비교하여
        //양수는 곱하기
        //음수는 나누기

        // 이벤트
        this.targets().forEach(function(el){
            //3분의 1 지점
            if(gsap.getProperty(el, "x") > finishPos/3 && firstEvent == false){
                // 이벤트 [말, 이벤트명, 값] - selectedEvent1
                // console.log("selectedEvent1 : ", selectedEvent1 )
                let ev01 =document.querySelector(".event01")
                eventStat[selectedEvent1[0][0]] = (selectedEvent1[0][2]/10)*horseInfo[selectedEvent1[0][0]][3]
                ev01.innerText = horseInfo[selectedEvent1[0][0]][1]+ " : " + selectedEvent1[0][1];

                let ev02 =document.querySelector(".event02")
                eventStat[selectedEvent1[1][0]] = (selectedEvent1[1][2]/10)*horseInfo[selectedEvent1[1][0]][3]
                ev02.innerText = horseInfo[selectedEvent1[1][0]][1]+ " : " + selectedEvent1[1][1];

                firstEvent = true; //첫말 들어왔을 때만 적용하기 위해
            }

            if(gsap.getProperty(el, "x") > (finishPos*2)/3 && secondEvent == false){
                // 이벤트 [말, 이벤트명, 값]
                // console.log("selectedEvent2 : ", selectedEvent2 )
                let ev03 =document.querySelector(".event03")
                eventStat[selectedEvent2[0][0]] = (selectedEvent2[0][2]/10)*horseInfo[selectedEvent2[0][0]][3]
                ev03.innerText = horseInfo[selectedEvent2[0][0]][1]+ " : " + selectedEvent2[0][1];

                let ev04 =document.querySelector(".event04")
                eventStat[selectedEvent2[1][0]] = (selectedEvent2[1][2]/10  )*horseInfo[selectedEvent2[1][0]][3]
                ev04.innerText = horseInfo[selectedEvent2[1][0]][1]+ " : " + selectedEvent2[1][1];

                secondEvent = true; //첫말 들어왔을 때만 적용하기 위해
            }
        })

        /////시간/////
        let end = new Date();  // 종료


        // document.write(end - start); // 경과시간(밀리초)
        let time = document.querySelector(".time");
        time.innerText = Math.floor((end - start)/1000) + "초"

    }
})

