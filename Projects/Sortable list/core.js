
class SortableList{

  dragElm;
  data;
  update;

  constructor(options){
    this.setupList(options);
    this.data = options.data;

    this.update = options.updateList;

    for (const itemInDom of options.parentElement.children) {
      this.addDnDHandlers(itemInDom)
    }
  }

  setupList(options){
    let {parentElement,data,domCreator : dom} = options;

    if(! parentElement) throw Error("Select an element as the parent");
    if(! data) throw Error("There is no data!");
    if(! Array.isArray(data)) throw Error("The data must be in the form of a list of objects");
    if(! dom) throw Error("You have to create a structure to display");
    if(typeof dom !== "function") throw Error("The structure must be in the form of a function");

    data.forEach(( item ) => {parentElement.innerHTML += dom(item);});
  }

  addDnDHandlers(element) {
    element.addEventListener('dragstart' , this.handleDragStart.bind(this));
    element.addEventListener('dragover',this.handleDragOver.bind(this));
    element.addEventListener('dragend' , this.handleDragEnd.bind(this));
}

handleDragStart(e) {
    e.target.classList.add('dragging');
}

handleDragOver(e) {
  if(e.preventDefault) e.preventDefault();
  const afterElement = this.getDragAfterElement(e.target.closest('#app'),e.clientY)
  const draggable = document.querySelector('.dragging')
  if (afterElement == null) {
    e.target.closest('#app').appendChild(draggable)
  } else {
    e.target.closest('#app').insertBefore(draggable, afterElement)
  }
}

getDragAfterElement(parentElement,y){
  const draggableElements = [...parentElement.querySelectorAll('.list:not(.dragging)')]
  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect()
    const offset = y - box.top - box.height / 2
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child }
    } else {
      return closest
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element
}

handleDragEnd(e) {
      e.target.classList.remove('dragging');
      let newdata = [];
      document.querySelectorAll('.list')
        .forEach((elm)=>{
          newdata.push(this.data.find((item)=>{
            return elm.dataset.listId == item.id
          }))
        })
        this.update(newdata)
}
}