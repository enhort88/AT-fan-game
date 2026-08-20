(() => {
  if (!window.AT_ART) return;

  const rawAtlasBase64 = window.__AT_HANDDRAWN_ATLAS || '';
  if (!rawAtlasBase64) {
    console.error('[AT] Hand-drawn atlas data is missing');
    return;
  }

  const COLS = 5;
  const ROWS = 7;
  const OUTPUT_SIZE = 256;
  const atlas = new Image();
  let ready = false;
  let sourceCellW = 0;
  let sourceCellH = 0;
  let atlasUrl = null;

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

  // Keep the daughter's original drawings, only restore some of the color and
  // contrast lost by photographing/scanning and WebP compression.
  const DEFAULT_GRADE = {sat:1.24, contrast:1.08, brightness:1.025};
  const COLOR_GRADE = {
    finn:       {sat:1.30, contrast:1.10, brightness:1.035},
    jake:       {sat:1.38, contrast:1.10, brightness:1.025},
    bmo:        {sat:1.34, contrast:1.11, brightness:1.025},
    neptr:      {sat:1.15, contrast:1.14, brightness:1.020},
    shelby:     {sat:1.22, contrast:1.08, brightness:1.035},
    lady:       {sat:1.35, contrast:1.09, brightness:1.035},
    pb:         {sat:1.36, contrast:1.09, brightness:1.030},
    peppermint: {sat:1.26, contrast:1.10, brightness:1.020},
    banana:     {sat:1.34, contrast:1.09, brightness:1.025},
    rootbeer:   {sat:1.23, contrast:1.10, brightness:1.020},
    turtle:     {sat:1.28, contrast:1.09, brightness:1.020},
    treetrunks: {sat:1.28, contrast:1.08, brightness:1.030},
    mrpig:      {sat:1.30, contrast:1.08, brightness:1.030},
    huntress:   {sat:1.28, contrast:1.10, brightness:1.020},
    cinnamon:   {sat:1.26, contrast:1.08, brightness:1.030},
    choosegoose:{sat:1.30, contrast:1.09, brightness:1.025},
    magicman:   {sat:1.25, contrast:1.10, brightness:1.020},
    marceline:  {sat:1.18, contrast:1.13, brightness:1.010},
    lsp:        {sat:1.34, contrast:1.09, brightness:1.025},
    death:      {sat:1.10, contrast:1.14, brightness:1.015},
    iceking:    {sat:1.28, contrast:1.11, brightness:1.025},
    gunter:     {sat:1.10, contrast:1.14, brightness:1.015},
    abracadaniel:{sat:1.25, contrast:1.09, brightness:1.025},
    flame:      {sat:1.38, contrast:1.10, brightness:1.030},
    flambo:     {sat:1.40, contrast:1.10, brightness:1.030},
    lemongrab:  {sat:1.34, contrast:1.11, brightness:1.020},
    kingworm:   {sat:1.30, contrast:1.09, brightness:1.025},
    billy:      {sat:1.20, contrast:1.11, brightness:1.020},
    prismo:     {sat:1.32, contrast:1.09, brightness:1.030},
    cosmicowl:  {sat:1.22, contrast:1.10, brightness:1.020},
    lemonhope:  {sat:1.30, contrast:1.09, brightness:1.025}
  };

  const oldCharacterArt = AT_ART.characterArt.bind(AT_ART);
  const oldItemArt = AT_ART.itemArt.bind(AT_ART);
  const entryFor = (id, kind) => kind === 'character' ? characters[id] : objects[id];

  function markup(id, kind) {
    return `<canvas class="handdrawn-sprite handdrawn-${kind} handdrawn-${id}" data-handdrawn-id="${id}" data-handdrawn-kind="${kind}" width="${OUTPUT_SIZE}" height="${OUTPUT_SIZE}" aria-hidden="true"></canvas>`;
  }

  function readUint32LE(str, offset) {
    return (
      str.charCodeAt(offset) |
      (str.charCodeAt(offset + 1) << 8) |
      (str.charCodeAt(offset + 2) << 16) |
      (str.charCodeAt(offset + 3) << 24)
    ) >>> 0;
  }

  function makeAtlasBlobUrl(base64) {
    const compact = base64.replace(/\s+/g, '');
    const header = atob(compact.slice(0, 64));

    if (header.slice(0, 4) !== 'RIFF' || header.slice(8, 12) !== 'WEBP') {
      throw new Error('atlas does not start with a RIFF/WEBP header');
    }

    const riffPayloadSize = readUint32LE(header, 4);
    const totalBytes = riffPayloadSize + 8;
    const encodedLength = Math.ceil(totalBytes / 3) * 4;
    const cleanBase64 = compact.slice(0, encodedLength);
    const binary = atob(cleanBase64);

    if (binary.length < totalBytes) {
      throw new Error(`atlas is truncated: ${binary.length}/${totalBytes} bytes`);
    }

    const bytes = new Uint8Array(totalBytes);
    for (let i = 0; i < totalBytes; i++) bytes[i] = binary.charCodeAt(i);
    return URL.createObjectURL(new Blob([bytes], {type:'image/webp'}));
  }

  function applyVisualGrade(el, id, kind) {
    if (kind !== 'character') {
      el.style.filter = 'saturate(1.18) contrast(1.06) brightness(1.02)';
      return;
    }

    const g = COLOR_GRADE[id] || DEFAULT_GRADE;
    el.style.filter =
      `saturate(${g.sat}) contrast(${g.contrast}) brightness(${g.brightness}) ` +
      'drop-shadow(.55px 0 0 rgba(29,35,47,.24)) ' +
      'drop-shadow(-.55px 0 0 rgba(29,35,47,.24)) ' +
      'drop-shadow(0 .55px 0 rgba(29,35,47,.20))';
  }

  function paint(el) {
    if (!ready || el.dataset.painted === '1') return;
    const id = el.dataset.handdrawnId;
    const kind = el.dataset.handdrawnKind;
    const p = entryFor(id, kind);
    if (!p) return;

    const [col, row] = p;
    const ctx = el.getContext('2d');
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.clearRect(0, 0, OUTPUT_SIZE, OUTPUT_SIZE);
    ctx.drawImage(
      atlas,
      col * sourceCellW,
      row * sourceCellH,
      sourceCellW,
      sourceCellH,
      0,
      0,
      OUTPUT_SIZE,
      OUTPUT_SIZE
    );
    applyVisualGrade(el, id, kind);
    el.dataset.painted = '1';
  }

  function paintAll() {
    document.querySelectorAll('canvas.handdrawn-sprite').forEach(paint);
  }

  new MutationObserver(paintAll).observe(document.documentElement, {
    childList: true,
    subtree: true
  });

  atlas.onload = () => {
    sourceCellW = atlas.naturalWidth / COLS;
    sourceCellH = atlas.naturalHeight / ROWS;

    if (!Number.isInteger(sourceCellW) || !Number.isInteger(sourceCellH)) {
      console.error(`[AT] Invalid atlas grid ${atlas.naturalWidth}x${atlas.naturalHeight}`);
      return;
    }

    ready = true;
    console.info(`[AT] Hand-drawn atlas loaded: ${atlas.naturalWidth}x${atlas.naturalHeight}, cell ${sourceCellW}x${sourceCellH}`);
    paintAll();
    delete window.__AT_HANDDRAWN_ATLAS;
  };

  atlas.onerror = () => {
    console.error('[AT] Failed to decode hand-drawn WebP atlas');
  };

  try {
    atlasUrl = makeAtlasBlobUrl(rawAtlasBase64);
    atlas.src = atlasUrl;
  } catch (err) {
    console.error('[AT] Failed to reconstruct hand-drawn atlas:', err);
  }

  AT_ART.characterArt = id => characters[id] ? markup(id, 'character') : oldCharacterArt(id);
  AT_ART.itemArt = id => objects[id] ? markup(id, 'item') : oldItemArt(id);
  window.AT_HANDDRAWN = {
    characters,
    objects,
    paintAll,
    get ready() { return ready; },
    get atlasSize() { return ready ? [atlas.naturalWidth, atlas.naturalHeight] : null; },
    get cellSize() { return ready ? [sourceCellW, sourceCellH] : null; }
  };
})();
