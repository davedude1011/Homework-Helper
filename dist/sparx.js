"use strict";
console.log("SPARX");
function GetButtonBaseTextContent() {
    let Button = document.querySelector("[class*='_ButtonBase_']");
    if (Button) {
        return Button.textContent;
    }
    else {
        return undefined;
    }
}
function GetBookworkCode() {
    let Code = document.querySelector("[class*='_Chip_']");
    if (Code && Code.textContent && Code.textContent.includes("Bookwork code: ")) {
        return Code.textContent.split("Bookwork code: ")[1];
    }
    else {
        return undefined;
    }
}
function SubmitButtonSetup() {
    let AllButtonBases = document.querySelectorAll("[class*='_ButtonBase_']");
    for (let i = 0; i < AllButtonBases.length; i++) {
        if (AllButtonBases[i].textContent == "Submit answer" && !AllButtonBases[i].classList.contains("event-listener-added")) {
            AllButtonBases[i].classList.add("event-listener-added");
            AllButtonBases[i].addEventListener("click", function () {
                var _a;
                let AnswerHTML = (_a = document.querySelector("[class*='_QuestionWrapper_']")) === null || _a === void 0 ? void 0 : _a.innerHTML;
                if (AnswerHTML) {
                    let CheatSheet = JSON.parse(localStorage.getItem("CheatSheet") || '[]');
                    let CodeExists = false;
                    for (let j = 0; j < CheatSheet.length; j++) {
                        let CheatSheetCode = CheatSheet[j][0];
                        if (CheatSheetCode == GetBookworkCode() && CheatSheetCode) {
                            CodeExists = true;
                            CheatSheet[j][1] = AnswerHTML;
                        }
                    }
                    if (!CodeExists) {
                        let NewCheatSheetItem = [GetBookworkCode(), AnswerHTML];
                        CheatSheet.push(NewCheatSheetItem);
                    }
                    localStorage.setItem("CheatSheet", JSON.stringify(CheatSheet));
                }
            });
        }
    }
    console.log("FUNCTION ON");
}
window.addEventListener("click", function () {
    setTimeout(function () {
        if (GetButtonBaseTextContent() == "Back") {
            SubmitButtonSetup();
        }
    }, 500);
});
function BookworkCheckLoop() {
    var _a, _b, _c;
    try {
        if (((_a = document.querySelector("[class*='_DialogTitle_']")) === null || _a === void 0 ? void 0 : _a.textContent) == "Bookwork check") {
            let BookworkCode = (_c = (_b = document.querySelector("[class*='_Chip_']")) === null || _b === void 0 ? void 0 : _b.textContent) === null || _c === void 0 ? void 0 : _c.split(" ")[1];
            let CheatSheet = JSON.parse(localStorage.getItem("CheatSheet") || "[]");
            let answer = `Bookwork Not Found ¯\\_(ツ)_/¯`;
            if (BookworkCode && BookworkCode.length < 20) {
                for (let i = 0; i < CheatSheet.length; i++) {
                    let CheatSheetCode = CheatSheet[i][0];
                    if (CheatSheetCode == BookworkCode) {
                        answer = CheatSheet[i][1];
                    }
                }
                let EditElement = document.querySelector("[class*='_Subtitle_']");
                if (EditElement) {
                    EditElement.innerHTML = answer;
                    EditElement.style.border = "3px solid #190057";
                    EditElement.style.borderRadius = "10px";
                    EditElement.style.padding = "1vw";
                }
            }
        }
    }
    catch (_d) { }
}
function AddCalculator() {
    let Calculators = document.querySelectorAll(".main-calculator");
    if (Calculators.length == 0) {
        let NewCalculator = document.createElement("iframe");
        NewCalculator.classList.add("_QuestionContainer_kvqo1_1");
        NewCalculator.classList.add("main-calculator");
        NewCalculator.src = "https://www.desmos.com/scientific";
        NewCalculator.style.maxWidth = "600px";
        NewCalculator.style.width = "100%";
        NewCalculator.style.margin = "0px 0px 1rem 1vw";
        NewCalculator.style.borderRadius = "5px";
        let Container = document.querySelector("[class*='_Activity_']");
        if (Container) {
            Container.style.flexDirection = "row";
            Container.insertBefore(NewCalculator, Container.firstChild);
        }
    }
    function ToggleCalculator() {
        let MainCalculator = document.querySelector(".main-calculator");
        let QuestionElement = document.querySelector("[class*='_QuestionContainer_']:not(.main-calculator)");
        if (MainCalculator && QuestionElement) {
            if (MainCalculator.style.display == "none") {
                MainCalculator.style.display = "block";
                QuestionElement.style.margin = "auto auto 1rem 1vw";
            }
            else {
                MainCalculator.style.display = "none";
                QuestionElement.style.margin = "auto auto 1rem auto";
            }
        }
    }
    let CalculatorText = document.querySelector("[class*='_CalculatorInfoContainer_'] [class*='_HiddenAt_']");
    if (CalculatorText) {
        if (CalculatorText.innerHTML != "Toggle<br>Calculator") {
            CalculatorText.innerHTML = "Toggle<br>Calculator";
            CalculatorText.style.textAlign = "center";
            CalculatorText.style.marginLeft = "5px";
            let CalculatorIcon = document.querySelector("[class*='_CalculatorIcon_']");
            if (CalculatorIcon) {
                CalculatorIcon.src = "https://static.sparxhomework.uk/sw2/4c1c4c893f811a1fa3c1c64624ebdba9e3be9d70/assets/CalculatorAllowed-7c873ab4.svg";
            }
            let CalculatorIconOuter = document.querySelector("[class*='_CalculatorInfoContainer_']");
            if (CalculatorIconOuter) {
                CalculatorIconOuter.addEventListener("click", ToggleCalculator);
                CalculatorIconOuter.style.cursor = "pointer";
                let MainCalculator = document.querySelector(".main-calculator");
                console.log((MainCalculator === null || MainCalculator === void 0 ? void 0 : MainCalculator.style.display) == "none");
                ToggleCalculator();
                if (MainCalculator && MainCalculator.style.display == "block") {
                    ToggleCalculator();
                }
            }
        }
    }
}
function SnipeBookworkCheck() {
    var _a;
    let BookworkCode = document.querySelector("[class*='_Chip_']");
    if (BookworkCode && ((_a = BookworkCode.textContent) === null || _a === void 0 ? void 0 : _a.split(" ")[0]) == "Bookwork") {
        BookworkCode.remove();
        let FirstOption = document.querySelector("[class*='_WACOption_']");
        if (FirstOption) {
            FirstOption.click();
            setTimeout(function () {
                let AllSubmitButtons = document.querySelectorAll("[class*='_ButtonBase_']");
                for (let i = 0; i < AllSubmitButtons.length; i++) {
                    let SubmitButton = AllSubmitButtons[i];
                    if (SubmitButton.textContent == "Submit") {
                        SubmitButton.click();
                    }
                }
            }, 50);
        }
    }
    else {
        let AllButtons = document.querySelectorAll("[class*='_ButtonBase_']");
        for (let i = 0; i < AllButtons.length; i++) {
            let RefreshButton = AllButtons[i];
            if (RefreshButton.textContent == "Refresh") {
                RefreshButton.click();
                RefreshButton.remove();
            }
        }
    }
}
function Loop() {
    BookworkCheckLoop();
    AddCalculator();
}
setInterval(Loop, 50);
//# sourceMappingURL=sparx.js.map