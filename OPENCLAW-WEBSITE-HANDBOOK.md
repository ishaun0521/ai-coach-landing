# CAIO Website Handbook for OpenClaw Agents

這份文件是寫給 **OpenClaw / AI agents** 看的。
目標：讓任何接手 `caio.com.tw` 網站的人，都能快速理解這個 repo 的結構、內容定位，以及**如何安全修改網站、加入新文章、修改自己的自我介紹區塊**。

---

## 1. Site identity

- **網站名稱**：CAIO（你的首席 AI 長）
- **正式網址**：`https://caio.com.tw/`
- **GitHub repo**：`https://github.com/ishaun0521/ai-coach-landing`
- **網站型態**：純靜態網站（HTML 為主）
- **預設發布方式**：GitHub repo / GitHub Pages
- **聯絡信箱**：`aicoach@caio.com.tw`

### 核心定位
CAIO 不是在賣抽象的 AI 口號，而是主打：

1. **AI 教練**
2. **OpenClaw 建置**
3. **AI Agent 代管 / 維運**
4. **以內容與觀點建立信任**

### 內容語氣
- 使用繁體中文（`zh-Hant-TW`）
- 語氣要專業、清楚、可信
- 不要寫得像廉價 SEO 農場文
- 不要過度誇大 AI 能力
- 強調「賦能、落地、工作流、持續能力」

---

## 2. Repo structure

目前主要結構如下：

```text
/
├─ index.html                       # 首頁
├─ blog/
│  ├─ index.html                    # Blog 列表頁
│  ├─ ai-agent-vs-ai-tool.html      # 文章頁
│  ├─ ai-coach-vs-consultant.html   # 文章頁
│  └─ ai-cognitive-boundary.html    # 文章頁
├─ services/
│  ├─ ai-coach.html                 # 服務頁：AI 教練
│  ├─ openclaw-setup.html           # 服務頁：OpenClaw 建置
│  └─ agent-managed-service.html    # 服務頁：AI Agent 代管
├─ use-cases/
│  └─ solopreneur-ai-agent.html     # 使用情境頁
├─ images/
│  └─ team/
│     ├─ shaun.jpg
│     └─ eagle.jpg
├─ CNAME
├─ sitemap.xml
├─ robots.txt
└─ MEASUREMENT-PLAN.md
```

### 關鍵理解
這個網站目前**沒有複雜 framework / build step**，大多數內容就是直接改 HTML。

所以 agent 在修改時要注意：
- 直接改檔即可
- 改完要自己檢查站內連結
- 改完要同步更新首頁 / blog index / 文章互相連結
- 不要只新增文章頁卻忘了把入口補上

---

## 3. Page map

## 3.1 Homepage
- 檔案：`/index.html`
- 功能：網站主入口，承接品牌定位、服務介紹、團隊介紹、觀點文章入口、聯絡 CTA

首頁目前包含的重要區塊：
- Hero 主視覺
- 適合誰
- 服務項目
- 合作流程
- 團隊介紹（`#team`）
- 觀點分享（blog 精選）
- FAQ
- 聯絡 CTA

### 常見修改點
如果使用者要改：
- 品牌主張
- 服務摘要
- CTA 文案
- 首頁精選文章
- 團隊介紹

通常都在 `index.html`。

---

## 3.2 Blog list page
- 檔案：`/blog/index.html`
- 功能：列出所有文章摘要與入口

任何新文章上線時，**至少要更新這一頁**：
- 日期
- 文章分類
- 標題
- 摘要
- 連結

---

## 3.3 Blog article pages
- 路徑：`/blog/*.html`
- 功能：單篇長文、SEO、信任建立、服務導流

現有文章例子：
- `/blog/ai-agent-vs-ai-tool.html`
- `/blog/ai-coach-vs-consultant.html`
- `/blog/ai-cognitive-boundary.html`

每篇文章頁通常包含：
- `<title>`
- `<meta name="description">`
- canonical
- OG meta
- Article JSON-LD
- 作者區塊
- 正文內容
- CTA 區塊
- 延伸閱讀

---

## 3.4 Service pages
- `/services/ai-coach.html`
- `/services/openclaw-setup.html`
- `/services/agent-managed-service.html`

功能：承接商業轉換，說明單一服務的價值、適合對象、行動按鈕。

---

## 3.5 Use case pages
- `/use-cases/solopreneur-ai-agent.html`

功能：用具體情境幫訪客理解 CAIO 可以怎麼落地。

---

## 4. Design / implementation notes

### 技術風格
- 直接寫 HTML
- 使用 Tailwind CDN：`https://cdn.tailwindcss.com`
- 無本地 build pipeline
- 無 React / Vue / Next.js
- 無 CMS

### 修改原則
1. **優先維持一致風格**
2. **不要突然引入大型框架**
3. **除非使用者明確要求，否則不要大改整站視覺**
4. **避免把一頁改成完全不同的設計語言**
5. **保持 mobile 可讀性與基本 SEO metadata 完整**

---

## 5. How to add a new blog article

這是最常見的工作。

## Step 1：建立新文章檔
在 `/blog/` 底下新增一個新檔案，例如：

