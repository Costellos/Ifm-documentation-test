(function($) {
    
    //Set Vars
    var docapi_container = $('.docapi');
    var url = 'https://raw.githubusercontent.com';
    var repo = docapi_container.attr('data-repo');
    var basefolder = docapi_container.attr('data-basefolder');
    var branch = docapi_container.attr('data-branch');
    var subfolder = docapi_container.attr('data-subfolder');
    var rd_file = 'README.md';


    if(docapi_container.attr('data-file') != ''){
        rd_file = docapi_container.attr('data-file');
    }else{
        rd_file = 'README.md';
    }

    if(window.location.hash) {
        console.log('has hash');

        var hash = window.location.hash;
        var hashObj = hash.split('/');
        subfolder = hashObj[0].replace('#', '');
        rd_file = hashObj[1];
    }

    //Initial Load of Default Readme File
    loadMarkdown(url,repo,basefolder,branch,subfolder,rd_file);

    $.getJSON("menu.json", function(data){

        var docapi_menu = $('.docapi_menu');
        var html = '';

        $.each(data.items, function() {
            html += '<li>';

            var id = this.id;
            var name = this.name;

            var type = this.type;

            if(type != 'ex'){
                var subfolder = this.subfolder;
                var file = this.file;

                if(this.has_children){
                    var has_children = this.has_children;
                    var children = this.children
                }else{
                    var has_children = false;
                    var children = '';
                }

                html += buildDocItem(id,name,subfolder,file,has_children,children);

            }else{
                var url = this.url;

                html += buildExItem(id,name,url);
            }

            html += '</li>';
        });

        docapi_menu.html(html);
    }).fail(function(){
        console.log("An error has occurred.");
    });


    $(document).on("click",".in_load",function(e){
        var test = $(this);


        var subfolder = test.attr('data-subfolder');
        var rd_file = test.attr('data-file');

        loadMarkdown(url,repo,basefolder,branch,subfolder,rd_file);

    });

    function buildDocItem(id,name,subfolder,file,has_children,children){

        var html = '';

        html += '<a class="in_load" data-subfolder="'+subfolder+'" data-file="'+file+'" href="#'+subfolder+'/'+file+'">'+name+'</a>';

        if(has_children){
            html += '<ul>';
            
            $.each(children, function() {
                html += '<li>';
    
                var id = this.id;
                var name = this.name;
    
                var type = this.type;
    
                if(type != 'ex'){
                    var subfolder = this.subfolder;
                    var file = this.file;
    
                    if(this.has_children){
                        var has_children = this.has_children;
                        var children = this.children
                    }else{
                        var has_children = false;
                        var children = '';
                    }
    
                    html += buildDocItem(id,name,subfolder,file,type,has_children,children);
    
                }else{
                    var url = this.url;
    
                    html += buildExItem(id,name,url);
                }
    
                html += '</li>';
            });

            html += '</ul>';
        }

        return html;
    }

    function buildExItem(id,name,url){
        var html = '';

        html += '<a href="'+url+'" target="_blank">'+name+'</a>';

        return html;
    }

    function getMarkdown(url) {
        var result="";
        $.ajax({
            url:url,
            async: false,  
        })
        .done(function(data){
            result = data;
        });
        return result;
    }

    function loadMarkdown(url,repo,basefolder,branch,subfolder,rd_file){

        if(subfolder != ''){
            url = [ url, repo, branch, basefolder, subfolder, rd_file ].join('/');
        }else{
            url = [ url, repo, branch, basefolder, rd_file ].join('/');
        }

        var docapi_content = $('.docapi_content');
        docapi_content.empty();


        var markDown = getMarkdown(url);
        var md = window.markdownit();
        var html = md.render(markDown);
        docapi_content.html(html);

    }

}(jQuery))
