/*!
 * Documentation JS
 * Author: William Donayre Jr.
 * Email: me@wdonayre.com
 */

(function(){

}).call(this);
$(document).ready(function($){

    var textarea = document.createElement("textarea");
    var codeBlock = $(".html");
    $(codeBlock).each(function(i,block){
        textarea.innerText = block.innerHTML;
        block.innerHTML = textarea.innerHTML;
        hljs.highlightBlock(block);
    });
    $(codeBlock).parent().addClass('active');
//    textarea.innerText = $(codeBlock).innerHTML;
//    $(codeBlock).innerHTML = textarea.innerHTML;

//    $(codeBlock).each(function(i,block){
//        hljs.highlightBlock(block);
//    });

//    $('pre code.html').each(function(i,block){
//        var textarea = document.createElement("textarea");
//        textarea.innerText = block.innerHTML;
//        block.innerHTML = textarea.innerHTML;
//        hljs.highlightBlock(block);
//    });
});