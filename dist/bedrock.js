"use strict";
console.log("BEDROCK");
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
let LastState = null;
function AddMorphology() {
    (async function () {
        let PopupData = await isPopupDataValueActive("Global");
        let UserState = JSON.parse(localStorage.getItem("state"));
        if (PopupData["AddMorphology"]) {
            if (UserState["student"]["access"]["Morphology"] != true) {
                UserState["student"]["access"]["Morphology"] = true;
                localStorage.setItem("state", JSON.stringify(UserState));
            }
        }
        else {
            if (UserState["student"]["access"]["Morphology"] != false) {
                UserState["student"]["access"]["Morphology"] = false;
                localStorage.setItem("state", JSON.stringify(UserState));
            }
        }
        if (LastState != null) {
            if (PopupData["AddMorphology"] != LastState) {
                window.location.reload();
            }
        }
        LastState = PopupData["AddMorphology"];
    })();
}
setInterval(AddMorphology, 50);
function GetUserData() {
    let StringedData = localStorage.getItem("state");
    if (StringedData) {
        return JSON.parse(StringedData);
    }
}
function GetWeeklyProgress() {
    let UserData = GetUserData();
    return UserData["student"]["student"]["pointsWeek"];
}
GetWeeklyProgress();
function SetWeeklyProgress() {
    (async function () {
        let PopupData = await isPopupDataValueActive("Global");
        if (PopupData["QuickPointsDisplay"]) {
            let Outer = document.querySelector(".user-controls-group");
            let Points = GetWeeklyProgress();
            if (Outer) {
                Outer.innerHTML = `<span>Points: (<b>${Points}</b>/20)</span>`;
            }
            DictionaryButton();
        }
    })();
}
setInterval(SetWeeklyProgress, 50);
function SetDictionary(Word) {
    var _a, _b;
    let OuterElement = document.querySelector(".quiz-questions") || document.querySelector(".panel--learning");
    if (OuterElement) {
        OuterElement.style.display = "flex";
        OuterElement.style.flexDirection = "row-reverse";
        let DictionaryElement = document.querySelector(".dictionary");
        if (DictionaryElement) {
            DictionaryElement.src = `https://www.merriam-webster.com/dictionary/${Word}`;
        }
        else {
            let DictionaryElement = document.createElement("iframe");
            DictionaryElement.src = `https://www.merriam-webster.com/dictionary/${Word}`;
            DictionaryElement.classList.add("dictionary");
            DictionaryElement.style.width = "30%";
            OuterElement.appendChild(DictionaryElement);
        }
    }
    let LaptopContainer = (_b = (_a = document.querySelector(".panel--pad.background_image.extra_padded")) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement;
    if (LaptopContainer) {
        LaptopContainer.style.width = "70%";
    }
}
function RemoveDictionary() {
    var _a, _b, _c, _d, _e;
    (_a = document.querySelector(".dictionary")) === null || _a === void 0 ? void 0 : _a.remove();
    (_c = (_b = document.querySelector(".no-select")) === null || _b === void 0 ? void 0 : _b.parentNode) === null || _c === void 0 ? void 0 : _c.removeChild(document.querySelector(".no-select"));
    let LaptopContainer = (_e = (_d = document.querySelector(".panel--pad.background_image.extra_padded")) === null || _d === void 0 ? void 0 : _d.parentElement) === null || _e === void 0 ? void 0 : _e.parentElement;
    if (LaptopContainer) {
        LaptopContainer.style.width = "100%";
    }
}
function DictionaryButton() {
    (async function () {
        var _a;
        let PopupData = await isPopupDataValueActive("Global");
        if (PopupData["AddDictionary"]) {
            let DictionaryButton = document.querySelector(".dictionary-button");
            if (DictionaryButton) { }
            else {
                let VocabOuter = document.querySelector(".learning-controls");
                if (VocabOuter) {
                    let NewButton = document.createElement("div");
                    NewButton.innerHTML = `<span _ngcontent-c5="" class="lcb-label">Toggle Dictionary</span>`;
                    NewButton.classList.add("lc-button");
                    NewButton.classList.add("lc-button--iconMobile");
                    NewButton.classList.add("dictionary-button");
                    NewButton.addEventListener("click", function () {
                        isCalculator = !isCalculator;
                        if (!isCalculator) {
                            RemoveDictionary();
                        }
                        else {
                            SetDictionary("");
                            var selectionStyle = document.createElement('style');
                            selectionStyle.classList.add("no-select");
                            selectionStyle.textContent = `
                                ::selection {
                                    background: transparent;
                                }
                            `;
                            document.head.appendChild(selectionStyle);
                        }
                    });
                    let ExitButton = (_a = VocabOuter.querySelector(".lc-button .fa-times-circle")) === null || _a === void 0 ? void 0 : _a.parentElement;
                    if (ExitButton) {
                        VocabOuter.insertBefore(NewButton, ExitButton);
                    }
                }
            }
        }
        else {
            let DictionaryButton = document.querySelector(".dictionary-button");
            if (DictionaryButton) {
                DictionaryButton.remove();
            }
        }
    })();
}
window.addEventListener("click", function (event) {
    let SelectableTextStyle = ":root { --user-select-accessibility-setting: default !important; }";
    let SelectableTextStyleElement = document.createElement("style");
    SelectableTextStyleElement.innerHTML = SelectableTextStyle;
    document.head.appendChild(SelectableTextStyleElement);
    try {
        let ClickedElement = event.target;
        if (ClickedElement && ClickedElement.classList.contains("ready")) {
            if (isCalculator) {
                isCalculator = false;
                RemoveDictionary();
            }
        }
    }
    catch (_a) { }
});
window.addEventListener("contextmenu", function (event) {
    if (isCalculator) {
        event.preventDefault();
        var clickedElement = event.target;
        if (clickedElement.nodeType === Node.TEXT_NODE) {
            clickedElement = clickedElement.parentNode;
        }
        var selection = window.getSelection();
        var range = selection.getRangeAt(0);
        var node = range.startContainer;
        while (range.toString().indexOf(' ') != 0 && range.startOffset > 0) {
            range.setStart(node, range.startOffset - 1);
        }
        range.setStart(node, range.startOffset + 1);
        do {
            range.setEnd(node, range.endOffset + 1);
        } while (range.toString().indexOf(' ') == -1 && range.toString().trim() != '');
        var word = range.toString().trim().replace(/[^a-zA-Z]/g, '');
        SetDictionary(word);
    }
});
var isCalculator = false;
//# sourceMappingURL=bedrock.js.map