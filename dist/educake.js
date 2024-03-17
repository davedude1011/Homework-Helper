"use strict";
console.log("EDUCAKE");
window.addEventListener("keydown", (event) => {
    if (!isNaN(Number(event.key))) {
        let SelectedButton = document.querySelector(`#choice${Number(event.key) - 1}`);
        if (SelectedButton) {
            SelectedButton.click();
        }
    }
});
//# sourceMappingURL=educake.js.map