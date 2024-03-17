"use strict";
console.log("BEDROCK");
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
    let Outer = document.querySelector(".user-controls-group");
    let Points = GetWeeklyProgress();
    if (Outer && Points) {
        Outer.innerHTML = `<span>Bedrock Points: (${Points}/20)</span>`;
    }
}
SetWeeklyProgress();
window.addEventListener("click", function () {
    let SelectableTextStyle = ":root { --user-select-accessibility-setting: default !important; }";
    let SelectableTextStyleElement = document.createElement("style");
    SelectableTextStyleElement.innerHTML = SelectableTextStyle;
    document.head.appendChild(SelectableTextStyleElement);
    setTimeout(function () {
        SetWeeklyProgress();
    }, 200);
});
//# sourceMappingURL=bedrock.js.map