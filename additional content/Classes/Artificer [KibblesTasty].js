/*  -WHAT IS THIS?-
  This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
  Import this file using the "Add Extra Materials" bookmark.

  -KEEP IN MIND-
  It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*  -INFORMATION-
  Subject:  Class
  Effect:   This script adds a class called the "Artificer" and its 5 subclasses.

        This class has been made by /u/KibblesTasty on the subbreddit /UnearthedArcana
        It can be found here: https://www.gmbinder.com/share/-LAEn6ZdC6lYUKhQ67Qk
        This code is based on v1.5.1 of /u/KibblesTasty's work (as of 2018-08-25)

        This script was based upon MPMB's script for the Witch.

  Code by:  Apocalypsa
  Date:   2018-05-26 (sheet v12.999)
*/

var iFileName = "Artificer [KibblesTasty].js";
RequiredSheetVersion(12.999);

SourceList["HB"] = {
  name : "/u/KibblesTasty: Artificer (v1.4)",
  abbreviation : "HB",
  group : "Reddit/r/UnearthedArcana",
  url : "https://www.gmbinder.com/share/-LAEn6ZdC6lYUKhQ67Qk",
  date : "2018/05/21"
};

//first make the sheet know which spells are artificer spells
[
  // 1st level
  "alarm", "catapult", "comprehend languages", "cure wounds", "detect magic", "disguise self", "expedious retreat", "false life", "feather fall", "grease", "identify", "illusory script", "jump", "longstrider", "sanctuary", "snare", "unseen servant", "tenser's floating disk",

  // 2nd level
  "aid", "alter self", "arcane lock", "blur", "cloud of daggers", "darkvision", "earthbind", "enhance ability", "enlarge/reduce", "find traps", "heat metal", "hold person", "knock", "invisibility", "locate object", "magic weapon", "magic mouth", "protection from poison", "see invisibility", "spider climb",

  // 3rd level
  "elemental weapon", "feign death", "flame arrows", "gaseous form", "glyph of warding", "life transference", "lightning arrow", "magic circle", "nondetection", "protection from energy", "sending", "tiny servant", "wall of sand", "water breathing", "water walk", "wind wall",

  // 4th level
  "arcane eye", "death ward", "fabricate", "fire shield", "freedom of movement", "greater invisibility", "leomund's secret chest", "otiluke's resilient sphere", "stone shape", "stoneskin", "sickening radiance",

  // 5th level
  "animate objects", "creation", "hold monster", "legend lore", "mislead", "passwall", "skill empowerment", "telekinesis", "teleportation circle", "transmute rock", "wall of stone"
].forEach( function (n) {
  if(SpellsList[n] && SpellsList[n].classes.indexOf("artificer") === -1) SpellsList[n].classes.push("artificer");
});

