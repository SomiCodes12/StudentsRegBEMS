import { Router } from "express"
import { createStudentInfo, viewStudentInfo, viewStudentsInfo } from "../Controller/InfoController"

const router = Router()

router.route("/create-student-info").post(createStudentInfo)
router.route("/view-students-info").get(viewStudentsInfo)
router.route("/view-student-info").post(viewStudentInfo)

export default router;