import { BadRequestError, validateRequest } from "@hpshops/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { User } from "../model/userModel";
import generateToken from "../utils/jsonwebtoken";

const router = express.Router();

router.post(
    '/api/auth/register',
    [
        body("email").isEmail().withMessage("email must be value"),
        body("password")
            .trim()
            .notEmpty()
            .withMessage("password must be value"),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { email, password, name } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            throw new BadRequestError("User already exists");
        }

        const user = User.build({ email, password, name });
        await user.save();
        const token: any = generateToken(user);

        req.session = {
            jwt: token,
            userDetails: user,
        };

        res.status(201).json({
            email,
            name,
        });

    }
);

export { router as SignUpRouter }

