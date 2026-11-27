import { Router } from "express"; // use router
import bcrypt from "bcryptjs"; // hash the password
import prisma from "../lib/prisma.js"; // ORM

import { registerSchema } from "../zodSchemas/auth.schema.js"; // zod schema

const router = Router(); // instance of router

router.post("/register", async (req, res, next) => {
  try {
    // validate data using zod
    const result = registerSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: "Invalid registration data.",
        errors: result.error.issues,
      });
    }

    // get validated data
    const { name, email, password } = result.data;

    // we use prisma to check if email already exists
    const existEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existEmail) {
      return res.status(409).json({
        message: "An account with this email already exists",
      });
    }

    // hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 12);

    // create new user and store it in postgreSQL
    const user = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    // create a session for the new user
    req.session.regenerate((error) => {
      if (error) {
        return next(error);
      }

      req.session.userId = user.id;

      // send the response
      req.session.save((error) => {
        if (error) {
          return next(error);
        }

        return res.status(201).json({
          message: "Account created successfully.",
          user,
        });
      });
    });
  } catch (error) {
    next(error);
  }
});
export default router; // we export it
