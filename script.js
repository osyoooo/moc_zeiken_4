(function(){
  const menu=document.querySelector('.mobile-menu');
  const nav=document.querySelector('.nav-links');
  if(menu&&nav){menu.addEventListener('click',()=>{nav.classList.toggle('open');menu.setAttribute('aria-expanded',nav.classList.contains('open'));});}
  document.querySelectorAll('[data-tabs]').forEach(group=>{
    const tabs=group.querySelectorAll('.tab');
    tabs.forEach(tab=>tab.addEventListener('click',()=>{
      const id=tab.dataset.tab;
      const scope=group.parentElement;
      tabs.forEach(t=>t.classList.remove('active'));
      tab.classList.add('active');
      scope.querySelectorAll('.tab-content').forEach(c=>c.classList.remove('active'));
      const content=scope.querySelector('#'+id);
      if(content) content.classList.add('active');
    }));
  });
  const routeResult=document.querySelector('#route-result');
  const routeCopy={
    db:['税研ウェブサービスへ','税務通信データベース、経営財務データベース、税務QAデータベース、国際税務データベースをご利用の方はこちらです。','ログインする'],
    club:['各種会員サイトへ','企業懇話会、税理士懇話会、国際税務研究会など、会員限定コンテンツや勉強会をご利用の方はこちらです。','会員サイトへ'],
    seminar:['税研Webセミナーへ','Webセミナーの視聴、受講履歴、契約者向け動画を確認したい方はこちらです。','視聴ログイン'],
    store:['オンラインストア・かんたん購入へ','書籍・定期刊行誌・セミナーの購入履歴、請求情報、申込状況を確認します。','マイページへ'],
    links:['ZEIKEN LINKSへ','事業承継・M&A関連の情報、買手登録、譲渡向け個別勉強会をご利用の方はこちらです。','LINKSへ'],
    unknown:['契約状況を確認します','契約商品、会社名、メールアドレスから正しいログイン先をご案内します。','問い合わせる']
  };
  document.querySelectorAll('[data-routes] .route-option').forEach(btn=>{
    btn.addEventListener('click',()=>{
      document.querySelectorAll('[data-routes] .route-option').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const data=routeCopy[btn.dataset.route]||routeCopy.db;
      if(routeResult){routeResult.innerHTML=`<strong>${data[0]}</strong><p>${data[1]}</p><a class="btn btn-primary" href="#">${data[2]}</a><a class="btn btn-secondary" href="contact.html">ログインできない</a>`;}
    });
  });
  const purposeTitle=document.querySelector('#purpose-title');
  const purposeMap={
    document:['資料請求','必要な資料を選択してください','商品ページから遷移した場合、対象商品は自動で選択されます。'],
    trial:['無料お試しID','お試ししたいサービスを選択してください','税務通信データベースなど、利用目的に応じたIDをお送りします。'],
    login:['ログインサポート','ログインできないサービスを選択してください','ID・パスワード・ログイン先の確認をサポートします。'],
    memberprice:['会員価格','会員価格を利用したいセミナーを選択してください','会員種別に応じた申込導線をご案内します。'],
    contract:['契約内容変更','変更したい内容を選択してください','住所・担当者・支払方法などの変更を受け付けます。'],
    cancel:['解約相談','契約状況を確認します','解約前に利用状況・更新日・代替プランをご確認いただけます。'],
    article:['記事内容の確認','確認したい記事情報をご入力ください','掲載号、記事名、URLなどがあるとスムーズです。']
  };
  document.querySelectorAll('[data-purpose] .purpose-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      document.querySelectorAll('[data-purpose] .purpose-btn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const data=purposeMap[btn.dataset.purposeId]||purposeMap.document;
      if(purposeTitle){purposeTitle.innerHTML=`<span class="tag tag-red">${data[0]}</span><h2>${data[1]}</h2><p>${data[2]}</p>`;}
    });
  });
})();

/* No.7 セミナー申込：会員価格の面内適用デモ */
(function(){
  var btn=document.getElementById('apply-member');
  if(!btn) return;
  btn.addEventListener('click',function(){
    var alert=document.getElementById('m-alert');
    var applied=document.getElementById('m-applied');
    var amt=document.getElementById('cart-amt');
    var total=document.getElementById('cart-total');
    if(alert) alert.classList.add('hide');
    if(applied) applied.classList.add('show');
    if(amt){amt.innerHTML='<span class="amt was">33,000円</span>26,400円';}
    if(total) total.textContent='26,400円';
    btn.textContent='会員価格を適用済み';
    btn.disabled=true;
    btn.style.opacity='.6';
  });
})();

