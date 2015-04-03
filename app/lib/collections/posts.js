Posts = new Mongo.Collection('posts');

NonEmptyString = Match.Where(function (x) {
  check(x, String);
  return x.length > 0;
});

Meteor.methods({
  postInsert: function(postAttributes) {
    check(Meteor.userId(), String);
    check(postAttributes, {
      title: NonEmptyString,
      url: NonEmptyString,
      slug: NonEmptyString
    });

    var postWithSameLink = Posts.findOne({slug: postAttributes.slug});
    if (postWithSameLink) {
      return {
        postExists: true,
        slug: postWithSameLink.slug
      }
    }

    var user = Meteor.user();
    var post = _.extend(postAttributes, {
      userId: user._id, 
      author: user.emails[0].address, 
      submitted: new Date()
    });

    var postId = Posts.insert(post);
    return {
      _id: postId
    };

  }
});