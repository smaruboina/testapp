  window.onload = init;

  function init(){
	var element = document.getElementsByTagName("code")
	 , total = element.length
	 , i = 0
	 
/*bind addEventListener method for all code tag elements*/

	 for(i;i<total;i++){
	   j = i;
	   element[i].addEventListener("click",function(){
			var attr = this.getAttribute("class");
			deactiveTags();
			activeTags(attr);
			
	   },false);
	 }

/*Active tags based on the class value*/
      
	 function activeTags(attr){
	  var classElements = document.getElementsByClassName(attr)
		  , total = classElements.length;
		  
		for(j=0;j<total;j++){
			classElements[j].style.backgroundColor="yellow";
			classElements[j].style.color="red";
		}
	 }
	 
/*deselect the all items except correspand items*/

	 function deactiveTags(){
	  var classElements = document.getElementsByTagName("code")
		  , total = classElements.length;
		  
		for(j=0;j<total;j++){
		    classElements[j].style.backgroundColor="";
		    classElements[j].style.color="";
		}
	 }
  }

