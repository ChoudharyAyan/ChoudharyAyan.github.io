/* Presentation timing only; the answer remains local, sourced profile content. */
(function(){
 function animate({text,onStart=()=>{},onChunk,onFinish,reduceMotion=false,delay=1000,schedule=setTimeout,unschedule=clearTimeout}){
  let timer,done=false,index=0;
  function finish(){if(done)return;done=true;unschedule(timer);onChunk(text);onFinish();}
  function step(){if(done)return;index=Math.min(text.length,index+Math.max(1,Math.ceil(text.length/90)));onChunk(text.slice(0,index));if(index===text.length){finish();return;}timer=schedule(step,24);}
  timer=schedule(()=>{if(done)return;onStart();if(reduceMotion)finish();else step();},delay);
  return {finish,cancel(){if(done)return;done=true;unschedule(timer);}};
 }
 window.PortfolioReply={animate};
})();
