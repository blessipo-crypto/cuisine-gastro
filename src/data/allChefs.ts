import { Chef } from '../types/chef';
import { CHEFS_DATA } from './chefs';
import { WORLD_CHEFS_DATA } from './worldRestaurants';
import { resolveChefRegion } from './regions';

// Combine core monographs and expanded global Michelin-starred establishments without circular imports
const seenIds = new Set<string>();
export const ALL_CHEFS_DATA: Chef[] = [...CHEFS_DATA, ...WORLD_CHEFS_DATA]
  .filter((chef) => {
    if (seenIds.has(chef.id)) return false;
    seenIds.add(chef.id);
    return true;
  })
  .map((chef) => ({
    ...chef,
    region: resolveChefRegion(chef),
  }));
