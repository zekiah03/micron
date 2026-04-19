(() => {
  const SETTINGS_KEY = 'nayami-settings-v1';
  const SOCIAL_KEY = 'nayami-social-v1';
  const EFFORT_KEY = 'nayami-effort-v1';
  const KOLB_KEY = 'nayami-kolb-v1';
  const VALUES_KEY = 'nayami-values-v1';
  const THINKING_KEY = 'nayami-thinking-v1';
  const JOHARI_KEY = 'nayami-johari-v1';
  const SUMMARY_KEY = 'nayami-summary-v1';
  const PEOPLE_KEY = 'diag-people-v1';
  const CURRENT_PERSON_KEY = 'diag-current-person-v1';

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

  const state = {
    settings: load(SETTINGS_KEY, { apiKey: '', model: 'claude-sonnet-4-6' }),
    people: load(PEOPLE_KEY, []),
    currentPerson: load(CURRENT_PERSON_KEY, ''),
    socialAssessments: load(SOCIAL_KEY, []),
    effortAssessments: load(EFFORT_KEY, []),
    kolbAssessments: load(KOLB_KEY, []),
    valuesAssessments: load(VALUES_KEY, []),
    thinkingAssessments: load(THINKING_KEY, []),
    johariSessions: load(JOHARI_KEY, []),
    summaryAnalyses: load(SUMMARY_KEY, []),
    quiz: null,
    effortQuiz: null,
    kolbQuiz: null,
    valuesQuiz: null,
    thinkingQuiz: null,
    johariDraft: { selfTraits: [], othersTraits: [], extraSelf: [], extraOthers: [] },
    johariEditingId: null,
    historyOnlyCurrent: {}, // per-diagnostic: boolean
    summaryOnlyCurrent: false,
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
  const subRender = {
    social:   renderSocialHistory,
    effort:   renderEffortHistory,
    kolb:     renderKolbHistory,
    values:   renderValuesHistory,
    thinking: renderThinkingHistory,
    johari:   renderJohari,
  };
  const subState = { diagnoses: 'social' };

  function activateSub(parent, sub) {
    subState[parent] = sub;
    const root = document.getElementById(`tab-${parent}`);
    if (!root) return;
    root.querySelectorAll(':scope > .sub-tabs .sub-tab').forEach(b => {
      b.classList.toggle('active', b.dataset.sub === sub);
    });
    root.querySelectorAll(':scope > .sub-panel').forEach(p => {
      p.classList.toggle('active', p.dataset.sub === sub);
    });
    if (subRender[sub]) subRender[sub]();
  }

  document.querySelectorAll('.sub-tab').forEach(btn => {
    btn.addEventListener('click', () => activateSub(btn.dataset.parent, btn.dataset.sub));
  });

  document.querySelectorAll('.tab').forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.dataset.tab;
      document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t === btn));
      document.querySelectorAll('.panel').forEach(p => p.classList.toggle('active', p.id === `tab-${name}`));
      if (name === 'diagnoses') activateSub(name, subState[name]);
      if (name === 'summary') renderSummary();
    });
  });

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
      people: state.people,
      currentPerson: state.currentPerson,
      socialAssessments: state.socialAssessments,
      effortAssessments: state.effortAssessments,
      kolbAssessments: state.kolbAssessments,
      valuesAssessments: state.valuesAssessments,
      thinkingAssessments: state.thinkingAssessments,
      johariSessions: state.johariSessions,
      summaryAnalyses: state.summaryAnalyses,
    }, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `diagnostic-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  });

  document.getElementById('import-file').addEventListener('change', async e => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      if (Array.isArray(data.people))            { state.people = data.people; save(PEOPLE_KEY, state.people); }
      if (typeof data.currentPerson === 'string'){ state.currentPerson = data.currentPerson; save(CURRENT_PERSON_KEY, state.currentPerson); }
      if (Array.isArray(data.socialAssessments)) { state.socialAssessments = data.socialAssessments; save(SOCIAL_KEY, state.socialAssessments); }
      if (Array.isArray(data.effortAssessments)) { state.effortAssessments = data.effortAssessments; save(EFFORT_KEY, state.effortAssessments); }
      if (Array.isArray(data.kolbAssessments))   { state.kolbAssessments = data.kolbAssessments; save(KOLB_KEY, state.kolbAssessments); }
      if (Array.isArray(data.valuesAssessments)) { state.valuesAssessments = data.valuesAssessments; save(VALUES_KEY, state.valuesAssessments); }
      if (Array.isArray(data.thinkingAssessments)){ state.thinkingAssessments = data.thinkingAssessments; save(THINKING_KEY, state.thinkingAssessments); }
      if (Array.isArray(data.johariSessions))    { state.johariSessions = data.johariSessions; save(JOHARI_KEY, state.johariSessions); }
      if (Array.isArray(data.summaryAnalyses))   { state.summaryAnalyses = data.summaryAnalyses; save(SUMMARY_KEY, state.summaryAnalyses); }
      flash('インポートしました');
      renderPersonBar();
      renderSocialHistory();
      renderEffortHistory();
      renderKolbHistory();
      renderValuesHistory();
      renderThinkingHistory();
      renderJohari();
      renderSummary();
    } catch (err) {
      alert('インポートに失敗しました: ' + err.message);
    }
    e.target.value = '';
  });

  document.getElementById('clear-btn').addEventListener('click', () => {
    if (!confirm('すべての診断データと人物を削除します。よろしいですか？')) return;
    state.people = [];
    state.currentPerson = '';
    state.socialAssessments = [];
    state.effortAssessments = [];
    state.kolbAssessments = [];
    state.valuesAssessments = [];
    state.thinkingAssessments = [];
    state.johariSessions = [];
    state.johariDraft = { selfTraits: [], othersTraits: [], extraSelf: [], extraOthers: [] };
    state.johariEditingId = null;
    state.summaryAnalyses = [];
    save(PEOPLE_KEY, state.people);
    save(CURRENT_PERSON_KEY, state.currentPerson);
    save(SOCIAL_KEY, state.socialAssessments);
    save(EFFORT_KEY, state.effortAssessments);
    save(KOLB_KEY, state.kolbAssessments);
    save(VALUES_KEY, state.valuesAssessments);
    save(THINKING_KEY, state.thinkingAssessments);
    save(JOHARI_KEY, state.johariSessions);
    save(SUMMARY_KEY, state.summaryAnalyses);
    renderPersonBar();
    renderSocialHistory();
    renderEffortHistory();
    renderKolbHistory();
    renderValuesHistory();
    renderThinkingHistory();
    renderJohari();
    renderSummary();
    flash('削除しました');
  });

  // ---------- Person management ----------
  const personSelect = document.getElementById('person-select');
  const personNewBtn = document.getElementById('person-new-btn');
  const personNewWrap = document.getElementById('person-new-wrap');
  const personNewName = document.getElementById('person-new-name');
  const personNewSave = document.getElementById('person-new-save');
  const personNewCancel = document.getElementById('person-new-cancel');
  const personRenameBtn = document.getElementById('person-rename');
  const personDeleteBtn = document.getElementById('person-delete');

  function allPersonNames() {
    const s = new Set(state.people.map(p => p.name));
    // include names from assessments not in registry
    const lists = [
      state.socialAssessments, state.effortAssessments, state.kolbAssessments,
      state.valuesAssessments, state.thinkingAssessments, state.johariSessions,
    ];
    for (const list of lists) for (const r of list) if (r.personName) s.add(r.personName);
    return Array.from(s).sort();
  }

  function renderPersonBar() {
    const names = allPersonNames();
    // sync state.people with discovered names
    for (const n of names) {
      if (!state.people.some(p => p.name === n)) {
        state.people.push({ name: n, createdAt: new Date().toISOString() });
      }
    }
    save(PEOPLE_KEY, state.people);

    const current = state.currentPerson;
    personSelect.innerHTML = '<option value="">— 選択 —</option>' +
      names.map(n => `<option value="${escapeAttr(n)}" ${n === current ? 'selected' : ''}>${escapeHtml(n)}</option>`).join('');
    personRenameBtn.disabled = !current;
    personDeleteBtn.disabled = !current;
  }

  personSelect.addEventListener('change', () => {
    state.currentPerson = personSelect.value;
    save(CURRENT_PERSON_KEY, state.currentPerson);
    personRenameBtn.disabled = !state.currentPerson;
    personDeleteBtn.disabled = !state.currentPerson;
    // refresh history views (filter may change)
    refreshAllHistories();
  });

  personNewBtn.addEventListener('click', () => {
    personNewWrap.classList.remove('hidden');
    personNewName.focus();
  });
  personNewCancel.addEventListener('click', () => {
    personNewWrap.classList.add('hidden');
    personNewName.value = '';
  });
  personNewSave.addEventListener('click', addNewPerson);
  personNewName.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); addNewPerson(); } });

  function addNewPerson() {
    const name = personNewName.value.trim();
    if (!name) return;
    if (!state.people.some(p => p.name === name)) {
      state.people.push({ name, createdAt: new Date().toISOString() });
      save(PEOPLE_KEY, state.people);
    }
    state.currentPerson = name;
    save(CURRENT_PERSON_KEY, state.currentPerson);
    personNewName.value = '';
    personNewWrap.classList.add('hidden');
    renderPersonBar();
    refreshAllHistories();
    flash(`「${name}」を選択中`);
  }

  personRenameBtn.addEventListener('click', () => {
    const oldName = state.currentPerson;
    if (!oldName) return;
    const newName = prompt(`「${oldName}」の名前を変更します。新しい名前:`, oldName);
    if (!newName || newName.trim() === '' || newName === oldName) return;
    const trimmed = newName.trim();
    // Update registry
    const p = state.people.find(x => x.name === oldName);
    if (p) p.name = trimmed;
    // Dedupe if newName already exists
    const seen = new Set();
    state.people = state.people.filter(x => (seen.has(x.name) ? false : seen.add(x.name) && true));
    save(PEOPLE_KEY, state.people);
    // Rename across all assessment records
    const lists = [
      { list: state.socialAssessments, key: SOCIAL_KEY },
      { list: state.effortAssessments, key: EFFORT_KEY },
      { list: state.kolbAssessments, key: KOLB_KEY },
      { list: state.valuesAssessments, key: VALUES_KEY },
      { list: state.thinkingAssessments, key: THINKING_KEY },
      { list: state.johariSessions, key: JOHARI_KEY },
      { list: state.summaryAnalyses, key: SUMMARY_KEY },
    ];
    for (const { list, key } of lists) {
      let changed = false;
      for (const r of list) {
        if (r.personName === oldName) { r.personName = trimmed; changed = true; }
        if (key === SUMMARY_KEY && r.name === oldName) { r.name = trimmed; changed = true; }
      }
      if (changed) save(key, list);
    }
    state.currentPerson = trimmed;
    save(CURRENT_PERSON_KEY, state.currentPerson);
    renderPersonBar();
    refreshAllHistories();
    flash('名前を変更しました');
  });

  personDeleteBtn.addEventListener('click', () => {
    const name = state.currentPerson;
    if (!name) return;
    if (!confirm(`「${name}」の全ての診断記録を削除します。元に戻せません。よろしいですか？`)) return;
    const filterOut = (list, key) => {
      const kept = list.filter(r => (r.personName || (key === SUMMARY_KEY ? r.name : '')) !== name && r.name !== name);
      if (kept.length !== list.length) save(key, kept);
      return kept;
    };
    state.socialAssessments  = filterOut(state.socialAssessments,  SOCIAL_KEY);
    state.effortAssessments  = filterOut(state.effortAssessments,  EFFORT_KEY);
    state.kolbAssessments    = filterOut(state.kolbAssessments,    KOLB_KEY);
    state.valuesAssessments  = filterOut(state.valuesAssessments,  VALUES_KEY);
    state.thinkingAssessments= filterOut(state.thinkingAssessments,THINKING_KEY);
    state.johariSessions     = filterOut(state.johariSessions,     JOHARI_KEY);
    state.summaryAnalyses    = state.summaryAnalyses.filter(r => r.name !== name);
    save(SUMMARY_KEY, state.summaryAnalyses);
    state.people = state.people.filter(p => p.name !== name);
    save(PEOPLE_KEY, state.people);
    state.currentPerson = '';
    save(CURRENT_PERSON_KEY, state.currentPerson);
    renderPersonBar();
    refreshAllHistories();
    flash(`「${name}」のデータを削除しました`);
  });

  // History filter checkboxes (per-diagnostic)
  document.querySelectorAll('.history-only-current').forEach(cb => {
    cb.addEventListener('change', () => {
      state.historyOnlyCurrent[cb.dataset.target] = cb.checked;
      refreshAllHistories();
    });
  });
  const summaryOnlyCurrentEl = document.getElementById('summary-only-current');
  if (summaryOnlyCurrentEl) {
    summaryOnlyCurrentEl.addEventListener('change', () => {
      state.summaryOnlyCurrent = summaryOnlyCurrentEl.checked;
      renderSummary();
    });
  }

  function refreshAllHistories() {
    renderSocialHistory();
    renderEffortHistory();
    renderKolbHistory();
    renderValuesHistory();
    renderThinkingHistory();
    renderJohari();
    renderSummary();
  }

  // Guard: ensure user has selected a person before starting a quiz
  function requirePerson() {
    if (state.currentPerson) return true;
    alert('先に上部の「現在の人物」を選択するか、「＋ 新しい人物」で追加してください。');
    return false;
  }

  // Filter helper for histories
  function filterByCurrent(records, target) {
    if (!state.historyOnlyCurrent[target]) return records;
    if (!state.currentPerson) return records;
    return records.filter(r => r.personName === state.currentPerson);
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

  // ---------- Social assessment ----------
  const socialIntro = document.getElementById('social-intro');
  const socialQuiz = document.getElementById('social-quiz');
  const socialResult = document.getElementById('social-result');
  const quizQuestionEl = document.getElementById('quiz-question');
  const quizProgressFill = document.getElementById('quiz-progress-fill');
  const quizProgressText = document.getElementById('quiz-progress-text');

  document.getElementById('social-start').addEventListener('click', () => {
    if (!requirePerson()) return;
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
      personName: state.currentPerson || '',
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
          <button id="social-ai-comment">AIに詳しく解説してもらう</button>
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
    const system = 'あなたは思慮深い心理カウンセラーです。自己診断の結果を、決めつけず、本人の自己理解に役立つ形で日本語で解説します。';
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
    const items = filterByCurrent(state.socialAssessments, 'social');
    if (!items.length) {
      ul.innerHTML = '<li class="muted">該当する履歴はありません。</li>';
      return;
    }
    ul.innerHTML = items.map(r => {
      const avg = Math.round(SOCIAL_DIMENSIONS.reduce((s, d) => s + r.scores[d.key], 0) / SOCIAL_DIMENSIONS.length);
      const bars = SOCIAL_DIMENSIONS.map(d => `
        <span class="mini-bar" title="${escapeAttr(d.label)}: ${r.scores[d.key]}">
          <span class="mini-bar-fill" style="height:${r.scores[d.key]}%;background:${d.color}"></span>
        </span>`).join('');
      return `<li data-id="${r.id}">
        <div class="h-meta"><b class="person-badge">${escapeHtml(r.personName || '無名')}</b> · ${formatDate(r.date)} · 平均 ${avg}</div>
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
    if (!requirePerson()) return;
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
      personName: state.currentPerson || '',
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
          <h3>努力スタイル: <span style="color:${high.color}">${escapeHtml(type.name)}</span></h3>
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
          <button id="effort-ai-comment">AIに詳しく解説してもらう</button>
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
    const items = filterByCurrent(state.effortAssessments, 'effort');
    if (!items.length) {
      ul.innerHTML = '<li class="muted">該当する履歴はありません。</li>';
      return;
    }
    ul.innerHTML = items.map(r => {
      const avg = Math.round(EFFORT_DIMENSIONS.reduce((s, d) => s + r.scores[d.key], 0) / EFFORT_DIMENSIONS.length);
      const bars = EFFORT_DIMENSIONS.map(d => `
        <span class="mini-bar" title="${escapeAttr(d.label)}: ${r.scores[d.key]}">
          <span class="mini-bar-fill" style="height:${r.scores[d.key]}%;background:${d.color}"></span>
        </span>`).join('');
      return `<li data-id="${r.id}">
        <div class="h-meta"><b class="person-badge">${escapeHtml(r.personName || '無名')}</b> · ${formatDate(r.date)} · 平均 ${avg}</div>
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
      { key: 'social',   label: '人との関わり方',     dims: SOCIAL_DIMENSIONS,   list: state.socialAssessments },
      { key: 'effort',   label: '努力スタイル',       dims: EFFORT_DIMENSIONS,   list: state.effortAssessments },
      { key: 'kolb',     label: '学び方のタイプ',     dims: KOLB_DIMENSIONS,     list: state.kolbAssessments },
      { key: 'values',   label: '大切にしているもの', dims: VALUES_DIMENSIONS,   list: state.valuesAssessments },
      { key: 'thinking', label: '考え方のクセ',       dims: THINKING_DIMENSIONS, list: state.thinkingAssessments },
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
      parts.push(`## 直近の「自分と他者の見え方」\n開放: ${w.open.length}個 / 盲点: ${w.blind.length}個 / 秘密: ${w.hidden.length}個 / 未知の余地: ${w.unknown.length}個` +
        (w.blind.length ? `\n盲点（他者だけが認識）の例: ${w.blind.slice(0, 5).join(', ')}` : '') +
        (w.hidden.length ? `\n秘密（自分だけが認識）の例: ${w.hidden.slice(0, 5).join(', ')}` : ''));
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
    if (!requirePerson()) return;
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
      personName: state.currentPerson || '',
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
          <button id="kolb-ai-comment">AIに詳しく解説してもらう（他の診断との関連も）</button>
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
    const items = filterByCurrent(state.kolbAssessments, 'kolb');
    if (!items.length) {
      ul.innerHTML = '<li class="muted">該当する履歴はありません。</li>';
      return;
    }
    ul.innerHTML = items.map(r => {
      const top = KOLB_DIMENSIONS.slice().sort((a, b) => r.scores[b.key] - r.scores[a.key])[0];
      const bars = KOLB_DIMENSIONS.map(d => `
        <span class="mini-bar" title="${escapeAttr(d.label)}: ${r.scores[d.key]}">
          <span class="mini-bar-fill" style="height:${r.scores[d.key]}%;background:${d.color}"></span>
        </span>`).join('');
      return `<li data-id="${r.id}">
        <div class="h-meta"><b class="person-badge">${escapeHtml(r.personName || '無名')}</b> · ${formatDate(r.date)} · 最高: <b style="color:${top.color}">${escapeHtml(top.label)}</b></div>
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
    aiSystem: 'あなたは価値観研究に詳しいコーチです。「大切にしているもの」のプロファイルを他の診断と統合して、本人が大事にしているものと現在の生き方のズレを優しく指摘します。',
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
      if (!requirePerson()) return;
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
        personName: state.currentPerson || '',
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
            <h3>${escapeHtml(prefix === 'values' ? '大切にしているもの' : '考え方のクセ')}: <span style="color:${profile.color}">${escapeHtml(profile.name)}</span></h3>
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
            <button class="ai-btn" data-id="${record.id}">AIに詳しく解説してもらう（他の診断との関連も）</button>
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
      const list = filterByCurrent(cfg.list(), prefix);
      if (!list.length) {
        ul.innerHTML = '<li class="muted">該当する履歴はありません。</li>';
        return;
      }
      ul.innerHTML = list.map(r => {
        const top = dims.slice().sort((a, b) => r.scores[b.key] - r.scores[a.key])[0];
        const bars = dims.map(d => `
          <span class="mini-bar" title="${escapeAttr(d.label)}: ${r.scores[d.key]}">
            <span class="mini-bar-fill" style="height:${r.scores[d.key]}%;background:${d.color}"></span>
          </span>`).join('');
        return `<li data-id="${r.id}">
          <div class="h-meta"><b class="person-badge">${escapeHtml(r.personName || '無名')}</b> · ${formatDate(r.date)} · 最高: <b style="color:${top.color}">${escapeHtml(top.label)}</b></div>
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
    if (!requirePerson()) return;
    const draft = state.johariDraft;
    if (!draft.selfTraits.length && !draft.othersTraits.length) {
      alert('少なくとも片方のリストを選んでください。');
      return;
    }
    const existing = state.johariEditingId
      ? state.johariSessions.find(x => x.id === state.johariEditingId)
      : null;
    const session = {
      id: state.johariEditingId || 'jo_' + uid(),
      personName: (existing && existing.personName) || state.currentPerson || '',
      date: new Date().toISOString(),
      scope: document.getElementById('johari-scope').value.trim() || '全体',
      notes: document.getElementById('johari-notes').value.trim(),
      selfTraits: draft.selfTraits.slice(),
      othersTraits: draft.othersTraits.slice(),
      extraSelf: draft.extraSelf.slice(),
      extraOthers: draft.extraOthers.slice(),
      aiCommentary: existing ? existing.aiCommentary || '' : '',
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
          <h3>自分と他者の見え方: ${escapeHtml(session.scope || '全体')}</h3>
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
          <button id="johari-ai-comment">AIに詳しく解説してもらう（他の診断との関連も）</button>
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
    const system = 'あなたはジョハリの窓モデルを使ったコーチングに詳しい心理カウンセラーです。本人の自己認識と他者からの見え方のズレを統合的に読み解き、次の一歩を優しく日本語で示します。';
    const user = [
      '以下は「自分から見た自分」と「他者から見た自分」の集計です（ジョハリの窓モデル）。',
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

  // ---------- Summary (comprehensive) analysis ----------
  function summaryDiagnostics() {
    return [
      { key: 'social',   label: '人との関わり方',     dims: SOCIAL_DIMENSIONS,   list: state.socialAssessments },
      { key: 'effort',   label: '努力スタイル',       dims: EFFORT_DIMENSIONS,   list: state.effortAssessments },
      { key: 'kolb',     label: '学び方のタイプ',     dims: KOLB_DIMENSIONS,     list: state.kolbAssessments },
      { key: 'values',   label: '大切にしているもの', dims: VALUES_DIMENSIONS,   list: state.valuesAssessments },
      { key: 'thinking', label: '考え方のクセ',       dims: THINKING_DIMENSIONS, list: state.thinkingAssessments },
    ];
  }

  // Latest record for a specific person; if no person selected, return global latest.
  function latestForPerson(list, personName) {
    if (!personName) return list[0] || null;
    return list.find(r => r.personName === personName) || null;
  }

  function renderSummary() {
    const personInfo = document.getElementById('summary-person-info');
    if (personInfo) {
      if (state.currentPerson) {
        personInfo.innerHTML = `<b>${escapeHtml(state.currentPerson)}</b> さんの最新スコアを使います。`;
      } else {
        personInfo.textContent = '上部の「現在の人物」を選択してください。選ばないまま実行すると、全員分の最新スコアが混ざります。';
      }
    }

    const snap = document.getElementById('summary-snapshot');
    if (!snap) return;
    const cards = [];
    for (const d of summaryDiagnostics()) {
      const latest = latestForPerson(d.list, state.currentPerson);
      if (!latest) {
        cards.push(`<div class="snap-card empty"><div class="snap-label">${escapeHtml(d.label)}</div><div class="snap-empty">未診断</div></div>`);
        continue;
      }
      const top = d.dims.slice().sort((a, b) => latest.scores[b.key] - latest.scores[a.key])[0];
      const avg = Math.round(d.dims.reduce((s, x) => s + latest.scores[x.key], 0) / d.dims.length);
      const bars = d.dims.map(x => `
        <span class="snap-bar" title="${escapeAttr(x.label)}: ${latest.scores[x.key]}">
          <span class="snap-bar-fill" style="height:${latest.scores[x.key]}%;background:${x.color}"></span>
        </span>`).join('');
      cards.push(`<div class="snap-card">
        <div class="snap-label">${escapeHtml(d.label)}</div>
        <div class="snap-bars">${bars}</div>
        <div class="snap-meta muted">平均 ${avg} · 最高 <b style="color:${top.color}">${escapeHtml(top.label)}</b></div>
      </div>`);
    }
    const johari = latestForPerson(state.johariSessions, state.currentPerson);
    if (johari) {
      const w = computeJohariWindows(johari);
      cards.push(`<div class="snap-card">
        <div class="snap-label">自分と他者の見え方</div>
        <div class="snap-meta">開放 ${w.open.length} / 盲点 ${w.blind.length} / 秘密 ${w.hidden.length}</div>
        <div class="muted" style="font-size:11px">${escapeHtml(johari.scope || '全体')}</div>
      </div>`);
    } else {
      cards.push(`<div class="snap-card empty"><div class="snap-label">自分と他者の見え方</div><div class="snap-empty">未診断</div></div>`);
    }
    snap.innerHTML = cards.join('');
    renderSummaryHistory();
  }

  document.getElementById('summary-run').addEventListener('click', runSummary);
  document.getElementById('summary-copy').addEventListener('click', () => {
    const t = document.getElementById('summary-output').textContent;
    if (!t) return;
    navigator.clipboard.writeText(t).then(() => flash('コピーしました'));
  });
  document.getElementById('summary-filter').addEventListener('input', renderSummaryHistory);

  async function runSummary() {
    if (!state.settings.apiKey) {
      alert('設定タブでAPIキーを登録してください。');
      return;
    }
    if (!state.currentPerson) {
      if (!confirm('現在の人物が選択されていません。全診断の最新スコアを混ぜて実行しますか？')) return;
    }
    const out = document.getElementById('summary-output');
    const status = document.getElementById('summary-status');
    out.textContent = '';
    const name = state.currentPerson || '（全体）';

    const payloadParts = [];
    const snapshot = { name, diagnostics: {} };

    for (const d of summaryDiagnostics()) {
      const latest = latestForPerson(d.list, state.currentPerson);
      if (!latest) {
        payloadParts.push(`## ${d.label}\n（未診断）`);
        snapshot.diagnostics[d.key] = null;
        continue;
      }
      const dims = d.dims.map(x => `${x.label}: ${latest.scores[x.key]}`).join(' / ');
      payloadParts.push(`## ${d.label}（${formatDate(latest.date)}）\n${dims}`);
      snapshot.diagnostics[d.key] = { scores: latest.scores, date: latest.date };
    }
    const johari = latestForPerson(state.johariSessions, state.currentPerson);
    if (johari) {
      const w = computeJohariWindows(johari);
      payloadParts.push(`## 自分と他者の見え方（${johari.scope || '全体'} / ${formatDate(johari.date)}）
開放（自他共通）: ${w.open.join(', ') || 'なし'}
盲点（他者だけ）: ${w.blind.join(', ') || 'なし'}
秘密（自分だけ）: ${w.hidden.join(', ') || 'なし'}
未知の余地: ${w.unknown.length}個`);
      snapshot.diagnostics.johari = { open: w.open, blind: w.blind, hidden: w.hidden, unknownCount: w.unknown.length, scope: johari.scope, date: johari.date };
    } else {
      payloadParts.push('## 自分と他者の見え方\n（未診断）');
      snapshot.diagnostics.johari = null;
    }

    const system = [
      'あなたは心理学・コーチング・経験学習理論に通じた、思慮深い分析パートナーです。',
      '複数の自己診断結果を統合し、一人の人物像として丁寧に読み解きます。',
      '断定や決めつけを避け、本人が次の一歩を選べる形で日本語で回答します。',
    ].join('\n');

    const userPrompt = [
      `以下は「${name}」さんの診断データです。これらを統合的に分析してください。`,
      '',
      '出力には以下を含めてください（マークダウンの見出しで区切る）:',
      '## 1. 人物プロファイル（200字程度の物語的な要約）',
      '## 2. 各診断から見える強み（箇条書き、根拠引用）',
      '## 3. 構造的な「ねじれ」（複数の診断が共通して指している葛藤）',
      '## 4. 今週から試せる小さな一歩（1〜2個、具体的に）',
      '',
      '全体で700〜1000字。安直な励ましは避け、データに即して書いてください。',
      '',
      payloadParts.join('\n\n'),
    ].join('\n');

    document.getElementById('summary-run').disabled = true;
    status.textContent = '統合分析中...';
    try {
      const text = await callClaude(system, userPrompt);
      out.textContent = text;
      const record = {
        id: 'sum_' + uid(),
        name,
        date: new Date().toISOString(),
        snapshot,
        output: text,
        notes: '',
      };
      state.summaryAnalyses.unshift(record);
      state.summaryAnalyses = state.summaryAnalyses.slice(0, 50);
      save(SUMMARY_KEY, state.summaryAnalyses);
      status.textContent = `完了 (${name}・${formatDate(record.date)})`;
      renderSummaryHistory();
    } catch (err) {
      status.textContent = 'エラー: ' + err.message;
    } finally {
      document.getElementById('summary-run').disabled = false;
    }
  }

  function renderSummaryHistory() {
    const ul = document.getElementById('summary-history');
    if (!ul) return;
    const filterEl = document.getElementById('summary-filter');
    const q = (filterEl ? filterEl.value : '').trim().toLowerCase();
    let items = state.summaryAnalyses.slice();
    if (q) items = items.filter(r => (r.name || '').toLowerCase().includes(q));
    if (state.summaryOnlyCurrent && state.currentPerson) {
      items = items.filter(r => r.name === state.currentPerson);
    }
    if (!items.length) {
      ul.innerHTML = '<li class="muted">該当する履歴はありません。</li>';
      return;
    }
    ul.innerHTML = items.map(r => `
      <li data-id="${r.id}">
        <div class="h-meta"><b class="person-badge">${escapeHtml(r.name || '無名')}</b> · ${formatDate(r.date)}</div>
        <div class="h-preview">${escapeHtml(r.output).slice(0, 200)}…</div>
        <div class="actions" style="margin-top:6px">
          <button class="sum-view" data-id="${r.id}">結果を表示</button>
          <button class="sum-rename" data-id="${r.id}">名前を変更</button>
          <button class="sum-del danger" data-id="${r.id}">削除</button>
        </div>
      </li>
    `).join('');
    ul.querySelectorAll('.sum-view').forEach(b => {
      b.addEventListener('click', () => {
        const r = state.summaryAnalyses.find(x => x.id === b.dataset.id);
        if (!r) return;
        document.getElementById('summary-output').textContent = r.output;
        document.getElementById('summary-status').textContent = `履歴を表示中 (${r.name || '無名'} · ${formatDate(r.date)})`;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });
    ul.querySelectorAll('.sum-rename').forEach(b => {
      b.addEventListener('click', () => {
        const r = state.summaryAnalyses.find(x => x.id === b.dataset.id);
        if (!r) return;
        const newName = prompt('新しい名前:', r.name || '');
        if (!newName || !newName.trim()) return;
        r.name = newName.trim();
        save(SUMMARY_KEY, state.summaryAnalyses);
        renderSummaryHistory();
      });
    });
    ul.querySelectorAll('.sum-del').forEach(b => {
      b.addEventListener('click', () => {
        if (!confirm('この履歴を削除しますか？')) return;
        state.summaryAnalyses = state.summaryAnalyses.filter(x => x.id !== b.dataset.id);
        save(SUMMARY_KEY, state.summaryAnalyses);
        renderSummaryHistory();
      });
    });
  }

  function renderJohariHistory() {
    const ul = document.getElementById('johari-history');
    if (!ul) return;
    const items = filterByCurrent(state.johariSessions, 'johari');
    if (!items.length) {
      ul.innerHTML = '<li class="muted">該当する履歴はありません。</li>';
      return;
    }
    ul.innerHTML = items.map(s => {
      const w = computeJohariWindows(s);
      return `<li data-id="${s.id}" class="${state.johariEditingId === s.id ? 'active' : ''}">
        <div class="h-meta"><b class="person-badge">${escapeHtml(s.personName || '無名')}</b> · ${escapeHtml(s.scope || '全体')} · ${formatDate(s.date)}</div>
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

  renderPersonBar();
  renderSocialHistory();
  renderEffortHistory();
  renderKolbHistory();
  renderValuesHistory();
  renderThinkingHistory();
  renderJohari();
  renderSummary();
})();
