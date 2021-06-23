const $titlewrap=document.querySelectorAll(".titlewrap")[1];
const $button=$titlewrap.querySelectorAll("button");
var $select=$button[0];

const $tbody=document.querySelectorAll("tbody")[1];

function init(){
  $tbody.innerHTML="";
}

function createA(url,text,className){
  const $a=document.createElement("a");
  if(className===true){
    $a.className="badge bg-secondary";
  }
  $a.href=url;
  $a.innerText=text;
  return $a;
}
function createTr(data) {
  const $tr=document.createElement("tr");
  const $title=document.createElement("td");
  const $linkTd=document.createElement("td");
  const $previewTd=document.createElement("td");
  const $gitTd=document.createElement("td");
  $title.innerText=data.title;
  $linkTd.appendChild(createA(data.docUrl,"문서",true));
  $previewTd.appendChild(createA(data.previewUrl,"보기"));
  $gitTd.appendChild(createA(data.gitUrl,"git"));
  $tr.appendChild($title);
  $tr.appendChild($linkTd);
  $tr.appendChild($linkTd);
  $tr.appendChild($previewTd);
  $tr.appendChild($gitTd);
  
  return $tr;
}

function drawView(set) {
  $tbody.innerHTML=" ";
  fetch('quiz.json')
  .then(function(response){
    response.json().then(function(data){
      for(var i=0;i<data.length;i++){
      switch(set){
        case 0:
          $tbody.appendChild(createTr(data[i]))
          break;
        case 1:
          if(data[i].gitUrl!==""){
            $tbody.appendChild(createTr(data[i]))
            break;
          }
      }
      }
    });
  })
 .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
}
function clickOption(event){
  if($select){
    $select.className = $select.className.replace(' active', '');
  }
  var el = event.currentTarget;
  el.className += ' active';
  $select = el;
  switch(el.innerText){
    case "모두":
      drawView(0);
      break;
    case "git":
      drawView(1);
      break;
  }
}
function addEvent(){
  for(var i=0;i<$button.length;i++){
    $button[i].addEventListener("click",clickOption,i)
  }
}

export default{
    drawView,addEvent,init
};