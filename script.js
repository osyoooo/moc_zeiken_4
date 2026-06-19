/* 税務研究会 モック 共通スクリプト */
(function(){
  /* モバイルメニュー */
  var menu=document.querySelector('.mobile-menu'), nav=document.querySelector('.nav-links');
  if(menu&&nav){menu.addEventListener('click',function(){nav.classList.toggle('open');menu.setAttribute('aria-expanded',nav.classList.contains('open'));});}

  /* タブ */
  document.querySelectorAll('[data-tabs]').forEach(function(group){
    var tabs=group.querySelectorAll('.tab');
    tabs.forEach(function(tab){tab.addEventListener('click',function(){
      var id=tab.dataset.tab, scope=group.parentElement;
      tabs.forEach(function(t){t.classList.remove('active');}); tab.classList.add('active');
      scope.querySelectorAll('.tab-content').forEach(function(c){c.classList.remove('active');});
      var content=scope.querySelector('#'+id); if(content) content.classList.add('active');
    });});
  });

  /* ログイン先ファインダー */
  var routeResult=document.querySelector('#route-result');
  var routeCopy={
    db:['税研ウェブサービスへ','税務通信DB、経営財務DB、税務QA、国際税務DBをご利用の方はこちら。','ログインする'],
    club:['各種会員サイトへ','企業懇話会、税理士懇話会、国際税務研究会など会員限定コンテンツはこちら。','会員サイトへ'],
    seminar:['税研Webセミナーへ','Webセミナーの視聴・受講履歴・契約者向け動画はこちら。','視聴ログイン'],
    store:['オンラインストア・かんたん購入へ','書籍・刊行物・セミナーの購入履歴、請求情報はこちら。','マイページへ'],
    links:['ZEIKEN LINKSへ','事業承継・M&A関連サービスをご利用の方はこちら。','LINKSへ'],
    unknown:['契約状況を確認します','契約商品・会社名・メールから正しいログイン先を案内します。','問い合わせる']
  };
  document.querySelectorAll('[data-routes] .route-option').forEach(function(btn){
    btn.addEventListener('click',function(){
      document.querySelectorAll('[data-routes] .route-option').forEach(function(b){b.classList.remove('active');});
      btn.classList.add('active');
      var d=routeCopy[btn.dataset.route]||routeCopy.db;
      if(routeResult) routeResult.innerHTML='<strong>'+d[0]+'</strong><p>'+d[1]+'</p><a class="btn btn-primary" href="#">'+d[2]+'</a><a class="btn btn-secondary" href="contact.html">ログインできない</a>';
    });
  });

  /* 問い合わせ 目的別 */
  var purposeTitle=document.querySelector('#purpose-title');
  var purposeMap={
    document:['資料請求','必要な資料を選択してください','商品ページから遷移した場合、対象商品は自動で選択されます。'],
    trial:['無料お試しID','お試ししたいサービスを選択してください','利用目的に応じたIDをお送りします。'],
    login:['ログインサポート','ログインできないサービスを選択してください','ID・パスワード・ログイン先の確認をサポートします。'],
    memberprice:['会員価格','会員価格を利用したいセミナーを選択してください','会員種別に応じた申込導線を案内します。'],
    contract:['契約内容変更','変更したい内容を選択してください','住所・担当者・支払方法などの変更を受け付けます。'],
    cancel:['解約相談','契約状況を確認します','解約前に利用状況・更新日・代替プランを確認できます。'],
    article:['記事内容の確認','確認したい記事情報をご入力ください','掲載号・記事名・URLがあるとスムーズです。']
  };
  document.querySelectorAll('[data-purpose] .purpose-btn').forEach(function(btn){
    btn.addEventListener('click',function(){
      document.querySelectorAll('[data-purpose] .purpose-btn').forEach(function(b){b.classList.remove('active');});
      btn.classList.add('active');
      var d=purposeMap[btn.dataset.purposeId]||purposeMap.document;
      if(purposeTitle) purposeTitle.innerHTML='<span class="tag tag-red">'+d[0]+'</span><h2>'+d[1]+'</h2><p>'+d[2]+'</p>';
    });
  });

  /* セミナー 会員価格の面内適用 */
  var apply=document.querySelector('#apply-member');
  if(apply){apply.addEventListener('click',function(){
    var al=document.querySelector('#m-alert'),ap=document.querySelector('#m-applied'),amt=document.querySelector('#cart-amt'),total=document.querySelector('#cart-total');
    if(al)al.classList.add('hide'); if(ap)ap.classList.add('show');
    if(amt)amt.innerHTML='<span class="amt was">33,000円</span>26,400円'; if(total)total.textContent='26,400円';
    apply.textContent='会員価格を適用済み'; apply.disabled=true; apply.style.opacity='.6';
  });}

  /* ===== 統一アシスタント（用件ルーティング） ===== */
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
    ["login",["ログイン","ログイ","サインイン","login","パスワード"]],
    ["cancel",["解約","退会","やめ","停止","キャンセル"]],
    ["trial",["お試し","試し","体験","無料","トライアル"]],
    ["learn",["セミナー","研修","講座","本","書籍","学"]],
    ["subscribe",["購読","会員","定期","サブスク","懇話"]],
    ["tools",["データベース","ＤＢ","db","ツール"]],
    ["contract",["契約","購入","申込","申し込","買"]],
    ["contact",["問い合わせ","問合せ","質問","連絡","相談"]],
    ["search",["調べ","記事","ニュース","faq","インボイス","リース","電子帳簿","税"]]
  ];
  function classify(text){
    if(!text) return "browse"; var s=text.toLowerCase();
    for(var i=0;i<KW.length;i++){var ws=KW[i][1];for(var j=0;j<ws.length;j++){if(s.indexOf(ws[j].toLowerCase())>=0)return KW[i][0];}}
    return "search";
  }
  function botHTML(id){var x=INTENT[id]||INTENT.search;
    return x.t+'<span class="sub">'+x.d+'</span><span class="ah-cta"><a class="btn btn-primary" href="'+x.h+'">'+x.c+'</a></span>';}
  function append(thread,cls,html){var d=document.createElement('div');d.className='ah-msg'+(cls?' '+cls:'');d.innerHTML=html;thread.appendChild(d);thread.scrollTop=thread.scrollHeight;}

  function wireAssistant(threadId,inputId,sendId,chipsId){
    var thread=document.getElementById(threadId),inp=document.getElementById(inputId),send=document.getElementById(sendId);
    function ask(text){ if(!text)return; append(thread,'me',text); setTimeout(function(){append(thread,'',botHTML(classify(text)));},260); }
    if(send&&inp){send.addEventListener('click',function(){ask(inp.value.trim());inp.value='';});
      inp.addEventListener('keydown',function(e){if(e.key==='Enter'){e.preventDefault();ask(inp.value.trim());inp.value='';}});}
    if(chipsId){var chips=document.getElementById(chipsId);
      if(chips)chips.addEventListener('click',function(e){var b=e.target.closest('.chip,button');if(!b||!b.dataset.intent)return;ask(b.textContent.replace(/^\d+/,'').trim());});}
    return ask;
  }
  // ヒーローのアシスタント
  if(document.getElementById('hero-assistant')) wireAssistant('ah-thread','ah-input','ah-send','intent-chips');
  // 右下ドック（同一アシスタント・最小化）
  var launch=document.getElementById('assistant-launch'),panel=document.getElementById('assistant-panel');
  if(launch&&panel){launch.addEventListener('click',function(){panel.classList.toggle('open');var i=document.getElementById('ap-input');if(panel.classList.contains('open')&&i)i.focus();});}
  if(document.getElementById('ap-body')){
    var dthread=document.getElementById('ap-body'),di=document.getElementById('ap-input'),ds=document.getElementById('ap-send');
    function dask(text){if(!text)return;append(dthread,'me',text);setTimeout(function(){append(dthread,'',botHTML(classify(text)));},260);}
    dthread.addEventListener('click',function(e){var b=e.target.closest('.ap-quick button');if(b)dask(b.textContent);});
    if(ds&&di){ds.addEventListener('click',function(){dask(di.value.trim());di.value='';});di.addEventListener('keydown',function(e){if(e.key==='Enter'){dask(di.value.trim());di.value='';}});}
  }
  // ヒーローのアシスタントが見えている間はドックを隠す（スクロールで受け渡し）
  var dock=document.getElementById('assistant-dock'),hero=document.getElementById('hero-assistant');
  if(dock&&hero){
    var panelEl=document.getElementById('assistant-panel');
    function updateDock(){
      var r=hero.getBoundingClientRect();
      var pastHero=r.bottom<80; // ヒーローのアシスタントがほぼ画面外に出たら表示
      dock.classList.toggle('hide',!pastHero);
      if(!pastHero&&panelEl) panelEl.classList.remove('open');
    }
    window.addEventListener('scroll',updateDock,{passive:true});
    window.addEventListener('resize',updateDock);
    updateDock();
  }

  /* ===== 知識基盤デモ ===== */
  var KB={
    invoice:{a:'適格請求書発行事業者の<strong>登録番号（T＋13桁）</strong>は、国税庁「適格請求書発行事業者公表サイト」で検索・確認できます。取引先から受領した請求書の番号が有効かどうかも照会可能です。',
      src:[['a','記事','インボイス制度 登録番号の確認と実務対応','search.html'],['f','FAQ','登録番号が分からないときは？','search.html']],
      rel:[['p','商品','税務通信データベースで関連記事を読む','zeimu-tsushin.html'],['s','セミナー','インボイス実務セミナー','seminars.html']]},
    lease:{a:'新リース会計基準は、原則として<strong>2027年4月1日以後</strong>開始する事業年度から適用されます（早期適用も可）。借手はオンバランス処理が原則となり、税務・申告調整の対応が必要です。',
      src:[['a','記事','新リース会計基準 適用時期と実務影響','search.html'],['f','FAQ','早期適用はできる？','search.html']],
      rel:[['s','セミナー','新リース会計基準 適用後の税務・会計処理','seminars.html'],['p','商品','週刊 税務通信＋DBで深掘り','zeimu-tsushin.html']]},
    ebook:{a:'電子帳簿保存法の対象は、<strong>電子帳簿等保存・スキャナ保存・電子取引データ保存</strong>の3区分。とくに電子取引データは保存が義務化されており、検索要件・真実性要件を満たす運用が必要です。',
      src:[['a','記事','電子帳簿保存法 3区分と対象書類の整理','search.html'],['f','FAQ','電子取引データの保存要件は？','search.html']],
      rel:[['s','セミナー','電子帳簿保存 実務対応セミナー','seminars.html'],['p','商品','税務通信データベース','zeimu-tsushin.html']]}
  };
  var qs=document.getElementById('kb-qs');
  if(qs){
    function renderKB(key){
      var d=KB[key]; if(!d)return;
      document.getElementById('kb-answer-text').innerHTML=d.a;
      document.getElementById('kb-src').innerHTML=d.src.map(function(x){return '<a class="kb-src" href="'+x[3]+'"><span class="src-tag '+x[0]+'">'+x[1]+'</span><span class="src-t">'+x[2]+'</span><span class="src-go">開く →</span></a>';}).join('');
      document.getElementById('kb-rel').innerHTML=d.rel.map(function(x){return '<a class="btn btn-secondary" href="'+x[3]+'">'+x[1]+'：'+x[2]+'</a>';}).join('');
    }
    qs.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;
      qs.querySelectorAll('button').forEach(function(x){x.classList.remove('active');});b.classList.add('active');renderKB(b.dataset.q);});
    renderKB('invoice');
  }
})();
