(() => {
  const PREF_KEY="ooo_audio_v1";
  let ctx=null,master=null,musicGain=null,sfxGain=null,timer=null,step=0,scene="treehouse";
  let prefs=loadPrefs();
  function loadPrefs(){try{return Object.assign({music:true,sound:true,volume:.35},JSON.parse(localStorage.getItem(PREF_KEY)||"{}"))}catch(e){return{music:true,sound:true,volume:.35}}}
  function savePrefs(){localStorage.setItem(PREF_KEY,JSON.stringify(prefs))}
  function init(){
    if(ctx){if(ctx.state==="suspended")ctx.resume();return}
    const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;
    ctx=new AC();master=ctx.createGain();musicGain=ctx.createGain();sfxGain=ctx.createGain();
    master.gain.value=prefs.volume;musicGain.gain.value=prefs.music?.28:0;sfxGain.gain.value=prefs.sound?.8:0;
    musicGain.connect(master);sfxGain.connect(master);master.connect(ctx.destination);if(prefs.music)startMusic();
  }
  const scales={treehouse:[261.63,329.63,392,440,392,329.63,293.66,349.23],candy:[329.63,392,493.88,523.25,493.88,392,349.23,440],forest:[220,261.63,329.63,293.66,246.94,293.66,329.63,261.63],marceline:[110,146.83,164.81,196,174.61,146.83,130.81,164.81],ice:[523.25,659.25,783.99,698.46,587.33,698.46,659.25,523.25],fire:[146.83,174.61,220,196,174.61,164.81,146.83,130.81],lemon:[293.66,311.13,293.66,349.23,311.13,293.66,261.63,293.66],wilds:[196,246.94,293.66,329.63,293.66,246.94,220,261.63],prismo:[261.63,392,523.25,440,349.23,523.25,392,329.63]};
  function note(freq,duration=.16,when=0,type="triangle",gain=.07,destination=musicGain){
    if(!ctx||!destination)return;const o=ctx.createOscillator(),g=ctx.createGain();o.type=type;o.frequency.setValueAtTime(freq,ctx.currentTime+when);g.gain.setValueAtTime(.0001,ctx.currentTime+when);g.gain.exponentialRampToValueAtTime(Math.max(.0002,gain),ctx.currentTime+when+.012);g.gain.exponentialRampToValueAtTime(.0001,ctx.currentTime+when+duration);o.connect(g);g.connect(destination);o.start(ctx.currentTime+when);o.stop(ctx.currentTime+when+duration+.03)
  }
  function musicTick(){if(!ctx||!prefs.music)return;const seq=scales[scene]||scales.treehouse,f=seq[step%seq.length],style=scene==="marceline"?"sawtooth":scene==="ice"?"sine":"triangle";note(f,.20,0,style,scene==="marceline"?.045:.035);if(step%4===0)note(f/2,.34,0,"sine",.025);if((scene==="fire"||scene==="lemon")&&step%2===0)note(75,.07,0,"square",.015);step++}
  function startMusic(){if(!ctx||timer)return;musicTick();timer=setInterval(musicTick,330)}
  function stopMusic(){if(timer){clearInterval(timer);timer=null}}
  function setScene(id){scene=id;step=0}
  function play(name){
    if(!prefs.sound)return;init();if(!ctx)return;
    const map={click:[[560,.045,"square",.05]],pop:[[420,.06,"sine",.07],[650,.07,"triangle",.05]],pickup:[[440,.07,"triangle",.06],[660,.08,"triangle",.06],[880,.12,"sine",.05]],success:[[523.25,.10,"triangle",.07],[659.25,.10,"triangle",.07],[783.99,.18,"sine",.07]],wrong:[[180,.12,"sawtooth",.04],[145,.16,"sawtooth",.035]],page:[[392,.08,"sine",.05],[523.25,.09,"sine",.06],[783.99,.18,"triangle",.06]],gunter:[[220,.08,"square",.035],[164.81,.12,"square",.035]],magic:[[620,.05,"sine",.045],[830,.07,"sine",.04],[1080,.12,"sine",.035]]};
    (map[name]||map.click).forEach((n,i)=>note(n[0],n[1],i*.055,n[2],n[3],sfxGain));
  }
  function toggleMusic(){init();prefs.music=!prefs.music;savePrefs();if(musicGain)musicGain.gain.setTargetAtTime(prefs.music?.28:0,ctx.currentTime,.03);if(prefs.music)startMusic();else stopMusic();syncButtons();return prefs.music}
  function toggleSound(){init();prefs.sound=!prefs.sound;savePrefs();if(sfxGain)sfxGain.gain.setTargetAtTime(prefs.sound?.8:0,ctx.currentTime,.03);syncButtons();return prefs.sound}
  function setVolume(v){prefs.volume=Math.max(0,Math.min(1,Number(v)||0));savePrefs();init();if(master)master.gain.setTargetAtTime(prefs.volume,ctx.currentTime,.03)}
  function syncButtons(){const m=document.getElementById("musicBtn"),s=document.getElementById("soundBtn");if(m){m.textContent=prefs.music?"♫":"♩";m.title=prefs.music?"Музыка: включена":"Музыка: выключена";m.classList.toggle("muted",!prefs.music)}if(s){s.textContent=prefs.sound?"🔊":"🔇";s.title=prefs.sound?"Звуки: включены":"Звуки: выключены";s.classList.toggle("muted",!prefs.sound)}}
  document.addEventListener("pointerdown",()=>{init();syncButtons()},{once:true});
  window.AT_AUDIO={init,play,setScene,toggleMusic,toggleSound,setVolume,syncButtons,prefs:()=>({...prefs})};
})();