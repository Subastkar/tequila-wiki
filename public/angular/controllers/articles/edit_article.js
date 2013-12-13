wikiApp.controller('editArticle', [ '$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){
  var docContent, docTitle;

  var onError = function(error){
    alert(error.message);
  };

  var request = $http.get('/api/v1/articles/'+ $routeParams.id);

  request.success(function(article){
    $scope.article = article;

    //Open a share channel if the user is on editing mode
    if($scope.editing){
      var title_editor = ace.edit("title-editor");
      var content_editor = ace.edit("content-editor");

      sharejs.open(article._id, 'text', function(error, doc) {

        docContent = doc;
        //Attach original content if no one is using it.
        if(doc.snapshot === ""){ doc.insert(0, article.content); } 
        doc.attach_ace(content_editor);
      });

      console.log(article._id+'-title');
      sharejs.open(article._id+'-title', 'text', function(error, doc) {

        docTitle = doc;
        //Attach original content if no one is using it.
        if(doc.snapshot === ""){ doc.insert(0, article.title); } 
        doc.attach_ace(title_editor);
      });
    }
  });

  request.error(onError);

  $scope.saveArticle = function(){
    $scope.article.title = docTitle.snapshot;
    $scope.article.content = docContent.snapshot;

    var request = $http.put('/api/v1/articles/' + $routeParams.id, {article: $scope.article});

    request.success(function(data){
      alert(data.message);
      $location.path('/');
    });

    request.error(onError);
  };

  $scope.cancel = function(id){
    $location.path('/article/'+id);
  }
}]);
