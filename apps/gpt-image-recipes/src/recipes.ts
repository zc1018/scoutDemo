// 12 张配方卡的提示词均摘自卡兹克《我整理了GPT-Image 2.5的12种玩法，希望能承包你的整个假期朋友圈。》
// 原帖：https://x.com/Khazix0918/status/2104401048324743646
// 原文中的具体名词（城市、物体、单词等）被替换成 {参数}，默认值即原文用词。

export type Param = { key: string; label: string; default: string };
export type Recipe = {
  id: string; no: number; group: string; title: string; hint: string;
  refs: string; // 需要上传什么参考图
  template: string; params: Param[];
  hue: number; // 示例图配色
};

export const SOURCE_URL = "https://x.com/Khazix0918/status/2104401048324743646";

export const recipes: Recipe[] = [
  { id: "remove-tourists", no: 1, group: "拯救废片", title: "消除背景游客", hue: 200,
    hint: "背景人多杂乱时，只去掉人和杂物，其他不动。", refs: "1 张需要清理背景的照片",
    template: "保持图片画面完全不变，仅将背景中的{要去掉的东西}去掉。",
    params: [{ key: "要去掉的东西", label: "要去掉的东西", default: "其他人和杂物" }] },
  { id: "relight", no: 2, group: "拯救废片", title: "自动调光", hue: 35,
    hint: "曝光过度/欠曝，让模型以摄影师身份调光、调色、提清晰度。", refs: "1 张光线不好的照片",
    template: "这张照片{问题}，请以一个专业摄影师的身份，为这张图调一下光线、色彩和清晰度",
    params: [{ key: "问题", label: "照片的问题", default: "背景曝光太严重了" }] },
  { id: "beauty", no: 3, group: "拯救废片", title: "专业美颜", hue: 330,
    hint: "按本人脸型做自然修饰，保留辨识度。", refs: "1 张人像照片",
    template: "根据照片中人物的实际脸型、五官与气质，进行有针对性的美容美学优化，并直接呈现自然修饰后的效果：调整适合本人的发型、分缝与蓬松度，整理眉形，适度提亮眼下、均匀肤色、淡化痘印，改善唇部状态，必要时加入轻淡自然的妆容，让整体更协调、有精神。除此之外的一切全部不变",
    params: [] },
  { id: "polaroid-figure", no: 4, group: "创意出片", title: "拍立得 3D 公仔打卡", hue: 280,
    hint: "人物变 Q 版黏土公仔，从手持拍立得里探出来。", refs: "1 张人物 + 景点合照",
    template: "根据图一，将照片中的人物转化为整体约{身高比例}身高比例的3DQ版黏土风格角色公仔，公仔呈现全身，整体放置于一张拍立得照片中，并由一只手持握着拍立得相纸。画面呈现出人物从拍立得照片中突破边框、延伸进入现实世界的效果。并且背景与原图一致，延续拍立得中的背景，以Q版风格绘制，不需再有人物出现，仅作为角色背景的延伸，与照片原始场景一致",
    params: [{ key: "身高比例", label: "头身比", default: "1:4" }] },
  { id: "postcard", no: 5, group: "创意出片", title: "景点明信片", hue: 25,
    hint: "景点照转复古手账风水彩明信片。", refs: "1 张景点照片",
    template: "将照片设计成复古旅行手账风明信片：保留原图主体与视角，转绘为清透的水彩插画，带自然晕染、纸张颗粒和不规则笔触边缘，柔和融入暖米白纸面。采用横版布局，右侧约60%区域放插画，插画略微收小，四周留出更宽的纸面，上下边缘保持呼吸感，笔触不要延伸至画布边缘。左侧疏朗排版：小编号、简短英文主题标题、LOCATION与DATE标签及空白横线，底部放三枚从照片提取的手绘色块。标题用复古衬线字体，整体清新、舒展、有旅行收藏感。只输出明信片设计平面图，去除原图水印与界面元素。",
    params: [] },
  { id: "sticker-subject", no: 6, group: "创意出片", title: "画面主体转贴纸", hue: 140,
    hint: "只把核心建筑重绘成带白边的手绘贴纸，周围保持照片。", refs: "1 张有核心主体的照片",
    template: "将照片中间「{主体}」，重绘成手绘旅行贴纸。只处理这一处，保留其轮廓、比例与标志性细节，使用粗黑手绘线条、明快平涂色块和少量复古印刷纹理，沿外轮廓添加连续的宽白色模切边。贴纸原位覆盖建筑，略微放大，避免原边缘外露。周围的一切则保持原照片效果，不添加文字，不将整张图插画化。",
    params: [{ key: "主体", label: "要转贴纸的主体", default: "最具辨识度的一座核心建筑" }] },
  { id: "suitcase", no: 7, group: "创意出片", title: "旅游碎片行李箱", hue: 15,
    hint: "多张旅行照提取主体做成水彩贴纸，贴满行李箱内衬。", refs: "图一为空行李箱展开图，其后为旅行照片（原文用了 11 张）",
    template: "以图一空行李箱为底图，提取图2至图{末图序号}这{照片张数}张照片中的代表性建筑、风景、美食等主体，保留辨识度，转绘成带白边水彩旅行贴纸，最后将这{照片张数}张贴纸大小错落地贴在行李箱上下两面的内衬上，重点主体放大，其余元素自然穿插，排列紧凑但保留适当间隙。贴纸不越出内衬或跨过铰链。呈现真实纸质贴纸的平面拼贴效果，不直接粘贴矩形照片，不变成立体模型。",
    params: [{ key: "末图序号", label: "最后一张图的序号", default: "12" }, { key: "照片张数", label: "旅行照片张数", default: "11" }] },
  { id: "travel-poster", no: 8, group: "创意出片", title: "人物旅游海报", hue: 190,
    hint: "一张自拍 + 城市名，生成复古旅行拼贴海报。", refs: "1 张自拍",
    template: "以参考照片中的人物为主角，创作「{城市}」主题的复古旅行拼贴海报，保留五官辨识度与自然神态。用醒目的「{英文标题}」复古粗体标题，搭配城市地标、街景、美食、地图、票据和邮戳，结合撕纸边缘、印刷颗粒与少量手写短句，构图丰富、层次清晰。以中性米白纸底搭配自然蓝绿与砖红，略微减少黄调，保留复古质感，避免整体泛黄，肤色自然。",
    params: [{ key: "城市", label: "城市", default: "广州" }, { key: "英文标题", label: "英文标题", default: "GUANGZHOU" }] },
  { id: "concert", no: 9, group: "网感大片", title: "演唱会氛围感照片", hue: 300,
    hint: "到此一游照 + 现场氛围图，合成背影大片。", refs: "图一为你的现场照，图二为有彩带的现场氛围图",
    template: "在图一场景下，图一中的人物背对广角镜头，人物的位置偏向画面左边，右手拿着{应援物}怼在镜头前并放大，低视角拍摄，人物不留侧脸。画面中的人物长发飘逸，要有风吹动的感觉，发丝间微发光，稍微仰视的拍摄角度，注意整体姿态有美感且协调，并且背景中要有图二的演出会彩带飘落，营造氛围感场景，让整体的光影结构和谐。",
    params: [{ key: "应援物", label: "手里的应援物", default: "爱心形状的应援棒" }] },
  { id: "food-splash", no: 10, group: "网感大片", title: "美食炸弹", hue: 45,
    hint: "手持怼镜头的食物/饮品，做成高速摄影飞溅瞬间。", refs: "1 张手持食物或饮品的照片",
    template: "保持图片完全不变，仅以人物手持怼在镜头前的食物或饮品为中心，制造超写实的腾空飞溅瞬间。根据原有内容自然表现：固体翻腾散开，液体形成舒展的飞溅弧面与细小液滴，配料随之悬浮。动势从容器内部向上、向外并朝镜头展开，突出近大远小的透视与扑面而来的冲击感。保持容器完整，不添加无关食材，不遮挡人物面部。材质、光线与阴影融入原照片，呈现高速摄影定格般的清晰细节与广告质感，避免卡通感。",
    params: [] },
  { id: "word-doodle", no: 11, group: "网感大片", title: "指定物体转文字涂鸦", hue: 170,
    hint: "把指定物体换成由英文单词构成的手绘文字涂鸦。原文例子是两个物体，这里简化为一个。", refs: "1 张有明确物体的照片",
    template: "只修改图中「{物体}」，将这个「{物体}」变成由「{单词}」这个英文单词构成的彩色（用一种颜色：{颜色}）手绘文字涂鸦，并且这些文字涂鸦要有质感一些。文字自上而下排列，笔画大胆拉伸、弯曲、嵌合。采用圆润粗笔画、略带抖动的白色描线对整体以及一些空缺的地方进行勾勒补充，文字与描线之间保持透明镂空，除了文字以外，不得出现其他带颜色的色块笔画。让文字本身配合白色手绘描线构成「{物体}」，而不是在{物体}上贴字，整体呈现ins风。",
    params: [{ key: "物体", label: "要改的物体", default: "椅子" }, { key: "单词", label: "英文单词", default: "Chair" }, { key: "颜色", label: "文字颜色", default: "白色" }] },
  { id: "ins-annotate", no: 12, group: "网感大片", title: "ins 风画面注释", hue: 220,
    hint: "在照片空白处加白色手写标题和小涂鸦。", refs: "1 张生活照",
    template: "为照片添加ins风手绘涂鸦排版，保留原照片内容、构图与真实质感。根据画面内容，在空白处添加醒目的白色手写标题和一句简短俏皮的文案，笔画圆润、略带不规则感。搭配少量手绘箭头、星星、闪光、弧线与呼应主题的小图案，以白色为主、其他颜色做点缀。文字与涂鸦自然穿插，活泼随性、疏朗有留白，像亲手记录的生活照片。避开人物面部与重要主体，不堆满装饰，不将照片转成插画，不添加水印。",
    params: [] },
];

