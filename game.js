let turnContainer=document.querySelector(".turn-container");
let bg=document.querySelector(".bg");
let mainGrid=document.querySelector(".main-grid");
let gamebox=document.querySelectorAll(".box");
let winnerText=document.querySelector(".winner-text");
let newbtn=document.querySelector(".new-btn");
let resetbtn=document.querySelector(".reset-btn");
let span=document.querySelector("span");
let x_turn=document.querySelector(".turn-x");
let o_turn=document.querySelector(".turn-o");
let img=document.querySelector("img")
let winnerpage=document.querySelector(".winner-page")

turnX=true;//playerX playerO
let count=0;//track draw

let winPattern=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]


gamebox.forEach((box)=>{
    box.addEventListener("click",()=>{
        console.log("button was clicked");
        if(turnX===true){
            box.innerText="X";
            box.style.backgroundColor="rgb(206, 112, 35)";
            bg.style.position="absolute";
            bg.style.right="0";
            bg.style.left="";
            bg.style.backgroundColor="rgb(35, 62, 218)"
            o_turn.style.transition="all 500ms ease 0s";
            turnX=false;
          
        }
        else{
            box.innerText="O";
            box.style.backgroundColor="rgb(35, 62, 218)"
            bg.style.position="absolute";
            bg.style.left="0";
            bg.style.right="";
            bg.style.backgroundColor="rgb(206, 112, 35)";
            x_turn.style.transition="all 500ms ease 0s";
            turnX=true;
        }
        box.style.pointerEvents="none";
        box.ariaDisabled=true;

        let isWinner=checkWinner();
        count++;

        if(count===9 && !isWinner){
            gameDraw();
        }
    })
})
let drawtext=document.querySelector(".Draw-text");
let gameDraw=()=>{
    // winnerText.innerText="Match Draw, Play Next Game";
    drawtext.classList.remove("hide");
    resetbtn.style.pointerEvents="none"
    resetbtn.ariaDisabled=true;
    drawtext.classList.add("winner-text2");
}
const winner=(val)=>{
    if(val==="X"){
    span.classList.add("X");
    span.innerText=`${val}`;
    }
    if(val==="O"){
    span.classList.add("O");
    span.innerText=`${val}`;
    }
    
    winnerText.classList.remove("hide");
    img.classList.remove("hide");
    resetbtn.style.pointerEvents="none";
    resetbtn.ariaDisabled=true;
    disabled();

}
let resetfunc=()=>{
    for(let box of gamebox){
        box.innerText="";
        enabled();
        box.style.backgroundColor="";
    }
        winnerText.classList.add("hide");
        drawtext.classList.add("hide");
        img.classList.add("hide");
        count=0;
}
let newGame=()=>{
    for(let box of gamebox){
        box.innerText="";
        enabled();
        box.style.backgroundColor="";
        winnerText.classList.add("hide");
        drawtext.classList.add("hide");
        img.classList.add("hide");
        span.classList.remove("O");
        span.classList.remove("X");
        count=0;
        resetbtn.style.pointerEvents="";
        resetbtn.ariaDisabled=false;
    }
    
}
let enabled=()=>{
    for(let box of gamebox){
        box.style.pointerEvents="";
        box.ariaDisabled=false;
    }
}

let disabled=()=>{
        for(let box of gamebox){
            box.style.pointerEvents="none";
            box.ariaDisabled=true;
        }
}
const checkWinner=()=>{
    for(let pattern of winPattern){
        let pos1val=gamebox[pattern[0]].innerText;
        let pos2val=gamebox[pattern[1]].innerText;
        let pos3val=gamebox[pattern[2]].innerText;

        if(pos1val!="" && pos2val!="" && pos3val!=""){
            if(pos1val===pos2val && pos2val===pos3val){
                winner(pos1val);
                return true;
            }
        }
    }
    return false;
}

resetbtn.addEventListener("click",resetfunc);
newbtn.addEventListener("click",newGame);