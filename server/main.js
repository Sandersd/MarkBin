import { Meteor } from 'meteor/meteor';
import { Bins } from '../imports/collections/bins.js';

Meteor.startup(() => {
  Meteor.publish("bins", function(){
    let userId = this.userId;
    return Bins.find({ownerId: userId});
  });

  Meteor.publish("sharedBins", function(){
    let userId = this.userId;
    let user = Meteor.users.findOne(userId);
    if(!user) { return; }
    let email = user.emails[0].address;
    return Bins.find({
      sharedWith: {$elemMatch: {$eq: email}}
    });
  });
});
