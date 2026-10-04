/**
 * Generates src/data/blogs.ts and src/data/forum-replies.ts for Wardogs SEO forums.
 */
import { writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const HOST = 'cheatforwardogs.net'

const POSTS = [
  {
    slug: 'features-list',
    title: 'Wardogs Cheats Features',
    tag: 'Features',
    intent: 'commercial',
    intentTerms: ['Wardogs cheat features', 'Wardogs tools', 'Wardogs features', 'Wardogs cheats'],
    kw: 'wardogs cheats, wardogs cheat',
    excerpt:
      'Full module checklist for Wardogs cheats on PC — aimbot, player ESP, vehicle overlays, 2D radar, and config tools before you open checkout.',
    sections: [
      {
        heading: 'What the menu includes',
        body: [
          `This thread mirrors the live module list on ${HOST}. Use it to compare aimbot, ESP, vehicle, radar, and misc toggles against what you need in control-zone fights.`,
          'Wardogs runs large lobbies with vehicles and three-team pressure — the feature set focuses on player awareness, transport intel, and optional combat assist rather than loot simulators.',
        ],
      },
      {
        heading: 'Aimbot, visuals, radar',
        body: [
          'Aimbot options cover enable, FOV, smooth, bone selection, visible check, prediction, draw FOV, and draw target line.',
          'Player visuals include box, skeleton, head circle, health bar, distance, name, team/squad, weapon, view direction, OOF arrows, and max distance.',
          'Vehicle visuals, 2D radar markers, and misc no recoil / no spread / full bright / custom crosshair / config save-load round out the stack.',
        ],
      },
    ],
  },
  {
    slug: 'complete-setup',
    title: 'Instructions to Use the Cheats',
    tag: 'Setup',
    intent: 'commercial',
    howTo: true,
    kw: 'get wardogs cheats, get wardogs cheat, wardogs cheats',
    excerpt:
      'Step-by-step Wardogs cheat setup on Windows: confirm Active status, exclusions, load order, first ESP profile, optional aimbot, save config.',
    sections: [
      {
        heading: '1) Confirm status and checkout',
        body: [
          `Open ${HOST} and check Active on the product card. When Updating after a Wardogs patch, wait — loading early wastes a session.`,
          'Plans start from $35 monthly with lifetime options; use only the delivery link from your order email.',
        ],
      },
      {
        heading: '2) Windows prep',
        body: [
          'Close Discord overlay, GeForce overlay, and RGB hooks. Add the delivery folder to Defender exclusions before first inject.',
        ],
      },
      {
        heading: '3) Load order',
        body: [
          'Launch Wardogs from Steam, reach the main menu, run the loader, open the menu, enable player ESP and radar, then add aimbot only if you want assist.',
        ],
      },
    ],
  },
  {
    slug: 'aimbot-settings',
    title: 'Aimbot Settings: What Level & Why Won’t I Get Banned?',
    tag: 'Aimbot',
    intent: 'informative',
    howTo: true,
    kw: 'wardogs aimbot, buy wardogs aimbot, wardogs aimbot lifetime',
    excerpt:
      'Tune Wardogs aimbot FOV, smooth, and visible check so tracking helps in control-zone fights without obvious kill-cam clips.',
    sections: [
      {
        heading: 'Start conservative',
        body: [
          'Wide FOV and zero smooth get reported fast — players review deaths in a 100-player lobby. Start small FOV, higher smooth, body bones first.',
          'Visible check stops tracking through solid cover; keep it on unless you accept more reports.',
        ],
      },
    ],
  },
  {
    slug: 'esp-wallhack-guide',
    title: 'Player ESP Settings: What to Enable First',
    tag: 'ESP',
    intent: 'informative',
    howTo: true,
    kw: 'wardogs esp, buy wardogs esp, wardogs esp lifetime',
    excerpt:
      'Configure Wardogs player ESP — box, skeleton, distance, weapon, team filter — without cluttering your HUD in mountain fights.',
    sections: [
      {
        heading: 'Recommended first toggles',
        body: [
          'Enable box, distance, and name. Add weapon ESP when you rotate solo — DMR vs SMG changes peek timing at 40m.',
          'Cap max distance around 150–200m so tags stay readable during control-zone pushes.',
        ],
      },
    ],
  },
  {
    slug: 'vehicle-esp-first',
    title: 'Vehicle ESP Settings: What to Enable First',
    tag: 'Vehicles',
    intent: 'informative',
    howTo: true,
    kw: 'wardogs esp',
    excerpt:
      'Vehicle ESP type, distance, and occupied/empty indicators for Wardogs — spot transports before you cross open ground.',
    sections: [
      {
        heading: 'Priority toggles',
        body: [
          'Turn on vehicle ESP with type labels and occupied/empty state. Distance under 300m keeps the overlay clean.',
          'Pair with 2D radar vehicle markers when your squad splits — one player on foot still sees convoy movement.',
        ],
      },
    ],
  },
  {
    slug: 'radar-recommended-config',
    title: '2D Radar & Control Zone: Recommended Configurations',
    tag: 'Radar',
    intent: 'informative',
    howTo: true,
    kw: 'wardogs esp',
    excerpt:
      '2D radar range, player markers, and vehicle markers tuned for Wardogs control-zone rotations and third-party sound.',
    sections: [
      {
        heading: 'Radar defaults',
        body: [
          'Start radar range medium — too wide floods the minimap in dense fights. Player markers on, vehicle markers on for hill rotations.',
          'Drop range when pushing buildings so arrows match audible footsteps.',
        ],
      },
    ],
  },
  {
    slug: 'combat-assist-settings',
    title: 'Combat Assist Settings: What Level & Ban Risk Explained',
    tag: 'Combat',
    intent: 'informative',
    kw: 'wardogs aimbot',
    excerpt:
      'Balance aimbot smooth, FOV, and ESP noise for Wardogs ranked-style queues — report habits and kill cam reality.',
    sections: [
      {
        heading: 'Reports matter',
        body: [
          'Players flag snap deaths and impossible prefires. ESP-only nights plus low smooth aimbot beat max settings in week one.',
        ],
      },
    ],
  },
  {
    slug: 'game-patch-status',
    title: 'Wardogs Cheats After a Game Patch — What to Do',
    tag: 'Status',
    intent: 'informative',
    kw: 'wardogs cheats, wardogs anti',
    excerpt:
      'What Active vs Updating means after Wardogs patches — and why loading early wastes your control-zone session.',
    sections: [
      {
        heading: 'Status labels',
        body: [
          `Active means the loader matches the live client. Updating means wait — check ${HOST} before every session.`,
        ],
      },
    ],
  },
  {
    slug: 'ultimate-wardogs-cheats-guide',
    title: 'Ultimate Wardogs Cheats Guide: Setup & Features',
    tag: 'Guide',
    intent: 'commercial',
    kw: 'wardogs cheats, wardogs esp, wardogs aimbot, wardogs anti',
    excerpt:
      'Overview of Wardogs cheat modules, loader status, and first-night config for control-zone and vehicle fights on PC.',
    sections: [
      {
        heading: 'Feature map',
        body: [
          'Aimbot, player ESP, vehicle ESP, 2D radar, and misc weapon helpers — match toggles to how your trio rotates hills and roads.',
        ],
      },
    ],
  },
  {
    slug: 'buy-wardogs-cheats-safely',
    title: 'Where to Buy Wardogs Cheats Safely: Full Access Options',
    tag: 'Buying',
    intent: 'transactional',
    kw: 'buy wardogs cheats, buy wardogs cheat, buy wardogs esp, buy wardogs aimbot',
    excerpt:
      'How to buy Wardogs cheats with clear pricing, digital delivery, and status labels before you load into a 100-player lobby.',
    sections: [
      {
        heading: 'Before checkout',
        body: [
          `Use ${HOST} for live Active/Updating status. Monthly and lifetime licenses include loader updates when status allows.`,
        ],
      },
    ],
  },
  {
    slug: 'wardogs-cheats-lifetime',
    title: 'Wardogs Cheats Lifetime License: Is Permanent Access Worth It?',
    tag: 'Pricing',
    intent: 'transactional',
    kw: 'wardogs cheats lifetime, wardogs cheat lifetime, wardogs aimbot lifetime, wardogs esp lifetime',
    excerpt:
      'Lifetime vs monthly Wardogs cheat access — when permanent makes sense for regular control-zone players.',
    sections: [
      {
        heading: 'Who lifetime fits',
        body: [
          'If you play multiple nights per week through seasons, lifetime offsets monthly renewals. Casual players often start monthly first.',
        ],
      },
    ],
  },
  {
    slug: 'wardogs-cheat-discord',
    title: 'Official Wardogs Cheat Discord Server: How to Join for Live Support',
    tag: 'Community',
    intent: 'navigational',
    kw: 'wardogs cheat discord',
    excerpt:
      'Find live Wardogs cheat support channels after purchase — status pings, config screenshots, and patch-day threads.',
    sections: [
      {
        heading: 'What Discord is for',
        body: [
          'Discord complements the forums here — quick loader screenshots and patch chatter. Purchase still flows through the store link on the product page.',
        ],
      },
    ],
  },
  {
    slug: 'best-wardogs-cheats-review-2026',
    title: 'Wardogs Cheats Review 2026: Features, Safety & Value',
    tag: 'Review',
    intent: 'commercial',
    kw: 'wardogs cheats, buy wardogs cheats, wardogs cheats lifetime',
    excerpt:
      '2026 Wardogs cheats review — ESP clarity, aimbot tuning, vehicle radar, pricing, and loader maintenance on cheatforwardogs.net.',
    sections: [
      {
        heading: 'What we compared',
        body: [
          'Module depth, config save/load, status transparency, and how fast ESP recovered after game patches — not hype claims.',
        ],
      },
    ],
  },
  {
    slug: 'hwid-spoofer-safety',
    title: 'Discover What an HWID Spoofer Does for Safety',
    tag: 'Safety',
    intent: 'informative',
    kw: 'wardogs anti',
    excerpt:
      'HWID spoofer basics for PC gamers — what hardware IDs are, why some players research them, and realistic limits.',
    sections: [
      {
        heading: 'Plain-language overview',
        body: [
          'A spoofer changes how your PC fingerprint appears to some anti-cheat stacks. It is not a substitute for reading loader status or playing conservatively.',
        ],
      },
    ],
  },
  {
    slug: 'wardogs-aimbot-options',
    title: 'Precision Target Lock: Mastering Wardogs Aimbot Options',
    tag: 'Aimbot',
    intent: 'informative',
    kw: 'wardogs aimbot',
    excerpt: 'Deep dive on Wardogs aimbot enable, FOV, smooth, bones, visible check, and prediction.',
    sections: [{ heading: 'Core toggles', body: ['Work FOV down before touching prediction — leading targets matters most on moving vehicles.'] }],
  },
  {
    slug: 'enable-aimbot-safely',
    title: 'How to Configure and Enable Aimbot Safely in Wardogs',
    tag: 'Aimbot',
    intent: 'informative',
    kw: 'wardogs aimbot',
    excerpt: 'Enable aimbot only after ESP and radar baselines — bind toggles and test in offline range first.',
    sections: [{ heading: 'Enable order', body: ['Player ESP on, visible check on, then enable aimbot with high smooth.'] }],
  },
  {
    slug: 'aimbot-fov-settings',
    title: 'Dialing in Your Field of View Settings for Natural Aiming',
    tag: 'Aimbot',
    intent: 'informative',
    excerpt: 'FOV cone sizing for CQB buildings vs open hills in Wardogs.',
    sections: [{ heading: 'FOV tips', body: ['Draw FOV helps you see the cone — keep it smaller than your reflex FOV.'] }],
  },
  {
    slug: 'aimbot-smooth-guide',
    title: 'How Smooth Aiming Keeps Your Gameplay Looking Legitimate',
    tag: 'Aimbot',
    intent: 'informative',
    excerpt: 'Smooth values that reduce snap on kill cams without feeling sluggish.',
    sections: [{ heading: 'Smoothing', body: ['Higher smooth on DMR, moderate on AR — save profiles per weapon class.'] }],
  },
  {
    slug: 'bone-selection-guide',
    title: 'Targeted Bone Selection Guide: Headshots vs Body Shots',
    tag: 'Aimbot',
    intent: 'informative',
    excerpt: 'Bone selection tradeoffs for moving targets and armored foes.',
    sections: [{ heading: 'Bones', body: ['Chest default for moving tags; head bone only when smooth is high enough.'] }],
  },
  {
    slug: 'visible-check-guide',
    title: 'Preventing Wall Tracking: Why Visible Check Is Essential',
    tag: 'Aimbot',
    intent: 'informative',
    excerpt: 'Visible check stops locks through metal walls — use it in urban control zones.',
    sections: [{ heading: 'Visible check', body: ['Without it, kill cams show pre-fire through cover — reports stack fast.'] }],
  },
  {
    slug: 'bullet-prediction',
    title: 'Leading Your Shots: Bullet Prediction Mechanics Explained',
    tag: 'Aimbot',
    intent: 'informative',
    excerpt: 'Prediction for sprinting targets and vehicle exits in Wardogs.',
    sections: [{ heading: 'Prediction', body: ['Tune after FOV/smooth — prediction magnifies mistakes if base aim is too aggressive.'] }],
  },
  {
    slug: 'draw-fov-overlays',
    title: 'Visualizing Your Aim Radius: How to Use Draw FOV Overlays',
    tag: 'Aimbot',
    intent: 'informative',
    excerpt: 'Draw FOV circle usage without blocking center crosshair vision.',
    sections: [{ heading: 'Draw FOV', body: ['Thin white circle matches most HUDs — disable for clips if teammates watch.'] }],
  },
  {
    slug: 'draw-target-line',
    title: 'Target Line Visuals: Instantly Identify Locked Enemies',
    tag: 'Aimbot',
    intent: 'informative',
    excerpt: 'Target line overlays show which tag aimbot selected in crowded fights.',
    sections: [{ heading: 'Target line', body: ['Helpful in trios when three tags stack — turn off for solo stealth play.'] }],
  },
  {
    slug: 'player-visuals-breakdown',
    title: 'Complete Player Visuals Breakdown for Tactical Dominance',
    tag: 'ESP',
    intent: 'informative',
    kw: 'wardogs esp, buy wardogs esp, wardogs esp lifetime',
    excerpt: 'Every player visual toggle explained for Wardogs three-team lobbies.',
    sections: [{ heading: 'Player visuals', body: ['Mix box + skeleton sparingly — pick one primary outline to reduce noise.'] }],
  },
  {
    slug: 'box-esp-setup',
    title: 'Box ESP Setup: 2D vs 3D Bounding Boxes for Target Tracking',
    tag: 'ESP',
    intent: 'informative',
    kw: 'wardogs esp',
    excerpt: 'Box ESP styles for long-range hill fights vs close building clears.',
    sections: [{ heading: 'Boxes', body: ['2D boxes read faster at distance; 3D helps when targets sit on stairs.'] }],
  },
  {
    slug: 'skeleton-esp-guide',
    title: 'Skeleton ESP: Real-Time Stance and Movement Overlay Guide',
    tag: 'ESP',
    intent: 'informative',
    kw: 'wardogs esp',
    excerpt: 'Skeleton overlays show crouch vs standing through windows before you push.',
    sections: [{ heading: 'Skeleton', body: ['Mute skeleton color — neon green reads obvious on recordings.'] }],
  },
  {
    slug: 'head-circle-visuals',
    title: 'Head Circle Visuals: Instant Headshot Alignment Overlays',
    tag: 'ESP',
    intent: 'informative',
    excerpt: 'Head circle pairing with low smooth aimbot for DMR players.',
    sections: [{ heading: 'Head circle', body: ['Combine with visible check so you only pre-aim visible peeks.'] }],
  },
  {
    slug: 'health-bar-tracking',
    title: 'Enemy Health Bar Tracking: Prioritize Low-HP Targets',
    tag: 'ESP',
    intent: 'informative',
    excerpt: 'Health bars help focus fire in squad wipes during control-zone cash fights.',
    sections: [{ heading: 'Health bars', body: ['Vertical bars beside boxes — disable on max distance tags to save clutter.'] }],
  },
  {
    slug: 'distance-esp-indicators',
    title: 'Distance ESP Indicators: Judging Combat Ranges Effectively',
    tag: 'ESP',
    intent: 'informative',
    excerpt: 'Distance readouts for picking SMG vs DMR engagements on roads.',
    sections: [{ heading: 'Distance', body: ['Sort mentally: under 30m push, 30–80m hold angle, 80m+ mark for squad.'] }],
  },
  {
    slug: 'player-name-tags',
    title: 'Player Name Tags: Identifying High-Value Targets In-Game',
    tag: 'ESP',
    intent: 'informative',
    excerpt: 'Name ESP for remembering repeat third parties in long sessions.',
    sections: [{ heading: 'Names', body: ['Screenshot names only in Discord DMs — avoid public callouts.'] }],
  },
  {
    slug: 'team-squad-filtering',
    title: 'Team & Squad Visual Filtering: Avoid Screen Clutter',
    tag: 'ESP',
    intent: 'informative',
    excerpt: 'Team/squad filters so friendly markers do not mask enemies.',
    sections: [{ heading: 'Team filter', body: ['Color allies blue, enemies red — verify squad IDs after matchmaking.'] }],
  },
  {
    slug: 'enemy-weapon-esp',
    title: 'Enemy Weapon ESP: Spotting High-Tier Guns Instantly',
    tag: 'ESP',
    intent: 'informative',
    excerpt: 'Weapon ESP tells you when a tag carries a DMR worth pushing or avoiding.',
    sections: [{ heading: 'Weapon ESP', body: ['Pair with distance — SMG at 90m is often a wounded player, not a bait.'] }],
  },
  {
    slug: 'view-direction-lines',
    title: 'View Direction Lines: Spotting Enemy Flanks Before They Happen',
    tag: 'ESP',
    intent: 'informative',
    excerpt: 'View direction lines show where a tag is looking — flank safely.',
    sections: [{ heading: 'View lines', body: ['Disable on max clutter maps; keep for solo flanks on open hills.'] }],
  },
  {
    slug: 'oof-arrows-guide',
    title: 'Out of Field Arrows: Off-Screen Threat Alerts Explained',
    tag: 'ESP',
    intent: 'informative',
    excerpt: 'OOF arrows for sound-only contacts during control-zone rotates.',
    sections: [{ heading: 'OOF arrows', body: ['Combine with radar — arrow color matches threat bearing.'] }],
  },
  {
    slug: 'max-distance-filters',
    title: 'Optimizing Max Distance Filters to Clean Up Your Screen',
    tag: 'ESP',
    intent: 'informative',
    excerpt: 'Max distance caps for 100-player lobbies without losing close threats.',
    sections: [{ heading: 'Max distance', body: ['150m baseline; drop to 100m in final circle style fights.'] }],
  },
  {
    slug: 'vehicle-visuals-setup',
    title: 'Vehicle Visuals Setup: Locating All In-Game Transport',
    tag: 'Vehicles',
    intent: 'informative',
    kw: 'wardogs esp',
    excerpt:
      'Map-wide vehicle overlay tuning — silhouette colors, convoy spacing, and when to hide distant blips on road-heavy maps.',
    sections: [
      {
        heading: 'Map-wide vehicle overlays',
        body: [
          'Color-code transports vs heavier platforms before you touch occupied/empty — silhouette recognition beats toggling everything at once.',
          'On road-heavy rotations, hide vehicles beyond 350m so your HUD stays readable while your squad holds a hill.',
        ],
      },
    ],
  },
  {
    slug: 'vehicle-esp-tracking',
    title: 'Full Vehicle ESP Tracking: Map Mobility Control Guide',
    tag: 'Vehicles',
    intent: 'informative',
    kw: 'wardogs esp',
    excerpt: 'Track trucks and transports across control-zone rotations.',
    sections: [{ heading: 'Tracking', body: ['Mark vehicles on radar and ESP — dual cue prevents surprise road pushes.'] }],
  },
  {
    slug: 'vehicle-type-identification',
    title: 'Vehicle Type Identification Overlays: Heavy Armor vs Transport',
    tag: 'Vehicles',
    intent: 'informative',
    excerpt: 'Type labels distinguish fast transports from heavier platforms.',
    sections: [{ heading: 'Types', body: ['Do not mag-dump light vehicles — type tag saves ammo for player tags inside.'] }],
  },
  {
    slug: 'vehicle-distance-measure',
    title: 'Measuring Vehicle Distance for Strategic Encounters',
    tag: 'Vehicles',
    intent: 'informative',
    excerpt: 'Vehicle distance for AT vs small arms decisions.',
    sections: [{ heading: 'Distance', body: ['Hide vehicles beyond 400m if you only care about immediate road threats.'] }],
  },
  {
    slug: 'occupied-empty-vehicles',
    title: 'Occupied vs Empty Vehicle Indicators: Ambush Prevention',
    tag: 'Vehicles',
    intent: 'informative',
    excerpt: 'Empty truck bait vs occupied convoy — indicator saves pushes.',
    sections: [{ heading: 'Occupied state', body: ['Slow peek empty markers — players hide beside hull.'] }],
  },
  {
    slug: 'radar-options-guide',
    title: '2D Radar Options: Complete Minimap Awareness Guide',
    tag: 'Radar',
    intent: 'informative',
    excerpt: 'Radar module overview for Wardogs minimap power users.',
    sections: [{ heading: 'Radar options', body: ['Player + vehicle markers together — toggle one off in final fights.'] }],
  },
  {
    slug: 'custom-2d-radar-hud',
    title: 'Positioning Mastery: Setting Up a Custom 2D Radar HUD',
    tag: 'Radar',
    intent: 'informative',
    excerpt: 'Radar size and corner placement on ultrawide vs 1080p.',
    sections: [{ heading: 'HUD placement', body: ['Bottom-left stack above native minimap — avoid covering cash UI.'] }],
  },
  {
    slug: 'player-markers-radar',
    title: 'Player Markers on Radar: Tracking Enemy Rotation Paths',
    tag: 'Radar',
    intent: 'informative',
    excerpt: 'Read rotation arcs on 2D radar before third party sound.',
    sections: [{ heading: 'Player markers', body: ['Watch marker velocity — sprinting tags toward control zone = rotate early.'] }],
  },
  {
    slug: 'vehicle-markers-radar',
    title: 'Vehicle Radar Markers: High-Speed Threat Detection',
    tag: 'Radar',
    intent: 'informative',
    excerpt: 'Fast blips on radar for road pushes and flanking trucks.',
    sections: [{ heading: 'Vehicle markers', body: ['Pair with occupied ESP — empty blip still might have infantry nearby.'] }],
  },
  {
    slug: 'radar-range-calibration',
    title: 'Calibrating Radar Range for Close and Long-Range Fights',
    tag: 'Radar',
    intent: 'informative',
    excerpt: 'Radar range tuning for urban vs mountain maps.',
    sections: [{ heading: 'Range', body: ['Short range in towns; widen when holding open hills between zones.'] }],
  },
  {
    slug: 'misc-utility-features',
    title: 'Miscellaneous Utility Features for Ultimate Gameplay Control',
    tag: 'Misc',
    intent: 'informative',
    excerpt: 'Misc menu: recoil, spread, brightness, crosshair, configs.',
    sections: [{ heading: 'Misc stack', body: ['No recoil/no spread are loud on spectator cams — use sparingly in public lobbies.'] }],
  },
  {
    slug: 'no-recoil-compensation',
    title: 'Zero Recoil Compensation: Eliminating Weapon Kickback',
    tag: 'Misc',
    intent: 'informative',
    excerpt: 'No recoil toggle habits for burst weapons in Wardogs.',
    sections: [{ heading: 'No recoil', body: ['Tap fire still looks cleaner than full auto laser beams.'] }],
  },
  {
    slug: 'no-spread-elimination',
    title: 'Perfect Bullet Spread Elimination: Laser-Accurate Firing',
    tag: 'Misc',
    intent: 'informative',
    excerpt: 'No spread interaction with movement and jump shots.',
    sections: [{ heading: 'No spread', body: ['Combine with moderate aimbot — max stack screams on kill cam.'] }],
  },
  {
    slug: 'full-bright-toggles',
    title: 'Full Bright Visual Toggles: Max Visibility in Dark Map Areas',
    tag: 'Misc',
    intent: 'informative',
    excerpt: 'Full bright for interior clears without cranking gamma globally.',
    sections: [{ heading: 'Full bright', body: ['Toggle off for screenshots — flat lighting looks unnatural in clips.'] }],
  },
  {
    slug: 'custom-crosshair-overlays',
    title: 'Custom Crosshair Overlays for Hipfire and Precision Shooting',
    tag: 'Misc',
    intent: 'informative',
    excerpt: 'Custom crosshair when iron sights clutter the screen.',
    sections: [{ heading: 'Crosshair', body: ['Small dot for hipfire, circle for DMR — match native sight color.'] }],
  },
  {
    slug: 'config-save-load',
    title: 'Fast Setup: How to Save and Load Your Custom Config Settings',
    tag: 'Misc',
    intent: 'informative',
    excerpt: 'Config profiles for solo vs trio control-zone nights.',
    sections: [{ heading: 'Configs', body: ['Save "esp-only", "vehicles", and "full assist" — load before queue.'] }],
  },
  {
    slug: 'windows-setup',
    title: 'Wardogs Cheats on Windows 10 and 11',
    tag: 'Windows',
    intent: 'informative',
    howTo: true,
    excerpt: 'Windows prep for Wardogs cheats — overlays, Defender, TPM/HVCI notes.',
    sections: [{ heading: 'Supported systems', body: ['Windows 10/11 with Steam Wardogs — close overlays before inject.'] }],
  },
  {
    slug: 'disable-antivirus',
    title: 'Antivirus Exclusions for Wardogs Cheats',
    tag: 'Antivirus',
    intent: 'informative',
    howTo: true,
    excerpt: 'Allowlist loaders in Defender so files are not quarantined mid-setup.',
    sections: [{ heading: 'Defender', body: ['Folder exclusion before first run — restore quarantines if you retried blindly.'] }],
  },
  {
    slug: 'hotkeys',
    title: 'Wardogs Cheat Hotkeys After Load',
    tag: 'Hotkeys',
    intent: 'informative',
    howTo: true,
    excerpt: 'Menu and toggle hotkeys — ESP, aimbot, radar panic binds.',
    sections: [{ heading: 'Suggested binds', body: ['Menu toggle, ESP master, aimbot toggle, radar toggle — write them down once.'] }],
  },
  {
    slug: 'loader-errors',
    title: 'Fix Wardogs Cheat Loader Errors',
    tag: 'Support',
    intent: 'informative',
    howTo: true,
    excerpt: 'Menu not opening, instant close, antivirus quarantine, failed inject.',
    sections: [{ heading: 'Check status first', body: ['Updating builds fail for reasons settings cannot fix — confirm Active.'] }],
  },
  {
    slug: 'load-status-checklist',
    title: 'Pre-Load Checklist Before You Buy or Queue',
    tag: 'Status',
    intent: 'informative',
    excerpt: 'Confirm Active status, game version, and config before ranked-style queues.',
    sections: [{ heading: 'Before checkout', body: [`Confirm Active on ${HOST}. If Updating, wait or read refunds policy.`] }],
  },
]

const AUTHORS = [
  'ridge_runner',
  'Kestrel_09',
  'm4rtin.l',
  'softpeek',
  'ViktorNorth',
  'ghostloot',
  'PMC_walker',
  'duo_six',
  'LenaWD',
  'impatient_one',
  'patch_day_survivor',
  'filterking',
  'twitch_wd',
  'solo_q_wd',
  'MoneyKing',
  'irritated_panda',
  'capslock_warrior',
  'newbie_wd',
  'IT_guy_gaming',
  'defender_hater',
]

const HAPPY = [
  'Followed this thread before cranking every toggle — first control zone night actually went smooth.',
  'Visible check + low FOV like you said. Nobody typed a word in post-match chat.',
  'Vehicle occupied flag saved us from a bait truck. Worth reading before enabling everything.',
  'Saved config after first run — second login was two clicks. Wish I did that day one.',
  'Status page said Active, loader matched, ESP came up first try on Win11.',
  'Radar range tip fixed my cluttered minimap. Trios rotate cleaner now.',
  'Monthly sub updates included so far — patch Tuesday to Thursday Active again.',
]

const UNHAPPY = [
  'Expected magic — still died to a sound flank. ESP does not replace headphones.',
  'Skipped antivirus step, menu never opened. My fault but frustrating hour wasted.',
  'Wide FOV got me roasted in squad Discord kill cam. Dialed back per guide.',
  'Thought vehicle ESP would show loot inside — it does not, just the truck.',
  'Forced loader while Updating — instant kick. Read status next time lol.',
  'Skeleton on max brightness looks ridiculous on stream. Muted colors helped.',
  'Prices on lifetime vs monthly confused me until support replied — doc could be clearer.',
]

function hashSlug(slug) {
  let h = 0
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0
  return h
}

function modIndex(n, length) {
  return ((n % length) + length) % length
}

function pickUniqueBody(used, candidates) {
  const valid = candidates.filter((c) => typeof c === 'string' && c.length > 0)
  for (const body of valid) {
    if (!used.has(body)) {
      used.add(body)
      return body
    }
  }
  const fallback = `${valid[0] ?? 'Staff note'} (${valid.length} notes in thread.)`
  used.add(fallback)
  return fallback
}

function staffRepliesFor(post, used) {
  const h = hashSlug(post.slug)
  const staffCount = 1 + (h % 2)
  const shortTitle = post.title.length > 72 ? `${post.title.slice(0, 69)}…` : post.title
  const topic = post.slug.replace(/-/g, ' ')
  const editorPool = [
    `Editor: this ${post.tag} thread is locked read-only. Steps match the live Wardogs menu on ${HOST} — confirm Active before you queue.`,
    `Editor update: "${shortTitle}" was refreshed after the latest patch. Archive only — billing and loader keys go through Support.`,
    `Pinned reference for ${topic}. Do not copy old FOV screenshots from Discord; use the checklist in the opening post.`,
  ]
  const modPool = [
    `Moderator: replies are disabled on archive threads. Share loader logs in Support, not in locked forums.`,
    `Mod note — keep ${post.tag} configs conservative in large lobbies. Visible check and distance caps are strongly recommended.`,
    `Moderator reminder: if status shows Updating on ${HOST}, settings changes here will not fix inject failures — wait for Active.`,
  ]
  const out = []
  if (staffCount >= 1) {
    out.push({
      author: 'Wardogs Editor',
      role: 'editor',
      date: `2026-09-${String(8 + (h % 6)).padStart(2, '0')}`,
      body: pickUniqueBody(used, [
        editorPool[h % editorPool.length],
        editorPool[(h + 1) % editorPool.length],
        `${editorPool[h % editorPool.length]} Thread slug: ${post.slug}.`,
      ]),
    })
  }
  if (staffCount >= 2) {
    out.push({
      author: 'Forum Moderator',
      role: 'moderator',
      date: `2026-09-${String(12 + (h % 8)).padStart(2, '0')}`,
      body: pickUniqueBody(used, [
        modPool[modIndex(h >>> 2, modPool.length)],
        modPool[modIndex((h >>> 2) + 1, modPool.length)],
        `${modPool[modIndex(h >>> 2, modPool.length)]} (${post.tag} archive.)`,
      ]),
    })
  }
  return out
}

function communityRepliesFor(post, used) {
  const h = hashSlug(post.slug)
  const count = 2 + (h % 5)
  const out = []
  for (let i = 0; i < count; i++) {
    const happy = (h + i) % 3 !== 0
    const pool = happy ? HAPPY : UNHAPPY
    const candidates = []
    for (let j = 0; j < pool.length; j++) {
      candidates.push(pool[modIndex(h + i * 7 + j, pool.length)])
    }
    const body = pickUniqueBody(used, candidates)
    out.push({
      author: AUTHORS[modIndex(h + i, AUTHORS.length)],
      role: 'member',
      date: `2026-09-${String(10 + modIndex(h + i, 18)).padStart(2, '0')}`,
      body,
    })
  }
  return out
}

function modSolutionTemplates(author) {
  return [
    {
      test: /antivirus|menu never opened/i,
      text: `@${author} — add the delivery folder to Windows Defender exclusions before the first inject, reboot once, and launch from the Wardogs main menu only. If Defender quarantined files, restore them from protection history, then retry.`,
    },
    {
      test: /Updating|Forced loader/i,
      text: `@${author} — loading while status shows Updating will fail every time. Wait until ${HOST} lists Active, fully exit the game, then run the loader once. No menu toggles fix a mismatched build.`,
    },
    {
      test: /Wide FOV|kill cam/i,
      text: `@${author} — wide FOV plus low smooth reads obvious on kill cam. Cut FOV roughly in half, raise smooth, and keep visible check on — the aimbot section in this thread has sane starting numbers.`,
    },
    {
      test: /vehicle ESP would show loot|just the truck/i,
      text: `@${author} — vehicle ESP shows transports and occupied state, not crate loot inside. Use player ESP and radar for pushes; treat empty vehicle markers as bait until you line-of-sight the hull.`,
    },
    {
      test: /sound flank|headphones/i,
      text: `@${author} — ESP does not replace audio. Keep radar range moderate and OOF arrows on so you still rotate when someone sprints your blind side.`,
    },
    {
      test: /Skeleton on max brightness|stream/i,
      text: `@${author} — drop skeleton opacity and switch to a muted color. Box + distance alone are enough for most trios; neon skeletons are what teammates notice on clips.`,
    },
    {
      test: /lifetime vs monthly|support replied/i,
      text: `@${author} — start monthly if you play casually; lifetime makes sense when you queue multiple nights a week. Billing questions go to Support with your order email, not this locked thread.`,
    },
    {
      test: /Expected magic|still died/i,
      text: `@${author} — cheats widen information, they do not auto-win fights. Run ESP + radar first, add aimbot later with conservative FOV, and treat every death as a positioning fix before cranking settings.`,
    },
    {
      test: /Saved config|second login|two clicks/i,
      text: `@${author} — good call saving a profile. Name configs by mode (ESP-only vs full assist) so you are not re-toggling mid-queue when your squad swaps roles.`,
    },
    {
      test: /Radar range|minimap|Trios rotate/i,
      text: `@${author} — if the minimap still feels busy, shorten radar range for urban pushes and widen it only when you hold open ground between zones.`,
    },
    {
      test: /Visible check|low FOV|post-match/i,
      text: `@${author} — visible check plus tighter FOV is the usual fix for quiet kill cams. Screenshot your menu once so you can restore the same numbers after patches.`,
    },
    {
      test: /Status page said Active|Win11/i,
      text: `@${author} — Active on the site plus a clean inject path is the baseline. If anything breaks after a game update, recheck status before you change ESP toggles.`,
    },
    {
      test: /Vehicle occupied|bait truck/i,
      text: `@${author} — occupied/empty flags are hints, not guarantees. Slow peek or have a teammate hard cover before you commit to a truck push.`,
    },
    {
      test: /Monthly sub updates|patch Tuesday/i,
      text: `@${author} — subscription builds track patch days; when status flips Updating, pause ranked-style queues until Active returns instead of forcing the loader.`,
    },
  ]
}

function modAnswerBody(post, target, variant = 0) {
  const solutions = modSolutionTemplates(target.author)
  let body = solutions.find((s) => s.test.test(target.body))?.text
  if (!body) {
    body = `@${target.author} — walk through the ${post.tag} checklist in the opening post, confirm Active on ${HOST}, then retry with a saved config. If the loader still closes instantly, open Support with a screenshot of your status page.`
  }
  if (variant > 0) {
    body = `${body} (Follow-up #${variant + 1} — still locked; use Support for account-specific issues.)`
  }
  return body
}

function pickFollowUpTargets(post, community) {
  const h = hashSlug(post.slug)
  const unhappySet = new Set(UNHAPPY)
  const unhappy = community.filter((r) => unhappySet.has(r.body))
  const rest = community.filter((r) => !unhappySet.has(r.body))

  const first = unhappy[0] ?? community[modIndex(h >>> 1, community.length)]
  const usedKeys = new Set([`${first.author}\0${first.body}`])

  const secondCandidates = [...unhappy.slice(1), ...rest].filter(
    (r) => !usedKeys.has(`${r.author}\0${r.body}`),
  )
  const second =
    secondCandidates[modIndex(h >>> 3, secondCandidates.length)] ??
    community.find((r) => !usedKeys.has(`${r.author}\0${r.body}`))

  const targets = [first]
  if (second) targets.push(second)
  return targets
}

function modFollowUpForTarget(post, target, used, variant) {
  const body = pickUniqueBody(used, [
    modAnswerBody(post, target, variant),
    modAnswerBody(post, target, variant + 1),
    `${modAnswerBody(post, target, 0)} Locked thread — Support handles one-off loader issues.`,
  ])

  const targetDay = Number.parseInt(target.date.slice(8, 10), 10)
  const modDay = Math.min(
    28,
    Number.isFinite(targetDay) ? targetDay + 1 + variant : 20 + variant,
  )

  return {
    author: variant % 2 === 0 ? 'Forum Moderator' : 'Wardogs Support',
    role: 'moderator',
    date: `2026-09-${String(modDay).padStart(2, '0')}`,
    body,
    replyToAuthor: target.author,
  }
}

function modFollowUpReplies(post, community, used) {
  if (!community.length) return []

  const targets = pickFollowUpTargets(post, community)
  return targets.map((target, variant) => ({
    target,
    reply: modFollowUpForTarget(post, target, used, variant),
  }))
}

function repliesForSlug(post) {
  const used = new Set()
  const staff = staffRepliesFor(post, used)
  const community = communityRepliesFor(post, used)
  const followUps = modFollowUpReplies(post, community, used)
  const followByKey = new Map(
    followUps.map((f) => [`${f.target.author}\0${f.target.body}`, f.reply]),
  )

  const merged = [...staff]
  for (const reply of community) {
    merged.push(reply)
    const mod = followByKey.get(`${reply.author}\0${reply.body}`)
    if (mod) merged.push(mod)
  }
  for (const f of followUps) {
    if (!merged.some((r) => r.body === f.reply.body)) merged.push(f.reply)
  }
  return merged
}

function assertUniqueForums() {
  const slugSet = new Set()
  const titleSet = new Set()
  const excerptSet = new Set()
  for (const p of POSTS) {
    if (slugSet.has(p.slug)) throw new Error(`Duplicate forum slug: ${p.slug}`)
    slugSet.add(p.slug)
    if (titleSet.has(p.title)) throw new Error(`Duplicate forum title: ${p.title}`)
    titleSet.add(p.title)
    if (excerptSet.has(p.excerpt)) throw new Error(`Duplicate forum excerpt: ${p.excerpt}`)
    excerptSet.add(p.excerpt)
  }
}

function assertRepliesForPost(post) {
  const replies = repliesForSlug(post)
  const bodies = new Set()
  for (const r of replies) {
    if (bodies.has(r.body)) throw new Error(`Duplicate reply body in ${post.slug}`)
    bodies.add(r.body)
  }
  const staff = replies.filter((r) => r.role === 'editor' || r.role === 'moderator')
  if (staff.length < 3 || staff.length > 5) {
    throw new Error(`Expected 3–5 staff replies (incl. two @replies) for ${post.slug}, got ${staff.length}`)
  }
  const modAnswers = replies.filter((r) => r.role === 'moderator' && r.replyToAuthor)
  if (modAnswers.length !== 2) {
    throw new Error(`Expected exactly two moderator @replies for ${post.slug}, got ${modAnswers.length}`)
  }
  return replies
}

assertUniqueForums()

function metaTitle(post) {
  if (post.slug === 'features-list') {
    return 'Wardogs Cheats Features | Full Feature Overview'
  }
  return `${post.title} | Wardogs Cheats Forum`
}

/** Max 4 intent-specific terms — never a synonym wall. */
function searchTermsFor(post) {
  if (post.intentTerms) {
    return post.intentTerms.slice(0, 4).join(', ')
  }
  const fromKw = (post.kw || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 4)
  if (fromKw.length) return [...new Set(fromKw)].join(', ')
  const slugWords = post.slug.replace(/-/g, ' ')
  return [`Wardogs ${post.tag}`, slugWords, 'Wardogs cheats'].slice(0, 3).join(', ')
}

function metaDescription(post) {
  const first = post.excerpt.slice(0, 155)
  return first.endsWith('.') ? first : `${first}.`
}

const blogsTs = `/** Auto-generated by scripts/generate-wardogs-forums.mjs — edit the script and re-run. */
export type BlogSection = {
  heading: string
  body: string[]
}

export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  metaTitle: string
  metaDescription: string
  searchTerms: string
  date: string
  readMinutes: number
  tag: string
  sections: BlogSection[]
  howTo?: boolean
}

export const BLOGS: BlogPost[] = ${JSON.stringify(
  POSTS.map((p, idx) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    metaTitle: metaTitle(p),
    metaDescription: metaDescription(p),
    searchTerms: searchTermsFor(p),
    date: `2026-09-${String(12 + (idx % 10)).padStart(2, '0')}`,
    readMinutes: 6 + (idx % 5),
    tag: p.tag,
    sections: p.sections,
    ...(p.howTo ? { howTo: true } : {}),
  })),
  null,
  2,
)}

export function getBlog(slug: string) {
  return BLOGS.find((b) => b.slug === slug)
}

/** Related threads for forum footers — never includes the current slug. */
export function getRelatedForumThreads(slug: string, limit = 6): BlogPost[] {
  const current = getBlog(slug)
  if (!current) return []
  return BLOGS.filter((b) => b.slug !== slug)
    .sort((a, b) => {
      const tagRank = (p: BlogPost) => (p.tag === current.tag ? 0 : 1)
      const byTag = tagRank(a) - tagRank(b)
      if (byTag !== 0) return byTag
      return a.title.localeCompare(b.title)
    })
    .slice(0, limit)
}

export { blogPath } from './blog-paths'
`

const repliesObj = Object.fromEntries(POSTS.map((p) => [p.slug, assertRepliesForPost(p)]))

const repliesTs = `/** Auto-generated by scripts/generate-wardogs-forums.mjs */
export type ForumReplyRole = 'editor' | 'moderator' | 'member'

export type ForumReply = {
  author: string
  date: string
  body: string
  role?: ForumReplyRole
  /** When set, this staff post answers a member reply above. */
  replyToAuthor?: string
}

export const FORUM_REPLIES: Record<string, ForumReply[]> = ${JSON.stringify(repliesObj, null, 2)}

export function getForumReplies(slug: string): ForumReply[] {
  return FORUM_REPLIES[slug] ?? []
}
`

const forumIndexTs = `/** Auto-generated — lightweight list for search & cards (no post bodies). */
export type ForumIndexEntry = {
  slug: string
  title: string
  excerpt: string
  tag: string
}

export const FORUM_INDEX: ForumIndexEntry[] = ${JSON.stringify(
  POSTS.map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    tag: p.tag,
  })),
  null,
  2,
)}
`

writeFileSync(join(root, 'src/data/blogs.ts'), blogsTs)
writeFileSync(join(root, 'src/data/forum-replies.ts'), repliesTs)
writeFileSync(join(root, 'src/data/forum-index.ts'), forumIndexTs)
console.log(`Generated ${POSTS.length} forum posts with replies`)
