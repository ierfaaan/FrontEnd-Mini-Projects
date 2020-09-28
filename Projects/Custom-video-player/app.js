const videoWrapper = document.querySelector('.video-wrapper')
const video = document.querySelector('.video-wrapper__video')
video.volume = 0.8
//Play Button Fixed
const playBtn = document.querySelector('.play')
playBtn.addEventListener('click',function(){
  if (video.paused) {
    video.play()
    this.name = "pause-outline";
  }else{
    video.pause()
    this.name = "play-outline";
  }
})
//---------------------------------------------
video.addEventListener('click',function(){
  if (video.paused) {
    video.play()
    playBtn.name = "pause-outline";
  }else{
    video.pause()
    playBtn.name = "play-outline";
  }
})
//Volume Button Fixed
const volume = document.querySelector('.volume')
volume.addEventListener('click',function(){
  if(video.volume > 0){
    video.volume = 0
    this.name = "volume-mute-outline"
  }else if( video.volume === 0){
    video.volume = 0.8
    this.name = "volume-high-outline"
  }
})
const volumeProgress = volume.nextElementSibling
volumeProgress.addEventListener('input',function(){
  video.volume = this.value / 100
  this.style = `background : linear-gradient(90deg, #ff3020 ${this.value}%, #e1e1e1 0%);`
})
//Time Fixed
const time = document.querySelector('.time')
const progress = document.getElementById('progress')
window.addEventListener('load',()=>{
  time.textContent = `${getTime(video.currentTime)} / ${getTime(video.duration)}`
})
video.addEventListener('timeupdate',function(){
  time.textContent = `${getTime(this.currentTime)} / ${getTime(this.duration)}`
  let Percentage = (video.currentTime / video.duration) * 100
  progress.style = `background: linear-gradient(90deg, #ff3020 ${Percentage}%, #e1e1e1 0%)`;
  progress.value = Percentage
})
progress.addEventListener('input',function(){
  video.currentTime = (this.value / 100) * video.duration
})
function getTime(time){
  let min = Math.floor(time / 60)
  let sec = Math.floor(time - (min * 60))
  let minval = min < 10 ? "0" + min : min
  let secval = sec < 10 ? "0" + sec : sec
  return `${minval}:${secval}`
}
//full Screen
const fullscreen = document.querySelector('.full')

fullscreen.addEventListener('click' , function() {
  if (!document.fullscreenElement) {
      if(videoWrapper.requestFullscreen) {
        videoWrapper.requestFullscreen();
      } else if(videoWrapper.mozFullScreenElement) {
        videoWrapper.mozFullScreenElement()
      } else if(videoWrapper.msFullscreenElement) {
        videoWrapper.msFullscreenElement()
      } else if(videoWrapper.webkitFullscreenElement) {
          videoWrapper.webkitFullscreenElement()
      }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen(); 
    } else if(document.mozCancelFullscreen) {
      document.mozCancelFullscreen(); 
    } else if(document.msCancelFullscreen) {
      document.msCancelFullscreen(); 
    } else if(document.webkitCancelFullscreen) {
      document.webkitCancelFullscreen(); 
    }
  }
})