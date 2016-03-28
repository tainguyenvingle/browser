if(document.getElementsByClassName('doneButton').length == 0){
    var newNode=document.createElement('div');
    newNode.className='doneButton';
    var newNodeChild=document.createElement('div');
    newNodeChild.className='childNode';
    var newNodeExit=document.createElement('div');
    newNodeExit.className='exitButton';
    var newNodeShare=document.createElement('div');
    newNodeShare.className='shareButton';
    var shareContent=document.createElement('div');
    shareContent.className='shareContent';
    newNodeChild.appendChild(newNodeExit);
    newNodeChild.appendChild(newNodeShare);
    newNodeChild.appendChild(shareContent);
    newNode.appendChild(newNodeChild);
    document.body.insertBefore(newNode,document.body.childNodes[0]);
    var doneButton=document.getElementsByClassName('doneButton')[0];
    var exitButton=document.getElementsByClassName('exitButton')[0];
    var shareButton=document.getElementsByClassName('shareButton')[0];
    var shareContent=document.getElementsByClassName('shareContent')[0];
    var flag=0;
    var open=false;
    var x_pos = 0, y_pos = 0;
    //event of doneButton
    doneButton.addEventListener("touchstart", function(){
        flag = 0;
    }, false);
    doneButton.addEventListener("touchmove", function(e){
        flag = 1;
        x_pos = e.changedTouches[0].clientX;
        y_pos = e.changedTouches[0].clientY;
        if(x_pos<30)
            this.style.left = '0px';
        else if(x_pos>(window.innerWidth-30))
            this.style.left = (window.innerWidth-30)+'px';
        else
            this.style.left = x_pos+'px';
        if(y_pos<30)
            this.style.top = '0px';
        else if(y_pos>(window.innerHeight-30))
            this.style.top = (window.innerHeight-30)+'px';
        else
            this.style.top = y_pos+ 'px';
        e.preventDefault();
    }, false);
    doneButton.addEventListener("touchend", function(e){
        if(flag==0){
            open=!open;
            if(open){
                if(!this.style.top||parseInt(this.style.top)<30){
                    exitButton.style.top='32px';
                    shareButton.style.top='64px';
                }
                else if(parseInt(this.style.top)>(window.innerHeight-60)){
                    exitButton.style.top='-32px';
                    shareButton.style.top='-64px';
                }
                else{
                    exitButton.style.top='-32px';
                    shareButton.style.top='32px';
                }
                exitButton.style.display='block';
                shareButton.style.display='block';
            }
            else{
                exitButton.style.display='none';
                shareButton.style.display='none';
            }
        }
        else{
            if(open){
                open=!open;
                exitButton.style.display='none';
                shareButton.style.display='none';
            }
        }
    }, false);
    //event of exitButton
    var exitFlag=0;
    exitButton.addEventListener("touchstart", function(e){
        e.preventDefault();
        exitFlag = 0;
    }, false);
    exitButton.addEventListener("touchmove", function(e){
        exitFlag = 1;
    }, false);
    exitButton.addEventListener("touchend", function(e){
        if(exitFlag ==0) {
            var r=confirm('Do you want close this window?');
            if(r==true){location.href = "http://close"};
        }
    }, false);
    //event of shareButton
    var shareFlag=0;
    shareButton.addEventListener("touchstart", function(e){
        e.preventDefault();
        shareFlag = 0;
    }, false);
    shareButton.addEventListener("touchmove", function(e){
        shareFlag = 1;
    }, false);
    shareButton.addEventListener("touchend", function(e){
        e.preventDefault();
        if(shareFlag ==0) {
            shareFlag=0;
            shareContent.innerHTML='1';
        }
    }, false);
}
