/* Header bằng da + tiêu đề khắc chìm */
.vintage-header {
position: relative;
background:
linear-gradient(180deg, rgba(0,0,0,0.25), rgba(0,0,0,0)) ,
url('/images/leather.jpg') center/cover no-repeat;
color: #fdf7e7;
padding: 48px 0 28px;
box-shadow: 0 6px 20px var(--shadow);
}

.engraved-title {
font-family: 'Cormorant Garamond', serif;
font-size: clamp(28px, 4vw, 48px);
letter-spacing: 1px;
text-shadow:
0 1px 0 rgba(0,0,0,0.5),
0 3px 8px rgba(0,0,0,0.4),
0 -1px 0 rgba(255,255,255,0.15);
}

.header-subtitle {
margin-top: 6px;
opacity: 0.9;
font-style: italic;
}

/* Họa tiết phân cách */
.header-ornament {
height: 14px;
margin: 18px auto 0;
width: 200px;
background: url('/images/ornament.svg') center/contain no-repeat;
opacity: 0.9;
}

/* Thanh tìm kiếm kiểu giấy cũ */
.search-wrap {
margin-top: 18px;
display: flex;
gap: 10px;
flex-wrap: wrap;
}

.search-box {
flex: 1 1 320px;
display: flex;
align-items: center;
background:
linear-gradient(180deg, rgba(166,124,82,0.08), rgba(0,0,0,0.03)),
url('/images/parchment.jpg') center/cover no-repeat;
border: 1px solid rgba(61,43,31,0.3);
box-shadow: inset 0 2px 6px rgba(0,0,0,0.08), 0 4px 10px var(--shadow);
border-radius: 6px;
padding: 8px 12px;
}

.search-box input {
width: 100%;
outline: none;
border: none;
background: transparent;
color: var(--ink);
font-size: 16px;
font-family: 'Crimson Text', serif;
}

