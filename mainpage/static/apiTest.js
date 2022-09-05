
function rank_list(){
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if(xhr.readyState === XMLHttpRequest.DONE){
            if(xhr.status === 200){
                let result = xhr.response;
                result.sort(function(a, b){
                    return b.win_count - a.win_count // 우승 횟수로 내림차순 정렬
                });
                for(let i = 0; i < 3; i++){
                    document.getElementById('name'+ i).innerText = JSON.stringify(result[i].horse_name);
                    document.getElementById('win'+ i).innerText = JSON.stringify(result[i].win_count);
                    document.getElementById('race'+ i).innerText = JSON.stringify(result[i].race_count);
                    document.getElementById('rate'+ i).innerText = Math.round(JSON.stringify(result[i].win_count/result[i].race_count*100)) +'%';
                }
            } else {
                alert('bad Request!');
            }
        }
    }

    xhr.open('GET','http://127.0.0.1:8000/api/rank');
    xhr.responseType = 'json';
    xhr.send();
}


function set_rank_list(){
    setInterval(rank_list, 3000);
    console.log('load!');
}
set_rank_list();


function parse_cookies() {
    var cookies = {};
    if (document.cookie && document.cookie !== '') {
        document.cookie.split(';').forEach(function (c) {
            var m = c.trim().match(/(\w+)=(.*)/);
            if(m !== undefined) {
                cookies[m[1]] = decodeURIComponent(m[2]);
            }
        });
    }
    return cookies;
}


// let plusBtn = document.getElementById('plusBtn');

// plusBtn.addEventListener('click', function () {
// plusBtn.addEventListener('click', function (request, pk) {

    // var cookies = parse_cookies();
    // let xhr = new XMLHttpRequest();
    // xhr.onreadystatechange = () => {
    //     if(xhr.readyState === XMLHttpRequest.DONE){
    //         if(xhr.status === 200){
    //             // let result = JSON.stringify(xhr.response);
    //             let result = xhr.response;
    //             win_count = result.win_count;
    //             race_count = result.race_count;
    //             console.log(result, '<- this is result');
    //             console.log(win_count, race_count, '<- this is counts!');
    //             // result.
    //         } else {
    //             alert('bad Request!');
    //         }
    //     }
    // }

    // var testobj = new Object();
    // testobj.win_count = win_count + 1;
    // testobj.race_count = race_count + 1;
    // xhr.open('PATCH','http://127.0.0.1:8000/api/raceHorse/1/');
    // xhr.setRequestHeader('X-CSRFToken', cookies['csrftoken']);
    // xhr.responseType = 'json';
    // xhr.withCredentials = true;
    // xhr.setRequestHeader('Content-Type', 'application/json');
    // xhr.send(JSON.stringify(testobj));
    
    // raceHorse = RaceHorse.objects.get(pk=pk)
    // raceHorse.win_count = raceHorse.win_count + 1
    // raceHorse.race_count = raceHorse.race_count + 1
    // log.console(raceHorse.win_count)
    // log.console(raceHorse.race_count)
    // raceHorse.save()
    // return redirect('raceHorse/')

// }, false);