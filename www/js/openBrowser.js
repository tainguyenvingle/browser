if(document.getElementsByClassName('doneButton').length == 0){
	var newNode=document.createElement('div');
	newNode.className='doneButton';
	document.body.insertBefore(newNode,document.body.childNodes[0]);
	var doneButton=document.getElementsByClassName('doneButton')[0];
	var flag=0;
	var x_pos = 0, y_pos = 0;
	doneButton.style.top = (window.innerHeight-40)+'px';
	//event of doneButton
	doneButton.addEventListener("touchstart", function(){
	    flag = 0;
	}, false);
	doneButton.addEventListener("touchmove", function(e){
	    flag = 1;
	    x_pos = e.changedTouches[0].clientX;
	    y_pos = e.changedTouches[0].clientY;
	    if(x_pos<40)
	    	this.style.left = '0px';
	    else if(x_pos>(window.innerWidth-40))
	    	this.style.left = (window.innerWidth-40)+'px';
	    else
	    	this.style.left = x_pos+'px';
	    if(y_pos<40)
	    	this.style.top = '0px';
	    else if(y_pos>(window.innerHeight-40))
	    	this.style.top = (window.innerHeight-40)+'px';
	    else
	    	this.style.top = y_pos+ 'px';
	    e.preventDefault();
	}, false);
	doneButton.addEventListener("touchend", function(e){
	    if(flag==0){
			var r=confirm('Do you want close this window?');
			if(r==true){location.href = "http://close"};
		}
	}, false);
}
