const SAVE_KEY = "ooo_lost_pages_v2";

const QUESTS = {
  bmo: "Отыскать картридж БиМО и победить в игре памяти",
  pb: "Помочь Принцессе Бубльгум восстановить формулу страницы",
  marceline: "Сыграть мелодию вместе с Марселин",
  iceking: "Разобраться с пингвиньей загадкой Ледяного Короля",
  lemongrab: "Навести НЕДОПУСТИМО идеальный порядок",
  flame: "Стабилизировать огненный кристалл",
  jake: "Провести Джейка через растягивающийся лабиринт",
  prismo: "Исправить неудачно сформулированное желание"
};

const ITEMS = {
  cartridge:{name:"Старый картридж",icon:"💾"},
  pie:{name:"Пирог НЭПТР",icon:"🥧"},
  darkkey:{name:"Тёмный ключ",icon:"🗝️"},
  basspick:{name:"Медиатор Марселин",icon:"🎸"},
  candycoil:{name:"Конфетная катушка",icon:"🍬"},
  apple:{name:"Яблоко Деревяшки",icon:"🍎"},
  icegem:{name:"Ледяной кристалл",icon:"💎"},
  firegem:{name:"Огненный кристалл",icon:"🔥"},
  pickle:{name:"Соленье Призмо",icon:"🥒"},
  stretchy:{name:"Жетон Джейка",icon:"🟡"}
};

const CHAR = {
  finn:["Финн","#f4f4ee","F"], jake:["Джейк","#efbd47","J"], bmo:["БиМО","#66cdb5","B"],
  neptr:["НЭПТР","#b8bec6","N"], shelby:["Шелби","#e9c49e","S"], lady:["Леди Ливнерог","#e9a9d0","LR"],
  pb:["Принцесса Бубльгум","#ef8fb8","PB"], peppermint:["Мятный Лакей","#f2eee4","PL"],
  banana:["Банановый страж","#eddb54","BG"], cinnamon:["Коричный Булочка","#d5a175","CB"],
  starchy:["Старчи","#d8c9a5","ST"], marceline:["Марселин","#b5aebb","M"],
  lsp:["Пупырка","#a67dc7","LSP"], iceking:["Ледяной Король","#89d1ec","IK"], gunter:["Гюнтер","#35404a","G"],
  flame:["Принцесса Пламя","#ff7053","FP"], lemongrab:["Лемонграб","#efe05b","LG"],
  lemonhope:["Лемонхоуп","#eee68e","LH"], treetrunks:["Деревяшка","#918876","TT"], mrpig:["Мистер Свин","#e9a5ad","MP"],
  huntress:["Охотница-волшебница","#64a178","HW"], magicman:["Волшебный Человек","#d08cc0","MM"],
  choosegoose:["Выбирающий Гусь","#efedcf","CG"], susan:["Сьюзан Стронг","#d2b38f","SS"],
  billy:["Билли","#d2a566","B"], death:["Смерть","#756b7d","D"], prismo:["Призмо","#ff83aa","P"],
  cosmicowl:["Космическая Сова","#7486ad","CO"], abracadaniel:["Абракаданиэль","#c39bd1","A"],
  rootbeer:["Корневое Пиво","#a77955","RB"], turtle:["Черепашка-принцесса","#86b87a","TP"],
  flambo:["Фламбо","#e95d43","FL"], kingworm:["Король Червь","#d49f4d","KW"]
};

const sceneOrder = ["treehouse","candy","forest","marceline","ice","fire","lemon","wilds","prismo"];

