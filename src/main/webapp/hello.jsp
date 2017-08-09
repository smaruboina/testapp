<!DOCTYPE html>

<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Hello</title>
</head>
<body>
<div><h2>Find and highlight text in document</h2>
<form action="" method="" id="search" name="search">
<input name="query" id="query" type="text" size="30" maxlength="30">
<input name="searchit" type="button" value="Search" onClick="getData()">
</form>
    </div>
    <script>
     
         function getData() {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
           if (xmlhttp.status == 200) {
               document.getElementById("myDiv").innerHTML = xmlhttp.responseText;
           }
           else if (xmlhttp.status == 400) {
              alert('There was an error 400');
           }
           else {
               alert('something else other than 200 was returned');
           }
        }
    };

    xmlhttp.open("GET", "https://www.google.com/", true);
                          xmlhttp.setRequestHeader('Access-Control-Allow-Origin','*');

    xmlhttp.send();
}
    
    </script></body>
</html>