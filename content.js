// Function to extract the CRM URL from the session details
function getCrmUrl() {
	const sessionDetails = document.querySelector('a[href*=".crm.dynamics.com"]');
	return sessionDetails ? sessionDetails.href : null;
}

// Listen for messages from the popup script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.action === "getCrmUrl") {
		const crmUrl = getCrmUrl();
		sendResponse({ crmUrl: crmUrl });
	}
});

