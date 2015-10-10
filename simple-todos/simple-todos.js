if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    tasks: [
      { text: "This is task 1" },
      { text: "This is task 2" },
      { text: "This is task 3" }
    ]
  });
}

Tasks = new Mongo.Collection("tasks");

Tasks.insert({
  text: "yolo " + Math.floor(1000 * Math.random()),
  createdAt: new Date(),
});

if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    tasks: function() {
      return Tasks.find({createdAt: {'$exists': true}},
                        {sort: {createdAt: -1}});
    }
  });
}

