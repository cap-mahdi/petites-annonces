import { Request, Response } from "express";
import type { CreateInternalAdDto, UpdateInternalAdDto } from "@my-app/types";
import { internalAdService } from "../services/internal-ad.service";

export class InternalAdController {
  // GET /api/ads - Get all ads
  static getAllAds(req: Request, res: Response) {
    const ads = internalAdService.findAll();
    res.json({
      success: true,
      data: ads,
    });
  }

  // GET /api/ads/:id - Get ad by ID
  static getAdById(req: Request, res: Response) {
    const { id } = req.params;
    const ad = internalAdService.findById(id);

    if (!ad) {
      return res.status(404).json({
        success: false,
        message: "Annonce non trouvée",
      });
    }

    res.json({
      success: true,
      data: ad,
    });
  }

  // POST /api/ads - Create new ad
  static createAd(req: Request, res: Response) {
    const data: CreateInternalAdDto = req.body;
    const newAd = internalAdService.create(data);

    res.status(201).json({
      success: true,
      data: newAd,
      message: "Annonce créée avec succès",
    });
  }

  // PUT /api/ads/:id - Update ad
  static updateAd(req: Request, res: Response) {
    const { id } = req.params;
    const data: UpdateInternalAdDto = req.body;

    const updatedAd = internalAdService.update(id, data);

    if (!updatedAd) {
      return res.status(404).json({
        success: false,
        message: "Annonce non trouvée",
      });
    }

    res.json({
      success: true,
      data: updatedAd,
      message: "Annonce mise à jour avec succès",
    });
  }

  // DELETE /api/ads/:id - Delete ad
  static deleteAd(req: Request, res: Response) {
    const { id } = req.params;
    const deleted = internalAdService.delete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Annonce non trouvée",
      });
    }

    res.json({
      success: true,
      message: "Annonce supprimée avec succès",
    });
  }
}
