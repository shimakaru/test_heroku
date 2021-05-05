"use strict";
const Subscriber=require("../models/subscriber"),
  getSubscriberParams=(body)=>{
    return{
      name:body.name,
      email:body.email,
      zipCode:parseInt(body.zipCode)
    };
  };
module.exports={
  index:(req,res,next)=>{
    Subscriber.find()
      .then(subscribers=>{
        res.locals.subscribers=subscribers;
        next();
      })
      .catch(err=>{
        console.log(`Error fetching subscribers: ${err.message}`);
        next(err);
      });
  },
  indexView:(req,res)=>{
    res.render("subscribers/index");
  },
  new:(req,res)=>{
    res.render("subscribers/new");
  },
  create:(req,res,next)=>{
    let subscriberParams=getSubscriberParams(req.body);
    Subscriber.create(subscriberParams)
      .then(subscriber=>{
        req.flash("success", `${subscriber.name}'s account created successfully!`);
        res.locals.redirect="/subscribers";
        res.locals.subscriber=subscriber;
        next()
      })
      .catch(err=>{
        req.flash("error", `Failed to create user account because: ${error.message}.`);
        res.locals.redirect = "/subscribers/new";
        console.log(`Error saving subscribers: ${err.message}`);
        next(err);
      });
  },
  redirectView:(req,res,next)=>{
    let redirectPath=res.locals.redirect;
    if(redirectPath) res.redirect(redirectPath);
    else next();
  },
  show:(req,res,next)=>{
    var subscriberId=req.params.id;
    Subscriber.findById(subscriberId)
      .then(subscriber=>{
        res.locals.subscriber=subscriber;
        next()
      })
      .catch(err=>{
        console.log(`Error fetching subscribers by ID: ${err.message}`);
        next(err);
      });
  },
  showView:(req,res)=>{
    res.render("subscribers/show");
  },
  edit:(req,res,next)=>{
    var subscriberId=req.params.id;
    Subscriber.findById(subscriberId)
    .then(subscriber=>{
      res.render("subscribers/edit",{
        subscriber:subscriber
      });
    })
    .catch(err=>{
      console.log(`Error fetching subscriber by ID:${err.message}`);
      next(err);
    });
  },
  update:(req,res,next)=>{
    let subscriberId=req.params.id;
    let subscriberParams=getSubscriberParams(req.body);
    Subscriber.findByIdAndUpdate(subscriberId,{
      $set:subscriberParams
    })
      .then(subscriber=>{
        res.locals.redirect=`/subscribers/${subscriberId}`;
        res.locals.subscriber=subscriber;
        next()
      })
      .catch(err=>{
        console.log(`Error updating subscribers: ${err.message}`);
        next(err);
      });
  },
  delete:(req,res,next)=>{
    let subscriberId=req.params.id;
    let subscriberParams=getSubscriberParams(req.body);
    Subscriber.findByIdAndDelete(subscriberId)
      .then(()=>{
        res.locals.redirect="/subscribers/";
        next()
      })
      .catch(err=>{
        console.log(`Error deleting subscribers: ${err.message}`);
        next(err);
      });
  }
}