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
    mushroom:[1,6],
    chest:[2,6],
    basspick:[3,6],
    potion:[4,6]
  };

  const oldCharacterArt = AT_ART.characterArt.bind(AT_ART);
  const oldItemArt = AT_ART.itemArt.bind(AT_ART);

  function sprite(pos, id, kind) {
    const [col, row] = pos;
    const w = COLS * CELL;
    const h = ROWS * CELL;
    return `<svg class="handdrawn-sprite handdrawn-${kind} handdrawn-${id}" viewBox="0 0 ${CELL} ${CELL}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><image href="${ATLAS}" x="${-col * CELL}" y="${-row * CELL}" width="${w}" height="${h}" preserveAspectRatio="none"/></svg>`;
  }

  AT_ART.characterArt = id => characters[id] ? sprite(characters[id], id, 'character') : oldCharacterArt(id);
  AT_ART.itemArt = id => objects[id] ? sprite(objects[id], id, 'item') : oldItemArt(id);
  window.AT_HANDDRAWN = { characters, objects };
})();
