let up = document.getElementById('up')
let uploadBtn = document.getElementById('uploadBtn')
let list = document.querySelector('#report-list')
let cancel = document.getElementById('cancel')
let selectFiles = [];
let dragFiles = []
let files = []
let status = false; 
//status : Specifies the status Cancel Request
// if status true that's mean just we have the file Ready To upload So don't need abort
// else that's mean our files uploading and we should use abort

const uploadZome = document.querySelector('.dropzone');

uploadZome.addEventListener('dragover',function(event) {
  event.preventDefault()
  this.classList.add('active')
})

uploadZome.addEventListener('dragleave',function() {
  this.classList.remove('active')
})

uploadZome.addEventListener('drop',function(event) {
  event.preventDefault()
  this.classList.remove('active')
  dragFiles = event.dataTransfer.files
  createStructure ()
})


function createDom(file,text){
  return `<li class="item-report"><span>○ ${file.name}</span><span class="status">${text}</span></li>`;
}
 
up.addEventListener('change',function(event) {
  selectFiles = up.files
  createStructure ()
})

function createStructure (){
 
  status = true
  //Delete if there is already a report
  list.innerHTML = ''

  //Return to the first state if disabled
  uploadBtn.textContent = `Upload`
  uploadBtn.removeAttribute('disabled')
  uploadBtn.classList.remove('complete')

  //Return to the first state if disabled
  cancel.textContent = `Cancel Request`
  cancel.removeAttribute('disabled')
  cancel.classList.remove('disbtn')


  document.querySelector('.bar')
            .style.width = `0%`;
          document.querySelector('.bar > span')
            .textContent = ``;
    list.innerHTML = ''
  for (let i = 0; i < selectFiles.length; i++) {
    list.innerHTML += createDom(selectFiles[i],"Ready for upload");
    console.log(i);
  }
  for (let j = 0; j < dragFiles.length; j++) {
    list.innerHTML += createDom(dragFiles[j],"Ready for upload");
    console.log(j);
  }
}

const xhr = new XMLHttpRequest();

uploadBtn.addEventListener('click',function(){

  xhr.open('POST','upload.php');

  if (selectFiles.length != 0 || dragFiles.length != 0) {
    files = [... selectFiles , ... dragFiles]
    const fData = new FormData();

    for (let i = 0; i < files.length; i++) {
      fData.append(files[i].name,files[i]);
    }
    //When the upload starts
    xhr.addEventListener('loadstart',function(){
      uploadBtn.textContent = `Uploading`
      uploadBtn.classList = `btn uploading`
      uploadBtn.setAttribute('disabled',true)

      status = false
      list.innerHTML = ''
      for (let i = 0; i < files.length; i++) {
        list.innerHTML += createDom(files[i],"Uploading");
        document.querySelectorAll('.status')[i].classList.add('uploading');
      }
    })

    //uploading
    xhr.upload.addEventListener('progress',function(event){
      if (event.lengthComputable) {
        let percent = ((event.loaded / event.total) * 100).toFixed(1);
        document.querySelector('.bar')
          .style.width = `${percent}%`;
        document.querySelector('.bar > span')
          .textContent = `${percent}%`;
      }
    });

    //Upload completed
    xhr.addEventListener('load',function(event){

      cancel.textContent = 'It is not possible to cancel'
      cancel.classList = `btn disbtn`
      cancel.setAttribute('disabled',true)

      uploadBtn.textContent = `Upload completed`
      uploadBtn.classList = `btn complete`
      uploadBtn.setAttribute('disabled',true)

      list.innerHTML = ''
      for (let i = 0; i < files.length; i++) {
        list.innerHTML += createDom(files[i],"Upload complete");
        document.querySelectorAll('.status')[i].classList.add('complete');
      }
      selectFiles = []
      dragFiles = []
    })

    xhr.send(fData)

  }else{
    alert('There is no file to upload!')
  }
})

cancel.addEventListener('click',function(){
  if (status) {
    selectFiles = []
    dragFiles = []
    list.innerHTML = ''
  }else{
    xhr.abort()
    uploadBtn.textContent = `Upload`
    uploadBtn.removeAttribute('disabled')
    uploadBtn.classList.remove('uploading')
    document.querySelector('.bar')
            .style.width = `0%`;
          document.querySelector('.bar > span')
            .textContent = ``;
    list.innerHTML = ''
  }
})