const SCENES = {
  treehouse:{
    kicker:"ГЛАВНАЯ БАЗА", title:"Дом Финна и Джейка",
    desc:"Начни здесь. Осматривай предметы, разговаривай со всеми и собирай вещи.",
    colors:["#8fd6ef","#dff7ff","#87c86f","#5eaa5d"],
    decor:[["🌳",12,55],["🏠",50,54],["☁️",80,18],["🌼",87,73]],
    people:[
      ["finn",24,53],["jake",38,68],["bmo",57,66],["neptr",72,52],["shelby",82,70],["lady",12,73]
    ],
    objects:[["cartridge","📼","Подозрительная кассета",67,78],["sock","🧦","Носок Финна",48,80]]
  },
  candy:{
    kicker:"НАУКА И САХАР", title:"Конфетное королевство",
    desc:"Здесь слишком много науки для места, где половина населения сделана из карамели.",
    colors:["#a9dff1","#f6ecff","#eeaccf","#d98ab4"],
    decor:[["🏰",50,49],["🍭",15,66],["🍬",87,73],["🧪",75,28]],
    people:[
      ["pb",27,55],["peppermint",42,71],["banana",56,57],["cinnamon",68,71],["starchy",81,58],["rootbeer",17,74],["turtle",90,76]
    ],
    objects:[["coil","⚡","Катушка из лаборатории",49,79]]
  },
  forest:{
    kicker:"ЯБЛОКИ И СТРАННОСТИ", title:"Лес Ууу",
    desc:"Самое безопасное место, если не учитывать примерно всё, что здесь живёт.",
    colors:["#8bd0dd","#d9f2e8","#6ab16c","#47854e"],
    decor:[["🌲",14,48],["🌲",88,50],["🍎",55,35],["🪨",71,74]],
    people:[
      ["treetrunks",22,69],["mrpig",34,57],["huntress",52,65],["magicman",66,52],["choosegoose",80,69]
    ],
    objects:[["mushroom","🍄","Очень важный гриб",61,79]]
  },
  marceline:{
    kicker:"НОЧНАЯ СЦЕНА", title:"Дом Марселин",
    desc:"Музыка, старые вещи и сундук, который явно не открывается силой сценария.",
    colors:["#655b82","#9e8eaf","#4f596a","#333b49"],
    decor:[["🌙",82,18],["🎵",20,30],["🏚️",50,52],["🦇",72,39]],
    people:[["marceline",37,62],["lsp",60,55],["death",78,68]],
    objects:[["chest","🧰","Запертый сундук",53,78]]
  },
  ice:{
    kicker:"ПИНГВИНЬЯ ПОЛИТИКА", title:"Ледяное королевство",
    desc:"Ледяной Король утверждает, что всё под контролем. Гюнтер не подтверждает.",
    colors:["#85cdf0","#e9fbff","#bfe8f6","#88cde5"],
    decor:[["🏔️",15,47],["🏰",50,50],["❄️",82,22],["🧊",84,72]],
    people:[["iceking",35,61],["gunter",55,72],["abracadaniel",73,60]],
    objects:[["icegem","💎","Кристалл во льду",84,79]]
  },
  fire:{
    kicker:"НЕ ТРОГАТЬ РУКАМИ", title:"Огненное королевство",
    desc:"Для прохождения желательно сохранить брови. Хотя в браузере они вне зоны поражения.",
    colors:["#7a5c68","#d48368","#d75a42","#a53b32"],
    decor:[["🌋",16,50],["🏯",51,53],["🔥",82,66],["🔥",71,34]],
    people:[["flame",34,62],["cinnamon",58,70],["flambo",76,55]],
    objects:[["firegem","🔶","Перегретый кристалл",84,78]]
  },
  lemon:{
    kicker:"НЕДОПУСТИМО", title:"Замок Лемонграба",
    desc:"Даже расположение камней здесь регулируется. Возможно, отдельным указом.",
    colors:["#d9d270","#f4ed9c","#d5cb5d","#a9a347"],
    decor:[["🏰",48,50],["🍋",15,65],["🍋",86,37],["📏",75,70]],
    people:[["lemongrab",34,61],["lemonhope",59,68],["kingworm",76,55]],
    objects:[["lemonpile","🍋","Куча лимонов",83,79]]
  },
  wilds:{
    kicker:"ГЕРОИ И ЛЕГЕНДЫ", title:"Дальние земли",
    desc:"Локация для разговоров, побочных подсказок и пары совершенно лишних героических поз.",
    colors:["#9ccfe0","#e0f1dd","#87a76b","#687e55"],
    decor:[["⛰️",14,50],["🗿",50,52],["⚔️",82,30],["🌾",75,73]],
    people:[["susan",22,66],["billy",39,56],["huntress",55,70],["choosegoose",70,57],["magicman",84,70]],
    objects:[["tablet","🪨","Каменная табличка",52,80]]
  },
  prismo:{
    kicker:"ЗА ПРЕДЕЛАМИ КАРТЫ", title:"Комната Призмо",
    desc:"Открывается после шести страниц. Желания здесь исполняются буквально, что никогда не заканчивается хорошо.",
    colors:["#5c426e","#93648b","#ca7590","#9b536e"],
    decor:[["✨",18,27],["🌀",49,52],["⭐",82,26],["🥒",77,70]],
    people:[["prismo",35,62],["cosmicowl",61,57],["death",78,70]],
    objects:[["pickle","🥒","Подозрительное соленье",86,79]],
    locked:()=>state.pages.length<6
  }
};

const DEFAULT_STATE = {
  scene:"treehouse",
  inventory:[],
  pages:[],
  completed:{},
  flags:{},
  seen:{}
};

let state = load();

function load(){
  try{
    const raw=localStorage.getItem(SAVE_KEY);
    return raw ? Object.assign(structuredClone(DEFAULT_STATE),JSON.parse(raw)) : structuredClone(DEFAULT_STATE);
  }catch(e){return structuredClone(DEFAULT_STATE)}
}
function save(){localStorage.setItem(SAVE_KEY,JSON.stringify(state));updateHud()}
function resetGame(){
  if(confirm("Стереть весь прогресс и начать заново?")){
    localStorage.removeItem(SAVE_KEY);state=structuredClone(DEFAULT_STATE);renderScene();toast("Новая игра началась")
  }
}
function has(id){return state.inventory.includes(id)}
function give(id){
  if(!has(id)){state.inventory.push(id);save();toast(`Получено: ${ITEMS[id].icon} ${ITEMS[id].name}`)}
}
function take(id){state.inventory=state.inventory.filter(x=>x!==id);save()}
function complete(id,label){
  if(!state.pages.includes(id)){
    state.pages.push(id);state.completed[id]=true;save();toast(`📖 Найдена страница: ${label}`)
  }
}
function updateHud(){
  pagesCounter.textContent=`${state.pages.length} / 8`;
  progressFill.style.width=`${state.pages.length/8*100}%`;
}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function toast(text){
  const t=document.getElementById("toast");t.textContent=text;t.classList.remove("hidden");
  clearTimeout(window.__toast);window.__toast=setTimeout(()=>t.classList.add("hidden"),2400)
}
function openModal(html){
  modalBody.innerHTML=html;modal.classList.remove("hidden");modal.setAttribute("aria-hidden","false")
}
function closeModal(){modal.classList.add("hidden");modal.setAttribute("aria-hidden","true")}
document.addEventListener("click",e=>{if(e.target.dataset.close==="1")closeModal()})
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()})

