(() => {
  if (!window.AT_ART) return;

  const atlasBase64 = window.__AT_HANDDRAWN_ATLAS || '';
  if (!atlasBase64) {
    console.error('[AT] HD hand-drawn atlas is missing');
    return;
  }

  const CELL = 256;
  const COLS = 5;
  const ROWS = 7;
  const atlas = new Image();
  let ready = false;

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

  const entryFor = (id, kind) => kind === 'character' ? characters[id] : objects[id];

  function markup(id, kind) {
    return `<canvas class="handdrawn-sprite handdrawn-${kind} handdrawn-${id}" data-handdrawn-id="${id}" data-handdrawn-kind="${kind}" width="256" height="256" aria-hidden="true"></canvas>`;
  }

  function paint(el) {
    if (!ready || el.dataset.painted === '1') return;
    const p = entryFor(el.dataset.handdrawnId, el.dataset.handdrawnKind);
    if (!p) return;

    const [col, row] = p;
    const ctx = el.getContext('2d');
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.clearRect(0, 0, CELL, CELL);
    ctx.drawImage(
      atlas,
      col * CELL, row * CELL, CELL, CELL,
      0, 0, CELL, CELL
    );
    el.dataset.painted = '1';
  }

  function paintAll() {
    document.querySelectorAll('canvas.handdrawn-sprite').forEach(paint);
  }

  new MutationObserver(paintAll).observe(document.documentElement, {childList:true, subtree:true});

  atlas.onload = () => {
    const expectedW = COLS * CELL;
    const expectedH = ROWS * CELL;
    if (atlas.naturalWidth !== expectedW || atlas.naturalHeight !== expectedH) {
      console.error(`[AT] Unexpected HD atlas size ${atlas.naturalWidth}x${atlas.naturalHeight}, expected ${expectedW}x${expectedH}`);
    }
    ready = true;
    paintAll();
    delete window.__AT_HANDDRAWN_ATLAS;
  };

  atlas.onerror = () => {
    console.error('[AT] Failed to decode HD hand-drawn atlas');
  };

  atlas.src = 'data:image/webp;base64,' + atlasBase64;

  AT_ART.characterArt = id => characters[id] ? markup(id, 'character') : oldCharacterArt(id);
  AT_ART.itemArt = id => objects[id] ? markup(id, 'item') : oldItemArt(id);
  window.AT_HANDDRAWN = {characters, objects, paintAll};
})();
