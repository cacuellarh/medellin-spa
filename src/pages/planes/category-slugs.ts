import { PlanCategory } from '@c-code/c-code-fw/ui';

/** Valor de `?categoria=` en la URL de /planes para cada categoría. */
export const CATEGORY_SLUGS: Record<number, string> = {
  [PlanCategory.Individual]: 'individual',
  [PlanCategory.Couple]: 'pareja',
  [PlanCategory.Group]: 'grupal',
};

export function categoryFromSlug(slug: string | null | undefined): PlanCategory | null {
  const entry = Object.entries(CATEGORY_SLUGS).find(([, value]) => value === slug);
  return entry ? (Number(entry[0]) as PlanCategory) : null;
}
