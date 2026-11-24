const cheats = [
  { name: 'cheat_give_coins', action: 'give_coins', args: { n: 20 }, label: 'Give 20 coins' },
  { name: 'cheat_daylight', action: 'set_hour', args: { hour: 10 }, label: 'Set time to 10 am' },
  { name: 'cheat_clear_weather', action: 'set_weather', args: { weather: 'clear' }, label: 'Clear the weather' },
];

if (new URLSearchParams(location.search).has('test')) {
  const ready = setInterval(() => {
    if (!window.__game) return;
    clearInterval(ready);
    installCheats(window.__game);
  }, 100);
}

function installCheats(hooks) {
  const run = hooks.action.bind(hooks);
  const state = hooks.state.bind(hooks);
  const byName = new Map(cheats.map(cheat => [cheat.name, cheat]));
  hooks.action = (name, args) => {
    const cheat = byName.get(name);
    return cheat ? run(cheat.action, { ...cheat.args, ...args }) : run(name, args);
  };
  hooks.state = () => {
    const snapshot = state();
    snapshot.actions.push(...byName.keys());
    return snapshot;
  };

  const panel = document.createElement('dialog');
  panel.setAttribute('aria-labelledby', 'gull-playtest-cheats');
  panel.style.cssText = 'z-index:9999;margin:1rem 1rem auto auto;color:#fff;background:#21323b;' +
    'border:1px solid #9bb8bf;border-radius:8px;padding:1rem;font:16px system-ui;';
  const heading = document.createElement('h2');
  heading.id = 'gull-playtest-cheats';
  heading.textContent = 'Playtest cheats';
  heading.style.margin = '0 0 .5rem';
  panel.append(heading);
  const status = document.createElement('p');
  status.setAttribute('role', 'status');
  status.style.marginBottom = '0';

  for (const cheat of cheats) {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = cheat.label;
    button.style.cssText = 'display:block;margin:.5rem 0;font:inherit;cursor:pointer;';
    button.addEventListener('click', async () => {
      try {
        const result = await hooks.action(cheat.name);
        status.textContent = result === false ? 'This cheat is unavailable here.' : 'Applied';
      } catch (error) {
        status.textContent = error.message;
      }
    });
    panel.append(button);
  }
  panel.append(status);
  document.body.append(panel);

  window.addEventListener('keydown', event => {
    if ((event.code !== 'Backquote' && event.key !== '`') || event.repeat) return;
    event.preventDefault();
    if (panel.open) {
      panel.close();
    } else {
      status.textContent = '';
      panel.show();
    }
  });
}