.btn-primary {
background: linear-gradient(180deg, #b08d57, #8a6a3e);
border: 1px solid rgba(61,43,31,0.5);
color: #fffaf0;
padding: 10px 16px;
border-radius: 6px;
cursor: pointer;
font-weight: 600;
box-shadow: inset 0 1px 0 rgba(255,255,255,0.25), 0 3px 10px var(--shadow);
}
.btn-primary:hover { filter: brightness(1.05); }
.btn-primary:active { transform: translateY(1px); }

/* Tabs */
.nav-tabs {
display: flex;
gap: 10px;
flex-wrap: wrap;
margin-top: 16px;
}

.tab {
padding: 8px 12px;
border-radius: 20px;
background: rgba(255,255,255,0.15);
border: 1px solid rgba(253,247,231,0.3);
color: #fdf7e7;
cursor: pointer;
font-weight: 600;
backdrop-filter: blur(2px);
}
.tab.active {
background: linear-gradient(180deg, #c3a86b, #9b824f);
border-color: rgba(61,43,31,0.35);
color: #2c1f14;
}

/* Nội dung chính */
.main {
padding: 26px 0 50px;
}

.section-title {
font-family: 'Cormorant Garamond', serif;
font-size: 28px;
color: var(--olive);
display: flex;
align-items: center;
gap: 10px;
}
.section-title::before, .section-title::after {
content: '';
flex: 1;
height: 1px;
background: linear-gradient(90deg, transparent, rgba(63, 76, 63, 0.35));
}

/* Lưới sách */
.grid {
margin-top: 18px;
display: grid;
grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
gap: 18px;
}

.book-card {
background:
linear-gradient(180deg, rgba(255,255,255,0.5), rgba(255,255,255,0.2)),
url('/images/parchment.jpg') center/cover no-repeat;
border: 1px solid rgba(61,43,31,0.35);
border-radius: 10px;
box-shadow: 0 8px 22px var(--shadow), inset 0 1px 18px rgba(255,255,255,0.25);
overflow: hidden;
transition: transform 120ms ease, box-shadow 120ms ease;
}
.book-card:hover {
transform: translateY(-3px);
box-shadow: 0 14px 28px rgba(0,0,0,0.2);
}

.book-cover {
width: 100%;
aspect-ratio: 3/4;
object-fit: cover;
display: block;
filter: saturate(0.9) contrast(0.95);
}

.book-body {
padding: 12px 12px 14px;
}

.book-title {
font-family: 'Cormorant Garamond', serif;
font-size: 20px;
margin: 2px 0 6px;
color: var(--ink);
}

.book-meta {
font-size: 14px;
color: #6a5e54;
margin-bottom: 10px;
}

.card-actions {
display: flex;
gap: 8px;
}

.btn-ghost {
background: transparent;
border: 1px dashed rgba(61,43,31,0.35);
color: var(--ink);
padding: 8px 12px;
border-radius: 6px;
cursor: pointer;
}
.btn-ghost:hover { background: rgba(255,255,255,0.5); }

/* Footer */
.footer {
text-align: center;
padding: 24px 0 40px;
color: #6a5e54;
font-size: 14px;
}import React, { useMemo, useState } from 'react';
import './index.css';
import './App.css';

function App() {
const [activeTab, setActiveTab] = useState('Sách mới');
const books = useMemo(
() => [
{ id: 1, title: 'Những Trang Sách Cũ', author: 'N. Tác Giả', year: 1932, cover: '/images/book-placeholder.jpg' },
{ id: 2, title: 'Lịch Sử Thư Viện', author: 'A. Sưu Tầm', year: 1954, cover: '/images/book-placeholder.jpg' },
{ id: 3, title: 'Cổ Học Tinh Hoa', author: 'Tuyển Tập', year: 1925, cover: '/images/book-placeholder.jpg' },
{ id: 4, title: 'Văn Khố & Bảo Tồn', author: 'B. Thủ Thư', year: 1961, cover: '/images/book-placeholder.jpg' },
{ id: 5, title: 'Thư Tịch Cổ', author: 'Nhóm Biên Soạn', year: 1940, cover: '/images/book-placeholder.jpg' },
{ id: 6, title: 'Dấu Ấn Thời Gian', author: 'L. Nghiên Cứu', year: 1972, cover: '/images/book-placeholder.jpg' },
],
[]
);

const tabs = ['Sách mới', 'Phổ biến', 'Sưu tầm', 'Lưu trữ'];

return (
<>
<header className="vintage-header">
<div className="container">
<h1 className="engraved-title">Thư viện Cổ</h1>
<p className="header-subtitle">Nơi lưu giữ tri thức qua năm tháng</p>
<div className="header-ornament" aria-hidden="true" />
<div className="search-wrap">
<label className="sr-only" htmlFor="search">Tìm kiếm sách</label>
<div className="search-box">
<input id="search" placeholder="Tìm theo nhan đề, tác giả, chủ đề..." />
</div>
<button className="btn-primary" type="button">Tìm kiếm</button>
</div>
<nav className="nav-tabs" aria-label="Thể loại">
{tabs.map(t => (
<button
key={t}
className={`tab ${activeTab === t ? 'active' : ''}`}
onClick={() => setActiveTab(t)}
type="button"
>
{t}
</button>
))}
</nav>
</div>
</header>

      <main className="main">
        <div className="container">
          <h2 className="section-title">Tuyển chọn {activeTab.toLowerCase()}</h2>

          <div className="grid">
            {books.map(b => (
              <article key={b.id} className="book-card" aria-label={b.title}>
                <img
                  className="book-cover"
                  src={b.cover || '/images/book-placeholder.jpg'}
                  alt={`Bìa sách: ${b.title}`}
                />
                <div className="book-body">
                  <h3 className="book-title">{b.title}</h3>
                  <div className="book-meta">Tác giả: {b.author} • {b.year}</div>
                  <div className="card-actions">
                    <button className="btn-primary" type="button">Mượn</button>
                    <button className="btn-ghost" type="button">Chi tiết</button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <footer className="footer">
            © Thư viện Cổ — Giữ gìn & lan tỏa tri thức
          </footer>
        </div>
      </main>
    </>
);
}

export default App;import React, { useMemo, useState } from 'react';
import './index.css';
import './App.css';

function App() {
const [activeTab, setActiveTab] = useState('Sách mới');
const books = useMemo(
() => [
{ id: 1, title: 'Những Trang Sách Cũ', author: 'N. Tác Giả', year: 1932, cover: '/images/book-placeholder.jpg' },
{ id: 2, title: 'Lịch Sử Thư Viện', author: 'A. Sưu Tầm', year: 1954, cover: '/images/book-placeholder.jpg' },
{ id: 3, title: 'Cổ Học Tinh Hoa', author: 'Tuyển Tập', year: 1925, cover: '/images/book-placeholder.jpg' },
{ id: 4, title: 'Văn Khố & Bảo Tồn', author: 'B. Thủ Thư', year: 1961, cover: '/images/book-placeholder.jpg' },
{ id: 5, title: 'Thư Tịch Cổ', author: 'Nhóm Biên Soạn', year: 1940, cover: '/images/book-placeholder.jpg' },
{ id: 6, title: 'Dấu Ấn Thời Gian', author: 'L. Nghiên Cứu', year: 1972, cover: '/images/book-placeholder.jpg' },
],
[]
);

const tabs = ['Sách mới', 'Phổ biến', 'Sưu tầm', 'Lưu trữ'];

return (
<>
<header className="vintage-header">
<div className="container">
<h1 className="engraved-title">Thư viện Cổ</h1>
<p className="header-subtitle">Nơi lưu giữ tri thức qua năm tháng</p>
<div className="header-ornament" aria-hidden="true" />
<div className="search-wrap">
<label className="sr-only" htmlFor="search">Tìm kiếm sách</label>
<div className="search-box">
<input id="search" placeholder="Tìm theo nhan đề, tác giả, chủ đề..." />
</div>
<button className="btn-primary" type="button">Tìm kiếm</button>
</div>
<nav className="nav-tabs" aria-label="Thể loại">
{tabs.map(t => (
<button
key={t}
className={`tab ${activeTab === t ? 'active' : ''}`}
onClick={() => setActiveTab(t)}
type="button"
>
{t}
</button>
))}
</nav>
</div>
</header>

      <main className="main">
        <div className="container">
          <h2 className="section-title">Tuyển chọn {activeTab.toLowerCase()}</h2>

          <div className="grid">
            {books.map(b => (
              <article key={b.id} className="book-card" aria-label={b.title}>
                <img
                  className="book-cover"
                  src={b.cover || '/images/book-placeholder.jpg'}
                  alt={`Bìa sách: ${b.title}`}
                />
                <div className="book-body">
                  <h3 className="book-title">{b.title}</h3>
                  <div className="book-meta">Tác giả: {b.author} • {b.year}</div>
                  <div className="card-actions">
                    <button className="btn-primary" type="button">Mượn</button>
                    <button className="btn-ghost" type="button">Chi tiết</button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <footer className="footer">
            © Thư viện Cổ — Giữ gìn & lan tỏa tri thức
          </footer>
        </div>
      </main>
    </>
);
}

export default App;# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
