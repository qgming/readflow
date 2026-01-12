# ReadFlow (流畅阅读) 📚

ReadFlow 是一款基于 React Native 和 Expo 构建的综合性英语阅读学习应用。它将 RSS 订阅阅读、智能翻译、词典查询和语音朗读功能融为一体，为非英语母语者打造沉浸式的语言学习体验。✨

## ✨ 功能特性

### 📰 RSS 订阅阅读

- 聚合全球优质英文新闻源内容，包括：
  - **Longreads** - 深度长文阅读平台
  - **TIME** - 美国时代周刊，提供全球突发新闻、深度分析和独家报道
  - **ZeroHedge** - 金融市场和经济新闻
  - **中国日报** - 中国国家级英文日报，向世界传播中国声音和国际新闻
  - **Vice** - 全球青年文化媒体公司，关注前沿文化、社会议题和生活方式
  - **BBC News** - 英国广播公司，全球领先的公共服务广播机构
  - **Business Insider** - 商业内幕，快速增长的商业新闻网站，聚焦科技与商业资讯
  - **BBC Technology** - BBC 科技频道
  - **BBC World** - BBC 世界新闻
  - **南方周末** - 广州综合性新闻周报，以深度调查报道和人文关怀著称
- 简洁易读的文章排版
- 书签系统，方便保存文章

### 🌐 智能翻译

- **双翻译引擎**：支持 Google 翻译和 Bing 翻译
- **段落级翻译**：按段落翻译文章，提供更好的上下文理解
- **多语言支持**：支持 24+ 种语言，包括中文、英文、法语、德语、日语、韩语、西班牙语等
- **翻译显隐切换**：阅读时可随时显示或隐藏翻译内容
- **持久化存储**：翻译内容本地保存，支持离线访问

### 📖 词典与单词查询

- **ECDICT 集成**：集成全面的离线英汉词典数据库
- **交互式单词选择**：点击任意单词即可查看详细信息
- **丰富的单词数据**：
  - 🔊 音标（美式/英式发音）
  - 📝 释义和翻译
  - 🔄 词形变化（复数、过去式等）
  - 📊 词频数据
  - 🎓 考试信息（四六级、托福、雅思、GRE）
  - ⭐ 柯林斯星级和牛津 3000 词标识

### 🔊 语音朗读（TTS）

- **多种语音选项**：英文和中文神经网络语音
  - 🇺🇸 英文：Jenny、Aria、Sara、Guy、Davis、Tony
  - 🇨🇳 中文：晓晓、晓伊、云扬等
- **可调节语速**：根据个人喜好自定义播放速度
- **自动播放选项**：查词时自动朗读单词发音
- **高质量音频**：使用神经网络 TTS 技术，发音自然流畅

### 💡 阅读体验

- **单词分割**：自动识别并高亮可点击的单词
- **简洁排版**：基于段落的布局，阅读舒适
- **阅读统计**：显示文章字数
- **深色/浅色主题**：根据系统设置自动切换主题 🌓

## 🛠️ 技术栈

### 核心框架

- React Native 0.81.5
- Expo SDK 54
- TypeScript
- Expo Router（基于文件的路由）

### 状态管理与存储

- Zustand（状态管理）
- Expo SQLite（本地数据库）
- AsyncStorage（用户偏好设置）

### UI 与交互

- Lucide React Native（图标库）
- React Native Reanimated（动画）
- React Native Gesture Handler（手势交互）
- React Native Render HTML（内容渲染）

### 其他工具

- Fast XML Parser（RSS 订阅解析）
- Expo Audio（语音播放）
- Expo Haptics（触觉反馈）

## 🚀 快速开始

### 环境要求

- Node.js（v18 或更高版本）
- npm 或 yarn
- Expo CLI
- iOS 模拟器（用于 iOS 开发）或 Android 模拟器（用于 Android 开发）

### 安装步骤

1. 克隆仓库

   ```bash
   git clone <repository-url>
   cd readflow
   ```

2. 安装依赖

   ```bash
   npm install
   ```

3. 启动开发服务器

   ```bash
   npx expo start
   ```

4. 在目标平台运行
   - 按 `i` 键在 iOS 模拟器中运行
   - 按 `a` 键在 Android 模拟器中运行
   - 使用 Expo Go 应用扫描二维码在真机上运行

## 📁 项目结构

```
readflow/
├── app/                    # 主应用页面（Expo Router）
│   ├── (tabs)/            # 底部导航页面
│   │   ├── index.tsx      # 首页（书签）
│   │   ├── words.tsx      # 单词/词汇
│   │   ├── library.tsx    # RSS 订阅源
│   │   └── my.tsx         # 设置
│   ├── article-read.tsx   # 文章阅读视图
│   ├── article-detail.tsx # 文章预览
│   └── book-detail.tsx    # RSS 源详情
├── components/            # 可复用 UI 组件
├── constants/             # 应用常量和配置
├── contexts/              # React 上下文（主题等）
├── hooks/                 # 自定义 React Hooks
├── services/              # 业务逻辑服务
│   ├── translation/       # 翻译引擎
│   ├── rss/              # RSS 订阅处理
│   ├── ecdict/           # 词典服务
│   └── speech/           # 语音朗读
├── stores/               # Zustand 状态存储
├── types/                # TypeScript 类型定义
└── utils/                # 工具函数
```

## 📜 可用脚本

- `npm start` - 启动 Expo 开发服务器
- `npm run android` - 在 Android 模拟器中运行
- `npm run ios` - 在 iOS 模拟器中运行
- `npm run web` - 在浏览器中运行
- `npm run lint` - 运行 ESLint

## ⚙️ 配置说明

### 翻译设置

进入 **我的 > 翻译偏好** 可以：

- 选择翻译引擎（Google 或 Bing）
- 选择目标语言
- 配置翻译行为

### 语音朗读设置

进入 **我的 > 朗读偏好** 可以：

- 选择语音（英文或中文）
- 调整语速
- 启用/禁用自动播放

## 💾 数据库

应用使用 SQLite 进行本地数据存储：

- **书签表**：保存文章及其翻译内容
- **ECDICT 数据库**：全面的英汉词典数据库

## 🤝 贡献指南

欢迎贡献代码！请随时提交 Pull Request。

## 🙏 致谢

- [ECDICT](https://github.com/skywind3000/ECDICT) - 免费的英汉词典数据库
- [Expo](https://expo.dev) - React Native 开发平台
- 翻译服务由 Google 翻译和 Bing 翻译 API 提供
