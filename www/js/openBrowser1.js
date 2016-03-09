var newNode=document.createElement('p');
var newText=document.createTextNode('X');
newNode.appendChild(newText);
newNode.className='doneButton';
document.body.insertBefore(newNode,document.body.childNodes[0]);
document.body.innerHTML;
var doneButton=document.getElementsByClassName('doneButton')[0];
var flag=0;
var x_pos = 0, y_pos = 0;
doneButton.addEventListener("touchstart", function(){
    flag = 0;
}, false);
doneButton.addEventListener("touchmove", function(e){
    flag = 1;
    x_pos = e.changedTouches[0].clientX;
    y_pos = e.changedTouches[0].clientY;
    this.style.left = x_pos+'px';
    this.style.top = y_pos+ 'px';
    e.preventDefault();
}, false);
doneButton.addEventListener("touchend", function(e){
    if(flag==0){
		var r=confirm('Do you want close this window?');
		if(r==true){location.href = "http://close"};
	}
}, false);