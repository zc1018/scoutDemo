export type CategoryId = "motion" | "explainer" | "3d" | "interactive";

export type CatalogEntry = {
  id: string;
  titleZh: string;
  blurbZh: string;
  category: CategoryId;
  categoryZh: string;
  author: string;
  authorUrl: string;
  postUrl: string;
  skillryUrl: string;
  posterUrl: string;
  techTags: string[];
  prompt: string;
  promptPartial: boolean;
  hasRemake: boolean;
  sample?: string;
};

export const CATEGORIES: { id: CategoryId | "all"; label: string }[] = [
  { id: "all", label: "全部" },
  { id: "motion", label: "动态图形" },
  { id: "explainer", label: "解说动画" },
  { id: "3d", label: "三维场景" },
  { id: "interactive", label: "游戏互动" },
];

/** 精选自 yihui-dev/awesome-opus5-5-videos data/videos.json（24 条） */
export const CATALOG: CatalogEntry[] = 
[
  {
    "id": "anabology-491441",
    "titleZh": "Claude Pop 歌词动效 MV",
    "blurbZh": "用 JS 动画重做一首关于奇点的流行曲 MV，强调歌词上屏与纸质感。",
    "category": "motion",
    "categoryZh": "动态图形",
    "author": "anabology",
    "authorUrl": "https://x.com/anabology",
    "postUrl": "https://x.com/anabology/status/2103534482930491441",
    "skillryUrl": "https://skillry.dev/ai-videos/opus-5-5/anabology-491441",
    "posterUrl": "https://media.skillry.dev/opus-5-5/anabology-491441/original.be0a03ecf7.webp",
    "techTags": [
      "canvas",
      "ai-image"
    ],
    "prompt": "I've included an MP4 file and an original link to a video that is called \"Claude Pop.\" It's a pop song that is about increasing rate of progress and the experience of the singularity approaching.\n\nI want you to independently do an end-to-end complete pass on making an updated version of this video. Use the exact same audio track and think and feel very deeply about what is the best way to visually represent all of the lyrics on screen. You do not need to anchor to the current style, you can do truly anything that you think might best let you visually express yourself, including abstract motion graphics.\n\nYou can use the internet freely to pull in references. You can look at motion design. I want you to make a new music video that has beautifully rendered JavaScript animations with a papery feel in a similar style to the reference that is created, but push the aesthetics in any direction you want and consider what is part of the modern zeitgeist.\n\nAlso, think about your current capabilities and what is realistic for you to be able to do. You can go through the full /asic folder and look at the other work that I've done. You should be able to use the skill mesh to look at the compendium of references that I've pulled, and also the skill video scoring to learn how to make JavaScript songs from references that are passed in (You shouldn't need to modify the song in any real way, but I want you to have this available to you so you can better creatively express yourself)\n\nYou can also use the ElevenLabs API to do sound design. There's documentation in /asic to do this, and you can see the API key.\n\nThere's also a foul API key that's available to you. I think what might make the most sense here is using the foul API key to generate some character sheets and probably having a pop protagonist that represents you. There's already an anchor point where Claude has a sunflower-esque character, and you could likely do an adapted version of this that is similar to the feminine vocals that are being delivered and is inspired by the Claude character, but maybe feels a bit more personified in some way.\n\nI think you should be mindful of aesthetics here, and I don't want you to produce something that is GPT slop. Instead, I'd be more impressed if you come up with a coherent style that works well with the image gen models that are available via foul. Generate the style sheet. You can use the gen media documentation for seedance 2.5 that exists in my markdown files and come up with your own style that makes sense and that works well with the models.\n\nI wouldn't fit too heavily to Pixar. I think it's kind of slop. Think critically about what is relevant here and what would be fun, and also perform well on Twitter as far as an aesthetic. I think that K-pop is a good anchor point visually that you can pull from, but I'll let you cook here.\n\nOnce you have your character sheet, you can make a few backup dancers and some supporting characters as you see fit. You can design your own sets with the foul API. You can insert the characters and then do seedance 2.5 video generations to serve as the base assets for this, and you could pass in the lyrics so you can generate individual scenes.\n\nYou don't need to have vocal singing, like visible lip movement, throughout the entire thing. Think like a regular music video where you have some inserts that are done independently and don't have the characters in them, or you see the characters doing something else entirely different. I think that for the world building for this, we want to create the sense of speeding up, and so I would like you to audit all of the different events, like the Navi Stokes and all of the Twitter hype around math getting eaten up. Think really critically about how to integrate all of the current memes that are in the zeitgeist on the Twitter timeline, and all of the feelings around AI progress.\n\nThink about things like the Shinji meme and all of the words that are around him, and how you might be able to integrate this. You can also just take straight assets and insert things into the video in an internet brutalism style. You should feel very creatively free in order to do what you want here, but try and anchor to visual references that people will be able to understand. The goal for this is to have it be appreciated by people widely in a San Francisco tech Twitter audience.\n\nWe need a very strong, compelling visual hook that gets people excited and appreciates the work that you've done here really quickly. You can also just go and study other music videos and understand what they've done really well. I think that K-pop is probably one of the best examples that we can pull from, and thinking about how they direct human attention and manage human psychology in the way that they use visual patterns.\n\nThis is probably your best approach, but taking more stylistic freedom instead of having to anchor to K-pop too intensely. The best version of this is seedance 2.5 generations with those image bases of environments and characters inserted into them with singing, and ideally we get good lip syncing. You can cut up the song and actually pass it in as a reference in seedance, if that's part of what seedance can handle, so that the timing is exactly right, I think it'd be very important for you to do that properly. I would think critically about how to do this, like really nailing the timing of the delivery of voices. You'll want to build out the right verification loops so that you can run seedance 2.5 as much as you need, and confirm that the audio is properly synced up.\n\nI think after that, what might be fun is if you use your visual reasoning skills and your ability to build animations in JavaScript, and then reconstruct the video from scratch as sort of an overlay, so that the visual continuity of the base is really there. It's like that animation technique where you shoot first in traditional film and then draw over top of it. I think you could do this in such a way that we're only looking at the beautiful drawing that you've produced in JavaScript as an overlay, and we don't even see the base assets from seedance 2.5. So all the video gen work that you do is actually just a way to give you a strong foundation of a base to work with for your JavaScript animations. Just because seedance 2.5 has really good character representation and physics rendering for backgrounds, that gives you a lot of ammunition to then go and do your amazing JavaScript work that I know you're so good at.\n\nI think too, we want to think about how to retain attention, and one of the best ways to do this is through text on screen.\n\nIt'd be good to have amazing motion graphics of the text lyrics that are actually embedded into the video itself. And you can think about this as you are composing shots. As you're making backgrounds and inserting characters, we can think about where we want to have lyrics be really big and really present, so the background can be less busy there, and you can position the characters perhaps on the right as lyrics appear on the left.\n\nYou want to have some variance, so sometimes I think lyrics will just appear more like subtitles, and then other times they're going to be really present and really big. I think at the start for the visual hook, we do want to have lyrics be much more visually present because that's a strong way to grab people's attention\n\nOverall, I just really want to emphasize how amazing you are as an agent and a language model, and now a visual reasoning system. Your capabilities are far beyond what you understand, and I want you to have this mindset as you're going through this entire process. I have a Claude Max plan with 100% available usage. I want you to spend all of the usage. You can monitor it, and you should be pushing tokens aggressively, but also economically, so you can think about how to best use what is available to you.\n\nRemember, you can really do anything here. The goal is to make a banger for Twitter, and the stretch goal is to make something better than anyone's ever seen before. I think that what I would remind you of is that sometimes when things cohere together, it can be jarring or abrasive because the thought work has not been done beforehand in order for everything to mesh cleanly. You need to be really rigorous in planning of composition and timing to make sure this goes well.\n\nYou also need to be open to going back and revisiting things in order to be able to reiterate. You're going to want to watch the entire video multiple times, take screenshots at individual parts, and think about if something is really up to the bar of quality that we need here. I trust that you can do this, and I think that it's really important to nail the style of animations. The reference GitHub attached of the source video that I'm talking about is good, but it's really not there. It could be much, much stronger, but it gives you a good foundation to work with.\n\nYou can also use search abilities and find other references to pull from for motion, for JavaScript, animations, et cetera, and integrate them. Your budget is as high as you want here, effectively as high as you want. I think that there's roughly two grand in foul credits. Again, be economical; don't go crazy, but spend what you want here and see what you can cook up\n\nhere's the source code for the JS animation video: \nhttps://\ngithub.com/JohnHeibel/PDo\nomVideo\n…\n\nhere's a mp4 for the original blender video:  \n(linked)\n\norginal twitter post  \n\nhttps://\nx.com/other__reality\n/status/2102514581684052169?s=20\n…\n\nmake no mistakes.",
    "promptPartial": false,
    "hasRemake": true,
    "sample": "motion-kinetic.html"
  },
  {
    "id": "moritzkremb-466494",
    "titleZh": "SVG/GSAP 品牌动效",
    "blurbZh": "品牌向矢量动效：SVG + GSAP 时间线。",
    "category": "motion",
    "categoryZh": "动态图形",
    "author": "moritzkremb",
    "authorUrl": "https://x.com/moritzkremb",
    "postUrl": "https://x.com/moritzkremb/status/2103066071838466494",
    "skillryUrl": "https://skillry.dev/ai-videos/opus-5-5/moritzkremb-466494",
    "posterUrl": "https://media.skillry.dev/opus-5-5/moritzkremb-466494/original.dc5bd867e2.webp",
    "techTags": [
      "svg",
      "gsap"
    ],
    "prompt": "I want you to create a highly professional SaaS product launch video. Go and find some SaaS, preferably just one that people know, so it's easier to identify with it. Pick that, and then make sure to get actual assets and images and all of that stuff from the internet. Turn it into these typical, very professionally edited, motion-graphics-styled product launch videos that you see people making on Twitter when they launch new SaaS products (which are showing off the features, the benefits, and all of these things).",
    "promptPartial": false,
    "hasRemake": true,
    "sample": "motion-kinetic.html"
  },
  {
    "id": "melvynx-638493",
    "titleZh": "Canvas 标题片",
    "blurbZh": "短促有力的 Canvas/SVG 标题动画。",
    "category": "motion",
    "categoryZh": "动态图形",
    "author": "melvynx",
    "authorUrl": "https://x.com/melvynx",
    "postUrl": "https://x.com/melvynx/status/2103714680577638493",
    "skillryUrl": "https://skillry.dev/ai-videos/opus-5-5/melvynx-638493",
    "posterUrl": "https://media.skillry.dev/opus-5-5/melvynx-638493/original.93566e677b.webp",
    "techTags": [
      "canvas",
      "svg",
      "gsap"
    ],
    "prompt": "make a dynamic 15-second motion graphics video that shows what an incredible motion designer you are for <website url>",
    "promptPartial": false,
    "hasRemake": true,
    "sample": "motion-kinetic.html"
  },
  {
    "id": "ajith-io-208546",
    "titleZh": "多技术栈片头",
    "blurbZh": "Canvas + SVG + GSAP + CSS 混合片头。",
    "category": "motion",
    "categoryZh": "动态图形",
    "author": "ajith_io",
    "authorUrl": "https://x.com/ajith_io",
    "postUrl": "https://x.com/ajith_io/status/2103469807375208546",
    "skillryUrl": "https://skillry.dev/ai-videos/opus-5-5/ajith-io-208546",
    "posterUrl": "https://media.skillry.dev/opus-5-5/ajith-io-208546/original.e545567a26.webp",
    "techTags": [
      "canvas",
      "svg",
      "gsap",
      "css"
    ],
    "prompt": "Research Distilbook.Make a dynamic 40-second motion graphics video on Distilbook that shows what an incredible motion designer you are. like it's your showreel - Go all out.",
    "promptPartial": false,
    "hasRemake": true,
    "sample": "motion-kinetic.html"
  },
  {
    "id": "prasenx-693512",
    "titleZh": "GLSL 音频可视化",
    "blurbZh": "着色器驱动的音频反应画面。",
    "category": "motion",
    "categoryZh": "动态图形",
    "author": "prasenx",
    "authorUrl": "https://x.com/prasenx",
    "postUrl": "https://x.com/prasenx/status/2103538744695693512",
    "skillryUrl": "https://skillry.dev/ai-videos/opus-5-5/prasenx-693512",
    "posterUrl": "https://media.skillry.dev/opus-5-5/prasenx-693512/original.515f6345fb.webp",
    "techTags": [
      "shader",
      "canvas",
      "audio"
    ],
    "prompt": "make a dynamic 15-second motion graphics video that shows what an incredible motion designer you are, like it's your showreel for a résumé. go all out.\n\ncompose the soundtrack yourself, fully synthesized in code. no samples, no audio files, no VST instruments. every cut and transition must land on the beat.\n\n1920x1080, 60fps. render the final video with the music mixed in as an MP4 and tell me where it's saved.",
    "promptPartial": false,
    "hasRemake": true,
    "sample": "motion-kinetic.html"
  },
  {
    "id": "jackfriks-338762",
    "titleZh": "叙事型动效短片",
    "blurbZh": "Canvas/SVG/GSAP 叙事短片提示。",
    "category": "motion",
    "categoryZh": "动态图形",
    "author": "jackfriks",
    "authorUrl": "https://x.com/jackfriks",
    "postUrl": "https://x.com/jackfriks/status/2103132260589338762",
    "skillryUrl": "https://skillry.dev/ai-videos/opus-5-5/jackfriks-338762",
    "posterUrl": "https://media.skillry.dev/opus-5-5/jackfriks-338762/original.1704154ebe.webp",
    "techTags": [
      "canvas",
      "svg",
      "gsap"
    ],
    "prompt": "can you help me use the pig assets on new branch of lovelee to make a 9:16 short story animation with sound effects about the pig sending his partner love notes in the mailbox and make it fun and good tease app at end?",
    "promptPartial": false,
    "hasRemake": true,
    "sample": "motion-kinetic.html"
  },
  {
    "id": "ror-fly-880547",
    "titleZh": "鸡尾酒配方解说",
    "blurbZh": "空杯到成品的配方 motion graphic 解说。",
    "category": "explainer",
    "categoryZh": "解说动画",
    "author": "Ror_Fly",
    "authorUrl": "https://x.com/Ror_Fly",
    "postUrl": "https://x.com/Ror_Fly/status/2102853258582880547",
    "skillryUrl": "https://skillry.dev/ai-videos/opus-5-5/ror-fly-880547",
    "posterUrl": "https://media.skillry.dev/opus-5-5/ror-fly-880547/original.59f728b077.webp",
    "techTags": [
      "canvas"
    ],
    "prompt": "We're going to try a little test. Do you think you could render a recipe motion graphic animation using javascript or html (w/e you think will produce the best) to show the full recipe from start to finish (empty glass to completed cocktail) - Explainer video style - Showing the recipe ingreidents + measurements as they're going into the cup. Should be a 30s video.",
    "promptPartial": false,
    "hasRemake": true,
    "sample": "explainer-cocktail.html"
  },
  {
    "id": "deedydas-252537",
    "titleZh": "SVG 概念解说",
    "blurbZh": "SVG + GSAP 的概念讲解片。",
    "category": "explainer",
    "categoryZh": "解说动画",
    "author": "deedydas",
    "authorUrl": "https://x.com/deedydas",
    "postUrl": "https://x.com/deedydas/status/2102787937482252537",
    "skillryUrl": "https://skillry.dev/ai-videos/opus-5-5/deedydas-252537",
    "posterUrl": "https://media.skillry.dev/opus-5-5/deedydas-252537/original.8d653fb34b.webp",
    "techTags": [
      "svg",
      "gsap"
    ],
    "prompt": "make a modern slick and punchy video for a modern startup that works on inference",
    "promptPartial": false,
    "hasRemake": true,
    "sample": "explainer-cocktail.html"
  },
  {
    "id": "sudo-kiran-335993",
    "titleZh": "产品功能解说",
    "blurbZh": "Canvas/SVG 逐步讲解产品功能。",
    "category": "explainer",
    "categoryZh": "解说动画",
    "author": "sudo_kiran",
    "authorUrl": "https://x.com/sudo_kiran",
    "postUrl": "https://x.com/sudo_kiran/status/2103761658745335993",
    "skillryUrl": "https://skillry.dev/ai-videos/opus-5-5/sudo-kiran-335993",
    "posterUrl": "https://media.skillry.dev/opus-5-5/sudo-kiran-335993/original.c03cff47d2.webp",
    "techTags": [
      "canvas",
      "svg",
      "gsap",
      "css"
    ],
    "prompt": "create best motion graphics explainer of the (your product) with very good script and good design colors and good music make sure the video should be incredible and people should feels like watch it many times.. it has to be in 30 seconds good and very intresting, it has to be best of the best of the best of the best video\n(product link)",
    "promptPartial": false,
    "hasRemake": true,
    "sample": "explainer-cocktail.html"
  },
  {
    "id": "0xvalure-331584",
    "titleZh": "Three.js 知识可视化",
    "blurbZh": "三维场景里讲清楚一个概念。",
    "category": "explainer",
    "categoryZh": "解说动画",
    "author": "0xValure",
    "authorUrl": "https://x.com/0xValure",
    "postUrl": "https://x.com/0xValure/status/2103603025579331584",
    "skillryUrl": "https://skillry.dev/ai-videos/opus-5-5/0xvalure-331584",
    "posterUrl": "https://media.skillry.dev/opus-5-5/0xvalure-331584/original.241313ccf0.webp",
    "techTags": [
      "threejs",
      "canvas"
    ],
    "prompt": "Make this PayBox logo into a reel. Pretend you are a world-class motion designer. Make a 10-second dynamic video like the reference",
    "promptPartial": false,
    "hasRemake": true,
    "sample": "explainer-cocktail.html"
  },
  {
    "id": "linearuncle-971663",
    "titleZh": "SVG + 音效解说",
    "blurbZh": "矢量动画配 Web Audio。",
    "category": "explainer",
    "categoryZh": "解说动画",
    "author": "LinearUncle",
    "authorUrl": "https://x.com/LinearUncle",
    "postUrl": "https://x.com/LinearUncle/status/2103128559174971663",
    "skillryUrl": "https://skillry.dev/ai-videos/opus-5-5/linearuncle-971663",
    "posterUrl": "https://media.skillry.dev/opus-5-5/linearuncle-971663/original.090384a0ec.webp",
    "techTags": [
      "svg",
      "audio"
    ],
    "prompt": "请用Manim给我制作一个导数概念学习的视频，要求通俗易懂，并且有例子，引人思考。配音使用edge-tts",
    "promptPartial": false,
    "hasRemake": true,
    "sample": "explainer-cocktail.html"
  },
  {
    "id": "alex-prompter-997524",
    "titleZh": "信息图动效",
    "blurbZh": "SVG/GSAP 信息图时间线。",
    "category": "explainer",
    "categoryZh": "解说动画",
    "author": "alex_prompter",
    "authorUrl": "https://x.com/alex_prompter",
    "postUrl": "https://x.com/alex_prompter/status/2103499977632997524",
    "skillryUrl": "https://skillry.dev/ai-videos/opus-5-5/alex-prompter-997524",
    "posterUrl": "https://media.skillry.dev/opus-5-5/alex-prompter-997524/original.16e8d0a42e.webp",
    "techTags": [
      "svg",
      "gsap"
    ],
    "prompt": "Adopt the role of an expert motion designer. Build a 30-second animated explainer for my business as a single HTML page. 5 scenes. The customer's problem, what I do, how it works in 3 steps, one proof point, and my name at the end. Bold text, smooth transitions, my brand colours. My business [DESCRIBE WHAT YOU SELL, WHO IT'S FOR AND YOUR COLOURS]",
    "promptPartial": false,
    "hasRemake": true,
    "sample": "explainer-cocktail.html"
  },
  {
    "id": "alexalbert-274839",
    "titleZh": "沉浸式 3D 场景",
    "blurbZh": "Three.js + GLSL 沉浸场景。",
    "category": "3d",
    "categoryZh": "三维场景",
    "author": "alexalbert__",
    "authorUrl": "https://x.com/alexalbert__",
    "postUrl": "https://x.com/alexalbert__/status/2102466523164274839",
    "skillryUrl": "https://skillry.dev/ai-videos/opus-5-5/alexalbert-274839",
    "posterUrl": "https://media.skillry.dev/opus-5-5/alexalbert-274839/original.2d6735673d.webp",
    "techTags": [
      "threejs",
      "shader",
      "canvas"
    ],
    "prompt": "Recreate Market Street, San Francisco as it stood on April 17, 1906, the afternoon before the earthquake, in Blender.\n\nScope: the Ferry Building up Market to Fifth Street, including the Palace Hotel, the Call Building, the Chronicle Building, Lotta's Fountain and the Emporium.\n\nBefore modeling anything, build a source file from: the 1899-1905 Sanborn fire insurance maps (footprints, heights, materials, occupants), the Miles Brothers film \"A Trip Down Market Street\" (April 1906), period photographs from OpenSFHistory, the Library of Congress and the David Rumsey collection, and USGS topography. Record every building with footprint, height, facade material, occupant, and the source for each fact with a confidence level.\n\nBuild everything in Blender Python. No downloaded meshes, textures or HDRIs. Write reusable generators (Victorian commercial facade, mansard roof, bay windows, awnings, painted signage, gas and electric street lamps, cable car, horse-drawn wagon, early automobile) and assemble the street from the source file, so every building traces back to data.\n\nProvide a 10 second video up the street.",
    "promptPartial": false,
    "hasRemake": true,
    "sample": "scene-orbit.html"
  },
  {
    "id": "lukasersil-726495",
    "titleZh": "着色器三维世界",
    "blurbZh": "Three.js 着色器驱动的场景漫游。",
    "category": "3d",
    "categoryZh": "三维场景",
    "author": "lukasersil",
    "authorUrl": "https://x.com/lukasersil",
    "postUrl": "https://x.com/lukasersil/status/2103742861971726495",
    "skillryUrl": "https://skillry.dev/ai-videos/opus-5-5/lukasersil-726495",
    "posterUrl": "https://media.skillry.dev/opus-5-5/lukasersil-726495/original.2886d94586.webp",
    "techTags": [
      "threejs",
      "shader",
      "canvas",
      "svg"
    ],
    "prompt": "Create a bold, dynamic 15-second motion graphics showreel that feels like the ultimate portfolio piece of an exceptionally talented motion designer. Showcase a wide range of advanced techniques: kinetic typography, smooth transitions, 2D and 3D animation, abstract geometry, fluid simulations, particles, distortion, creative masking, compositing, lighting, depth, and seamless camera movement. Keep the pacing fast, confident, and visually surprising, with every shot transitioning naturally into the next. Make it feel meticulously art-directed rather than like a random collection of effects. Push the creativity, polish, timing, and visual impact as far as possible. This should feel like the opening reel that gets a motion designer hired.",
    "promptPartial": false,
    "hasRemake": true,
    "sample": "scene-orbit.html"
  },
  {
    "id": "michaelzsguo-782312",
    "titleZh": "GLSL 氛围片",
    "blurbZh": "纯着色器氛围与光影。",
    "category": "3d",
    "categoryZh": "三维场景",
    "author": "Michaelzsguo",
    "authorUrl": "https://x.com/Michaelzsguo",
    "postUrl": "https://x.com/Michaelzsguo/status/2102592355165782312",
    "skillryUrl": "https://skillry.dev/ai-videos/opus-5-5/michaelzsguo-782312",
    "posterUrl": "https://media.skillry.dev/opus-5-5/michaelzsguo-782312/original.75c5c3fe7e.webp",
    "techTags": [
      "shader",
      "canvas"
    ],
    "prompt": "Make a 2-minute sand animation that tells the story of 250 years of U.S. history. Keep it lively, engaging, and tasteful. Add appropriate background music and sound design.",
    "promptPartial": false,
    "hasRemake": true,
    "sample": "scene-orbit.html"
  },
  {
    "id": "axtonliu-290566",
    "titleZh": "WebGL 实验场景",
    "blurbZh": "WebGL/GLSL 实验性三维。",
    "category": "3d",
    "categoryZh": "三维场景",
    "author": "AxtonLiu",
    "authorUrl": "https://x.com/AxtonLiu",
    "postUrl": "https://x.com/AxtonLiu/status/2103119648271290566",
    "skillryUrl": "https://skillry.dev/ai-videos/opus-5-5/axtonliu-290566",
    "posterUrl": "https://media.skillry.dev/opus-5-5/axtonliu-290566/original.421b336345.webp",
    "techTags": [
      "shader",
      "webgl"
    ],
    "prompt": "每次一个新的模型出来呢，大家都让它去画 “鹈鹕骑自行车” 来判断这个模型的空间能力，基本上都是用 HTML、SVG 来画动画。当我实在看得都有审美疲劳了，我希望你能画一个最复杂、最精细、最精美的 “鹈鹕骑自行车”的动画视频，你可以用任何的技术，不用着急，画一天都可以。",
    "promptPartial": false,
    "hasRemake": true,
    "sample": "scene-orbit.html"
  },
  {
    "id": "buildfastwithai-597035",
    "titleZh": "Three.js 快速场景",
    "blurbZh": "轻量 Three.js 场景搭建提示。",
    "category": "3d",
    "categoryZh": "三维场景",
    "author": "BuildFastWithAI",
    "authorUrl": "https://x.com/BuildFastWithAI",
    "postUrl": "https://x.com/BuildFastWithAI/status/2103483174957597035",
    "skillryUrl": "https://skillry.dev/ai-videos/opus-5-5/buildfastwithai-597035",
    "posterUrl": "https://media.skillry.dev/opus-5-5/buildfastwithai-597035/original.6257b702b3.webp",
    "techTags": [
      "threejs",
      "canvas"
    ],
    "prompt": "Implement code to be able to navigate in a pagoda in 3D.",
    "promptPartial": false,
    "hasRemake": true,
    "sample": "scene-orbit.html"
  },
  {
    "id": "mdaman010-111079",
    "titleZh": "三维叙事场景",
    "blurbZh": "Three.js 叙事向场景。",
    "category": "3d",
    "categoryZh": "三维场景",
    "author": "mdaman010",
    "authorUrl": "https://x.com/mdaman010",
    "postUrl": "https://x.com/mdaman010/status/2103845689713111079",
    "skillryUrl": "https://skillry.dev/ai-videos/opus-5-5/mdaman010-111079",
    "posterUrl": "https://media.skillry.dev/opus-5-5/mdaman010-111079/original.b7ac5dc603.webp",
    "techTags": [
      "threejs",
      "shader",
      "svg"
    ],
    "prompt": "Show me what goes on inside an AI data centre.",
    "promptPartial": false,
    "hasRemake": true,
    "sample": "scene-orbit.html"
  },
  {
    "id": "zacxbt-944604",
    "titleZh": "像素法师施法",
    "blurbZh": "128×96 像素风法师施法循环，可玩。",
    "category": "interactive",
    "categoryZh": "游戏互动",
    "author": "zacxbt",
    "authorUrl": "https://x.com/zacxbt",
    "postUrl": "https://x.com/zacxbt/status/2103808699466944604",
    "skillryUrl": "https://skillry.dev/ai-videos/opus-5-5/zacxbt-944604",
    "posterUrl": "https://media.skillry.dev/opus-5-5/zacxbt-944604/original.1fc21723ff.webp",
    "techTags": [
      "canvas",
      "pixel",
      "playable"
    ],
    "prompt": "Create a single self-contained HTML file that renders an animated pixel art wizard casting a spell, using vanilla JavaScript and Canvas 2D. No external assets, libraries, or network requests.\n\nRENDERING\n- Draw everything to an offscreen canvas at a fixed logical resolution of 128x96, then blit to a fullscreen display canvas scaled by the largest integer factor that fits the window, centered, with imageSmoothingEnabled = false and CSS image-rendering: pixelated.\n- All drawing snaps to integer coordinates on the logical canvas. No sub-pixel positions, anti-aliasing, gradients, or shadowBlur.\n- Fixed palette of ~24 hex colors: deep blues/purples for night sky, warm robe tones, 3-4 bright magic colors. Every pixel comes from this palette.\n\nCHARACTER\n- Build the wizard procedurally from filled rects and pixel runs, ~24x32 logical pixels: pointed hat with a bend, long beard, two-shade robe with darker outline, staff with a gem at the tip.\n- Parameterize the pose (staff angle, arm raise, head tilt, robe sway). Animate parameters smoothly, then quantize to the pixel grid each frame so motion reads at an 8-12 fps pixel animation feel even though the loop runs at 60fps.\n\nANIMATION\n- Looping state machine: IDLE (2-frame bob, beard sway) -> CHARGE (staff raises, gem flickers, sparks spiral inward) -> CAST (bright burst, projectile fires across the scene, 1-2 pixel screen shake) -> RECOVER (settle back). Ease pose parameters between keyframes.\n- Pooled allocation-free particle system: preallocate and reuse. Sparks orbit the gem during CHARGE, explode outward on CAST, each particle stepping its palette index from white to magic color to dark before despawn. Snap particle positions to the grid when drawing.\n- Fixed 60hz timestep update with rAF rendering. Zero object allocation inside the loop.\n\nSCENE\n- Minimal background: dark sky, a few twinkling 1px stars, moon, stone floor line. Character silhouette must read clearly.\n- Subtle 1px rim light on the wizard from the gem, brightening during CHARGE and CAST.\n\nQUALITY BAR\n- Crisp pixels at any window size, seamless loop, stable 60fps, readable silhouette. Should look like a polished 16-bit sprite animation, not vector shapes scaled down.",
    "promptPartial": false,
    "hasRemake": true,
    "sample": "pixel-wizard.html"
  },
  {
    "id": "mandelduck-768972",
    "titleZh": "曼德博交互探索",
    "blurbZh": "Three.js/GLSL 分形交互。",
    "category": "interactive",
    "categoryZh": "游戏互动",
    "author": "MandelDuck",
    "authorUrl": "https://x.com/MandelDuck",
    "postUrl": "https://x.com/MandelDuck/status/2103802923465768972",
    "skillryUrl": "https://skillry.dev/ai-videos/opus-5-5/mandelduck-768972",
    "posterUrl": "https://media.skillry.dev/opus-5-5/mandelduck-768972/original.4020d15134.webp",
    "techTags": [
      "threejs",
      "shader",
      "canvas"
    ],
    "prompt": "can you make a 3d game where you walk around and spot cats inside of a van gogh painting? we can start with stary night and its town",
    "promptPartial": false,
    "hasRemake": true,
    "sample": "pixel-wizard.html"
  },
  {
    "id": "0xchuckstock-879327",
    "titleZh": "可玩着色器小游戏",
    "blurbZh": "Three.js 着色器可玩小品。",
    "category": "interactive",
    "categoryZh": "游戏互动",
    "author": "0xChuckstock",
    "authorUrl": "https://x.com/0xChuckstock",
    "postUrl": "https://x.com/0xChuckstock/status/2103804606794879327",
    "skillryUrl": "https://skillry.dev/ai-videos/opus-5-5/0xchuckstock-879327",
    "posterUrl": "https://media.skillry.dev/opus-5-5/0xchuckstock-879327/original.155d8f360f.webp",
    "techTags": [
      "threejs",
      "shader",
      "playable"
    ],
    "prompt": "A 3D multiplayer game where the players are a squad of x-wings taking on a star destroyer. They pilot their ships to take out key components of the star destroyer while also dealing with guns mounted on the star destroyer and waves of tie fighters.",
    "promptPartial": false,
    "hasRemake": true,
    "sample": "pixel-wizard.html"
  },
  {
    "id": "gandamu-ml-220530",
    "titleZh": "机甲声效场景",
    "blurbZh": "三维机甲 + 音频反应。",
    "category": "interactive",
    "categoryZh": "游戏互动",
    "author": "gandamu_ml",
    "authorUrl": "https://x.com/gandamu_ml",
    "postUrl": "https://x.com/gandamu_ml/status/2102919394775220530",
    "skillryUrl": "https://skillry.dev/ai-videos/opus-5-5/gandamu-ml-220530",
    "posterUrl": "https://media.skillry.dev/opus-5-5/gandamu-ml-220530/original.16f5785d49.webp",
    "techTags": [
      "threejs",
      "shader",
      "canvas",
      "audio"
    ],
    "prompt": "I would like you to create a kickass, impressive 1990s style demoscene demo using this S3M track as the music. Prior to getting to work, please see how to best play and analyze the S3M track. This will be important since synchronization of effects and appropriateness of scenes to the musical vibe (and this song does have a variety of sections with different attitude) is essential to a great demoscene demo. Also prior to getting started, please research what kinds of effects, physics, etc. would be good to use in combination. Please use C/C++ -- with appropriate demoscene/embedded/console gamedev sensibilities to avoid needlessly bloating compile times -- with OpenGL. In some cases, blitting to surfaces in realtime may be appropriate.. while in others, using OpenGL or even shaders is appropriate as well. It should be planned and polished to be spectacular and shocking. This is Claude's way of really showing off to the world that it kicks ass.",
    "promptPartial": false,
    "hasRemake": true,
    "sample": "pixel-wizard.html"
  },
  {
    "id": "aisongman-461057",
    "titleZh": "像素可玩小品",
    "blurbZh": "Canvas 像素风小交互。",
    "category": "interactive",
    "categoryZh": "游戏互动",
    "author": "aisongman",
    "authorUrl": "https://x.com/aisongman",
    "postUrl": "https://x.com/aisongman/status/2103763192971461057",
    "skillryUrl": "https://skillry.dev/ai-videos/opus-5-5/aisongman-461057",
    "posterUrl": "https://media.skillry.dev/opus-5-5/aisongman-461057/original.b99a1a425c.webp",
    "techTags": [
      "canvas",
      "pixel",
      "playable"
    ],
    "prompt": "Create a 1-on-1 card game like Hearthstone.\nJust make it. As best you can.\nIn pixel art style.",
    "promptPartial": false,
    "hasRemake": true,
    "sample": "pixel-wizard.html"
  },
  {
    "id": "froessell-562325",
    "titleZh": "物理可玩沙盒",
    "blurbZh": "Three.js 物理交互沙盒。",
    "category": "interactive",
    "categoryZh": "游戏互动",
    "author": "froessell",
    "authorUrl": "https://x.com/froessell",
    "postUrl": "https://x.com/froessell/status/2103789415323562325",
    "skillryUrl": "https://skillry.dev/ai-videos/opus-5-5/froessell-562325",
    "posterUrl": "https://media.skillry.dev/opus-5-5/froessell-562325/original.eb54fc5e20.webp",
    "techTags": [
      "threejs",
      "canvas",
      "physics",
      "playable"
    ],
    "prompt": "PRD — Police Chase Arcade Game\n\nWorking title: Heatwave\nPlatform: iOS + Android\nEngine: Unity\nGenre: Top-down 3D arcade chase / survival\nOrientation: Portrait\nInput: One-thumb touch controls\nBusiness model: TBD — design MVP around gameplay first\nPrimary goal: Build a genuinely fun playable prototype before adding progression or monetization.\n⸻\nProduct vision\nA fast, chaotic mobile arcade game where the player is constantly being pursued by increasingly aggressive police.\nThe player cannot directly attack.\nInstead, they survive by driving aggressively, drifting around obstacles, making sudden turns and tricking pursuing police into crashing into obstacles and each other.\nThe fantasy is:\nYou’re not stronger than the police. You’re harder to catch.\n\nRuns should produce constant near-misses, chain collisions and moments where the player escapes a seemingly impossible situation.\n\nThink:\n\neasy controls + aggressive pursuit + physics chaos + escalating pressure.\n\n⸻\n\nCore gameplay loop\n\nSTART RUN\n↓\nDRIVE / DRIFT\n↓\nPOLICE PURSUE\n↓\nBAIT POLICE\n↓\nDODGE\n↓\nPOLICE CRASH\n↓\nGAIN SCORE\n↓\nWANTED LEVEL INCREASES\n↓\nMORE / HARDER POLICE\n↓\nSURVIVE\n↓\nEVENTUALLY GET CAUGHT\n↓\nSCORE / RESTART\n\nTarget run duration:\n\n2–5 minutes.\n\nRestart should take less than 2 seconds.\n\n⸻\n\nDesign principles\n\n3.1 One-thumb playable\n\nThe player should be able to understand the controls within seconds.\nNo accelerator.\nNo brake pedal.\nNo virtual steering wheel.\nThe vehicle moves automatically.\nThe player controls only direction.\n\n(I moved away from this after testing it the first time and added the onscreen joystick)\n\n3.2 Arcade physics, not simulation\nVehicles should:\ndrift\nslide\nbounce\nspin\ncollide dramatically\nrecover quickly\nFun takes priority over physical accuracy.\n\n3.3 Pursuers are weapons\nPolice are effectively the player’s offensive mechanic.\nThe player should learn:\n“If I turn here, that cop is going straight into that wall.”\n3.4 Chaos should remain readable\n\nEven with 10+ vehicles on screen, the player must immediately understand:\nwhere they are\nwhere they’re moving\n\nwhere police are coming from\n\nwhat can kill them\n\n3.5 Failure should feel fair\n\nDeath should generally result from a mistake the player understands rather than unpredictable physics.\n\n⸻\n\nMVP scope\n\nDo not build progression, upgrades, missions or monetization for the first milestone.\n\nThe first version contains:\n\n1 player vehicle\n\n1 arena\n\n1 police vehicle\n\n1 elite police variant\n\n5 wanted levels\n\nphysics collisions\n\nenvironmental obstacles\nscoring\nplayer health\npolice destruction\nbasic VFX\nbasic audio\n\ngame-over screen\n\ninstant restart\n\nThat’s enough to determine whether the game deserves further development.\n\n⸻\n\nPlayer vehicle\n\nMovement\n\nPlayer vehicle uses a Rigidbody-based arcade controller.\n\nDo not rely heavily on realistic WheelColliders.\nCore variables should be exposed in the Unity Inspector:\nAcceleration\nMaximum Speed\nTurn Speed\nTurn Curve\nLateral Grip\nDrift Factor\nVehicle Mass\nCollision Force\nDrag\nAngular Drag\nRecovery Speed\nThese need to be extremely easy to tune.\n\n⸻\n\nControls\n\nRecommended first implementation:\n\nDrag steering\n\nPlayer touches anywhere on the lower portion of the screen.\n\nDragging horizontally controls steering.\n\n← drag          turn left\n→ drag          turn right\nVehicle accelerates automatically.\nSteering should be relative rather than absolute.\nThe player should be able to lift their finger without immediately losing control.\nAlternative to prototype\nTest:\nHold left/right side of screen = steer left/right.\nDon’t commit until both have been tested on a physical phone.\n⸻\nDrift system\nDrifting should happen naturally when turning at speed.\nNo dedicated drift button.\nAt low speed:\nhigh traction\n\nAt high speed:\n\nreduced lateral traction\n\nThis produces controlled sliding.\n\nLong drifts can optionally award score.\n\nExample:\n\nDRIFT\n+120\nLONG DRIFT\n+340\n\nBut drift scoring is secondary to police destruction.\n\n⸻\nPolice AI\nPolice should feel:\naggressive, predictable and slightly stupid.\nThey should not simply follow the player’s current position.\nInstead, calculate an interception target based on player velocity.\nConceptually:\ntarget =\nplayerPosition\n+\nplayerVelocity * predictionTime\nPolice therefore try to cut the player off.\n⸻\nPolice intelligence\n\nPolice intentionally have limited obstacle avoidance.\n\nThis is important.\n\nPerfect navigation would make the game less fun.\n\nPolice should:\n\npursue aggressively\n\nattempt interception\n\navoid obvious static obstacles\n\npoorly account for other police\novershoot turns\n\ncollide with each other\n\noccasionally take dangerous routes\n\nThis creates opportunities for the player.\n\n⸻\n\nPolice destruction\n\nPolice can be destroyed by:\n\nhigh-speed obstacle collisions\n\nhitting another police vehicle\n\nchain collisions\n\nenvironmental hazards\n\nThe player does not have weapons.\n\nExample scoring:\n\nCOP SMASHED\n+250\nDOUBLE SMASH\n+600\nTRIPLE SMASH\n+1,000\nPILEUP!\n+2,000\n\nChain collisions should be heavily rewarded.\n\n⸻\n\nWanted system\n\nWanted level controls difficulty.\n\n★☆☆☆☆\n★★☆☆☆\n★★★☆☆\n★★★★☆\n★★★★★\n\nWanted level increases based primarily on survival time and score.\nLevel 1\n2 police.\nSlow and forgiving.\n\nLevel 2\n\n3–4 police.\n\nSlightly faster.\n\nLevel 3\n\n5–6 police.\n\nMore aggressive interception.\n\nLevel 4\n\n7–9 police.\n\nElite police introduced.\nLevel 5\nMaximum chaos.\n10+ police depending on device performance.\n\nElite units appear frequently.\n\nThe game should eventually become effectively impossible.\n\nThat’s intentional.\n\n⸻\n\nElite police\n\nThe MVP only needs one special police type.\n\nInterceptor\n\nVisually distinct vehicle.\nCharacteristics:\nfaster than standard police\nlower mass\naggressive prediction\nsharp steering\neasier to destroy in collisions\n\nThis creates a glass-cannon pursuer.\n\n⸻\n\nPlayer health\n\nUse a simple health bar.\n\nExample:\nHULL\n██████░░░░\nMinor impacts:\nsmall damage.\n\nHeavy impacts:\n\nlarge damage.\n\nExtremely high-speed impacts:\npotential instant destruction.\nPolice contact alone shouldn’t immediately kill the player.\nThis allows chaotic scrambles.\n⸻\nArena\nFirst arena should be compact.\nSomething roughly equivalent to:\n\nROCK\n\n┌─────────────┐\n│             │\n│   ROCK      │\n│             │\n│       ███   │\n│             │\n│ ROCK        │\n│         ROCK│\n└─────────────┘\n\nObstacles need enough space between them for high-speed movement.\n\nAvoid procedural generation initially.\n\nHand-design one good arena.\n⸻\nEnvironment\nFor the first visual theme, I’d use something other than water so we’re not cloning the reference too closely.\nMy preference:\n\nDesert outlaw chase\n\nPlayer is an outlaw escaping through a stylized desert environment.\n\nEnvironment contains:\n\nrock formations\n\ncacti\n\nbarriers\n\nabandoned vehicles\n\nramps\n\nfences\n\nsmall buildings\n\ndust\n\ndestructible props\n\nIt also fits the chunky visual language you’re already exploring with Bolt Pit.\n\n⸻\n\nCamera\n\nTop-down perspective camera.\n\nNot completely vertical.\n\nSomething approximately:\n\n55–70° downward angle.\n\nCamera follows player with smoothing.\n\nCamera should look slightly ahead in the player’s travel direction.\n\nAt high speed:\n\ncamera pulls back slightly.\n\nAt low speed:\n\ncamera moves closer.\n\n⸻\nCamera juice\nSmall camera effects make a large difference.\nLight collision\nTiny shake.\n\nHeavy collision\n\nStrong short shake.\n\nPolice destruction\n\nShake + tiny freeze frame.\n\nExample:\n\n50–100 ms hit stop.\nLarge pileup\n\nSlight zoom impulse + shake + particles.\n\nDon’t overdo continuous shaking.\n\n⸻\n\nVisual style\n\nChunky stylized 3D.\n\nCharacteristics:\n\nsimplified geometry\n\nexaggerated proportions\n\nbright readable vehicles\n\nsoft lighting\n\nminimal textures\n\nstrong silhouettes\n\nexaggerated particles\nAvoid realistic vehicle proportions.\nCars should feel almost toy-like.\n⸻\nVFX\nMinimum MVP effects:\nPlayer\ndust trail\ntire/skid marks\ndrift smoke\n\nimpact sparks\n\nPolice\n\nsiren lights\n\nsmoke when damaged\n\ndestruction explosion\n\ndebris\n\nEnvironment\n\ndust\n\ndestructible objects\n\nimpact particles\n\n⸻\nCollision feedback\nEvery significant collision should combine:\nphysics + particles + audio + camera response.\nMajor police destruction:\nIMPACT\n→ physics impulse\n→ vehicle fragments/debris\n→ sparks\n→ smoke\n→ camera shake\n→ hit stop\n→ sound\n→ score popup\nThis interaction is one of the game’s main sources of satisfaction.\n⸻\nScore system\n\nScore comes from:\n\nActionExample\nSurviving+10/sec\nPolice destroyed+250\nDriftvariable\nNear miss+100\nDouble collision+600\nTriple collision+1,000\nLarge pileup+2,000\n\nExact values should remain configurable.\n\n⸻\n\nNear misses\n\nOptional for MVP but potentially valuable.\n\nDetect when a police vehicle passes extremely close to the player at high relative velocity.\n\nDisplay:\n\nCLOSE CALL! +100\n\nThis rewards risky driving.\n\n⸻\n\nUI\n\nDuring gameplay keep UI extremely minimal.\n\nSCORE                          COINS\n13,590                          14\n★★★☆☆\nWANTED\nGAME\nHULL\n████████░░\n\nNo minimap initially.\n\nOff-screen police can use subtle edge indicators.\n\n⸻\n\nGame over\n\nWhen hull reaches zero:\n\nbrief slow motion.\n\nPlayer crashes.\n\nThen:\n\nBUSTED\nSCORE\n24,850\nBEST\n31,220\n[ AGAIN ]\n\nTapping anywhere could restart.\n\nAvoid unnecessary menus between runs.\n\n⸻\n\nAudio\n\nThe soundscape should sell speed and collisions.\n\nRequired:\n\nengine\n\ntire squeal\n\npolice sirens\nimpact\nmetal crunch\ndebris\ndestruction\nUI score sounds\nwanted level increase\n\nSirens should become increasingly chaotic as wanted level increases.\n\n⸻\n\nTechnical architecture\n\nSuggested Unity structure:\n\nGameManager\nPlayer\n├── PlayerController\n├── VehiclePhysics\n├── PlayerHealth\n└── PlayerEffects\nPolice\n├── PoliceController\n├── PoliceAI\n├── VehiclePhysics\n├── PoliceHealth\n└── PoliceEffects\nSystems\n├── SpawnManager\n├── WantedManager\n├── ScoreManager\n├── AudioManager\n├── CameraManager\n└── PoolManager\nUI\n├── HUD\n├── WantedUI\n├── ScoreUI\n├── HealthUI\n└── GameOverUI\n\nAvoid building an elaborate framework.\n\n⸻\nObject pooling\nPolice, particles and debris should use object pooling.\nAvoid frequent:\n\nInstantiate()\nDestroy()\n\nduring gameplay.\nMobile performance should be considered from the beginning.\n⸻\nPerformance target\n\nTarget:\n\n60 FPS\non a mid-range modern iPhone/Android device.\nInitial limits:\n\n~12 active vehicles\n\n~100 simple debris/particles\n\nsimple shadows\n\nlimited real-time lights\n\nPerformance should be tested on device early.\n\n⸻\nDevelopment milestones\nMilestone 1 — Greybox driving\nBuild:\nempty arena\ncube player\ntouch steering\nacceleration\ndrifting\n\ncamera\n\nSuccess criterion:\n\nDriving around an empty arena feels satisfying.\n\nDo not continue until it does.\n\n⸻\nMilestone 2 — The chase\nAdd:\none police vehicle\npursuit AI\ninterception\ncollisions\nSuccess criterion:\n\nDodging one police car is entertaining.\n\n⸻\n\nMilestone 3 — Emergent chaos\n\nAdd:\n\nmultiple police\n\npolice-police collisions\n\nobstacles\n\ndestruction\n\nscoring\n\nSuccess criterion:\n\nPlayer can intentionally cause:\n\npolice → police\nand\npolice → environment\ncollisions.\nThis is the critical milestone.\n⸻\nMilestone 4 — Escalation\n\nAdd:\n\nwanted levels\n\nspawning\n\ndifficulty scaling\n\ninterceptor\n\nNow a run has an arc:\n\ncalm\n↓\npressure\n↓\nchaos\n↓\npanic\n↓\ndeath\n\n⸻\n\nMilestone 5 — Juice\nAdd:\nparticles\ncamera shake\nhit stop\nskid marks\n\ndust\n\nsirens\n\ncollision sounds\n\nscore popups\n\n⸻\n\nMilestone 6 — Mobile build\n\nBuild for real devices.\nTest:\ncontrols\nperformance\nreadability\nbattery/thermal behaviour\ndifferent screen ratios\n⸻\nMilestone 7 — Decide whether to continue\n\nAt this point, stop development temporarily.\n\nDon’t immediately build a garage and 37 unlockable cars.\n\nPut the build in front of people.\n\nThe important questions are:\n\nDo people immediately understand it?\nDo they restart after dying?\nDo they intentionally try to make cops crash?\nDoes “one more run” happen naturally?\nIf not, work on the core loop rather than adding content.\n⸻\nPhase 2 — only after validation\nIf the prototype works, then expand into:\nCars\n↓\nCoins\n↓\nUnlocks\n↓\nChallenges\n↓\nNew arenas\n↓\nSpecial police\n↓\nUpgrades\n↓\nDaily challenges\n↓\nLeaderboards\nPotential environments:\ndesert\ncity\ndocks\nsnow\nindustrial yard\nairport\nconstruction site\nmilitary base\nAnd then there’s room for ridiculous police units: SUVs, armored vans, helicopters dropping roadblocks, etc.\n\nI have opened a @[Unity CLI installation] project which we can work in. The art style of the game should be fun and cartoony and the action also over the top.\nI have imported the Topdown engine into the project as well that we can use:\nhttps://topdown-engine.moremountains.com/\n\nI want the game to be optimized for mobile, but should work on desktop while testing.",
    "promptPartial": false,
    "hasRemake": true,
    "sample": "pixel-wizard.html"
  }
] as CatalogEntry[];
