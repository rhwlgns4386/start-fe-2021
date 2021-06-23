import learning from'./learning';
import quiz from'./quiz';


function loder(){
    window.onload=function(){
        const $loder=document.querySelector(".spinner-border");
        learning.init();
        quiz.init();
    
        const $time=setInterval(function(){
            $loder.remove();
            learning.drawView(0)
            quiz.drawView(0);
            clearInterval($time)
        },1000)
    }
}

export default{
    loder
};