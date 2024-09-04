chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.action === 'openURL') {
		chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			if (tabs.length > 0) {
				chrome.scripting.executeScript({
					target: { tabId: tabs[0].id },
					function: findAndOpenAdvancedSettingsURL
				});
			}
		});
	}
});

function findAndOpenAdvancedSettingsURL() {
	// Function to find the advanced settings URL with a refined pattern
	function findAdvancedSettingsURL() {
		// Get all network requests
		let requests = performance.getEntriesByType("resource");

		// Refine the search criteria based on observed patterns
		let settingsRequest = requests.find(request => request.name.includes("crm.dynamics.com"));

		// Extract and log the full URL if found
		if (settingsRequest) {
			let url = new URL(settingsRequest.name);
			let baseURL = `${url.protocol}//${url.hostname}`;
			let fullURL = `${baseURL}/main.aspx?pagetype=advancedfind&appid=`;
			return fullURL;
		} else {
			console.log("Advanced Settings URL not found.");
			return null;
		}
	}

	let fullURL = findAdvancedSettingsURL();
	if (fullURL) {
		window.open(fullURL, '_blank');
	}
}