function renderScene(){
  let s=SCENES[state.scene];
  if(s.locked && s.locked()){state.scene="treehouse";s=SCENES.treehouse}
  scene.style.setProperty("--sky1",s.colors[0]);scene.style.setProperty("--sky2",s.colors[1]);
  scene.style.setProperty("--ground1",s.colors[2]);scene.style.setProperty("--ground2",s.colors[3]);
  sceneKicker.textContent=s.kicker;sceneTitle.textContent=s.title;sceneDescription.textContent=s.desc;
  sceneDecor.innerHTML=s.decor.map(([e,x,y])=>`<div class="decor" style="left:${x}%;top:${y}%">${e}</div>`).join("");
  hotspots.innerHTML="";
  s.people.forEach(([id,x,y])=>addCharacter(id,x,y));
  s.objects.forEach(([id,icon,label,x,y])=>addObject(id,icon,label,x,y));
  updateHud();
}
function addCharacter(id,x,y){
  const [name,color,initials]=CHAR[id];
  const b=document.createElement("button");
  b.className="hotspot"+(state.completed[id]?" done":"");
  b.style.setProperty("--x",x+"%");b.style.setProperty("--y",y+"%");
  b.innerHTML=`<div class="character-figure" style="--c:${color}">${initials}</div><div class="hotspot-label">${name}</div>`;
  b.onclick=()=>talk(id);hotspots.appendChild(b)
}
function addObject(id,icon,label,x,y){
  const b=document.createElement("button");b.className="hotspot object";
  b.style.setProperty("--x",x+"%");b.style.setProperty("--y",y+"%");
  b.innerHTML=`<div class="character-figure">${icon}</div><div class="hotspot-label">${label}</div>`;
  b.onclick=()=>inspectObject(id);hotspots.appendChild(b)
}

function showDialog(id,text,actions=[]){
  const [name,color,initials]=CHAR[id];
  openModal(`<div class="dialog-head">
    <div class="portrait" style="--c:${color}">${initials}</div>
    <div><div class="dialog-name">${name}</div><div class="dialog-sub">${SCENES[state.scene].title}</div></div>
  </div>
  <div class="dialog-text">${text}</div>
  <div id="dialogActions" class="dialog-actions"></div>
  <div class="note">Фанатский некоммерческий прототип. Графические ассеты можно заменить в <b>web/assets</b>.</div>`);
  const box=document.getElementById("dialogActions");
  actions.forEach(a=>{
    const b=document.createElement("button");b.className="dialog-btn"+(a.primary?" primary":"")+(a.danger?" danger":"");
    b.textContent=a.label;b.onclick=a.run;box.appendChild(b)
  })
}

