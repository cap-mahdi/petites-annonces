import type {
  InternalAd,
  CreateInternalAdDto,
  UpdateInternalAdDto,
} from "@my-app/types";
import { randomUUID } from "crypto";

class InternalAdService {
  private ads: InternalAd[] = [];

  // Get all ads
  findAll(): InternalAd[] {
    return this.ads;
  }

  // Get ad by ID
  findById(id: string): InternalAd | undefined {
    return this.ads.find((ad) => ad.id === id);
  }

  // Create new ad
  create(data: CreateInternalAdDto): InternalAd {
    const newAd: InternalAd = {
      id: randomUUID(),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.ads.push(newAd);
    return newAd;
  }

  // Update ad
  update(id: string, data: UpdateInternalAdDto): InternalAd | undefined {
    const index = this.ads.findIndex((ad) => ad.id === id);
    if (index === -1) return undefined;

    const updatedAd: InternalAd = {
      ...this.ads[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    this.ads[index] = updatedAd;
    return updatedAd;
  }

  // Delete ad
  delete(id: string): boolean {
    const index = this.ads.findIndex((ad) => ad.id === id);
    if (index === -1) return false;

    this.ads.splice(index, 1);
    return true;
  }
}

export const internalAdService = new InternalAdService();