export function fill(r: Recipe, values: Record<string, string>) {
  return r.template.replace(/\{([^}]+)\}/g, (_, k) => values[k] ?? r.params.find((p) => p.key === k)?.default ?? k);
}

// 离线示例图：程序生成的 SVG，明确标注"示例图"，不是模型真实输出。
export function sampleImage(r: Recipe, kind: "before" | "after") {
  const h = r.hue;
  const before = kind === "before";
  const sky = before ? `hsl(${h},15%,72%)` : `hsl(${h},70%,62%)`;
  const ground = before ? `hsl(${h},10%,45%)` : `hsl(${(h + 40) % 360},55%,42%)`;
  const extras = before
    ? Array.from({ length: 6 }, (_, i) => `<rect x="${40 + i * 55}" y="${250 - (i % 3) * 8}" width="14" height="40" rx="6" fill="#555" opacity=".7"/>`).join("")
    : `<circle cx="300" cy="80" r="34" fill="hsl(${(h + 180) % 360},80%,75%)"/><path d="M60 120 l10 -20 l10 20 l-20 -12 h20z" fill="#fff"/>`;
  const label = before ? "示例 · 参考图" : "示例 · 生成效果（非真实输出）";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
<rect width="400" height="400" fill="${sky}"/><rect y="270" width="400" height="130" fill="${ground}"/>
<polygon points="150,270 200,140 250,270" fill="hsl(${h},${before ? 10 : 45}%,${before ? 35 : 30}%)"/>
<rect x="170" y="200" width="60" height="70" fill="hsl(${h},${before ? 8 : 60}%,${before ? 55 : 80}%)"/>
${extras}
<rect x="0" y="0" width="400" height="36" fill="rgba(0,0,0,.55)"/>
<text x="12" y="24" font-size="16" fill="#fff" font-family="sans-serif">${label}</text>
<text x="200" y="380" font-size="20" text-anchor="middle" fill="#fff" font-family="sans-serif">${r.no}. ${r.title}</text>
</svg>`;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}
