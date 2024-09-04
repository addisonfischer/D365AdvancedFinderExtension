document.getElementById('open-url').addEventListener('click', () => {
	chrome.runtime.sendMessage({ action: 'openURL' });
});

