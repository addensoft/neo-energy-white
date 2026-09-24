/**
 * CERTIFICATES — real, client-supplied credential scans (CALB, CATL, and
 * Ngee Ann Polytechnic training certificates for the team), uploaded to
 * `assets/certificate/` and copied into `public/images/certificates/` with
 * clean filenames. Not placeholder data — every entry here is a real
 * document, so nothing should be added to this list without an actual
 * scan to back it.
 */
export type Certificate = {
  name: string;
  issuer: string;
  src: string;
};

// Ordered by issuer — CALB, then CATL, then Ngee Ann Polytechnic — per direct
// instruction, so the 4-per-row grid lands all 4 CALB certificates on row 1.
export const certificates: Certificate[] = [
  {
    name: "Alvin Chow",
    issuer: "CALB",
    src: "/images/certificates/alvin-chow-calb.jpeg",
  },
  {
    name: "Chan Kong Loong",
    issuer: "CALB",
    src: "/images/certificates/chan-kong-loong-calb.jpg",
  },
  {
    name: "David Chang",
    issuer: "CALB",
    src: "/images/certificates/david-chang-calb.jpeg",
  },
  {
    name: "Er Chong Haw",
    issuer: "CALB",
    src: "/images/certificates/er-chong-haw-calb.jpg",
  },
  {
    name: "David Chang",
    issuer: "CATL",
    src: "/images/certificates/david-chang-catl.jpeg",
  },
  {
    name: "Alvin Chow",
    issuer: "Ngee Ann Polytechnic",
    src: "/images/certificates/alvin-chow-ngee-ann-poly.jpg",
  },
  {
    name: "Chan Kong Loong",
    issuer: "Ngee Ann Polytechnic",
    src: "/images/certificates/chan-kong-loong-ngee-ann-poly.jpeg",
  },
  {
    name: "David Chang",
    issuer: "Ngee Ann Polytechnic",
    src: "/images/certificates/david-chang-ngee-ann-poly.jpg",
  },
  {
    name: "Mike Seow",
    issuer: "Ngee Ann Polytechnic",
    src: "/images/certificates/mike-seow-ngee-ann-poly.jpg",
  },
  {
    name: "Ng Yao Sheng",
    issuer: "Ngee Ann Polytechnic",
    src: "/images/certificates/ng-yao-sheng-ngee-ann-poly.jpg",
  },
];
