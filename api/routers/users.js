import express from "express"
import { updateuser,deleteuser,getuser, follow,getuserquery ,getuserbyname,unfollow,getfriend} from "../controllers/user.js";
const router=express.Router();

router.get("/:username",getuserbyname)
router.get("/id/:id",getuser)
 router.put("/:id",updateuser)
 router.put("/:id/follow",follow)
 router.put("/:id/unfollow",unfollow)
 router.delete("/:id",deleteuser)
 router.get("/",getuserquery)
 router.get("/friends/:id",getfriend)

export default router