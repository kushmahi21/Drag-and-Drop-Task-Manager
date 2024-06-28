const cards = document.querySelectorAll(".card-box");
const todoform = document.querySelector("form");


function savedTask(){
    cards.forEach((card, index)=>{
        const tasks = Array.from(card.querySelectorAll(".task")).map((item) => item.textContent);
        localStorage.setItem(`cardtodo${index}`, JSON.stringify(tasks))

    });
}

function showTask(){
    cards.forEach((card, index) => {
        const tasks = JSON.parse(localStorage.getItem(`cardtodo${index}`))
        tasks.forEach((task) => {
            const pa = `<p class="task" draggable="true">${task}</p>`
            card.innerHTML += pa
        });
        
    });
    const tasks = document.querySelectorAll(".task")
    tasks.forEach((task) => {
        addDrag(task)
        
    })
}

function addDrag(p) {
    p.draggable = true;
    p.addEventListener("dragstart", (e) => {
        let itemselect = e.target;
        itemselect.classList.add('is-dragging');
        
        cards.forEach((card) =>{
            card.addEventListener("dragover", (e) => {
                e.preventDefault();
            });
            card.addEventListener("drop", (e) =>{
                if(itemselect !== null){
                    card.appendChild(itemselect);
                    savedTask()
                }
                itemselect = null;
            });
        });
    });

    p.addEventListener("dragend", (e) => {
        let itemselect = e.target;
        itemselect.classList.remove('is-dragging');
    });
}

todoform.addEventListener("submit", function(e){
    console.log(e);
    e.preventDefault();
    const todoinput = document.getElementById("todo-input");
    const inputtext = todoinput.value.trim();

    if(inputtext){
        const p = document.createElement("p");
        p.className = "task";
        p.textContent = inputtext;
        cards[0].appendChild(p);
        addDrag(p);
        savedTask()
    }
    todoinput.value = "";
});

const para = document.querySelectorAll(".task");
para.forEach((p) => {
    addDrag(p);
});

window.addEventListener("load", (e) =>{
    showTask()
})



