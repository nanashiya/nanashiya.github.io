(() => {
  'use strict';
  const icons = {
    x: '<path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 14.6 5.5 22H2.3l8.2-9.5L.8 2h6.5l5.8 7.7L18.9 2Zm-1.1 18h1.7L6.3 3.9H4.5L17.8 20Z"/>',
    vrchat: '<path d="M3 4h18v13H11l-5 4v-4H3Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><text x="12" y="13" text-anchor="middle" font-size="7" font-family="sans-serif" font-weight="800">VR</text>',
    discord: '<path d="M19.7 5.1a18 18 0 0 0-4.4-1.4l-.5 1a16 16 0 0 0-5.6 0l-.5-1a18 18 0 0 0-4.4 1.4C1.5 9.3.7 13.4 1.1 17.4a18 18 0 0 0 5.4 2.7l1.1-1.8-1.7-.8.4-.3a16 16 0 0 0 11.4 0l.4.3-1.7.8 1.1 1.8a18 18 0 0 0 5.4-2.7c.5-4.7-.8-8.8-3.2-12.3ZM8.5 14.8c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2Zm7 0c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2Z"/>',
    booth: '<path d="M4 9h16v12H4Z M2 8l3-6h14l3 6Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M9 21v-7h6v7M8 3 7 8m9-5 1 5" fill="none" stroke="currentColor" stroke-width="1.5"/>',
    note: '<path d="M4 5h8c5 0 8 3 8 8v8h-5v-8c0-2-1-3-3-3H9v11H4Z"/>',
  };
  function safeUrl(link) {
    const candidate = link.service === 'discord'
      ? (/^\d{17,20}$/.test(link.userId || '') ? `https://discord.com/users/${link.userId}` : '')
      : link.url;
    if (!candidate) return null;
    try {
      const url = new URL(candidate);
      return url.protocol === 'https:' && !url.username && !url.password ? url.href : null;
    } catch { return null; }
  }
  const list = document.getElementById('links-list');
  for (const link of window.NANASHIYA_LINKS || []) {
    const url = safeUrl(link);
    const item = document.createElement('li');
    const card = document.createElement(url ? 'a' : 'div');
    card.className = 'link-card';
    if (url) {
      card.href = url;
      card.target = '_blank';
      card.rel = 'noopener noreferrer';
      card.setAttribute('aria-label', `${link.name}：${link.description}（新しいタブで開く）`);
    } else {
      card.classList.add('is-pending');
      card.setAttribute('aria-disabled', 'true');
    }
    const icon = document.createElement('span');
    icon.className = 'service-icon';
    icon.setAttribute('aria-hidden', 'true');
    icon.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor" focusable="false">${icons[link.service] || '<circle cx="12" cy="12" r="7" fill="none" stroke="currentColor"/>'}</svg>`;
    const copy = document.createElement('span');
    copy.className = 'card-copy';
    const name = document.createElement('span');
    name.className = 'card-name';
    name.textContent = link.name;
    const description = document.createElement('span');
    description.className = 'card-description';
    description.textContent = link.description;
    copy.append(name, description);
    const status = document.createElement('span');
    status.className = url ? 'card-arrow' : 'card-status';
    status.textContent = url ? '↗' : '準備中';
    status.setAttribute('aria-hidden', url ? 'true' : 'false');
    card.append(icon, copy, status);
    item.append(card);
    list.append(item);
  }
})();
