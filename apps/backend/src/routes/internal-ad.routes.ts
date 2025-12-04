import { Router } from "express";
import { InternalAdController } from "../controllers/internal-ad.controller";
import {
  validateBody,
  validateParams,
} from "../middlewares/validation.middleware";
import { createInternalAdSchema, updateInternalAdSchema } from "@my-app/schema";
import { z } from "zod";

const router = Router();

const idParamSchema = z.object({
  id: z.string().uuid("ID invalide"),
});

// GET /api/ads - Get all ads
router.get("/", InternalAdController.getAllAds);

// GET /api/ads/:id - Get ad by ID
router.get(
  "/:id",
  validateParams(idParamSchema),
  InternalAdController.getAdById
);

// POST /api/ads - Create new ad
router.post(
  "/",
  validateBody(createInternalAdSchema),
  InternalAdController.createAd
);

// PUT /api/ads/:id - Update ad
router.put(
  "/:id",
  validateParams(idParamSchema),
  validateBody(updateInternalAdSchema),
  InternalAdController.updateAd
);

// DELETE /api/ads/:id - Delete ad
router.delete(
  "/:id",
  validateParams(idParamSchema),
  InternalAdController.deleteAd
);

export default router;
