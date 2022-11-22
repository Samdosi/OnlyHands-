const express = require("express");
const { createUser, login, verifyEmail, forgotPassword, resetPassword } = require("../controllers/user");
const { body, validationResult } = require("express-validator");
const { auth_jwt } = require("../middleware/auth_jwt");
const router = express.Router();
const User = require("../schemas/User");
const crypto = require("crypto");
const { nextTick } = require("process");

router.get("/");

//user registration route 
router.post("/",
    //validating email and password
    body("email").isEmail(),
    body("password").isLength({ min: 8 }), async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ "success": false , "message": errors.array() });
        }

        const username = req.body.username;
        const password = req.body.password;
        const email = req.body.email;
        const emailToken = crypto.randomBytes(64).toString("hex");

        await createUser({
            username,
            password,
            email,
            emailToken,
        }, res);
    });

//user login route 
router.post("/login", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    await login({
        password,
        username,
    }, res);
});

//email verification route link
router.get("/verify-email", async (req, res) => {
    const tk = req.query.token;
    await verifyEmail(tk, res);
});

//forgot password routes 
router.get("/forgot-password");
router.put("/forgot-password", body('email').isEmail().withMessage('Enter a valid email address'), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ "success": false, "message": "Invalid email address" });

    const email = req.body.email;
    await forgotPassword(email, res);
});

//password reset routes link
router.get("/password-reset");
router.put("/password-reset",
    body("password").not().isEmpty().isLength({ min: 8 }).withMessage('Must be at least 8 chars long'),
    body("confirmPassword", "Passwords do not match").custom((value, { req }) => (value === req.body.password)),
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ "success": false, "message": "Invalid new password"});
        await resetPassword(req, res);
});

router.get("/secret-stuff", auth_jwt, (req, res) => {
    return res.status(200).json({ msg: "You found my secret stuff!" });
});

module.exports = router;