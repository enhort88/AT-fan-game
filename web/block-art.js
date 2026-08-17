(() => {
  const old = AT_ART.characterArt;
  const I = '#20242b';
  const svg = body => `<svg class="fan-svg block-sprite" viewBox="0 0 96 128" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${body}</svg>`;
  const cube = (x,y,w,h,c,d=5) => `<g stroke="${I}" stroke-width="1.8" stroke-linejoin="miter"><polygon points="${x},${y+d} ${x+d},${y} ${x+w+d},${y} ${x+w},${y+d}" fill="${c}"/><polygon points="${x+w},${y+d} ${x+w+d},${y} ${x+w+d},${y+h} ${x+w},${y+h+d}" fill="${c}"/><rect x="${x}" y="${y+d}" width="${w}" height="${h}" fill="${c}"/><polygon points="${x},${y+d} ${x+d},${y} ${x+w+d},${y} ${x+w},${y+d}" fill="#fff" opacity=".15" stroke="none"/><polygon points="${x+w},${y+d} ${x+w+d},${y} ${x+w+d},${y+h} ${x+w},${y+h+d}" fill="#000" opacity=".18" stroke="none"/></g>`;
  const rect = (x,y,w,h,c,sw=1.6) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c}" stroke="${I}" stroke-width="${sw}"/>`;
  const eye = (x,y,w=3,h=4,c=I) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c}"/>`;
  const mouth = (x,y,w=8,c=I) => `<rect x="${x}" y="${y}" width="${w}" height="2" fill="${c}"/>`;
  const human = (o={}) => {
    const skin=o.skin||'#efc3a5', shirt=o.shirt||'#6da8cc', pants=o.pants||'#344b7a', hair=o.hair||'', shoe=o.shoe||'#292d35';
    let s='';
    if(o.backpack) s+=cube(61,55,8,31,o.backpack,4);
    s+=cube(34,88,10,26,pants,3)+cube(49,88,10,26,pants,3)+cube(33,113,12,7,shoe,2)+cube(48,113,12,7,shoe,2);
    s+=cube(30,56,30,32,shirt,5)+cube(20,59,8,28,skin,3)+cube(63,59,8,28,skin,3);
    if(o.longHair) s+=cube(24,20,44,63,hair||'#25262d',5);
    s+=cube(29,22,34,31,skin,5);
    if(hair&&!o.noHair) s+=rect(29,27,34,9,hair)+rect(29,33,6,17,hair)+rect(57,33,6,17,hair);
    s+=eye(39,39,3,4)+eye(51,39,3,4)+mouth(42,48,9);
    if(o.hat) s+=o.hat;
    if(o.after) s+=o.after;
    return svg(s);
  };
  const hatFinn = rect(26,20,40,12,'#f7f5ea')+rect(26,29,6,18,'#f7f5ea')+rect(60,29,6,18,'#f7f5ea')+cube(27,10,8,13,'#f7f5ea',3)+cube(57,10,8,13,'#f7f5ea',3);
  const crown = rect(34,16,25,6,'#f1cf44')+rect(34,10,5,8,'#f1cf44')+rect(44,6,5,12,'#f1cf44')+rect(54,10,5,8,'#f1cf44');
  const sword = `<g transform="rotate(-23 72 78)">${rect(69,54,5,41,'#dbe4e8',1.4)}${rect(64,78,15,4,'#8b6b44',1.4)}${rect(70,94,4,15,'#6d4a2d',1.4)}</g>`;
  const chars = {
    finn:()=>human({skin:'#f1c29e',shirt:'#56aede',pants:'#315bb2',shoe:'#f2f2eb',backpack:'#55a954',noHair:true,hat:hatFinn,after:sword}),
    jake:()=>svg(cube(29,22,39,38,'#efb942',5)+cube(34,63,34,33,'#efb942',5)+cube(18,66,10,30,'#efb942',3)+cube(70,66,10,30,'#efb942',3)+cube(38,96,10,24,'#efb942',3)+cube(55,96,10,24,'#efb942',3)+cube(25,13,10,15,'#efb942',3)+cube(62,13,10,15,'#efb942',3)+rect(39,45,20,13,'#d89a34')+eye(38,34,4,5)+eye(55,34,4,5)+rect(46,49,6,5,'#20242b')+mouth(44,57,10)),
    bmo:()=>svg(cube(25,24,47,70,'#58bfae',6)+rect(33,34,31,24,'#d9efd9')+eye(41,42,3,4)+eye(54,42,3,4)+mouth(44,51,9)+rect(34,69,8,8,'#e85d56')+rect(53,69,4,12,'#e9d15f')+rect(59,73,12,4,'#4c8db3')+cube(14,54,8,30,'#58bfae',3)+cube(75,54,8,30,'#58bfae',3)+cube(34,95,9,25,'#58bfae',3)+cube(57,95,9,25,'#58bfae',3)),
    pb:()=>human({skin:'#f2a7c4',shirt:'#e97faf',pants:'#b94f89',hair:'#ed8fb7',longHair:true,noHair:true,hat:crown,after:rect(31,28,30,11,'#ef91b9')}),
    marceline:()=>human({skin:'#b8b7bd',shirt:'#7e2430',pants:'#2d2832',hair:'#22242b',longHair:true,noHair:true,after:rect(29,27,34,11,'#23242b')+`<g transform="rotate(-24 72 82)">${rect(68,58,7,42,'#8e2e3c')}${rect(62,89,19,13,'#9b3944')}${rect(70,50,3,14,'#ded8c8')}</g>`}),
    iceking:()=>human({skin:'#8fcfea',shirt:'#4e9ed3',pants:'#4e9ed3',hair:'#eaf8fb',noHair:true,hat:crown,after:rect(27,46,40,12,'#eefafd')+rect(31,56,32,25,'#eefafd')+rect(37,78,20,18,'#eefafd')}),
    gunter:()=>svg(cube(29,23,38,39,'#252b34',5)+cube(32,64,34,38,'#252b34',5)+rect(35,34,28,22,'#f3f3e9')+rect(39,70,22,26,'#f3f3e9')+eye(40,39,4,5)+eye(54,39,4,5)+rect(46,49,8,5,'#e6a642')+cube(34,101,9,19,'#e6a642',3)+cube(55,101,9,19,'#e6a642',3)),
    flame:()=>human({skin:'#f18a53',shirt:'#e76043',pants:'#b94835',hair:'#ffb538',noHair:true,after:rect(30,20,8,12,'#ffcb4b')+rect(38,12,8,20,'#ffb538')+rect(46,6,8,26,'#ffd04d')+rect(54,13,8,19,'#ff9c32')+rect(62,21,6,12,'#ffca48')}),
    lemongrab:()=>svg(cube(31,20,35,51,'#eddf57',5)+cube(34,73,29,24,'#d6c84a',4)+cube(21,76,8,28,'#d6c84a',3)+cube(66,76,8,28,'#d6c84a',3)+cube(38,99,9,21,'#d6c84a',3)+cube(53,99,9,21,'#d6c84a',3)+eye(40,39,4,4)+eye(54,39,4,4)+rect(39,55,20,7,'#b94e44')+rect(66,47,5,31,'#a4a09a')),
    lsp:()=>svg(cube(28,30,39,36,'#a276c4',6)+cube(23,43,14,20,'#a276c4',4)+cube(61,43,14,20,'#a276c4',4)+cube(36,20,12,15,'#a276c4',4)+cube(50,19,12,16,'#a276c4',4)+rect(46,24,6,6,'#efcf4c')+eye(39,44,4,5)+eye(54,44,4,5)+mouth(43,56,12)),
    treetrunks:()=>svg(cube(30,43,38,34,'#d8d2ba',5)+cube(38,24,29,24,'#d8d2ba',5)+cube(22,28,13,19,'#d8a8b1',3)+cube(66,28,13,19,'#d8a8b1',3)+rect(49,44,8,29,'#d8d2ba')+cube(31,77,9,24,'#d8d2ba',3)+cube(58,77,9,24,'#d8d2ba',3)+eye(43,35,3,4)+eye(56,35,3,4)),
    mrpig:()=>svg(cube(28,30,41,37,'#e7a4ad',5)+cube(34,69,34,30,'#e7a4ad',5)+rect(40,48,20,12,'#d78691')+rect(44,52,4,4,'#8e4d55',0)+rect(53,52,4,4,'#8e4d55',0)+cube(30,20,10,14,'#e7a4ad',3)+cube(60,20,10,14,'#e7a4ad',3)+eye(39,39,4,4)+eye(56,39,4,4)+cube(37,98,9,22,'#e7a4ad',3)+cube(56,98,9,22,'#e7a4ad',3)),
    lady:()=>svg(cube(12,48,18,24,'#e7a4d0',4)+cube(29,42,18,28,'#e8cb55',4)+cube(46,47,18,24,'#73bf77',4)+cube(63,41,18,29,'#75a7dc',4)+cube(75,34,13,24,'#e7a4d0',4)+eye(78,43,3,4)+rect(84,41,6,3,'#a45979')+rect(19,44,5,5,'#f4f1d8')+rect(36,38,5,5,'#f4f1d8')),
    prismo:()=>svg(`<g fill="#ff7da8" stroke="${I}" stroke-width="1.8">${rect(38,15,25,26,'#ff7da8')}${rect(31,43,39,43,'#ff7da8')}${rect(18,54,14,8,'#ff7da8')}${rect(70,54,14,8,'#ff7da8')}${rect(37,86,10,29,'#ff7da8')}${rect(56,86,10,29,'#ff7da8')}</g>`+eye(44,29,3,4)+eye(55,29,3,4)+mouth(45,37,11)),
    cosmicowl:()=>svg(cube(27,27,43,36,'#7084aa',6)+cube(32,65,35,34,'#64749b',5)+cube(21,69,9,28,'#64749b',3)+cube(69,69,9,28,'#64749b',3)+rect(33,33,14,14,'#efe8cd')+rect(51,33,14,14,'#efe8cd')+eye(38,37,4,5)+eye(56,37,4,5)+rect(46,47,8,5,'#d8a04b')+cube(38,99,9,21,'#d8a04b',3)+cube(56,99,9,21,'#d8a04b',3)),
    death:()=>svg(cube(29,19,38,34,'#ece8dc',5)+rect(34,30,11,10,'#25262e')+rect(52,30,11,10,'#25262e')+rect(42,45,15,4,'#25262e')+cube(26,55,44,47,'#2b2b33',6)+cube(17,60,8,35,'#2b2b33',3)+cube(73,60,8,35,'#2b2b33',3)+cube(33,101,11,19,'#2b2b33',3)+cube(54,101,11,19,'#2b2b33',3)),
    neptr:()=>svg(cube(27,30,42,48,'#aeb5bd',5)+rect(35,40,26,17,'#d6d9dd')+eye(40,45,3,4)+eye(54,45,3,4)+rect(39,64,18,5,'#696f76')+cube(18,48,8,31,'#aeb5bd',3)+cube(71,48,8,31,'#aeb5bd',3)+cube(35,80,9,28,'#aeb5bd',3)+cube(55,80,9,28,'#aeb5bd',3)+rect(39,20,5,12,'#8c939a')+rect(55,18,5,14,'#8c939a')),
    shelby:()=>svg(cube(29,52,39,20,'#e8c39b',5)+cube(59,43,17,23,'#e8c39b',4)+eye(64,50,3,4)+eye(70,50,3,4)+rect(74,56,8,3,'#9f7254')),
    peppermint:()=>human({skin:'#f2eee4',shirt:'#9c2433',pants:'#57282e',hair:'#f2eee4',noHair:true,after:rect(29,22,34,31,'#f2eee4')+rect(29,22,17,31,'#c93443')+rect(46,22,17,31,'#f2eee4')+eye(39,39,3,4)+eye(51,39,3,4)+mouth(42,48,9)}),
    banana:()=>human({skin:'#eadb54',shirt:'#eadb54',pants:'#b59e36',hair:'#eadb54',noHair:true,after:rect(31,15,30,10,'#6d7f8a')+rect(42,9,8,10,'#6d7f8a')}),
    cinnamon:()=>human({skin:'#d5a174',shirt:'#c7855e',pants:'#a7674c',hair:'#d5a174',noHair:true,after:rect(29,22,34,31,'#d5a174')+rect(39,31,14,14,'#b86d4f')+eye(39,39,3,4)+eye(51,39,3,4)}),
    starchy:()=>human({skin:'#d8c9a5',shirt:'#6c8cac',pants:'#4e6276',hair:'#f4efdf',after:rect(30,18,32,8,'#f4efdf')}),
    lemonhope:()=>human({skin:'#ece48a',shirt:'#9fc7bf',pants:'#789f98',hair:'#eee68e',noHair:true,after:rect(29,22,34,31,'#eee68e')}),
    huntress:()=>human({skin:'#68aa7a',shirt:'#4d9168',pants:'#3d7655',hair:'#3d7655',hat:rect(27,15,38,13,'#4f936b')+rect(32,9,6,9,'#4f936b')+rect(54,8,6,10,'#4f936b'),after:rect(70,60,5,42,'#9f7244')}),
    magicman:()=>human({skin:'#cba176',shirt:'#cb76b2',pants:'#7e5b95',hair:'#a85aa2',hat:rect(26,17,40,10,'#775796')+rect(42,5,8,14,'#775796')}),
    choosegoose:()=>svg(cube(31,25,32,34,'#efedcf',5)+cube(33,61,30,31,'#efedcf',5)+rect(60,40,23,7,'#e0a33f')+eye(48,39,3,4)+rect(30,18,34,8,'#6c9b57')+cube(38,93,8,25,'#e0a33f',3)+cube(54,93,8,25,'#e0a33f',3)),
    susan:()=>human({skin:'#d7b687',shirt:'#8e7055',pants:'#6f5744',hair:'#e9dfcf',hat:rect(27,16,40,13,'#e9dfcf')+cube(27,7,8,12,'#e9dfcf',3)+cube(59,7,8,12,'#e9dfcf',3)}),
    billy:()=>human({skin:'#d1a45c',shirt:'#8b6b43',pants:'#58442e',hair:'#eee6d1',after:rect(29,45,34,22,'#eee6d1')}),
    abracadaniel:()=>human({skin:'#dfb88d',shirt:'#b98bd0',pants:'#806095',hair:'#eee4cf',hat:rect(26,18,40,9,'#765895')+rect(42,4,8,15,'#765895'),after:rect(73,53,4,58,'#8f704d')}),
    rootbeer:()=>human({skin:'#a9784f',shirt:'#5f4a38',pants:'#423328',hair:'#efe0bd',after:rect(61,33,9,20,'#d5bea3')}),
    turtle:()=>svg(cube(29,28,39,34,'#85b776',5)+cube(27,64,43,37,'#78a86c',6)+rect(35,70,28,25,'#9fc989')+eye(39,40,3,4)+eye(54,40,3,4)+crown+cube(34,101,9,19,'#78a86c',3)+cube(56,101,9,19,'#78a86c',3)),
    flambo:()=>svg(cube(31,42,35,34,'#e85b43',5)+cube(36,78,29,28,'#d74836',4)+rect(34,32,8,12,'#ff9a3e')+rect(43,23,8,21,'#ffc044')+rect(52,30,9,14,'#ff7a35')+eye(41,53,3,4)+eye(54,53,3,4)+mouth(44,65,9)+cube(39,105,8,15,'#d74836',3)+cube(55,105,8,15,'#d74836',3)),
    kingworm:()=>svg(cube(20,50,21,24,'#d49f4d',4)+cube(39,44,21,27,'#d49f4d',4)+cube(58,49,21,25,'#d49f4d',4)+eye(63,57,3,4)+eye(72,57,3,4)+rect(78,63,9,3,'#956b34'))
  };
  AT_ART.characterArt = id => (chars[id] ? chars[id]() : old(id));
})();