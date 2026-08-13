import {
  Battery,
  Car,
  CircleDashed,
  ClipboardCheck,
  ClipboardList,
  Disc,
  FileText,
  Gauge,
  Paintbrush,
  ScanLine,
  Search,
  Truck,
  Wind,
  type LucideIcon,
} from "lucide-react";

/**
 * WorkshopService — the 13 general auto-workshop services added to NEO
 * Energy's Services menu, alongside NEO's own 4 EV-specific ones (Battery
 * Systems, Component Repair, Maintenance, Diagnostics). Content is adapted
 * from teamauto.sg's real, live service pages — NEO Energy is TEAM AUTOPRO
 * Pte Ltd's sub-business (client-confirmed), so these are genuine NEO
 * offerings, not invented ones. Adapted, not copy-pasted: contact channels
 * point at NEO's own confirmed WhatsApp/contact form rather than TeamAuto's
 * own phone line, and brand-specific claims that belong to a named TeamAuto
 * program (e.g. a specific app, a named warranty plan) are left out rather
 * than presented as NEO's own unconfirmed program.
 *
 * `image`/`imageAlt` — client-confirmed as safe to reuse (many are their own
 * AI-generated images, filenames like `ChatGPT-Image-...`; the rest they've
 * confirmed carry no copyright restriction on reuse here). Downloaded to
 * `public/images/services/`. Tyres Repair has no `image`: the only image on
 * its TeamAuto source page was mislabelled (a brake-disc photo on the tyres
 * page), so rather than carry that mismatch over, it's left text-only.
 */
export type WorkshopService = {
  slug: string;
  title: string;
  icon: LucideIcon;
  summary: string;
  overview: string[];
  includes: string[];
  signs?: string[];
  image?: string;
  imageAlt?: string;
};

