"use strict";//yes

var
    a=[],//    Array with audio-nya files that can be played
    n=45,//    Sound files count, because we can't count them on the fly
    p=null,//  Previous sound file
    c=null,//  Current sound file
    wp=false,//Does browser support WebP?
    ie=false,//User is on IE?
    /* Functions */
    r={
        n:function(){
            /*
                n - "new files"
                Loads all audio files
                TODO:load mp3 if *ie* is true
            */
            a = [];//   Clearing array with files (just in case if there's sounds in array(?))
            for(var i = 1; i < n+1; i++){
                a.push(new Audio('./rin-a/'+i+'.wav'))//    Pushing to audio array all n files from dir at root/rin-a/
            }
        },
        p:function(){
            /*
                p - "play"
                Stops previous playing sound and plays a new random nya sound
            */
            if(ie){
                alert("Probably your browser is Internet Explorer or Safari\nUnfortunately, both of them doesn't support .ogg files so we can't play sounds here :(\n\nP.S. Try another browser, ie sucks, oh well I'll swap ogg to mp3 later :P");
                return;//   Alert user if their browser sucks (sorry safari users ;w;)
            }

            if(c !== null) {
                a[c].pause();// Pausing current sound if playing ...
                a[c].currentTime = 0;// ... and setting their playback time to 0
            }

            if(n > 1){//    Check if there's more than 1 file to randomize
                p = c;//    Setting previous sound to current
                while(c === p){
                    /* Trying to get a random sound till the previous file will not equal current file */
                    c = Math.floor(Math.random()*(n - 1)) + 1;//    +1 at end exist cause file names count starts from 1
                }
            }

            a[c].play().catch(function (reason) { Console.error(reason) });//    Setting catch statement and start playing nya-sound
        },
        w:function () {
            /*
                w - "WebP support"
                Checks if browser support webp.
                TODO: Load webp first (load a html with webp images > if browser doesn't support it load alt versions)
            */
            var ti = new Image();// Creating a dummy image

            ti.onload = function () {
                wp = ti.height > 0 && ti.width > 0;//   Checks if a image has more than 0 pixels
                r.b();//    Next step is blur-support
            };//    If image is loaded
            ti.onerror = function () { wp=false; r.b(); };//    Set wp to false and call r.b() if an image isn't loaded

            ti.src = "/rin-res/test.webp";//  Loading a image from web
        },
        b:function (){
            /*
                b - "blur-filter support"
                Checks if there's a blur-filter support and sets non-blurred background with blur-filter is browser supports it,
            */
            /*
                This thing bellow checks if browser supports CSS object.
                Most of popular browsers supports this object (except Safari, but I need to test it first)
                ref: https://developer.mozilla.org/en-US/docs/Web/API/CSS/supports
                reference is linked to CSS.support() because that's the method I will use to check for blur-filter support
            */
            ie = typeof CSS === "undefined";//  Btw, it's not the accurate method to check if browser is IE

            if(ie)
                console.warn("Probably your browser is IE or Safari, so blur-filter is not supported and so OGG file format :(\nYou need to change browser to use this site properly!");
            else if(CSS.supports("filter","blur(24px)")){//  Checking if browser supports blur
                document.getElementById("background-"+(wp?"webp":"jpeg")).setAttribute("srcset", "rin-res/background."+(wp?"webp":"jpg"));//    sets non-blurred image
                document.getElementById("background-source").setAttribute("style", "filter:blur(25px)");//  Sets blur-filter
            }else
                console.warn("Oh well, your browser doesn't support blur-filter, no worries because background is already blurred ;)");
        }
};

r.w();//    Firstly, check if browser supports webp
r.n();//    Then start this bad(neko) boy(girl)