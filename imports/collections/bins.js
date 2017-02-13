import { Mongo } from 'meteor/mongo';

Meteor.methods({
  'bins.insert':function(){
    return Bins.insert({
      createdAt: new Date(),
      content: '',
      sharedWith: [],
      ownerId: this.userId
    });
  },
  'bins.remove':function(id){
    return Bins.remove({_id: id});
  },
  'bins.update':function(id, content){
    return Bins.update({_id: id}, {$set: {content}});
  },
  'bins.share':function(id, email){
    return Bins.update({_id: id}, {$addToSet: {sharedWith: email}});
  }
});

export const Bins = new Mongo.Collection('bins');
