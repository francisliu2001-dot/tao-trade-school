import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <style>{`
        .nf-wrap{max-width:680px;margin:0 auto;padding:120px 28px 80px;text-align:center}
        .nf-wrap .nf-code{font:900 clamp(80px,16vw,160px)/1 Georgia,serif;letter-spacing:-.06em;color:var(--ink)}
        .nf-wrap .nf-code span{background:linear-gradient(transparent 60%,var(--yellow) 0)}
        .nf-wrap h1{font-size:clamp(28px,4vw,40px);font-weight:950;letter-spacing:-.03em;margin:16px 0 12px}
        .nf-wrap p{color:var(--muted);font-size:17px;max-width:420px;margin:0 auto 32px}
        .nf-wrap .nf-links{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
        .nf-wrap .nf-links a{display:inline-flex;align-items:center;gap:8px;padding:12px 24px;border:1.5px solid var(--line);border-radius:999px;font-weight:800;font-size:14px;background:var(--white);box-shadow:var(--shadow)}
        .nf-wrap .nf-links a:first-child{background:var(--yellow)}
        .nf-wrap .nf-links a:hover{transform:translate(-1px,-1px);box-shadow:6px 7px 0 var(--line)}
        @media(max-width:640px){.nf-wrap{padding:80px 18px 60px}.nf-wrap .nf-links{flex-direction:column;align-items:center}}
      `}</style>
      <main className="nf-wrap">
        <div className="nf-code">4<span>0</span>4</div>
        <h1>这一页不在学堂里</h1>
        <p>你访问的页面可能已被移动或从未存在。回到首页或进阶专题继续学习。</p>
        <div className="nf-links">
          <Link href="/">返回首页</Link>
          <Link href="/topics">浏览进阶专题</Link>
          <Link href="/learn">从 0 到 1</Link>
        </div>
      </main>
    </>
  );
}
