// SINGLE source of truth for the catalog. Every page loads this file.
// Prices are numbers. Photos load from images/<sku>/000001.jpg ... 000004.jpg (or set `image`).
// TODO: replace the short blurbs/features/specs below with real manufacturer details.
window.products = [
  { sku: "CMMG22BA6AE", title: "CMMG, AR Conversion Kit, 22LR", price: 183.94, category: "Accessories",
    image: "https://cmmg.com/media/catalog/product/2/2/22ba6ae_1.jpg",
    blurb: "CMMG AR conversion kit for shooting .22 LR.",
    features: ["AR conversion kit chambered in .22 LR", "Manufacturer: CMMG"],
    specs: { Brand: "CMMG", Type: "AR Conversion Kit", Caliber: ".22 LR" } },

  { sku: "HSEPS-CARRY-GR-MRS", title: "H-SUN EPS CARRY MRS GRN SOLAR ALUM", price: 373.66, category: "Optics",
    blurb: "Enclosed handgun sight designed for narrower, subcompact handguns, with a green multi-reticle system and solar failsafe.",
    features: [
      "HOLOSUN REFLEX SIGHT - Enclosed handgun sight designed for narrower, subcompact handguns with an aspheric lens for a clear sight picture.",
      "HIGH PERFORMANCE - Super LED with a 2 MOA dot and up to 50k hour battery life.",
      "SOLAR FAILSAFE - Backup power source when natural or artificial light is available.",
      "MULTILAYER REFLECTIVE GLASS - Coated optical glass for light transmission and wear resistance."],
    specs: { Brand: "Holosun", Color: "Green Reticle", Style: "Multi-Reticle (MRS)", Dimensions: "1.62 x 1.07 x 0.95 inches", Weight: "1 Ounce", Material: "7075 T6 Aluminum" },
    brandStory: "Since 2013, Holosun has been developing optics and laser/IR technologies for a broad range of shooting and hunting needs, including Solar Fail-Safe technology and the multi-reticle system (MRS)." },

  { sku: "EO552", title: "EOTech, 552 Holo Sight", price: 564.32, category: "Optics",
    blurb: "EOTech 552 holographic sight.",
    features: ["Holographic weapon sight", "Manufacturer: EOTech"],
    specs: { Brand: "EOTech", Model: "552", Type: "Holographic Sight" } },

  { sku: "HSAEMS-211301", title: "AEMS SOLAR RED", price: 347.59, category: "Optics",
    blurb: "Holosun AEMS with a red reticle and solar power.",
    features: ["Holosun AEMS optic", "Red reticle with solar power"],
    specs: { Brand: "Holosun", Model: "AEMS Solar", Reticle: "Red" } },

  { sku: "HSAEMS-PRO-X2-RD", title: "Holosun Technologies, AEMS X2 Pro, Red Dot", price: 347.59, category: "Optics",
    blurb: "Holosun AEMS X2 Pro red dot sight.",
    features: ["Holosun AEMS X2 Pro", "Red dot reticle"],
    specs: { Brand: "Holosun", Model: "AEMS X2 Pro", Reticle: "Red Dot" } },

  { sku: "HSARO-GD2", title: "H-SUN ARO ENCLOSED GLD 2MOA SIGHT", price: 121.43, category: "Optics",
    blurb: "Holosun ARO enclosed sight with a gold 2 MOA dot.",
    features: ["Enclosed emitter design", "2 MOA gold dot"],
    specs: { Brand: "Holosun", Model: "ARO", Reticle: "Gold, 2 MOA", Style: "Enclosed" } },

  { sku: "HSARO-GR2", title: "H-SUN ARO ENCLOSED GRN 2MOA SIGHT", price: 129.02, category: "Optics",
    blurb: "Holosun ARO enclosed sight with a green 2 MOA dot.",
    features: ["Enclosed emitter design", "2 MOA green dot"],
    specs: { Brand: "Holosun", Model: "ARO", Reticle: "Green, 2 MOA", Style: "Enclosed" } },

  { sku: "MGMPI233BLK", title: "MAGPUL PMAG M3 5.56 40RD BLK", price: 17.02, category: "Magazines",
    blurb: "Magpul PMAG M3 magazine, 5.56, 40 rounds, black.",
    features: ["40-round capacity", "5.56 caliber", "Color: black"],
    specs: { Brand: "Magpul", Model: "PMAG M3", Caliber: "5.56", Capacity: "40 rounds", Color: "Black" } },

  { sku: "SFM340C-BK-PRO", title: "SUREFIRE M340C SCOUT PRO 500 LUM BLK", price: 255.64, category: "Lights",
    blurb: "SureFire M340C Scout Pro weapon light, 500 lumens, black.",
    features: ["500 lumen output", "Scout-style weapon light", "Color: black"],
    specs: { Brand: "SureFire", Model: "M340C Scout Pro", Output: "500 lumens", Color: "Black" } }
];
