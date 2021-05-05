"use strict";
const router=require("express").Router(),
      userRoutes=require("./userRoutes"),
      subscriberRoutes=require("./subscriberRoutes"),
      errorRoutes=require("./errorRoutes"),
      courseRoutes=require("./courseRoutes"),
      homeRoutes=require("./homeRoutes");
const apiRoutes=require("./apiRoutes");

router.use("/api",apiRoutes);
router.use("/users",userRoutes);
router.use("/subscribers",subscriberRoutes);
router.use("/courses",courseRoutes);
router.use("/",homeRoutes);
router.use("/",errorRoutes);


module.exports=router;