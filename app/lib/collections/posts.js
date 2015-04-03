Posts = new Mongo.Collection('posts');

// Make sure it's a string + not blank ''
NonEmptyString = Match.Where(function (x) {
  check(x, String);
  return x.length > 0;
});

Meteor.methods({
  postInsert: function(postAttributes) {

    // Make sure user is logged in with session
    check(Meteor.userId(), String);

    // Check to make sure all incoming data is correct
    check(postAttributes, {
      title: NonEmptyString,
      url: NonEmptyString,
      slug: NonEmptyString
    });

    // Slug must be unique, kick back if it is found
    var postWithSameLink = Posts.findOne({slug: postAttributes.slug});
    if (postWithSameLink) {
      return {
        postExists: true,
        slug: postWithSameLink.slug
      }
    }

    // Add user information on to postAttributes
    var user = Meteor.user();
    var post = _.extend(postAttributes, {
      userId: user._id, 
      author: user.emails[0].address, 
      submitted: new Date()
    });

    // Insert data and return the _id
    var postId = Posts.insert(post);
    return {
      _id: postId
    };

  }
});