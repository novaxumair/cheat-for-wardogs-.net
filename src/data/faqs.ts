export type FaqItem = { q: string; a: string }

export const HOME_FAQS: FaqItem[] = [
  {
    q: 'What are Wardogs cheats?',
    a: 'Wardogs cheats on cheatforwardogs.net are PC tools with aimbot, player ESP, vehicle ESP, 2D radar, and misc options — with Active or Updating loader status after game patches.',
  },
  {
    q: 'How much do Wardogs cheats cost?',
    a: 'Wardogs cheats start at $35 for monthly access (30 days). Lifetime access is $150. Confirm Active status and pricing on cheatforwardogs.net before checkout.',
  },
  {
    q: 'Do you sell tools for other games?',
    a: 'No. cheatforwardogs.net covers Wardogs only — one product, no multi-game catalog.',
  },
  {
    q: 'Is aimbot required?',
    a: 'Aimbot is optional. Many players lead with player ESP, vehicle ESP, and radar — then tune aimbot FOV, smooth, and visible check only when they want combat assist.',
  },
  {
    q: 'How do you handle game patches?',
    a: 'We publish Active or Updating labels after Wardogs updates. Elytra Anti-Cheat and game builds change — always check status on cheatforwardogs.net before you load.',
  },
  {
    q: 'What is Wardogs anti cheat?',
    a: 'Wardogs on PC uses Elytra Anti-Cheat. We track loader compatibility after patches and label builds Active or Updating on cheatforwardogs.net — load only when status matches your client.',
  },
  {
    q: 'What is Wardogs ESP?',
    a: 'Wardogs ESP shows players and vehicles through terrain with box, skeleton, health bar, weapon, team/squad, distance, OOF arrows, and max distance — plus vehicle type and occupied/empty state.',
  },
]

export const PRODUCT_PAGE_FAQS: FaqItem[] = [
  ...HOME_FAQS,
  {
    q: 'Which features are included?',
    a: 'Aimbot options include enable, FOV, smooth, bone selection, visible check, prediction, draw FOV, and draw target line. Player visuals cover box, skeleton, head circle, health bar, distance, name, team/squad, weapon, view direction, OOF arrows, and max distance. Vehicle ESP adds type, distance, and occupied/empty. Radar includes 2D radar, player markers, vehicle markers, and range. Misc covers no recoil, no spread, full bright, custom crosshair, and config save/load on Windows PC.',
  },
  {
    q: 'Do Wardogs cheats work on Steam?',
    a: 'Yes. The loader supports Wardogs on Steam for Windows PC when status is Active.',
  },
  {
    q: 'How do I get access?',
    a: 'Start on the homepage, review features and Active status, open the Wardogs store page, then continue to checkout for digital delivery.',
  },
  {
    q: 'How do I load Wardogs cheats?',
    a: 'Follow the complete setup guide: exclusions, launch Wardogs, run loader, configure ESP and radar, save a config. Re-check status after every patch.',
  },
  {
    q: 'Where do I get support?',
    a: 'Use the Support page and Discord channels linked after purchase. Include current status and whether you need load, menu, or delivery help.',
  },
  {
    q: 'Where can I read reviews?',
    a: 'Visit the Reviews page for buyer feedback on aimbot, ESP, radar, and loader updates.',
  },
  {
    q: 'Is this the official Wardogs site?',
    a: 'No. We cover third-party software for Wardogs only. Buy and play the game from official stores. We are not affiliated with Bulkhead or Team17.',
  },
]

export const FAQ_PAGE_FAQS: FaqItem[] = PRODUCT_PAGE_FAQS

export const SITE_FAQS = FAQ_PAGE_FAQS
