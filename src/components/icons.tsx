/**
 * Adaptador central de ícones — Font Awesome 6 via react-icons.
 * Os nomes locais isolam a lib dos call sites: trocar o pack de ícones no
 * futuro = mexer só neste arquivo.
 */
import type { IconType } from "react-icons";
import {
  FaWandMagicSparkles,
  FaBolt,
  FaGift,
  FaRoute,
  FaLightbulb,
  FaHandSparkles,
  FaArrowTrendUp,
  FaPenToSquare,
  FaComments,
  FaMagnifyingGlassChart,
  FaFileSignature,
  FaGraduationCap,
  FaStore,
  FaRobot,
  FaBoxesStacked,
  FaBullhorn,
  FaTruck,
  FaHeadset,
  FaBagShopping,
  FaCartShopping,
  FaPlane,
} from "react-icons/fa6";

export {
  FaWhatsapp as WhatsAppIcon,
  FaInstagram as InstagramIcon,
  FaFacebookF as FacebookIcon,
  FaTiktok as TikTokIcon,
} from "react-icons/fa6";

/** Mapa de ícones de conteúdo (chave em `lib/site.ts` → componente FA6). */
export const FEATURE_ICONS = {
  sparkles: FaWandMagicSparkles,
  bolt: FaBolt,
  gift: FaGift,
  route: FaRoute,
  lightbulb: FaLightbulb,
  handSparkles: FaHandSparkles,
  trendUp: FaArrowTrendUp,
  penToSquare: FaPenToSquare,
  comments: FaComments,
  chart: FaMagnifyingGlassChart,
  contract: FaFileSignature,
  graduation: FaGraduationCap,
  store: FaStore,
  robot: FaRobot,
  boxes: FaBoxesStacked,
  bullhorn: FaBullhorn,
  truck: FaTruck,
  headset: FaHeadset,
  bag: FaBagShopping,
  cart: FaCartShopping,
  plane: FaPlane,
} satisfies Record<string, IconType>;

export type FeatureIconName = keyof typeof FEATURE_ICONS;
