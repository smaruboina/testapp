  window.onload = init;

  function init(){
	var element = document.getElementsByTagName("code")
	 , total = element.length
	 , i = 0
	 
	 
	 for(i;i<total;i++){
	   j = i;
	   element[i].addEventListener("click",function(){
			var attr = this.getAttribute("class");
			deactiveTags();
			activeTags(attr);
			
	   },false);
	 }
	 function activeTags(attr){
	  var classElements = document.getElementsByClassName(attr)
		  , total = classElements.length;
		  
		for(j=0;j<total;j++){
			classElements[j].style.backgroundColor="yellow";
			classElements[j].style.color="red";
		}
	 }
	 
	 function deactiveTags(){
	  var classElements = document.getElementsByTagName("code")
		  , total = classElements.length;
		  
		for(j=0;j<total;j++){
		    classElements[j].style.backgroundColor="";
		    classElements[j].style.color="";
		}
	 }
  }

