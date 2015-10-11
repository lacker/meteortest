Tasks = new Mongo.Collection("tasks");


function add(message) {
  if (!message) {
    message = "yolo " + Math.floor(1000 * Math.random());
  }
  Tasks.insert({
    text: message,
    createdAt: new Date(),
  });
}

if (Meteor.isClient) {
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
