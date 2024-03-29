// main.js
// Made by Yoann Raton, 16/01/2024

// Import Workspace Manager
import WorkspaceManager from './workspaceManager.js';

// Start info
console.log("Start Linguini For Trello Power Up");

// update is made to see difference between current and opfwsp
const wspmanaager = new WorkspaceManager();
wspmanaager.updateWorkspace();
setupPeriodicUpdates();

// Initialize Trello Power-Up
window.TrelloPowerUp.initialize({
});

function setupPeriodicUpdates() {

    setInterval(async () => {
      try {
        // Check for modifications
        await wspmanaager.checkForModifications();
      } catch (error) {
        console.error('Error during periodic update:', error);

        if (error.response && error.response.status === 429) {
          // Rate limiting error
          const retryAfter = error.response.headers['retry-after'] || 1; // Default to 1 seconds
          console.log(`Rate limiting error. Retrying after ${retryAfter} seconds.`);
          await sleep(retryAfter * 1000); // Convert seconds to milliseconds
        }
      }
    }, 30000); // Update every 30 seconds
}
  
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

