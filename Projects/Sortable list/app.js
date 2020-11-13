const data = [
  {id:1,title:"This title is for testing 1",description:"  Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis molestias modi quis voluptatibus eligendi labore quidem ullam magnam. At, dolorum?"},
  {id:2,title:"This title is for testing 2",description:"  Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis molestias modi quis voluptatibus eligendi labore quidem ullam magnam. At, dolorum?"},
  {id:3,title:"This title is for testing 3",description:"  Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis molestias modi quis voluptatibus eligendi labore quidem ullam magnam. At, dolorum?"},
  {id:4,title:"This title is for testing 4",description:"  Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis molestias modi quis voluptatibus eligendi labore quidem ullam magnam. At, dolorum?"},
  {id:5,title:"This title is for testing 5",description:"  Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis molestias modi quis voluptatibus eligendi labore quidem ullam magnam. At, dolorum?"},
  {id:6,title:"This title is for testing 6",description:"  Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis molestias modi quis voluptatibus eligendi labore quidem ullam magnam. At, dolorum?"},
  {id:7,title:"This title is for testing 7",description:"  Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis molestias modi quis voluptatibus eligendi labore quidem ullam magnam. At, dolorum?"},
  {id:8,title:"This title is for testing 8",description:"  Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis molestias modi quis voluptatibus eligendi labore quidem ullam magnam. At, dolorum?"}
];

new SortableList({
  parentElement: document.getElementById('app') ,
  data: data,
  domCreator: (item) => {
    return `
    <div class="list" draggable="true" data-list-id="${item.id}">
      <span class="list__id">${item.id}</span>
      <div class="list__text">
        <h2>${item.title}</h2>
        <p>${item.description}</p>
      </div>
    </div>
    `
  },
  updateList:(newdata)=>{
    //You can send the data to the database and update the database
    console.log(newdata);
  }
})