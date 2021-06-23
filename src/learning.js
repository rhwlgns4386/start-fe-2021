const $container=document.querySelector(".titlewrap");
const $button=$container.querySelectorAll("button");
var $select=$button[0];

var tbody=document.querySelector("tbody");

function init(){
  tbody.innerHTML="";
}

function createTd(text){
    var td=document.createElement("td");
    td.innerText=text;
    return td;
}

function createA(url,text){
    var a=document.createElement("a");
    a.className="badge bg-secondary";
    a.href=url;
    a.innerText=text;
    return a;
}

function createTr(row,data){
    var tr=document.createElement("tr");
    var th=document.createElement("th");
    var helfTagTd=createTd(" ");
    var date=createTd(data.date);
    var aTd=createTd(" ");
    var name=createTd(data.title)
    var a=createA(data.docUrl,"문서");
    var gitTd=createTd(" ");
    var gitA=document.createElement("a");
    if(data.links.length!==0){
      for(var i=0;i<data.links.length;i++){
        helfTagTd.appendChild(createA(data.links[i],i+1))
    }
    }
    gitA.href=data.gitUrl;
    gitA.innerText="git"
    gitTd.appendChild(gitA);
    th.scope="row";
    th.innerText=row+1;
    aTd.appendChild(a);
    tr.appendChild(th);
    tr.appendChild(name);
    tr.appendChild(aTd);
    tr.appendChild(helfTagTd);
    tr.appendChild(date);
    tr.appendChild(gitTd);
    return tr;
}

function drawView(set){
  tbody.innerHTML="";
  fetch(`class.json`)
  .then(function(response){
    response.json().then(function(data){
        for(var i=0;i<data.length;i++){
            switch(set){
              case 0:
                tbody.appendChild(createTr(i,data[i]))
                break;
              case 1:
                if(0<data[i].links.length){
                  tbody.appendChild(createTr(i,data[i]))
                }
                break;
              case 2:
                if(data[i].gitUrl!==""){
                  tbody.appendChild(createTr(i,data[i]))
                }
                break;
              case 3:
                data.sort(function(a,b){
                  return new Date(b.date)-new Date(a.date);
                });
                tbody.appendChild(createTr(i,data[i]));
                break;
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
    case "도움링크":
      drawView(1);
      break;
    case "git":
      drawView(2);
      break;
    case "최신순":
      drawView(3);
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