/* ===== 意図ルーティング（コンソール＆AIアシスタント・ドック） ===== */
(function(){
  function route(q){
    q=(q||'').toLowerCase();
    var map=[
      [/ログイン|log\s?in|サインイン|id|パスワード/,'login.html'],
      [/解約|退会|キャンセル|やめ|停止/,'contact.html'],
      [/変更|住所|支払|請求|名義/,'contact.html'],
      [/試|お試し|見本|体験|無料|サンプル/,'contact.html'],
      [/問い合わせ|質問|連絡|相談/,'contact.html'],
      [/セミナー|講座|研修|学|web/,'seminars.html'],
      [/申込|申し込|購入|契約|買|買う|注文/,'products.html'],
      [/ツール|データベース|db|システム/,'products.html'],
      [/比較|違い|選び|紙|購読|会員|料金|価格|プラン/,'zeimu-tsushin.html'],
      [/迷|はじめて|初めて|わからない|おすすめ/,'__assistant']
    ];
    for(var i=0;i<map.length;i++){if(map[i][0].test(q))return map[i][1];}
    return 'search.html';
  }
  function nav(target){
    if(target==='__assistant'){openPanel();return;}
    if(window.__zkRoute){window.__zkRoute(target.replace('.html',''));}
    else{window.location.href=target;}
  }
  // コンソール
  var ci=document.getElementById('console-input'), cg=document.getElementById('console-go');
  function consoleGo(){nav(route(ci?ci.value:''));}
  if(cg) cg.addEventListener('click',consoleGo);
  if(ci) ci.addEventListener('keydown',function(e){if(e.key==='Enter')consoleGo();});
  document.querySelectorAll('.chip[data-q]').forEach(function(b){b.addEventListener('click',function(){if(ci)ci.value=b.getAttribute('data-q');nav(route(b.getAttribute('data-q')));});});
  // アシスタント・ドック
  var fab=document.getElementById('ai-fab'), panel=document.getElementById('ai-panel'), close=document.getElementById('ai-close');
  function openPanel(){if(panel)panel.classList.add('open');}
  function togglePanel(){if(panel)panel.classList.toggle('open');}
  if(fab) fab.addEventListener('click',togglePanel);
  if(close) close.addEventListener('click',function(){panel.classList.remove('open');});
  document.querySelectorAll('[data-assistant]').forEach(function(a){a.addEventListener('click',function(e){e.preventDefault();openPanel();});});
  document.querySelectorAll('.ai-sug button[data-go]').forEach(function(b){b.addEventListener('click',function(){nav(b.getAttribute('data-go'));});});
  var ai=document.getElementById('ai-input'), aisend=document.getElementById('ai-send');
  function aiGo(){nav(route(ai?ai.value:''));}
  if(aisend) aisend.addEventListener('click',aiGo);
  if(ai) ai.addEventListener('keydown',function(e){if(e.key==='Enter')aiGo();});
})();

