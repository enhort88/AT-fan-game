(() => {
  if (!window.AT_ART) return;

  const LOW_CELL = 64;
  const HD_CELL = 256;
  const lowBase64 = window.__AT_HANDDRAWN_ATLAS || '';
  const lowAtlas = new Image();
  const hdAtlas = new Image();
  let lowReady = false;
  let hdReady = false;

  const hdCharacters = {
    finn:[0,0], jake:[1,0], bmo:[2,0], pb:[3,0], marceline:[4,0],
    iceking:[0,1], gunter:[1,1], lemongrab:[2,1], flame:[3,1], prismo:[4,1],
    lady:[0,2], lsp:[1,2], shelby:[2,2], mrpig:[3,2], treetrunks:[4,2]
  };

  const lowCharacters = {
    neptr:[3,0], peppermint:[2,1], banana:[3,1], rootbeer:[4,1],
    turtle:[0,2], huntress:[3,2], cinnamon:[4,2], choosegoose:[0,3],
    magicman:[1,3], death:[4,3], abracadaniel:[2,4], flambo:[4,4],
    kingworm:[1,5], billy:[2,5], cosmicowl:[4,5], lemonhope:[0,6]
  };

  const lowObjects = {
    mushroom:[1,6], chest:[2,6], basspick:[3,6], potion:[4,6]
  };

  const oldCharacterArt = AT_ART.characterArt.bind(AT_ART);
  const oldItemArt = AT_ART.itemArt.bind(AT_ART);

  function markup(id, kind, source) {
    return `<canvas class="handdrawn-sprite handdrawn-${kind} handdrawn-${id}" data-handdrawn-id="${id}" data-handdrawn-kind="${kind}" data-handdrawn-source="${source}" width="256" height="256" aria-hidden="true"></canvas>`;
  }

  function paint(el) {
    if (el.dataset.painted === '1') return;
    const id = el.dataset.handdrawnId;
    const kind = el.dataset.handdrawnKind;
    const source = el.dataset.handdrawnSource;
    const ctx = el.getContext('2d');
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.clearRect(0, 0, 256, 256);

    if (source === 'hd') {
      if (!hdReady) return;
      const p = hdCharacters[id];
      if (!p) return;
      ctx.drawImage(hdAtlas, p[0]*HD_CELL, p[1]*HD_CELL, HD_CELL, HD_CELL, 0, 0, 256, 256);
      el.dataset.painted = '1';
      return;
    }

    if (!lowReady) return;
    const p = kind === 'character' ? lowCharacters[id] : lowObjects[id];
    if (!p) return;
    ctx.drawImage(lowAtlas, p[0]*LOW_CELL, p[1]*LOW_CELL, LOW_CELL, LOW_CELL, 0, 0, 256, 256);
    el.dataset.painted = '1';
  }

  function paintAll() {
    document.querySelectorAll('canvas.handdrawn-sprite').forEach(paint);
  }

  new MutationObserver(paintAll).observe(document.documentElement, {childList:true, subtree:true});

  if (lowBase64) {
    lowAtlas.onload = () => { lowReady = true; paintAll(); };
    lowAtlas.src = 'data:image/webp;base64,' + lowBase64;
    delete window.__AT_HANDDRAWN_ATLAS;
  }

  hdAtlas.onload = () => { hdReady = true; paintAll(); };
  hdAtlas.src = 'assets/handdrawn-hd-part1.webp';

  AT_ART.characterArt = id => hdCharacters[id]
    ? markup(id, 'character', 'hd')
    : lowCharacters[id]
      ? markup(id, 'character', 'low')
      : oldCharacterArt(id);

  AT_ART.itemArt = id => lowObjects[id]
    ? markup(id, 'item', 'low')
    : oldItemArt(id);

  window.AT_HANDDRAWN = {hdCharacters, lowCharacters, lowObjects, paintAll};
})();
