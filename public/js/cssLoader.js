window.addEventListener("load",function() {
  document.getElementById("theme-selector").addEventListener("change",function() {
    const style = this.value;
    console.log(style);
    if (style == "") return; // please select - possibly you want something else here
 
    setStyleSheet(style)

  });

});

function setStyleSheet(url){
    document.getElementById("stylesheet").setAttribute('href', url);
 }