function talk(id){
  state.seen[id]=true;save();
  switch(id){
    case "finn":
      if(state.pages.length===8){
        showDialog(id,"Все восемь страниц собраны! Книга снова целая. Финн предлагает закончить приключение торжественным героическим жестом.",[
          {label:"Собрать Энхиридион",primary:true,run:finishGame},{label:"Ещё погулять",run:closeModal}
        ]);
      }else showDialog(id,`Мы нашли ${state.pages.length} из 8 страниц.\n\nГлавные зацепки: БиМО, Бубльгум, Марселин, Ледяной Король, Лемонграб, Принцесса Пламя, Джейк и Призмо. Не обязательно проходить их строго по порядку.`);
      break;
    case "jake":
      if(state.completed.jake) return showDialog(id,"Джейк теперь называет себя профессиональным лабиринтом. Никто не стал уточнять, что это значит.");
      if(!has("stretchy")){
        showDialog(id,"Джейк нашёл жёлтый жетон и уверен, что это «ключ ко всему». В его защиту, иногда он действительно может стать ключом.",[
          {label:"Взять жетон",primary:true,run:()=>{give("stretchy");startStretch()}}
        ])
      }else{
        showDialog(id,"Джейк предлагает испытание: провести его растянутую форму через клетки от старта до зелёного выхода.",[
          {label:"Начать мини-игру",primary:true,run:startStretch}
        ])
      }
      break;
    case "bmo":
      if(state.completed.bmo) return showDialog(id,"БиМО хранит твою победу в таблице рекордов. Таблица состоит из одного имени, но технически это всё равно рекорд.");
      if(!has("cartridge")) return showDialog(id,"БиМО потерял картридж где-то в доме. Осмотри предметы вокруг. Да, игра заставляет тебя искать вещь буквально в той же комнате.");
      showDialog(id,"Картридж найден! На нём игра памяти. Найди все пары значков, и БиМО отдаст страницу.",[
        {label:"Играть",primary:true,run:startMemory}
      ]);
      break;
    case "neptr":
      if(!has("pie")){
        showDialog(id,"НЭПТР приготовил пирог. Он очень гордится. Вопрос о санитарных нормах сознательно опущен.",[
          {label:"Взять пирог",primary:true,run:()=>{give("pie");showDialog(id,"Пирог теперь в рюкзаке. Возможно, кому-то в Ууу он действительно понадобится.")}}
        ]);
      } else showDialog(id,"НЭПТР предлагает оценить пирог по шкале от «съедобно» до «это сюжетный предмет». Очевидно, второе.");
      break;
    case "shelby":
      showDialog(id,has("cartridge")?"Шелби замечает картридж: «БиМО точно будет рад. Или скажет, что это его брат. С ним не угадаешь.»":"Шелби видел что-то прямоугольное возле старого носка. Это почти подсказка.");
      break;
    case "lady":
      showDialog(id,"Леди Ливнерог что-то мелодично говорит Джейку. Джейк переводит: «Не забывай иногда смотреть на предметы, а не только разговаривать с людьми.»");
      break;
    case "pb":
      if(state.completed.pb) return showDialog(id,"Бубльгум уже записала результат эксперимента в лабораторный журнал и назначила ему номер. Наконец-то настоящее приключение: бюрократия.");
      if(!has("candycoil")) return showDialog(id,"Для эксперимента нужна конфетная электрическая катушка. Она лежала где-то прямо перед лабораторией. Охрана здесь потрясающая.");
      showDialog(id,"Нужно выбрать два компонента. Страница реагирует на сочетание сладкого и электрического, но не любит кислоту.",[
        {label:"Открыть лабораторию",primary:true,run:startLab}
      ]);
      break;
    case "peppermint":
      if(has("pie")&&!has("darkkey")){
        showDialog(id,"Мятный Лакей неожиданно заинтересован пирогом НЭПТР и предлагает тёмный ключ. Чем меньше вопросов, тем спокойнее жизнь.",[
          {label:"Обменять пирог на ключ",primary:true,run:()=>{take("pie");give("darkkey");showDialog(id,"Сделка завершена. Ключ явно открывает что-то старое и драматичное.")}},
          {label:"Не сейчас",run:closeModal}
        ])
      } else if(has("darkkey")) showDialog(id,"Мятный Лакей улыбается. Это всё ещё не выглядит безопасно.");
      else showDialog(id,"«Если встретишь экзотическую выпечку, приходи. Я коллекционирую... рецепты.»");
      break;
    case "banana":
      showDialog(id,"Банановый страж охраняет лабораторию. Он сообщает, что пропуска нет, но Бубльгум разрешила тебе проходить. После минутного раздумья он решает, что это и есть пропуск.");
      break;
    case "cinnamon":
      showDialog(id,state.scene==="fire"?"Коричный Булочка очень серьёзно относится к огненному королевству и советует держать кристалл в жёлтой зоне шкалы.":"Коричный Булочка пытается помочь сразу всем и поэтому пока стоит здесь.");
      break;
    case "starchy":
      showDialog(id,"Старчи убеждён, что пропавшие страницы связаны с заговором. На этот раз, к несчастью для всех, он почти прав.");
      break;
    case "rootbeer":
      showDialog(id,"Корневое Пиво советует вести список подозрительных событий. Пока список состоит из всего происходящего.");
      break;
    case "turtle":
      showDialog(id,"Черепашка-принцесса сообщает, что всё важное обычно лежит в инвентаре. Невероятное знание для NPC.");
      break;
    case "treetrunks":
      if(!has("apple")){
        showDialog(id,"Деревяшка предлагает яблоко, если ответишь: что лучше взять в долгое путешествие?",[
          {label:"Запас еды",run:()=>{give("apple");showDialog(id,"«Разумный выбор, милый». Яблоко получено.")}},
          {label:"Двенадцать мечей",run:()=>showDialog(id,"Деревяшка мягко напоминает, что мечи плохо утоляют голод.")},
          {label:"Ещё один рюкзак для рюкзаков",run:()=>showDialog(id,"Инвентарь протестует против этой идеи.")}
        ])
      } else showDialog(id,"Деревяшка рада, что яблоко пригодилось хотя бы как доказательство существования витаминов в Ууу.");
      break;
    case "mrpig":
      showDialog(id,"Мистер Свин говорит, что видел Волшебного Человека рядом с каменной табличкой. Из этого нельзя сделать ни одного успокаивающего вывода.");
      break;
    case "huntress":
      showDialog(id,"Охотница-волшебница: «Некоторые загадки решаются вниманием, а не предметами». Хороший совет, особенно когда инвентарь уже похож на мусорный ящик.");
      break;
    case "magicman":
      showDialog(id,"Волшебный Человек утверждает, что превратил одну подсказку в другую подсказку, а затем потерял обе. Очень в его стиле.");
      break;
    case "choosegoose":
      showDialog(id,"Выбирающий Гусь предлагает выбор: «Подсказка или загадка?»\n\nПодсказка: тёмный ключ связан с домом Марселин. Загадка: почему гусь рифмует, если никто не просил?");
      break;
    case "marceline":
      if(state.completed.marceline) return showDialog(id,"Марселин играет победный рифф. Он звучит значительно лучше системного звука браузера.");
      if(!has("basspick")){
        return showDialog(id,has("darkkey")?"Сначала открой сундук тёмным ключом. Внутри лежит вещь, без которой мини-игра не стартует.":"Где-то здесь лежит мой старый медиатор. Сундук закрыт, а Мятный Лакей любит подозрительные ключи.")
      }
      showDialog(id,"Марселин сыграет последовательность нот. Повтори её. Три раунда, и страница твоя.",[
        {label:"Играть",primary:true,run:startSimon}
      ]);
      break;
    case "lsp":
      showDialog(id,"Пупырка уверена, что именно она должна быть главным персонажем игры. Она также требует отдельный экран загрузки со своим портретом.");
      break;
    case "death":
      showDialog(id,"Смерть сообщает, что сегодня никого забирать не планирует. Для детского квеста это неожиданно полезная административная информация.");
      break;
    case "iceking":
      if(state.completed.iceking) return showDialog(id,"Ледяной Король теперь утверждает, что загадка была частью его грандиозного экзамена. Гюнтер молчит.");
      showDialog(id,"Ледяной Король потерял страницу среди одинаковых пингвинов. Гюнтер знает, кто настоящий Гюнтер. Это предложение звучит хуже, чем должно.",[
        {label:"Искать Гюнтера",primary:true,run:startPenguins}
      ]);
      break;
    case "gunter":
      showDialog(id,state.completed.iceking?"Гюнтер: «Венк.»\n\nПеревод не требуется.":"Гюнтер внимательно смотрит на тебя. Запомни: настоящий Гюнтер чуть-чуть отличается от остальных.");
      break;
    case "abracadaniel":
      showDialog(id,"Абракаданиэль предлагает заклинание поиска: «Найденус штукенус». Оно не работает, но настроение немного улучшает.");
      break;
    case "flame":
      if(state.completed.flame) return showDialog(id,"Кристалл стабилен. Принцесса Пламя одобрительно кивает. Это лучше, чем если бы кристалл снова взорвался.");
      showDialog(id,"Нужно удержать указатель в жёлтой зоне и остановить нагрев. Три удачных попадания стабилизируют кристалл.",[
        {label:"Стабилизировать",primary:true,run:startFire}
      ]);
      break;
    case "flambo":
      showDialog(id,"Фламбо советует не держать огонь слишком долго. Для существа из огня это довольно убедительно.");
      break;
    case "lemongrab":
      if(state.completed.lemongrab) return showDialog(id,"Лемонграб всё ещё недоволен, но теперь это обычное состояние, а не квестовое.");
      showDialog(id,"Пять объектов должны стоять в порядке: лимон, ключ, корона, яблоко, книга. Нажимай на предметы в правильной последовательности.",[
        {label:"Начать сортировку",primary:true,run:startOrder}
      ]);
      break;
    case "lemonhope":
      showDialog(id,"Лемонхоуп шепчет правильный порядок, потому что хочет поскорее уйти: лимон → ключ → корона → яблоко → книга.");
      break;
    case "kingworm":
      showDialog(id,"Король Червь предлагает не смотреть ему в глаза слишком долго. Даже CSS сейчас слегка нервничает.");
      break;
    case "susan":
      showDialog(id,"Сьюзан Стронг считает, что некоторые задачи проще решать напрямую. К сожалению, кнопку «проломить стену» мы в эту версию не добавляли.");
      break;
    case "billy":
      showDialog(id,"Билли напоминает Финну: герой не обязан всё делать мечом. Иногда достаточно пройти мини-игру на JavaScript. Эпохи меняются.");
      break;
    case "prismo":
      if(state.pages.length<6) return showDialog(id,"Призмо пока не может впустить тебя в основную загадку. Нужно минимум шесть страниц.");
      if(state.completed.prismo) return showDialog(id,"Желание сформулировано аккуратно. Призмо явно впечатлён тем, что никто не попросил бесконечное количество бесконечных желаний.");
      showDialog(id,"Кто-то пожелал: «Пусть все страницы всегда будут рядом со мной». Теперь одна страница застряла между вариантами реальности. Выбери формулировку, которая не создаёт парадокс.",[
        {label:"Исправить желание",primary:true,run:startPrismo}
      ]);
      break;
    case "cosmicowl":
      showDialog(id,"Космическая Сова говорит, что видела во сне книгу с восемью страницами. Очень удобно, что пророчества иногда умеют считать.");
      break;
    default:
      showDialog(id,"Персонаж кивает. Диалог для него ещё не написал даже Волшебный Человек.")
  }
}