ClassList["artificer"] = {
  regExpSearch : /artificer/i,
  name : "Artificer",
  primaryAbility : "\n \u2022 Artificer: Intelligence;",
  abilitySave : 4,
  prereqs : "\n \u2022 Artificer: Intelligence 13;",
  improvements :  levels.map( function(n) {
    return n < 4 ? 0 : n < 8 ? 1 : n < 12 ? 2 : n < 16 ? 3 : n < 19 ? 4 : 5;
  }),
  die : 8,
  saves : ["Con", "Int"],
  skills : ["\n\n" + toUni("Artificer") + ": Choose three from Arcana, Deception, History, Investigation, Medicine, Nature, Religion, and Sleight of Hand."],
  toolProfs : { primary : ["Thieves' Tools"] },
  armor : [
    [true, true, false, false],
    [true, true, false, false]
  ],
  weapons : [
    [true, false]
  ],
  equipment : "Artificer starting equipment:\n \u2022 A handaxe and a light hammer -or- any two simple weapons;\n \u2022 Scale mail -or- leather armor;\n \u2022 Thieves' tools and a dungeoneer's pack.\n\nAlternatively, choose 5d4 \xD7 10 gp worth of starting equipment instead of both the class' and the background's starting equipment.",
  subclasses : ["Artificer Specialisation", ["artificer-cannonsmith", "artificer-gadgetsmith", "artificer-potionsmith", "artificer-runesmith", "artificer-warsmith", "artificer-wandsmith"]],
  attacks : [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  spellcastingFactor : 2,
  spellcastingKnown : {
    spells : "list",
    spells : [0,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12]
  },
  features : {
    "subclassfeature1" : {
      name : "Artificer Specialisation",
      minlevel : 1,
      description : "\n   " + "Choose your Specialisation and put it in the \"Class\" field."
    },
    "magic item analysis" : {
      name : "Magic Item Analysis",
      minlevel : 1,
      description : desc([
        "My understanding of magic items allows me analyse and understand their secrets. I know the artificer spells detect magic and identify, and I can cast them as rituals."
      ]),
      spellcastingBonus : { //optional; an object that adds something to the "Bonus Spells" section of the spell selection dialog //this object can have all the same attributes as the "spellcastingList" object, but must also have a "name" defined" //the other things that can be defined in this that are not in the "spellcastingList" object, are the "selection", "times" and "prepared" values
        name : "Magic Item Analysis", //required; this is used to identify the object, so must be an unique name
        spells : ["detect magic", "identify"], //optional, but required if not including the "class" entry; see "spellcastingList" object
        selection : ["detect magic", "identify"], //optional if "spells" is defined; this is the default selection for the array specified in "spells"
        times : 2
      }
    },
    "spellcasting" : {
      name : "Spellcasting",
      minlevel : 2,
      description : desc([
        "I can cast prepared artificer spells, using Intelligence as my spellcasting ability.",
        "I can use an arcane focus as a spellcasting focus."
      ])
    },
    "specialisation upgrade" : {
      name : "Specialisation Upgrade",
      minlevel : 3,
      description : "\n   " + "Use the \"Choose Features\" button above to add Specialisation Upgrade to the third page"
    },
    "tool expertise" : {
      name : "Tool Expertise",
      minlevel : 2,
      description : desc([
        "My proficiency bonus is doubled for any ability check I make that uses any of the tool proficiencies I gain from this class."
      ])
    },
    "arcane reconstruction" : {
      name : "Arcane Reconstruction",
      minlevel : 6,
      description : desc([
        "I have mastered the knowledge of using magic to repair things. I learn the Mending cantrip, and can cast it at will. Additionally, I learn the Cure Wounds spell. If I already know Cure Wounds I can select another spell from the Artificer list. When I cast Cure Wounds, it can heal constructs in addition to normally valid targets. Both Mending and Cure Wounds learned through this features are considered Artificer spells."
      ]),
      spellcastingBonus : {
        name : "Arcane Reconstruction",
        spells : ["Mending", "Cure Wounds"],
        selection : ["Mending", "Cure Wounds"],
        times : 2,
        atwil: true
      }
    },
    "superior attunement" : {
      name : "Superior Attunement",
      minlevel : 6,
      description : desc([
        "My superior understanding of magic items allows me to master their use. I can now attune to up to four, rather than three, magic items at a time."
      ])
    },
    "wondrous items proficiency" : {
      name : "Familiar Spirit",
      minlevel : 7,
      description : desc([
        "My familiarity with the workings of magical items means that I can ignore class based restrictions on attuning to magical items."
      ])
    },
    "improved magical crafting" : {
      name : "Improved Magical Crafting",
      minlevel : 10,
      description : desc([
        "My experience in creating my own wondrous invention makes me more adept at crafting a magic item than a normal spellcaster. Creating a magic item takes me half the time it would normally take.",
        "Additionally, me can make 1 hour of progress toward crafting a magic item, scroll, or potion during a long rest."
      ])
    },
    "wondrous item recharge" : {
      name : "Wondrous Item Recharge",
      minlevel : 10,
      description : desc([
        "I can recharge a magic item that has has charges, as long as those charges can only be used to cast spells. To restore charges, I perform a ritual that takes one minute and expends a spell slot of equal or higher level then a spell slot level of a spell cast by the item. The number of charges restored to the item is equal to the number of charges required to cast that spell using the item once."
      ])
    },
    "study of magic" : {
      name : "Study of Magic",
      minlevel : 11,
      description : desc([
        "My proficiency in the workings of magic has become so great I can cast detect magic and identify at will. Additionally, I have advantage on all Intelligence (Arcana) checks to understand the workings of magical traps, effects, or runes."
      ])
    },
    "wondrous item mastery" : {
      name : "Wondrous Item Mastery",
      minlevel : 18,
      description : desc([
        "I can activate a magic item that would normally take an action as a bonus action instead."
      ])
    },
    "soul of artifice" : {
      name : "Soul of Artifice",
      minlevel : 20,
      description : desc([
        "My understanding of magic items is unmatched, allowing me to mingle my soul with items linked to me. I can now attune to five, rather than four, magic items at a time. In addition, I gain a +1 bonus to all saving throws per magic item I am currently attuned to."
      ])
    },
  }
};

ClassSubList["artificer-cannonsmith"] = {
  regExpSearch : /cannonsmith/i,
  subname : "Cannonsmith",
  features : {
    "cannonsmith_proficiency" : {
      name : "Cannonsmith Proficiency",
      minlevel : 1,
      description : desc([
        "I gain proficiency with tinker's tools and smith's tools.",
        "I can create up to 50 rounds of ammunition during a long rest. Material cost: 1gp per 10 rounds"
      ]),
      toolProfs : [["Smith's Tools", "Dex"], ["Tinker's Tools", "Dex"]]
    },
    "thunder_cannon" : {
      name : "Thunder Cannon",
      minlevel : 1,
      description : desc([
        "At 1st level, you forge a deadly firearm using a combination of arcane magic and your knowledge of engineering and metallurgy. This firearm is called a Thunder Cannon.",
        "You are proficient with the Thunder Cannon. The firearm is a two-handed ranged weapon that deals 2d6 piercing damage. Its normal range is 60 feet, and its maximum range is 180 feet.",
        "Once fired, it must be reloaded as a bonus action."
      ]),
      eval : "AddWeapon('thunder cannon');",
      removeeval : "RemoveWeapon('thunder cannon');",
      additional : [
        "",
        "",
        "1 upgrade",
        "1 upgrade",
        "2 upgrades",
        "2 upgrades",
        "3 upgrades",
        "3 upgrades",
        "4 upgrades",
        "4 upgrades",
        "5 upgrades",
        "5 upgrades",
        "6 upgrades",
        "6 upgrades",
        "7 upgrades",
        "7 upgrades",
        "8 upgrades",
        "8 upgrades",
        "9 upgrades",
        "9 upgrades"
      ],
      extraname : "Cannonsmith Upgrades",
      extrachoices : [
        "Autoloading Magazine (prereq: Integrated Magazine)",
        "Blast Shells (prereq: level 15 Artificer)",
        "Cannon Improvement (prereq: level 5 Artificer)",
        "Divination Scope (prereq: level 5 Artificer)",
        "Echoing Boom (prereq: Incompatible with Silencer)",
        "Extended Barrel",
        "Harpoon Reel (prereq: level 5 Artificer)",
        "Integrated Magazine",
        "Lightning Burst",
        "Lightning Charged Bayonet",
        "Overchannel Capacitor (prereq: level 5 Artificer)",
        "Silencer (prereq: Incompatible with Echoing Booms)",
        "Snap Fire (prereq: level 9 Artificer)",
        "Shock Absorber",
        "Shock Harpoon (prereq: level 9 Artificer, Harpoon Reel)",
        "Storm Blast (prereq: level 5 Artificer)",
        "Synaptic Feedback (prereq: level 9 Artificer)",
        "Turret Deployment (prereq: level 9 Artificer)"
      ],
      "autoloading magazine (prereq: integrated magazine)" : {
        name : "Autoloading Magazine",
        description : desc([
          "Your Thunder Cannon now automatically chambers the next round, no longer requiring your bonus action to reload."
        ]),
        prereqeval : "classes.known.artificer.level >= 1"
      },
      "blast shells (prereq: level 15 artificer)" : {
        name : "Blast Shells",
        description : desc([
          "You can choose to fire a blast shell when firing your Thunder Cannon. When firing a Blast Shell, pick a target area within normal range of your Thunder Cannon. ",
          "Make an attack roll as normal, and apply that attack roll to all targets within a 5 foot radius of your target point.",
          "The first target (your choice if multiple creatures are hit) takes damage from Thundermonger. Targets after the first take bonus damage equal to half of the bonus damage dealt by Thundermonger in addition to the weapon attack damage."
        ]),
        prereqeval : "classes.known.artificer.level >= 15"
      },
      "cannon improvement (prereq: level 5 artificer)" : {
        name : "Cannon Improvement",
        description : desc([
          "You fine tune your Thunder Cannon's firing mechanism. The Thunder Cannon gains a +1 bonus to Attack and Damage Rolls made with it.",
          "After the first time you take this upgrade, the piercing damage dealt by your Thunder Cannon is considered magical.",
          "You can apply this upgrade up to 3 times."
        ]),
        prereqeval : "classes.known.artificer.level >= 5"
      },
      "divination scope (prereq: level 5 artificer)" : {
        name : "Divination Scope",
        description : desc([
          "You add a scope to your Thunder Cannon and enchant the lenses with Divination magic.",
          "The Scope has 3 Charges. As a bonus action you can use 1 charge to cast Hunter's Mark. As an action you can use 2 charges to cast See Invisibility or 3 charges to cast Clairvoyance.",
          "The scope regains all charges after a long rest."
        ]),
        prereqeval : "classes.known.artificer.level >= 5"
      },
      "echoing boom (prereq: incompatible with silencer)" : {
        name : "Echoing Boom",
        description : desc([
          "You pack extra power into your Thundermonger, increasing the damage it deals by 1d6."
        ]),
        prereqeval : "classes.known.artificer.level >= 1"
      },
      "extended barrel" : {
        name : "Extended Barrel",
        description : desc([
          "You extend the length of your Thunder Cannon’s barrel and add rifling. The normal weapon range of your Thunder Cannon increases by 30 feet, and the maximum range by 90 feet.",
          "After applying this twice, if you have the Lightning Charged Bayonet upgrade, the Bayonet gains the Reach property.",
          "You can apply this upgrade up to 2 times."
        ]),
        prereqeval : "classes.known.artificer.level >= 1"
      },
      "harpoon reel (prereq: level 5 artificer)" : {
        name : "Harpoon Reel",
        description : desc([
          "You install a secondary firemode that launches a Harpoon attached to a tightly coiled cord. This attack has a normal range of 30 feet and an maximum range of 60 feet, and it deals only 1d6 piecing damage.",
          "A creature struck by this attack is impaled by the Harpoon unless it removes the Harpoon as an action. Removing the Harpoon requires a DC 14 Strength check. While the Harpoon is stuck in the target, you are connected to the target by an 60 ft cord.",
          "While connected in this manner, you can use your bonus action to activate the Reel action, pulling yourself to the location if the target if the target is Medium or larger. A Small or smaller creature is pulled back to you. Alternatively, you can opt to disconnect the cord.",
          "This attack can target a surface, object, or creature. This attack cannot be used again until the Reel action is taken."
        ]),
        prereqeval : "classes.known.artificer.level >= 5"
      },
      "integrated magazine" : {
        name : "Integrated Magazine",
        description : desc([
          "Your Thunder Cannon holds 2 rounds at a time, allowing you to attack twice before a bonus action reload is required."
        ]),
        prereqeval : "classes.known.artificer.level >= 1"
      },
      "lightning burst" : {
        name : "Lightning Burst",
        description : desc([
          "You upgrade your Thunder Cannon to discharge its power in within a 5-feet wide and 60-feet long line. As an action, you can make a special attack.",
          "Each creature must make a Dexterity saving throw or take damage equal to the bonus damage of Thundermonger as lightning damage on a failed save, half as much on a successful save.",
          "Using this shot counts as applying Thundermonger damage for the turn. Firing in this method does not consume ammo."
        ]),
        prereqeval : "classes.known.artificer.level >= 1"
      },
      "lightning charged bayonet" : {
        name : "Lightning Charged Bayonet",
        description : desc([
          "You affix a short blade to the barrel of your Thunder Cannon, allowing you to make a melee weapon attack with it. The blade is a finesse weapon melee weapon that you are proficient with, and deals 1d6 Piercing damage.",
          "When Thundermonger bonus damage is dealt with a bayonet attack, the damage type is lightning. Dealing damage this way counts as applying Thundermonger damage for the turn.",
          "The blade can be used to apply Thundermonger bonus damage."
        ]),
        prereqeval : "classes.known.artificer.level >= 1"
      },
      "overchannel capacitor (prereq: level 5 artificer)" : {
        name : "Overchannel Capacitor",
        description : desc([
          "You gain the ability to channel your magical power into the Thunder Cannon to overload its damage.",
          "You can expend a spell slot to increase the damage dealt by Thundermonger by 1d8 per spell level spent."
        ]),
        prereqeval : "classes.known.artificer.level >= 5"
      },
      "silencer (prereq: incompatible with echoing booms)" : {
        name : "Silencer",
        description : desc([
          "You upgrade your Thunder Cannon with a sound dampening module.",
          "Your Thunder Cannon loses the Loud property."
        ]),
        prereqeval : "classes.known.artificer.level >= 1"
      },
      "snap fire (prereq: level 9 artificer)" : {
        name : "Snap Fire",
        description : desc([
          "You can use your reaction to take a opportunity attack with your Thunder Cannon if an enemy comes within 10 ft of you. You have disadvantage on this attack.",
          "This attack only deals Thundermonger bonus damage if you have not dealt the bonus damage since the start of your last turn."
        ]),
        prereqeval : "classes.known.artificer.level >= 9"
      },
      "shock absorber" : {
        name : "Shock Absorber",
        description : desc([
          "As a reaction to taking Lightning or Thunder Damage, you can cast Absorb Elements without consuming a spell slot.",
          "When absorbed in this method, you can apply the bonus damage granted by Absorb Elements to your next Thunder Cannon attack even if you make a ranged attack."
        ]),
        prereqeval : "classes.known.artificer.level >= 1"
      },
      "shock harpoon (prereq: level 9 artificer, harpoon reel)" : {
        name : "Shock Harpoon",
        description : desc([
          "After hitting a creature with the Harpoon fire mode, you can use a bonus action to deliver a shock. If you have not used it since the start of your turn, you can apply Thundermonger damage as lightning damage.",
          "Additionally, the target must make a Constitution saving throw against your spell save DC or be stunned until the end of its next turn.",
          "Once used, the Harpoon must be reeled in before this can be used again."
        ]),
        prereqeval : "classes.known.artificer.level >= 9"
      },
      "storm blast (prereq: level 5 artificer)" : {
        name : "Storm Blast",
        description : desc([
          "You upgrade your Thunder Cannon to discharge its power in 30-foot cone from the gun. As an action, you can make a special attack.",
          "Each creature must make a Strength saving throw, or take half the bonus damage of Thundermonger and be knocked prone. Using this shot counts as applying Thundermonger damage for the turn.",
          "Firing in this way does not consume ammo."
        ]),
        prereqeval : "classes.known.artificer.level >= 5"
      },
      "synaptic feedback (prereq: level 9 artificer)" : {
        name : "Synaptic Feedback",
        description : desc([
          "You install feedback loop into your cannon, allowing you to siphon some energy from your Thunder Cannon to empower your reflexes",
          "Whenever you deal lightning damage with your Thunder Cannon your walking speed increases by 10ft and you can take the Dash or Disengage actions as a bonus action.",
          "This boost lasts until the start of your next turn."
        ]),
        prereqeval : "classes.known.artificer.level >= 9"
      },
      "turret deployment (prereq: level 9 artificer)" : {
        name : "Turret Deployment",
        description : desc([
          "As an action, you deploy your Thunder Cannon in a spot adjacent to you, and subsequently can attack with it as long as you are within 100 feet of it and you can see the target you are attacking.",
          "It still has its normal range from the point it is attacking. A creature adjacent to it in this mode can use an action to render it nonfunctional as a turret."
        ]),
        prereqeval : "classes.known.artificer.level >= 9"
      }
    },
    "thunder_monger" : {
      name : "Thunder Monger",
      minlevel : 3,
      description : desc([
        "Once per turn, you can deal an extra 1d6 thunder damage to one creature you hit with an Attack using Thunder Cannon. After discharging this bonus damage, the you cannot deal this bonus damage again until the start of your next turn.",
        "This extra damage increases by 1d6 when you reach certain levels in this class: 5th level (2d6), 7th level (3d6), 9th level (4d6), 11th level (5d6), 13th level (6d6), 15th level (7d6), 17th level (8d6), and 19th level (9d6)."
      ])
    },
    "devastating_blasts" : {
      name : "Devastating Blasts",
      minlevel : 5,
      description : desc([
        "Beginning at 5th level, when you miss an attack with your Thunder Cannon, you can still choose to apply your Thundermonger damage, but it deals only half the bonus damage"
      ])
    },
    "elemental_swapping" : {
      name : "Elemental Swapping",
      minlevel : 14,
      description : desc([
        "When you take the attack action with your Thunder Cannon you can adjust the firing chamber, causing any bonus damage granted by Thundermonger to deal Fire, Cold, Acid, or Lightning damage instead of Thunder damage.",
        "Alternatively, you can consume a Vial of Holy Water to cause your next Thundermonger bonus damage to deal Radiant Damage."
      ])
    }
  }
};

ClassSubList["artificer-gadgetsmith"] = {
  regExpSearch : /gadgetsmith/i,
  subname : "Gadgetsmith",
  features : {
    "gadgetsmith_proficiency" : {
      name : "Gadgetsmith's Proficiency",
      minlevel : 1,
      description : desc([
        "When you choose this specialization at 1st level, you gain proficiency with nets, rapiers, whips, and tinker's tools."
      ]),
      toolProfs : [["Tinker's Tools", "Dex"]],
      weapons : [[true, false, ["Net", "Rapier", "Whip"]]]
    },
    "essential_tools" : {
      name : "Essential Tools",
      minlevel : 1,
      description : desc([
        "At 1st level, you've mastered the creation of the essential reusable tools of surviving the battlefield as a Gadgeeter. You have the following items:",
        "Grappling Hook: As an attack or as an action, you may target a surface, object or creature within 20 feet. If the target is Small or Smaller, you can make a Grapple check to pull it to you and Grapple it. Alternatively, if the target is Medium or larger, you can choose to be pulled to it, however, this does not grapple it.",
        "Smoke Bomb: As an action, you can use this to instantly cast Fog Cloud on yourself without expending a spell slot. It lasts a number of rounds equal to your intelligence modifier and does not require concentration.",
        "Gadgetsmith Weapon: Pick one of Boomerang of Hitting, Impact Gauntlets, Repeating Crossbow, Shock Generator or Lightning Baton from the upgrade section. You receive this upgrade and does not count against your upgrade total."
      ])
    },
    "additional_upgrade" : {
      name : "Additional Upgrade",
      minlevel : 3,
      description : desc([
        "At 3rd level, you've mastered the essential tools, and have begun to tinker with ways to expand your arsenal.",
        "The number of upgrades you have for your class level is increased by one."
      ]),
      additional : [
        "",
        "",
        "2 upgrades",
        "2 upgrades",
        "3 upgrades",
        "3 upgrades",
        "4 upgrades",
        "4 upgrades",
        "5 upgrades",
        "5 upgrades",
        "6 upgrades",
        "6 upgrades",
        "7 upgrades",
        "7 upgrades",
        "8 upgrades",
        "8 upgrades",
        "9 upgrades",
        "9 upgrades",
        "10 upgrades",
        "10 upgrades"
      ],
      extraname : "Gadget Upgrades",
      extrachoices : [
        "Airburst Mine",
        "Boomerang of Hitting",
        "Belt of Adjusting Size",
        "Binding Rope (prereq: level 5 Artificer)",
        "Bracers of Empowerment (prereq: level 11 Artificer)",
        "Deployable Wings (prereq: level 9 Artificer)",
        "Disintegration Ray (prereq: level 15 Artificer)",
        "Gripping Gloves (prereq: level 11 Artificer)",
        "Element Eater",
        "Enhanced Grappling Hook",
        "Fire Spitter",
        "Flashbang",
        "Impact Gauntlet",
        "Lightning Baton",
        "Lightning Generator (prereq: level 11 Artificer)",
        "Mechanical Arm",
        "Mechanical Familiar",
        "Nimble Gloves (prereq: level 11 Artificer)",
        "Phase Trinket (prereq: level 9 Artificer)",
        "Jumping Boots",
        "Repeating Hand Crossbow",
        "Bee Swarm Rockets (prereq: level 15 Artificer)",
        "Shock Generator",
        "Shocking Hook",
        "Sight Lenses",
        "Smoke Cloak",
        "Stinking Gas (prereq: level 9 Artificer)",
        "Striding Boots",
        "Stopwatch Trinket (prereq: level 9 Artificer)",
        "Truesight Lenses (prereq: Sight Lensens)",
        "Useful Universal Key (prereq: level 11 Artificer)",
        "Zombie Wires (prereq: level 15 Artificer)"
      ],
      "airburst mine" : {
        name : "Airburst Mine",
        description : desc([
          "You create a mechanical device capable of producing a devastating blast.",
          "You can use this device to cast shatter without expending a spell slot, but the gadget cannot be used again until you complete a short or long rest."
        ]),
        prereqeval : "classes.known.artificer.level >= 5"
      },
      "boomerang of hitting" : {
        name : "Boomerang of Hitting",
        description : desc([
          "You create a magical boomerang. You have proficiency in this weapon, and it has the Finesse, Thrown (30/90), and Special properties, and deals 1d4 damage.",
          "Special: When this weapon is Thrown, you can make target up three seperate targets within 10 feet of each other, making a seperate attack roll against each target.",
          "This weapon returns to your hand after you make an attack with it using the Thrown property."
        ]),
        prereqeval : "classes.known.artificer.level >= 1"
      },
      "belt of adjusting size" : {
        name : "Belt of Adjusting Size",
        description : desc([
          "You create a belt with a creature size dial on it. While you are wearing this belt, you can use an action to cast Enlarge/Reduce on yourself. Once you use this gadget, you cannot use it again until you complete a short or long rest."
        ]),
        prereqeval : "classes.known.artificer.level >= 1"
      },
      "binding rope (prereq: level 5 artificer)" : {
        name : "Binding Rope",
        description : desc([
          "You create a rope that is capable of animating and binding a target. As an action, target a creature within 30 feet. The target must make a Dexterity Saving throw against your Spell Save or become restrained until the end of your next turn. If you are currently grappling the target, it makes the Dexterity saving throw with disadvantage. The rope can only restrain one target a time."
        ]),
        prereqeval : "classes.known.artificer.level >= 5"
      },
      "bracers of empowerment (prereq: level 11 artificer)" : {
        name : "",
        description : desc([
          "You create bracers that can empower you. You can use this to cast Tensor's Transformation without expending a Spell Slot.",
          "Once you use this ability, you cannot use it again until you complete a long rest."
        ]),
        prereqeval : "classes.known.artificer.level >= 11"
      },
      "deployable wings (prereq: level 9 artificer)" : {
        name : "Deployable Wings",
        description : desc([
          "You build a set of deployable artificial wings. You can deploy this as a bonus action, or as a reaction to falling. When deployed, these give you a flying speed of 30 feet."
        ]),
        prereqeval : "classes.known.artificer.level >= 9"
      },
      "disintegration ray (prereq: level 15 artificer)" : {
        name : "Disintegration Ray",
        description : desc([
          "You create a Disintegration Ray. You can use this to cast Disintegration without expending a Spell Slot.",
          "Once you use this ability, you cannot use it again until you complete a long rest."
        ]),
        prereqeval : "classes.known.artificer.level >= 15"
      },
      "gripping gloves (prereq: level 11 artificer)" : {
        name : "Gripping Gloves",
        description : desc([
          "You create a set of gloves with a powerful assisted grip. Your Strength score and maximum Strength score increases by 2 while wearing these gloves. You gain advantage on Strength (Athletics) checks involving manipulating things with your hands while wearing these gloves."
        ]),
        prereqeval : "classes.known.artificer.level >= 11"
      },
      "element eater" : {
        name : "Element Eater",
        description : desc([
          "You create a device capable of absorbing incoming elemental damage. As a reaction to taking elemental damage, you can activate this device and cast Absorb Elements without expending a spell slot, but the gadget cannot be used again until you complete a short or long rest."
        ]),
        prereqeval : "classes.known.artificer.level >= 1"
      },
      "enhanced grappling hook" : {
        name : "Enhanced Grappling Hook",
        description : desc([
          "You enhance your grappling hook, increasing its range to 40 feet.",
          "Additionally, the enhanced power of the grappling hook means that when pulling yourself to a larger or larger creature or object, you can drag one medium or smaller willing or grappled creature within 5 feet of you with you."
        ]),
        prereqeval : "classes.known.artificer.level >= 1"
      },
      "fire spitter" : {
        name : "Fire Spitter",
        description : desc([
          "You create a gadget that creates a quick blast of fire. As an action, you can cast Aganazzar's Scorcher with this gadget, but the gadget cannot be used again until you complete a short or long rest."
        ]),
        prereqeval : "classes.known.artificer.level >= 1"
      },
      "flashbang" : {
        name : "Flashbang",
        description : desc([
          "You create a high luminary discharge device. As an action, you can target a point within 30 feet. Any creature within 20 feet of the targeted point must make a dexterity saving throw or be blinded until the end of its next turn. Once you use this gadget, you cannot use it again until you complete a short or long rest."
        ]),
        prereqeval : "classes.known.artificer.level >= 1"
      },
      "impact gauntlet" : {
        name : "Impact Gauntlet",
        description : desc([
          "You create a weapon capable of amplifying the impact of your blows. You have proficiency in this weapon, and it has the Finesse, Light and Special properties. It deals 1d8 bludgeoning damage.",
          "Special: When you make an attack roll, you can choose to forgo adding your Proficiency modifier to the attack roll. If the attack hits, you can add double your Proficiency modifier to the damage roll."
        ]),
        prereqeval : "classes.known.artificer.level >= 1"
      },
      "lightning baton" : {
        name : "Lightning Baton",
        description : desc([
          "You combine incorporate elements of your shock generator design into a baton, creating a new weapon. You have proficiency in this weapon, and it has the Finesse and Light properties. It deals 1d4 bludgeoning damage and 1d4 lightning damage on hit. If you score a critical strike with this weapon, the target must succeed a Constitution saving throw against your Spell Save or become stunned until the start of your next turn."
        ]),
        prereqeval : "classes.known.artificer.level >= 1"
      },
      "lightning generator (prereq: level 11 artificer)" : {
        name : "Lightning Generator",
        description : desc([
          "You upgrade your shock generator with additional lightning capabilities. You can cast lightning lure at-will using it, can overload it to cast lightning bolt. Once you overload it, you cannot use it to cast lightning bolt again until you complete a short or long rest."
        ]),
        prereqeval : "classes.known.artificer.level >= 11"
      },
      "mechanical arm" : {
        name : "Mechanical Arm",
        description : desc([
          "You create a mechanical arm, giving an extra hand. This mechanical arm only functions while it is mounting on gear you are wearing, but can be operated mentally without the need for you hands. This mechanical arm can serve any function a normal hand could, such as holding things, making attacks, interacting with the environment, etc, but does not give you additional actions."
        ]),
        prereqeval : "classes.known.artificer.level >= 1"
      },
      "mechanical familiar" : {
        name : "Mechanical Familiar",
        description : desc([
          "You can create the blue print for a small mechanical creature. At the end of a long rest, you can choose animate it, and cast Find Familiar with the following modifications. The creatures type is Construct, and you cannot select a creature with a flying speed. This construct stays active until you deactivate it or is destroyed. In either case, you can choose to reactivate it at the end of a long rest."
        ]),
        prereqeval : "classes.known.artificer.level >= 1"
      },
      "nimble gloves (prereq: level 11 artificer)" : {
        name : "Nimble Gloves",
        description : desc([
          "You create magical gloves the increase your dexterity. Your Dexterity score and maximum Dexterity score increases by 2 while wearing these gloves. You gain advantage on Dexterity (Slight of Hand) checks involving manipulating things with your hands while wearing these gloves."
        ]),
        prereqeval : "classes.known.artificer.level >= 11"
      },
      "phase trinket (prereq: level 9 artificer)" : {
        name : "Phase Trinket",
        description : desc([
          "You create a magical stopwatch that manipulates ethereal magic. As an action, you can cast Blink or Dimension Door using the Stopwatch without expending a Spell Slot.",
          "Once you use this ability, you cannot use it again until you complete a long rest"
        ]),
        prereqeval : "classes.known.artificer.level >= 9"
      },
      "jumping boots" : {
        name : "Jumping Boots",
        description : desc([
          "You modify your boots with arcane boosters. While wearing these boots, you are under the effects of the Jump spell."
        ]),
        prereqeval : "classes.known.artificer.level >= 1"
      },
      "repeating hand crossbow" : {
        name : "Repeating Hand Crossbow",
        description : desc([
          "You build an improved hand crossbow. You have proficiency in this weapon, and it has the Ammunition (range 30/120), Light, and Special properties and deals 1d6 piercing damage.",
          "At level 5, this weapon gains a +1 to attack and damage rolls; this increases to a +2 at level 14.",
          "Special: This weapon does not require a free-hand to load, as it has a built in loader. When you fire this weapon with advantage, once per turn you can forgo advantage on an attack to make one additional attack."
        ]),
        prereqeval : "classes.known.artificer.level >= 1"
      },
      "bee swarm rockets (prereq: level 15 artificer)" : {
        name : "Bee Swarm Rockets",
        description : desc([
          "You design a type of tiny firecracker like device, that can be released in large number. You have a maximum number of rockets equal to your Artificer level. You can release between one and the number you have remaining as an action. Each rocket targets a point you can see within 40 feet. Creatures within 10 feet of a target point must make a dexterity saving throw. Creatures that fail take 2d6 fire damage, or half as much on a successful one.",
          "You rebuild your stock to your maximum during a long rest."
        ]),
        prereqeval : "classes.known.artificer.level >= 15"
      },
      "shock generator" :{
        name : "Shock Generator",
        description : desc([
          "You create a device capable of generating potent shocks. You can use this to cast Shocking Grasp.",
          "When you cast Shocking Grasp with this feature, you can use either your Dexterity or Intelligence modifier for the melee spell attack roll."
        ]),
        prereqeval : "classes.known.artificer.level >= 1"
      },
      "shocking hook" : {
        name : "Shocking Hook",
        description : desc([
          "You can integrate your Shock Generator and your Grappling Hook. If the target of your Grappling Hook is a creature, you can cast Shocking Grasp on that creature as a bonus action when pulling it to you or being pulled to it."
        ]),
        prereqeval : "classes.known.artificer.level >= 1"
      },
      "sight lenses" : {
        name : "Sight Lenses",
        description : desc([
          "You create a set of lenses you can integrate into a set of goggles, glasses, or other vision assistance that allow you to see through obscurement. You can see through Fog, Mist, Smoke, Clouds, and non-Magical Darkness as normal sight up to 15 feet."
        ]),
        prereqeval : "classes.known.artificer.level >= 1"
      },
      "smoke cloak" : {
        name : "Smoke Cloak",
        description : desc([
          "Create a cloak that causes you to blend in with smoke. When you start your turn lightly or heavily obscured by smoke, you are invisible until your turn ends, you cast a spell, make an attack, or damage an enemy."
        ]),
        prereqeval : "classes.known.artificer.level >= 1"
      },
      "stinking gas (prereq: level 9 artificer)" : {
        name : "Stinking Gas",
        description : desc([
          "You make a more potent compound for your Smoke Bomb. When use a Smoke Bomb, you can choose to cast Stinking Cloud rather than Fog Cloud, following the same rules."
        ]),
        prereqeval : "classes.known.artificer.level >= 9"
      },
      "striding boots" : {
        name : "Striding Boots",
        description : desc([
          "You modify your boots with amplified striding speed. While earing these boots, you are under the effects of Longstrider spell."
        ]),
        prereqeval : "classes.known.artificer.level >= 1"
      },
      "stopwatch trinket (prereq: level 9 artificer)" : {
        name : "Stopwatch Trinket",
        description : desc([
          "You create a magical stopwatch that manipulates time magic. As an action, you can cast Haste or Slow using the Stopwatch without expending a Spell Slot.",
          "Once you use this ability, you cannot use it again until you complete a long rest."
        ]),
        prereqeval : "classes.known.artificer.level >= 9"
      },
      "truesight lenses (prereq: sight lensens)" : {
        name : "Truesight Lenses",
        description : desc([
          "You upgrade and fine tune your sight lenses, granting you Truesight up to 15 feet."
        ]),
        prereqeval : "classes.known.artificer.level >= 1"
      },
      "useful universal key (prereq: level 11 artificer)" : {
        name : "Useful Universal Key",
        description : desc([
          "You create a Universal Key to obstacles, transmuting them into not-obstacles. As an action, you can apply this key to a surface to cast passwall without expending a spell slot.",
          "Once you use this ability, you cannot use it again until you complete a long rest."
        ]),
        prereqeval : "classes.known.artificer.level >= 11"
      },
      "zombie wires (prereq: level 15 artificer)" : {
        name : "Zombie Wires",
        description : desc([
          "You create an advanced system of magical threads that you can shoot out, and use to make nearby corpses dance to your commands. As an action, you can cast Danse Macabre without expended a spell slot.",
          "Once you use this ability, you cannot use it again until you complete a long rest."
        ]),
        prereqeval : "classes.known.artificer.level >= 15"
      }
    },
    "recycle_gadgets" : {
      name : "Recycle Gadgets",
      minlevel : 3,
      description : desc([
        "Starting at the 3rd level, during a long rest and taking effect when you complete it, you can disassemble your gadgets and create different ones. When you do this, remove any upgrade you would like, and pick a new upgrade its place.",
        "You still must select upgrades that are valid for the level you gained the upgrade at (e.g. at 7th level, you can only have one upgrade that has a prerequisite of 7th level).",
        "Additionally, if a gadget is destroyed, you can use this feature to recreate it for materials worth 20 gold pieces."
      ])
    },
    "extra_attack" : {
      name : "Extra Attack",
      minlevel : 5,
      description : desc([
        "Beginning at 5th level, you can attack twice, instead of once, whenever you take the Attack action on your turn."
      ]),
      eval : "ClassList['artificer'].attacks = [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]",
      removeeval : "ClassList['artificer'].attacks = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]"
    },
    "combat_gadgets" : {
      name : "Combat Gadgets",
      minlevel : 14,
      description : desc([
        "Beginning at the 14th level, when you take the attack action, you can replace an attack with using any gadget that requires an action to use."
      ])
    }
  }
};

ClassSubList["artificer-golemsmith"] = {
  regExpSearch : /golemsmith/i,
  subname : "Golemsmith",
  features : {
    "golemsmith_proficiency" : {
      name : "Golemsmith's Proficiency",
      minlevel : 1,
      description : desc([
        "When you choose this specialization at 1st level, you gain proficiency with smith's tools and tinker's tools."
      ]),
      toolProfs : [["Smith's Tools", "Dex"], ["Tinker's Tools", "Dex"]]
    },
    "warforged_golem" : {
      name : "Warforged Golem",
      minlevel : 1,
      description : desc([
        "Starting at 1st level, you have forged a mechanical golem to carry out your orders and protect you.",
        "The golem is controlled via a pendent that only you can attune to."
      ])
    },
    "intelligent_oversight" : {
      name : "Intelligent Oversight",
      minlevel : 3,
      description : desc([
        "Starting at 3rd level, you can use the Help action as a bonus action when assisting your golem.",
        "Additionally, when you use the Help action to aid an ally in attacking a creature, the target of that attack can be within 30 feet of you, rather than 5 feet of you, if the allied creature can see or hear you."
      ]),
      additional : [
        "",
        "",
        "2 upgrades",
        "2 upgrades",
        "3 upgrades",
        "3 upgrades",
        "4 upgrades",
        "4 upgrades",
        "5 upgrades",
        "5 upgrades",
        "6 upgrades",
        "6 upgrades",
        "7 upgrades",
        "7 upgrades",
        "8 upgrades",
        "8 upgrades",
        "9 upgrades",
        "9 upgrades",
        "10 upgrades",
        "10 upgrades"
      ],
      extraname : "Golem Upgrades",
      extrachoices : [

      ],
      "arcane barrage armament (prereq: level 5 artificer)" : {
        name : "Arcane Barrage Armament",
        description : desc([
          "You install a shoulder mounted armament to your golem, charged with arcane power. As an action, the golem can cast Magic Missile as a 3rd level spell. When cast this way, it has no Verbal or Somatic component.",
          "Once used, this armament cannot be used again until the Artificer completes a short or long rest."
        ]),
        prereqeval : "classes.known.artificer.level >= 5"
      },
      "arcane resonance" : {
        name : "Arcane Resonance",
        description : desc([
          "Install an essence connection into your golem to sync your magic to it. You can make any spell you cast that targets only you also target your golem."
        ]),
        prereqeval : "classes.known.artificer.level >= 1"
      },
      "cloaking device (prereq: level 15 artificer)" : {
        name : "Cloaking Device",
        description : desc([
          "You install an Arcane Cloaking device on your Warforged Golem. This device has 4 Charges. You can direct the golem to expend 1 or more charges to cast one of the following spells using its action: Invisibility (2 charges), Greater Invisibility (4 charges).",
          "It regains all charges after a long rest."
        ]),
        prereqeval : "classes.known.artificer.level >= 15"
      },
      "enviornmental adaptation (prereq: level 5 artificer)" : {
        name : "Enviornmental Adaptation",
        description : desc([
          "You add integrated climbing hooks, deployable fins, insulated seals to your Golem. Your Warforged Golem gains a climbing and swimming speed equal to its walking speed.",
          "Additionally, it gains resistance to Cold and Fire damage."
        ]),
        prereqeval : "classes.known.artificer.level >= 5"
      },
      "expanded (prereq: level 9 artificer)" : {
        name : "Expanded",
        description : desc([
          "You enlarge your Warforged Golem, increasing its size category by one. It has advantage on Strength checks and Strength saving throws."
        ]),
        prereqeval : "classes.known.artificer.level >= 9"
      },
      "flamethrower armament (prereq: level 5 artificer)" : {
        name : "Flamethrower Armament",
        description : desc([
          "You install a shoulder mounted armament to your golem, heavily enchanted with flame spells. As an action, the golem can cast Burning Hands as a 3rd level spell.",
          "The spell save DC is equal to your spell save DC. When cast this way, it has no Verbal or Somatic component.",
          "Once used, this armament cannot be used again until the Artificer completes a short or long rest."
        ]),
        prereqeval : "classes.known.artificer.level >= 5"
      },
      "magical essence" : {
        name : "Magical Essence",
        description : desc([
          "You infuse a fragment of magical essence into your golem, allowing it to attune to one magical item."
        ]),
        prereqeval : "classes.known.artificer.level >= 1"
      },
      "heavy armor plating (prereq: level 5 artificer)" : {
        name : "Heavy Armor Plating",
        description : desc([
          "You can incorporate a suit of Heavy Armor into your Warforged Golem. Your Warforged Golem's AC becomes the AC granted by the incorporated armor. While incorporated with your Warforged Golem in this way, the Warforged Golem has Proficiency with that armor.",
          "While equipped with Heavy Armor, your Warforged Golem has disadvantage on Dexterity (Stealth) checks."
        ]),
        prereqeval : "classes.known.artificer.level >= 5"
      },
      "improve dexterity" : {
        name : "Improve Dexterity",
        description : desc([
          "You tune the servos in your Warforged Golem. Your Warforged Golem's Dexterity score increases by 2. You may apply this upgrade multiple times. A Warforged Golem's maximum Dexterity score is 18."
        ]),
        prereqeval : "classes.known.artificer.level >= 1"
      },
      "improve strength" : {
        name : "Improve Strength",
        description : desc([
          "You reinforce the power of your golem’s core and limbs. Your Warforged Golem's Strength score increases by 2. A Warforged Golem's maximum Strength score is 18."
        ]),
        prereqeval : "classes.known.artificer.level >= 1"
      },
      "iron fortress (prereq: stabilization)" : {
        name : "Iron Fortress",
        description : desc([
          "You increase the size and durability of your golem’s frame. Your Warforged Golem now counts as full cover for people behind it or riding it. Additionally, it cannot be moved against its will while in contact with a floor."
        ]),
        prereqeval : "classes.known.artificer.level >= 1"
      },
      "multiattack protocol (prereq: level 11 artificer)" : {
        name : "Multiattack Protocol",
        description : desc([
          "Your Warforged Golem gains multiattack. When your Warforged Golem uses the Attack action, it can attack twice."
        ]),
        prereqeval : "classes.known.artificer.level >= 11"
      },
      "mark of life (prereq: level 9 artificer)" : {
        name : "Mark of Life",
        description : desc([
          "You have attained the understanding of magic and craft a Mark of Life on the forehead of your Warforged Golem, turning it into a Warforged Companion.",
          "It gains an Intelligence score of 8, a Wisdom score of 8 and a Charisma score of 8. This allows it to follow more complex commands without direct input, speak, and remember things."
        ]),
        prereqeval : "classes.known.artificer.level >= 9"
      },
      "overdrive protocol (prereq: level 9 artificer)" : {
        name : "Overdrive Protocol",
        description : desc([
          "You build in a special mode allowing your golem go beyond it's normal limitations. As an action, your golem can activate this mode, gaining the effects of Haste for a number of rounds equal to your intelligence modifier, but loses its immunity to exhaustion until it completes a long rest."
        ]),
        prereqeval : "classes.known.artificer.level >= 9"
      },
      "precision movements" : {
        name : "Precision Movements",
        description : desc([
          "Your Warforged Golem gains Proficiency in the Stealth skill and with Thieves' Tools. Additionally, it gains an integrated set of Thieves' Tools that are always available."
        ]),
        prereqeval : "classes.known.artificer.level >= 1"
      },
      "thundering stomp (prereq: expanded)" : {
        name : "Thundering Stomp",
        description : desc([
          "Your warforged golem can leverage it's increased size and magical nature to unleash a crushing stomp of magical energy when it brings down its foot. Your golem can replace any attack with the thunderclap spell using the Artificers level and spell save for casting the spell."
        ]),
        prereqeval : "classes.known.artificer.level >= 9"
      },
      "redundant systems" : {
        name : "Redundant Systems",
        description : desc([
          "You have reinforced your Warforged Golem with layers of protection and redundant systems. It gains additional hitpoints equal to twice your Artificer level. Additionally, it gains advantage on death saving throws."
        ]),
        prereqeval : "classes.known.artificer.level >= 1"
      },
      "remote casting" : {
        name : "Remote Casting",
        description : desc([
          "You integrate a magical relay into your golem, allowing you use it as a magical familiar. As an action, you can see through your golem's eyes and hear what it hears until the start of your next turn. During this time, you are deaf and blind with regard to your own Senses.",
          "Additionally, when you Cast a Spell with a range of touch, your golem can deliver the spell as if it had cast the spell. Your golem must be within 100 feet of you, and it must use its reaction to deliver the spell when you cast it. If the spell requires an Attack roll, you use your Attack modifier for the roll."
        ]),
        prereqeval : "classes.known.artificer.level >= 1"
      },
      "runic wings (prereq: level 11 artificer)" : {
        name : "Runic Wings",
        description : desc([
          "You add rune-engraved wings to your Warforged Golem, granting it a flying speed of 20 feet."
        ]),
        prereqeval : "classes.known.artificer.level >= 11"
      },
      "stabilization" : {
        name : "Stabilization",
        description : desc([
          "You increase the resilience and stability of your Warforged Golem. It gains proficiency in Constitution Saving Throws and has advantage against saving throws to be knocked down."
        ]),
        prereqeval : "classes.known.artificer.level >= 1"
      },
      "warfare routines" : {
        name : "Warfare Routines",
        description : desc([
          "Your Warforged Golem gains one Fighting Style of your choice from Archery, Defense, Duelling, or Great Weapon Fighting."
        ]),
        prereqeval : "classes.known.artificer.level >= 1"
      },
      "warforged apprentice (prereq: level 15 artificer)" : {
        name : "Warforged Apprentice",
        description : desc([
          "Your Warforged Companion begins to apply its abilities to learn new things, gaining a class level in a class of your choosing. Your Warforged Companion gains all the first level features of the chosen class.",
          "This does not include health or class proficiencies (for example, selecting Fighter grants only Fighting Style and Second Wind)."
        ]),
        prereqeval : "classes.known.artificer.level >= 15"
      },
      "warforged adept (prereq: warforged apprentice)" :{
        name : "Warforged Adept",
        description : desc([
          "Your growth as a Golemsmith is such that your creation is capable of learning and adapting even more skills. It gains all the second level features of the class you selected for the Warforged Apprentice upgrade. This does not include health or class proficiencies (for example, selecting Fighter grants only Action Surge)."
        ]),
        prereqeval : "classes.known.artificer.level >= 15"
      }
    },
    "autonomous_action" : {
      name : "Autonomous Action",
      minlevel : 5,
      description : desc([
        "Starting at 5th level, you no longer need to spend your action to direct the golem to use its action,",
        "and it can act following mental commands communicated via the control pendant (no action required by Artificer)."
      ])
    },
    "perfected_design" : {
      name : "Perfected Design",
      minlevel : 14,
      description : desc([
        "Starting at 14th level, your golem can add your Intelligence modifier to all of its attack rolls, skill checks, and saving throws."
      ])
    }
  }
};;

ClassSubList["artificer-infusionsmith"] = {
  regExpSearch : /infusionsmith/i,
  subname : "Infusionsmith",
  features : {
    "infusionsmith_proficiency" : {
      name : "Infusionsmith's Proficiency",
      minlevel : 1,
      description : desc([
        "When you choose this specialization at 1st level, you gain proficiency with jeweler's tools and calligrapher's supplies.",
        "Your knowledge of infusion magic gives you a natural affinity for scribing spell scrolls. Creating a magic spell scroll only takes you half the time and material cost it would normally take."
      ]),
      toolProfs : [["Jewelers's Tools", "Dex"], ["Calligrapher's Supplies", "Dex"]]
    },
    "infused_weapon" : {
      name : "Infused Weapon",
      minlevel : 1,
      description : desc([
        "Starting at 1st level, you can infuse your weapon with a powerful magic. As a bonus action, you can infuse a weapon you are holding, causing it to burst into ethereal flames.",
        "The first time you hit an attack with that weapon before the end of your next turn, it deals an additional 1d6 force damage, and the infusion ends.",
        "This damage increases by 1d6 at 5th level Artificer (2d6), and again at 11th level (3d6) and 17th level (4d6).",
        "When attacking with an infused weapon, you can use you Intelligence modifier in place of your strength or dexterity modifier for the attack and damage rolls."
      ])
    },
    "store_magic" : {
      name : "Store Magic",
      minlevel : 3,
      description : desc([
        "Starting at 3rd level, you gain the ability to channel your artificer spells into a non-magical item for later use.",
        "At the end of a short or long rest, pick a spell you know. You can infuse this spell into an item for later use. You must expend any components the spell requires, but this does not expend a spell slot. Subsequently, any creature holding the item with an Intelligence of 6 or higher that is aware there is magic infused in it can expend the stored magic and cast the spell.",
        "The spell uses your spellcasting modifiers, but is in all other ways treated as if the creature holding it cast the spell. The magic infused in the item fades if you complete a short or long rest without expending the stored spell."
      ]),
      additional : [
        "",
        "",
        "2 upgrades",
        "2 upgrades",
        "3 upgrades",
        "3 upgrades",
        "4 upgrades",
        "4 upgrades",
        "5 upgrades",
        "5 upgrades",
        "6 upgrades",
        "6 upgrades",
        "7 upgrades",
        "7 upgrades",
        "8 upgrades",
        "8 upgrades",
        "9 upgrades",
        "9 upgrades",
        "10 upgrades",
        "10 upgrades"
      ],
      extraname : "Infusion Upgrades",
      extrachoices : [

      ],
      "alter time infusion (prereq: level 9 artificer)" : {
        name : "Alter Time Infusion",
        description : desc([
          "You learn a special infusion for manipulating the flow of time.",
          "When you use your Store Magic feature, rather than picking a spell you know, you can cast haste or slow. Unless you know these spells from another source, you can only cast these spells using the Store Magic feature."
        ]),
        prereqeval : "classes.known.artificer.level >= 9"
      },
      "animated archer (prereq: level 5 artificer)" : {
        name : "Animater Archer",
        description : desc([
          "You learn a more complicated version of the Animated Weapon ability, allowing to animate ranged weapons and a quiver of ammunition. The weapon works in the same manner, thought it can target anything within the animated weapons range, and can make a ranged weapon attack when make an attack.",
          "The weapon still requires ammunition, and can carry up 30 pieces of ammunition at a time, after which it needs to be reloaded as an action."
        ]),
        prereqeval : "classes.known.artificer.level >= 5"
      },
      "arcane armament" : {
        name : "Arcane Armament",
        description : desc([
          "You learn mastery of armoring yourself with magical enchantments. You learn the mage armor spell and cast it at will. While under the effect of mage armor, you can add your Intelligence to your armor class instead of your dexterity."
        ]),
        prereqeval : "classes.known.artificer.level >= 1"
      },
      "dancing fires (prereq: level 9 artificer)" : {
        name : "Dancing Fires",
        description : desc([
          "When you animate a weapon with your Animated Weapon feature, you can additionally imbue it with ethereal flames, causing it to deal 1d6 force damage on hit."
        ]),
        prereqeval : "classes.known.artificer.level >= 9"
      },
      "detonate armament (prereq: level 9 artificer)" : {
        name : "Expanded",
        description : desc([
          "As a reaction to taking damage, you can end the effect of mage armor to cast thunder step without expending a spell slot.",
          "Once you do this, you cannot gain the effect of mage armor again until you complete a short or long rest."
        ]),
        prereqeval : "classes.known.artificer.level >= 9"
      },
      "enhance attribute" : {
        name : "Enhance Attribute",
        description : desc([
          "You can enhance a piece of non-magical jewelery with power that boots the wearers abilities. Select an attribute from Strength, Dexterity, Constitution, Wisdom, Intelligence or Charisma, the current and maximum attribute score for that attribute is increased by one while wearing this item.",
          "This piece of jewelry provides a benefit only to you. You can take this upgrade twice."
        ]),
        prereqeval : "classes.known.artificer.level >= 1"
      },
      "enhanced weapon enchantment" : {
        name : "Enhanced Weapon Enchantment",
        description : desc([
          "You modify the Magical Weapon and Elemental Weapon spells into a more potent form.",
          "When you cast the Magical Weapon spell you can augment it with vorpal power; this spell has the effect of the Magical Weapon spell, but in addition attacks made with the weapon score a critical hit on 19 or a 20 die roll, and the weapon deals force damage.",
          "When you cast Elemental Weapon, the additional damage dealt on hit is increased by an additional 1d4, and you can pick force as the damage type in addition to the other options."
        ]),
        prereqeval : "classes.known.artificer.level >= 5"
      },
      "explosive mine (prereq: level 11 artificer)" : {
        name : "Explosive Mine",
        description : desc([
          "When you set a magical trap, you can make the mine cast fireball instead of shatter."
        ]),
        prereqeval : "classes.known.artificer.level >= 11"
      },
      "focused power duration (prereq: level 15 artificer)" : {
        name : "Focused Power Duration",
        description : desc([
          "When you use your Infused Focus power, the spell lasts a number of rounds equal to your Intelligence modifier + proficiency modifier."
        ]),
        prereqeval : "classes.known.artificer.level >= 15"
      },
      "healing infusion" : {
        name : "Healing Infusion",
        description : desc([
          "You master the intricate arts of healing energies interaction with creatures. When you restore health to another creature on your turn, you can add your Intelligence modifier to the health restored."
        ]),
        prereqeval : "classes.known.artificer.level >= 1"
      },
      "life infustion (prereq: level 11 artificer)" : {
        name : "Life Infusion",
        description : desc([
          "You learn a potent magical infusion that suffuses a creature with life energy. You can cast regenerate without expending a spell slot.",
          "Once you cast this spell in this manner, you cannot use it again until you complete a long rest."
        ]),
        prereqeval : "classes.known.artificer.level >= 11"
      },
      "radiant infusion (prereq: level 15 artificer)" : {
        name : "Radiant Infusion",
        description : desc([
          "You learn a special infusion for bestowing radiant energy. When you use your Store Magic feature, rather than picking a spell you know, you can cast holy weapon. Unless you know this spell from another source, you can only cast this spell using the Store Magic feature.",
          "If you have the Weapon Enchantment Expertise upgrade, you have advantage on Constitution saving throws to maintain concentration on this spell."
        ]),
        prereqeval : "classes.known.artificer.level >= 15"
      },
      "shielding ring" : {
        name : "Shielding Ring",
        description : desc([
          "You infuse powerful magic into a non-magical ring. You can use this ring to cast the shield spell without expending a spell slot. You cannot use this ring to cast the spell again until you complete a short or long rest."
        ]),
        prereqeval : "classes.known.artificer.level >= 1"
      },
      "skill infusion" : {
        name : "Skill Infusion",
        description : desc([
          "You managed to make the magic of your Infused Weapon so potent that attacks made with it are made as if the wielder had a Fighting Style. Choose a Fighting Style from Dueling, Archery, or Great Weapon Master and apply the effects to attacks made with your Infused and Animated Weapons."
        ]),
        prereqeval : "classes.known.artificer.level >= 1"
      },
      "spell trapping ring (prereq: level 9 artificer)" : {
        name : "Spell Trapping Ring",
        description : desc([
          "You set a powerful magic into a non-magical ring. You can use this ring to cast Counterspell without expending a spell slot. When you cast Counterspell in this way and it succeeds, the spell countered is stored in the ring. You can then cast the stored spell without expending a spell slot, but spell fades if it is not used before you complete a long rest."
        ]),
        prereqeval : "classes.known.artificer.level >= 9"
      },
      "sould saving bond" : {
        name : "Sould Saving Bond",
        description : desc([
          "You set up a special magical bond between you and another creature. When either creature bound by this abilities fails Wisdom, Intelligence, Charisma, or Death saving throw, the other character can make their own saving throw, replacing the failed saved with their own roll. If this ability is used on a death saving throw, the replacement roll is a 20.",
          "Once a roll is replaced by this feature, it cannot be used again until both creatures in the bond have completed a short or long rest.",
          "This bond can be set up with a different creature at the end of a long rest."
        ]),
        prereqeval : "classes.known.artificer.level >= 1"
      },
      "thunder mine (prereq: level 5 artificer)" : {
        name : "Thunder Mine",
        description : desc([
          "You can set a magical trap by infusing explosive magic into an item. You can set this item to detonate when someone comes within 5 feet of it, or by a verbal command.",
          "When the magic trap detonates, it casts shatter centered on the item. If a creature is in the area of effect of more than one thunder mine during a turn, they take half damage from any subsequent effects of the mines.",
          "Setting the magical mine takes a special ritual taking 1 minute, and cannot be moved once placed; any attempt to move it results it in detonating unless the Artificer setting it disarms it.",
          "You can set a number of these equal to your Intelligence modifier. The number you can place is refreshed when you complete a long rest."
        ]),
        prereqeval : "classes.known.artificer.level >= 5"
      },
      "triggered infusion" : {
        name : "Triggered Infusion",
        description : desc([
          "When you use your Store Magic feature, you can set a trigger for the effect to occur. If the triggering event occurs, you can use your reaction to activate the stored spell. The trigger event can be a verbal key."
        ]),
        prereqeval : "classes.known.artificer.level >= 1"
      },
      "twin animated weapon (prereq: level 15 artificer)" : {
        name : "Twin Animated Weapon",
        description : desc([
          "When you use your Animate Weapon feature, you can target two weapons. They both function as an Animated Weapon, making attacks against targets you attack as per the feature."
        ]),
        prereqeval : "classes.known.artificer.level >= 15"
      },
      "warding stone" : {
        name : "Warding Stone",
        description : desc([
          "You learn how to weave a protective enchantment on an item. That item gains a pool of temporary hit points equal to your Artificer level. Whoever is carrying this item gains any temporary hit points remaining in this pool, but these are lost when that creature is no longer carrying this item.",
          "This pool of temporary hit points refreshes when the Artificer that created it completes a long rest."
        ]),
        prereqeval : "classes.known.artificer.level >= 1"
      },
      "weapon enchantment expertise (prereq: level 5 artificer)" : {
        name : "Weapon Enchantment Expertise",
        description : desc([
          "You refine techniques of magical enhancements for weapons to be easier to use and maintain. You learn the spell magical weapon, and at 9th level you learn the spell elemental weapon. These do not count against your known spells, and if you already know them you may select a different Artificer spell to learn.",
          "When you cast magical weapon or elemental weapon, you can target a weapon that is already magical, adding to any effect the weapon already has. Additionally, when you have to make a Constitution saving throw to maintain concentration, you do so with advantage."
        ]),
        prereqeval : "classes.known.artificer.level >= 5"
      },
      "worn enchantment" : {
        name : "Worn Enchantment",
        description : desc([
          "You can enchant an item you a wearing, such as as scarf or cloak to animate and assist you with a task, be it climbing a wall, grappling an enemy, or picking a lock. You can expend a 1st level spell slot to gain proficiency in a Strength or Dexterity skill until you complete a long rest.",
          "You can use up all the magic in the item to gain advantage on one check of that skill, immediately ending the effect."
        ]),
        prereqeval : "classes.known.artificer.level >= 1"
      },
      "flying boots (prereq: level 15 artificer)" :{
        name : "Flying Boots",
        description : desc([
          "You cast a powerful infusion on a set of boots. The creature wearing these boots is under the effect of the fly spell."
        ]),
        prereqeval : "classes.known.artificer.level >= 15"
      }
    },
    "animated_weapon" : {
      name : "Animated Weapon",
      minlevel : 5,
      description : desc([
        "Starting at 5th level, you can animate a weapon to strike your enemies. At the end of a long rest, you can touch a melee weapon in your possession and infuse it with animating magic. You do not need to have proficiency with this weapon. During this time, when you take the attack action, you can mentally direct the animated weapon to attack a creature within within 30 feet of you; this can be in addition to making an attack with a carried weapon as normal.",
        "Additionally, whenever you cast magical weapon, elemental weapon, or holy weapon, your animated weapon also gains the benefits of the spell as long as you are concentrating on it.",
        "The weapon returns to your side after every attack. If there is no path between you and the target of your attack, the attack fails, but the animated weapon otherwise ignores cover.",
        "When attacking with an animated weapon, it is treated as if you had proficiency in the weapon (whether you do or not) and you can use you Intelligence modifier in place of your Strength or Dexterity modifier for the attack and damage rolls."
      ])
    },
    "infused_focus" : {
      name : "Infused Focus",
      minlevel : 14,
      description : desc([
        "Starting at 14th level, you can anchor a powerful spell into an item. When you cast a concentration spell, you can anchor it to an item, and do not need to maintain concentration. The spell lasts a number of rounds equal to your intelligence modifier, after which the spell ends.",
        "Once you use this ability, you must complete a short or long rest before using it again."
      ])
    }
  }
};

ClassSubList["artificer-warsmith"] = {
  regExpSearch : /warsmith/i,
  subname : "Warsmith",
  features : {
    "warsmithproficiency" : {
      name : "Warsmith's Proficiency",
      minlevel : 1,
      description : desc([
        "I gain proficiency with Heavy Armor and Smith's Tools."
      ]),
      toolProfs : [["Smith's Tools", "Dex"]],
      armor : [true, true, true, false],
      weapons: [true, true]
    },
    "mechplategauntlet" : {
      name : "Mechplate Gauntlet",
      minlevel : 1,
      description : desc([
        "I have constructed a Mechplate Gauntlet",
        "If you lose your mechplate gauntlet, you can remake it during a long rest with 25 gold worth of materials, or can scavenge for materials and forge it over two days of work (eight hours a day) without the material expense."
      ]),
      eval : "AddWeapon('mechplate gauntlet');",
      removeeval : "RemoveWeapon('mechplate gauntlet');",
      spellcastingBonus : { //optional; an object that adds something to the "Bonus Spells" section of the spell selection dialog //this object can have all the same attributes as the "spellcastingList" object, but must also have a "name" defined" //the other things that can be defined in this that are not in the "spellcastingList" object, are the "selection", "times" and "prepared" values
        name : "mechplate gauntlet grasp", //required; this is used to identify the object, so must be an unique name
        spells : ["shocking grasp"], //optional, but required if not including the "class" entry; see "spellcastingList" object
        selection : ["shocking grasp"], //optional if "spells" is defined; this is the default selection for the array specified in "spells"
        times : 1
      }
    },
    "mechplate" : {
      name : "Mechplate",
      minlevel : 3,
      description : desc([
        "At 3rd level, you've attained the Forging skill, arcane knowledge, and mastery of tinkering to create a set of Mechplate from a standard, nonmagical, set of heavy armor using resources you've gathered. This process takes 8 hours to complete, as well as place to forge and incorporates your Mechplate Gauntlet (they do not require separate attunement).",
        "You can create a new set of Mechplate be forging it from a set of Platemail, in a process takes 1000 gold pieces and eight hours.",
        "You can create multiple sets of Mechplate, but you can only be attuned to one of them at a given time, and you can only change which one you are attuned to during a long rest. If you create a new set of Mechplate, you can apply a number of Upgrades equal to the value on the class table, applying each at the level you get it on the class table."
      ]),
      eval : "AddArmor('Mechplate');",
      removeeval : "RemoveArmor('Mechplate');",
      additional : ["", "", "1 upgrade", "1 upgrade", "2 upgrades", "2 upgrades", "3 upgrades", "3 upgrades", "4 upgrades", "4 upgrades", "5 upgrades", "5 upgrades", "6 upgrades", "6 upgrades", "7 upgrades", "7 upgrades", "8 upgrades", "8 upgrades", "9 upgrades", "9 upgrades"],
      extraname : "Mechplate Upgrades",
      extrachoices : ["Accelerated Movement", "Active Camouflage (prereq: level 5 Artificer)", "Adaptable Armor", "Arcane Visor (prereq: level 15 Artificer, Darkvision Visor)", "Armor Class (prereq: level 5 Artificer)", "Cloaking Device (prereq: Active Camoflage)", "Darkvision Visor", "Collapsible (prereq: level 5 Artificer)", "Energy Surge", "Flame Projector (prereq: level 9 Artificer, Incompatible with other projectors.)", "Flash Freeze Capacitor (prereq: level 11 Artificer, Incompatible with other capacitors.)", "Flight (prereq: level 9 Artificer)", "Force Blast", "Grappling Reel", "Integrated Weapon", "Integrated Attack (prereq: level 9 Artificer, Integrated Weapon)", "Lightning Projector (prereq: level 9 Artificer, Incompatible with other projectors.)", "Mechsuit (Incompatible with Expanded and Sealed Suit upgrades.)", "Piloted Golem (prereq: Fully upgraded Powered Limbs. Incompatible with Collapsible.)", "Powered Limbs", "Power Slam Capacitor (prereq: level 11 Artificer, Incompatible with other capacitors.)", "Power Fist", "Reactive Plating (prereq: level 15 Artificer)", "Recall (prereq: level 15 Artificer)", "Resistance", "Relocation Matrix (prereq: level 15 Artificer)", "Sealed Suit (prereq: level 5 Artificer)", "Sentient Armor", "Sun Cannon (prereq: level 15 Artificer)", "Virtual Wizard (prereq: level 15 Artificer, Fully upgraded Sentient Armor)"],
      "accelerated movement": {
        name : "Accelerated Movement",
        description : desc([
          "You reduce the weight of your Mechplate’s bulk and increase the power to joints. The Mechplates weight is reduced by 15 lbs.",
          "While wearing your Mechplate your speed increases by 10 feet. This applies to all movement speeds you have while wearing your armor.",
          "You can apply this upgrade up to 2 times."
        ]),
        prereqeval : "classes.known.artificer.level >= 5"
      },
      "active camouflage (prereq: level 5 artificer)": {
        name : "Active Camouflage",
        description : desc([
          "As an action, you can activate active camouflage causing your suit to automatically blend into its surroundings. This lasts until deactivated.",
          "While this active, you are considered lightly obscured, and can hide from a creature even when they have a clear line of sight to you.",
          "Wisdom (Perception) checks to find you that rely on vision are made with disadvantage."
        ]),
        prereqeval : "classes.known.artificer.level >= 5"
      },
      "adaptable armor": {
        name : "Adaptable Armor",
        description : desc([
          "You integrate deployable hooks and fins into your armor, augmenting its mobility.",
          "While wearing your Mechplate you gain a climbing speed equal to your walking speed, and you can move up, down, and across vertical surfaces and upside down along ceilings, while leaving your hands free.",
          "Additionally, you gain a swim speed equal to your walking speed."
        ]),
        prereqeval : ""
      },"arcane visor (prereq: level 15 artificer, darkvision visor)": {
        name : "Arcane Visor",
        description : desc([
          "You add a heavily enchanted visor to your Mechplate that augments your vision. The Visor has 6 Charges.",
          "Once it is integrated into your armor, you can use an Action to expend 1 or more of its Charges to cast one of the following Spells from it, using your spell save DC: See Invisibility (2 charges) or True Seeing (4 charges).",
          "It regains all charges on a long rest."
        ]),
        prereqeval : "classes.known.artificer.level >= 15"
      },
      "armor class (prereq: level 5 artificer)": {
        name : "Armor Class",
        description : desc([
          "You inforce the structure and materials that make up your Mechplate. Your Mechplate's Armor Class (AC) increases by 1.",
          "You can apply this upgrade up to 3 times."
        ]),
        prereqeval : "classes.known.artificer.level >= 5"
      },
      "cloaking device (prereq: active camoflage)": {
        name : "Cloaking Device",
        description : desc([
          "You install an Arcane Cloaking device on your Mechplate . This device has 4 Charges.",
          "You can expend 1 or more charges to cast one of the following spells using its action: Invisibility (2 charges), Greater Invisibility (4 charges).",
          "It regains all charges after a long rest."
        ]),
        prereqeval : "classes.known.artificer.level >= 5"
      },
      "darkvision visor": {
        name : "Darkvision Visor",
        description : desc([
          "While wearing your Mechplate, you have darkvision to a range of 60 feet.",
          "If you already have darkvision, this upgrade increases its range by 60 feet."
        ]),
        prereqeval : "classes.known.artificer.level >= 1"
      },
      "collapsible (prereq: level 5 artificer)": {
        name : "Collapsible",
        description : desc([
          "Your Mechplate can collapse into a case for easy storage. When transformed this way the armor is indistinguishable from a normal case and weighs 1/3 its normal weight.",
          "As an action you can don or doff the armor, allowing it to transform as needed."
        ]),
        prereqeval : "classes.known.artificer.level >= 5"
      },
      "energy surge": {
        name : "Energy Surge",
        description : desc([
          "You upgrade your Mechplate gauntlet to support delievering a energy surge.",
          "You can use a bonus action to overcharge your gauntlet, and the next Shocking Grasp or Force Blast you hit an enemy with during that turn deals an additional 1d8 lightning damage and knocks a Large or smaller target 10 feet directly away from you."
        ]),
        prereqeval : "classes.known.artificer.level >= 1"
      },
      "flame projector (prereq: level 9 artificer, incompatible with other projectors.)": {
        name : "Flame Projector",
        description : desc([
          "The Projector has 6 Charges.",
          "Once it is integrated into your armor, you can use an action to expend 1 or more of its Charges to cast one of the following Spells from it, using your spell save DC: Burning Hands (1 charge), Fireball (3 charges), or Wall of Fire (4 charges).",
          "It regains all charges on a long rest."
        ]),
        prereqeval : "classes.known.artificer.level >= 9"
      },
      "flash freeze capacitor (prereq: level 11 artificer, incompatible with other capacitors.)": {
        name : "Flash Freeze Capacitor",
        description : desc([
          "You install a capacitor that builds an icy chill until it unleashed in a deadly burst.",
          "As an action, you can unleash it, casting Cone of Cold, and the area effected freezes, becoming difficult terrian until the start of your next turn.",
          "Once you use this ability, you cannot use it again until you complete a long rest."
        ]),
        prereqeval : "classes.known.artificer.level >= 11"
      },
      "flight (prereq: level 9 artificer)": {
        name : "Flight",
        description : desc([
          "You integrate a magical propulsion system, integrated in into your Mechplate.",
          "While wearing your Mechplate you have a Magical flying speed of 30 feet."
        ]),
        prereqeval : "classes.known.artificer.level >= 9"
      },
      "force blast": {
        name : "Force Blast",
        description : desc([
          "You upgrade your Mechplate gauntlet to allow you to make a ranged spell attack.",
          "The weapon fires blasts of arcane energy which deal 1d8 + your Intelligence modifier Force damage. The range is 30 feet.",
          "You are proficient in this weapon. When you take the attack action, you can use this ranged spell attack in place of any attack made."
        ]),
        prereqeval : "classes.known.artificer.level >= 1"
      },
      "grappling reel": {
        name : "Grappling Reel",
        description : desc([
          "Your Mechplate gains an integrated grappling reel set into your gauntlet.",
          "As 1 attack or 1 action, you may target a surface, object or creature within 40 feet. If the target is Large or Smaller, you can make a Grapple check to pull it to you and Grapple it.",
          "Alternatively, if the target is Large or larger, you can choose to be pulled to it, this does not grapple it."
        ]),
        prereqeval : "classes.known.artificer.level >= 1"
      },
      "integrated weapon": {
        name : "Integrated Weapon",
        description : desc([
          "You integrate a melee weapon into your Mechplate. When you apply this upgrade you must have a weapon to integrate, and you must choose where on your armor the weapon is located.",
          "You must treat it as though you are wielding it with one hand, but you cannot be disarmed of it. Once activated, you can use this weapon when you take the attack action, and it does not require the use of a hand or your mechplate gauntlet.",
          "The weapon cannot have the Heavy property. You are proficient with this weapon. As a bonus action you can activate the weapon.",
          "You can apply this upgrade multiple times, selecting a new weapon and new location on your armor to install it."
        ]),
        prereqeval : "classes.known.artificer.level >= 1"
      },
      "integrated attack (prereq: level 9 artificer, integrated weapon)": {
        name : "Integrated Attack",
        description : desc([
          "When you activate your Integrated weapon, you can immediately make one attack with it.",
          "While it is active, you can make an attack with it using your bonus action."
        ]),
        prereqeval : "classes.known.artificer.level >= 9"
      },
      "lightning projector (prereq: level 9 artificer, incompatible with other projectors.)": {
        name : "Lightning Projector",
        description : desc([
          "The Projector has 6 Charges.",
          "Once it is integrated into your armor, you can use an action to expend 1 or more of its Charges to cast one of the following Spells from it, using your spell save DC: Thunderwave (1 charge), Lightning Bolt (3 charges), or Storm Sphere (4 charges).",
          "It regains all charges on a long rest."
        ]),
        prereqeval : "classes.known.artificer.level >= 9"
      },
      "mechsuit (incompatible with expanded and sealed suit upgrades.)": {
        name : "Mechsuit",
        description : desc([
          "You rebuild your Mechplate to remove the heavy plating.",
          "You can retain all benefits and upgrades of the Mechplate, but now serves only as Medium armor, providing a base of 15 AC, and its weight is reduced to 40 lbs."
        ]),
        prereqeval : "classes.known.artificer.level >= 1"
      },
      "piloted golem (prereq: fully upgraded powered limbs. incompatible with collapsible.)": {
        name : "Piloted Golem",
        description : desc([
          "You enlarge your Mechplate, turning it into a piloted mechanical golem.",
          "Your size category when wearing the armor increases by one, and you have advantage on Strength checks and Strength saving throws."
        ]),
        prereqeval : "classes.known.artificer.level >= 1"
      },
      "powered limbs": {
        name : "Powered Limbs",
        description : desc([
          "You upgrade frame and limbs of your armor. The bonus your Mechplate grants to your Strength score and maximum Strength score increases by 1 while wearing this armor.",
          "You can apply this upgrade up to 3 times."
        ]),
        prereqeval : "classes.known.artificer.level >= 1"
      },
      "power slam capacitor (prereq: level 11 artificer, incompatible with other capacitors.)": {
        name : "Power Slam Capacitor",
        description : desc([
          "You install a capacitor that builds up destructive energy.",
          "As an Action, you can leap a distance up to your movement speed, casting Destructive Wave upon landing.",
          "Once you use this ability, you cannot use it again until you complete a long rest."
        ]),
        prereqeval : "classes.known.artificer.level >= 11"
      },
      "power fist": {
        name : "Power Fist",
        description : desc([
          "You upgrade your Mechplate gauntlet to reflect a commitment to using it to punch things, with increased reinforcement and weight, and better arm support from your suit.",
          "Your Mechplate gauntlet's unarmed strike is upgraded to deal 1d8 bludgeoning damage and gains the Special properity.",
          "Special: When you make an attack roll, you can choose to forgo adding your Proficiency modifier to the attack roll. If the attack hits, you can add double your Proficiency modifier to the damage roll."
        ]),
        prereqeval : "classes.known.artificer.level >= 1"
      },
      "reactive plating (prereq: level 15 artificer)": {
        name : "Reactive Plating",
        description : desc([
          "You install special heavy plating, giving you resistance to bludgeoning, piercing, and slashing damage from non-magical sources while wearing your Mechplate.",
          "In addition, you can use your reaction when hit by an attack to reduce the damage of that attack by an amount equal to your proficiency bonus."
        ]),
        prereqeval : "classes.known.artificer.level >= 15"
      },
      "recall (prereq: level 15 artificer)": {
        name : "Recall",
        description : desc([
          "When not being worn you can hide your Mechplate in a pocket dimension.",
          "As an action on your turn you can magically summon the armor and don it. You can use a bonus action to return the armor to the pocket dimension.",
          "While in the pocket dimension the armor cannot be affected by other abilities and cannot be interacted with in any way."
        ]),
        prereqeval : "classes.known.artificer.level >= 15"
      },
      "resistance": {
        name : "Resistance",
        description : desc([
          "You tune your Mechplate against certain forms of damage.",
          "Choose acid, cold, fire, force, lightning, necrotic, radiant, or thunder damage. While wearing your Mechplate you have resistance to that type of damage.",
          "If you apply this upgrade more than once you must choose a different damage type."
        ]),
        prereqeval : "classes.known.artificer.level >= 1"
      },
      "relocation matrix (prereq: level 15 artificer)": {
        name : "Relocation Matrix",
        description : desc([
          "You install an arcane transmutation matrix that you can use to convert your magical power into dimensional warp.",
          "As an action, you can cast Dimension Door without expending a spell slot.",
          "Once you use this ability, you can not use it again until you complete a long rest."
        ]),
        prereqeval : "classes.known.artificer.level >= 15"
      },
      "sealed suit (prereq: level 5 artificer)": {
        name : "Sealed Suit",
        description : desc([
          "As a bonus action on your turn you can environmentally seal your Mechplate, giving you an air supply for up to 1 hour and making you immune to poison (but not curing you of existing poisoned conditions).",
          "Your armor regains 1 minute of air for every minute that you are not submerged and the armor is not sealed.",
          "In addition to the above, you are also considered adapted to cold and hot climates while wearing your armor, and you’re also acclimated to high altitude while wearing your armor."
        ]),
        prereqeval : "classes.known.artificer.level >= 5"
      },
      "sentient armor": {
        name : "Sentient Armor",
        description : desc([
          "You install an artificial personality into your Mechplate, making it a sentient item. This sentience assists you in all ways.",
          "The bonus your Mechplate grants to your Intelligence score and maximum Intelligence score increases by 1 while wearing this armor. You can apply this upgrade up to 2 times.",
          "Additionally, when this is fully upgraded, you cannot be surprised while wearing your Mechplate."
        ]),
        prereqeval : "classes.known.artificer.level >= 1"
      },
      "sun cannon (prereq: level 15 artificer)": {
        name : "Sun Cannon",
        description : desc([
          "You install a sun cannon into your mechplate, allowing for emmiting devestating solar lazer blasts.",
          "As an action, you can cast Sunbeam without expending a spell slot.",
          "Once you use this ability, you can not use it again until you complete a long rest."
        ]),
        prereqeval : "classes.known.artificer.level >= 15"
      },
      "virtual wizard (prereq: level 15 artificer, fully upgraded sentient armor)": {
        name : "Virtual Wizard",
        description : desc([
          "While wearing your Mechplate, your Mechplates built in intelligence assists your spell casting.",
          "Your spell save DC and spell attack bonus are each increased by 2."
        ]),
        prereqeval : "classes.known.artificer.level >= 15"
      }
    },
    "extra_attack" : {
      name : "Extra Attack",
      minlevel : 5,
      description : desc([
        "Beginning at 5th level, you can attack twice, instead of once, whenever you take the Attack action on your turn."
        ]),
      eval : "ClassList['artificer'].attacks = [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]",
      removeeval : "ClassList['artificer'].attacks = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]"
    },
    "fully_customized_gear" : {
      name : "Fully Customized Gear",
      minlevel : 14,
      description : desc([
        "Starting at 14th level, you've mastered the customization of your Mechplate. You can immediately select two additional upgrades that do not count against your class upgrade total for your Mechplate.",
        "Additionally, during a long rest, you can now swap out any one upgrade for any other upgrade of the same level requirements, so long as you don't have upgrade that requires the upgrade you are removing as a prerequisite, or an incompatible upgrades."
        ])
    }
  }
};

ClassSubList["artificer-wandsmith"] = {
  regExpSearch : /wandsmith/i,
  subname : "Wandsmith",
  features : {

  }
};

/*
  Wonderous Class Items
*/

// Cannonsmith
WeaponsList["thunder cannon"] = {
  regExpSearch : /^(?=.*thunder cannon).*$/i,
  name : "Thunder Cannon",
  source : ["HB", 0],
  ability : 2,
  type : "Natural",
  damage : [2, 6, "Piercing"],
  range : "60/180 ft",
  description : "Two-handed, loud, reload(1)",
  abilitytodamage : false,
  modifiers : ["Dex", ""],
  monkweapon : false,
  weight : 15
};
// Gadgetsmith

// Potionsmith

// Runesmith

// Warsmith
WeaponsList["mechplate gauntlet"] = {
  regExpSearch : /^(?=.*mechplate gauntlet).*$/i,
  name : "Mechplate Gauntlet",
  source : ["HB", 0],
  ability : 1,
  type : "Natural",
  damage : [1, 6, "Bludegoning"],
  range : "Melee",
  description : "While wearing this gauntlet, you have proficiency in Martial Weapons, unarmed strikes using this gauntlet deal 1d6 bludgeoning damage, and you learn the Shocking Grasp cantrip and can cast it through the gauntlet.",
  abilitytodamage : false,
  modifiers : ["", "Str"],
  monkweapon : false
};
ArmourList["mechplate"] = {
  regExpSearch : /^(?=.*mechplate).*$/i,
  name : "Mechplate",
  source : ["HB", 0],
  type : "heavy",
  ac : 18,
  stealthdis : true,
  weight : 105,
  description : "While wearing your Mechplate your Strength score increases by 2, and your maximum Strength score increase by the same amount. Additionally, you count as one size larger when determining the weight you can push, drag, or lift. A small creature wearing mechplate becomes a medium sized creature while wearing the mechplate."
};

// Wandsmith
