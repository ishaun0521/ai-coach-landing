# AGENTS.md - CAIO Website Repo Guide

這個 repo 是 **CAIO 官網 / 內容網站**：`https://caio.com.tw/`

如果你是 OpenClaw / AI agent，接手這個 repo 前請先讀：

1. `AGENTS.md`（本檔）
2. `OPENCLAW-WEBSITE-HANDBOOK.md`
3. `BLOG-WRITING-GUIDE.md`（若要寫 blog 文章）

讀完再開始修改。

---

## 你要先知道的事

- Repo：`https://github.com/ishaun0521/ai-coach-landing`
- 網站型態：**靜態 HTML 網站**
- 預設發布方式：**GitHub repo / GitHub Pages**
- 聯絡信箱：`aicoach@caio.com.tw`

### 主要目標
這個網站主要用來：
- 說清楚 CAIO 的定位
- 承接 AI 教練 / OpenClaw 建置 / AI Agent 代管服務
- 用 blog 文章建立信任
- 幫訪客理解服務內容並產生聯絡意願

---

## 修改前先讀 handbook

詳細規則都在：
- `OPENCLAW-WEBSITE-HANDBOOK.md`
- `BLOG-WRITING-GUIDE.md`（若要新增或修改 blog 文章）

裡面已經整理好：
- 網站結構
- 哪些檔案對應哪些頁面
- 如何新增 blog 文章
- 如何修改團隊介紹 / 自我介紹區塊
- 哪些修改要連動更新首頁、blog index、sitemap
- 內容與 SEO guardrails

---

## 最重要的操作原則

1. **不要只改單一頁面，忽略其他入口**
2. **新增 blog 後，要同步更新 `blog/index.html`**
3. **若文章要主推，視情況同步更新首頁 `index.html`**
4. **若團隊成員名義發文，文章內應放對應成員照片**
5. **聯絡方式預設使用 `aicoach@caio.com.tw`**
6. **除非明確要求，否則不要引入新 framework / build step**

---

## 常見任務入口

### 新增 blog 文章
- 新增：`/blog/*.html`
- 更新：`/blog/index.html`
- 視需要更新：`/index.html`、`/sitemap.xml`
- **重要**：寫文前先讀 `BLOG-WRITING-GUIDE.md`，了解 CAIO blog 的商業目的、版面格式與 CTA 原則
- **作者照片規則**：若以團隊成員名義發表，文章內必須放對應成員照片（圖檔放在 `/images/team/`）

### 修改團隊介紹 / 自我介紹
- 主要改：`/index.html`
- 若該人已有署名文章，也要檢查 `/blog/*.html` 作者區塊
- 圖片位置：`/images/team/`

### 修改服務內容
- 主要改：`/services/*.html`
- 視需要同步改首頁服務入口

---

## 工作方式

建議流程：
1. 先讀 `OPENCLAW-WEBSITE-HANDBOOK.md`
2. 找出這次要改的目標檔案
3. 判斷是否有連動頁面
4. 一次改完整
5. 自己做基本驗收後再交付

如果你只是要快速上手，**至少先讀 handbook 再動手**。
