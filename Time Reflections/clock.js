let transitioning = false;

function startClock() {

  let newDate = new Date;
  let rotationMem = newDate.getSeconds() * 6;
  setTime( true, newDate );
  
  currentRotation = gsap.getProperty(".sec", "rotation");
  
  gsap.to(".sec",  {
  
  rotation: () => ( transitioning == false ? getRotation(newDate) : currentRotation),
  duration: 0.20,
  transformOrigin: "50% 50%", 
  ease: "none",
  onStart: function() {
  
      newDate = new Date;
      rotation = newDate.getSeconds() * 6;
      if( rotation != rotationMem )
      {
          rotationMem = rotation;
          setTime( false, newDate );
      }
  
  },
  onComplete: function() {
  
      if( gsap.getProperty(".sec", "rotation") >= 360 )
      {
          rotationMem = 0;
          gsap.set('.sec', { rotation: 0, transformOrigin: "50% 50%" });
      }
      currentRotation = gsap.getProperty(".sec", "rotation");
      this.invalidate().delay(0.1).restart(true); }
  }
  
  );
  
} // startClock()
  
function setTime( init, newDate ) {
  
  if( transitioning == false )
  {
          
      if( !newDate )
          newDate = new Date();
  
      if( init == true )
      {
          gsap.set('.sec', { rotation: getRotation(newDate), transformOrigin: "50% 50%" });
          currentRotation = gsap.getProperty(".sec", "rotation");
      }
      else if( gsap.getProperty(".sec", "rotation") >= 360 )
      {
          gsap.set('.sec', { rotation: 0, transformOrigin: "50% 50%" });
          currentRotation = 0;
      } 
      gsap.set('.min', { rotation: newDate.getMinutes() * 6 + new Date().getSeconds() * 6 / 59, transformOrigin: "50% 50%", });
      gsap.set('.hr', { rotation: newDate.getHours() * 30 + new Date().getMinutes() * 30 / 59, transformOrigin: "50% 50%", });
  
  }
  
} // setTime()
  
function getRotation( newDate ) {
  
  if( !newDate )
      newDate = new Date();
  
  let sec = newDate.getSeconds();
  
  let rotation = sec * 6;
  if( sec == 0 )
      rotation = 360;
  
  let difference = Math.abs( gsap.getProperty(".sec", "rotation") - rotation );
  if( difference >= 12 )
  {
      gsap.set('.sec', { rotation: rotation, transformOrigin: "50% 50%" });
      currentRotation = gsap.getProperty(".sec", "rotation");
  }
  
  return rotation;
  
} // getRotation()