function inspectObject(id){
  switch(id){
    case "cartridge":
      if(!has("cartridge")){give("cartridge");openModal(`<div class="game-title">📼 Найден картридж</div><p>Похоже, это потерянная игра БиМО. Теперь с ним можно поговорить.</p>`)}
      else toast("Картридж уже в рюкзаке");
      break;
    case "sock":
      openModal(`<div class="game-title">🧦 Носок Финна</div><p>Под ним ничего нет. Однако именно рядом с ним лежал картридж. Великая археология Ууу.</p>`);
      break;
    case "coil":
      if(!has("candycoil")) give("candycoil"); else toast("Катушка уже взята");
      break;
    case "mushroom":
      openModal(`<div class="game-title">🍄 Гриб</div><p>На вид совершенно обычный. В Ууу это, скорее всего, маскировка.</p>`);
      break;
    case "chest":
      if(has("basspick")) return toast("Сундук уже пуст");
      if(!has("darkkey")) return openModal(`<div class="game-title">🧰 Старый сундук</div><p>Нужен необычный ключ. Мятный Лакей в Конфетном королевстве явно что-то знает.</p>`);
      take("darkkey");give("basspick");
      openModal(`<div class="game-title">🎸 Сундук открыт</div><p>Внутри медиатор Марселин. Теперь можно сыграть музыкальную мини-игру.</p>`);
      break;
    case "icegem":
      if(!has("icegem"))give("icegem"); else toast("Кристалл уже взят");
      break;
    case "firegem":
      if(!has("firegem"))give("firegem"); else toast("Кристалл уже взят");
      break;
    case "lemonpile":
      openModal(`<div class="game-title">🍋 Лимоны</div><p>Их ровно семь. Восемь, по словам Лемонграба, было бы НЕДОПУСТИМО.</p>`);
      break;
    case "tablet":
      openModal(`<div class="game-title">🪨 Каменная табличка</div><p>Надпись: «Шесть страниц открывают дверь туда, чего нет на обычной карте».</p>`);
      break;
    case "pickle":
      if(!has("pickle"))give("pickle"); else toast("Соленье уже в рюкзаке");
      break;
  }
}

