(() => {
  if (!window.AT_ART) return;

  const CELL = 256;
  const atlas1 = new Image();
  const atlas2 = new Image();
  let ready1 = false;
  let ready2 = false;

  const characters = {
    finn:{a:1,p:[0,0]}, jake:{a:1,p:[1,0]}, bmo:{a:1,p:[2,0]}, pb:{a:1,p:[3,0]}, marceline:{a:1,p:[4,0]},
    iceking:{a:1,p:[0,1]}, gunter:{a:1,p:[1,1]}, lemongrab:{a:1,p:[2,1]}, flame:{a:1,p:[3,1]}, prismo:{a:1,p:[4,1]},
    lady:{a:1,p:[0,2]}, lsp:{a:1,p:[1,2]}, shelby:{a:1,p:[2,2]}, mrpig:{a:1,p:[3,2]}, treetrunks:{a:1,p:[4,2]},

    neptr:{a:2,p:[0,0]}, peppermint:{a:2,p:[1,0]}, banana:{a:2,p:[2,0]}, rootbeer:{a:2,p:[3,0]}, turtle:{a:2,p:[4,0]},
    huntress:{a:2,p:[0,1]}, cinnamon:{a:2,p:[1,1]}, choosegoose:{a:2,p:[2,1]}, magicman:{a:2,p:[3,1]}, death:{a:2,p:[4,1]},
    abracadaniel:{a:2,p:[0,2]}, flambo:{a:2,p:[1,2]}, kingworm:{a:2,p:[2,2]}, billy:{a:2,p:[3,2]}, cosmicowl:{a:2,p:[4,2]},
    lemonhope:{a:2,p:[0,3]}
  };

  const objects = {
    mushroom:{a:2,p:[1,3]}, chest:{a:2,p:[2,3]}, basspick:{a:2,p:[3,3]}, potion:{a:2,p:[4,3]}
  };

  const oldCharacterArt = AT_ART.characterArt.bind(AT_ART);
  const oldItemArt = AT_ART.itemArt.bind(AT_ART);

  function markup(id, kind) {
    return `<canvas class="handdrawn-sprite handdrawn-${kind} handdrawn-${id}" data-handdrawn-id="${id}" data-handdrawn-kind="${kind}" width="256" height="256" aria-hidden="true"></canvas>`;
  }

  function paint(el) {
    if (el.dataset.painted === '1') return;
    const id = el.dataset.handdrawnId;
    const kind = el.dataset.handdrawnKind;
    const entry = kind === 'character' ? characters[id] : objects[id];
    if (!entry) return;
    if (entry.a === 1 && !ready1) return;
    if (entry.a === 2 && !ready2) return;

    const atlas = entry.a === 1 ? atlas1 : atlas2;
    const [col,row] = entry.p;
    const ctx = el.getContext('2d');
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.clearRect(0,0,CELL,CELL);
    ctx.drawImage(atlas, col*CELL, row*CELL, CELL, CELL, 0,0,CELL,CELL);
    el.dataset.painted = '1';
  }

  function paintAll() {
    document.querySelectorAll('canvas.handdrawn-sprite').forEach(paint);
  }

  new MutationObserver(paintAll).observe(document.documentElement,{childList:true,subtree:true});
  atlas1.onload = () => { ready1 = true; paintAll(); };
  atlas2.onload = () => { ready2 = true; paintAll(); };
  atlas1.src = 'assets/handdrawn-hd-part1.webp';
  atlas2.src = 'assets/handdrawn-hd-part2.webp';

  AT_ART.characterArt = id => characters[id] ? markup(id,'character') : oldCharacterArt(id);
  AT_ART.itemArt = id => objects[id] ? markup(id,'item') : oldItemArt(id);
  window.AT_HANDDRAWN = {characters,objects,paintAll};
})();
