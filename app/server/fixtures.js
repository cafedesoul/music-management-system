if (Posts.find().count() === 0) {
  Posts.insert({
    title: 'Introducing Telescope',
    slug: 'introducing-telescope',
    url: 'http://sachagreif.com/introducing-telescope/'
  });

  Posts.insert({
    title: 'Meteor',
    slug: 'meteor',
    url: 'http://meteor.com'
  });

  Posts.insert({
    title: 'The Meteor Book',
    slug: 'the-meteor-book',
    url: 'http://themeteorbook.com'
  });
}