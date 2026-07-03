import { categoriesData as coreCategories } from "./content";
import { extraCategories as web3Extra } from "./content-extra";
import { extraCategories as engExtra } from "./content-extra2";
import {
  allCategories,
  categorySlugs,
  categoryGroups,
  getCategoryMeta,
  GenLayerMark,
  BtcIcon,
} from "./content";
import type {
  Question,
  EssayQuestion,
  Module,
  Track,
  CategoryMeta,
  CategoryData,
} from "./content";

export {
  allCategories,
  categorySlugs,
  categoryGroups,
  getCategoryMeta,
  GenLayerMark,
  BtcIcon,
};

export type {
  Question,
  EssayQuestion,
  Module,
  Track,
  CategoryMeta,
  CategoryData,
};

export const categoriesData = [...coreCategories, ...web3Extra, ...engExtra];

export function getCategoryData(id: string): CategoryData | undefined {
  return categoriesData.find((c) => c.id === id);
}

export function getModuleById(id: string): { module: Module; category: CategoryMeta; trackTitle: string } | undefined {
  for (const cat of categoriesData) {
    for (const track of cat.tracks) {
      const mod = track.modules.find((m) => m.id === id);
      if (mod) return { module: mod, category: cat, trackTitle: track.title };
    }
  }
}

export function getAllModules() {
  const result: { module: Module; category: CategoryMeta; trackTitle: string; trackId: string }[] = [];
  for (const cat of categoriesData) {
    for (const track of cat.tracks) {
      for (const mod of track.modules) {
        result.push({ module: mod, category: cat, trackTitle: track.title, trackId: track.id });
      }
    }
  }
  return result;
}
