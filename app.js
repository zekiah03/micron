(() => {
  const STORE_KEY = 'nayami-seeds-v1';
  const SETTINGS_KEY = 'nayami-settings-v1';
  const HISTORY_KEY = 'nayami-ai-history-v1';

  const state = {
    seeds: load(STORE_KEY, []),
    settings: load(SETTINGS_KEY, { apiKey: '', model: 'claude-sonnet-4-6' }),
    history: load(HISTORY_KEY, []),
    editingId: null,
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
    });
  });

  // ---------- Form ----------
  const form = document.getElementById('seed-form');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    const seed = {
      id: state.editingId || uid(),
      title: data.title.trim(),
      description: (data.description || '').trim(),
      insight: (data.insight || '').trim(),
      category: data.category,
      intensity: Number(data.intensity),
      tags: (data.tags || '').split(',').map(s => s.trim()).filter(Boolean),
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
    form.reset();
    form.querySelector('[name=intensity]').value = 5;
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
      li.querySelector('.seed-tags').innerHTML =
        s.tags.map(t => `<span class="tag">#${escapeHtml(t)}</span>`).join('');
      li.querySelector('.edit-btn').addEventListener('click', () => editSeed(s.id));
      li.querySelector('.del-btn').addEventListener('click', () => deleteSeed(s.id));
      listEl.appendChild(node);
    }
  }

  function intensityPill(n) {
    const cls = n <= 3 ? 'intensity-low' : n <= 6 ? 'intensity-mid' : 'intensity-high';
    return `<span class="intensity-pill ${cls}">${n}</span>`;
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
    document.querySelector('.tab[data-tab=input]').click();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function deleteSeed(id) {
    if (!confirm('この記録を削除しますか？')) return;
    state.seeds = state.seeds.filter(s => s.id !== id);
    save(STORE_KEY, state.seeds);
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
    const blob = new Blob([JSON.stringify({ seeds: state.seeds, history: state.history }, null, 2)],
      { type: 'application/json' });
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
      flash('インポートしました');
      renderList();
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
        createdAt: d.toISOString(),
        updatedAt: d.toISOString(),
      };
    });
    state.seeds = added.concat(state.seeds);
    save(STORE_KEY, state.seeds);
    flash(`${added.length}件読み込みました`);
    renderList();
    renderStats();
  });

  document.getElementById('clear-btn').addEventListener('click', () => {
    if (!confirm('すべての記録と分析履歴を削除します。よろしいですか？')) return;
    state.seeds = [];
    state.history = [];
    save(STORE_KEY, state.seeds);
    save(HISTORY_KEY, state.history);
    renderList();
    renderHistory();
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

    const seedText = target.map((s, i) => {
      const parts = [
        `【${i + 1}】${s.title}`,
        `カテゴリ: ${s.category} / 強さ: ${s.intensity}/10 / 日付: ${s.createdAt.slice(0, 10)}`,
        `タグ: ${s.tags.join(', ') || 'なし'}`,
        `詳細: ${s.description || '(なし)'}`,
      ];
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
      custom: 'カスタム',
    }[m] || m;
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

  renderList();
  renderStats();
  renderHistory();
})();
