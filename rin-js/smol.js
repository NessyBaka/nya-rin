a=[],l=45,p=null,c=null,r={s:function(){a=[];for(var i=1;i<l+1;i++){a.push(new Audio('./kowai-neko-rin-nya/'+i+'.wav'))}},n:function(){if(p!=null){a[p].pause();a[p].currentTime=0}
while(c===p){c=Math.floor(Math.random()*l-1)+1}
a[c].play();p=c}}