/* ===== 用件コンソール ＆ AIアシスタント（インテント・ルーティング デモ） ===== */
(function(){
  var INTENT={
    search:{t:"記事・FAQを横断検索します",d:"キーワードに一致する記事・ニュース・FAQ・商品・セミナーを横断して表示します。",h:"search.html",c:"横断検索へ"},
    learn:{t:"本・セミナーを探します",d:"会場・Live・Webセミナーと関連書籍を一覧から探せます。",h:"seminars.html",c:"セミナーを探す"},
    subscribe:{t:"購読・会員制度をご案内します",d:"定期刊行物の購読と、企業懇話会・税理士懇話会など会員制度の特典を比較できます。",h:"products.html",c:"購読・会員を見る"},
    tools:{t:"ツール・データベースをご案内します",d:"税務通信DBなど、実務で使う検索ツールの選び方を表示します。",h:"zeimu-tsushin.html",c:"ツール・DBへ"},
    login:{t:"正しいログイン先を確認します",d:"契約商品・会員種別・利用目的から、適切なログイン先へ案内します。",h:"login.html",c:"ログイン先を確認"},
    trial:{t:"無料お試しをご案内します",d:"データベースや読者限定ページのお試しIDを請求できます。",h:"contact.html",c:"お試しIDを申し込む"},
    contract:{t:"契約・購入の手続きへ進みます",d:"紙・DB・セットを比較して申込へ。会員の方は会員価格が適用されます。",h:"zeimu-tsushin.html",c:"購入・申込へ"},
    cancel:{t:"解約のご相談を承ります",d:"契約状況・更新日を確認のうえ、解約手続きをご案内します。",h:"contact.html",c:"解約の相談へ"},
    contact:{t:"最適な問い合わせ窓口へ振り分けます",d:"資料・お試し・ログイン・契約変更・解約・記事照会など、用途別に分岐します。",h:"contact.html",c:"問い合わせへ"},
    browse:{t:"今週の注目をご案内します",d:"新着記事・特集・注目セミナーをまとめて表示します。",h:"search.html",c:"注目を見る"}
  };
  var KW=[
    ["login",["ログイン","ログイ","サインイン","login","パスワード","ＩＤ","id"]],
    ["cancel",["解約","退会","やめ","停止","キャンセル"]],
    ["trial",["お試し","試し","体験","無料","トライアル","trial"]],
    ["learn",["セミナー","研修","講座","本","書籍","学"]],
    ["subscribe",["購読","会員","定期","サブスク","懇話","reader"]],
    ["tools",["データベース","ＤＢ","db","検索ツール","ツール"]],
    ["contract",["契約","購入","申込","申し込","買"]],
    ["contact",["問い合わせ","問合せ","質問","連絡","相談"]],
    ["search",["調べ","記事","ニュース","faq","インボイス","リース","電子帳簿","税"]]
  ];
  function classify(text){
    if(!text) return "browse";
    var s=text.toLowerCase();
    for(var i=0;i<KW.length;i++){var id=KW[i][0],ws=KW[i][1];for(var j=0;j<ws.length;j++){if(s.indexOf(ws[j].toLowerCase())>=0)return id;}}
    return "search";
  }
  // コンソール
  var ci=document.getElementById('console-input'),cg=document.getElementById('console-go'),cr=document.getElementById('console-resp');
  function renderResp(id){
    var x=INTENT[id]||INTENT.search;
    document.getElementById('resp-title').textContent=x.t;
    document.getElementById('resp-desc').textContent=x.d;
    document.getElementById('resp-cta').innerHTML='<a class="btn btn-primary" href="'+x.h+'">'+x.c+'</a><a class="btn btn-secondary" href="search.html">別の用件にする</a>';
    if(cr){cr.classList.add('show');}
  }
  if(cg&&ci){cg.addEventListener('click',function(){renderResp(classify(ci.value));});
    ci.addEventListener('keydown',function(e){if(e.key==='Enter'){e.preventDefault();renderResp(classify(ci.value));}});}
  var chips=document.getElementById('intent-chips');
  if(chips){chips.addEventListener('click',function(e){var b=e.target.closest('.chip');if(!b)return;
    chips.querySelectorAll('.chip').forEach(function(c){c.classList.remove('active');});b.classList.add('active');
    if(ci) ci.value=b.textContent.replace(/^\d+/,'').trim();renderResp(b.dataset.intent);});}

  // アシスタント・ドック
  var launch=document.getElementById('assistant-launch'),panel=document.getElementById('assistant-panel'),body=document.getElementById('ap-body'),inp=document.getElementById('ap-input'),send=document.getElementById('ap-send');
  if(launch&&panel){launch.addEventListener('click',function(){panel.classList.toggle('open');if(panel.classList.contains('open')&&inp)inp.focus();});}
  function pushMe(t){var d=document.createElement('div');d.className='ap-msg me';d.textContent=t;body.appendChild(d);}
  function pushBot(id){var x=INTENT[id]||INTENT.search;var d=document.createElement('div');d.className='ap-msg';
    d.innerHTML=x.t+'<br><span style="color:#5d6776;font-size:12px">'+x.d+'</span><br><a class="btn-text" style="margin-top:6px" href="'+x.h+'">'+x.c+'</a>';
    body.appendChild(d);body.scrollTop=body.scrollHeight;}
  function ask(t){pushMe(t);setTimeout(function(){pushBot(classify(t));},250);}
  if(body){body.addEventListener('click',function(e){var b=e.target.closest('.ap-quick button');if(b)ask(b.textContent);});}
  function apSend(){if(inp&&inp.value.trim()){ask(inp.value.trim());inp.value='';}}
  if(send)send.addEventListener('click',apSend);
  if(inp)inp.addEventListener('keydown',function(e){if(e.key==='Enter')apSend();});
})();
