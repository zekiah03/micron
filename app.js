(() => {
  const STORE_KEY = 'nayami-seeds-v1';
  const SETTINGS_KEY = 'nayami-settings-v1';
  const HISTORY_KEY = 'nayami-ai-history-v1';
  const AXES_KEY = 'nayami-custom-axes-v1';
  const REASONS_KEY = 'nayami-reasons-v1';
  const POSITIONS_KEY = 'nayami-positions-v1';
  const SESSIONS_KEY = 'nayami-sessions-v1';
  const ACTIONS_KEY = 'nayami-actions-v1';
  const WORKS_KEY = 'nayami-works-v1';
  const SOCIAL_KEY = 'nayami-social-v1';
  const EFFORT_KEY = 'nayami-effort-v1';
  const KOLB_KEY = 'nayami-kolb-v1';
  const VALUES_KEY = 'nayami-values-v1';
  const THINKING_KEY = 'nayami-thinking-v1';
  const JOHARI_KEY = 'nayami-johari-v1';

  const JOHARI_TRAITS = [
    '明るい', '静か', '親切', '几帳面', '大胆', '慎重', '創造的', '論理的', '共感的', '独立心が強い',
    '協調的', 'リーダーシップがある', '聞き上手', '話し上手', '表現豊か', '内省的', '外向的', '真面目', '遊び心がある', '計画的',
    '即興的', '完璧主義', '楽観的', '行動力がある', '信頼できる', '思いやりがある', 'ユーモアがある', '集中力がある', '適応力がある', '寛大',
    '直感的', '分析的', '情熱的', '冷静', '親しみやすい', '謙虚', '頑固', '柔軟', '神経質', 'おおらか',
  ];

  const SOCIAL_DIMENSIONS = [
    { key: 'communication', label: 'コミュニケーション', color: '#3b82f6' },
    { key: 'empathy',       label: '共感力',             color: '#ec4899' },
    { key: 'cooperation',   label: '協調性',             color: '#10b981' },
    { key: 'assertion',     label: '自己主張力',         color: '#f59e0b' },
    { key: 'adaptation',    label: '社会的適応力',       color: '#8b5cf6' },
  ];

  const VALUES_DIMENSIONS = [
    { key: 'autonomy',    label: '自律', color: '#8b5cf6', description: '自分で決めたい・束縛を嫌う' },
    { key: 'achievement', label: '達成', color: '#ef4444', description: '成果・結果を出すことに意味を感じる' },
    { key: 'relation',    label: '関係', color: '#ec4899', description: '人との繋がりを大事にする' },
    { key: 'stability',   label: '安定', color: '#3b82f6', description: '予測可能性・安心を求める' },
    { key: 'growth',      label: '成長', color: '#10b981', description: '新しい刺激・挑戦を求める' },
  ];

  const VALUES_QUESTIONS = [
    // autonomy
    { dim: 'autonomy', text: '何をするかは自分で決めたい' },
    { dim: 'autonomy', text: '人から細かく指示されると窮屈に感じる' },
    { dim: 'autonomy', text: '自由な時間が確保できないとストレスを感じる' },
    { dim: 'autonomy', text: '自分のスタイルを大切にしたい' },
    { dim: 'autonomy', text: '規則やマニュアルに縛られたくない' },
    // achievement
    { dim: 'achievement', text: '目標を達成することにやりがいを感じる' },
    { dim: 'achievement', text: '成果が見えないと張り合いがない' },
    { dim: 'achievement', text: '周囲より上にいたいと感じることがある' },
    { dim: 'achievement', text: '評価されることでモチベーションが上がる' },
    { dim: 'achievement', text: '自分の活動で結果を残したい' },
    // relation
    { dim: 'relation', text: '人と深く繋がっている感覚が大事だ' },
    { dim: 'relation', text: '誰かのために何かをすることに喜びを感じる' },
    { dim: 'relation', text: '一人でいると寂しさを感じやすい' },
    { dim: 'relation', text: '人間関係を維持するために時間を使う方だ' },
    { dim: 'relation', text: '信頼できる人がいることが心の支えになる' },
    // stability
    { dim: 'stability', text: '予測できる毎日が落ち着く' },
    { dim: 'stability', text: '大きな変化は不安に感じる' },
    { dim: 'stability', text: '経済的・身体的に安定していたい' },
    { dim: 'stability', text: 'リスクは避ける方だ' },
    { dim: 'stability', text: 'ルーティンがあると安心する' },
    // growth
    { dim: 'growth', text: '新しい刺激や挑戦に惹かれる' },
    { dim: 'growth', text: '同じことの繰り返しは退屈に感じる' },
    { dim: 'growth', text: '自分が伸びている感覚がほしい' },
    { dim: 'growth', text: '学び続けることが好きだ' },
    { dim: 'growth', text: '未知の領域に踏み込むのが楽しい' },
  ];

  const THINKING_DIMENSIONS = [
    { key: 'logical',    label: '論理', color: '#3b82f6', description: '筋道立てて分析する' },
    { key: 'intuitive',  label: '直感', color: '#ec4899', description: '感覚で素早く掴む' },
    { key: 'creative',   label: '創造', color: '#f59e0b', description: '既存の枠から外れて発想する' },
    { key: 'systematic', label: '体系', color: '#10b981', description: '順序立てて整理する' },
    { key: 'holistic',   label: '全体', color: '#8b5cf6', description: '大きな絵で捉える' },
  ];

  const THINKING_QUESTIONS = [
    // logical
    { dim: 'logical', text: '結論に至るまでの筋道を意識する' },
    { dim: 'logical', text: '「なぜそう言えるのか」を確認したくなる' },
    { dim: 'logical', text: '矛盾があると気になって解消したくなる' },
    { dim: 'logical', text: '感情よりも事実を優先する' },
    { dim: 'logical', text: '議論や議題を構造化して考えるのが得意だ' },
    // intuitive
    { dim: 'intuitive', text: '「なんとなくこう」が当たることが多い' },
    { dim: 'intuitive', text: '説明できないけれど分かることがある' },
    { dim: 'intuitive', text: '一目見ただけで全体像を掴めることがある' },
    { dim: 'intuitive', text: 'ロジックより感覚で意思決定することが多い' },
    { dim: 'intuitive', text: '第一印象を信頼している' },
    // creative
    { dim: 'creative', text: '既存のやり方を疑って別案を考えたくなる' },
    { dim: 'creative', text: 'アイデアが次々と湧いてくる' },
    { dim: 'creative', text: '制約があってもひっくり返す発想が出る' },
    { dim: 'creative', text: '異分野を組み合わせて新しいものを作るのが好き' },
    { dim: 'creative', text: '「もしXだったら」と仮定で発想することが多い' },
    // systematic
    { dim: 'systematic', text: '物事を順序立てて整理するのが好き' },
    { dim: 'systematic', text: 'ステップを踏んで進めるのが落ち着く' },
    { dim: 'systematic', text: '情報をカテゴリに分類したくなる' },
    { dim: 'systematic', text: '計画通りに進めるのが心地よい' },
    { dim: 'systematic', text: '関係性を図やチャートで整理する' },
    // holistic
    { dim: 'holistic', text: '細部より全体像を掴みたい' },
    { dim: 'holistic', text: '大きな目的・意味を意識して動く' },
    { dim: 'holistic', text: '物事の繋がりや背景を見ようとする' },
    { dim: 'holistic', text: '一つの問題を多角的に見るのが好き' },
    { dim: 'holistic', text: '部分にこだわりすぎないようにしている' },
  ];

  const KOLB_DIMENSIONS = [
    { key: 'why',    label: 'なぜ',     color: '#ef4444', description: '理論・目的重視（Diverging）' },
    { key: 'what',   label: 'なに',     color: '#3b82f6', description: '事実・データ重視（Assimilating）' },
    { key: 'how',    label: 'どうやって', color: '#10b981', description: '手順・プロセス重視（Converging）' },
    { key: 'now',    label: '今すぐ',   color: '#f59e0b', description: '行動・実践重視（Accommodating）' },
  ];

  const KOLB_QUESTIONS = [
    // why
    { dim: 'why', text: '新しいことを学ぶとき、まず目的や理由を調べる' },
    { dim: 'why', text: '「これをやって何の意味があるの？」と思うことが多い' },
    { dim: 'why', text: '情熱を感じるテーマだと一気に没頭できる' },
    { dim: 'why', text: '全体像や長期ビジョンが見えると動きやすくなる' },
    { dim: 'why', text: '納得できないことは、頼まれても動けない' },
    // what
    { dim: 'what', text: 'データ・統計・具体例を重視する' },
    { dim: 'what', text: '根拠のない話はあまり信じない' },
    { dim: 'what', text: '情報を体系的に整理するのが好き' },
    { dim: 'what', text: 'まずは調べてから動くタイプだ' },
    { dim: 'what', text: '客観的な事実が揃うと安心する' },
    // how
    { dim: 'how', text: '手順やステップが明確だと安心する' },
    { dim: 'how', text: 'マニュアルやチュートリアルをしっかり読む方だ' },
    { dim: 'how', text: 'プロセスを丁寧に守る方だ' },
    { dim: 'how', text: '計画通りに進めることが好きだ' },
    { dim: 'how', text: '「やり方」が分かれば着実に実行できる' },
    // now
    { dim: 'now', text: 'とりあえず試してみるのが好き' },
    { dim: 'now', text: '失敗しながら学ぶことに抵抗がない' },
    { dim: 'now', text: '計画より行動を優先する' },
    { dim: 'now', text: 'ノリで動いてうまくいくことが多い' },
    { dim: 'now', text: 'やってみてから考えるタイプだ' },
  ];

  const EFFORT_DIMENSIONS = [
    { key: 'volume',   label: '量',     color: '#ef4444', description: '時間・回数・労力を投下する基礎力' },
    { key: 'quality',  label: '質',     color: '#f59e0b', description: '工夫・フィードバックを取り込む力' },
    { key: 'design',   label: '設計',   color: '#10b981', description: 'ゴールから逆算する計画力' },
    { key: 'choice',   label: '選択',   color: '#3b82f6', description: '何に努力するかを選ぶ力' },
    { key: 'endurance',label: '持続',   color: '#8b5cf6', description: '燃え尽きず長期間続ける力' },
  ];

  const EFFORT_QUESTIONS = [
    // volume
    { dim: 'volume', text: '毎日一定時間、目標に向けて取り組んでいる' },
    { dim: 'volume', text: '決めた回数・量を守って続けられる' },
    { dim: 'volume', text: '気分に左右されず、最低ラインの量は確保できる' },
    { dim: 'volume', text: '「今日はやらない」と決めた日以外は、短時間でも着手する' },
    { dim: 'volume', text: '記録を取って量を可視化している' },
    // quality
    { dim: 'quality', text: '集中できる時間帯や環境を意識して選んでいる' },
    { dim: 'quality', text: '人からのフィードバックを積極的に求めている' },
    { dim: 'quality', text: '同じミスを繰り返さないよう、やり方を改善している' },
    { dim: 'quality', text: '成果が出にくい時、原因を分析して修正している' },
    { dim: 'quality', text: '「なんとなく」ではなく、今日の課題を明確にして取り組む' },
    // design
    { dim: 'design', text: 'ゴールから逆算して計画を立てている' },
    { dim: 'design', text: '優先順位を決めてから動いている' },
    { dim: 'design', text: '週単位・月単位で進捗を見直している' },
    { dim: 'design', text: '大きな目標を小さなステップに分解できる' },
    { dim: 'design', text: 'リソース（時間・体力）の配分を意識している' },
    // choice
    { dim: 'choice', text: '「何に努力するか」を選ぶことに時間をかけている' },
    { dim: 'choice', text: '自分の強みや市場に合った分野を選んでいる' },
    { dim: 'choice', text: 'やらないことを明確に決めている' },
    { dim: 'choice', text: '筋が悪いと気づいたら撤退・方向転換できる' },
    { dim: 'choice', text: '努力の方向が自分の価値観と合っているか定期的に確認している' },
    // endurance
    { dim: 'endurance', text: '始めたことを数ヶ月以上続けた経験が何度もある' },
    { dim: 'endurance', text: '困難にぶつかっても、すぐには諦めない' },
    { dim: 'endurance', text: '情熱を持てる分野がある' },
    { dim: 'endurance', text: '燃え尽きにくいペースで進められている' },
    { dim: 'endurance', text: '長期目標を忘れずに持ち続けている' },
  ];

  const SOCIAL_QUESTIONS = [
    // communication
    { dim: 'communication', text: '初対面の人とも自然に会話を始められる' },
    { dim: 'communication', text: '相手の話を遮らず、最後まで聞くことができる' },
    { dim: 'communication', text: '表情やジェスチャーで気持ちを伝えるのが得意だ' },
    { dim: 'communication', text: '会話の沈黙を気まずいと感じず過ごせる' },
    { dim: 'communication', text: '自分の考えを分かりやすい言葉で説明できる' },
    // empathy
    { dim: 'empathy', text: '相手の表情から気持ちの変化を読み取れる' },
    { dim: 'empathy', text: '相手が悲しんでいる時、自然に寄り添える' },
    { dim: 'empathy', text: '自分と違う立場の人の考えを想像できる' },
    { dim: 'empathy', text: '「なぜその人がそう感じるのか」を考える習慣がある' },
    { dim: 'empathy', text: '他者の感情が自分にも伝わってくることが多い' },
    // cooperation
    { dim: 'cooperation', text: 'グループ活動で役割を積極的に引き受ける' },
    { dim: 'cooperation', text: '意見の違いを調整するのが得意だ' },
    { dim: 'cooperation', text: '他の人の意見を取り入れて自分の案を修正できる' },
    { dim: 'cooperation', text: 'チームの目標を自分の意見より優先できる時がある' },
    { dim: 'cooperation', text: '場の空気を読んで適切に行動できる' },
    // assertion
    { dim: 'assertion', text: '自分の意見をはっきりと伝えられる' },
    { dim: 'assertion', text: '気が進まないことに「NO」と断ることができる' },
    { dim: 'assertion', text: '不快なことを言われたら、それを相手に伝えられる' },
    { dim: 'assertion', text: '自分の意見を通しつつ、相手も尊重できる' },
    { dim: 'assertion', text: '周りに流されず、自分の判断を貫ける' },
    // adaptation
    { dim: 'adaptation', text: '職場・学校・プライベートで振る舞いを使い分けられる' },
    { dim: 'adaptation', text: '初めての環境にも比較的早く馴染める' },
    { dim: 'adaptation', text: 'ルールや暗黙のマナーに気づいて従える' },
    { dim: 'adaptation', text: '予期しない状況にも落ち着いて対応できる' },
    { dim: 'adaptation', text: '多様な世代・文化の人とも関係を築ける' },
  ];

  const BUILTIN_AXES = [
    { key: 'attribution', label: '帰属' },
    { key: 'controllability', label: 'コントロール' },
    { key: 'timeFrame', label: '時間軸' },
    { key: 'depth', label: '深さ' },
    { key: 'interventionPoint', label: '介入点' },
  ];

  const CATEGORY_COLORS = {
    '幸せ・比較':    '#ef4444',
    '年齢と経験':    '#f97316',
    '人間関係':      '#eab308',
    '外見':          '#22c55e',
    '家族':          '#06b6d4',
    '仕事':          '#3b82f6',
    '健康':          '#8b5cf6',
    'お金':          '#ec4899',
    '学び':          '#14b8a6',
    '将来':          '#a855f7',
    '解決に向けて':  '#10b981',
    'その他':        '#6b7280',
  };
  function categoryColor(cat) { return CATEGORY_COLORS[cat] || '#6b7280'; }

  const AXIS_PRESETS = {
    direction:     { name: '方向',       type: 'number', min: -5, max: 5, description: '外向き(-5) ↔ 内向き(+5)' },
    emotion:       { name: '感情の色',   type: 'number', min: -5, max: 5, description: '怒り(-5) ↔ 悲しみ(+5)' },
    polarity:      { name: '極性',       type: 'select', options: ['+→-', '-→-', '-→+', '+→+'], description: '入力感情 → 出力感情' },
    chronicity:    { name: '慢性度',     type: 'select', options: ['数日', '数週間', '数ヶ月', '数年', 'ずっと'] },
    valueConflict: { name: '価値観の衝突', type: 'select', options: ['なし', '軽い', '強い'] },
    body:          { name: '身体への影響', type: 'select', options: ['なし', '軽い', '強い'] },
    meta:          { name: 'メタ感情',   type: 'text', description: 'この悩みに対する二次感情（例: 悩んでいる自分が嫌）' },
  };

  const state = {
    seeds: load(STORE_KEY, []),
    settings: load(SETTINGS_KEY, { apiKey: '', model: 'claude-sonnet-4-6' }),
    history: load(HISTORY_KEY, []),
    customAxes: load(AXES_KEY, []),
    reasons: load(REASONS_KEY, []),
    positions: load(POSITIONS_KEY, {}),
    sessions: load(SESSIONS_KEY, []),
    actions: load(ACTIONS_KEY, []),
    works: load(WORKS_KEY, []),
    socialAssessments: load(SOCIAL_KEY, []),
    effortAssessments: load(EFFORT_KEY, []),
    kolbAssessments: load(KOLB_KEY, []),
    valuesAssessments: load(VALUES_KEY, []),
    thinkingAssessments: load(THINKING_KEY, []),
    johariSessions: load(JOHARI_KEY, []),
    quiz: null,
    effortQuiz: null,
    kolbQuiz: null,
    valuesQuiz: null,
    thinkingQuiz: null,
    johariDraft: { selfTraits: [], othersTraits: [], extraSelf: [], extraOthers: [] },
    johariEditingId: null,
    editingId: null,
    editingActionId: null,
    actionPathFilter: 'all',
    selectedWorkId: null,
    workStatusFilter: 'all',
    formReasons: [], // reasons being edited in the current form session
    selectedNodeId: null,
    selectedSessionId: null,
  };

  function load(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  }
  function save(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
  }
  function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  }

  // ---------- Tabs ----------
  document.querySelectorAll('.tab').forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.dataset.tab;
      document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t === btn));
      document.querySelectorAll('.panel').forEach(p => p.classList.toggle('active', p.id === `tab-${name}`));
      if (name === 'list') renderList();
      if (name === 'stats') renderStats();
      if (name === 'ai') renderHistory();
      if (name === 'axes') renderAxesSettings();
      if (name === 'input') { renderCustomAxesInForm(); renderReasonsInForm(); }
      if (name === 'graph') renderGraph();
      if (name === 'sessions') renderSessions();
      if (name === 'actions') renderActions();
      if (name === 'works') renderWorks();
      if (name === 'social') renderSocialHistory();
      if (name === 'effort') renderEffortHistory();
      if (name === 'kolb') renderKolbHistory();
      if (name === 'values') renderValuesHistory();
      if (name === 'thinking') renderThinkingHistory();
      if (name === 'johari') renderJohari();
    });
  });

  // ---------- Form ----------
  const form = document.getElementById('seed-form');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    const customAxes = {};
    for (const ax of state.customAxes) {
      const raw = form.elements['custom_' + ax.id]?.value;
      if (raw !== undefined && raw !== '') {
        customAxes[ax.id] = ax.type === 'number' ? Number(raw) : String(raw);
      }
    }
    const seed = {
      id: state.editingId || uid(),
      title: data.title.trim(),
      description: (data.description || '').trim(),
      insight: (data.insight || '').trim(),
      category: data.category,
      intensity: Number(data.intensity),
      tags: (data.tags || '').split(',').map(s => s.trim()).filter(Boolean),
      attribution: data.attribution || '',
      controllability: data.controllability || '',
      timeFrame: data.timeFrame || '',
      depth: data.depth || '',
      interventionPoint: data.interventionPoint || '',
      customAxes,
      createdAt: state.editingId
        ? state.seeds.find(s => s.id === state.editingId)?.createdAt || new Date().toISOString()
        : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    if (!seed.title) return;
    if (state.editingId) {
      state.seeds = state.seeds.map(s => s.id === state.editingId ? seed : s);
      state.editingId = null;
    } else {
      state.seeds.unshift(seed);
    }
    save(STORE_KEY, state.seeds);
    commitFormReasonsToSeed(seed.id);
    form.reset();
    form.querySelector('[name=intensity]').value = 5;
    state.formReasons = [];
    renderCustomAxesInForm();
    renderReasonsInForm();
    document.querySelector('.tab[data-tab=list]').click();
  });

  // ---------- List ----------
  const listEl = document.getElementById('seed-list');
  const emptyEl = document.getElementById('empty-list');
  const filterQ = document.getElementById('filter-q');
  const filterCat = document.getElementById('filter-cat');
  const sortSel = document.getElementById('sort');

  [filterQ, filterCat, sortSel].forEach(el => el.addEventListener('input', renderList));

  function renderList() {
    const cats = Array.from(new Set(state.seeds.map(s => s.category))).sort();
    const current = filterCat.value;
    filterCat.innerHTML = '<option value="">全カテゴリ</option>' +
      cats.map(c => `<option value="${escapeAttr(c)}" ${c === current ? 'selected' : ''}>${escapeHtml(c)}</option>`).join('');

    const q = filterQ.value.trim().toLowerCase();
    const cat = filterCat.value;
    let items = state.seeds.filter(s => {
      if (cat && s.category !== cat) return false;
      if (!q) return true;
      const hay = (s.title + ' ' + s.description + ' ' + s.tags.join(' ')).toLowerCase();
      return hay.includes(q);
    });
    const sort = sortSel.value;
    items.sort((a, b) => {
      if (sort === 'date-asc') return new Date(a.createdAt) - new Date(b.createdAt);
      if (sort === 'intensity-desc') return b.intensity - a.intensity;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    listEl.innerHTML = '';
    const tpl = document.getElementById('seed-item-template');
    emptyEl.style.display = items.length ? 'none' : 'block';

    for (const s of items) {
      const node = tpl.content.cloneNode(true);
      const li = node.querySelector('li');
      li.dataset.id = s.id;
      li.querySelector('.seed-title').textContent = s.title;
      const pill = intensityPill(s.intensity);
      li.querySelector('.seed-meta').innerHTML =
        `${pill} <span>${escapeHtml(s.category)}</span> · <span>${formatDate(s.createdAt)}</span>`;
      li.querySelector('.seed-desc').textContent = s.description;
      const insightEl = li.querySelector('.seed-insight');
      if (s.insight) {
        insightEl.textContent = '💡 ' + s.insight;
      } else {
        insightEl.remove();
      }
      const axisChips = renderAxisChips(s);
      li.querySelector('.seed-tags').innerHTML =
        axisChips + s.tags.map(t => `<span class="tag">#${escapeHtml(t)}</span>`).join('');
      li.querySelector('.edit-btn').addEventListener('click', () => editSeed(s.id));
      li.querySelector('.del-btn').addEventListener('click', () => deleteSeed(s.id));
      listEl.appendChild(node);
    }
  }

  function intensityPill(n) {
    const cls = n <= 3 ? 'intensity-low' : n <= 6 ? 'intensity-mid' : 'intensity-high';
    return `<span class="intensity-pill ${cls}">${n}</span>`;
  }

  function renderAxisChips(s) {
    const chips = [];
    for (const ax of BUILTIN_AXES) {
      const v = s[ax.key];
      if (v) chips.push(`<span class="axis-chip" data-axis="${ax.key}">${escapeHtml(ax.label)}: ${escapeHtml(String(v))}</span>`);
    }
    if (s.customAxes) {
      for (const ax of state.customAxes) {
        const v = s.customAxes[ax.id];
        if (v !== undefined && v !== '') {
          chips.push(`<span class="axis-chip custom">${escapeHtml(ax.name)}: ${escapeHtml(String(v))}</span>`);
        }
      }
    }
    return chips.join('');
  }

  function editSeed(id) {
    const s = state.seeds.find(x => x.id === id);
    if (!s) return;
    state.editingId = id;
    form.title.value = s.title;
    form.description.value = s.description;
    form.insight.value = s.insight || '';
    form.category.value = s.category;
    form.intensity.value = s.intensity;
    form.tags.value = s.tags.join(', ');
    form.elements.attribution.value = s.attribution || '';
    form.elements.controllability.value = s.controllability || '';
    form.elements.timeFrame.value = s.timeFrame || '';
    form.elements.depth.value = s.depth || '';
    form.elements.interventionPoint.value = s.interventionPoint || '';
    renderCustomAxesInForm(s.customAxes || {});
    state.formReasons = state.reasons
      .filter(r => (r.anchors || []).some(a => a.seedId === id))
      .map(r => ({
        ref: r.id,
        text: r.text,
        axisKey: (r.anchors.find(a => a.seedId === id) || {}).axisKey || '',
        parentIds: (r.parentIds || []).slice(),
      }));
    renderReasonsInForm();
    document.querySelector('.tab[data-tab=input]').click();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function deleteSeed(id) {
    if (!confirm('この記録を削除しますか？')) return;
    state.seeds = state.seeds.filter(s => s.id !== id);
    for (const r of state.reasons) {
      r.anchors = (r.anchors || []).filter(a => a.seedId !== id);
    }
    save(STORE_KEY, state.seeds);
    save(REASONS_KEY, state.reasons);
    renderList();
  }

  // ---------- Stats ----------
  function renderStats() {
    const n = state.seeds.length;
    document.getElementById('stat-count').textContent = n;
    document.getElementById('stat-avg').textContent =
      n ? (state.seeds.reduce((a, s) => a + s.intensity, 0) / n).toFixed(1) : '-';
    const now = new Date();
    const monthCount = state.seeds.filter(s => {
      const d = new Date(s.createdAt);
      return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
    }).length;
    document.getElementById('stat-month').textContent = monthCount;

    const catMap = {};
    for (const s of state.seeds) catMap[s.category] = (catMap[s.category] || 0) + 1;
    renderBars('chart-cat', catMap);

    const intMap = {};
    for (let i = 1; i <= 10; i++) intMap[i] = 0;
    for (const s of state.seeds) intMap[s.intensity] = (intMap[s.intensity] || 0) + 1;
    renderBars('chart-intensity', intMap, { keyLabel: v => `強さ ${v}` });

    const days = 14;
    const timeMap = {};
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      timeMap[d.toISOString().slice(0, 10)] = 0;
    }
    for (const s of state.seeds) {
      const key = s.createdAt.slice(0, 10);
      if (key in timeMap) timeMap[key]++;
    }
    renderBars('chart-timeline', timeMap, { keyLabel: v => v.slice(5) });
  }

  function renderBars(id, map, opts = {}) {
    const el = document.getElementById(id);
    const entries = Object.entries(map);
    if (!entries.length) { el.innerHTML = '<p class="muted">データなし</p>'; return; }
    const max = Math.max(...entries.map(([, v]) => v), 1);
    el.innerHTML = entries.map(([k, v]) => {
      const label = opts.keyLabel ? opts.keyLabel(k) : k;
      const pct = (v / max) * 100;
      return `<div class="bar-row">
        <span>${escapeHtml(String(label))}</span>
        <span><span class="bar" style="width:${pct}%"></span></span>
        <span class="bar-count">${v}</span>
      </div>`;
    }).join('');
  }

  // ---------- Settings ----------
  const apiKeyInput = document.getElementById('api-key');
  const modelSel = document.getElementById('api-model');
  apiKeyInput.value = state.settings.apiKey || '';
  modelSel.value = state.settings.model || 'claude-sonnet-4-6';

  document.getElementById('save-settings').addEventListener('click', () => {
    state.settings.apiKey = apiKeyInput.value.trim();
    state.settings.model = modelSel.value;
    save(SETTINGS_KEY, state.settings);
    flash('設定を保存しました');
  });

  document.getElementById('export-btn').addEventListener('click', () => {
    const blob = new Blob([JSON.stringify({
      seeds: state.seeds,
      history: state.history,
      customAxes: state.customAxes,
      reasons: state.reasons,
      positions: state.positions,
      sessions: state.sessions,
      actions: state.actions,
      works: state.works,
      socialAssessments: state.socialAssessments,
      effortAssessments: state.effortAssessments,
      kolbAssessments: state.kolbAssessments,
      valuesAssessments: state.valuesAssessments,
      thinkingAssessments: state.thinkingAssessments,
      johariSessions: state.johariSessions,
    }, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nayami-seeds-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  });

  document.getElementById('import-file').addEventListener('change', async e => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      if (Array.isArray(data.seeds)) {
        state.seeds = data.seeds;
        save(STORE_KEY, state.seeds);
      }
      if (Array.isArray(data.history)) {
        state.history = data.history;
        save(HISTORY_KEY, state.history);
      }
      if (Array.isArray(data.customAxes)) {
        state.customAxes = data.customAxes;
        save(AXES_KEY, state.customAxes);
      }
      if (Array.isArray(data.reasons)) {
        state.reasons = data.reasons;
        save(REASONS_KEY, state.reasons);
      }
      if (data.positions && typeof data.positions === 'object') {
        state.positions = data.positions;
        save(POSITIONS_KEY, state.positions);
      }
      if (Array.isArray(data.sessions)) {
        state.sessions = data.sessions;
        save(SESSIONS_KEY, state.sessions);
      }
      if (Array.isArray(data.actions)) {
        state.actions = data.actions;
        save(ACTIONS_KEY, state.actions);
      }
      if (Array.isArray(data.works)) {
        state.works = data.works;
        save(WORKS_KEY, state.works);
      }
      if (Array.isArray(data.socialAssessments)) {
        state.socialAssessments = data.socialAssessments;
        save(SOCIAL_KEY, state.socialAssessments);
      }
      if (Array.isArray(data.effortAssessments)) {
        state.effortAssessments = data.effortAssessments;
        save(EFFORT_KEY, state.effortAssessments);
      }
      if (Array.isArray(data.kolbAssessments)) {
        state.kolbAssessments = data.kolbAssessments;
        save(KOLB_KEY, state.kolbAssessments);
      }
      if (Array.isArray(data.valuesAssessments)) {
        state.valuesAssessments = data.valuesAssessments;
        save(VALUES_KEY, state.valuesAssessments);
      }
      if (Array.isArray(data.thinkingAssessments)) {
        state.thinkingAssessments = data.thinkingAssessments;
        save(THINKING_KEY, state.thinkingAssessments);
      }
      if (Array.isArray(data.johariSessions)) {
        state.johariSessions = data.johariSessions;
        save(JOHARI_KEY, state.johariSessions);
      }
      flash('インポートしました');
      renderList();
      renderAxesSettings();
      renderCustomAxesInForm();
      renderReasonsInForm();
      renderSessions();
      renderActions();
      renderWorks();
      renderSocialHistory();
      renderEffortHistory();
      renderKolbHistory();
      renderValuesHistory();
      renderThinkingHistory();
      renderJohari();
    } catch (err) {
      alert('インポートに失敗しました: ' + err.message);
    }
    e.target.value = '';
  });

  document.getElementById('load-sample-btn').addEventListener('click', () => {
    if (!Array.isArray(window.SAMPLE_SEEDS) || !window.SAMPLE_SEEDS.length) {
      alert('サンプルデータが見つかりません。');
      return;
    }
    const msg = state.seeds.length
      ? `既存の記録(${state.seeds.length}件)に、サンプル${window.SAMPLE_SEEDS.length}件を追加します。よろしいですか？`
      : `サンプル${window.SAMPLE_SEEDS.length}件を読み込みます。よろしいですか？`;
    if (!confirm(msg)) return;
    const now = new Date();
    const added = window.SAMPLE_SEEDS.map((t, i) => {
      const d = new Date(now.getTime() - i * 60 * 1000);
      return {
        id: uid(),
        title: t.title,
        description: t.description || '',
        insight: t.insight || '',
        category: t.category || 'その他',
        intensity: Number(t.intensity) || 5,
        tags: Array.isArray(t.tags) ? t.tags.slice() : [],
        attribution: t.attribution || '',
        controllability: t.controllability || '',
        timeFrame: t.timeFrame || '',
        depth: t.depth || '',
        interventionPoint: t.interventionPoint || '',
        customAxes: t.customAxes ? { ...t.customAxes } : {},
        createdAt: d.toISOString(),
        updatedAt: d.toISOString(),
      };
    });
    state.seeds = added.concat(state.seeds);
    save(STORE_KEY, state.seeds);

    // サンプル理由ネットワーク
    const byTitle = new Map(added.map(s => [s.title, s.id]));
    const byKey = new Map();
    if (Array.isArray(window.SAMPLE_REASONS) && window.SAMPLE_REASONS.length) {
      const newReasons = [];
      // 1st pass: create reasons without parents
      for (const t of window.SAMPLE_REASONS) {
        const r = {
          id: 'r_' + uid(),
          text: t.text,
          parentIds: [],
          anchors: [],
        };
        if (t.seedTitle && byTitle.has(t.seedTitle)) {
          r.anchors.push({ seedId: byTitle.get(t.seedTitle), axisKey: t.axisKey || null });
        }
        if (t.key) byKey.set(t.key, r.id);
        newReasons.push({ r, parentKeys: t.parents || [] });
      }
      // 2nd pass: resolve parent ids
      for (const { r, parentKeys } of newReasons) {
        r.parentIds = parentKeys.map(k => byKey.get(k)).filter(Boolean);
        state.reasons.push(r);
      }
      save(REASONS_KEY, state.reasons);
    }

    // サンプルワーク
    if (Array.isArray(window.SAMPLE_WORKS) && window.SAMPLE_WORKS.length) {
      for (const t of window.SAMPLE_WORKS) {
        state.works.unshift({
          id: 'w_' + uid(),
          title: t.title,
          question: t.question || '',
          exploration: t.exploration || '',
          status: t.status || 'open',
          priority: Number(t.priority) || 3,
          seedIds: [],
          reasonIds: [],
          subWorks: (t.subWorks || []).map(sw => ({ id: 'sw_' + uid(), text: sw.text, done: !!sw.done })),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      }
      save(WORKS_KEY, state.works);
    }

    // サンプルセッション
    if (Array.isArray(window.SAMPLE_SESSIONS) && window.SAMPLE_SESSIONS.length) {
      for (const t of window.SAMPLE_SESSIONS) {
        const session = {
          id: 'ss_' + uid(),
          title: t.title,
          date: t.date || new Date().toISOString().slice(0, 10),
          participants: t.participants ? t.participants.slice() : [],
          sections: (t.sections || []).map(sec => ({
            id: 'sec_' + uid(),
            heading: sec.heading,
            body: sec.body,
            seedIds: (sec.linkSeedTitles || []).map(title => byTitle.get(title)).filter(Boolean),
            reasonIds: (sec.linkReasonKeys || []).map(key => byKey.get(key)).filter(Boolean),
          })),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        state.sessions.unshift(session);
      }
      save(SESSIONS_KEY, state.sessions);
    }

    flash(`${added.length}件読み込みました`);
    renderList();
    renderStats();
    renderReasonsInForm();
    renderSessions();
    renderWorks();
  });

  document.getElementById('clear-btn').addEventListener('click', () => {
    if (!confirm('すべてのデータ（記録・理由・分析履歴・位置情報・セッション・アクション・ワーク）を削除します。よろしいですか？')) return;
    state.seeds = [];
    state.history = [];
    state.reasons = [];
    state.positions = {};
    state.sessions = [];
    state.actions = [];
    state.works = [];
    state.socialAssessments = [];
    state.effortAssessments = [];
    state.kolbAssessments = [];
    state.valuesAssessments = [];
    state.thinkingAssessments = [];
    state.johariSessions = [];
    state.johariDraft = { selfTraits: [], othersTraits: [], extraSelf: [], extraOthers: [] };
    state.johariEditingId = null;
    save(STORE_KEY, state.seeds);
    save(HISTORY_KEY, state.history);
    save(REASONS_KEY, state.reasons);
    save(POSITIONS_KEY, state.positions);
    save(SESSIONS_KEY, state.sessions);
    save(ACTIONS_KEY, state.actions);
    save(WORKS_KEY, state.works);
    save(SOCIAL_KEY, state.socialAssessments);
    save(EFFORT_KEY, state.effortAssessments);
    save(KOLB_KEY, state.kolbAssessments);
    save(VALUES_KEY, state.valuesAssessments);
    save(THINKING_KEY, state.thinkingAssessments);
    save(JOHARI_KEY, state.johariSessions);
    renderList();
    renderHistory();
    renderReasonsInForm();
    renderSessions();
    renderActions();
    renderWorks();
    renderSocialHistory();
    renderEffortHistory();
    renderKolbHistory();
    renderValuesHistory();
    renderThinkingHistory();
    renderJohari();
    flash('削除しました');
  });

  // ---------- AI analysis ----------
  const aiMode = document.getElementById('ai-mode');
  const aiCustomWrap = document.getElementById('ai-custom-wrap');
  aiMode.addEventListener('change', () => {
    aiCustomWrap.classList.toggle('hidden', aiMode.value !== 'custom');
  });

  document.getElementById('ai-run').addEventListener('click', runAnalysis);
  document.getElementById('ai-copy').addEventListener('click', () => {
    const text = document.getElementById('ai-output').textContent;
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => flash('コピーしました'));
  });

  async function runAnalysis() {
    const out = document.getElementById('ai-output');
    const status = document.getElementById('ai-status');
    out.textContent = '';
    status.textContent = '';

    if (!state.settings.apiKey) {
      status.textContent = '設定タブでAPIキーを登録してください。';
      return;
    }

    const scope = document.getElementById('ai-scope').value;
    let target = state.seeds.slice();
    if (scope === 'recent30') target = target.slice(0, 30);
    if (scope === 'high') target = target.filter(s => s.intensity >= 7);

    if (!target.length) {
      status.textContent = '対象となる記録がありません。';
      return;
    }

    const mode = aiMode.value;
    const customText = document.getElementById('ai-custom').value.trim();
    const instruction = buildInstruction(mode, customText);
    document.getElementById('ai-suggest-preview').innerHTML = '';

    const seedText = target.map((s, i) => {
      const parts = [
        `【${i + 1}】${s.title}`,
        `カテゴリ: ${s.category} / 強さ: ${s.intensity}/10 / 日付: ${s.createdAt.slice(0, 10)}`,
        `タグ: ${s.tags.join(', ') || 'なし'}`,
        `詳細: ${s.description || '(なし)'}`,
      ];
      const axisBits = [];
      for (const ax of BUILTIN_AXES) {
        if (s[ax.key]) axisBits.push(`${ax.label}=${s[ax.key]}`);
      }
      if (s.customAxes) {
        for (const ax of state.customAxes) {
          const v = s.customAxes[ax.id];
          if (v !== undefined && v !== '') axisBits.push(`${ax.name}=${v}`);
        }
      }
      if (axisBits.length) parts.push('軸: ' + axisBits.join(' / '));
      if (s.insight) parts.push(`気づき: ${s.insight}`);
      return parts.join('\n');
    }).join('\n\n---\n\n');

    const systemPrompt = [
      'あなたは思慮深く、共感的で、しかし流されずに構造化して考える分析パートナーです。',
      'ユーザーが書き留めた「悩みの種」を読み、日本語で回答します。',
      '曖昧な一般論は避け、具体的な事実や表現を引用してください。',
      '見出しと箇条書きを用いて読みやすく整理してください。',
    ].join('\n');

    const userPrompt = `${instruction}\n\n## 記録（${target.length}件）\n\n${seedText}`;

    status.textContent = '分析中...';
    document.getElementById('ai-run').disabled = true;
    try {
      const text = await callClaude(systemPrompt, userPrompt);
      out.textContent = text;
      status.textContent = `完了 (${target.length}件を分析 / モデル: ${state.settings.model})`;
      if (mode === 'suggest-reasons') {
        renderSuggestPreview(text, target);
      } else if (mode === 'reclassify-depth') {
        renderReclassifyPreview(text, target);
      } else if (mode === 'intervention-map') {
        renderInterventionPreview(text, target);
      }
      state.history.unshift({
        id: uid(),
        at: new Date().toISOString(),
        mode,
        scope,
        count: target.length,
        output: text,
      });
      state.history = state.history.slice(0, 30);
      save(HISTORY_KEY, state.history);
      renderHistory();
    } catch (err) {
      status.textContent = 'エラー: ' + err.message;
    } finally {
      document.getElementById('ai-run').disabled = false;
    }
  }

  function buildInstruction(mode, custom) {
    switch (mode) {
      case 'pattern':
        return '以下の記録から、共通するパターン・繰り返されているテーマ・隠れた構造を見つけ、3〜5個にまとめて提示してください。それぞれ根拠となる記録番号を引用してください。';
      case 'root':
        return '以下の記録の背景にある根本原因の仮説を複数挙げてください。表層の悩みと、その下にありそうな価値観・信念・環境要因を分けて整理してください。';
      case 'dialog':
        return '以下の記録を読み、本人がさらに深く自己理解するための「問いかけ」を5〜7個してください。答えを押し付けず、本人が自分の言葉で言語化できるような開かれた質問にしてください。質問ごとに、どの記録から着想したか（番号）と、なぜその問いが有効かの一文を添えてください。';
      case 'action':
        return '以下の記録を踏まえ、今週から試せる小さな具体的アクションを優先度順に5つ提案してください。各アクションには、対応する悩み・期待される効果・最初の一歩を含めてください。';
      case 'reframe':
        return '以下の記録について、異なる視点からの捉え直し（リフレーミング）をいくつか提示してください。ただし安直なポジティブ変換ではなく、妥当性のある別解釈や長期視点を示してください。';
      case 'unravel':
        return [
          '以下の記録を「解き明かす」ために、次の3層で整理してください。',
          '1. 表層（何が起きているか・何を感じているか）',
          '2. 中層（その感情の下にある欲求・恐れ・信念）',
          '3. 深層（その信念の起源として考えられる経験・環境）',
          '各層で、どの記録番号が該当するか引用し、共通して見える構造を最後にまとめてください。',
        ].join('\n');
      case 'suggest-reasons':
        return [
          '以下の記録を読み、その背景にある「理由」の候補を5〜10個提案してください。',
          '深い理由（核心・起源）と、そこから派生する中層の理由まで、親子関係を意識してください。',
          '出力は必ず以下のJSONのみ（前後の文章や説明は不要、コードブロックで囲んでください）:',
          '```json',
          '{',
          '  "reasons": [',
          '    {',
          '      "key": "R1",',
          '      "text": "理由の内容（30字程度）",',
          '      "parents": ["R2"],',
          '      "anchor_indices": [1, 3]',
          '    }',
          '  ]',
          '}',
          '```',
          'key は R1, R2, ... の形式で一意。parents は深い理由の key の配列。anchor_indices は関連する記録番号（【n】）の配列。',
        ].join('\n');
      case 'intervention-map':
        return [
          '以下の記録それぞれについて、「層Aを維持するループ（入力→解釈→感情→行動→結果→信念強化）」のどこで断ち切るのが最も有効かを提案してください。',
          '選択肢: 入力制御 / 解釈遅延 / 感情切断 / 行動固定 / 結果再定義',
          '',
          '出力は必ず以下のJSONのみ（コードブロック```json ... ```で囲む）:',
          '```json',
          '{',
          '  "interventions": [',
          '    {',
          '      "index": 1,',
          '      "point": "解釈遅延",',
          '      "reason": "この悩みで効くと考える理由（一文）",',
          '      "first_step": "今週から試せる小さな具体アクション（一文）"',
          '    }',
          '  ]',
          '}',
          '```',
          'すべての記録について一つずつ提案してください。',
        ].join('\n');
      case 'reclassify-depth':
        return [
          '以下の記録それぞれを、次の層A/B/Cモデルに振り分けてください。',
          '- 層A（核心）: 「ありのままでは愛されない」のような、幼少期からの自己への根本信念。',
          '- 層B（中層）: 比較・自己否定・欲求の抑圧といった思考と行動の癖。層Aを維持するループ。',
          '- 層C（表層）: 外見・人間関係・具体的な悩み。Cだけ潰してもCは再生産される。',
          '',
          '出力は必ず以下のJSONのみ（コードブロック```json ... ```で囲む）:',
          '```json',
          '{',
          '  "classifications": [',
          '    {',
          '      "index": 1,',
          '      "depth": "核心",',
          '      "rationale": "なぜその層に分類したかの一文"',
          '    }',
          '  ]',
          '}',
          '```',
          'depth は "表層" / "中層" / "核心" のいずれか。index は【n】の番号。すべての記録について分類を返してください。',
        ].join('\n');
      case 'custom':
        return custom || '以下の記録を分析してください。';
      default:
        return '以下の記録を分析してください。';
    }
  }

  async function callClaude(systemPrompt, userPrompt) {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': state.settings.apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model: state.settings.model,
        max_tokens: 2048,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }],
      }),
    });
    if (!res.ok) {
      const body = await res.text();
      throw new Error(`${res.status} ${body.slice(0, 200)}`);
    }
    const data = await res.json();
    return data.content.map(c => c.text || '').join('\n');
  }

  function renderHistory() {
    const ul = document.getElementById('ai-history');
    if (!state.history.length) {
      ul.innerHTML = '<li class="muted">まだ履歴はありません。</li>';
      return;
    }
    ul.innerHTML = state.history.map(h => `
      <li data-id="${h.id}">
        <div class="h-meta">${formatDate(h.at)} · ${modeLabel(h.mode)} · ${h.count}件</div>
        <div class="h-preview">${escapeHtml(h.output).slice(0, 240)}</div>
      </li>
    `).join('');
    ul.querySelectorAll('li[data-id]').forEach(li => {
      li.addEventListener('click', () => {
        const h = state.history.find(x => x.id === li.dataset.id);
        if (h) document.getElementById('ai-output').textContent = h.output;
      });
    });
  }

  function modeLabel(m) {
    return {
      pattern: 'パターン発見',
      root: '根本原因',
      dialog: '問いかけ',
      action: 'アクション提案',
      reframe: 'リフレーミング',
      unravel: '解き明かす',
      'suggest-reasons': '理由ネットワーク提案',
      'reclassify-depth': '深さ層 再分類',
      'intervention-map': '介入点マップ',
      custom: 'カスタム',
    }[m] || m;
  }

  function renderReclassifyPreview(aiText, targetSeeds) {
    const wrap = document.getElementById('ai-suggest-preview');
    const json = extractJson(aiText);
    if (!json || !Array.isArray(json.classifications)) {
      wrap.innerHTML = '<p class="muted">提案されたJSONを解析できませんでした。出力を確認してください。</p>';
      return;
    }
    const valid = ['表層', '中層', '核心'];
    const rows = json.classifications.filter(c => valid.includes(c.depth) && typeof c.index === 'number');
    if (!rows.length) {
      wrap.innerHTML = '<p class="muted">有効な分類結果がありません。</p>';
      return;
    }
    wrap.innerHTML = `
      <div class="suggest-box">
        <h3>深さ層の再分類提案（${rows.length}件）</h3>
        <p class="muted">チェックを入れた項目のみ、記録の「深さ層」に上書きされます。</p>
        <ul class="suggest-list">
          ${rows.map((c, i) => {
            const s = targetSeeds[c.index - 1];
            if (!s) return '';
            const before = s.depth || '未設定';
            const changed = before !== c.depth;
            return `<li>
              <label>
                <input type="checkbox" class="reclass-check" data-i="${i}" ${changed ? 'checked' : ''} />
                <b>【${c.index}】</b>
                <span>${escapeHtml(truncate(s.title, 36))}</span>
                <span class="muted">${escapeHtml(before)} →</span>
                <b class="depth-badge depth-${c.depth}">${escapeHtml(c.depth)}</b>
                ${c.rationale ? `<div class="rationale muted">${escapeHtml(c.rationale)}</div>` : ''}
              </label>
            </li>`;
          }).join('')}
        </ul>
        <div class="actions">
          <button id="reclass-accept" class="primary">選択した分類を適用</button>
          <button id="reclass-all">全選択</button>
          <button id="reclass-none">全解除</button>
        </div>
      </div>`;
    wrap.querySelector('#reclass-all').addEventListener('click', () => {
      wrap.querySelectorAll('.reclass-check').forEach(c => { c.checked = true; });
    });
    wrap.querySelector('#reclass-none').addEventListener('click', () => {
      wrap.querySelectorAll('.reclass-check').forEach(c => { c.checked = false; });
    });
    wrap.querySelector('#reclass-accept').addEventListener('click', () => {
      const picked = Array.from(wrap.querySelectorAll('.reclass-check'))
        .filter(c => c.checked)
        .map(c => rows[+c.dataset.i]);
      if (!picked.length) { alert('適用する項目がありません。'); return; }
      let n = 0;
      for (const c of picked) {
        const s = targetSeeds[c.index - 1];
        if (!s) continue;
        const target = state.seeds.find(x => x.id === s.id);
        if (target) { target.depth = c.depth; target.updatedAt = new Date().toISOString(); n++; }
      }
      save(STORE_KEY, state.seeds);
      wrap.innerHTML = `<p class="muted">${n}件の深さ層を更新しました。</p>`;
      renderList();
    });
  }

  function renderSuggestPreview(aiText, targetSeeds) {
    const wrap = document.getElementById('ai-suggest-preview');
    const json = extractJson(aiText);
    if (!json || !Array.isArray(json.reasons)) {
      wrap.innerHTML = '<p class="muted">提案されたJSONを解析できませんでした。AIの出力（上）を確認してください。</p>';
      return;
    }
    const reasons = json.reasons;
    wrap.innerHTML = `
      <div class="suggest-box">
        <h3>提案された理由（${reasons.length}件）</h3>
        <p class="muted">チェックを入れた項目のみ、図解に追加されます。key の親子関係は保持されます。</p>
        <ul class="suggest-list">
          ${reasons.map((r, i) => `
            <li>
              <label>
                <input type="checkbox" class="suggest-check" data-i="${i}" checked />
                <b>${escapeHtml(r.key || ('R' + (i + 1)))}</b>
                <span>${escapeHtml(r.text || '')}</span>
                ${Array.isArray(r.parents) && r.parents.length ? `<span class="muted">← ${r.parents.map(escapeHtml).join(', ')}</span>` : ''}
                ${Array.isArray(r.anchor_indices) && r.anchor_indices.length ? `<span class="muted">【記録: ${r.anchor_indices.join(', ')}】</span>` : ''}
              </label>
            </li>
          `).join('')}
        </ul>
        <div class="actions">
          <button id="suggest-accept" class="primary">選択した理由を追加</button>
          <button id="suggest-all">全選択</button>
          <button id="suggest-none">全解除</button>
        </div>
      </div>`;

    wrap.querySelector('#suggest-all').addEventListener('click', () => {
      wrap.querySelectorAll('.suggest-check').forEach(c => { c.checked = true; });
    });
    wrap.querySelector('#suggest-none').addEventListener('click', () => {
      wrap.querySelectorAll('.suggest-check').forEach(c => { c.checked = false; });
    });
    wrap.querySelector('#suggest-accept').addEventListener('click', () => {
      const picked = Array.from(wrap.querySelectorAll('.suggest-check'))
        .filter(c => c.checked)
        .map(c => reasons[+c.dataset.i]);
      if (!picked.length) { alert('追加する項目がありません。'); return; }
      applySuggestedReasons(picked, targetSeeds);
      wrap.innerHTML = `<p class="muted">${picked.length}件を理由ネットワークに追加しました。図解タブで確認できます。</p>`;
    });
  }

  function renderInterventionPreview(aiText, targetSeeds) {
    const wrap = document.getElementById('ai-suggest-preview');
    const json = extractJson(aiText);
    if (!json || !Array.isArray(json.interventions)) {
      wrap.innerHTML = '<p class="muted">提案されたJSONを解析できませんでした。出力を確認してください。</p>';
      return;
    }
    const valid = ['入力制御', '解釈遅延', '感情切断', '行動固定', '結果再定義'];
    const rows = json.interventions.filter(c => valid.includes(c.point) && typeof c.index === 'number');
    if (!rows.length) {
      wrap.innerHTML = '<p class="muted">有効な提案がありません。</p>';
      return;
    }
    wrap.innerHTML = `
      <div class="suggest-box">
        <h3>介入点マップ（${rows.length}件）</h3>
        <p class="muted">チェックした項目の「介入点」軸が記録に反映されます。first_stepは提案として保持されます（アクション機能に後で取り込み予定）。</p>
        <ul class="suggest-list">
          ${rows.map((c, i) => {
            const s = targetSeeds[c.index - 1];
            if (!s) return '';
            const before = s.interventionPoint || '未設定';
            const changed = before !== c.point;
            return `<li>
              <label>
                <input type="checkbox" class="interv-check" data-i="${i}" ${changed ? 'checked' : ''} />
                <b>【${c.index}】</b>
                <span>${escapeHtml(truncate(s.title, 36))}</span>
                <span class="muted">${escapeHtml(before)} →</span>
                <b class="interv-badge">${escapeHtml(c.point)}</b>
                ${c.reason ? `<div class="rationale muted">理由: ${escapeHtml(c.reason)}</div>` : ''}
                ${c.first_step ? `<div class="rationale">最初の一歩: ${escapeHtml(c.first_step)}</div>` : ''}
              </label>
            </li>`;
          }).join('')}
        </ul>
        <div class="actions">
          <button id="interv-accept" class="primary">選択した介入点を適用</button>
          <button id="interv-all">全選択</button>
          <button id="interv-none">全解除</button>
        </div>
      </div>`;
    wrap.querySelector('#interv-all').addEventListener('click', () => {
      wrap.querySelectorAll('.interv-check').forEach(c => { c.checked = true; });
    });
    wrap.querySelector('#interv-none').addEventListener('click', () => {
      wrap.querySelectorAll('.interv-check').forEach(c => { c.checked = false; });
    });
    wrap.querySelector('#interv-accept').addEventListener('click', () => {
      const picked = Array.from(wrap.querySelectorAll('.interv-check'))
        .filter(c => c.checked)
        .map(c => rows[+c.dataset.i]);
      if (!picked.length) { alert('適用する項目がありません。'); return; }
      let n = 0;
      for (const c of picked) {
        const s = targetSeeds[c.index - 1];
        if (!s) continue;
        const target = state.seeds.find(x => x.id === s.id);
        if (target) {
          target.interventionPoint = c.point;
          target.updatedAt = new Date().toISOString();
          n++;
        }
      }
      save(STORE_KEY, state.seeds);
      wrap.innerHTML = `<p class="muted">${n}件の介入点を更新しました。</p>`;
      renderList();
    });
  }

  function extractJson(text) {
    const fence = text.match(/```(?:json)?\s*([\s\S]*?)```/);
    const candidate = fence ? fence[1] : text;
    try { return JSON.parse(candidate); } catch {}
    // try trimming to first { ... last }
    const a = candidate.indexOf('{'), b = candidate.lastIndexOf('}');
    if (a >= 0 && b > a) {
      try { return JSON.parse(candidate.slice(a, b + 1)); } catch {}
    }
    return null;
  }

  function applySuggestedReasons(picked, targetSeeds) {
    const keyToId = {};
    // Pass 1: create reasons
    for (const r of picked) {
      const id = 'r_' + uid();
      keyToId[r.key || id] = id;
      const anchors = [];
      for (const idx of (r.anchor_indices || [])) {
        const s = targetSeeds[Number(idx) - 1];
        if (s) anchors.push({ seedId: s.id, axisKey: null });
      }
      state.reasons.push({ id, text: r.text || '', parentIds: [], anchors });
    }
    // Pass 2: resolve parent links
    for (const r of picked) {
      const id = keyToId[r.key];
      const node = state.reasons.find(x => x.id === id);
      if (!node) continue;
      for (const pkey of (r.parents || [])) {
        const pid = keyToId[pkey];
        if (pid && pid !== id && !wouldCreateCycle(id, pid)) {
          node.parentIds.push(pid);
        }
      }
    }
    save(REASONS_KEY, state.reasons);
  }

  // ---------- Helpers ----------
  function formatDate(iso) {
    const d = new Date(iso);
    const pad = n => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
    })[c]);
  }
  function escapeAttr(s) { return escapeHtml(s); }

  let flashTimer;
  function flash(msg) {
    const el = document.getElementById('ai-status');
    clearTimeout(flashTimer);
    el.textContent = msg;
    flashTimer = setTimeout(() => { if (el.textContent === msg) el.textContent = ''; }, 2500);
  }

  // ---------- Custom Axes ----------
  const axisForm = document.getElementById('axis-form');
  const axisTypeSel = axisForm?.elements?.type;
  const axisOptionsWrap = document.getElementById('axis-options-wrap');
  const axisNumberWrap = document.getElementById('axis-number-wrap');

  axisTypeSel?.addEventListener('change', () => {
    const t = axisTypeSel.value;
    axisOptionsWrap.classList.toggle('hidden', t !== 'select');
    axisNumberWrap.classList.toggle('hidden', t !== 'number');
  });

  axisForm?.addEventListener('submit', e => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(axisForm));
    if (!d.name.trim()) return;
    const axis = {
      id: uid(),
      name: d.name.trim(),
      type: d.type,
      description: (d.description || '').trim(),
    };
    if (d.type === 'select') {
      axis.options = (d.options || '').split(',').map(s => s.trim()).filter(Boolean);
      if (!axis.options.length) { alert('選択肢を入力してください。'); return; }
    } else if (d.type === 'number') {
      axis.min = Number(d.min);
      axis.max = Number(d.max);
      if (!(axis.max > axis.min)) { alert('最大値は最小値より大きくしてください。'); return; }
    }
    state.customAxes.push(axis);
    save(AXES_KEY, state.customAxes);
    axisForm.reset();
    axisTypeSel.dispatchEvent(new Event('change'));
    renderAxesSettings();
    renderCustomAxesInForm();
    flash('軸を追加しました');
  });

  document.querySelectorAll('.preset-btns button').forEach(btn => {
    btn.addEventListener('click', () => {
      const p = AXIS_PRESETS[btn.dataset.preset];
      if (!p) return;
      if (state.customAxes.some(a => a.name === p.name)) {
        flash(`「${p.name}」は既に追加されています`);
        return;
      }
      state.customAxes.push({ id: uid(), ...p, options: p.options ? p.options.slice() : undefined });
      save(AXES_KEY, state.customAxes);
      renderAxesSettings();
      renderCustomAxesInForm();
      flash(`「${p.name}」を追加しました`);
    });
  });

  function renderAxesSettings() {
    const ul = document.getElementById('custom-axes-list');
    if (!ul) return;
    if (!state.customAxes.length) {
      ul.innerHTML = '<li class="muted">カスタム軸はまだありません。下のプリセットや「新しい軸を追加」から作れます。</li>';
      return;
    }
    ul.innerHTML = state.customAxes.map(ax => {
      const spec = ax.type === 'select'
        ? `選択: ${(ax.options || []).join(' / ')}`
        : ax.type === 'number'
          ? `数値: ${ax.min}〜${ax.max}`
          : '自由入力';
      const desc = ax.description ? ` — ${escapeHtml(ax.description)}` : '';
      return `<li data-id="${ax.id}">
        <div>
          <b>${escapeHtml(ax.name)}</b> <span class="muted">(${escapeHtml(spec)})</span>${desc}
        </div>
        <div><button class="del-axis" data-id="${ax.id}">削除</button></div>
      </li>`;
    }).join('');
    ul.querySelectorAll('.del-axis').forEach(b => {
      b.addEventListener('click', () => {
        const id = b.dataset.id;
        const ax = state.customAxes.find(a => a.id === id);
        if (!ax) return;
        if (!confirm(`軸「${ax.name}」を削除しますか？（各記録の値も表示されなくなりますが、データ自体は残ります）`)) return;
        state.customAxes = state.customAxes.filter(a => a.id !== id);
        save(AXES_KEY, state.customAxes);
        renderAxesSettings();
        renderCustomAxesInForm();
      });
    });
  }

  function renderCustomAxesInForm(values = {}) {
    const wrap = document.getElementById('custom-axes-fields');
    const countEl = document.getElementById('custom-axes-count');
    const details = document.getElementById('custom-axes-details');
    if (!wrap) return;
    countEl.textContent = state.customAxes.length;
    if (!state.customAxes.length) {
      wrap.innerHTML = '';
      details.style.display = 'none';
      return;
    }
    details.style.display = '';
    wrap.innerHTML = state.customAxes.map(ax => {
      const v = values[ax.id] ?? '';
      const name = 'custom_' + ax.id;
      if (ax.type === 'select') {
        const opts = ['<option value="">—</option>'].concat(
          (ax.options || []).map(o => `<option value="${escapeAttr(o)}" ${String(o) === String(v) ? 'selected' : ''}>${escapeHtml(o)}</option>`)
        ).join('');
        return `<label>${escapeHtml(ax.name)}<select name="${name}">${opts}</select></label>`;
      }
      if (ax.type === 'number') {
        return `<label>${escapeHtml(ax.name)} (${ax.min}〜${ax.max})
          <input type="number" name="${name}" min="${ax.min}" max="${ax.max}" value="${escapeAttr(v)}" />
        </label>`;
      }
      return `<label>${escapeHtml(ax.name)}<input type="text" name="${name}" value="${escapeAttr(v)}" /></label>`;
    }).join('');
  }

  // ---------- Reasons (form) ----------
  function axisOptionsForForm() {
    const opts = [{ value: '', label: '悩み全体' }];
    for (const ax of BUILTIN_AXES) opts.push({ value: ax.key, label: ax.label });
    opts.push({ value: 'intensity', label: '強さ' });
    for (const ax of state.customAxes) opts.push({ value: 'custom_' + ax.id, label: ax.name });
    return opts;
  }

  function renderReasonsInForm() {
    const wrap = document.getElementById('reasons-in-form');
    const countEl = document.getElementById('reasons-count');
    if (!wrap) return;
    countEl.textContent = state.formReasons.length;
    if (!state.formReasons.length) {
      wrap.innerHTML = '<p class="muted">まだ理由はありません。「＋ 理由を追加」で書き足せます。</p>';
      return;
    }
    const axisOpts = axisOptionsForForm();
    wrap.innerHTML = state.formReasons.map((fr, i) => {
      const parentOpts = state.reasons
        .filter(r => r.id !== fr.ref)
        .map(r => `<option value="${r.id}" ${fr.parentIds.includes(r.id) ? 'selected' : ''}>${escapeHtml(truncate(r.text, 40))}</option>`)
        .join('');
      const axisOptsHtml = axisOpts
        .map(o => `<option value="${escapeAttr(o.value)}" ${o.value === fr.axisKey ? 'selected' : ''}>${escapeHtml(o.label)}</option>`)
        .join('');
      return `<div class="reason-row" data-i="${i}">
        <div class="reason-row-head">
          <select class="reason-axis" data-i="${i}">${axisOptsHtml}</select>
          <button type="button" class="reason-del" data-i="${i}">削除</button>
        </div>
        <textarea class="reason-text" data-i="${i}" rows="2" placeholder="なぜそう感じる／思う？">${escapeHtml(fr.text)}</textarea>
        <label class="reason-parents-label">より深い理由（根底にあるもの）
          <select class="reason-parents" data-i="${i}" multiple size="${Math.min(4, Math.max(2, state.reasons.length))}">${parentOpts || '<option disabled>（他の理由を書くと選べます）</option>'}</select>
        </label>
      </div>`;
    }).join('');

    wrap.querySelectorAll('.reason-text').forEach(t => {
      t.addEventListener('input', e => {
        state.formReasons[+e.target.dataset.i].text = e.target.value;
        countEl.textContent = state.formReasons.length;
      });
    });
    wrap.querySelectorAll('.reason-axis').forEach(s => {
      s.addEventListener('change', e => {
        state.formReasons[+e.target.dataset.i].axisKey = e.target.value;
      });
    });
    wrap.querySelectorAll('.reason-parents').forEach(s => {
      s.addEventListener('change', e => {
        const i = +e.target.dataset.i;
        state.formReasons[i].parentIds = Array.from(e.target.selectedOptions).map(o => o.value);
      });
    });
    wrap.querySelectorAll('.reason-del').forEach(b => {
      b.addEventListener('click', () => {
        state.formReasons.splice(+b.dataset.i, 1);
        renderReasonsInForm();
      });
    });
  }

  document.getElementById('add-reason-btn').addEventListener('click', () => {
    state.formReasons.push({ ref: null, text: '', axisKey: '', parentIds: [] });
    renderReasonsInForm();
  });

  function commitFormReasonsToSeed(seedId) {
    // remove stale anchors to this seed
    for (const r of state.reasons) {
      r.anchors = (r.anchors || []).filter(a => a.seedId !== seedId);
    }
    for (const fr of state.formReasons) {
      const text = (fr.text || '').trim();
      if (!text) continue;
      let r = fr.ref ? state.reasons.find(x => x.id === fr.ref) : null;
      if (r) {
        r.text = text;
        r.parentIds = (fr.parentIds || []).filter(pid => pid !== r.id);
      } else {
        r = { id: 'r_' + uid(), text, parentIds: (fr.parentIds || []).slice(), anchors: [] };
        state.reasons.push(r);
      }
      r.anchors = r.anchors || [];
      if (!r.anchors.some(a => a.seedId === seedId && (a.axisKey || '') === (fr.axisKey || ''))) {
        r.anchors.push({ seedId, axisKey: fr.axisKey || null });
      }
    }
    // drop reasons that have no anchors and no children pointing to them
    const referencedAsParent = new Set();
    for (const r of state.reasons) for (const p of (r.parentIds || [])) referencedAsParent.add(p);
    state.reasons = state.reasons.filter(r => (r.anchors && r.anchors.length) || referencedAsParent.has(r.id));
    save(REASONS_KEY, state.reasons);
  }

  function truncate(s, n) { return s.length > n ? s.slice(0, n - 1) + '…' : s; }

  // ---------- Graph (SVG force-directed) ----------
  const graphSvg = document.getElementById('graph-svg');
  const graphPanel = document.getElementById('graph-panel');
  const graphFilter = document.getElementById('graph-filter');
  const graphCat = document.getElementById('graph-cat');
  const graphInfo = document.getElementById('graph-info');
  const graphView = document.getElementById('graph-view');
  let graphNodes = [];
  let graphLinks = [];
  let simRaf = null;
  let simIter = 0;

  document.getElementById('graph-relayout').addEventListener('click', () => {
    for (const n of graphNodes) {
      if (!n.fixed) {
        n.x = 450 + (Math.random() - 0.5) * 300;
        n.y = 300 + (Math.random() - 0.5) * 200;
        n.vx = 0; n.vy = 0;
      }
    }
    simIter = 0;
    runSim();
  });

  document.getElementById('graph-reset-positions').addEventListener('click', () => {
    if (!confirm('保存された位置情報を削除して再配置します。よろしいですか？')) return;
    state.positions = {};
    save(POSITIONS_KEY, state.positions);
    renderGraph();
  });

  [graphFilter, graphCat, graphView].forEach(el => el.addEventListener('change', renderGraph));

  function renderGraph() {
    // Populate categories
    const cats = Array.from(new Set(state.seeds.map(s => s.category))).sort();
    const currentCat = graphCat.value;
    graphCat.innerHTML = '<option value="">全カテゴリ</option>' +
      cats.map(c => `<option value="${escapeAttr(c)}" ${c === currentCat ? 'selected' : ''}>${escapeHtml(c)}</option>`).join('');

    const filter = graphFilter.value;
    const catSel = graphCat.value;
    const view = graphView.value;

    let seeds = state.seeds.slice();
    if (catSel) seeds = seeds.filter(s => s.category === catSel);
    if (filter === 'high') seeds = seeds.filter(s => s.intensity >= 7);

    if (view === 'matrix') {
      if (simRaf) { cancelAnimationFrame(simRaf); simRaf = null; }
      renderMatrix(seeds);
      return;
    }

    const seedIds = new Set(seeds.map(s => s.id));
    let reasons = state.reasons.slice();
    // Only keep reasons that anchor on visible seeds (or are parents reachable from them)
    if (filter === 'reasons') {
      // show all reasons, drop seeds entirely
      seeds = [];
    } else {
      const kept = new Set();
      for (const r of reasons) {
        if ((r.anchors || []).some(a => seedIds.has(a.seedId))) kept.add(r.id);
      }
      // include ancestor reasons transitively
      let changed = true;
      while (changed) {
        changed = false;
        for (const r of reasons) {
          if (kept.has(r.id)) {
            for (const p of (r.parentIds || [])) {
              if (!kept.has(p)) { kept.add(p); changed = true; }
            }
          }
        }
      }
      reasons = reasons.filter(r => kept.has(r.id));
    }

    // Build nodes
    const nodes = [];
    const pos = state.positions;
    for (const s of seeds) {
      const p = pos['s_' + s.id];
      nodes.push({
        id: 's_' + s.id,
        type: 'seed',
        ref: s.id,
        label: s.title,
        color: categoryColor(s.category),
        r: 10 + (Number(s.intensity) || 5) * 1.2,
        x: p ? p.x : 450 + (Math.random() - 0.5) * 300,
        y: p ? p.y : 300 + (Math.random() - 0.5) * 200,
        vx: 0, vy: 0, fixed: !!p,
      });
    }
    for (const r of reasons) {
      const p = pos['r_' + r.id];
      nodes.push({
        id: 'n_' + r.id,
        type: 'reason',
        ref: r.id,
        label: r.text,
        color: '#fef3c7',
        w: Math.max(90, Math.min(220, r.text.length * 8)),
        h: 30,
        x: p ? p.x : 450 + (Math.random() - 0.5) * 300,
        y: p ? p.y : 300 + (Math.random() - 0.5) * 200,
        vx: 0, vy: 0, fixed: !!p,
      });
    }

    const nodeById = {};
    for (const n of nodes) nodeById[n.id] = n;

    // Build links
    const links = [];
    for (const r of reasons) {
      for (const a of (r.anchors || [])) {
        const src = nodeById['s_' + a.seedId];
        const dst = nodeById['n_' + r.id];
        if (src && dst) links.push({ source: src, target: dst, kind: 'seed-reason', axisKey: a.axisKey || '' });
      }
      for (const pid of (r.parentIds || [])) {
        const src = nodeById['n_' + r.id];
        const dst = nodeById['n_' + pid];
        if (src && dst) links.push({ source: src, target: dst, kind: 'reason-parent' });
      }
    }

    graphNodes = nodes;
    graphLinks = links;
    graphInfo.textContent = `ノード ${nodes.length} / エッジ ${links.length}`;

    simIter = 0;
    runSim();
  }

  function renderMatrix(seeds) {
    const W = 900, H = 600;
    const cols = ['本人', '他者', '環境', '複合'];
    const rows = ['可', '部分的', '不可'];
    const padL = 110, padT = 80, padR = 20, padB = 40;
    const cellW = (W - padL - padR) / cols.length;
    const cellH = (H - padT - padB) / rows.length;

    // quadrant hints (意味合いの補助メモ)
    const hints = {
      '本人_可':   { text: '動ける領域',        color: '#d1fae5' },
      '本人_部分的': { text: '半分は自分次第',    color: '#ecfccb' },
      '本人_不可': { text: '受け入れ／ケア',    color: '#fef3c7' },
      '他者_可':   { text: '働きかけ・対話',    color: '#dbeafe' },
      '他者_部分的': { text: '距離の調整',       color: '#e0e7ff' },
      '他者_不可': { text: '距離を取る／諦め', color: '#fee2e2' },
      '環境_可':   { text: '環境を変える',      color: '#cffafe' },
      '環境_部分的': { text: '条件の工夫',       color: '#ede9fe' },
      '環境_不可': { text: '時代・運の領域',    color: '#fecaca' },
      '複合_可':   { text: '要因の切り分け',    color: '#f0abfc' },
      '複合_部分的': { text: '整理から入る',     color: '#fde68a' },
      '複合_不可': { text: '保留・観察',        color: '#f3e8ff' },
    };

    // Bucket seeds into cells; collect uncategorized
    const buckets = {};
    const uncategorized = [];
    for (const s of seeds) {
      const a = s.attribution, c = s.controllability;
      if (!a || !c || !cols.includes(a) || !rows.includes(c)) {
        uncategorized.push(s);
        continue;
      }
      const key = a + '_' + c;
      (buckets[key] = buckets[key] || []).push(s);
    }

    const parts = [];
    // Background cells
    for (let ri = 0; ri < rows.length; ri++) {
      for (let ci = 0; ci < cols.length; ci++) {
        const x = padL + ci * cellW;
        const y = padT + ri * cellH;
        const key = cols[ci] + '_' + rows[ri];
        const h = hints[key] || { text: '', color: '#f9fafb' };
        parts.push(`<rect x="${x}" y="${y}" width="${cellW}" height="${cellH}" fill="${h.color}" opacity="0.5" stroke="#e5e7eb" stroke-width="1"/>`);
        parts.push(`<text x="${x + 8}" y="${y + 16}" font-size="10" fill="#6b7280">${escapeHtml(h.text)}</text>`);
      }
    }
    // Column labels (帰属)
    for (let ci = 0; ci < cols.length; ci++) {
      const x = padL + ci * cellW + cellW / 2;
      parts.push(`<text x="${x}" y="${padT - 32}" text-anchor="middle" font-size="13" font-weight="600" fill="#1f2430">${escapeHtml(cols[ci])}</text>`);
    }
    parts.push(`<text x="${padL + (W - padL - padR) / 2}" y="${padT - 54}" text-anchor="middle" font-size="11" fill="#6b7280">帰属（誰の問題か） →</text>`);

    // Row labels (コントロール)
    for (let ri = 0; ri < rows.length; ri++) {
      const y = padT + ri * cellH + cellH / 2;
      parts.push(`<text x="${padL - 12}" y="${y + 4}" text-anchor="end" font-size="13" font-weight="600" fill="#1f2430">${escapeHtml(rows[ri])}</text>`);
    }
    parts.push(`<text x="20" y="${padT + (H - padT - padB) / 2}" text-anchor="middle" font-size="11" fill="#6b7280" transform="rotate(-90 20 ${padT + (H - padT - padB) / 2})">↑ コントロール可能性</text>`);

    // Place seeds within each cell (grid packing)
    const nodes = [];
    for (let ri = 0; ri < rows.length; ri++) {
      for (let ci = 0; ci < cols.length; ci++) {
        const key = cols[ci] + '_' + rows[ri];
        const list = buckets[key] || [];
        if (!list.length) continue;
        const x0 = padL + ci * cellW;
        const y0 = padT + ri * cellH + 20;
        const perRow = Math.max(2, Math.ceil(Math.sqrt(list.length * (cellW / (cellH - 20)))));
        list.forEach((s, idx) => {
          const row = Math.floor(idx / perRow);
          const col = idx % perRow;
          const x = x0 + (cellW / (perRow + 1)) * (col + 1);
          const y = y0 + 18 + row * 36;
          const r = 8 + (Number(s.intensity) || 5) * 0.9;
          nodes.push({ id: 's_' + s.id, ref: s.id, type: 'seed', x, y, r, color: categoryColor(s.category), label: s.title });
        });
      }
    }

    // Uncategorized footer
    if (uncategorized.length) {
      const y = H - padB + 6;
      parts.push(`<text x="${padL}" y="${y}" font-size="11" fill="#6b7280">未分類（帰属/コントロール未設定）: ${uncategorized.length}件</text>`);
    }

    // Render seed dots
    for (const n of nodes) {
      const sel = state.selectedNodeId === n.id ? ' selected' : '';
      parts.push(`<g class="node node-seed${sel}" data-id="${n.id}" transform="translate(${n.x},${n.y})">
        <circle r="${n.r}" fill="${n.color}" stroke="#fff" stroke-width="2"></circle>
        <text y="${n.r + 12}" text-anchor="middle" class="node-label">${escapeHtml(truncate(n.label, 12))}</text>
      </g>`);
    }

    graphNodes = nodes;
    graphLinks = [];
    graphInfo.textContent = `2×2マトリクス: 配置 ${nodes.length}件 / 未分類 ${uncategorized.length}件`;
    graphSvg.innerHTML = parts.join('');
    // Only click selection (no drag in matrix)
    graphSvg.querySelectorAll('.node').forEach(g => {
      g.addEventListener('click', () => selectNode(g.dataset.id));
    });
  }

  function runSim() {
    if (simRaf) cancelAnimationFrame(simRaf);
    const step = () => {
      tickSim();
      drawGraph();
      simIter++;
      if (simIter < 300) simRaf = requestAnimationFrame(step);
      else simRaf = null;
    };
    step();
  }

  function tickSim() {
    const nodes = graphNodes;
    const links = graphLinks;
    const W = 900, H = 600, cx = W / 2, cy = H / 2;
    const repulse = 1400;
    const centerPull = 0.004;
    const springK = 0.04;
    const damping = 0.85;

    // Repulsion
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        let dx = a.x - b.x, dy = a.y - b.y;
        const d2 = dx * dx + dy * dy + 0.01;
        const d = Math.sqrt(d2);
        const force = repulse / d2;
        const fx = (dx / d) * force;
        const fy = (dy / d) * force;
        a.vx += fx; a.vy += fy;
        b.vx -= fx; b.vy -= fy;
      }
    }
    // Attraction along edges
    for (const link of links) {
      const a = link.source, b = link.target;
      const ideal = link.kind === 'reason-parent' ? 110 : 90;
      let dx = b.x - a.x, dy = b.y - a.y;
      const d = Math.sqrt(dx * dx + dy * dy) + 0.01;
      const f = (d - ideal) * springK;
      const fx = (dx / d) * f;
      const fy = (dy / d) * f;
      a.vx += fx; a.vy += fy;
      b.vx -= fx; b.vy -= fy;
    }
    // Center gravity
    for (const n of nodes) {
      n.vx += (cx - n.x) * centerPull;
      n.vy += (cy - n.y) * centerPull;
    }
    // Integrate
    for (const n of nodes) {
      if (n.fixed) { n.vx = 0; n.vy = 0; continue; }
      n.vx *= damping; n.vy *= damping;
      n.x += n.vx; n.y += n.vy;
      if (n.x < 20) n.x = 20; if (n.x > W - 20) n.x = W - 20;
      if (n.y < 20) n.y = 20; if (n.y > H - 20) n.y = H - 20;
    }
  }

  function drawGraph() {
    const parts = [];
    parts.push('<defs><marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#9ca3af"/></marker></defs>');
    for (const l of graphLinks) {
      const a = l.source, b = l.target;
      const isDashed = l.kind === 'reason-parent';
      parts.push(`<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" class="edge ${isDashed ? 'edge-parent' : 'edge-anchor'}" ${isDashed ? 'stroke-dasharray="4 3" marker-end="url(#arrow)"' : ''}/>`);
    }
    for (const n of graphNodes) {
      const sel = state.selectedNodeId === n.id ? ' selected' : '';
      if (n.type === 'seed') {
        parts.push(`<g class="node node-seed${sel}" data-id="${n.id}" transform="translate(${n.x},${n.y})">
          <circle r="${n.r}" fill="${n.color}" stroke="#fff" stroke-width="2"></circle>
          <text y="${n.r + 14}" text-anchor="middle" class="node-label">${escapeHtml(truncate(n.label, 18))}</text>
        </g>`);
      } else {
        const hw = n.w / 2, hh = n.h / 2;
        parts.push(`<g class="node node-reason${sel}" data-id="${n.id}" transform="translate(${n.x},${n.y})">
          <rect x="${-hw}" y="${-hh}" width="${n.w}" height="${n.h}" rx="6" ry="6" fill="${n.color}" stroke="#f59e0b" stroke-width="1.5"></rect>
          <text text-anchor="middle" dy="5" class="node-label reason-label">${escapeHtml(truncate(n.label, Math.floor(n.w / 8)))}</text>
        </g>`);
      }
    }
    graphSvg.innerHTML = parts.join('');
    attachGraphInteractions();
  }

  function attachGraphInteractions() {
    graphSvg.querySelectorAll('.node').forEach(g => {
      g.addEventListener('pointerdown', e => startDrag(e, g));
      g.addEventListener('click', e => { if (!g._moved) selectNode(g.dataset.id); });
    });
  }

  function startDrag(e, g) {
    e.preventDefault();
    const id = g.dataset.id;
    const node = graphNodes.find(n => n.id === id);
    if (!node) return;
    const pt = svgPoint(e);
    const offset = { x: pt.x - node.x, y: pt.y - node.y };
    node.fixed = true;
    g._moved = false;
    const move = ev => {
      const p = svgPoint(ev);
      node.x = p.x - offset.x;
      node.y = p.y - offset.y;
      node.vx = 0; node.vy = 0;
      g._moved = true;
      drawGraph();
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      state.positions[node.id] = { x: node.x, y: node.y };
      save(POSITIONS_KEY, state.positions);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  }

  function svgPoint(evt) {
    const rect = graphSvg.getBoundingClientRect();
    const vb = graphSvg.viewBox.baseVal;
    return {
      x: ((evt.clientX - rect.left) / rect.width) * vb.width,
      y: ((evt.clientY - rect.top) / rect.height) * vb.height,
    };
  }

  function selectNode(id) {
    state.selectedNodeId = id;
    const node = graphNodes.find(n => n.id === id);
    if (!node) return;
    drawGraph();
    if (node.type === 'seed') {
      const s = state.seeds.find(x => x.id === node.ref);
      if (!s) return;
      const axisBits = BUILTIN_AXES
        .filter(a => s[a.key])
        .map(a => `<span class="axis-chip" data-axis="${a.key}">${a.label}: ${escapeHtml(s[a.key])}</span>`)
        .join('');
      const attachedReasons = state.reasons.filter(r => (r.anchors || []).some(a => a.seedId === s.id));
      const rlist = attachedReasons.length
        ? '<ul class="panel-reasons">' + attachedReasons.map(r => {
            const ak = (r.anchors.find(a => a.seedId === s.id) || {}).axisKey || '';
            const axisLabel = ak ? axisLabelFor(ak) : '全体';
            return `<li><span class="muted">[${escapeHtml(axisLabel)}]</span> ${escapeHtml(r.text)}</li>`;
          }).join('') + '</ul>'
        : '<p class="muted">この悩みに紐づく理由はまだありません。</p>';
      graphPanel.innerHTML = `
        <h3 style="margin-top:0">${escapeHtml(s.title)}</h3>
        <p class="muted">${escapeHtml(s.category)} · 強さ ${s.intensity} · ${formatDate(s.createdAt)}</p>
        <div>${axisBits || '<span class="muted">構造軸は未設定</span>'}</div>
        <p style="white-space:pre-wrap;margin-top:8px">${escapeHtml(s.description || '')}</p>
        ${s.insight ? `<div class="seed-insight">💡 ${escapeHtml(s.insight)}</div>` : ''}
        <h4>紐づく理由</h4>
        ${rlist}
        <div class="actions"><button data-act="edit-seed" data-id="${s.id}">この悩みを編集</button></div>`;
      graphPanel.querySelector('[data-act="edit-seed"]')?.addEventListener('click', () => {
        editSeed(s.id);
      });
    } else {
      const r = state.reasons.find(x => x.id === node.ref);
      if (!r) return;
      const parents = (r.parentIds || []).map(pid => state.reasons.find(x => x.id === pid)).filter(Boolean);
      const children = state.reasons.filter(x => (x.parentIds || []).includes(r.id));
      const anchoredSeeds = (r.anchors || []).map(a => {
        const s = state.seeds.find(x => x.id === a.seedId);
        if (!s) return null;
        const axisLabel = a.axisKey ? axisLabelFor(a.axisKey) : '全体';
        return `<li><b>[${escapeHtml(axisLabel)}]</b> ${escapeHtml(s.title)}</li>`;
      }).filter(Boolean).join('');
      graphPanel.innerHTML = `
        <h3 style="margin-top:0">理由</h3>
        <textarea id="panel-reason-text" rows="3">${escapeHtml(r.text)}</textarea>
        <h4>紐づいている悩み</h4>
        <ul class="panel-reasons">${anchoredSeeds || '<li class="muted">なし</li>'}</ul>
        <h4>より深い理由（この理由の根底）</h4>
        <ul class="panel-reasons">${parents.map(p => `<li>${escapeHtml(p.text)} <button class="mini" data-unlink="${p.id}">解除</button></li>`).join('') || '<li class="muted">なし</li>'}</ul>
        <label>深い理由を追加
          <select id="panel-add-parent">
            <option value="">—</option>
            ${state.reasons.filter(x => x.id !== r.id && !r.parentIds.includes(x.id)).map(x => `<option value="${x.id}">${escapeHtml(truncate(x.text, 40))}</option>`).join('')}
          </select>
        </label>
        <h4>この理由から派生している理由</h4>
        <ul class="panel-reasons">${children.map(c => `<li>${escapeHtml(c.text)}</li>`).join('') || '<li class="muted">なし</li>'}</ul>
        <div class="actions">
          <button id="panel-save-reason" class="primary">保存</button>
          <button id="panel-delete-reason" class="danger">削除</button>
        </div>`;
      graphPanel.querySelector('#panel-save-reason').addEventListener('click', () => {
        r.text = graphPanel.querySelector('#panel-reason-text').value.trim();
        save(REASONS_KEY, state.reasons);
        flash('保存しました');
        renderGraph();
      });
      graphPanel.querySelector('#panel-delete-reason').addEventListener('click', () => {
        if (!confirm('この理由を削除しますか？（紐づけていた悩みからも外れます）')) return;
        state.reasons = state.reasons.filter(x => x.id !== r.id);
        for (const x of state.reasons) x.parentIds = (x.parentIds || []).filter(pid => pid !== r.id);
        save(REASONS_KEY, state.reasons);
        state.selectedNodeId = null;
        graphPanel.innerHTML = '<p class="muted">削除しました。</p>';
        renderGraph();
      });
      graphPanel.querySelector('#panel-add-parent').addEventListener('change', e => {
        const pid = e.target.value;
        if (!pid) return;
        if (wouldCreateCycle(r.id, pid)) { alert('循環参照になるため追加できません。'); return; }
        r.parentIds = (r.parentIds || []).concat(pid);
        save(REASONS_KEY, state.reasons);
        renderGraph();
        selectNode(node.id);
      });
      graphPanel.querySelectorAll('[data-unlink]').forEach(b => {
        b.addEventListener('click', () => {
          r.parentIds = (r.parentIds || []).filter(pid => pid !== b.dataset.unlink);
          save(REASONS_KEY, state.reasons);
          renderGraph();
          selectNode(node.id);
        });
      });
    }
  }

  function wouldCreateCycle(reasonId, candidateParentId) {
    // adding candidateParent as parent of reasonId would create cycle if reasonId is already ancestor of candidate
    const visited = new Set();
    const walk = (id) => {
      if (id === reasonId) return true;
      if (visited.has(id)) return false;
      visited.add(id);
      const node = state.reasons.find(x => x.id === id);
      if (!node) return false;
      return (node.parentIds || []).some(walk);
    };
    return walk(candidateParentId);
  }

  function axisLabelFor(key) {
    if (key === 'intensity') return '強さ';
    const b = BUILTIN_AXES.find(a => a.key === key);
    if (b) return b.label;
    if (key.startsWith('custom_')) {
      const ax = state.customAxes.find(a => 'custom_' + a.id === key);
      if (ax) return ax.name;
    }
    return key;
  }

  // ---------- Sessions ----------
  document.getElementById('new-session-btn').addEventListener('click', () => {
    const s = {
      id: 'ss_' + uid(),
      title: '新しいセッション',
      date: new Date().toISOString().slice(0, 10),
      participants: [],
      sections: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    state.sessions.unshift(s);
    save(SESSIONS_KEY, state.sessions);
    state.selectedSessionId = s.id;
    renderSessions();
  });

  function renderSessions() {
    const list = document.getElementById('sessions-list');
    if (!list) return;
    if (!state.sessions.length) {
      list.innerHTML = '<li class="muted">まだセッションはありません。</li>';
      renderSessionDetail(null);
      return;
    }
    list.innerHTML = state.sessions.map(s => `
      <li data-id="${s.id}" class="${state.selectedSessionId === s.id ? 'active' : ''}">
        <div class="s-title">${escapeHtml(s.title)}</div>
        <div class="s-meta muted">${escapeHtml(s.date || '')} · ${s.sections.length}セクション</div>
      </li>
    `).join('');
    list.querySelectorAll('li[data-id]').forEach(li => {
      li.addEventListener('click', () => {
        state.selectedSessionId = li.dataset.id;
        renderSessions();
      });
    });
    const sel = state.sessions.find(s => s.id === state.selectedSessionId) || state.sessions[0];
    state.selectedSessionId = sel.id;
    renderSessionDetail(sel);
  }

  function renderSessionDetail(s) {
    const el = document.getElementById('session-detail');
    if (!s) { el.innerHTML = '<p class="muted">左のリストからセッションを選択してください。</p>'; return; }
    el.innerHTML = `
      <div class="session-head">
        <input class="s-title-input" value="${escapeAttr(s.title)}" placeholder="タイトル" />
        <input class="s-date-input" type="date" value="${escapeAttr(s.date || '')}" />
        <button class="danger s-delete">削除</button>
      </div>
      <label class="s-participants">
        参加者（カンマ区切り）
        <input type="text" value="${escapeAttr((s.participants || []).join(', '))}" placeholder="例: 私, パートナー" />
      </label>
      <div id="session-sections"></div>
      <div class="actions"><button class="add-section">＋ セクションを追加</button></div>
    `;
    el.querySelector('.s-title-input').addEventListener('change', e => {
      s.title = e.target.value.trim() || '(無題)';
      s.updatedAt = new Date().toISOString();
      save(SESSIONS_KEY, state.sessions);
      renderSessions();
    });
    el.querySelector('.s-date-input').addEventListener('change', e => {
      s.date = e.target.value;
      save(SESSIONS_KEY, state.sessions);
      renderSessions();
    });
    el.querySelector('.s-participants input').addEventListener('change', e => {
      s.participants = e.target.value.split(',').map(x => x.trim()).filter(Boolean);
      save(SESSIONS_KEY, state.sessions);
    });
    el.querySelector('.s-delete').addEventListener('click', () => {
      if (!confirm('このセッションを削除しますか？')) return;
      state.sessions = state.sessions.filter(x => x.id !== s.id);
      state.selectedSessionId = null;
      save(SESSIONS_KEY, state.sessions);
      renderSessions();
    });
    el.querySelector('.add-section').addEventListener('click', () => {
      s.sections.push({ id: 'sec_' + uid(), heading: '新しいセクション', body: '', seedIds: [], reasonIds: [] });
      save(SESSIONS_KEY, state.sessions);
      renderSessionDetail(s);
    });
    renderSessionSections(s);
  }

  function renderSessionSections(s) {
    const wrap = document.getElementById('session-sections');
    if (!wrap) return;
    if (!s.sections.length) {
      wrap.innerHTML = '<p class="muted">セクションを追加してメモを書きましょう。</p>';
      return;
    }
    wrap.innerHTML = s.sections.map((sec, idx) => {
      const seedOpts = state.seeds.map(x =>
        `<option value="${x.id}" ${(sec.seedIds || []).includes(x.id) ? 'selected' : ''}>${escapeHtml(truncate(x.title, 40))}</option>`
      ).join('');
      const reasonOpts = state.reasons.map(r =>
        `<option value="${r.id}" ${(sec.reasonIds || []).includes(r.id) ? 'selected' : ''}>${escapeHtml(truncate(r.text, 40))}</option>`
      ).join('');
      const linkedSeeds = (sec.seedIds || [])
        .map(id => state.seeds.find(x => x.id === id))
        .filter(Boolean)
        .map(x => `<span class="link-chip seed">📌 ${escapeHtml(truncate(x.title, 24))}</span>`).join('');
      const linkedReasons = (sec.reasonIds || [])
        .map(id => state.reasons.find(x => x.id === id))
        .filter(Boolean)
        .map(r => `<span class="link-chip reason">💡 ${escapeHtml(truncate(r.text, 24))}</span>`).join('');
      return `<article class="section-card" data-idx="${idx}">
        <div class="section-head">
          <input class="sec-heading" value="${escapeAttr(sec.heading)}" />
          <div class="section-actions">
            <button class="sec-up" ${idx === 0 ? 'disabled' : ''}>↑</button>
            <button class="sec-down" ${idx === s.sections.length - 1 ? 'disabled' : ''}>↓</button>
            <button class="sec-del danger">削除</button>
          </div>
        </div>
        <textarea class="sec-body" rows="6" placeholder="本文">${escapeHtml(sec.body || '')}</textarea>
        <details class="section-links">
          <summary>紐付け（${(sec.seedIds || []).length + (sec.reasonIds || []).length}）</summary>
          <label>悩みの種を紐付け<select class="sec-seeds" multiple size="4">${seedOpts}</select></label>
          <label>理由を紐付け<select class="sec-reasons" multiple size="4">${reasonOpts}</select></label>
        </details>
        <div class="link-chips">${linkedSeeds}${linkedReasons}</div>
      </article>`;
    }).join('');

    const sections = wrap.querySelectorAll('.section-card');
    sections.forEach(card => {
      const idx = Number(card.dataset.idx);
      const sec = s.sections[idx];
      card.querySelector('.sec-heading').addEventListener('change', e => {
        sec.heading = e.target.value;
        save(SESSIONS_KEY, state.sessions);
      });
      card.querySelector('.sec-body').addEventListener('change', e => {
        sec.body = e.target.value;
        save(SESSIONS_KEY, state.sessions);
      });
      card.querySelector('.sec-seeds').addEventListener('change', e => {
        sec.seedIds = Array.from(e.target.selectedOptions).map(o => o.value);
        save(SESSIONS_KEY, state.sessions);
        renderSessionSections(s);
      });
      card.querySelector('.sec-reasons').addEventListener('change', e => {
        sec.reasonIds = Array.from(e.target.selectedOptions).map(o => o.value);
        save(SESSIONS_KEY, state.sessions);
        renderSessionSections(s);
      });
      card.querySelector('.sec-up').addEventListener('click', () => {
        if (idx === 0) return;
        [s.sections[idx - 1], s.sections[idx]] = [s.sections[idx], s.sections[idx - 1]];
        save(SESSIONS_KEY, state.sessions);
        renderSessionSections(s);
      });
      card.querySelector('.sec-down').addEventListener('click', () => {
        if (idx === s.sections.length - 1) return;
        [s.sections[idx + 1], s.sections[idx]] = [s.sections[idx], s.sections[idx + 1]];
        save(SESSIONS_KEY, state.sessions);
        renderSessionSections(s);
      });
      card.querySelector('.sec-del').addEventListener('click', () => {
        if (!confirm('このセクションを削除しますか？')) return;
        s.sections.splice(idx, 1);
        save(SESSIONS_KEY, state.sessions);
        renderSessionSections(s);
      });
    });
  }

  // ---------- Actions ----------
  const actionForm = document.getElementById('action-form');
  const actionsList = document.getElementById('actions-list');

  document.querySelectorAll('.path-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.path-tab').forEach(b => b.classList.toggle('active', b === btn));
      state.actionPathFilter = btn.dataset.path;
      renderActionsList();
    });
  });

  actionForm.addEventListener('submit', e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(actionForm));
    const seedIds = Array.from(actionForm.elements.seedIds.selectedOptions).map(o => o.value);
    const a = {
      id: state.editingActionId || 'a_' + uid(),
      path: data.path,
      date: data.date || new Date().toISOString().slice(0, 10),
      description: data.description.trim(),
      notes: (data.notes || '').trim(),
      effectRating: Number(data.effectRating) || 3,
      status: data.status || 'trying',
      seedIds,
      createdAt: state.editingActionId
        ? state.actions.find(x => x.id === state.editingActionId)?.createdAt || new Date().toISOString()
        : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    if (!a.description) return;
    if (state.editingActionId) {
      state.actions = state.actions.map(x => x.id === state.editingActionId ? a : x);
      state.editingActionId = null;
    } else {
      state.actions.unshift(a);
    }
    save(ACTIONS_KEY, state.actions);
    actionForm.reset();
    actionForm.elements.effectRating.value = 3;
    renderActionsList();
    flash('保存しました');
  });

  function renderActions() {
    const seedSel = document.getElementById('action-seed-select');
    seedSel.innerHTML = state.seeds.map(s =>
      `<option value="${s.id}">${escapeHtml(truncate(s.title, 40))}</option>`
    ).join('');
    renderActionsList();
  }

  function renderActionsList() {
    let items = state.actions.slice();
    if (state.actionPathFilter !== 'all') items = items.filter(a => a.path === state.actionPathFilter);
    items.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
    if (!items.length) {
      actionsList.innerHTML = '<li class="muted">まだログはありません。</li>';
      return;
    }
    actionsList.innerHTML = items.map(a => {
      const linkedTitles = (a.seedIds || [])
        .map(id => state.seeds.find(s => s.id === id))
        .filter(Boolean)
        .map(s => `<span class="link-chip seed">📌 ${escapeHtml(truncate(s.title, 20))}</span>`).join('');
      const stars = '★'.repeat(a.effectRating) + '☆'.repeat(5 - a.effectRating);
      const statusLabel = { trying: '試行中', continue: '続ける', stop: 'やめる' }[a.status] || a.status;
      return `<li class="action-item" data-id="${a.id}">
        <div class="action-head">
          <span class="path-badge path-${a.path}">${escapeHtml(a.path)}経路</span>
          <span class="muted">${escapeHtml(a.date || '')}</span>
          <span class="action-rating" title="効果">${stars}</span>
          <span class="status-badge status-${a.status}">${escapeHtml(statusLabel)}</span>
        </div>
        <div class="action-desc">${escapeHtml(a.description)}</div>
        ${a.notes ? `<div class="action-notes">${escapeHtml(a.notes)}</div>` : ''}
        ${linkedTitles ? `<div class="link-chips">${linkedTitles}</div>` : ''}
        <div class="action-buttons">
          <button class="act-edit" data-id="${a.id}">編集</button>
          <button class="act-del danger" data-id="${a.id}">削除</button>
        </div>
      </li>`;
    }).join('');

    actionsList.querySelectorAll('.act-edit').forEach(b => {
      b.addEventListener('click', () => editAction(b.dataset.id));
    });
    actionsList.querySelectorAll('.act-del').forEach(b => {
      b.addEventListener('click', () => deleteAction(b.dataset.id));
    });
  }

  function editAction(id) {
    const a = state.actions.find(x => x.id === id);
    if (!a) return;
    state.editingActionId = id;
    actionForm.elements.path.value = a.path;
    actionForm.elements.date.value = a.date || '';
    actionForm.elements.description.value = a.description;
    actionForm.elements.notes.value = a.notes || '';
    actionForm.elements.effectRating.value = a.effectRating || 3;
    actionForm.elements.status.value = a.status || 'trying';
    const seedSel = actionForm.elements.seedIds;
    Array.from(seedSel.options).forEach(o => { o.selected = (a.seedIds || []).includes(o.value); });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function deleteAction(id) {
    if (!confirm('このアクションを削除しますか？')) return;
    state.actions = state.actions.filter(x => x.id !== id);
    save(ACTIONS_KEY, state.actions);
    renderActionsList();
  }

  // ---------- Works ----------
  document.querySelectorAll('.work-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.work-tab').forEach(b => b.classList.toggle('active', b === btn));
      state.workStatusFilter = btn.dataset.status;
      renderWorksList();
    });
  });

  document.getElementById('new-work-btn').addEventListener('click', () => {
    const w = {
      id: 'w_' + uid(),
      title: '新しいワーク',
      question: '',
      exploration: '',
      status: 'open',
      priority: 3,
      seedIds: [],
      reasonIds: [],
      subWorks: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    state.works.unshift(w);
    save(WORKS_KEY, state.works);
    state.selectedWorkId = w.id;
    renderWorks();
  });

  function renderWorks() {
    renderWorksList();
    const w = state.works.find(x => x.id === state.selectedWorkId);
    renderWorkDetail(w || null);
  }

  function renderWorksList() {
    const list = document.getElementById('works-list');
    if (!list) return;
    let items = state.works.slice();
    if (state.workStatusFilter !== 'all') items = items.filter(w => w.status === state.workStatusFilter);
    items.sort((a, b) => (b.priority || 0) - (a.priority || 0) || (b.createdAt || '').localeCompare(a.createdAt || ''));
    if (!items.length) {
      list.innerHTML = '<li class="muted">ワークはありません。「＋ 新しいワーク」から追加できます。</li>';
      return;
    }
    list.innerHTML = items.map(w => {
      const statusLabel = { open: '未着手', in_progress: '進行中', done: '完了' }[w.status] || w.status;
      const doneCount = (w.subWorks || []).filter(s => s.done).length;
      const total = (w.subWorks || []).length;
      return `<li class="work-item ${state.selectedWorkId === w.id ? 'active' : ''}" data-id="${w.id}">
        <div class="work-head">
          <span class="status-badge status-work-${w.status}">${escapeHtml(statusLabel)}</span>
          <span class="priority">優先度 ${w.priority}</span>
          <span class="work-title">${escapeHtml(w.title)}</span>
        </div>
        ${w.question ? `<div class="work-question">${escapeHtml(truncate(w.question, 80))}</div>` : ''}
        ${total > 0 ? `<div class="work-progress">サブタスク ${doneCount}/${total}</div>` : ''}
      </li>`;
    }).join('');
    list.querySelectorAll('.work-item').forEach(li => {
      li.addEventListener('click', () => {
        state.selectedWorkId = li.dataset.id;
        renderWorks();
      });
    });
  }

  function renderWorkDetail(w) {
    const el = document.getElementById('work-detail');
    if (!w) { el.classList.add('hidden'); el.innerHTML = ''; return; }
    el.classList.remove('hidden');
    const seedOpts = state.seeds.map(x =>
      `<option value="${x.id}" ${(w.seedIds || []).includes(x.id) ? 'selected' : ''}>${escapeHtml(truncate(x.title, 40))}</option>`
    ).join('');
    const reasonOpts = state.reasons.map(r =>
      `<option value="${r.id}" ${(w.reasonIds || []).includes(r.id) ? 'selected' : ''}>${escapeHtml(truncate(r.text, 40))}</option>`
    ).join('');
    el.innerHTML = `
      <div class="work-detail-head">
        <input class="w-title-input" value="${escapeAttr(w.title)}" />
        <button class="danger w-delete">削除</button>
      </div>
      <div class="row">
        <label>
          状態
          <select class="w-status">
            <option value="open" ${w.status === 'open' ? 'selected' : ''}>未着手</option>
            <option value="in_progress" ${w.status === 'in_progress' ? 'selected' : ''}>進行中</option>
            <option value="done" ${w.status === 'done' ? 'selected' : ''}>完了</option>
          </select>
        </label>
        <label>
          優先度（1〜5）
          <input class="w-priority" type="number" min="1" max="5" value="${w.priority || 3}" />
        </label>
      </div>
      <label>
        中心となる問い
        <textarea class="w-question" rows="2" placeholder="例: 彼を手段化しないための区別は何か">${escapeHtml(w.question || '')}</textarea>
      </label>
      <label>
        探求ノート（自由に書き出す）
        <textarea class="w-exploration" rows="6" placeholder="この問いへの現在の考え、出てきたアイデア、保留中の疑問など">${escapeHtml(w.exploration || '')}</textarea>
      </label>

      <h4>サブタスク</h4>
      <ul class="subworks-list">
        ${(w.subWorks || []).map((sw, i) => `
          <li>
            <label>
              <input type="checkbox" class="sw-done" data-i="${i}" ${sw.done ? 'checked' : ''} />
              <input type="text" class="sw-text" data-i="${i}" value="${escapeAttr(sw.text)}" />
              <button class="sw-del" data-i="${i}">削除</button>
            </label>
          </li>
        `).join('')}
      </ul>
      <div class="actions"><button class="w-add-sub">＋ サブタスク追加</button></div>

      <h4>紐付け</h4>
      <details>
        <summary>悩みの種 (${(w.seedIds || []).length}) / 理由 (${(w.reasonIds || []).length})</summary>
        <label>悩みの種<select class="w-seeds" multiple size="4">${seedOpts}</select></label>
        <label>理由<select class="w-reasons" multiple size="4">${reasonOpts}</select></label>
      </details>
    `;

    const save_ = () => { w.updatedAt = new Date().toISOString(); save(WORKS_KEY, state.works); renderWorksList(); };

    el.querySelector('.w-title-input').addEventListener('change', e => { w.title = e.target.value.trim() || '(無題)'; save_(); });
    el.querySelector('.w-delete').addEventListener('click', () => {
      if (!confirm('このワークを削除しますか？')) return;
      state.works = state.works.filter(x => x.id !== w.id);
      state.selectedWorkId = null;
      save(WORKS_KEY, state.works);
      renderWorks();
    });
    el.querySelector('.w-status').addEventListener('change', e => { w.status = e.target.value; save_(); });
    el.querySelector('.w-priority').addEventListener('change', e => { w.priority = Number(e.target.value) || 3; save_(); });
    el.querySelector('.w-question').addEventListener('change', e => { w.question = e.target.value; save_(); });
    el.querySelector('.w-exploration').addEventListener('change', e => { w.exploration = e.target.value; save_(); });
    el.querySelector('.w-seeds').addEventListener('change', e => {
      w.seedIds = Array.from(e.target.selectedOptions).map(o => o.value);
      save_();
    });
    el.querySelector('.w-reasons').addEventListener('change', e => {
      w.reasonIds = Array.from(e.target.selectedOptions).map(o => o.value);
      save_();
    });
    el.querySelectorAll('.sw-done').forEach(c => c.addEventListener('change', () => {
      w.subWorks[+c.dataset.i].done = c.checked; save_(); renderWorkDetail(w);
    }));
    el.querySelectorAll('.sw-text').forEach(t => t.addEventListener('change', () => {
      w.subWorks[+t.dataset.i].text = t.value; save_();
    }));
    el.querySelectorAll('.sw-del').forEach(b => b.addEventListener('click', () => {
      w.subWorks.splice(+b.dataset.i, 1); save_(); renderWorkDetail(w);
    }));
    el.querySelector('.w-add-sub').addEventListener('click', () => {
      w.subWorks = w.subWorks || [];
      w.subWorks.push({ id: 'sw_' + uid(), text: '新しいサブタスク', done: false });
      save_();
      renderWorkDetail(w);
    });
  }

  // ---------- Social assessment ----------
  const socialIntro = document.getElementById('social-intro');
  const socialQuiz = document.getElementById('social-quiz');
  const socialResult = document.getElementById('social-result');
  const quizQuestionEl = document.getElementById('quiz-question');
  const quizProgressFill = document.getElementById('quiz-progress-fill');
  const quizProgressText = document.getElementById('quiz-progress-text');

  document.getElementById('social-start').addEventListener('click', () => {
    state.quiz = { idx: 0, answers: new Array(SOCIAL_QUESTIONS.length).fill(null) };
    socialIntro.classList.add('hidden');
    socialResult.classList.add('hidden');
    socialQuiz.classList.remove('hidden');
    renderQuizQuestion();
  });

  document.querySelectorAll('.quiz-choice').forEach(btn => {
    btn.addEventListener('click', () => {
      if (!state.quiz) return;
      state.quiz.answers[state.quiz.idx] = Number(btn.dataset.val);
      if (state.quiz.idx < SOCIAL_QUESTIONS.length - 1) {
        state.quiz.idx++;
        renderQuizQuestion();
      } else {
        finishQuiz();
      }
    });
  });

  document.getElementById('quiz-back').addEventListener('click', () => {
    if (!state.quiz || state.quiz.idx === 0) return;
    state.quiz.idx--;
    renderQuizQuestion();
  });

  document.getElementById('quiz-cancel').addEventListener('click', () => {
    if (!confirm('診断を中断しますか？（回答は保存されません）')) return;
    state.quiz = null;
    socialQuiz.classList.add('hidden');
    socialIntro.classList.remove('hidden');
  });

  function renderQuizQuestion() {
    const { idx, answers } = state.quiz;
    const q = SOCIAL_QUESTIONS[idx];
    const dim = SOCIAL_DIMENSIONS.find(d => d.key === q.dim);
    quizQuestionEl.innerHTML = `
      <div class="q-dim" style="color:${dim.color}">${escapeHtml(dim.label)}</div>
      <div class="q-text">${escapeHtml(q.text)}</div>`;
    quizProgressFill.style.width = `${((idx + 1) / SOCIAL_QUESTIONS.length) * 100}%`;
    quizProgressText.textContent = `${idx + 1} / ${SOCIAL_QUESTIONS.length}`;
    // Highlight selected
    document.querySelectorAll('.quiz-choice').forEach(b => {
      b.classList.toggle('selected', Number(b.dataset.val) === answers[idx]);
    });
    document.getElementById('quiz-back').disabled = idx === 0;
  }

  function finishQuiz() {
    const scores = computeSocialScores(state.quiz.answers);
    const record = {
      id: 'sa_' + uid(),
      date: new Date().toISOString(),
      answers: state.quiz.answers.slice(),
      scores,
      notes: '',
      aiCommentary: '',
    };
    state.socialAssessments.unshift(record);
    save(SOCIAL_KEY, state.socialAssessments);
    state.quiz = null;
    socialQuiz.classList.add('hidden');
    socialIntro.classList.remove('hidden');
    showSocialResult(record);
    renderSocialHistory();
  }

  function computeSocialScores(answers) {
    const sums = {}, counts = {};
    for (const d of SOCIAL_DIMENSIONS) { sums[d.key] = 0; counts[d.key] = 0; }
    for (let i = 0; i < SOCIAL_QUESTIONS.length; i++) {
      const a = answers[i];
      if (a == null) continue;
      const dim = SOCIAL_QUESTIONS[i].dim;
      sums[dim] += a;
      counts[dim]++;
    }
    // Normalize to 0-100: raw range per item = 1-4, so max = 4n, min = n
    const out = {};
    for (const d of SOCIAL_DIMENSIONS) {
      const max = counts[d.key] * 4, min = counts[d.key];
      out[d.key] = max > min ? Math.round(((sums[d.key] - min) / (max - min)) * 100) : 0;
    }
    return out;
  }

  function showSocialResult(record) {
    socialResult.classList.remove('hidden');
    const scores = record.scores;
    const sorted = SOCIAL_DIMENSIONS.slice().sort((a, b) => scores[b.key] - scores[a.key]);
    const high = sorted[0], low = sorted[sorted.length - 1];
    const avg = Math.round(SOCIAL_DIMENSIONS.reduce((s, d) => s + scores[d.key], 0) / SOCIAL_DIMENSIONS.length);

    socialResult.innerHTML = `
      <div class="result-card">
        <div class="result-head">
          <h3>診断結果</h3>
          <span class="muted">${escapeHtml(formatDate(record.date))}</span>
        </div>
        <div class="result-grid">
          ${renderSocialRadar(scores)}
          <div class="result-scores">
            ${SOCIAL_DIMENSIONS.map(d => `
              <div class="score-row">
                <span class="score-label" style="color:${d.color}">${escapeHtml(d.label)}</span>
                <div class="score-bar-wrap"><div class="score-bar" style="width:${scores[d.key]}%;background:${d.color}"></div></div>
                <span class="score-val">${scores[d.key]}</span>
              </div>
            `).join('')}
            <div class="score-summary">
              <div>平均: <b>${avg}</b></div>
              <div>最高: <b style="color:${high.color}">${escapeHtml(high.label)} (${scores[high.key]})</b></div>
              <div>最低: <b style="color:${low.color}">${escapeHtml(low.label)} (${scores[low.key]})</b></div>
            </div>
          </div>
        </div>
        <div class="result-interpret">${escapeHtml(interpretSocial(scores, high, low, avg))}</div>
        <div class="actions">
          <button id="social-ai-comment">AIで深掘りコメント</button>
          <button id="social-retry">もう一度受ける</button>
        </div>
        <div id="social-ai-output" class="ai-output" style="${record.aiCommentary ? '' : 'display:none'}">${escapeHtml(record.aiCommentary || '')}</div>
      </div>
    `;
    document.getElementById('social-retry').addEventListener('click', () => {
      document.getElementById('social-start').click();
    });
    document.getElementById('social-ai-comment').addEventListener('click', () => runSocialAICommentary(record));
  }

  function interpretSocial(scores, high, low, avg) {
    const parts = [];
    parts.push(`平均 ${avg} のプロファイル。`);
    if (scores[high.key] - scores[low.key] >= 30) {
      parts.push(`${high.label} と ${low.label} の差が大きく、アンバランスな傾向。`);
    } else {
      parts.push(`各次元の差は小さく、バランス型。`);
    }
    const pair = high.key + '_' + low.key;
    const hints = {
      empathy_assertion: '相手の気持ちは読めるが、自分の主張を抑えがち。我慢が溜まりやすい。',
      communication_empathy: '会話は回せるが、相手の感情の機微を見落としがち。',
      assertion_empathy: '自分の意見は通せるが、相手の気持ちへの配慮を意識的に足すと関係が深まる。',
      cooperation_assertion: '場を円滑にするのは得意だが、自分の「NO」を出す練習が効く。',
      adaptation_assertion: '状況に合わせる柔軟性は高いが、自分を出す場面を意識的に作ると良い。',
      empathy_communication: '気持ちは受け取れるが、それを言葉にして伝えるところが止まりがち。',
      adaptation_empathy: '適応はできるが、表面的な対応で終わりやすい。感情の奥まで踏み込むと深まる。',
    };
    if (hints[pair]) parts.push(hints[pair]);
    return parts.join(' ');
  }

  function renderSocialRadar(scores) { return renderRadarSvg(scores, SOCIAL_DIMENSIONS); }

  function renderRadarSvg(scores, dims) {
    const cx = 130, cy = 130, R = 100;
    const n = dims.length;
    const pts = dims.map((d, i) => {
      const ang = -Math.PI / 2 + (i * 2 * Math.PI) / n;
      const r = (scores[d.key] / 100) * R;
      return [cx + Math.cos(ang) * r, cy + Math.sin(ang) * r];
    });
    const gridRings = [0.25, 0.5, 0.75, 1].map(f => {
      const p = dims.map((d, i) => {
        const ang = -Math.PI / 2 + (i * 2 * Math.PI) / n;
        return `${cx + Math.cos(ang) * R * f},${cy + Math.sin(ang) * R * f}`;
      }).join(' ');
      return `<polygon points="${p}" fill="none" stroke="#e5e7eb" stroke-width="1"/>`;
    }).join('');
    const axes = dims.map((d, i) => {
      const ang = -Math.PI / 2 + (i * 2 * Math.PI) / n;
      const x = cx + Math.cos(ang) * R, y = cy + Math.sin(ang) * R;
      const lx = cx + Math.cos(ang) * (R + 22), ly = cy + Math.sin(ang) * (R + 18);
      return `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="#e5e7eb" stroke-width="1"/>
              <text x="${lx}" y="${ly}" text-anchor="middle" dy="4" font-size="11" fill="${d.color}" font-weight="600">${escapeHtml(d.label)}</text>`;
    }).join('');
    const shape = `<polygon points="${pts.map(p => p.join(',')).join(' ')}" fill="#6366f1" fill-opacity="0.25" stroke="#6366f1" stroke-width="2"/>`;
    const dots = pts.map(p => `<circle cx="${p[0]}" cy="${p[1]}" r="3" fill="#6366f1"/>`).join('');
    return `<svg class="radar-svg" viewBox="0 0 260 260">${gridRings}${axes}${shape}${dots}</svg>`;
  }

  function computeDimensionScores(answers, questions, dims) {
    const sums = {}, counts = {};
    for (const d of dims) { sums[d.key] = 0; counts[d.key] = 0; }
    for (let i = 0; i < questions.length; i++) {
      const a = answers[i];
      if (a == null) continue;
      sums[questions[i].dim] += a;
      counts[questions[i].dim]++;
    }
    const out = {};
    for (const d of dims) {
      const max = counts[d.key] * 4, min = counts[d.key];
      out[d.key] = max > min ? Math.round(((sums[d.key] - min) / (max - min)) * 100) : 0;
    }
    return out;
  }

  async function runSocialAICommentary(record) {
    if (!state.settings.apiKey) {
      alert('設定タブでAPIキーを登録してください。');
      return;
    }
    const out = document.getElementById('social-ai-output');
    out.style.display = 'block';
    out.textContent = '分析中...';
    const payload = SOCIAL_DIMENSIONS.map(d => `${d.label}: ${record.scores[d.key]}`).join('\n');
    const system = 'あなたは思慮深い心理カウンセラーです。MBTI 風の簡易診断の結果を、決めつけず、本人の自己理解に役立つ形で日本語で解説します。';
    const user = [
      '以下は社会性の5次元スコアです（0〜100）。',
      'それぞれの意味合い、全体のプロファイル、アンバランスがある場合はその構造、伸ばすヒント、注意点を400字程度でまとめてください。',
      '断定しすぎず、本人が試せる小さな一歩を一つ添えてください。',
      '',
      payload,
    ].join('\n');
    try {
      const text = await callClaude(system, user);
      out.textContent = text;
      record.aiCommentary = text;
      save(SOCIAL_KEY, state.socialAssessments);
    } catch (err) {
      out.textContent = 'エラー: ' + err.message;
    }
  }

  function renderSocialHistory() {
    const ul = document.getElementById('social-history');
    if (!ul) return;
    if (!state.socialAssessments.length) {
      ul.innerHTML = '<li class="muted">まだ診断履歴はありません。</li>';
      return;
    }
    ul.innerHTML = state.socialAssessments.map(r => {
      const avg = Math.round(SOCIAL_DIMENSIONS.reduce((s, d) => s + r.scores[d.key], 0) / SOCIAL_DIMENSIONS.length);
      const bars = SOCIAL_DIMENSIONS.map(d => `
        <span class="mini-bar" title="${escapeAttr(d.label)}: ${r.scores[d.key]}">
          <span class="mini-bar-fill" style="height:${r.scores[d.key]}%;background:${d.color}"></span>
        </span>`).join('');
      return `<li data-id="${r.id}">
        <div class="h-meta">${formatDate(r.date)} · 平均 ${avg}</div>
        <div class="mini-bars">${bars}</div>
        <div class="actions" style="margin-top:6px">
          <button class="sa-view" data-id="${r.id}">結果を表示</button>
          <button class="sa-del danger" data-id="${r.id}">削除</button>
        </div>
      </li>`;
    }).join('');
    ul.querySelectorAll('.sa-view').forEach(b => {
      b.addEventListener('click', () => {
        const r = state.socialAssessments.find(x => x.id === b.dataset.id);
        if (r) showSocialResult(r);
      });
    });
    ul.querySelectorAll('.sa-del').forEach(b => {
      b.addEventListener('click', () => {
        if (!confirm('この診断履歴を削除しますか？')) return;
        state.socialAssessments = state.socialAssessments.filter(x => x.id !== b.dataset.id);
        save(SOCIAL_KEY, state.socialAssessments);
        renderSocialHistory();
      });
    });
  }

  // ---------- Effort assessment ----------
  const effortIntro = document.getElementById('effort-intro');
  const effortQuizEl = document.getElementById('effort-quiz');
  const effortResult = document.getElementById('effort-result');
  const effortQuestionEl = document.getElementById('effort-question');
  const effortProgressFill = document.getElementById('effort-progress-fill');
  const effortProgressText = document.getElementById('effort-progress-text');

  document.getElementById('effort-start').addEventListener('click', () => {
    state.effortQuiz = { idx: 0, answers: new Array(EFFORT_QUESTIONS.length).fill(null) };
    effortIntro.classList.add('hidden');
    effortResult.classList.add('hidden');
    effortQuizEl.classList.remove('hidden');
    renderEffortQuestion();
  });

  document.querySelectorAll('.effort-choice').forEach(btn => {
    btn.addEventListener('click', () => {
      if (!state.effortQuiz) return;
      state.effortQuiz.answers[state.effortQuiz.idx] = Number(btn.dataset.val);
      if (state.effortQuiz.idx < EFFORT_QUESTIONS.length - 1) {
        state.effortQuiz.idx++;
        renderEffortQuestion();
      } else {
        finishEffortQuiz();
      }
    });
  });

  document.getElementById('effort-back').addEventListener('click', () => {
    if (!state.effortQuiz || state.effortQuiz.idx === 0) return;
    state.effortQuiz.idx--;
    renderEffortQuestion();
  });

  document.getElementById('effort-cancel').addEventListener('click', () => {
    if (!confirm('診断を中断しますか？（回答は保存されません）')) return;
    state.effortQuiz = null;
    effortQuizEl.classList.add('hidden');
    effortIntro.classList.remove('hidden');
  });

  function renderEffortQuestion() {
    const { idx, answers } = state.effortQuiz;
    const q = EFFORT_QUESTIONS[idx];
    const dim = EFFORT_DIMENSIONS.find(d => d.key === q.dim);
    effortQuestionEl.innerHTML = `
      <div class="q-dim" style="color:${dim.color}">${escapeHtml(dim.label)}の努力</div>
      <div class="q-text">${escapeHtml(q.text)}</div>`;
    effortProgressFill.style.width = `${((idx + 1) / EFFORT_QUESTIONS.length) * 100}%`;
    effortProgressText.textContent = `${idx + 1} / ${EFFORT_QUESTIONS.length}`;
    document.querySelectorAll('.effort-choice').forEach(b => {
      b.classList.toggle('selected', Number(b.dataset.val) === answers[idx]);
    });
    document.getElementById('effort-back').disabled = idx === 0;
  }

  function finishEffortQuiz() {
    const scores = computeDimensionScores(state.effortQuiz.answers, EFFORT_QUESTIONS, EFFORT_DIMENSIONS);
    const record = {
      id: 'ea_' + uid(),
      date: new Date().toISOString(),
      answers: state.effortQuiz.answers.slice(),
      scores,
      notes: '',
      aiCommentary: '',
    };
    state.effortAssessments.unshift(record);
    save(EFFORT_KEY, state.effortAssessments);
    state.effortQuiz = null;
    effortQuizEl.classList.add('hidden');
    effortIntro.classList.remove('hidden');
    showEffortResult(record);
    renderEffortHistory();
  }

  function showEffortResult(record) {
    effortResult.classList.remove('hidden');
    const scores = record.scores;
    const sorted = EFFORT_DIMENSIONS.slice().sort((a, b) => scores[b.key] - scores[a.key]);
    const high = sorted[0], low = sorted[sorted.length - 1];
    const avg = Math.round(EFFORT_DIMENSIONS.reduce((s, d) => s + scores[d.key], 0) / EFFORT_DIMENSIONS.length);
    const type = effortType(scores);

    effortResult.innerHTML = `
      <div class="result-card">
        <div class="result-head">
          <h3>努力プロファイル: <span style="color:${high.color}">${escapeHtml(type.name)}</span></h3>
          <span class="muted">${escapeHtml(formatDate(record.date))}</span>
        </div>
        <div class="result-grid">
          ${renderRadarSvg(scores, EFFORT_DIMENSIONS)}
          <div class="result-scores">
            ${EFFORT_DIMENSIONS.map(d => `
              <div class="score-row">
                <span class="score-label" style="color:${d.color}">${escapeHtml(d.label)}</span>
                <div class="score-bar-wrap"><div class="score-bar" style="width:${scores[d.key]}%;background:${d.color}"></div></div>
                <span class="score-val">${scores[d.key]}</span>
              </div>
            `).join('')}
            <div class="score-summary">
              <div>平均: <b>${avg}</b></div>
              <div>最高: <b style="color:${high.color}">${escapeHtml(high.label)} (${scores[high.key]})</b></div>
              <div>最低: <b style="color:${low.color}">${escapeHtml(low.label)} (${scores[low.key]})</b></div>
            </div>
          </div>
        </div>
        <div class="result-interpret">${escapeHtml(type.description)} ${escapeHtml(interpretEffort(high, low))}</div>
        <div class="actions">
          <button id="effort-ai-comment">AIで深掘りコメント</button>
          <button id="effort-retry">もう一度受ける</button>
        </div>
        <div id="effort-ai-output" class="ai-output" style="${record.aiCommentary ? '' : 'display:none'}">${escapeHtml(record.aiCommentary || '')}</div>
      </div>
    `;
    document.getElementById('effort-retry').addEventListener('click', () => {
      document.getElementById('effort-start').click();
    });
    document.getElementById('effort-ai-comment').addEventListener('click', () => runEffortAICommentary(record));
  }

  function effortType(scores) {
    // Name the profile by the highest dimension (tie -> first)
    const sorted = EFFORT_DIMENSIONS.slice().sort((a, b) => scores[b.key] - scores[a.key]);
    const top = sorted[0].key;
    const map = {
      volume:    { name: '地道型',   description: '投下量で押し切るタイプ。土台は強いが、質や設計を伸ばすと結果が加速します。' },
      quality:   { name: '熟達型',   description: '同じ時間でも中身を濃くできるタイプ。方向性の選択まで意識すると最大化されます。' },
      design:    { name: '戦略家型', description: '計画と優先順位付けが得意。実行量を確保できているか確認するとバランスが取れます。' },
      choice:    { name: '選択家型', description: '何に努力するかを選べるタイプ。選んだ後の量・質・持続を意識的に補強すると結果に繋がります。' },
      endurance: { name: '恒毅型',   description: '長く続ける力が突出。方向転換や設計の見直しを定期的に入れると、続ける力が結果に直結します。' },
    };
    return map[top] || { name: 'バランス型', description: '各次元がバランスよく育っています。' };
  }

  function interpretEffort(high, low) {
    const pair = high.key + '_' + low.key;
    const hints = {
      volume_quality:    '量はあるが、やり方の改善・フィードバックで効率が大きく伸びる余地あり。',
      volume_choice:     '量で走れているが、「そもそも何に努力するか」を見直すと結果のインパクトが変わる。',
      volume_design:     '量は出せるが、計画なしで走りがち。週次レビューで方向修正を入れると無駄打ちが減る。',
      quality_volume:    '工夫できているが、最低限の投下量が足りないこともある。ベース量の確保を意識。',
      quality_endurance: '質高く取り組めるが、燃え尽きやすいペース配分になっていないか要注意。',
      design_volume:     '計画はあるが実行量が追いつかない典型。最初の一歩を小さくすると動き出しやすい。',
      design_endurance:  '設計力は高いが、計画疲れで続かないパターン。計画の精度より実行の続行を優先。',
      choice_volume:     '選ぶ力はあるが、選んだあとの量が足りていない可能性。ベースラインの確保を。',
      choice_endurance:  '方向選びはできるが、続ける前に次を選んでしまいがち。短期で成果判定するルールを持つ。',
      endurance_choice:  '続ける力は強いが、そもそも続けている対象が正しいか定期的に問い直す必要がある（サンクコストに注意）。',
      endurance_design:  '粘り強いが、無計画に突き進む傾向。月次で設計を見直すと、粘りが結果に変わる。',
      endurance_quality: '長く続けているが、やり方がアップデートされていない可能性。フィードバックを取り入れる。',
    };
    return hints[pair] || '';
  }

  async function runEffortAICommentary(record) {
    if (!state.settings.apiKey) {
      alert('設定タブでAPIキーを登録してください。');
      return;
    }
    const out = document.getElementById('effort-ai-output');
    out.style.display = 'block';
    out.textContent = '分析中...';
    const payload = EFFORT_DIMENSIONS.map(d => `${d.label}(${d.description}): ${record.scores[d.key]}`).join('\n');
    const system = 'あなたは思慮深いコーチです。努力の5次元（量/質/設計/選択/持続）スコアを読み、本人が次の一手を決められるよう日本語で解説します。';
    const user = [
      '以下は努力の5次元スコア（0〜100）です。',
      '全体のプロファイル、強みと弱み、どの次元を次に伸ばすと効果が大きいか、',
      '今週から試せる具体アクションを1〜2つ、合わせて400字程度で示してください。',
      '',
      payload,
    ].join('\n');
    try {
      const text = await callClaude(system, user);
      out.textContent = text;
      record.aiCommentary = text;
      save(EFFORT_KEY, state.effortAssessments);
    } catch (err) {
      out.textContent = 'エラー: ' + err.message;
    }
  }

  function renderEffortHistory() {
    const ul = document.getElementById('effort-history');
    if (!ul) return;
    if (!state.effortAssessments.length) {
      ul.innerHTML = '<li class="muted">まだ診断履歴はありません。</li>';
      return;
    }
    ul.innerHTML = state.effortAssessments.map(r => {
      const avg = Math.round(EFFORT_DIMENSIONS.reduce((s, d) => s + r.scores[d.key], 0) / EFFORT_DIMENSIONS.length);
      const bars = EFFORT_DIMENSIONS.map(d => `
        <span class="mini-bar" title="${escapeAttr(d.label)}: ${r.scores[d.key]}">
          <span class="mini-bar-fill" style="height:${r.scores[d.key]}%;background:${d.color}"></span>
        </span>`).join('');
      return `<li data-id="${r.id}">
        <div class="h-meta">${formatDate(r.date)} · 平均 ${avg}</div>
        <div class="mini-bars">${bars}</div>
        <div class="actions" style="margin-top:6px">
          <button class="ea-view" data-id="${r.id}">結果を表示</button>
          <button class="ea-del danger" data-id="${r.id}">削除</button>
        </div>
      </li>`;
    }).join('');
    ul.querySelectorAll('.ea-view').forEach(b => {
      b.addEventListener('click', () => {
        const r = state.effortAssessments.find(x => x.id === b.dataset.id);
        if (r) showEffortResult(r);
      });
    });
    ul.querySelectorAll('.ea-del').forEach(b => {
      b.addEventListener('click', () => {
        if (!confirm('この診断履歴を削除しますか？')) return;
        state.effortAssessments = state.effortAssessments.filter(x => x.id !== b.dataset.id);
        save(EFFORT_KEY, state.effortAssessments);
        renderEffortHistory();
      });
    });
  }

  // ---------- Cross-reference helper for AI ----------
  function buildCrossReferences(except) {
    const sections = [
      { key: 'social',   label: '社会性',     dims: SOCIAL_DIMENSIONS,   list: state.socialAssessments },
      { key: 'effort',   label: '努力',       dims: EFFORT_DIMENSIONS,   list: state.effortAssessments },
      { key: 'kolb',     label: '学習タイプ', dims: KOLB_DIMENSIONS,     list: state.kolbAssessments },
      { key: 'values',   label: '価値観',     dims: VALUES_DIMENSIONS,   list: state.valuesAssessments },
      { key: 'thinking', label: '思考スタイル', dims: THINKING_DIMENSIONS, list: state.thinkingAssessments },
    ];
    const parts = [];
    for (const s of sections) {
      if (s.key === except) continue;
      const latest = s.list[0];
      if (!latest) continue;
      parts.push(`## 直近の${s.label}スコア\n` + s.dims.map(d => `${d.label}: ${latest.scores[d.key]}`).join(' / '));
    }
    if (except !== 'johari' && state.johariSessions[0]) {
      const j = state.johariSessions[0];
      const w = computeJohariWindows(j);
      parts.push(`## 直近のジョハリの窓\n開放: ${w.open.length}個 / 盲点: ${w.blind.length}個 / 秘密: ${w.hidden.length}個 / 未知の余地: ${w.unknown.length}個` +
        (w.blind.length ? `\n盲点のトレイト例: ${w.blind.slice(0, 5).join(', ')}` : '') +
        (w.hidden.length ? `\n秘密のトレイト例: ${w.hidden.slice(0, 5).join(', ')}` : ''));
    }
    return parts.length ? parts.join('\n\n') : '（他の診断はまだ受けていません）';
  }

  // ---------- Kolb learning-type assessment ----------
  const kolbIntro = document.getElementById('kolb-intro');
  const kolbQuizEl = document.getElementById('kolb-quiz');
  const kolbResult = document.getElementById('kolb-result');
  const kolbQuestionEl = document.getElementById('kolb-question');
  const kolbProgressFill = document.getElementById('kolb-progress-fill');
  const kolbProgressText = document.getElementById('kolb-progress-text');

  document.getElementById('kolb-start').addEventListener('click', () => {
    state.kolbQuiz = { idx: 0, answers: new Array(KOLB_QUESTIONS.length).fill(null) };
    kolbIntro.classList.add('hidden');
    kolbResult.classList.add('hidden');
    kolbQuizEl.classList.remove('hidden');
    renderKolbQuestion();
  });

  document.querySelectorAll('.kolb-choice').forEach(btn => {
    btn.addEventListener('click', () => {
      if (!state.kolbQuiz) return;
      state.kolbQuiz.answers[state.kolbQuiz.idx] = Number(btn.dataset.val);
      if (state.kolbQuiz.idx < KOLB_QUESTIONS.length - 1) {
        state.kolbQuiz.idx++;
        renderKolbQuestion();
      } else {
        finishKolbQuiz();
      }
    });
  });

  document.getElementById('kolb-back').addEventListener('click', () => {
    if (!state.kolbQuiz || state.kolbQuiz.idx === 0) return;
    state.kolbQuiz.idx--;
    renderKolbQuestion();
  });

  document.getElementById('kolb-cancel').addEventListener('click', () => {
    if (!confirm('診断を中断しますか？（回答は保存されません）')) return;
    state.kolbQuiz = null;
    kolbQuizEl.classList.add('hidden');
    kolbIntro.classList.remove('hidden');
  });

  function renderKolbQuestion() {
    const { idx, answers } = state.kolbQuiz;
    const q = KOLB_QUESTIONS[idx];
    const dim = KOLB_DIMENSIONS.find(d => d.key === q.dim);
    kolbQuestionEl.innerHTML = `
      <div class="q-dim" style="color:${dim.color}">${escapeHtml(dim.label)}タイプ</div>
      <div class="q-text">${escapeHtml(q.text)}</div>`;
    kolbProgressFill.style.width = `${((idx + 1) / KOLB_QUESTIONS.length) * 100}%`;
    kolbProgressText.textContent = `${idx + 1} / ${KOLB_QUESTIONS.length}`;
    document.querySelectorAll('.kolb-choice').forEach(b => {
      b.classList.toggle('selected', Number(b.dataset.val) === answers[idx]);
    });
    document.getElementById('kolb-back').disabled = idx === 0;
  }

  function finishKolbQuiz() {
    const scores = computeDimensionScores(state.kolbQuiz.answers, KOLB_QUESTIONS, KOLB_DIMENSIONS);
    const record = {
      id: 'ka_' + uid(),
      date: new Date().toISOString(),
      answers: state.kolbQuiz.answers.slice(),
      scores,
      notes: '',
      aiCommentary: '',
    };
    state.kolbAssessments.unshift(record);
    save(KOLB_KEY, state.kolbAssessments);
    state.kolbQuiz = null;
    kolbQuizEl.classList.add('hidden');
    kolbIntro.classList.remove('hidden');
    showKolbResult(record);
    renderKolbHistory();
  }

  function showKolbResult(record) {
    kolbResult.classList.remove('hidden');
    const scores = record.scores;
    const sorted = KOLB_DIMENSIONS.slice().sort((a, b) => scores[b.key] - scores[a.key]);
    const high = sorted[0], second = sorted[1], low = sorted[sorted.length - 1];
    const avg = Math.round(KOLB_DIMENSIONS.reduce((s, d) => s + scores[d.key], 0) / KOLB_DIMENSIONS.length);
    const balanced = (scores[high.key] - scores[low.key]) <= 15;
    const profileName = balanced ? `バランス型（${high.label}寄り）` : `${high.label}・${second.label}型`;
    const advice = kolbAdvice(high.key);

    kolbResult.innerHTML = `
      <div class="result-card">
        <div class="result-head">
          <h3>学習タイプ: <span style="color:${high.color}">${escapeHtml(profileName)}</span></h3>
          <span class="muted">${escapeHtml(formatDate(record.date))}</span>
        </div>
        <div class="result-grid">
          ${renderRadarSvg(scores, KOLB_DIMENSIONS)}
          <div class="result-scores">
            ${KOLB_DIMENSIONS.map(d => `
              <div class="score-row">
                <span class="score-label" style="color:${d.color}">${escapeHtml(d.label)}</span>
                <div class="score-bar-wrap"><div class="score-bar" style="width:${scores[d.key]}%;background:${d.color}"></div></div>
                <span class="score-val">${scores[d.key]}</span>
              </div>
            `).join('')}
            <div class="score-summary">
              <div>平均: <b>${avg}</b></div>
              <div>最高: <b style="color:${high.color}">${escapeHtml(high.label)} (${scores[high.key]})</b></div>
              <div>最低: <b style="color:${low.color}">${escapeHtml(low.label)} (${scores[low.key]})</b></div>
            </div>
          </div>
        </div>
        <div class="result-interpret">${escapeHtml(advice)}</div>
        <div class="actions">
          <button id="kolb-ai-comment">AIで深掘りコメント（社会性・努力との関連も）</button>
          <button id="kolb-retry">もう一度受ける</button>
        </div>
        <div id="kolb-ai-output" class="ai-output" style="${record.aiCommentary ? '' : 'display:none'}">${escapeHtml(record.aiCommentary || '')}</div>
      </div>
    `;
    document.getElementById('kolb-retry').addEventListener('click', () => {
      document.getElementById('kolb-start').click();
    });
    document.getElementById('kolb-ai-comment').addEventListener('click', () => runKolbAICommentary(record));
  }

  function kolbAdvice(topKey) {
    return ({
      why:  'あなたは「意味」が原動力です。長期ビジョンと結びつかないタスクで失速しやすいので、毎週「なぜやるか」を一行に書き出すと続きやすくなります。',
      what: 'あなたは「根拠」で安心するタイプ。データ集めで止まりやすいので、「8割の根拠で動く」を意識的に許可してあげると行動量が増えます。',
      how:  'あなたは「手順」が明確だと強い。逆に予定外に弱いので、「この手順が崩れた時のバックアッププラン」を1つ持っておくと不測に強くなります。',
      now:  'あなたは「行動」で学ぶタイプ。事前準備が薄くなりがちなので、行動の前に「一つだけ振り返る問い」を持つと学びの質が上がります。',
    })[topKey] || '';
  }

  async function runKolbAICommentary(record) {
    if (!state.settings.apiKey) {
      alert('設定タブでAPIキーを登録してください。');
      return;
    }
    const out = document.getElementById('kolb-ai-output');
    out.style.display = 'block';
    out.textContent = '分析中...';
    const kolbPayload = KOLB_DIMENSIONS.map(d => `${d.label}(${d.description}): ${record.scores[d.key]}`).join('\n');
    const system = 'あなたは経験学習理論（Kolb）に詳しいコーチです。学習タイプを他の診断と統合し、本人が次の一手を取れるよう日本語で解説します。';
    const user = [
      '以下は学習タイプの4次元スコア（0〜100）です。',
      'それぞれの意味、組み合わせのプロファイル、強みと弱みを述べた上で、',
      '他の診断スコアと突き合わせて「相乗効果が出ている部分」「ねじれている（衝突している）部分」を指摘してください。',
      '最後に、今週から試せる小さなアクションを1つ提案してください。',
      '全体で500字程度にまとめてください。',
      '',
      '## 学習タイプスコア',
      kolbPayload,
      '',
      buildCrossReferences('kolb'),
    ].join('\n');
    try {
      const text = await callClaude(system, user);
      out.textContent = text;
      record.aiCommentary = text;
      save(KOLB_KEY, state.kolbAssessments);
    } catch (err) {
      out.textContent = 'エラー: ' + err.message;
    }
  }

  function renderKolbHistory() {
    const ul = document.getElementById('kolb-history');
    if (!ul) return;
    if (!state.kolbAssessments.length) {
      ul.innerHTML = '<li class="muted">まだ診断履歴はありません。</li>';
      return;
    }
    ul.innerHTML = state.kolbAssessments.map(r => {
      const top = KOLB_DIMENSIONS.slice().sort((a, b) => r.scores[b.key] - r.scores[a.key])[0];
      const bars = KOLB_DIMENSIONS.map(d => `
        <span class="mini-bar" title="${escapeAttr(d.label)}: ${r.scores[d.key]}">
          <span class="mini-bar-fill" style="height:${r.scores[d.key]}%;background:${d.color}"></span>
        </span>`).join('');
      return `<li data-id="${r.id}">
        <div class="h-meta">${formatDate(r.date)} · 最高: <b style="color:${top.color}">${escapeHtml(top.label)}</b></div>
        <div class="mini-bars">${bars}</div>
        <div class="actions" style="margin-top:6px">
          <button class="ka-view" data-id="${r.id}">結果を表示</button>
          <button class="ka-del danger" data-id="${r.id}">削除</button>
        </div>
      </li>`;
    }).join('');
    ul.querySelectorAll('.ka-view').forEach(b => {
      b.addEventListener('click', () => {
        const r = state.kolbAssessments.find(x => x.id === b.dataset.id);
        if (r) showKolbResult(r);
      });
    });
    ul.querySelectorAll('.ka-del').forEach(b => {
      b.addEventListener('click', () => {
        if (!confirm('この診断履歴を削除しますか？')) return;
        state.kolbAssessments = state.kolbAssessments.filter(x => x.id !== b.dataset.id);
        save(KOLB_KEY, state.kolbAssessments);
        renderKolbHistory();
      });
    });
  }

  // ---------- Values assessment ----------
  bindAssessment({
    prefix: 'values',
    key: VALUES_KEY,
    dims: VALUES_DIMENSIONS,
    questions: VALUES_QUESTIONS,
    list: () => state.valuesAssessments,
    setList: (v) => { state.valuesAssessments = v; },
    quizState: () => state.valuesQuiz,
    setQuizState: (v) => { state.valuesQuiz = v; },
    qLabelSuffix: 'を大切にする',
    profileFn: (high, second, low, balanced) => balanced
      ? { name: `バランス型（${high.label}寄り）`, color: high.color }
      : { name: `${high.label}・${second.label}型`, color: high.color },
    adviceFn: (top) => ({
      autonomy:    'あなたは「自分で決める自由」を最重視。組織や関係で束縛が強い場面ではエネルギーが奪われやすいので、決定権が確保できる環境設計が効きます。',
      achievement: 'あなたは「成果」が原動力。手応えのない状態が続くと枯れやすいので、小さくても結果が見える指標を週次で持つと持続します。',
      relation:    'あなたは「人との繋がり」が中心。一方で「相手のため」と「自分のため」の境目が曖昧になりやすいので、線引きを意識すると関係が長持ちします。',
      stability:   'あなたは「予測可能性」が安心の源。変化のストレスが大きいので、変化を避けるのではなく、小さなステップに分解して試すと適応コストが下がります。',
      growth:      'あなたは「成長・刺激」が燃料。同じことの繰り返しで失速しやすいので、3ヶ月ごとに学習対象を意識的に変える運用が合います。',
    })[top] || '',
    aiSystem: 'あなたは価値観研究（Schwartzら）に詳しいコーチです。価値観プロファイルを他の診断と統合して、本人が大事にしているものと現在の生き方のズレを優しく指摘します。',
    aiUser: (payload, scores) => [
      '以下は価値観の5次元スコア（0〜100）です。',
      '何を大切にしているかのプロファイル、価値観間の葛藤の可能性（例: 自律↑ × 関係↑ → 自立と繋がりの両立緊張）、',
      '他の診断スコアと突き合わせて見える「価値観と行動のズレ」、',
      '今週試せる小さな一致回復アクションを示してください（500字程度）。',
      '',
      '## 価値観スコア',
      payload,
      '',
      buildCrossReferences('values'),
    ].join('\n'),
  });

  // ---------- Thinking-style assessment ----------
  bindAssessment({
    prefix: 'thinking',
    key: THINKING_KEY,
    dims: THINKING_DIMENSIONS,
    questions: THINKING_QUESTIONS,
    list: () => state.thinkingAssessments,
    setList: (v) => { state.thinkingAssessments = v; },
    quizState: () => state.thinkingQuiz,
    setQuizState: (v) => { state.thinkingQuiz = v; },
    qLabelSuffix: '思考',
    profileFn: (high, second, low, balanced) => balanced
      ? { name: `バランス型（${high.label}寄り）`, color: high.color }
      : { name: `${high.label}・${second.label}型`, color: high.color },
    adviceFn: (top) => ({
      logical:    '論理が強い。一方で感情データを軽視しがちなので、相手の感情を「データ」として扱う訓練を入れると関係性が滑らかになります。',
      intuitive:  '直感が強い。説明責任が必要な場面で詰まりやすいので、後追いで「なぜそう感じたか」を言語化する習慣を持つと直感が磨かれます。',
      creative:   '創造性が強い。発散しすぎて収束できないことがあるので、アイデアを出した翌日に「捨てる作業」を入れると形になります。',
      systematic: '体系的思考が強い。完璧な整理を求めて動き出しが遅れがちなので、「7割で動かす」を許可してあげると速度が出ます。',
      holistic:   '全体把握が強い。細部の詰めが甘くなりがちなので、重要な場面では誰かに「ディテール担当」をお願いする運用が効きます。',
    })[top] || '',
    aiSystem: 'あなたは認知スタイル研究に詳しいコーチです。思考スタイルを他の診断と統合し、強みの活かし方と盲点を日本語で解説します。',
    aiUser: (payload, scores) => [
      '以下は思考スタイルの5次元スコア（0〜100）です。',
      'プロファイルの特徴、組み合わせから見える得意・盲点、',
      '他の診断スコアと突き合わせた相乗効果や衝突、',
      '今週試せる小さなアクションを示してください（500字程度）。',
      '',
      '## 思考スタイルスコア',
      payload,
      '',
      buildCrossReferences('thinking'),
    ].join('\n'),
  });

  // Generic assessment binder used by Values and Thinking
  function bindAssessment(cfg) {
    const { prefix, key, dims, questions } = cfg;
    const introEl = document.getElementById(`${prefix}-intro`);
    const quizEl = document.getElementById(`${prefix}-quiz`);
    const resultEl = document.getElementById(`${prefix}-result`);
    const questionEl = document.getElementById(`${prefix}-question`);
    const progressFill = document.getElementById(`${prefix}-progress-fill`);
    const progressText = document.getElementById(`${prefix}-progress-text`);

    document.getElementById(`${prefix}-start`).addEventListener('click', () => {
      cfg.setQuizState({ idx: 0, answers: new Array(questions.length).fill(null) });
      introEl.classList.add('hidden');
      resultEl.classList.add('hidden');
      quizEl.classList.remove('hidden');
      drawQ();
    });

    document.querySelectorAll(`.${prefix}-choice`).forEach(btn => {
      btn.addEventListener('click', () => {
        const q = cfg.quizState();
        if (!q) return;
        q.answers[q.idx] = Number(btn.dataset.val);
        if (q.idx < questions.length - 1) { q.idx++; drawQ(); }
        else { finish(); }
      });
    });

    document.getElementById(`${prefix}-back`).addEventListener('click', () => {
      const q = cfg.quizState();
      if (!q || q.idx === 0) return;
      q.idx--;
      drawQ();
    });

    document.getElementById(`${prefix}-cancel`).addEventListener('click', () => {
      if (!confirm('診断を中断しますか？（回答は保存されません）')) return;
      cfg.setQuizState(null);
      quizEl.classList.add('hidden');
      introEl.classList.remove('hidden');
    });

    function drawQ() {
      const { idx, answers } = cfg.quizState();
      const q = questions[idx];
      const dim = dims.find(d => d.key === q.dim);
      questionEl.innerHTML = `
        <div class="q-dim" style="color:${dim.color}">${escapeHtml(dim.label)}${escapeHtml(cfg.qLabelSuffix || '')}</div>
        <div class="q-text">${escapeHtml(q.text)}</div>`;
      progressFill.style.width = `${((idx + 1) / questions.length) * 100}%`;
      progressText.textContent = `${idx + 1} / ${questions.length}`;
      document.querySelectorAll(`.${prefix}-choice`).forEach(b => {
        b.classList.toggle('selected', Number(b.dataset.val) === answers[idx]);
      });
      document.getElementById(`${prefix}-back`).disabled = idx === 0;
    }

    function finish() {
      const q = cfg.quizState();
      const scores = computeDimensionScores(q.answers, questions, dims);
      const record = {
        id: `${prefix.slice(0, 1)}a_` + uid(),
        date: new Date().toISOString(),
        answers: q.answers.slice(),
        scores,
        notes: '',
        aiCommentary: '',
      };
      cfg.setList([record, ...cfg.list()]);
      save(key, cfg.list());
      cfg.setQuizState(null);
      quizEl.classList.add('hidden');
      introEl.classList.remove('hidden');
      showResult(record);
      drawHistory();
    }

    function showResult(record) {
      resultEl.classList.remove('hidden');
      const scores = record.scores;
      const sorted = dims.slice().sort((a, b) => scores[b.key] - scores[a.key]);
      const high = sorted[0], second = sorted[1], low = sorted[sorted.length - 1];
      const avg = Math.round(dims.reduce((s, d) => s + scores[d.key], 0) / dims.length);
      const balanced = (scores[high.key] - scores[low.key]) <= 15;
      const profile = cfg.profileFn(high, second, low, balanced);
      const advice = cfg.adviceFn(high.key);

      resultEl.innerHTML = `
        <div class="result-card">
          <div class="result-head">
            <h3>${escapeHtml(prefix === 'values' ? '価値観プロファイル' : '思考スタイル')}: <span style="color:${profile.color}">${escapeHtml(profile.name)}</span></h3>
            <span class="muted">${escapeHtml(formatDate(record.date))}</span>
          </div>
          <div class="result-grid">
            ${renderRadarSvg(scores, dims)}
            <div class="result-scores">
              ${dims.map(d => `
                <div class="score-row">
                  <span class="score-label" style="color:${d.color}">${escapeHtml(d.label)}</span>
                  <div class="score-bar-wrap"><div class="score-bar" style="width:${scores[d.key]}%;background:${d.color}"></div></div>
                  <span class="score-val">${scores[d.key]}</span>
                </div>
              `).join('')}
              <div class="score-summary">
                <div>平均: <b>${avg}</b></div>
                <div>最高: <b style="color:${high.color}">${escapeHtml(high.label)} (${scores[high.key]})</b></div>
                <div>最低: <b style="color:${low.color}">${escapeHtml(low.label)} (${scores[low.key]})</b></div>
              </div>
            </div>
          </div>
          <div class="result-interpret">${escapeHtml(advice)}</div>
          <div class="actions">
            <button class="ai-btn" data-id="${record.id}">AIで深掘りコメント（他診断との関連も）</button>
            <button class="retry-btn">もう一度受ける</button>
          </div>
          <div class="ai-output ai-out" data-id="${record.id}" style="${record.aiCommentary ? '' : 'display:none'}">${escapeHtml(record.aiCommentary || '')}</div>
        </div>
      `;
      resultEl.querySelector('.retry-btn').addEventListener('click', () => {
        document.getElementById(`${prefix}-start`).click();
      });
      resultEl.querySelector('.ai-btn').addEventListener('click', () => runAI(record));
    }

    async function runAI(record) {
      if (!state.settings.apiKey) {
        alert('設定タブでAPIキーを登録してください。');
        return;
      }
      const out = resultEl.querySelector('.ai-out');
      out.style.display = 'block';
      out.textContent = '分析中...';
      const payload = dims.map(d => `${d.label}(${d.description}): ${record.scores[d.key]}`).join('\n');
      try {
        const text = await callClaude(cfg.aiSystem, cfg.aiUser(payload, record.scores));
        out.textContent = text;
        record.aiCommentary = text;
        save(key, cfg.list());
      } catch (err) {
        out.textContent = 'エラー: ' + err.message;
      }
    }

    function drawHistory() {
      const ul = document.getElementById(`${prefix}-history`);
      if (!ul) return;
      const list = cfg.list();
      if (!list.length) {
        ul.innerHTML = '<li class="muted">まだ診断履歴はありません。</li>';
        return;
      }
      ul.innerHTML = list.map(r => {
        const top = dims.slice().sort((a, b) => r.scores[b.key] - r.scores[a.key])[0];
        const bars = dims.map(d => `
          <span class="mini-bar" title="${escapeAttr(d.label)}: ${r.scores[d.key]}">
            <span class="mini-bar-fill" style="height:${r.scores[d.key]}%;background:${d.color}"></span>
          </span>`).join('');
        return `<li data-id="${r.id}">
          <div class="h-meta">${formatDate(r.date)} · 最高: <b style="color:${top.color}">${escapeHtml(top.label)}</b></div>
          <div class="mini-bars">${bars}</div>
          <div class="actions" style="margin-top:6px">
            <button class="hview" data-id="${r.id}">結果を表示</button>
            <button class="hdel danger" data-id="${r.id}">削除</button>
          </div>
        </li>`;
      }).join('');
      ul.querySelectorAll('.hview').forEach(b => {
        b.addEventListener('click', () => {
          const r = cfg.list().find(x => x.id === b.dataset.id);
          if (r) showResult(r);
        });
      });
      ul.querySelectorAll('.hdel').forEach(b => {
        b.addEventListener('click', () => {
          if (!confirm('この診断履歴を削除しますか？')) return;
          cfg.setList(cfg.list().filter(x => x.id !== b.dataset.id));
          save(key, cfg.list());
          drawHistory();
        });
      });
    }

    // expose history renderer
    cfg.renderHistory = drawHistory;
    if (prefix === 'values') window.__renderValuesHistory = drawHistory;
    if (prefix === 'thinking') window.__renderThinkingHistory = drawHistory;
  }

  function renderValuesHistory() { window.__renderValuesHistory && window.__renderValuesHistory(); }
  function renderThinkingHistory() { window.__renderThinkingHistory && window.__renderThinkingHistory(); }

  // ---------- Johari Window ----------
  function getAllJohariTraits(draft = state.johariDraft) {
    const extra = new Set([...(draft.extraSelf || []), ...(draft.extraOthers || [])]);
    return [...JOHARI_TRAITS, ...extra];
  }

  function computeJohariWindows(session) {
    const self = new Set(session.selfTraits || []);
    const others = new Set(session.othersTraits || []);
    const all = new Set([
      ...JOHARI_TRAITS,
      ...(session.extraSelf || []),
      ...(session.extraOthers || []),
    ]);
    const open = [], blind = [], hidden = [], unknown = [];
    for (const t of all) {
      if (self.has(t) && others.has(t)) open.push(t);
      else if (!self.has(t) && others.has(t)) blind.push(t);
      else if (self.has(t) && !others.has(t)) hidden.push(t);
      else unknown.push(t);
    }
    return { open, blind, hidden, unknown };
  }

  function renderJohari() {
    const selfWrap = document.getElementById('johari-self-traits');
    const othersWrap = document.getElementById('johari-others-traits');
    const draft = state.johariDraft;
    const allTraits = getAllJohariTraits(draft);
    const renderTrait = (which) => {
      const wrap = which === 'self' ? selfWrap : othersWrap;
      const set = new Set(which === 'self' ? draft.selfTraits : draft.othersTraits);
      const extras = new Set(which === 'self' ? draft.extraSelf : draft.extraOthers);
      wrap.innerHTML = allTraits.map(t => {
        const on = set.has(t);
        const isExtra = extras.has(t);
        return `<button class="trait-chip ${on ? 'on' : ''} ${isExtra ? 'extra' : ''}" data-which="${which}" data-trait="${escapeAttr(t)}">${escapeHtml(t)}${isExtra ? ` <span class="x">×</span>` : ''}</button>`;
      }).join('');
      wrap.querySelectorAll('.trait-chip').forEach(b => {
        b.addEventListener('click', e => {
          const t = b.dataset.trait;
          const list = which === 'self' ? draft.selfTraits : draft.othersTraits;
          const i = list.indexOf(t);
          if (i >= 0) list.splice(i, 1); else list.push(t);
          renderJohari();
        });
        const x = b.querySelector('.x');
        if (x) {
          x.addEventListener('click', e => {
            e.stopPropagation();
            if (!confirm(`カスタムトレイト「${t}」を削除しますか？`)) return;
            const exList = which === 'self' ? draft.extraSelf : draft.extraOthers;
            const sel = which === 'self' ? draft.selfTraits : draft.othersTraits;
            exList.splice(exList.indexOf(t), 1);
            const si = sel.indexOf(t);
            if (si >= 0) sel.splice(si, 1);
            renderJohari();
          });
        }
      });
    };
    renderTrait('self');
    renderTrait('others');

    if (state.johariEditingId) {
      const s = state.johariSessions.find(x => x.id === state.johariEditingId);
      if (s) {
        document.getElementById('johari-scope').value = s.scope || '';
        document.getElementById('johari-notes').value = s.notes || '';
      }
    }

    renderJohariHistory();
  }

  document.getElementById('johari-self-add-btn').addEventListener('click', () => addJohariTrait('self'));
  document.getElementById('johari-others-add-btn').addEventListener('click', () => addJohariTrait('others'));
  document.getElementById('johari-self-add').addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); addJohariTrait('self'); } });
  document.getElementById('johari-others-add').addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); addJohariTrait('others'); } });

  function addJohariTrait(which) {
    const inp = document.getElementById(which === 'self' ? 'johari-self-add' : 'johari-others-add');
    const t = inp.value.trim();
    if (!t) return;
    const draft = state.johariDraft;
    const exList = which === 'self' ? draft.extraSelf : draft.extraOthers;
    if (!JOHARI_TRAITS.includes(t) && !exList.includes(t)) exList.push(t);
    const sel = which === 'self' ? draft.selfTraits : draft.othersTraits;
    if (!sel.includes(t)) sel.push(t);
    inp.value = '';
    renderJohari();
  }

  document.getElementById('johari-reset').addEventListener('click', () => {
    if (!confirm('入力中の内容をクリアしますか？')) return;
    state.johariDraft = { selfTraits: [], othersTraits: [], extraSelf: [], extraOthers: [] };
    state.johariEditingId = null;
    document.getElementById('johari-scope').value = '';
    document.getElementById('johari-notes').value = '';
    document.getElementById('johari-result').classList.add('hidden');
    renderJohari();
  });

  document.getElementById('johari-save').addEventListener('click', () => {
    const draft = state.johariDraft;
    if (!draft.selfTraits.length && !draft.othersTraits.length) {
      alert('少なくとも片方のリストを選んでください。');
      return;
    }
    const session = {
      id: state.johariEditingId || 'jo_' + uid(),
      date: new Date().toISOString(),
      scope: document.getElementById('johari-scope').value.trim() || '全体',
      notes: document.getElementById('johari-notes').value.trim(),
      selfTraits: draft.selfTraits.slice(),
      othersTraits: draft.othersTraits.slice(),
      extraSelf: draft.extraSelf.slice(),
      extraOthers: draft.extraOthers.slice(),
      aiCommentary: state.johariEditingId
        ? state.johariSessions.find(x => x.id === state.johariEditingId)?.aiCommentary || ''
        : '',
      updatedAt: new Date().toISOString(),
    };
    if (state.johariEditingId) {
      state.johariSessions = state.johariSessions.map(s => s.id === state.johariEditingId ? session : s);
    } else {
      state.johariSessions.unshift(session);
    }
    save(JOHARI_KEY, state.johariSessions);
    state.johariEditingId = session.id;
    showJohariResult(session);
    renderJohariHistory();
    flash('保存しました');
  });

  function showJohariResult(session) {
    const resEl = document.getElementById('johari-result');
    resEl.classList.remove('hidden');
    const w = computeJohariWindows(session);
    const total = w.open.length + w.blind.length + w.hidden.length;
    const totalAll = total + w.unknown.length;
    const pct = (n) => totalAll ? Math.round((n / totalAll) * 100) : 0;
    const interpret = interpretJohari(w);

    resEl.innerHTML = `
      <div class="result-card">
        <div class="result-head">
          <h3>ジョハリの窓: ${escapeHtml(session.scope || '全体')}</h3>
          <span class="muted">${escapeHtml(formatDate(session.date))}</span>
        </div>
        <div class="johari-grid">
          <div class="johari-quad q-open">
            <div class="quad-head"><b>開放</b><span class="muted">${w.open.length}（${pct(w.open.length)}%）</span></div>
            <div class="quad-traits">${w.open.map(t => `<span class="trait-chip on small">${escapeHtml(t)}</span>`).join('') || '<span class="muted">なし</span>'}</div>
          </div>
          <div class="johari-quad q-blind">
            <div class="quad-head"><b>盲点</b><span class="muted">${w.blind.length}（${pct(w.blind.length)}%）</span></div>
            <div class="quad-traits">${w.blind.map(t => `<span class="trait-chip blind small">${escapeHtml(t)}</span>`).join('') || '<span class="muted">なし</span>'}</div>
          </div>
          <div class="johari-quad q-hidden">
            <div class="quad-head"><b>秘密</b><span class="muted">${w.hidden.length}（${pct(w.hidden.length)}%）</span></div>
            <div class="quad-traits">${w.hidden.map(t => `<span class="trait-chip hidden-trait small">${escapeHtml(t)}</span>`).join('') || '<span class="muted">なし</span>'}</div>
          </div>
          <div class="johari-quad q-unknown">
            <div class="quad-head"><b>未知の余地</b><span class="muted">${w.unknown.length}</span></div>
            <div class="quad-traits muted">${w.unknown.length}個のトレイトがどちらの側でも選ばれていません。新しい挑戦・自己探求で気づきが増えます。</div>
          </div>
        </div>
        <div class="result-interpret">${escapeHtml(interpret)}</div>
        <div class="actions">
          <button id="johari-ai-comment">AIで深掘りコメント（他診断との関連も）</button>
          <button id="johari-edit">この内容を編集する</button>
        </div>
        <div id="johari-ai-output" class="ai-output" style="${session.aiCommentary ? '' : 'display:none'}">${escapeHtml(session.aiCommentary || '')}</div>
      </div>`;

    document.getElementById('johari-edit').addEventListener('click', () => {
      state.johariEditingId = session.id;
      state.johariDraft = {
        selfTraits: session.selfTraits.slice(),
        othersTraits: session.othersTraits.slice(),
        extraSelf: (session.extraSelf || []).slice(),
        extraOthers: (session.extraOthers || []).slice(),
      };
      document.getElementById('johari-scope').value = session.scope || '';
      document.getElementById('johari-notes').value = session.notes || '';
      renderJohari();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    document.getElementById('johari-ai-comment').addEventListener('click', () => runJohariAICommentary(session));
  }

  function interpretJohari(w) {
    const total = w.open.length + w.blind.length + w.hidden.length;
    if (!total) return '自己選択も他者からの選択もまだありません。';
    const parts = [];
    const ratio = (n) => total ? Math.round((n / total) * 100) : 0;
    if (w.open.length >= w.blind.length && w.open.length >= w.hidden.length) {
      parts.push('開放の窓が一番大きく、関係の地盤が安定しています。');
    } else if (w.blind.length > w.open.length && w.blind.length > w.hidden.length) {
      parts.push('盲点が大きい状態です。フィードバックを取り入れる場面が多いと、開放の窓が一気に広がります。');
    } else if (w.hidden.length > w.open.length && w.hidden.length > w.blind.length) {
      parts.push('秘密が大きい状態です。安全な相手に少しずつ開示するだけで、開放の窓は広がります。');
    }
    if (w.blind.length && w.hidden.length === 0) parts.push('開示は十分。盲点に向き合うのが次の一手です。');
    if (w.hidden.length && w.blind.length === 0) parts.push('フィードバックは取り入れている。安全な開示が次の一手です。');
    if (w.unknown.length > total * 2) parts.push('未知の余地が大きいので、新しい挑戦・対話で発見できる可能性が広いです。');
    return parts.join(' ');
  }

  async function runJohariAICommentary(session) {
    if (!state.settings.apiKey) {
      alert('設定タブでAPIキーを登録してください。');
      return;
    }
    const out = document.getElementById('johari-ai-output');
    out.style.display = 'block';
    out.textContent = '分析中...';
    const w = computeJohariWindows(session);
    const payload = [
      `対象: ${session.scope || '全体'}`,
      `開放（自分も他者も認識）: ${w.open.join(', ') || 'なし'}`,
      `盲点（他者だけが認識）: ${w.blind.join(', ') || 'なし'}`,
      `秘密（自分だけが認識）: ${w.hidden.join(', ') || 'なし'}`,
      `未知（どちらも未選択）: ${w.unknown.length}個`,
    ].join('\n');
    const system = 'あなたはジョハリの窓を使ったコーチングに詳しい心理カウンセラーです。本人の窓のバランスと他診断を統合して、次の一歩を優しく日本語で示します。';
    const user = [
      '以下はジョハリの窓の集計です。',
      '4つの窓のバランスから読み取れる「他者との関係の現在地」を一文でまとめ、',
      '盲点・秘密のトレイトに具体的に触れながら、開放の窓を広げるための小さな実験を1つ提案してください。',
      '他の診断スコアがあれば、整合・矛盾を指摘してください（500字程度）。',
      '',
      payload,
      '',
      buildCrossReferences('johari'),
    ].join('\n');
    try {
      const text = await callClaude(system, user);
      out.textContent = text;
      session.aiCommentary = text;
      save(JOHARI_KEY, state.johariSessions);
    } catch (err) {
      out.textContent = 'エラー: ' + err.message;
    }
  }

  function renderJohariHistory() {
    const ul = document.getElementById('johari-history');
    if (!ul) return;
    if (!state.johariSessions.length) {
      ul.innerHTML = '<li class="muted">まだ履歴はありません。</li>';
      return;
    }
    ul.innerHTML = state.johariSessions.map(s => {
      const w = computeJohariWindows(s);
      return `<li data-id="${s.id}" class="${state.johariEditingId === s.id ? 'active' : ''}">
        <div class="h-meta">${escapeHtml(s.scope || '全体')} · ${formatDate(s.date)}</div>
        <div class="muted" style="font-size:11px;margin-top:2px">開放 ${w.open.length} / 盲点 ${w.blind.length} / 秘密 ${w.hidden.length}</div>
        <div class="actions" style="margin-top:6px">
          <button class="jo-view" data-id="${s.id}">結果を表示</button>
          <button class="jo-del danger" data-id="${s.id}">削除</button>
        </div>
      </li>`;
    }).join('');
    ul.querySelectorAll('.jo-view').forEach(b => {
      b.addEventListener('click', () => {
        const s = state.johariSessions.find(x => x.id === b.dataset.id);
        if (s) showJohariResult(s);
      });
    });
    ul.querySelectorAll('.jo-del').forEach(b => {
      b.addEventListener('click', () => {
        if (!confirm('この履歴を削除しますか？')) return;
        state.johariSessions = state.johariSessions.filter(x => x.id !== b.dataset.id);
        if (state.johariEditingId === b.dataset.id) state.johariEditingId = null;
        save(JOHARI_KEY, state.johariSessions);
        renderJohariHistory();
      });
    });
  }

  renderList();
  renderStats();
  renderHistory();
  renderAxesSettings();
  renderCustomAxesInForm();
  renderReasonsInForm();
  renderSessions();
  renderActions();
  renderWorks();
  renderSocialHistory();
  renderEffortHistory();
  renderKolbHistory();
  renderValuesHistory();
  renderThinkingHistory();
  renderJohari();
})();