function inventory(){
  const cards=state.inventory.map(id=>`<div class="item"><div class="item-icon">${ITEMS[id]?.icon||"❓"}</div><div class="item-name">${ITEMS[id]?.name||id}</div></div>`).join("");
  openModal(`<div class="game-title">🎒 Инвентарь</div><p class="game-sub">Некоторые предметы меняют реплики и открывают новые действия.</p><div class="inventory-grid">${cards||'<div class="empty-state">Пока пусто. Придётся трогать подозрительные вещи.</div>'}</div>`)
}
function journal(){
  openModal(`<div class="game-title">📜 Задания</div><div class="quest-list">${Object.entries(QUESTS).map(([id,q])=>`<div class="quest ${state.completed[id]?"done":""}"><b>${state.completed[id]?"✓":"•"}</b><span>${q}</span></div>`).join("")}</div>`)
}
function showMap(){
  openModal(`<div class="game-title">🗺 Карта Ууу</div><p class="game-sub">Переходы мгновенные. Мы решили не симулировать двадцать минут ходьбы ради реализма.</p><div class="map-grid" id="mapGrid"></div>`);
  const grid=document.getElementById("mapGrid");
  sceneOrder.forEach(id=>{
    const s=SCENES[id],locked=s.locked&&s.locked();
    const b=document.createElement("button");b.className="map-place"+(locked?" locked":"");
    b.innerHTML=`<strong>${s.title}</strong><small>${locked?"Нужно 6 страниц":s.kicker}</small>`;
    b.onclick=()=>{if(locked)return toast("Сначала собери 6 страниц");state.scene=id;save();closeModal();renderScene()};
    grid.appendChild(b)
  })
}

function help(){
  openModal(`<div class="game-title">Как играть</div>
  <p>Это point-and-click квест. Нажимай на персонажей и предметы. Некоторые вещи попадают в инвентарь и открывают новые реплики.</p>
  <p><b>Цель:</b> собрать 8 страниц Энхиридиона через восемь мини-игр. Первые семь областей доступны сразу. Комната Призмо откроется после шести страниц.</p>
  <p><b>Подсказка для старта:</b> найди картридж в доме и поговори с БиМО. НЭПТР тоже отдаёт полезный предмет.</p>
  <div class="dialog-actions"><button id="resetInside" class="dialog-btn danger">Сбросить прогресс</button></div>`);
  document.getElementById("resetInside").onclick=resetGame
}

/* ---------- MINI GAMES ---------- */

function gameShell(title,sub,body){
  openModal(`<div class="game-title">${title}</div><div class="game-sub">${sub}</div>${body}<div id="gameStatus" class="game-status"></div>`)
}
function success(id,label,msg){
  complete(id,label);
  setTimeout(()=>openModal(`<div class="result-good">✅ ${msg}</div><p>Получена страница Энхиридиона.</p><div class="dialog-actions"><button class="dialog-btn primary" data-close="1">Продолжить</button></div>`),220)
}

function startMemory(){
  const symbols=["🍎","⚔️","👑","🐌","🍎","⚔️","👑","🐌"].sort(()=>Math.random()-.5);
  gameShell("🎮 Игра БиМО","Открой все четыре пары. Карты закрываются, если значки разные.",`<div id="memoryGrid" class="memory-grid"></div>`);
  let first=null,lock=false,matched=0;
  symbols.forEach((s,i)=>{
    const b=document.createElement("button");b.className="memory-card";b.textContent=s;b.dataset.i=i;
    b.onclick=()=>{
      if(lock||b.classList.contains("matched")||b===first)return;
      b.classList.add("open");
      if(!first){first=b;return}
      if(first.textContent===b.textContent){
        first.classList.add("matched");b.classList.add("matched");matched+=2;first=null;
        if(matched===symbols.length)success("bmo","Память","БиМО объявляет тебя чемпионом гостиной.")
      }else{
        lock=true;const a=first;first=null;setTimeout(()=>{a.classList.remove("open");b.classList.remove("open");lock=false},650)
      }
    };
    memoryGrid.appendChild(b)
  })
}

