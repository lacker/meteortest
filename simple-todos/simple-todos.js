Tasks = new Mongo.Collection("tasks");


if (Meteor.isClient) {
  Tasks.insert({
    text: "yolo " + Math.floor(1000 * Math.random()),
    createdAt: new Date(),
  });

  Template.body.helpers({
    tasks: function() {
      return Tasks.find({}, {sort: {createdAt: -1}});
    }
  });
}

if (Meteor.isServer) {
  // Delete the messages with no date
  let old = Tasks.find({createdAt: {'$exists': false}}).fetch();
  for (var object of old) {
    Tasks.remove(object._id);
  }

  console.log('the server is running');
}
