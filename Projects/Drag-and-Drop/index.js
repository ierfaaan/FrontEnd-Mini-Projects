let fill = document.querySelector(".fill")
let empties = document.querySelectorAll(".empty")


fill.addEventListener("dragstart",dragStart)
fill.addEventListener("dragend",dragEnd)


for (const empty of empties) {
  empty.addEventListener("dragover",dragOver)
  empty.addEventListener("dragenter",dragEnter)
  empty.addEventListener("dragleave",dragLeave)
  empty.addEventListener("drop",Drop)
}

function dragStart(){
  this.className += " draged";
  setTimeout(() => {
    this.className = "invis"
  }, 1);
}

function dragEnd(){
  this.className = "fill"
  this.previousElementSibling.classList += " invis"
  this.textContent = `${this.previousElementSibling.textContent}`
}

function dragOver(event) {
  event.preventDefault();
  this.firstElementChild.classList.remove("invis")
}
function dragEnter() {
 this.className +=" hover"
 fill.textContent = `${this.firstElementChild.textContent}`
}
function dragLeave() {
  this.classList.remove("hover");
    this.firstElementChild.classList.remove("invis")
}
function Drop(event) {
  this.classList.remove("hover");
  this.append(fill)
}