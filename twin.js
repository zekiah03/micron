(function () {
  var SUPABASE_URL = 'https://bxewkghaljeucxekwltd.supabase.co';
  var SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ4ZXdrZ2hhbGpldWN4ZWt3bHRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzNjg0MzIsImV4cCI6MjA5MTk0NDQzMn0.Efo4opmFKm9TFrKamH4Yvg44nIXP8sD9JhH5Rq7KaqM';
  var TWIN_URL = 'https://solnova.app';
  var SESSION_KEY = 'solnova_twin_session';

  function getTwinToken() {
    return new Promise(function (resolve) {
      try {
        var stored = localStorage.getItem(SESSION_KEY);
        if (stored) {
          var s = JSON.parse(stored);
          if (s.expires_at > Date.now() / 1000 + 60) { resolve(s.access_token); return; }
          fetch(SUPABASE_URL + '/auth/v1/token?grant_type=refresh_token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'apikey': SUPABASE_ANON_KEY },
            body: JSON.stringify({ refresh_token: s.refresh_token }),
          }).then(function (res) {
            if (res.ok) return res.json();
            throw new Error('refresh');
          }).then(function (d) {
            localStorage.setItem(SESSION_KEY, JSON.stringify({ access_token: d.access_token, refresh_token: d.refresh_token, expires_at: d.expires_at }));
            resolve(d.access_token);
          }).catch(function () { resolve(null); });
          return;
        }
        fetch(SUPABASE_URL + '/auth/v1/token?grant_type=anonymous', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'apikey': SUPABASE_ANON_KEY },
        }).then(function (res) {
          if (!res.ok) throw new Error('anon');
          return res.json();
        }).then(function (d) {
          localStorage.setItem(SESSION_KEY, JSON.stringify({ access_token: d.access_token, refresh_token: d.refresh_token, expires_at: d.expires_at }));
          resolve(d.access_token);
        }).catch(function () { resolve(null); });
      } catch (e) { resolve(null); }
    });
  }

  window.contributeToTwin = function (appId, rawData) {
    getTwinToken().then(function (token) {
      if (!token) return;
      fetch(TWIN_URL + '/api/twin/contribute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
        body: JSON.stringify({ app_id: appId, raw_data: rawData }),
      }).catch(function (e) { console.error('[solnova-twin]', e); });
    }).catch(function (e) { console.error('[solnova-twin]', e); });
  };
})();
