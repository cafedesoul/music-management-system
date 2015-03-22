Template.postItem.helpers({
  domain: function() {
    return (this.title).toLowerCase().replace(' ', '-');
  }
});