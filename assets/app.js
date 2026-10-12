(() => {
  const menu = document.querySelector('.menu-btn');
  const nav = document.querySelector('.topbar nav');
  if (menu && nav) menu.addEventListener('click', () => {
    const expanded = menu.getAttribute('aria-expanded') === 'true';
    menu.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('nav-open', !expanded);
  });

  // Educational simulation only; this never connects to Wazuh or real telemetry.
  const pipeline = document.querySelector('#pipeline');
  if (pipeline) {
    const nodes = [...pipeline.querySelectorAll('[data-node]')];
    const links = [...pipeline.querySelectorAll('.pipe-link')];
    const description = document.querySelector('#flow-description');
    const progress = document.querySelector('#flow-progress');
    const trace = document.querySelector('#trace');
    const traceCount = document.querySelector('#trace-count');
    const toggle = document.querySelector('#flow-toggle');
    const next = document.querySelector('#flow-next');
    const data = [
      ['A fictional endpoint records repeated failed logins. The example event begins at the source.','endpoint.auth','A fictional failed-login event was recorded on a lab endpoint.'],
      ['The configured Wazuh Agent collects the relevant log and forwards it to the manager.','wazuh.agent','The example event is collected and forwarded over the configured private path.'],
      ['The Wazuh Manager decodes the event and evaluates it against enabled detection rules.','wazuh.analysis','Illustrative rule evaluation: repeated failed logins may match a configured detection rule.'],
      ['If a rule produces an alert, the event data is indexed for later searching and correlation.','wazuh.indexer','Example alert record is indexed for analyst search. No real index operation occurred.'],
      ['An analyst reviews context, checks related activity, and chooses an authorized response.','soc.analyst','Analyst review: validate context and scope before deciding on a response.']
    ];
    let current = 0, playing = true, userPaused = false, timer = null;
    function logStep(step) {
      const p = document.createElement('p');
      const time = document.createElement('time');
      const level = document.createElement('span');
      const code = document.createElement('code');
      time.textContent = `00:00:${String((step + 1) * 2).padStart(2, '0')}`;
      level.className = 'level ' + (step === 2 ? 'warn' : step === 4 ? 'good' : 'info');
      level.textContent = step === 2 ? 'RULE' : step === 4 ? 'REVIEW' : 'INFO';
      code.textContent = data[step][1];
      p.append(time, level, ' ', code, document.createTextNode(' — ' + data[step][2]));
      trace.appendChild(p);
      while (trace.children.length > 5) trace.removeChild(trace.firstChild);
      trace.scrollTop = trace.scrollHeight;
      if (traceCount) traceCount.textContent = `EVENT ${String(step + 1).padStart(2, '0')}`;
    }
    function render(step) {
      current = (step + nodes.length) % nodes.length;
      nodes.forEach((node, i) => {
        node.classList.toggle('selected', i === current);
        node.classList.toggle('completed', i < current);
        const state = node.querySelector('.node-state');
        if (state) state.textContent = i < current ? 'Step complete' : i === current ? 'Processing example' : 'Waiting';
      });
      links.forEach((link, i) => link.classList.toggle('passed', i < current));
      if (description) description.textContent = data[current][0];
      if (progress) progress.style.width = `${((current + 1) / nodes.length) * 100}%`;
      logStep(current);
    }
    function stop() { if (timer) clearInterval(timer); timer = null; playing = false; if (toggle) toggle.textContent = '▶ Play'; }
    function start() { if (timer) clearInterval(timer); playing = true; if (toggle) toggle.textContent = 'Ⅱ Pause'; timer = setInterval(() => render(current + 1), 2600); }
    if (toggle) toggle.addEventListener('click', () => { if (playing) { userPaused = true; stop(); } else { userPaused = false; start(); } });
    if (next) next.addEventListener('click', () => { render(current + 1); if (playing) start(); });
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && playing) stop();
      else if (!document.hidden && !playing && !userPaused) start();
    });
    render(0); start();
  }

  const checks = [...document.querySelectorAll('#checks input[type="checkbox"]')];
  const count = document.querySelector('#check-count');
  const bar = document.querySelector('#check-progress');
  function updateChecks() {
    if (!checks.length) return;
    const done = checks.filter(c => c.checked).length;
    if (count) count.textContent = `${done} / ${checks.length} complete`;
    if (bar) bar.style.width = `${done / checks.length * 100}%`;
  }
  checks.forEach(c => c.addEventListener('change', updateChecks));
  const reset = document.querySelector('#reset-checks');
  if (reset) reset.addEventListener('click', () => { checks.forEach(c => c.checked = false); updateChecks(); });
  updateChecks();
})();
