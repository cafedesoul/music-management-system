Template.postSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var post = {
      url: $(e.target).find('[name=url]').val(),
      title: $(e.target).find('[name=title]').val()
    };

    post.slug = slugify(post.title);

    Meteor.call('postInsert', post, function(error, result) {
       // show this result but route anyway
      if (result.postExists)
        alert('This link has already been posted');
      Router.go('postPage', {_id: result._id});  
    });
  }
});