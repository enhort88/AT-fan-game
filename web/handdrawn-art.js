(() => {
  const CELL = 64;
  const COLS = 5;
  const ROWS = 7;
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

  const objects = {
    mushroom:[1,6], chest:[2,6], basspick:[3,6], potion:[4,6]
  };

  const oldCharacterArt = AT_ART.characterArt.bind(AT_ART);
  const oldItemArt = AT_ART.itemArt.bind(AT_ART);
  const atlas = new Image();
  let atlasReady = false;

  function positionFor(id, kind) {
    return kind === 'character' ? characters[id] : objects[id];
  }

  function canvasMarkup(id, kind) {
    return `<canvas class="handdrawn-sprite handdrawn-${kind} handdrawn-${id}" data-handdrawn-id="${id}" data-handdrawn-kind="${kind}" width="128" height="128" aria-hidden="true"></canvas>`;
  }

  function cleanCell(ctx, pos) {
    const [col,row] = pos;
    const work = document.createElement('canvas');
    work.width = CELL; work.height = CELL;
    const wctx = work.getContext('2d', { willReadFrequently:true });
    wctx.clearRect(0,0,CELL,CELL);
    wctx.drawImage(atlas, col*CELL, row*CELL, CELL, CELL, 0,0,CELL,CELL);
    const img = wctx.getImageData(0,0,CELL,CELL);
    const d = img.data;

    // Photoshop-like cleanup for the already transparent scan: use the solid drawing
    // as a seed, keep the connected painted region, and throw away detached crop scraps.
    const solid = new Uint8Array(CELL*CELL);
    for (let i=0;i<CELL*CELL;i++) solid[i] = d[i*4+3] >= 145 ? 1 : 0;

    const seen = new Uint8Array(CELL*CELL);
    let best = [];
    const stack = [];
    for (let start=0; start<solid.length; start++) {
      if (!solid[start] || seen[start]) continue;
      const comp=[]; stack.push(start); seen[start]=1;
      while(stack.length) {
        const p=stack.pop(); comp.push(p);
        const x=p%CELL, y=(p/CELL)|0;
        const near=[p-1,p+1,p-CELL,p+CELL,p-CELL-1,p-CELL+1,p+CELL-1,p+CELL+1];
        for (const q of near) {
          if (q<0 || q>=solid.length || seen[q] || !solid[q]) continue;
          const qx=q%CELL, qy=(q/CELL)|0;
          if (Math.abs(qx-x)>1 || Math.abs(qy-y)>1) continue;
          seen[q]=1; stack.push(q);
        }
      }
      if (comp.length > best.length) best = comp;
    }

    if (best.length) {
      const keep = new Uint8Array(CELL*CELL);
      for (const p of best) keep[p]=1;
      // Two-pixel dilation preserves pencil anti-aliasing around the actual figure.
      for(let pass=0; pass<2; pass++) {
        const add=[];
        for(let p=0;p<keep.length;p++) if(keep[p]) {
          const x=p%CELL, y=(p/CELL)|0;
          for(let dy=-1;dy<=1;dy++) for(let dx=-1;dx<=1;dx++) {
            const nx=x+dx, ny=y+dy;
            if(nx>=0&&nx<CELL&&ny>=0&&ny<CELL) add.push(ny*CELL+nx);
          }
        }
        for(const p of add) keep[p]=1;
      }
      for(let i=0;i<CELL*CELL;i++) if(!keep[i]) d[i*4+3]=0;
    }

    wctx.putImageData(img,0,0);
    return work;
  }

  function paint(canvas) {
    if (!atlasReady || canvas.dataset.painted === '1') return;
    const id=canvas.dataset.handdrawnId, kind=canvas.dataset.handdrawnKind;
    const pos=positionFor(id,kind); if(!pos) return;
    const clean=cleanCell(null,pos);
    const ctx=canvas.getContext('2d');
    ctx.imageSmoothingEnabled=true;
    ctx.imageSmoothingQuality='high';
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.drawImage(clean,0,0,CELL,CELL,0,0,canvas.width,canvas.height);
    canvas.dataset.painted='1';
  }

  function paintAll() {
    document.querySelectorAll('canvas.handdrawn-sprite').forEach(paint);
  }

  const observer=new MutationObserver(() => paintAll());
  observer.observe(document.documentElement,{childList:true,subtree:true});

  atlas.onload=()=>{atlasReady=true; paintAll();};
  atlas.src=ATLAS;

  AT_ART.characterArt = id => characters[id] ? canvasMarkup(id,'character') : oldCharacterArt(id);
  AT_ART.itemArt = id => objects[id] ? canvasMarkup(id,'item') : oldItemArt(id);
  window.AT_HANDDRAWN={characters,objects,paintAll};
})();
