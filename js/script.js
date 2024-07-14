const speedUp=document.querySelector("#speedUp");
const speendDown=document.querySelector("#speendDown");
const openBtn= document.querySelector("#open-btn");
const  videoInput= document.querySelector(".video-input");
const main=document.querySelector("#main")
const volumeControl=document.querySelector("#rangevolume");
const progressBar=document.querySelector(".progress-bar");
const videoTimeline=document.querySelector(".video-timeline");
const currentVideoTime=document.querySelector(".current-time ")
const videoDuration=document.querySelector(".video-duration ")

const pip=document.querySelector(".pip ")

//toast
const toast=document.querySelector(".toast");

//mute unmute
const unmute=document.querySelector("#unmute");
const mute=document.querySelector("#mute");

unmute.addEventListener("click",()=>{
   unmute.style.display="none";
   mute.style.display="block";
   const video=document.querySelector("video");//select element
   video.muted=true;
   volumeControl.value="0";

})
mute.addEventListener("click",()=>{
   const video=document.querySelector("video");//select element
   mute.style.display="none";
   unmute.style.display="block";
   video.muted=false;
   volumeControl.value="70";
})



speedUp.addEventListener("click",()=>{
   const video=document.querySelector("video");//select element
   if(video==null){ //check if video is present if not return
      return;
   }
   if(video.playbackRate >3){
      return;
   }

   const increaseSpeed=video.playbackRate + 0.5 //speed
   video.playbackRate=increaseSpeed;

   showTost(increaseSpeed + "X");

});

speendDown.addEventListener("click",()=>{
   const video=document.querySelector("video");//select element
   if(video==null){
      return;
   }
   if(video.playbackRate>0){
      const decesedSpeed=video.playbackRate - 0.5;
      video.playbackRate=decesedSpeed;
      showTost(decesedSpeed + "X");
   }
   

})


function showTost(msg){
   toast.textContent=msg;
   toast.style.display ="block";
   setTimeout(()=>{
      toast.style.display ="none";

   },1000);
}


//open file
openBtn.addEventListener("click",()=>{
   videoInput.click();
})



//we will get data in obj
videoInput.addEventListener("change",(obj)=>{
   const mainlogo=document.querySelector(".mainlogo");
   mainlogo.style.display="none";
   const selectedVideo=obj.target.files[0]; //to get file selected
//converting in url format
   const link=URL.createObjectURL(selectedVideo); 
   const video=document.createElement("video");
   video.src=link;
   video.setAttribute("class","video")
   
   main.appendChild(video);


   video.addEventListener("timeupdate",e =>{
      let {currentTime, duration} =e.target;//getting current time and duration of video
      let present =(currentTime/duration) *100; //getting %
      progressBar.style.width=`${present}%`;//passing % as progressbar width

      currentVideoTime.innerText=formatTime(currentTime);
   })

//changing video as per user pointer
   videoTimeline.addEventListener("click",e=>{
      let timelineWidth=videoTimeline.clientWidth;//getting video timeline width
      video.currentTime=(e.offsetX/timelineWidth)* video.duration;
   })
video.addEventListener("loadeddata",(e)=>{
   videoDuration.innerText=formatTime(e.target.duration);//passing video duration
})


   //volume changing 
   volumeControl.addEventListener("input",()=>{
      video.volume=volumeControl.value/100;
         
     });
     
     //pip
     pip.addEventListener("click",()=>{
      video.requestPictureInPicture();
     })
      
   
   
});
const formatTime=time=>{
   //getting sec,min,hours
   let seconds=Math.floor(time%60);
   let minute=Math.floor(time/60)%60;
   let hours=Math.floor(time/3600);
   //adding 0 at the begining if the value is less than 10
   seconds=seconds < 10 ? `0${seconds}`:seconds;
   minute=minute <10 ? `0${minute}` :minute;
   hours=hours <10 ? `0${hours}`:hours;

   if(hours == 0){
      return `${minute}:${seconds}`;
   }
   return  `${hours}:${minute}:${seconds}`;
}

//fullScreen
const fullScreen=document.querySelector("#fullscreen");
fullScreen.addEventListener("click",()=>{
   const video=document.querySelector("video");//select element
   video.requestFullscreen();
})

//play
const play=document.querySelector("#play");
play.addEventListener("click",()=>{
   const video=document.querySelector("video");//select element
   play.style.display="none";
   pause.style.display="block";
   video.play();

})
//pause
const pause=document.querySelector("#pause");
pause.addEventListener("click",()=>{
   const video=document.querySelector("video");//select element
   pause.style.display="none";
   play.style.display="block";
   video.pause();

})

function playPause(){
   const video=document.querySelector("video");//select element
   if(video.paused){
      video.play();
      play.style.display="none";
   pause.style.display="block";
   }else{
      video.pause();
      pause.style.display="none";
   play.style.display="block";
   }
}