```text
/blog/my-new-article.html
```

### 檔名規則
- 使用英文 slug
- 小寫
- 單字用 `-` 分隔
- 避免空白、中文檔名、特殊符號

例如：
- `ai-sales-workflow.html`
- `how-to-build-your-own-agent.html`
- `why-openclaw-for-teams.html`

---

## Step 2：補齊文章基本 SEO metadata
每篇文章至少要有：

- `<title>`
- `<meta name="description">`
- `<link rel="canonical">`
- `<meta name="robots" content="index,follow">`
- Open Graph 標籤
- `Article` JSON-LD

### 建議模板
```html
<title>文章標題｜CAIO</title>
<meta name="description" content="文章摘要" />
<link rel="canonical" href="https://caio.com.tw/blog/your-article-slug.html" />
<meta property="og:type" content="article" />
<meta property="og:title" content="文章標題" />
<meta property="og:description" content="文章摘要" />
<meta property="og:url" content="https://caio.com.tw/blog/your-article-slug.html" />
```

### JSON-LD 建議欄位
- `@type: Article`
- `headline`
- `description`
- `author`
- `publisher`
- `mainEntityOfPage`
- `datePublished`
- `dateModified`
- `inLanguage: zh-Hant-TW`

---

## Step 3：加入作者區塊
**重要：若文章以團隊成員名義發表，文章內應放對應成員照片。**

這是已知規則，請遵守。

例如 Shaun 的文章：
```html
<img src="/images/team/shaun.jpg" alt="Shaun Chen" class="w-20 h-20 rounded-full object-cover border-2 border-white shadow">
```

### 作者區塊建議格式
```html
<div class="flex flex-col sm:flex-row sm:items-center gap-5 mb-10 rounded-2xl border border-slate-200 bg-slate-50 p-5">
  <img src="/images/team/NAME.jpg" alt="Author Name" class="w-20 h-20 rounded-full object-cover border-2 border-white shadow">
  <div>
    <p class="text-slate-900 font-bold">Author Name</p>
    <p class="text-slate-500">Role｜2026-03-12</p>
    <p class="text-slate-600 mt-2">一句簡短的作者介紹與本文定位。</p>
  </div>
</div>
```

---

## Step 4：寫正文
CAIO 的 blog 文章建議結構：

1. 問題切入
2. 核心觀點
3. 條列式拆解
4. 適用情境 / 反例 / 誤區
5. CAIO 的做法或觀點
6. 結語
7. CTA
8. 延伸閱讀

### 寫作原則
- 不要空泛
- 不要全篇只有口號
- 要讓潛在客戶看完覺得「這群人真的懂」
- 要能自然導回服務頁或聯絡方式

---

## Step 5：更新 `/blog/index.html`
新增文章後，**一定要補上 blog 列表頁入口**。

需要更新的內容：
- 日期
- 類型
- 標題
- 摘要
- 文章連結

如果忘了做這一步，新文章就算存在，也很可能沒人看到。

---

## Step 6：視需要更新首頁精選文章區
首頁 `index.html` 有「觀點分享」區塊。

若新文章屬於：
- 品牌代表作
- 高價值觀點文
- 近期想主推的文章

請同步更新首頁文章卡片。

至少檢查：
- 標題
- 摘要
- 連結
- 排序是否合理

---

## Step 7：更新 sitemap（若有新增 indexable page）
如果新增了公開頁面，理想上應同步更新：
- `sitemap.xml`

如果這一輪工作是正式 SEO 發布，請不要漏掉。

---

## 6. How to modify a team member profile block

## 6.1 Homepage team section
首頁團隊介紹在：
- `index.html`
- 關鍵錨點：`#team`

這裡會放：
- 頭像
- 名字
- 職稱
- 個人定位 / 介紹

例如目前可看到 `Shaun` 與其他成員卡片。

### 修改內容時要同步思考
- 名字顯示方式是否一致
- 職稱是否與品牌定位一致
- 文案是否過長
- 照片路徑是否存在
- 有沒有破壞版面平衡

---

## 6.2 個人照片
目前團隊照片放在：

```text
/images/team/
```

已知檔案：
- `/images/team/shaun.jpg`
- `/images/team/eagle.jpg`

### 新增成員照片規則
- 優先使用 `.jpg`
- 檔名盡量簡單、穩定、全小寫
- 建議與成員名稱一致，例如：
  - `louis.jpg`
  - `jerry.jpg`
  - `shaun.jpg`

修改自我介紹區塊前，先確認圖片檔真的已存在。

---

## 6.3 文章作者資料
如果團隊成員用自己名義發表文章，通常也要同步檢查：
- 文章內作者區塊
- JSON-LD `author`
- 文章頁中的作者照片
- 作者角色稱呼是否一致

不要只改首頁團隊區塊，卻忘了文章頁仍顯示舊資料。

---

## 7. Safe editing checklist

在任何 agent 修改網站前，建議先做這份 checklist：

### 修改前
- [ ] 確認要改的是哪一頁
- [ ] 確認這次要改的是內容、結構、還是 SEO metadata
- [ ] 確認是否會影響首頁 / blog index / sitemap / 團隊照片

