var a = [],l = 45,p = undefined

function uh(){
    a = [];
    for(var i = 1; i < l+1; i++){
        a.push(new Audio('./kowai-neko-rin-nya/'+i+'.wav'))
    }
}

function nya(){
    if(p != undefined) {
        a[p].pause();
        a[p].currentTime = 0;
    }
    p = Math.floor(Math.random()*l-1)+1;
    a[p].play();
}