function startLab(){
  gameShell("🧪 Лаборатория Бубльгум","Выбери ровно два компонента. Нужны сладость + электричество.",`<div id="labGrid" class="lab-grid"></div><button id="mixBtn" class="game-btn primary">Смешать</button>`);
  const opts=[["sugar","🍬 Сахар"],["spark","⚡ Искра"],["acid","🧴 Кислота"],["ice","🧊 Лёд"]];
  let selected=[];
  opts.forEach(([id,label])=>{
    const b=document.createElement("button");b.className="lab-choice";b.textContent=label;
    b.onclick=()=>{
      if(selected.includes(id)){selected=selected.filter(x=>x!==id);b.classList.remove("selected")}
      else if(selected.length<2){selected.push(id);b.classList.add("selected")}
    };labGrid.appendChild(b)
  });
  mixBtn.onclick=()=>{
    if(selected.length!==2)return gameStatus.textContent="Нужно выбрать два компонента.";
    if(selected.includes("sugar")&&selected.includes("spark"))success("pb","Наука","Формула совпала. Бубльгум выглядит почти довольной.");
    else gameStatus.textContent="Смесь шипит, но страница не реагирует. Попробуй другое сочетание."
  }
}

function startSimon(){
  gameShell("🎸 Рифф Марселин","Слушай последовательность цветов и повторяй. Нужно пройти 3 раунда.",`<div id="simonRow" class="simon-row"></div><button id="simonStart" class="game-btn primary">Слушать</button>`);
  const colors=["#e86a72","#65b3df","#ebcb56","#70bd82"];let seq=[],input=[],round=0,busy=false;
  colors.forEach((c,i)=>{
    const b=document.createElement("button");b.className="simon-pad";b.style.background=c;b.dataset.i=i;
    b.onclick=()=>{
      if(busy||seq.length===0)return;
      input.push(i);flash(b);
      const k=input.length-1;
      if(input[k]!==seq[k]){gameStatus.textContent="Мимо ноты. Начинаем раунд заново.";input=[];return}
      if(input.length===seq.length){
        round++;input=[];
        if(round>=3)return success("marceline","Музыка","Последний аккорд открывает спрятанную страницу.");
        gameStatus.textContent=`Раунд ${round} пройден. Нажми «Слушать».`
      }
    };simonRow.appendChild(b)
  });
  function flash(b){b.classList.add("flash");setTimeout(()=>b.classList.remove("flash"),220)}
  simonStart.onclick=async()=>{
    if(busy)return;busy=true;seq.push(Math.floor(Math.random()*4));input=[];gameStatus.textContent="Слушай...";
    for(const i of seq){await new Promise(r=>setTimeout(r,380));flash(simonRow.children[i])}
    setTimeout(()=>{busy=false;gameStatus.textContent="Теперь повтори."},350)
  }
}

function startPenguins(){
  gameShell("🐧 Где настоящий Гюнтер?","Настоящий Гюнтер отличается маленькой короной. Найди его за три попытки.",`<div id="penguinGrid" class="penguin-grid"></div>`);
  const real=Math.floor(Math.random()*9);let tries=0;
  for(let i=0;i<9;i++){
    const b=document.createElement("button");b.className="penguin";b.textContent=i===real?"🐧♛":"🐧";
    b.onclick=()=>{
      tries++;
      if(i===real)success("iceking","Пингвины","Гюнтер найден. Ледяной Король делает вид, что так и задумано.");
      else{
        b.disabled=true;b.style.opacity=.35;gameStatus.textContent=tries<3?`Не он. Осталось попыток: ${3-tries}`:"Попытки закончились. Расстановка пингвинов перемешана."; 
        if(tries>=3)setTimeout(startPenguins,700)
      }
    };penguinGrid.appendChild(b)
  }
}

function startOrder(){
  gameShell("🍋 Идеальный порядок","Нажимай предметы в порядке: лимон → ключ → корона → яблоко → книга.",`<div id="orderRow" class="order-row"></div><button id="orderReset" class="game-btn">Сбросить</button>`);
  const target=["🍋","🗝️","👑","🍎","📖"],pool=[...target].sort(()=>Math.random()-.5),picked=[];
  pool.forEach(sym=>{
    const b=document.createElement("button");b.className="order-token";b.textContent=sym;
    b.onclick=()=>{
      if(b.disabled)return;b.disabled=true;b.style.opacity=.35;picked.push(sym);
      if(picked[picked.length-1]!==target[picked.length-1]){
        gameStatus.textContent="НЕДОПУСТИМО! Порядок нарушен.";setTimeout(startOrder,650);return
      }
      if(picked.length===target.length)success("lemongrab","Порядок","Лемонграб не кричит целых две секунды. Это считается триумфом.")
    };orderRow.appendChild(b)
  });
  orderReset.onclick=startOrder
}

