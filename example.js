$( document ).ready(function() {
  //Set defaults for readGitHub function
  $('[rel~="github"]').readGitHub({
    renderer: function(file) {
      return window.markdownit().render(file)
    }
  });
});

function getNewPage(url){

}

function updatePageMeta(){

}

function updateHash(){

}

function loadHash(){
  
}