### 修改中
- [ ] 不要改壞既有連結
- [ ] 不要改掉 canonical 指到錯頁
- [ ] 不要讓 CTA 指向不存在頁面
- [ ] 不要讓文章作者照片路徑失效

### 修改後
- [ ] 檢查 HTML 結構是否完整
- [ ] 檢查新頁面是否能從站內被點到
- [ ] 檢查首頁或 blog index 是否要補入口
- [ ] 檢查 `mailto:aicoach@caio.com.tw` 是否一致
- [ ] 檢查是否需要更新 `sitemap.xml`

---

## 8. Common tasks and where to edit

## 任務 A：修改首頁文案
改：`/index.html`

常見區塊：
- Hero 標題
- 服務摘要
- 團隊介紹
- 精選文章
- CTA

---

## 任務 B：新增 blog 文章
改：
- 新增 `/blog/your-article.html`
- 更新 `/blog/index.html`
- 視需要更新 `/index.html`
- 視需要更新 `/sitemap.xml`

**作者照片規則**：若以團隊成員名義發表，文章內**必須**放對應成員照片（圖檔放在 `/images/team/`）

---

## 任務 C：修改某位成員的自我介紹
通常改：
- `/index.html` 的團隊卡片
- 若該成員有文章，也改對應 `/blog/*.html` 的作者區塊
- 若換照片，新增或替換 `/images/team/...`

---

## 任務 D：新增服務頁
通常改：
- 新增 `/services/xxx.html`
- 更新 `/index.html` 服務入口
- 視需要更新 blog / use case 的內鏈
- 更新 `sitemap.xml`

---

## 9. Suggested workflow for OpenClaw agents

建議 agent 執行順序：

1. 先讀這份文件
2. 再讀目標檔案
3. 先判斷影響範圍
4. 一次性完成相關連動修改
5. 最後做簡短驗收

### 不好的做法
- 只改文章頁，忘了 blog index
- 只改首頁名字，忘了文章作者資訊
- 只改文字，沒檢查圖片路徑
- 新增頁面卻不補 sitemap
- 引入新的技術棧，讓 repo 變複雜

### 好的做法
- 小改動但連動完整
- 保持設計一致
- 注意 SEO 與內鏈
- 對外文案自然、不油膩、可信

---

## 10. Content guardrails

OpenClaw / AI agent 在生成 CAIO 內容時，請遵守：

### 要做的
- 強調實戰、落地、工作流、持續能力
- 幫使用者理解 AI 工具、AI Agent、OpenClaw 的差異
- 用內容建立信任，而不是硬賣
- 適度導向服務頁與聯絡方式

### 不要做的
- 不要捏造案例或客戶成果
- 不要宣稱無法證明的業績
- 不要把 AI 寫成萬能
- 不要塞滿浮誇 SEO 關鍵字
- 不要把內容寫得像模板垃圾文

---

## 11. Recommended pattern for new author onboarding

如果新成員要加入網站並能發文，建議至少完成以下項目：

1. 在 GitHub repo 取得協作權限
2. 準備個人照片到 `/images/team/`
3. 在首頁 `index.html` 加入或更新個人介紹卡片
4. 若以個人名義寫文：
   - 新文章加入作者區塊
   - 使用對應照片
   - JSON-LD `author` 寫正確
5. 若要成為固定欄目作者，可再考慮後續增加作者索引或作者頁

---

## 12. If you are another OpenClaw agent taking over

如果你是接手這個 repo 的另一個 OpenClaw agent，請先假設：

- 這是一個 **靜態內容站**，不是複雜 web app
- 最重要的是 **內容清楚、入口完整、風格一致、SEO 基本功到位**
- 新增內容時，通常不是只改一個檔，而是要**連動更新多個入口**
- 團隊名義文章要有**對應成員照片**
- 聯絡方式預設使用：`aicoach@caio.com.tw`

你接手後若要開始修改，優先檢查：
- `index.html`
- `blog/index.html`
- 目標文章頁
- `/images/team/`
- `sitemap.xml`

---

## 13. Minimal task recipes

## 新增文章最小配方
1. 建 `/blog/new-article.html`
2. 寫 metadata + 正文 + 作者區塊 + CTA
3. 更新 `/blog/index.html`
4. 視需要更新 `/index.html`
5. 更新 `sitemap.xml`

## 修改個人介紹最小配方
1. 確認照片在 `/images/team/`
2. 改 `index.html` 團隊卡片
3. 若已有作者頁，連同文章作者區塊一起改
4. 檢查名稱 / 職稱一致性

## 新增服務頁最小配方
1. 建 `/services/new-service.html`
2. 從首頁加入口
3. 補內鏈與 CTA
4. 更新 sitemap

---

## 14. Final reminder

這個網站目前靠的是：
- 明確品牌定位
- 有溫度但不浮誇的文案
- 靜態頁面的高可控性
- 用 blog 與服務頁慢慢建立信任

請優先保護這些優勢。

如果要改，就改得**完整、穩、可維護**。
