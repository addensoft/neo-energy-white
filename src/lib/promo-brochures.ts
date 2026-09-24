/**
 * PROMO_BROCHURES — real, client-supplied promotional posters, uploaded to
 * `assets/promo/` and copied into `public/images/promo/` (resized from
 * their original multi-megabyte exports down to a web-appropriate size;
 * content unchanged). Not placeholder offers — both prices and phone
 * number on these posters are real, so nothing should be added to this
 * list without an actual poster to back it.
 */
export type PromoBrochure = {
  title: string;
  summary: string;
  src: string;
};

export const promoBrochures: PromoBrochure[] = [
  {
    title: "Pre-Purchase Inspection — $138",
    summary:
      "A complete, independent 10-point evaluation of an EV's condition, safety, and performance before you buy.",
    src: "/images/promo/pre-purchase-inspection-138.jpg",
  },
  {
    title: "EV Battery Maintenance Package",
    summary:
      "A 10-point battery service check — book 4 visits at $400 each (usually $800) for a $1,600 package, 50% off the usual $3,200.",
    src: "/images/promo/ev-battery-maintenance-package.jpg",
  },
];
