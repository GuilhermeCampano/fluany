let windowId = 2;
const CONTEXT_MENU_ID = 'context_menu';
console.log("About to try creating an invalid item - an error about " +
            "item 999 should show up");
function closeIfExist() {
    if (windowId > 0) {
        chrome.windows.remove(windowId);
        windowId = chrome.windows.WINDOW_ID_NONE;
    }
}

function popWindow(type) {
    closeIfExist();
    const options = {
        type: 'popup',
        left: 100,
        top: 100,
        width: 800,
        height: 475
    };
    if (type === 'open') {
        options.url = 'window.html';
        chrome.windows.create(options, (win) => {
            windowId = win.id;
        });
    }
}

chrome.contextMenus.create({
    id: CONTEXT_MENU_ID,
    title: 'Fluany',
    contexts: ['all'],
    documentUrlPatterns: [
        'https://github.com/*'
    ]
});

chrome.contextMenus.onClicked.addListener((event) => {
    if (event.menuItemId === CONTEXT_MENU_ID) {
        popWindow('open');
    }
});
