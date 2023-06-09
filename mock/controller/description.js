const tips = {
  1: '我们活着不能与草木同腐，不能醉生梦死，枉度人生，要有所作为！——方志敏',
  2: '路漫漫其修远兮，吾将上下而求索。——屈原',
  3: '一个能思想的人，才真是一个力量无边的人。——巴尔扎克',
  4: '穷则独善其身，达则兼济天下。——孟子',
  5: '生气的时候，开口前先数到十，如果非常愤怒，先数到一百。——杰弗逊',
  6: '不知道并不可怕和有害。任何人都不可能什么都知道，可怕的和有害的是不知道而伪装知道。——托尔斯泰',
  7: '君子之交淡若水，小人之交甘若醴，君子淡以亲，小人甘以绝。——庄子',
  8: '今天所做之事勿候明天，自己所做之事勿候他人。——歌德',
  9: '真正的幸福只有当你真实地认识到人生的价值时，才能体会到。——穆尼尔·纳素夫',
  10: '物竞天择，适者生存。——赫胥黎',
  11: '最聪明的人是最不愿浪费时间的人。——但丁',
  12: '几个苍蝇咬几口，决不能羁留一匹英勇的奔马。——伏尔泰',
  13: '社会犹如一条船，每个人都要有掌舵的准备。——易卜生',
  14: '人生自古谁无死，留取丹心照汗青。——文天祥',
  15: '空谈之类，是谈不久，也谈不出什麽来的，它始终被事实的镜子照出原形，拖出尾巴而去。——鲁迅',
  16: '在行进时，也时时有人退伍，有人落荒，有人颓唐，有人叛变，然而只要无碍于进行，则越到后来，这队伍也就越成为纯粹、精锐的队伍了。——鲁迅',
  17: '酒杯里竟能蹦出友谊来。——盖伊',
  18: '天下兴亡，匹夫有责。——顾炎武',
  19: '对别人的意见要表示尊重。千万别说：＂你错了。＂——卡耐基',
  20: '读书是易事，思索是难事，但两者缺一，便全无用处。——富兰克林',
  21: '君子爱财，取之有道。——孔子',
  22: '宁要好梨一个，不要烂梨一筐。积极肯干和忠心耿耿的人即使只有两三个，也比十个朝气沉沉的人强。——列宁',
  23: '应当在朋友正是困难的时候给予帮助，不可在事情无望之后再说闲话。——伊索',
  24: '我们是国家的主人，应该处处为国家着想。——雷锋',
  25: '有真道德，必生真胆量。凡怕天怕地怕人怕鬼的人，必是心中有鬼，必是品行不端。——宣永光',
  26: '砍头不要紧，只要主义真。杀了夏明翰，还有后来人。——夏明翰',
  27: '一个人追求的目标越高，他的才力就发展得越快，对社会就越有益。——高尔基',
  28: '书籍是造就灵魂的工具。——雨果',
  29: '不要对一切人都以不信任的眼光看待，但要谨慎而坚定。——德谟克里特',
  30: '生活中唯一乐趣就是忘却。——托尔斯泰',
  31: '爱情只有当它是自由自在时，才会叶茂花繁。认为爱情是某种义务的思想只能置爱情于死地。只消一句话：你应当爱某个人，就足以使你对这个人恨之入骨。——罗素',
  32: '奢侈是舒适的，否则就不是奢侈。——CocoChanel',
  33: '哀其不幸，怒其不争。——鲁迅',
  34: '路遥知马力，日久见人心。——《元曲选·争报恩》',
  35: '读一本好书，就是和许多高尚的人谈话。——歌德',
  36: '信仰，是人们所必须的。什麽也不信的人不会有幸福。——雨果',
  37: '先相信自己，然后别人才会相信你。——罗曼·罗兰',
  38: '敌人只能砍下我们的头颅，决不能动摇我们的信仰！因为我们信仰的主义，仍是宇宙的真理！——方志敏',
  39: '如果说我比别人看得要远一点，那是因为我站在巨人的肩上。——牛顿',
  40: '古之立大事者，不惟有超世之才，亦必有坚忍不拔之志。——苏轼',
  41: '人的全部本领无非是耐心和时间的混合物。——巴尔扎克',
  42: '发明家全靠一股了不起的信心支持，才有勇气在不可知的天地中前进。——巴而扎克',
  43: '人生是没有毕业的学校。——黎凯',
  44: '一个人应养成信赖自己的习惯，即使在最危急的时候，也要相信自己的勇敢与毅力。——拿破仑',
  45: '书不仅是生活，而且是现在、过去和未来文化生活的源泉。——库法耶夫',
  46: '决定一个人的一生，以及整个命运的，只是一瞬之间。——歌德',
  47: '成功＝艰苦的劳动＋正确的方法＋少谈空话。——爱因斯坦',
  48: '走自己的路，让别人说去！——但丁',
  49: '清晨的阳光不算温暖，瞬息的安逸不算幸福。(蒙古谚语)',
  50: '始吾于人也，听其言而信其行。今吾于人也，听其言而观其行。——孔丘',
  51: '勇于求知的人决不至于空闲无事。——孟德斯鸠',
  52: '最可怕的敌人，就是没有坚强的信念。——罗曼·罗兰',
  53: '天才免不了有障碍，因为障碍会创造天才。——罗曼·罗兰',
  54: '横眉冷对千夫指，俯首甘为孺子牛。——鲁迅',
  55: '个人的智慧只是有限的。——普劳图斯',
  56: 'ß失败乃成功之母。——牛顿',
  57: '土地是以它的肥沃和收获而被估价的；才能也是土地，不过它生产的不是粮食，而是真理。如果只能滋生瞑想和幻想的话，即使再大的才能也只是砂地或盐池，那上面连小草也长不出来的。——别林斯基',
  58: '卓越的人一大优点是：在不利与艰难的遭遇里百折不饶。——贝多芬',
  59: '事业常成于坚忍，毁于急躁。——萨迪',
  60: '要散布阳光到别人心里，先得自己心里有阳光。——罗曼·罗兰',
  61: '要成就一件大事业，必须从小事做起。——列宁',
  62: '思想家是主动的，梦幻家是被动的。——雨果《海上劳工》',
  63: '坚强的信心，能使平凡的人做出惊人的事业。——马尔顿',
  64: '无知是迷信之母。——巴尔扎克',
  65: '科学是到处为家的，不过，在任何不播种的地方，是决不会得到丰收的。——赫尔岑',
  66: '谁若想在困厄时得到援助，就应在平日待人以宽。——萨迪',
  67: '劳动一日，可得一夜的安眠；勤劳一生，可得幸福的长眠。——达·芬奇',
  68: '问渠哪得清如许，为有源头活水来。——朱熹',
  69: '既然我已经踏上这条道路，那么，任何东西都不应妨碍我沿着这条路走下去。——康德',
  70: '读过一本好书，像交了一个益友。——臧克家',
  71: '信念是由一种愿望产生的，因为愿意相信才会相信，希望相信才会相信，有一种利益所在才会相信。——斯特林堡',
  72: '尺有所短；寸有所长。物有所不足；智有所不明。——屈原《卜居》',
  73: '信仰是伟大的情感，一种创造力量。——高尔基',
  74: '对一个尚未成熟的少年来讲，坏的伙伴比好的老师起的作用要大得多。——伊索',
  75: '我们现在必须完全保持党的纪律，否则一切都会陷入污泥中。——马克思',
  76: '如果有一天，我能够对我们的公共利益有所贡献，我就会认为自己是世界上最幸福的人了。——果戈理',
  77: '利用时间是一个极其高级的规律。——恩格斯',
  78: '未来是光明而美丽的，爱它吧，向它突进，为它工作，迎接它，尽可能地使它成为现实吧！——车尔尼雪夫斯基',
  79: '愿每次回忆，对生活都不感到负疚。——郭小川',
  80: '时间是我的财产，我的田亩是时间。——歌德',
  81: '学问是异常珍贵的东西，从任何源泉吸收都不可耻。——阿卜·日·法拉兹',
  82: '过去一切时代的精华尽在书中。——卡莱尔',
  83: '取得成就时坚持不懈，要比遭到失败时顽强不屈更重要。——拉罗什夫科',
  84: '不参加变革社会的斗争，理想永远是一种幻影。——吴运铎',
  85: '哪里有天才，我是把别人喝咖啡的工夫都用在工作上了。——鲁迅',
  86: '读一切好的书，就是和许多高尚的人说话。——笛卡尔',
  87: '你有信仰就年轻，疑惑就年老；有自信就年轻，畏惧就年老；有希望就年轻，绝望就年老；岁月使你皮肤起皱，但是失去了热忱，就损伤了灵魂。——卡耐基',
  88: '熟读唐诗三百首，不会作诗也会吟。——孙洙',
  89: '谁若游戏人生，他就一事无成；谁不主宰自己，永远是一个奴隶。——歌德',
  90: '岂能尽如人意，但求无愧我心！——林则徐',
  91: '美是到处都有的，对于我们的眼睛，不是缺少美，而是缺少发现。——罗丹',
  92: '人生最终的价值在于觉醒和思考的能力，而不只在于生存。——亚里士多德',
  93: '当你幸福的时候，切勿丧失使你成为幸福的德行。——莫罗阿',
  94: '生活的理想，就是为了理想的生活。——张闻天',
  95: '旧书不厌百回读，熟读精思子自知。——苏轼',
  96: '不经巨大的困难，不会有伟大的事业。——伏尔泰',
  97: '人生并不像火车要通过每个站似的经过每一个生活阶段。人生总是直向前行走，从不留下什么。——刘易斯',
  98: '认识了生活的全部意义的人，才不会随便死去，哪怕只有一点机会，就不会放弃生活。——海涅',
  99: '少而好学，如日出之阳；壮而好学，如日中之光；志而好学，如炳烛之光。——刘向',
  100: '伟大的思想能变成巨大的财富。——塞内加',
}

export default [
  {
    url: '/description/getList',
    type: 'get',
    response: (config) => {
      const { index } = config.query
      const data = {
        description: tips[index],
      }
      return {
        code: 200,
        msg: 'success',
        data: { ...data },
      }
    },
  },
]
