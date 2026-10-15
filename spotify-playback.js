/* One Spotify controller per open listening session. No account credentials. */
(function(){
 function createSession({loadAPI,createHost,onState=()=>{},onTiming=()=>{},onError=()=>{},now=()=>performance.now()}){
  let controller=null,booting=false,ready=false,loaded=null,wanted=null,generation=0,startedAt=0,timing=null;
  const url=t=>'https://open.spotify.com/track/'+t.id+'?theme=0';
  function mark(stage){if(!timing||timing[stage]!==undefined)return;timing[stage]=Math.round(now()-startedAt);onTiming({...timing});}
  function matches(event){const uri=event?.data?.playingURI;return !!wanted&&(!uri||uri==='spotify:track:'+wanted.id);}
  function activate(){if(!controller||!ready||!wanted)return;if(loaded!==wanted.id){controller.pause();controller.loadEntity(url(wanted));loaded=wanted.id;mark('loadRequested');}mark('playRequested');controller.play();onState('loading',wanted);}
  function warm(track){if(controller||booting)return;booting=true;const version=generation;onState('preparing',track);loadAPI().then(api=>{if(version!==generation)return;api.createController(createHost(),{url:url(track),width:'100%',height:80},c=>{if(version!==generation){c.destroy();return;}controller=c;loaded=track.id;c.addListener('ready',()=>{if(version!==generation)return;ready=true;booting=false;mark('ready');if(wanted)activate();else onState('ready',track);});c.addListener('playback_started',event=>{if(version!==generation||!matches(event))return;mark('playbackStarted');onState('playing',wanted);});c.addListener('playback_update',event=>{if(version!==generation||!matches(event))return;const data=event.data||{};if(!data.isPaused&&!data.isBuffering&&data.position>0){mark('firstProgress');onState('playing',wanted);}else if(data.isBuffering)onState('buffering',wanted);});});}).catch(error=>{if(version!==generation)return;booting=false;onError(error,wanted||track);});}
  function select(track){wanted=track;startedAt=now();timing={id:track.id,clicked:0,reused:!!controller&&ready};onTiming({...timing});if(controller&&ready)activate();else warm(track);}
  function close(){generation++;if(controller)controller.destroy();controller=null;booting=false;ready=false;loaded=null;wanted=null;timing=null;}
  return {warm,select,close};
 }
 window.PortfolioSpotify={createSession};
})();
