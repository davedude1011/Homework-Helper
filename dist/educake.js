"use strict";
console.log("EDUCAKE");
async function isPopupDataValueActive(Variable) {
    return new Promise((resolve) => {
        chrome.storage.local.get(["PopupData"], (result) => {
            let PopupData = JSON.parse(result["PopupData"]);
            if (Variable == "Global") {
                resolve(PopupData);
            }
            else {
                resolve(PopupData[Variable]);
            }
        });
    });
}
window.addEventListener("keydown", (event) => {
    if (!isNaN(Number(event.key))) {
        let SelectedButton = document.querySelector(`#choice${Number(event.key) - 1}`);
        if (SelectedButton) {
            (async function () {
                let PopupData = await isPopupDataValueActive("Global");
                if (PopupData["Keybinds"]) {
                    SelectedButton.click();
                }
            })();
        }
    }
});
//# sourceMappingURL=educake.js.map