function startFire(){
  gameShell("🔥 Огненный кристалл","Останови указатель в жёлтой зоне три раза.",`<div class="fire-meter"><div id="firePointer" class="fire-pointer"></div></div><button id="fireStop" class="game-btn primary">СТОП</button>`);
  let pos=3,dir=1,hits=0,active=true;
  const timer=setInterval(()=>{if(!active)return;pos+=dir*2.3;if(pos>=98){pos=98;dir=-1}if(pos<=2){pos=2;dir=1}firePointer.style.left=pos+"%"},35);
  fireStop.onclick=()=>{
    if(!active)return;
    if(pos>=35&&pos<=65){
      hits++;gameStatus.textContent=`Удачно: ${hits}/3`;active=false;
      if(hits>=3){clearInterval(timer);success("flame","Огонь","Кристалл стабилен, страница проявилась в пламени.");return}
      setTimeout(()=>{active=true},500)
    }else{hits=0;gameStatus.textContent="Слишком холодно или слишком горячо. Счёт удачных попаданий сброшен."}
  };
  const obs=new MutationObserver(()=>{if(modal.classList.contains("hidden")){clearInterval(timer);obs.disconnect()}});
  obs.observe(modal,{attributes:true})
}

function startStretch(){
  gameShell("🟡 Джейк-лабиринт","Проведи путь от 🟡 к 🟢. Нажимай соседние клетки. Серые клетки нельзя занимать.",`<div id="stretchBoard" class="stretch-board"></div><button id="stretchReset" class="game-btn">Начать заново</button>`);
  const N=5,start=20,goal=4,blocks=new Set([6,7,11,13,16,18]),path=[start];
  function draw(){
    stretchBoard.innerHTML="";
    for(let i=0;i<N*N;i++){
      const c=document.createElement("button");c.className="stretch-cell";
      if(blocks.has(i)){c.classList.add("block");c.textContent="✖";c.disabled=true}
      if(path.includes(i)){c.classList.add("path");c.textContent=i===start?"🟡":"•"}
      if(i===goal){c.classList.add("goal");c.textContent="🟢"}
      c.onclick=()=>step(i);stretchBoard.appendChild(c)
    }
  }
  function step(i){
    const last=path[path.length-1],r=Math.floor(last/N),c=last%N,rr=Math.floor(i/N),cc=i%N;
    if(Math.abs(r-rr)+Math.abs(c-cc)!==1||blocks.has(i)||path.includes(i))return gameStatus.textContent="Можно двигаться только в соседнюю свободную клетку.";
    path.push(i);draw();
    if(i===goal)success("jake","Гибкость","Джейк добрался до выхода и обнаружил страницу в собственной растянутой форме. Даже он удивлён.")
  }
  stretchReset.onclick=startStretch;draw()
}

function startPrismo(){
  gameShell("✨ Желание Призмо","Выбери формулировку без опасного буквального толкования.",`<div id="triviaOptions" class="trivia-options"></div>`);
  const opts=[
    ["bad1","Пусть все страницы навсегда будут у меня."],
    ["good","Я хочу безопасно вернуть только потерянные страницы этой книги на их исходные места, не меняя ничего другого."],
    ["bad2","Сделай так, чтобы страницы больше никогда не могли потеряться."],
    ["bad3","Уничтожь все места, где страниц нет."]
  ];
  opts.forEach(([id,text])=>{
    const b=document.createElement("button");b.className="trivia-option";b.textContent=text;
    b.onclick=()=>{
      if(id==="good")success("prismo","Желание","Призмо одобряет формулировку. Парадокс отменён.");
      else gameStatus.textContent="Призмо морщится: это желание можно исполнить очень неприятным способом."
    };triviaOptions.appendChild(b)
  })
}

function finishGame(){
  openModal(`<div class="finish"><div class="book">📖✨</div><div class="game-title">Энхиридион снова цел!</div>
  <p>Финн, Джейк и остальные собираются в доме на дереве. БиМО немедленно предлагает снова потерять восемь картриджей ради продолжения.</p>
  <p><b>Ты прошёл прототип.</b></p>
  <div class="dialog-actions" style="justify-content:center"><button id="keepPlaying" class="dialog-btn primary">Продолжить гулять</button><button id="restartGame" class="dialog-btn">Начать заново</button></div></div>`);
  keepPlaying.onclick=closeModal;restartGame.onclick=resetGame
}

/* ---------- NAV ---------- */
function moveScene(delta){
  let idx=sceneOrder.indexOf(state.scene);
  for(let n=1;n<=sceneOrder.length;n++){
    let ni=(idx+delta*n+sceneOrder.length)%sceneOrder.length,id=sceneOrder[ni],s=SCENES[id];
    if(!(s.locked&&s.locked())){state.scene=id;save();renderScene();return}
  }
}
prevSceneBtn.onclick=()=>moveScene(-1);nextSceneBtn.onclick=()=>moveScene(1);
mapBtn.onclick=showMap;inventoryBtn.onclick=inventory;journalBtn.onclick=journal;helpBtn.onclick=help;

renderScene();
