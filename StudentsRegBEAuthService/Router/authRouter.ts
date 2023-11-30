import {Router} from "express"
import { getAllStudents, getOneStudent, registerStudent, signInStudent, verifyStudent } from "../Controller/authController"

const router = Router()

router.route("/register-student").post(registerStudent)
router.route("/:studeentID/verify-student").patch(verifyStudent)
router.route("/sign-in-student").post(signInStudent)
router.route("/view-students").get(getAllStudents)
router.route("/view-one-student").get(getOneStudent)
router.route("/delete-student").delete()

export default router;