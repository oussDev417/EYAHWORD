/* global Office */

Office.onReady(() => {
  // Commands are ready
});

function showTaskpane(event: Office.AddinCommands.Event) {
  Office.addin.showAsTaskpane();
  event.completed();
}

// Register commands
Office.actions.associate("ShowTaskpane", showTaskpane);
