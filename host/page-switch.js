( async () => {

let title_res = await fetch("./pages/title.html");
let newgame_res = await fetch("./pages/newgame.html");
let pairbutton_res = await fetch("./pages/pairbutton.html");
let game_res = await fetch("./pages/game.html");
let winpage_res = await fetch("./pages/winpage.html");

const pages = new Map();

let title = await title_res.text();
let newgame = await newgame_res.text();
let pairbutton = await pairbutton_res.text();
let game = await game_res.text();
let winpage = await winpage_res.text();

pages.set('title', title);
pages.set('newgame', newgame);
pages.set('pairbutton', pairbutton);
pages.set('game', game);
pages.set('winpage', winpage);


//console.log("f", title);
//document.getElementById("main").innerHTML = winpage;
//document.getElementById("main").innerHTML = title;

document.addEventListener("next_page", (e) => {
    //console.log(e.detail);
    //document.getElementById("main").innerHTML = "";
    if (pages.has(e.detail)) {
        document.getElementById("main").innerHTML = pages.get(e.detail);
        document.getElementById("script").remove();
        let script = document.createElement("script");
        script.id = "script";
        script.text = document.getElementById("main").getElementsByTagName( 'script' )[0].text;
        document.body.append(script);
        //console.log(document.getElementById("script").text);
    } else {
        console.error("next page error: page '" + e.detail + "' not found");
    }
    
    //let scripts = document.getElementById("main").getElementsByTagName( 'script' );
    //let script = document.createElement("script");
    //console.log(document.getElementById("main").getElementsByTagName( 'script' )[0].text);
    

});

const np = new CustomEvent("next_page", { detail: "title" });
document.dispatchEvent(np);

})();