(() => {
  const CELL = 64;
  const atlasBase64 = window.__AT_HANDDRAWN_ATLAS || '';
  if (!atlasBase64 || !window.AT_ART) return;
  const ATLAS = 'data:image/webp;base64,' + atlasBase64;
  delete window.__AT_HANDDRAWN_ATLAS;

  const characters = {
    jake:[0,0], finn:[1,0], bmo:[2,0], neptr:[3,0], shelby:[4,0],
    lady:[0,1], pb:[1,1], peppermint:[2,1], banana:[3,1], rootbeer:[4,1],
    turtle:[0,2], treetrunks:[1,2], mrpig:[2,2], huntress:[3,2], cinnamon:[4,2],
    choosegoose:[0,3], magicman:[1,3], marceline:[2,3], lsp:[3,3], death:[4,3],
    iceking:[0,4], gunter:[1,4], abracadaniel:[2,4], flame:[3,4], flambo:[4,4],
    lemongrab:[0,5], kingworm:[1,5], billy:[2,5], prismo:[3,5], cosmicowl:[4,5],
    lemonhope:[0,6]
  };
  const objects = { mushroom:[1,6], chest:[2,6], basspick:[3,6], potion:[4,6] };
  const oldCharacterArt=AT_ART.characterArt.bind(AT_ART), oldItemArt=AT_ART.itemArt.bind(AT_ART);
  const atlas=new Image(); let atlasReady=false;
  const pos=(id,kind)=>kind==='character'?characters[id]:objects[id];
  const markup=(id,kind)=>`<canvas class="handdrawn-sprite handdrawn-${kind} handdrawn-${id}" data-handdrawn-id="${id}" data-handdrawn-kind="${kind}" width="128" height="128" aria-hidden="true"></canvas>`;

  function cleanCell(p){
    const [col,row]=p, work=document.createElement('canvas'); work.width=CELL;work.height=CELL;
    const c=work.getContext('2d',{willReadFrequently:true});
    c.drawImage(atlas,col*CELL,row*CELL,CELL,CELL,0,0,CELL,CELL);
    const im=c.getImageData(0,0,CELL,CELL),d=im.data,n=CELL*CELL;

    /* Magic wand: only the bright neutral / transparent area connected to the edge is background.
       White details enclosed by ink remain, exactly what we need for Finn's hat and similar drawings. */
    const bg=new Uint8Array(n),q=[];
    const paper=i=>{const a=d[i*4+3],r=d[i*4],g=d[i*4+1],b=d[i*4+2],mx=Math.max(r,g,b),mn=Math.min(r,g,b);return a<45||(mx>218&&mx-mn<34);};
    const push=i=>{if(i>=0&&i<n&&!bg[i]&&paper(i)){bg[i]=1;q.push(i);}};
    for(let x=0;x<CELL;x++){push(x);push((CELL-1)*CELL+x);}for(let y=0;y<CELL;y++){push(y*CELL);push(y*CELL+CELL-1);}
    for(let k=0;k<q.length;k++){const i=q[k],x=i%CELL,y=(i/CELL)|0;if(x)push(i-1);if(x<CELL-1)push(i+1);if(y)push(i-CELL);if(y<CELL-1)push(i+CELL);}
    for(let i=0;i<n;i++)if(bg[i])d[i*4+3]=0;

    /* Remove only small detached crop scraps. Keep all substantial pieces of the drawing. */
    const fg=new Uint8Array(n),seen=new Uint8Array(n),stack=[],comps=[];
    for(let i=0;i<n;i++)fg[i]=d[i*4+3]>=135?1:0;
    for(let s=0;s<n;s++){
      if(!fg[s]||seen[s])continue;const comp=[];stack.push(s);seen[s]=1;
      while(stack.length){const i=stack.pop();comp.push(i);const x=i%CELL,y=(i/CELL)|0;
        for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){if(!dx&&!dy)continue;const nx=x+dx,ny=y+dy;if(nx<0||nx>=CELL||ny<0||ny>=CELL)continue;const j=ny*CELL+nx;if(fg[j]&&!seen[j]){seen[j]=1;stack.push(j);}}
      } comps.push(comp);
    }
    comps.sort((a,b)=>b.length-a.length);
    if(comps.length){const largest=comps[0].length,keep=new Uint8Array(n);
      for(const comp of comps)if(comp.length>=largest*.10)for(const i of comp)keep[i]=1;
      for(let pass=0;pass<2;pass++){const add=[];for(let i=0;i<n;i++)if(keep[i]){const x=i%CELL,y=(i/CELL)|0;for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){const nx=x+dx,ny=y+dy;if(nx>=0&&nx<CELL&&ny>=0&&ny<CELL)add.push(ny*CELL+nx);}}for(const i of add)keep[i]=1;}
      for(let i=0;i<n;i++)if(!keep[i])d[i*4+3]=0;
    }
    c.putImageData(im,0,0);return work;
  }
  function paint(el){if(!atlasReady||el.dataset.painted==='1')return;const p=pos(el.dataset.handdrawnId,el.dataset.handdrawnKind);if(!p)return;const src=cleanCell(p),c=el.getContext('2d');c.imageSmoothingEnabled=true;c.imageSmoothingQuality='high';c.drawImage(src,0,0,CELL,CELL,0,0,128,128);el.dataset.painted='1';}
  const paintAll=()=>document.querySelectorAll('canvas.handdrawn-sprite').forEach(paint);
  new MutationObserver(paintAll).observe(document.documentElement,{childList:true,subtree:true});
  atlas.onload=()=>{atlasReady=true;paintAll();};atlas.src=ATLAS;
  AT_ART.characterArt=id=>characters[id]?markup(id,'character'):oldCharacterArt(id);
  AT_ART.itemArt=id=>objects[id]?markup(id,'item'):oldItemArt(id);
  window.AT_HANDDRAWN={characters,objects,paintAll};
})();