export const workshopServices: WorkshopService[] = [
  {
    slug: "accident-repairs",
    title: "Accident Repairs",
    icon: Car,
    summary:
      "Restoring your vehicle to pre-accident condition — from assessment through to final paint finish.",
    overview: [
      "After a collision, our technicians assess the damage first and walk you through the practical options — repair or replace — before any work begins.",
      "Every repair uses OEM (Original Equipment Manufacturer) parts, so the fix matches what the vehicle was built with, not an aftermarket substitute.",
    ],
    includes: [
      "Full damage assessment and repair-vs-replace guidance",
      "Dent removal, panel sanding, and surface preparation",
      "Primer application",
      "Paint finishing matched to the vehicle's original colour",
    ],
    image: "/images/services/accident-repairs.webp",
    imageAlt: "A car undergoing accident repair work",
  },
  {
    slug: "vehicle-inspection",
    title: "Vehicle Inspection",
    icon: ClipboardCheck,
    summary:
      "LTA-standard inspection services, covering both statutory pre-checks and pre-purchase assessments.",
    overview: [
      "Our inspection process is modelled on LTA's own standards. Two paths are available depending on what you need: a statutory pre-check ahead of your official LTA inspection, or a pre-purchase assessment before you buy.",
    ],
    includes: [
      "LTA Statutory pre-check — preparing your vehicle ahead of the official inspection",
      "Pre-Purchase inspection — an extensive checklist covering engine and undercarriage noise, and suspension performance",
      "Experienced technicians handling the assessment start to finish",
    ],
    image: "/images/services/vehicle-inspection.png",
    imageAlt: "A technician carrying out a vehicle inspection",
  },
  {
    slug: "insurance-claims",
    title: "Insurance Claims",
    icon: FileText,
    summary: "Guidance through the claims process, from reporting the accident to filing the paperwork.",
    overview: [
      "Singapore requires you to report an accident within 24 hours, or by the next working day — even if you don't intend to file a claim. Skipping this step can void your policy's coverage.",
      "Our team helps you understand what to report, when, and how, and guides you through the documentation your insurer will ask for.",
    ],
    includes: [
      "Guidance on mandatory accident-reporting timelines",
      "Help preparing and understanding claim documentation",
      "Advice through the insurer's process, start to finish",
    ],
    image: "/images/services/insurance-claims.webp",
    imageAlt: "A car insurance claim form on a table",
  },
  {
    slug: "pre-purchase-vehicle-inspection",
    title: "Pre-Purchase Vehicle Inspection",
    icon: Search,
    summary: "A full independent check before you commit to a used vehicle — so there are no surprises after you buy.",
    overview: [
      "Buying a used vehicle without an independent check is a gamble. Our pre-purchase inspection is built to catch what a test drive alone won't.",
    ],
    includes: [
      "Computerised diagnostics with factory-standard tools, to catch hidden or intermittent faults",
      "A wear assessment with repair recommendations",
      "A roadworthiness test — on-road drivability and performance",
      "Accident and structural damage assessment, focused on chassis and undercarriage integrity",
      "A detailed written report after the inspection",
    ],
    image: "/images/services/pre-purchase-vehicle-inspection.png",
    imageAlt: "A pre-purchase vehicle inspection in progress",
  },
  {
    slug: "lta-pre-vehicle-inspection",
    title: "LTA Pre-Vehicle Inspection",
    icon: ClipboardList,
    summary: "A pre-check by our technicians before your official LTA inspection — so there are zero surprises on the day.",
    overview: [
      "We run the same checks LTA's own inspectors look for, before you get there — so any issue gets caught and fixed on your terms, not theirs.",
    ],
    includes: [
      "Functional checks: brakes, suspension, battery, side-slip test, tyre pressure and condition, undercarriage, horn, lights and indicators",
      "Visual checks: engine and transmission, suspension system, driveshaft boot covers, brake hoses and pipes, cooling system",
    ],
    image: "/images/services/lta-pre-vehicle-inspection.webp",
    imageAlt: "A workshop preparing a vehicle for LTA inspection",
  },
  {
    slug: "spray-painting",
    title: "Spray Painting",
    icon: Paintbrush,
    summary: "From minor touch-ups to a complete respray — colour-matched and finished to a factory standard.",
    overview: [
      "Faded or dull paint, scratches, dents, chips, uneven paintwork, or a custom colour request — every job starts with an assessment to work out whether it needs a spot repair or a full-body respray.",
      "We use a high-precision computerised paint-matching system, and apply premium automotive-grade paint for a durable, factory-quality finish.",
    ],
    includes: [
      "Damage assessment — spot repair vs. full respray",
      "Computerised colour matching",
      "Premium automotive-grade paint application",
      "Custom colour and finish requests",
    ],
    image: "/images/services/spray-painting.jpg",
    imageAlt: "A car being spray-painted in a paint booth",
  },
  {
    slug: "aircon-repair-maintenance",
    title: "Aircon Repair & Maintenance",
    icon: Wind,
    summary: "From quick fixes to a full system check — keeping your cabin cool before it becomes a costly repair.",
    overview: [
      "We recommend a service every 20,000 km or once a year, whichever comes first — regular checks catch small issues before they become expensive ones.",
    ],
    includes: [
      "Air filter and duct cleaning",
      "Refrigerant gas top-ups",
      "Compressor belt inspection and replacement",
      "Leak detection and repair",
      "Full system servicing and overhauls",
    ],
    signs: [
      "Weak or warm airflow",
      "Musty or unusual smells",
      "Strange noises when the system is running",
      "Inconsistent cooling",
    ],
    image: "/images/services/aircon-repair-maintenance.jpg",
    imageAlt: "Servicing a car's air-conditioning system",
  },
  {
    slug: "wheel-alignment",
    title: "Wheel Alignment",
    icon: Gauge,
    summary: "Positioning all four wheels to manufacturer spec — for safety, handling, and tyre life.",
    overview: [
      "Misalignment shows up gradually — in how the car handles, how the tyres wear, and eventually in fuel efficiency. Our technicians assess and adjust alignment against the manufacturer's own specification.",
    ],
    includes: [
      "Full four-wheel alignment check and adjustment",
      "Assessment against manufacturer specification",
    ],
    signs: [
      "The vehicle pulls or drifts to one side",
      "The steering wheel sits off-centre when driving straight",
      "Vibration through the steering wheel",
      "Loose or unstable-feeling steering",
      "Uneven tyre wear",
    ],
    image: "/images/services/wheel-alignment.jpg",
    imageAlt: "A car on a wheel-alignment stand with sensors on its wheels",
  },
  {
    slug: "brake-repair",
    title: "Brake Repair",
    icon: Disc,
    summary: "Diagnostics, pad and rotor replacement, and fluid changes — brakes are not the place to wait and see.",
    overview: [
      "We recommend at least one brake inspection a year, and an immediate check the moment any warning sign shows up.",
    ],
    includes: [
      "Full brake system diagnostics",
      "Brake pad and rotor replacement",
      "Rotor resurfacing",
      "Brake fluid change",
    ],
    signs: [
      "A high-pitched squeal or grinding sound (worn pads)",
      "An unresponsive or soft brake pedal (fluid leak or air in the line)",
      "Vibration when braking (warped rotors)",
    ],
    image: "/images/services/brake-repair.jpg",
    imageAlt: "A technician servicing a car's brakes",
  },
  {
    slug: "car-battery-service",
    title: "Car Battery Service",
    icon: Battery,
    summary:
      "Health checks, maintenance, and replacement for your vehicle's 12V starter battery — separate from our EV traction battery work.",
    overview: [
      "Most car batteries last between 3 to 5 years. We test, maintain, and — when it's time — replace your 12V starter battery, so a flat battery doesn't catch you off guard.",
      "Looking for EV traction battery service instead? See Battery Systems, Component Repair, or Diagnostics.",
    ],
    includes: [
      "Battery health testing",
      "Charging and maintenance",
      "Terminal cleaning",
      "Professional replacement",
    ],
    signs: [
      "Slow engine cranking",
      "Battery or check-engine warning light",
      "Dimming headlights",
      "A foul smell (possible leak)",
    ],
    image: "/images/services/car-battery-service.jpeg",
    imageAlt: "A technician working on a car's 12V battery",
  },
  {
    slug: "vehicle-diagnostic-checks",
    title: "Vehicle Diagnostic Checks",
    icon: ScanLine,
    summary:
      "OBD-based fault-finding for your vehicle's onboard systems — including tracking down what triggered the check-engine light.",
    overview: [
      "Using your vehicle's Onboard Diagnostics (OBD) system, we identify the fault before it affects engine performance and turns into a costlier repair.",
    ],
    includes: [
      "Quick fault identification via OBD",
      "Precise repair recommendations",
      "Preventive maintenance guidance",
    ],
    image: "/images/services/vehicle-diagnostic-checks.png",
    imageAlt: "A vehicle diagnostic check in progress",
  },
  {
    slug: "tyres-repair",
    title: "Tyres Repair",
    icon: CircleDashed,
    summary: "Puncture repairs, replacement, balancing, and a 24-hour islandwide emergency callout.",
    overview: [
      "A free, no-obligation inspection is the starting point for every visit. If you're stuck with a flat, our emergency tyre repair team covers the island, 24 hours a day.",
    ],
    includes: [
      "Puncture repairs",
      "Tyre replacement",
      "Wheel balancing and rotation",
      "Valve replacement",
      "Pressure checks",
      "24-hour islandwide emergency callout",
    ],
    signs: ["Reduced tread depth", "Visible cracks or bulges", "Uneven wear"],
  },
  {
    slug: "fleet-management",
    title: "Fleet Management",
    icon: Truck,
    summary: "Maintenance and support built for businesses running more than one vehicle.",
    overview: [
      "Built to streamline operations, cut costs, and reduce downtime across your whole fleet — not just one vehicle at a time.",
    ],
    includes: [
      "Preventive maintenance and routine inspections to cut downtime",
      "Customised maintenance scheduling",
      "Complete per-vehicle service history documentation",
      "Emergency repairs and mobile servicing",
      "Fleet assessment and consultation",
      "Ongoing performance monitoring with improvement recommendations",
    ],
    image: "/images/services/fleet-management.png",
    imageAlt: "A fleet of business vehicles under management",
  },
];

export function getWorkshopService(slug: string): WorkshopService | undefined {
  return workshopServices.find((service) => service.slug === slug);
}
