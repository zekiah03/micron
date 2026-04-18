(() => {
  const STORE_KEY = 'nayami-seeds-v1';
  const SETTINGS_KEY = 'nayami-settings-v1';
  const HISTORY_KEY = 'nayami-ai-history-v1';
  const AXES_KEY = 'nayami-custom-axes-v1';
  const REASONS_KEY = 'nayami-reasons-v1';
  const POSITIONS_KEY = 'nayami-positions-v1';
  const SESSIONS_KEY = 'nayami-sessions-v1';

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
    editingId: null,
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
      flash('インポートしました');
      renderList();
      renderAxesSettings();
      renderCustomAxesInForm();
      renderReasonsInForm();
      renderSessions();
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
  });

  document.getElementById('clear-btn').addEventListener('click', () => {
    if (!confirm('すべての記録・理由・分析履歴・位置情報・セッションを削除します。よろしいですか？')) return;
    state.seeds = [];
    state.history = [];
    state.reasons = [];
    state.positions = {};
    state.sessions = [];
    save(STORE_KEY, state.seeds);
    save(HISTORY_KEY, state.history);
    save(REASONS_KEY, state.reasons);
    save(POSITIONS_KEY, state.positions);
    save(SESSIONS_KEY, state.sessions);
    renderList();
    renderHistory();
    renderReasonsInForm();
    renderSessions();
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

  renderList();
  renderStats();
  renderHistory();
  renderAxesSettings();
  renderCustomAxesInForm();
  renderReasonsInForm();
  renderSessions();
})();
