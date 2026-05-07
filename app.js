(() => {
  const SETTINGS_KEY = 'nayami-settings-v1';
  const SOCIAL_KEY = 'nayami-social-v1';
  const EFFORT_KEY = 'nayami-effort-v1';
  const KOLB_KEY = 'nayami-kolb-v1';
  const VALUES_KEY = 'nayami-values-v1';
  const THINKING_KEY = 'nayami-thinking-v1';
  const JOHARI_KEY = 'nayami-johari-v1';
  const SUMMARY_KEY = 'nayami-summary-v1';

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

  document.getElementById('test-api').addEventListener('click', async () => {
    const btn = document.getElementById('test-api');
    state.settings.apiKey = apiKeyInput.value.trim();
    state.settings.model = modelSel.value;
    save(SETTINGS_KEY, state.settings);
    if (!state.settings.apiKey) {
      flash('APIキーを入力してください', 'error');
      return;
    }
    btn.classList.add('loading');
    try {
      const reply = await callClaude(
        'あなたは接続テスト用のアシスタントです。短く返答してください。',
        '接続テストです。「OK」とだけ返してください。'
      );
      flash('接続成功: ' + (reply.slice(0, 40) || 'OK'));
    } catch (err) {
      flash('接続失敗: ' + err.message, 'error');
    } finally {
      btn.classList.remove('loading');
    }
  });

  document.getElementById('export-btn').addEventListener('click', () => {
    const blob = new Blob([JSON.stringify({
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
    a.download = `prism-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  });

  document.getElementById('import-file').addEventListener('change', async e => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      if (Array.isArray(data.socialAssessments)) { state.socialAssessments = data.socialAssessments; save(SOCIAL_KEY, state.socialAssessments); }
      if (Array.isArray(data.effortAssessments)) { state.effortAssessments = data.effortAssessments; save(EFFORT_KEY, state.effortAssessments); }
      if (Array.isArray(data.kolbAssessments))   { state.kolbAssessments = data.kolbAssessments; save(KOLB_KEY, state.kolbAssessments); }
      if (Array.isArray(data.valuesAssessments)) { state.valuesAssessments = data.valuesAssessments; save(VALUES_KEY, state.valuesAssessments); }
      if (Array.isArray(data.thinkingAssessments)){ state.thinkingAssessments = data.thinkingAssessments; save(THINKING_KEY, state.thinkingAssessments); }
      if (Array.isArray(data.johariSessions))    { state.johariSessions = data.johariSessions; save(JOHARI_KEY, state.johariSessions); }
      if (Array.isArray(data.summaryAnalyses))   { state.summaryAnalyses = data.summaryAnalyses; save(SUMMARY_KEY, state.summaryAnalyses); }
      flash('インポートしました');
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
    state.socialAssessments = [];
    state.effortAssessments = [];
    state.kolbAssessments = [];
    state.valuesAssessments = [];
    state.thinkingAssessments = [];
    state.johariSessions = [];
    state.johariDraft = { selfTraits: [], othersTraits: [], extraSelf: [], extraOthers: [] };
    state.johariEditingId = null;
    state.summaryAnalyses = [];
    save(SOCIAL_KEY, state.socialAssessments);
    save(EFFORT_KEY, state.effortAssessments);
    save(KOLB_KEY, state.kolbAssessments);
    save(VALUES_KEY, state.valuesAssessments);
    save(THINKING_KEY, state.thinkingAssessments);
    save(JOHARI_KEY, state.johariSessions);
    save(SUMMARY_KEY, state.summaryAnalyses);
    renderSocialHistory();
    renderEffortHistory();
    renderKolbHistory();
    renderValuesHistory();
    renderThinkingHistory();
    renderJohari();
    renderSummary();
    flash('削除しました');
  });

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
  function flash(msg, kind) {
    const el = document.getElementById('toast');
    if (!el) return;
    clearTimeout(flashTimer);
    el.textContent = msg;
    el.className = 'toast' + (kind ? ' toast-' + kind : '');
    el.classList.remove('hidden');
    flashTimer = setTimeout(() => { el.classList.add('hidden'); }, 2800);
  }

  function truncate(s, n) {
    s = String(s || '');
    return s.length > n ? s.slice(0, n - 1) + '…' : s;
  }

  async function callClaude(systemPrompt, userPrompt) {
    if (!state.settings.apiKey) throw new Error('APIキーが設定されていません');
    let res;
    try {
      res = await fetch('https://api.anthropic.com/v1/messages', {
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
    } catch (e) {
      throw new Error('ネットワーク接続に失敗しました: ' + e.message);
    }
    if (!res.ok) {
      let detail = '';
      let parsed = null;
      try {
        const body = await res.text();
        detail = body.slice(0, 300);
        try { parsed = JSON.parse(body); } catch {}
      } catch {}
      const msg = parsed?.error?.message || detail;
      if (res.status === 401) {
        throw new Error('APIキーが正しくありません (401): ' + msg);
      }
      if (res.status === 403) {
        throw new Error('権限エラー (403): ' + msg);
      }
      if (res.status === 429) {
        throw new Error('レート制限に達しました (429): ' + msg);
      }
      if (res.status >= 500) {
        throw new Error(`Anthropic API サーバーエラー (${res.status}): しばらく待って再度お試しください`);
      }
      throw new Error(`${res.status} ${msg || res.statusText}`);
    }
    const data = await res.json();
    if (!data || !Array.isArray(data.content)) {
      throw new Error('予期しないAPI応答: ' + JSON.stringify(data).slice(0, 200));
    }
    return data.content.map(c => c.text || '').join('\n');
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
    if (typeof window.contributeToTwin === 'function') window.contributeToTwin('micron', { quizType: 'social', scores: scores });
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
    const axes = dims.map((d, i) => {
      const ang = -Math.PI / 2 + (i * 2 * Math.PI) / n;
      const lx = cx + Math.cos(ang) * (R + 18);
      const ly = cy + Math.sin(ang) * (R + 18);
      return `<line x1="${cx}" y1="${cy}" x2="${cx + Math.cos(ang) * R}" y2="${cy + Math.sin(ang) * R}" stroke="#334155" stroke-width="1"/>
              <text x="${lx}" y="${ly}" text-anchor="middle" dominant-baseline="middle" fill="${d.color}" font-size="11">${escapeHtml(d.label)}</text>`;
    }).join('');
    const polygon = `<polygon points="${pts.map(p => p.join(',')).join(' ')}" fill="rgba(99,102,241,0.25)" stroke="#6366f1" stroke-width="2"/>`;
    return `<svg width="260" height="260" viewBox="0 0 260 260">${axes}${polygon}</svg>`;
  }

  async function runSocialAICommentary(record) {
    const btn = document.getElementById('social-ai-comment');
    if (!btn) return;
    btn.classList.add('loading');
    try {
      const scoreStr = SOCIAL_DIMENSIONS.map(d => `${d.label}: ${record.scores[d.key]}`).join(', ');
      const text = await callClaude(
        'あなたは社会的スキル診断の専門家アドバイザーです。診断結果を見て、具体的で実践的なフィードバックを日本語で提供してください。',
        `社会的スキル診断の結果（0-100スケール）:\n${scoreStr}\n\nこの結果について、強み・課題・具体的な改善策を含む詳しい解説をお願いします。`
      );
      record.aiCommentary = text;
      save(SOCIAL_KEY, state.socialAssessments);
      const out = document.getElementById('social-ai-output');
      if (out) { out.textContent = text; out.style.display = ''; }
    } catch (err) {
      flash('AI解説に失敗しました: ' + err.message, 'error');
    } finally {
      btn.classList.remove('loading');
    }
  }

  // ---------- Effort assessment ----------
  const effortIntro = document.getElementById('effort-intro');
  const effortQuizEl = document.getElementById('effort-quiz');
  const effortResult = document.getElementById('effort-result');
  const effortQEl = document.getElementById('effort-question');
  const effortFill = document.getElementById('effort-progress-fill');
  const effortText = document.getElementById('effort-progress-text');

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
    effortQEl.innerHTML = `
      <div class="q-dim" style="color:${dim.color}">${escapeHtml(dim.label)}</div>
      <div class="q-text">${escapeHtml(q.text)}</div>`;
    effortFill.style.width = `${((idx + 1) / EFFORT_QUESTIONS.length) * 100}%`;
    effortText.textContent = `${idx + 1} / ${EFFORT_QUESTIONS.length}`;
    document.querySelectorAll('.effort-choice').forEach(b => {
      b.classList.toggle('selected', Number(b.dataset.val) === answers[idx]);
    });
    document.getElementById('effort-back').disabled = idx === 0;
  }

  function finishEffortQuiz() {
    const scores = computeScores(state.effortQuiz.answers, EFFORT_QUESTIONS, EFFORT_DIMENSIONS);
    const record = { id: 'ef_' + uid(), date: new Date().toISOString(), answers: state.effortQuiz.answers.slice(), scores, notes: '', aiCommentary: '' };
    state.effortAssessments.unshift(record);
    save(EFFORT_KEY, state.effortAssessments);
    if (typeof window.contributeToTwin === 'function') window.contributeToTwin('micron', { quizType: 'effort', scores: scores });
    state.effortQuiz = null;
    effortQuizEl.classList.add('hidden');
    effortIntro.classList.remove('hidden');
    showEffortResult(record);
    renderEffortHistory();
  }

  function computeScores(answers, questions, dimensions) {
    const sums = {}, counts = {};
    for (const d of dimensions) { sums[d.key] = 0; counts[d.key] = 0; }
    for (let i = 0; i < questions.length; i++) {
      const a = answers[i];
      if (a == null) continue;
      const dim = questions[i].dim;
      sums[dim] += a;
      counts[dim]++;
    }
    const out = {};
    for (const d of dimensions) {
      const max = counts[d.key] * 4, min = counts[d.key];
      out[d.key] = max > min ? Math.round(((sums[d.key] - min) / (max - min)) * 100) : 0;
    }
    return out;
  }

  function showEffortResult(record) {
    effortResult.classList.remove('hidden');
    const scores = record.scores;
    const sorted = EFFORT_DIMENSIONS.slice().sort((a, b) => scores[b.key] - scores[a.key]);
    const high = sorted[0], low = sorted[sorted.length - 1];
    const avg = Math.round(EFFORT_DIMENSIONS.reduce((s, d) => s + scores[d.key], 0) / EFFORT_DIMENSIONS.length);
    effortResult.innerHTML = `
      <div class="result-card">
        <div class="result-head"><h3>努力診断結果</h3><span class="muted">${escapeHtml(formatDate(record.date))}</span></div>
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
        <div class="result-interpret">${escapeHtml(interpretEffort(scores, high, low, avg))}</div>
        <div class="actions">
          <button id="effort-ai-comment">AIに詳しく解説してもらう</button>
          <button id="effort-retry">もう一度受ける</button>
        </div>
        <div id="effort-ai-output" class="ai-output" style="${record.aiCommentary ? '' : 'display:none'}">${escapeHtml(record.aiCommentary || '')}</div>
      </div>
    `;
    document.getElementById('effort-retry').addEventListener('click', () => document.getElementById('effort-start').click());
    document.getElementById('effort-ai-comment').addEventListener('click', () => runEffortAICommentary(record));
  }

  function interpretEffort(scores, high, low, avg) {
    const parts = [`平均 ${avg} の努力プロファイル。`];
    if (scores[high.key] - scores[low.key] >= 30) {
      parts.push(`${high.label} が突出し、${low.label} が相対的に低い。`);
    } else {
      parts.push('各次元がバランスよく発揮されている。');
    }
    const hints = {
      volume:    '量の基盤がある。質・設計の改善でさらに成果が伸びやすい。',
      quality:   '質の意識が高い。量も確保できると複利的に伸びる。',
      design:    '設計力がある。実行量が伴うと強力。',
      choice:    '選択眼がある。正しいことに正しく努力できる素地がある。',
      endurance: '継続力がある。燃え尽きに注意しながら活かすと長期で強い。',
    };
    if (hints[high.key]) parts.push(hints[high.key]);
    return parts.join(' ');
  }

  async function runEffortAICommentary(record) {
    const btn = document.getElementById('effort-ai-comment');
    if (!btn) return;
    btn.classList.add('loading');
    try {
      const scoreStr = EFFORT_DIMENSIONS.map(d => `${d.label}(${d.description}): ${record.scores[d.key]}`).join(', ');
      const text = await callClaude(
        'あなたは努力・学習習慣の専門コーチです。診断結果を見て、具体的で実践的なフィードバックを日本語で提供してください。',
        `努力診断の結果（0-100スケール）:\n${scoreStr}\n\nこの結果について、強み・課題・具体的な改善策を含む詳しい解説をお願いします。`
      );
      record.aiCommentary = text;
      save(EFFORT_KEY, state.effortAssessments);
      const out = document.getElementById('effort-ai-output');
      if (out) { out.textContent = text; out.style.display = ''; }
    } catch (err) {
      flash('AI解説に失敗しました: ' + err.message, 'error');
    } finally {
      btn.classList.remove('loading');
    }
  }

  // ---------- KOLB assessment ----------
  const kolbIntro = document.getElementById('kolb-intro');
  const kolbQuizEl = document.getElementById('kolb-quiz');
  const kolbResult = document.getElementById('kolb-result');
  const kolbQEl = document.getElementById('kolb-question');
  const kolbFill = document.getElementById('kolb-progress-fill');
  const kolbText = document.getElementById('kolb-progress-text');

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
    kolbQEl.innerHTML = `
      <div class="q-dim" style="color:${dim.color}">${escapeHtml(dim.label)}</div>
      <div class="q-text">${escapeHtml(q.text)}</div>`;
    kolbFill.style.width = `${((idx + 1) / KOLB_QUESTIONS.length) * 100}%`;
    kolbText.textContent = `${idx + 1} / ${KOLB_QUESTIONS.length}`;
    document.querySelectorAll('.kolb-choice').forEach(b => {
      b.classList.toggle('selected', Number(b.dataset.val) === answers[idx]);
    });
    document.getElementById('kolb-back').disabled = idx === 0;
  }

  function finishKolbQuiz() {
    const scores = computeScores(state.kolbQuiz.answers, KOLB_QUESTIONS, KOLB_DIMENSIONS);
    const record = { id: 'kb_' + uid(), date: new Date().toISOString(), answers: state.kolbQuiz.answers.slice(), scores, notes: '', aiCommentary: '' };
    state.kolbAssessments.unshift(record);
    save(KOLB_KEY, state.kolbAssessments);
    if (typeof window.contributeToTwin === 'function') window.contributeToTwin('micron', { quizType: 'kolb', scores: scores });
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
    const high = sorted[0], low = sorted[sorted.length - 1];
    const avg = Math.round(KOLB_DIMENSIONS.reduce((s, d) => s + scores[d.key], 0) / KOLB_DIMENSIONS.length);
    kolbResult.innerHTML = `
      <div class="result-card">
        <div class="result-head"><h3>学習スタイル診断結果</h3><span class="muted">${escapeHtml(formatDate(record.date))}</span></div>
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
        <div class="result-interpret">${escapeHtml(interpretKolb(scores, high, low, avg))}</div>
        <div class="actions">
          <button id="kolb-ai-comment">AIに詳しく解説してもらう</button>
          <button id="kolb-retry">もう一度受ける</button>
        </div>
        <div id="kolb-ai-output" class="ai-output" style="${record.aiCommentary ? '' : 'display:none'}">${escapeHtml(record.aiCommentary || '')}</div>
      </div>
    `;
    document.getElementById('kolb-retry').addEventListener('click', () => document.getElementById('kolb-start').click());
    document.getElementById('kolb-ai-comment').addEventListener('click', () => runKolbAICommentary(record));
  }

  function interpretKolb(scores, high, low, avg) {
    const styles = {
      why:  'Why型（Diverging）: 意味・目的から入るタイプ。動機付けが重要。',
      what: 'What型（Assimilating）: データ・理論から入るタイプ。根拠重視。',
      how:  'How型（Converging）: 手順・プロセスから入るタイプ。着実な実行者。',
      now:  'Now型（Accommodating）: まず行動するタイプ。体験から学ぶ。',
    };
    const parts = [`平均 ${avg}。支配的スタイル: ${styles[high.key] || high.key}`];
    if (scores[high.key] - scores[low.key] >= 30) {
      parts.push(`${high.label} と ${low.label} の差が顕著。`);
    }
    return parts.join(' ');
  }

  async function runKolbAICommentary(record) {
    const btn = document.getElementById('kolb-ai-comment');
    if (!btn) return;
    btn.classList.add('loading');
    try {
      const scoreStr = KOLB_DIMENSIONS.map(d => `${d.label}(${d.description}): ${record.scores[d.key]}`).join(', ');
      const text = await callClaude(
        'あなたは学習スタイル診断の専門家です。Kolb学習スタイル理論に基づき、診断結果を解説してください。',
        `学習スタイル診断の結果（0-100スケール）:\n${scoreStr}\n\nこの結果について、学習スタイルの特徴・強み・活かし方・補完すべき点を含む詳しい解説をお願いします。`
      );
      record.aiCommentary = text;
      save(KOLB_KEY, state.kolbAssessments);
      const out = document.getElementById('kolb-ai-output');
      if (out) { out.textContent = text; out.style.display = ''; }
    } catch (err) {
      flash('AI解説に失敗しました: ' + err.message, 'error');
    } finally {
      btn.classList.remove('loading');
    }
  }

  // ---------- Values assessment ----------
  const valuesIntro = document.getElementById('values-intro');
  const valuesQuizEl = document.getElementById('values-quiz');
  const valuesResult = document.getElementById('values-result');
  const valuesQEl = document.getElementById('values-question');
  const valuesFill = document.getElementById('values-progress-fill');
  const valuesText = document.getElementById('values-progress-text');

  document.getElementById('values-start').addEventListener('click', () => {
    state.valuesQuiz = { idx: 0, answers: new Array(VALUES_QUESTIONS.length).fill(null) };
    valuesIntro.classList.add('hidden');
    valuesResult.classList.add('hidden');
    valuesQuizEl.classList.remove('hidden');
    renderValuesQuestion();
  });

  document.querySelectorAll('.values-choice').forEach(btn => {
    btn.addEventListener('click', () => {
      if (!state.valuesQuiz) return;
      state.valuesQuiz.answers[state.valuesQuiz.idx] = Number(btn.dataset.val);
      if (state.valuesQuiz.idx < VALUES_QUESTIONS.length - 1) {
        state.valuesQuiz.idx++;
        renderValuesQuestion();
      } else {
        finishValuesQuiz();
      }
    });
  });

  document.getElementById('values-back').addEventListener('click', () => {
    if (!state.valuesQuiz || state.valuesQuiz.idx === 0) return;
    state.valuesQuiz.idx--;
    renderValuesQuestion();
  });

  document.getElementById('values-cancel').addEventListener('click', () => {
    if (!confirm('診断を中断しますか？（回答は保存されません）')) return;
    state.valuesQuiz = null;
    valuesQuizEl.classList.add('hidden');
    valuesIntro.classList.remove('hidden');
  });

  function renderValuesQuestion() {
    const { idx, answers } = state.valuesQuiz;
    const q = VALUES_QUESTIONS[idx];
    const dim = VALUES_DIMENSIONS.find(d => d.key === q.dim);
    valuesQEl.innerHTML = `
      <div class="q-dim" style="color:${dim.color}">${escapeHtml(dim.label)}</div>
      <div class="q-text">${escapeHtml(q.text)}</div>`;
    valuesFill.style.width = `${((idx + 1) / VALUES_QUESTIONS.length) * 100}%`;
    valuesText.textContent = `${idx + 1} / ${VALUES_QUESTIONS.length}`;
    document.querySelectorAll('.values-choice').forEach(b => {
      b.classList.toggle('selected', Number(b.dataset.val) === answers[idx]);
    });
    document.getElementById('values-back').disabled = idx === 0;
  }

  function finishValuesQuiz() {
    const scores = computeScores(state.valuesQuiz.answers, VALUES_QUESTIONS, VALUES_DIMENSIONS);
    const record = { id: 'vl_' + uid(), date: new Date().toISOString(), answers: state.valuesQuiz.answers.slice(), scores, notes: '', aiCommentary: '' };
    state.valuesAssessments.unshift(record);
    save(VALUES_KEY, state.valuesAssessments);
    if (typeof window.contributeToTwin === 'function') window.contributeToTwin('micron', { quizType: 'values', scores: scores });
    state.valuesQuiz = null;
    valuesQuizEl.classList.add('hidden');
    valuesIntro.classList.remove('hidden');
    showValuesResult(record);
    renderValuesHistory();
  }

  function showValuesResult(record) {
    valuesResult.classList.remove('hidden');
    const scores = record.scores;
    const sorted = VALUES_DIMENSIONS.slice().sort((a, b) => scores[b.key] - scores[a.key]);
    const high = sorted[0], low = sorted[sorted.length - 1];
    const avg = Math.round(VALUES_DIMENSIONS.reduce((s, d) => s + scores[d.key], 0) / VALUES_DIMENSIONS.length);
    valuesResult.innerHTML = `
      <div class="result-card">
        <div class="result-head"><h3>価値観診断結果</h3><span class="muted">${escapeHtml(formatDate(record.date))}</span></div>
        <div class="result-grid">
          ${renderRadarSvg(scores, VALUES_DIMENSIONS)}
          <div class="result-scores">
            ${VALUES_DIMENSIONS.map(d => `
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
        <div class="result-interpret">${escapeHtml(interpretValues(scores, high, low, avg))}</div>
        <div class="actions">
          <button id="values-ai-comment">AIに詳しく解説してもらう</button>
          <button id="values-retry">もう一度受ける</button>
        </div>
        <div id="values-ai-output" class="ai-output" style="${record.aiCommentary ? '' : 'display:none'}">${escapeHtml(record.aiCommentary || '')}</div>
      </div>
    `;
    document.getElementById('values-retry').addEventListener('click', () => document.getElementById('values-start').click());
    document.getElementById('values-ai-comment').addEventListener('click', () => runValuesAICommentary(record));
  }

  function interpretValues(scores, high, low, avg) {
    const parts = [`平均 ${avg}。最も強い価値観: ${high.label}（${high.description}）`];
    if (scores[high.key] >= 70) parts.push('この価値観は非常に強く表れています。');
    if (scores[low.key] <= 30) parts.push(`${low.label} は相対的に低め。`);
    const tensions = {
      autonomy_stability: '自律と安定は時にトレードオフ。どちらを優先するか状況に応じた判断が必要。',
      achievement_relation: '達成と関係のバランスを意識的に取ることで、孤立せずに結果も出せる。',
      growth_stability: '成長への渇望と安定への欲求を統合できる環境・方法を探すと良い。',
    };
    const key = `${high.key}_${low.key}`;
    if (tensions[key]) parts.push(tensions[key]);
    return parts.join(' ');
  }

  async function runValuesAICommentary(record) {
    const btn = document.getElementById('values-ai-comment');
    if (!btn) return;
    btn.classList.add('loading');
    try {
      const scoreStr = VALUES_DIMENSIONS.map(d => `${d.label}(${d.description}): ${record.scores[d.key]}`).join(', ');
      const text = await callClaude(
        'あなたは価値観・動機診断の専門家です。診断結果を見て、その人の価値観プロファイルを深く解説してください。',
        `価値観診断の結果（0-100スケール）:\n${scoreStr}\n\nこの結果について、価値観の特徴・キャリアや生活への影響・活かし方を含む詳しい解説をお願いします。`
      );
      record.aiCommentary = text;
      save(VALUES_KEY, state.valuesAssessments);
      const out = document.getElementById('values-ai-output');
      if (out) { out.textContent = text; out.style.display = ''; }
    } catch (err) {
      flash('AI解説に失敗しました: ' + err.message, 'error');
    } finally {
      btn.classList.remove('loading');
    }
  }

  // ---------- Thinking assessment ----------
  const thinkingIntro = document.getElementById('thinking-intro');
  const thinkingQuizEl = document.getElementById('thinking-quiz');
  const thinkingResult = document.getElementById('thinking-result');
  const thinkingQEl = document.getElementById('thinking-question');
  const thinkingFill = document.getElementById('thinking-progress-fill');
  const thinkingText = document.getElementById('thinking-progress-text');

  document.getElementById('thinking-start').addEventListener('click', () => {
    state.thinkingQuiz = { idx: 0, answers: new Array(THINKING_QUESTIONS.length).fill(null) };
    thinkingIntro.classList.add('hidden');
    thinkingResult.classList.add('hidden');
    thinkingQuizEl.classList.remove('hidden');
    renderThinkingQuestion();
  });

  document.querySelectorAll('.thinking-choice').forEach(btn => {
    btn.addEventListener('click', () => {
      if (!state.thinkingQuiz) return;
      state.thinkingQuiz.answers[state.thinkingQuiz.idx] = Number(btn.dataset.val);
      if (state.thinkingQuiz.idx < THINKING_QUESTIONS.length - 1) {
        state.thinkingQuiz.idx++;
        renderThinkingQuestion();
      } else {
        finishThinkingQuiz();
      }
    });
  });

  document.getElementById('thinking-back').addEventListener('click', () => {
    if (!state.thinkingQuiz || state.thinkingQuiz.idx === 0) return;
    state.thinkingQuiz.idx--;
    renderThinkingQuestion();
  });

  document.getElementById('thinking-cancel').addEventListener('click', () => {
    if (!confirm('診断を中断しますか？（回答は保存されません）')) return;
    state.thinkingQuiz = null;
    thinkingQuizEl.classList.add('hidden');
    thinkingIntro.classList.remove('hidden');
  });

  function renderThinkingQuestion() {
    const { idx, answers } = state.thinkingQuiz;
    const q = THINKING_QUESTIONS[idx];
    const dim = THINKING_DIMENSIONS.find(d => d.key === q.dim);
    thinkingQEl.innerHTML = `
      <div class="q-dim" style="color:${dim.color}">${escapeHtml(dim.label)}</div>
      <div class="q-text">${escapeHtml(q.text)}</div>`;
    thinkingFill.style.width = `${((idx + 1) / THINKING_QUESTIONS.length) * 100}%`;
    thinkingText.textContent = `${idx + 1} / ${THINKING_QUESTIONS.length}`;
    document.querySelectorAll('.thinking-choice').forEach(b => {
      b.classList.toggle('selected', Number(b.dataset.val) === answers[idx]);
    });
    document.getElementById('thinking-back').disabled = idx === 0;
  }

  function finishThinkingQuiz() {
    const scores = computeScores(state.thinkingQuiz.answers, THINKING_QUESTIONS, THINKING_DIMENSIONS);
    const record = { id: 'th_' + uid(), date: new Date().toISOString(), answers: state.thinkingQuiz.answers.slice(), scores, notes: '', aiCommentary: '' };
    state.thinkingAssessments.unshift(record);
    save(THINKING_KEY, state.thinkingAssessments);
    if (typeof window.contributeToTwin === 'function') window.contributeToTwin('micron', { quizType: 'thinking', scores: scores });
    state.thinkingQuiz = null;
    thinkingQuizEl.classList.add('hidden');
    thinkingIntro.classList.remove('hidden');
    showThinkingResult(record);
    renderThinkingHistory();
  }

  function showThinkingResult(record) {
    thinkingResult.classList.remove('hidden');
    const scores = record.scores;
    const sorted = THINKING_DIMENSIONS.slice().sort((a, b) => scores[b.key] - scores[a.key]);
    const high = sorted[0], low = sorted[sorted.length - 1];
    const avg = Math.round(THINKING_DIMENSIONS.reduce((s, d) => s + scores[d.key], 0) / THINKING_DIMENSIONS.length);
    thinkingResult.innerHTML = `
      <div class="result-card">
        <div class="result-head"><h3>思考スタイル診断結果</h3><span class="muted">${escapeHtml(formatDate(record.date))}</span></div>
        <div class="result-grid">
          ${renderRadarSvg(scores, THINKING_DIMENSIONS)}
          <div class="result-scores">
            ${THINKING_DIMENSIONS.map(d => `
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
        <div class="result-interpret">${escapeHtml(interpretThinking(scores, high, low, avg))}</div>
        <div class="actions">
          <button id="thinking-ai-comment">AIに詳しく解説してもらう</button>
          <button id="thinking-retry">もう一度受ける</button>
        </div>
        <div id="thinking-ai-output" class="ai-output" style="${record.aiCommentary ? '' : 'display:none'}">${escapeHtml(record.aiCommentary || '')}</div>
      </div>
    `;
    document.getElementById('thinking-retry').addEventListener('click', () => document.getElementById('thinking-start').click());
    document.getElementById('thinking-ai-comment').addEventListener('click', () => runThinkingAICommentary(record));
  }

  function interpretThinking(scores, high, low, avg) {
    const desc = {
      logical:    '論理型: 因果関係・証明を重視する。構造化された思考が強み。',
      intuitive:  '直感型: パターン認識・素早い判断が得意。',
      creative:   '創造型: 既成概念を超えた発想が強み。',
      systematic: '体系型: 情報整理・プロセス設計が得意。',
      holistic:   '全体型: 大局観・文脈把握が強み。',
    };
    const parts = [`平均 ${avg}。支配的スタイル: ${desc[high.key] || high.key}`];
    if (scores[high.key] - scores[low.key] >= 30) parts.push(`${low.label} との差が大きい。補完的な思考を意識的に取り入れると良い。`);
    return parts.join(' ');
  }

  async function runThinkingAICommentary(record) {
    const btn = document.getElementById('thinking-ai-comment');
    if (!btn) return;
    btn.classList.add('loading');
    try {
      const scoreStr = THINKING_DIMENSIONS.map(d => `${d.label}(${d.description}): ${record.scores[d.key]}`).join(', ');
      const text = await callClaude(
        'あなたは認知スタイル・思考パターンの専門家です。診断結果を見て、思考スタイルの特徴を解説してください。',
        `思考スタイル診断の結果（0-100スケール）:\n${scoreStr}\n\nこの結果について、思考の強み・弱み・活かし方・補完すべき点を含む詳しい解説をお願いします。`
      );
      record.aiCommentary = text;
      save(THINKING_KEY, state.thinkingAssessments);
      const out = document.getElementById('thinking-ai-output');
      if (out) { out.textContent = text; out.style.display = ''; }
    } catch (err) {
      flash('AI解説に失敗しました: ' + err.message, 'error');
    } finally {
      btn.classList.remove('loading');
    }
  }

  // ---------- History renders ----------
  function renderSocialHistory() {
    const el = document.getElementById('social-history');
    if (!el) return;
    if (!state.socialAssessments.length) { el.innerHTML = '<p class="muted">まだ診断履歴がありません。</p>'; return; }
    el.innerHTML = state.socialAssessments.map((r, i) => {
      const sorted = SOCIAL_DIMENSIONS.slice().sort((a, b) => r.scores[b.key] - r.scores[a.key]);
      const high = sorted[0];
      return `
        <div class="history-item">
          <div class="history-head">
            <span class="history-date">${escapeHtml(formatDate(r.date))}</span>
            <span class="history-badge" style="background:${high.color}20;color:${high.color}">${escapeHtml(high.label)} 最高</span>
            <button class="icon-btn delete-btn" data-type="social" data-id="${escapeAttr(r.id)}" title="削除">×</button>
          </div>
          <div class="mini-scores">
            ${SOCIAL_DIMENSIONS.map(d => `<span style="color:${d.color}">${escapeHtml(d.label.slice(0,2))}:${r.scores[d.key]}</span>`).join(' ')}
          </div>
          ${r.notes ? `<div class="history-notes">${escapeHtml(r.notes)}</div>` : ''}
        </div>
      `;
    }).join('');
    el.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (!confirm('この記録を削除しますか？')) return;
        const id = btn.dataset.id;
        state.socialAssessments = state.socialAssessments.filter(r => r.id !== id);
        save(SOCIAL_KEY, state.socialAssessments);
        renderSocialHistory();
      });
    });
  }

  function renderEffortHistory() {
    const el = document.getElementById('effort-history');
    if (!el) return;
    if (!state.effortAssessments.length) { el.innerHTML = '<p class="muted">まだ診断履歴がありません。</p>'; return; }
    el.innerHTML = state.effortAssessments.map(r => {
      const sorted = EFFORT_DIMENSIONS.slice().sort((a, b) => r.scores[b.key] - r.scores[a.key]);
      const high = sorted[0];
      return `
        <div class="history-item">
          <div class="history-head">
            <span class="history-date">${escapeHtml(formatDate(r.date))}</span>
            <span class="history-badge" style="background:${high.color}20;color:${high.color}">${escapeHtml(high.label)} 最高</span>
            <button class="icon-btn delete-btn" data-type="effort" data-id="${escapeAttr(r.id)}" title="削除">×</button>
          </div>
          <div class="mini-scores">
            ${EFFORT_DIMENSIONS.map(d => `<span style="color:${d.color}">${escapeHtml(d.label.slice(0,2))}:${r.scores[d.key]}</span>`).join(' ')}
          </div>
        </div>
      `;
    }).join('');
    el.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (!confirm('この記録を削除しますか？')) return;
        state.effortAssessments = state.effortAssessments.filter(r => r.id !== btn.dataset.id);
        save(EFFORT_KEY, state.effortAssessments);
        renderEffortHistory();
      });
    });
  }

  function renderKolbHistory() {
    const el = document.getElementById('kolb-history');
    if (!el) return;
    if (!state.kolbAssessments.length) { el.innerHTML = '<p class="muted">まだ診断履歴がありません。</p>'; return; }
    el.innerHTML = state.kolbAssessments.map(r => {
      const sorted = KOLB_DIMENSIONS.slice().sort((a, b) => r.scores[b.key] - r.scores[a.key]);
      const high = sorted[0];
      return `
        <div class="history-item">
          <div class="history-head">
            <span class="history-date">${escapeHtml(formatDate(r.date))}</span>
            <span class="history-badge" style="background:${high.color}20;color:${high.color}">${escapeHtml(high.label)} 優位</span>
            <button class="icon-btn delete-btn" data-id="${escapeAttr(r.id)}" title="削除">×</button>
          </div>
          <div class="mini-scores">
            ${KOLB_DIMENSIONS.map(d => `<span style="color:${d.color}">${escapeHtml(d.label.slice(0,2))}:${r.scores[d.key]}</span>`).join(' ')}
          </div>
        </div>
      `;
    }).join('');
    el.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (!confirm('この記録を削除しますか？')) return;
        state.kolbAssessments = state.kolbAssessments.filter(r => r.id !== btn.dataset.id);
        save(KOLB_KEY, state.kolbAssessments);
        renderKolbHistory();
      });
    });
  }

  function renderValuesHistory() {
    const el = document.getElementById('values-history');
    if (!el) return;
    if (!state.valuesAssessments.length) { el.innerHTML = '<p class="muted">まだ診断履歴がありません。</p>'; return; }
    el.innerHTML = state.valuesAssessments.map(r => {
      const sorted = VALUES_DIMENSIONS.slice().sort((a, b) => r.scores[b.key] - r.scores[a.key]);
      const high = sorted[0];
      return `
        <div class="history-item">
          <div class="history-head">
            <span class="history-date">${escapeHtml(formatDate(r.date))}</span>
            <span class="history-badge" style="background:${high.color}20;color:${high.color}">${escapeHtml(high.label)} 優位</span>
            <button class="icon-btn delete-btn" data-id="${escapeAttr(r.id)}" title="削除">×</button>
          </div>
          <div class="mini-scores">
            ${VALUES_DIMENSIONS.map(d => `<span style="color:${d.color}">${escapeHtml(d.label.slice(0,2))}:${r.scores[d.key]}</span>`).join(' ')}
          </div>
        </div>
      `;
    }).join('');
    el.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (!confirm('この記録を削除しますか？')) return;
        state.valuesAssessments = state.valuesAssessments.filter(r => r.id !== btn.dataset.id);
        save(VALUES_KEY, state.valuesAssessments);
        renderValuesHistory();
      });
    });
  }

  function renderThinkingHistory() {
    const el = document.getElementById('thinking-history');
    if (!el) return;
    if (!state.thinkingAssessments.length) { el.innerHTML = '<p class="muted">まだ診断履歴がありません。</p>'; return; }
    el.innerHTML = state.thinkingAssessments.map(r => {
      const sorted = THINKING_DIMENSIONS.slice().sort((a, b) => r.scores[b.key] - r.scores[a.key]);
      const high = sorted[0];
      return `
        <div class="history-item">
          <div class="history-head">
            <span class="history-date">${escapeHtml(formatDate(r.date))}</span>
            <span class="history-badge" style="background:${high.color}20;color:${high.color}">${escapeHtml(high.label)} 優位</span>
            <button class="icon-btn delete-btn" data-id="${escapeAttr(r.id)}" title="削除">×</button>
          </div>
          <div class="mini-scores">
            ${THINKING_DIMENSIONS.map(d => `<span style="color:${d.color}">${escapeHtml(d.label.slice(0,2))}:${r.scores[d.key]}</span>`).join(' ')}
          </div>
        </div>
      `;
    }).join('');
    el.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (!confirm('この記録を削除しますか？')) return;
        state.thinkingAssessments = state.thinkingAssessments.filter(r => r.id !== btn.dataset.id);
        save(THINKING_KEY, state.thinkingAssessments);
        renderThinkingHistory();
      });
    });
  }

  // ---------- Johari Window ----------
  function renderJohari() {
    renderJohariDraft();
    renderJohariHistory();
  }

  function renderJohariDraft() {
    const draftEl = document.getElementById('johari-draft');
    if (!draftEl) return;
    const d = state.johariDraft;
    draftEl.innerHTML = `
      <div class="johari-section">
        <h4>自分が選ぶ特性（自己認識）</h4>
        <div class="trait-grid" id="self-traits">
          ${JOHARI_TRAITS.map(t => `
            <button class="trait-btn ${d.selfTraits.includes(t) ? 'selected' : ''}" data-trait="${escapeAttr(t)}" data-target="self">${escapeHtml(t)}</button>
          `).join('')}
        </div>
        <div class="extra-traits">
          <input type="text" id="extra-self-input" placeholder="その他の特性を入力…" class="trait-input">
          <button id="add-extra-self">追加</button>
        </div>
        ${d.extraSelf.length ? `<div class="extra-list">${d.extraSelf.map(t => `<span class="extra-tag">${escapeHtml(t)} <button class="remove-extra" data-target="self" data-trait="${escapeAttr(t)}">×</button></span>`).join('')}</div>` : ''}
      </div>
      <div class="johari-section">
        <h4>他者が選んだ特性（他者評価）</h4>
        <div class="trait-grid" id="others-traits">
          ${JOHARI_TRAITS.map(t => `
            <button class="trait-btn ${d.othersTraits.includes(t) ? 'selected' : ''}" data-trait="${escapeAttr(t)}" data-target="others">${escapeHtml(t)}</button>
          `).join('')}
        </div>
        <div class="extra-traits">
          <input type="text" id="extra-others-input" placeholder="その他の特性を入力…" class="trait-input">
          <button id="add-extra-others">追加</button>
        </div>
        ${d.extraOthers.length ? `<div class="extra-list">${d.extraOthers.map(t => `<span class="extra-tag">${escapeHtml(t)} <button class="remove-extra" data-target="others" data-trait="${escapeAttr(t)}">×</button></span>`).join('')}</div>` : ''}
      </div>
      <div class="johari-actions">
        <button id="johari-save">${state.johariEditingId ? '更新する' : '記録する'}</button>
        ${state.johariEditingId ? '<button id="johari-cancel-edit">キャンセル</button>' : ''}
      </div>
    `;

    draftEl.querySelectorAll('.trait-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.target;
        const trait = btn.dataset.trait;
        const list = target === 'self' ? d.selfTraits : d.othersTraits;
        const idx = list.indexOf(trait);
        if (idx === -1) list.push(trait); else list.splice(idx, 1);
        renderJohariDraft();
      });
    });

    document.getElementById('add-extra-self').addEventListener('click', () => {
      const input = document.getElementById('extra-self-input');
      const val = input.value.trim();
      if (val && !d.extraSelf.includes(val)) { d.extraSelf.push(val); renderJohariDraft(); }
    });
    document.getElementById('add-extra-others').addEventListener('click', () => {
      const input = document.getElementById('extra-others-input');
      const val = input.value.trim();
      if (val && !d.extraOthers.includes(val)) { d.extraOthers.push(val); renderJohariDraft(); }
    });

    draftEl.querySelectorAll('.remove-extra').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.target;
        const trait = btn.dataset.trait;
        if (target === 'self') d.extraSelf = d.extraSelf.filter(t => t !== trait);
        else d.extraOthers = d.extraOthers.filter(t => t !== trait);
        renderJohariDraft();
      });
    });

    document.getElementById('johari-save').addEventListener('click', () => {
      const self = [...d.selfTraits, ...d.extraSelf];
      const others = [...d.othersTraits, ...d.extraOthers];
      if (!self.length && !others.length) { flash('特性を選択してください', 'error'); return; }
      if (state.johariEditingId) {
        const idx = state.johariSessions.findIndex(s => s.id === state.johariEditingId);
        if (idx !== -1) {
          state.johariSessions[idx] = { ...state.johariSessions[idx], selfTraits: self, othersTraits: others, date: new Date().toISOString() };
        }
        state.johariEditingId = null;
      } else {
        state.johariSessions.unshift({ id: 'jh_' + uid(), date: new Date().toISOString(), selfTraits: self, othersTraits: others });
      }
      state.johariDraft = { selfTraits: [], othersTraits: [], extraSelf: [], extraOthers: [] };
      save(JOHARI_KEY, state.johariSessions);
      renderJohari();
      flash('ジョハリの窓を記録しました');
    });

    const cancelBtn = document.getElementById('johari-cancel-edit');
    if (cancelBtn) cancelBtn.addEventListener('click', () => {
      state.johariEditingId = null;
      state.johariDraft = { selfTraits: [], othersTraits: [], extraSelf: [], extraOthers: [] };
      renderJohariDraft();
    });
  }

  function renderJohariHistory() {
    const el = document.getElementById('johari-history');
    if (!el) return;
    if (!state.johariSessions.length) { el.innerHTML = '<p class="muted">まだ記録がありません。</p>'; return; }
    el.innerHTML = state.johariSessions.map(s => {
      const self = new Set(s.selfTraits);
      const others = new Set(s.othersTraits);
      const open = s.selfTraits.filter(t => others.has(t));
      const blind = s.othersTraits.filter(t => !self.has(t));
      const facade = s.selfTraits.filter(t => !others.has(t));
      return `
        <div class="history-item johari-item">
          <div class="history-head">
            <span class="history-date">${escapeHtml(formatDate(s.date))}</span>
            <div class="johari-item-actions">
              <button class="icon-btn edit-johari" data-id="${escapeAttr(s.id)}">✎</button>
              <button class="icon-btn delete-btn" data-id="${escapeAttr(s.id)}" title="削除">×</button>
            </div>
          </div>
          <div class="johari-mini-grid">
            <div class="johari-cell open"><b>開放領域</b><br>${open.map(t => escapeHtml(t)).join('、') || '—'}</div>
            <div class="johari-cell blind"><b>盲点領域</b><br>${blind.map(t => escapeHtml(t)).join('、') || '—'}</div>
            <div class="johari-cell facade"><b>秘密領域</b><br>${facade.map(t => escapeHtml(t)).join('、') || '—'}</div>
            <div class="johari-cell unknown"><b>未知領域</b><br><span class="muted">選ばれていない特性</span></div>
          </div>
        </div>
      `;
    }).join('');

    el.querySelectorAll('.edit-johari').forEach(btn => {
      btn.addEventListener('click', () => {
        const s = state.johariSessions.find(x => x.id === btn.dataset.id);
        if (!s) return;
        state.johariEditingId = s.id;
        state.johariDraft = {
          selfTraits: s.selfTraits.filter(t => JOHARI_TRAITS.includes(t)),
          othersTraits: s.othersTraits.filter(t => JOHARI_TRAITS.includes(t)),
          extraSelf: s.selfTraits.filter(t => !JOHARI_TRAITS.includes(t)),
          extraOthers: s.othersTraits.filter(t => !JOHARI_TRAITS.includes(t)),
        };
        renderJohariDraft();
        document.getElementById('johari-draft').scrollIntoView({ behavior: 'smooth' });
      });
    });

    el.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (!confirm('この記録を削除しますか？')) return;
        state.johariSessions = state.johariSessions.filter(s => s.id !== btn.dataset.id);
        save(JOHARI_KEY, state.johariSessions);
        renderJohariHistory();
      });
    });
  }

  // ---------- Summary ----------
  function renderSummary() {
    const el = document.getElementById('summary-content');
    if (!el) return;
    const hasAny = state.socialAssessments.length || state.effortAssessments.length ||
                   state.kolbAssessments.length || state.valuesAssessments.length ||
                   state.thinkingAssessments.length || state.johariSessions.length;
    if (!hasAny) {
      el.innerHTML = '<p class="muted">まだ診断データがありません。各診断を受けるとここに集計が表示されます。</p>';
      return;
    }
    const sections = [];
    if (state.socialAssessments.length) {
      const latest = state.socialAssessments[0];
      sections.push(`<div class="summary-section"><h4>ソーシャルスキル（最新）</h4>${renderMiniScores(latest.scores, SOCIAL_DIMENSIONS)}</div>`);
    }
    if (state.effortAssessments.length) {
      const latest = state.effortAssessments[0];
      sections.push(`<div class="summary-section"><h4>努力プロファイル（最新）</h4>${renderMiniScores(latest.scores, EFFORT_DIMENSIONS)}</div>`);
    }
    if (state.kolbAssessments.length) {
      const latest = state.kolbAssessments[0];
      sections.push(`<div class="summary-section"><h4>学習スタイル（最新）</h4>${renderMiniScores(latest.scores, KOLB_DIMENSIONS)}</div>`);
    }
    if (state.valuesAssessments.length) {
      const latest = state.valuesAssessments[0];
      sections.push(`<div class="summary-section"><h4>価値観プロファイル（最新）</h4>${renderMiniScores(latest.scores, VALUES_DIMENSIONS)}</div>`);
    }
    if (state.thinkingAssessments.length) {
      const latest = state.thinkingAssessments[0];
      sections.push(`<div class="summary-section"><h4>思考スタイル（最新）</h4>${renderMiniScores(latest.scores, THINKING_DIMENSIONS)}</div>`);
    }
    if (state.johariSessions.length) {
      const latest = state.johariSessions[0];
      const self = new Set(latest.selfTraits);
      const others = new Set(latest.othersTraits);
      const open = latest.selfTraits.filter(t => others.has(t));
      sections.push(`<div class="summary-section"><h4>ジョハリの窓（最新）</h4><p>開放領域: ${open.map(t => escapeHtml(t)).join('、') || '—'}</p></div>`);
    }
    el.innerHTML = sections.join('') + `
      <div class="summary-actions">
        <button id="summary-ai-btn">AIに総合分析してもらう</button>
      </div>
      <div id="summary-ai-output" class="ai-output" style="display:none"></div>
      ${state.summaryAnalyses.length ? `
        <div class="summary-history">
          <h4>過去のAI分析</h4>
          ${state.summaryAnalyses.map(a => `
            <div class="history-item">
              <div class="history-head">
                <span class="history-date">${escapeHtml(formatDate(a.date))}</span>
                <button class="icon-btn delete-btn" data-id="${escapeAttr(a.id)}" title="削除">×</button>
              </div>
              <div class="summary-ai-text">${escapeHtml(a.text)}</div>
            </div>
          `).join('')}
        </div>
      ` : ''}
    `;
    document.getElementById('summary-ai-btn').addEventListener('click', runSummaryAI);
    el.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (!confirm('この分析を削除しますか？')) return;
        state.summaryAnalyses = state.summaryAnalyses.filter(a => a.id !== btn.dataset.id);
        save(SUMMARY_KEY, state.summaryAnalyses);
        renderSummary();
      });
    });
  }

  function renderMiniScores(scores, dims) {
    return `<div class="mini-score-grid">${dims.map(d => `
      <div class="mini-score-item">
        <span class="mini-label" style="color:${d.color}">${escapeHtml(d.label)}</span>
        <div class="score-bar-wrap"><div class="score-bar" style="width:${scores[d.key]}%;background:${d.color}"></div></div>
        <span class="mini-val">${scores[d.key]}</span>
      </div>
    `).join('')}</div>`;
  }

  async function runSummaryAI() {
    const btn = document.getElementById('summary-ai-btn');
    if (!btn) return;
    btn.classList.add('loading');
    try {
      const parts = [];
      if (state.socialAssessments.length) {
        const s = state.socialAssessments[0].scores;
        parts.push('【ソーシャルスキル】' + SOCIAL_DIMENSIONS.map(d => `${d.label}:${s[d.key]}`).join(', '));
      }
      if (state.effortAssessments.length) {
        const s = state.effortAssessments[0].scores;
        parts.push('【努力プロファイル】' + EFFORT_DIMENSIONS.map(d => `${d.label}:${s[d.key]}`).join(', '));
      }
      if (state.kolbAssessments.length) {
        const s = state.kolbAssessments[0].scores;
        parts.push('【学習スタイル】' + KOLB_DIMENSIONS.map(d => `${d.label}:${s[d.key]}`).join(', '));
      }
      if (state.valuesAssessments.length) {
        const s = state.valuesAssessments[0].scores;
        parts.push('【価値観】' + VALUES_DIMENSIONS.map(d => `${d.label}:${s[d.key]}`).join(', '));
      }
      if (state.thinkingAssessments.length) {
        const s = state.thinkingAssessments[0].scores;
        parts.push('【思考スタイル】' + THINKING_DIMENSIONS.map(d => `${d.label}:${s[d.key]}`).join(', '));
      }
      if (state.johariSessions.length) {
        const j = state.johariSessions[0];
        const self = new Set(j.selfTraits);
        const others = new Set(j.othersTraits);
        const open = j.selfTraits.filter(t => others.has(t));
        parts.push('【ジョハリ開放領域】' + (open.join('、') || 'なし'));
      }
      const text = await callClaude(
        'あなたは自己分析・人材開発の専門家です。複数の診断結果を統合して、その人の総合的なプロファイルと成長への提言を日本語で提供してください。',
        `以下の診断結果を統合的に分析してください:\n\n${parts.join('\n')}\n\n強み・課題・相互作用・成長のための具体的な提言をお願いします。`
      );
      const record = { id: 'sm_' + uid(), date: new Date().toISOString(), text };
      state.summaryAnalyses.unshift(record);
      save(SUMMARY_KEY, state.summaryAnalyses);
      const out = document.getElementById('summary-ai-output');
      if (out) { out.textContent = text; out.style.display = ''; }
    } catch (err) {
      flash('AI分析に失敗しました: ' + err.message, 'error');
    } finally {
      btn.classList.remove('loading');
    }
  }

  // ---------- Init ----------
  renderSocialHistory();
  renderEffortHistory();
  renderKolbHistory();
  renderValuesHistory();
  renderThinkingHistory();
  renderJohari();
  renderSummary();
})();
