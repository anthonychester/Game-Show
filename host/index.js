const ws = new WebSocket('ws://192.168.0.233:8080/ws');

let curentTeams = 1;
const buttons = {};

/* document.getElementById("start").onclick = () => {
    let keys = Object.keys(buttons);
    for(let id in buttons) {
        buttons[id].ispressed = false;
    }
    displayButtonData();
} */

ws.onmessage = (webSocketMessage) => {
    console.log("m");
    const data = JSON.parse(webSocketMessage.data);
    if (data.event == "join") {
        curentTeams += 1;
        buttons[data.id] = {team: curentTeams, ispressed: false};
    } else if (data.event == "leave") {
        delete buttons[data.id];
        curentTeams -= 1;
    } else if (data.event == "press") {
        buttons[data.sender].ispressed = true;
    }

    displayButtonData();
};

function displayButtonData() {
    let output = "";
    for(let id in buttons) {
        let button = buttons[id];
        //id, team, ispressed
        console.log(button);
        output += "Team" + button.team + ": ";
        output += button.ispressed ? "🟢" : "🔴";
        output += "\n";
    }
    //document.getElementById("list").innerHTML = output;
}