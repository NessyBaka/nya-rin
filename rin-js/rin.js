a=[],l=45,p=undefined,c=undefined,r={
    s:function(){
        a = [];
        for(var i = 1; i < l+1; i++){
            a.push(new Audio('./rin-a/'+i+'.ogg'))
        }
    },
    n:function(){
        if(p != undefined) {
            a[p].pause();
            a[p].currentTime = 0;
        }
        p = c;
        while(c==p){
            c = Math.floor(Math.random()*(l-1))+1;
        }
        a[c].play();
    }
}
r.s();