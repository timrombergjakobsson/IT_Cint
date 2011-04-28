/* 
the ajax loader that is shown before the map is loaded 
    
var autoTimeout = null;
map.showLoadingIndicator = function () {
autoTimeout = setTimeout(map.hideLoadingIndicator, 300);
};

map.hideLoadingIndicator = function () {
if (autoTimeout) {
clearTimeout(autoTimeout);
autoTimeout = null;
}

$("div#loading").fadeOut();
         
   
}; 
*/  