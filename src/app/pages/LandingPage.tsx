import { useNavigate } from "react-router";
import { Music2, Users, Play, Grid, ArrowRight, Zap, Shield, Globe } from "lucide-react";

const FEATURES = [
  { icon: Grid, title: "시각적 무대 편집", desc: "실제 무대 크기를 기반으로 포메이션을 직관적으로 배치하세요.", color: "#6C3AED" },
  { icon: Users, title: "실시간 협업", desc: "안무가와 댄서가 함께 동선을 기획하고 공유합니다.", color: "#EC4899" },
  { icon: Play, title: "애니메이션 미리보기", desc: "타임라인 기반으로 포메이션 전환 애니메이션을 미리 확인하세요.", color: "#0EA5E9" },
  { icon: Zap, title: "빠른 공유", desc: "초대 코드 하나로 팀원을 즉시 초대합니다.", color: "#F59E0B" },
  { icon: Shield, title: "권한 관리", desc: "편집자/조회자 권한으로 안전하게 프로젝트를 관리하세요.", color: "#10B981" },
  { icon: Globe, title: "언제 어디서나", desc: "웹 브라우저만 있으면 어디서든 접근 가능합니다.", color: "#8B5CF6" },
];

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh", background: "#F8FAFC", fontFamily: "var(--font-family)" }}>
      {/* Header */}
      <header className="landing-header" style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid #EDE9FE", padding: "0 60px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: "linear-gradient(135deg, #6C3AED, #A78BFA)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Music2 size={17} color="white" />
          </div>
          <span style={{ fontSize: 18, fontWeight: 800, color: "#111827" }}>DPH</span>
        </div>
        <nav className="landing-nav" style={{ display: "flex", alignItems: "center", gap: 32 }}>
          <a href="#features" className="nav-link" style={{ fontSize: 14, color: "#374151", textDecoration: "none", fontWeight: 500 }}>기능 소개</a>
          <a href="#about" className="nav-link" style={{ fontSize: 14, color: "#374151", textDecoration: "none", fontWeight: 500 }}>서비스 소개</a>
          <button onClick={() => navigate("/login")} style={{ fontSize: 14, color: "#6C3AED", fontWeight: 700, background: "none", border: "none", cursor: "pointer" }}>로그인</button>
          <button onClick={() => navigate("/register")} style={{ padding: "8px 20px", borderRadius: 10, background: "linear-gradient(135deg, #6C3AED, #8B5CF6)", color: "white", fontSize: 14, fontWeight: 700, border: "none", cursor: "pointer", boxShadow: "0 4px 12px rgba(108,58,237,0.3)", whiteSpace: "nowrap" }}>
            무료 시작하기
          </button>
        </nav>
      </header>

      {/* Hero */}
      <section className="landing-hero" style={{ background: "linear-gradient(160deg, #1E0653 0%, #6C3AED 55%, #A78BFA 100%)", padding: "100px 60px 120px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        {/* Decorative circles */}
        {[{s:400, t:-100, r:-100, o:0.07},{s:250, t:50, l:-80, o:0.05},{s:180, b:-60, r:100, o:0.08}].map((c,i)=>(
          <div key={i} style={{ position:"absolute", width:c.s, height:c.s, borderRadius:"50%", background:"white", opacity:c.o, top:c.t, right:c.r, left:(c as any).l, bottom:(c as any).b }} />
        ))}

        <div style={{ position: "relative", maxWidth: 800, margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.15)", borderRadius: 20, padding: "6px 16px", marginBottom: 24, border: "1px solid rgba(255,255,255,0.25)" }}>
            <Zap size={12} color="#FCD34D" fill="#FCD34D" />
            <span style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.9)" }}>댄스 퍼포먼스 협업 플랫폼</span>
          </div>
          <h1 className="hero-title" style={{ fontSize: 56, fontWeight: 900, color: "white", letterSpacing: -2, lineHeight: 1.15, marginBottom: 24 }}>
            무대를 설계하고<br/>
            <span style={{ background: "linear-gradient(90deg, #FCD34D, #F9A8D4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>퍼포먼스를 완성하다</span>
          </h1>
          <p className="hero-subtitle" style={{ fontSize: 18, color: "rgba(255,255,255,0.8)", lineHeight: 1.7, marginBottom: 40, fontWeight: 400 }}>
            DPH는 안무가와 댄서가 함께 동선, 포메이션, 무대 구성을<br className="hide-mobile"/>
            실시간으로 협업하는 공연 제작 플랫폼입니다.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={() => navigate("/register")}
              style={{ padding: "16px 36px", borderRadius: 14, background: "white", color: "#6C3AED", fontSize: 16, fontWeight: 800, border: "none", cursor: "pointer", boxShadow: "0 8px 28px rgba(0,0,0,0.25)", display: "flex", alignItems: "center", gap: 8 }}
            >
              무료로 시작하기
              <ArrowRight size={17} />
            </button>
            <button
              onClick={() => navigate("/login")}
              style={{ padding: "16px 36px", borderRadius: 14, background: "rgba(255,255,255,0.15)", color: "white", fontSize: 16, fontWeight: 700, border: "1.5px solid rgba(255,255,255,0.35)", cursor: "pointer", backdropFilter: "blur(8px)" }}
            >
              로그인
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="hero-stats" style={{ display: "flex", gap: 48, justifyContent: "center", marginTop: 72, position: "relative", flexWrap: "wrap" }}>
          {[{ label: "활성 프로젝트", value: "1,200+" }, { label: "댄서 사용자", value: "8,400+" }, { label: "포메이션 생성", value: "32,000+" }].map(s => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 32, fontWeight: 900, color: "white", letterSpacing: -1 }}>{s.value}</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", marginTop: 4, fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="landing-section" style={{ padding: "80px 60px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#6C3AED", letterSpacing: 2, textTransform: "uppercase" as const }}>기능 소개</span>
          <h2 style={{ fontSize: 36, fontWeight: 800, color: "#111827", marginTop: 8, letterSpacing: -1 }}>필요한 모든 것을 하나의 플랫폼에서</h2>
          <p style={{ fontSize: 16, color: "#6B7280", marginTop: 12, lineHeight: 1.6 }}>복잡한 공연 준비를 DPH와 함께 체계적으로 관리하세요.</p>
        </div>
        <div className="features-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {FEATURES.map(f => (
            <div key={f.title} className="feature-card" style={{ background: "white", borderRadius: 20, padding: "28px 28px", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", border: "1px solid #EDE9FE", transition: "transform 0.2s" }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: f.color + "15", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                <f.icon size={22} color={f.color} />
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: "#111827", marginBottom: 8 }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.7 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="landing-section" style={{ background: "white", padding: "80px 60px", borderTop: "1px solid #F1F0FF" }}>
        <div className="about-content" style={{ maxWidth: 1100, margin: "0 auto", display: "flex", gap: 80, alignItems: "center" }}>
          <div style={{ flex: 1 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#6C3AED", letterSpacing: 2, textTransform: "uppercase" as const }}>서비스 소개</span>
            <h2 style={{ fontSize: 36, fontWeight: 800, color: "#111827", marginTop: 8, letterSpacing: -1, lineHeight: 1.3 }}>
              안무가와 댄서 모두를 위한<br/>협업 도구
            </h2>
            <p style={{ fontSize: 15, color: "#6B7280", lineHeight: 1.9, marginTop: 16 }}>
              기존의 스프레드시트, 메모장, 스케치로는 표현하기 어려웠던<br/>
              공연 포메이션을 시각적으로 설계하고 팀원과 공유하세요.<br/>
              DPH는 Figma처럼 쉽고, 댄서에게 최적화되어 있습니다.
            </p>
            <div style={{ display: "flex", gap: 16, marginTop: 32 }}>
              <button onClick={() => navigate("/register")} style={{ padding: "14px 28px", borderRadius: 12, background: "linear-gradient(135deg, #6C3AED, #8B5CF6)", color: "white", fontSize: 15, fontWeight: 700, border: "none", cursor: "pointer", boxShadow: "0 4px 16px rgba(108,58,237,0.3)" }}>
                지금 시작하기
              </button>
              <button onClick={() => navigate("/join")} style={{ padding: "14px 28px", borderRadius: 12, background: "#F5F3FF", color: "#6C3AED", fontSize: 15, fontWeight: 700, border: "none", cursor: "pointer" }}>
                프로젝트 참여하기
              </button>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            {/* Visual mockup */}
            <div style={{ background: "linear-gradient(160deg, #1E0653, #6C3AED)", borderRadius: 20, padding: 24, aspectRatio: "4/3", position: "relative", overflow: "hidden", boxShadow: "0 20px 60px rgba(108,58,237,0.4)" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.6)", marginBottom: 12 }}>무대 편집기 미리보기</div>
              {/* Stage mockup */}
              <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 12, border: "1px solid rgba(255,255,255,0.2)", padding: 16, height: "70%" }}>
                {/* Grid */}
                <div style={{ position: "relative", height: "100%", background: "repeating-linear-gradient(0deg, rgba(167,139,250,0.08) 0px, rgba(167,139,250,0.08) 1px, transparent 1px, transparent 28px), repeating-linear-gradient(90deg, rgba(167,139,250,0.08) 0px, rgba(167,139,250,0.08) 1px, transparent 1px, transparent 28px)", borderRadius: 8 }}>
                  {/* Dancer dots */}
                  {[{x:"50%",y:"30%",c:"#6C3AED"},{x:"25%",y:"55%",c:"#EC4899"},{x:"75%",y:"55%",c:"#0EA5E9"},{x:"40%",y:"70%",c:"#10B981"},{x:"60%",y:"70%",c:"#F59E0B"}].map((d,i) => (
                    <div key={i} style={{ position:"absolute", left:d.x, top:d.y, transform:"translate(-50%,-50%)", width:24, height:24, borderRadius:"50%", background:d.c, boxShadow:`0 0 12px ${d.c}80`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                      <span style={{ fontSize:9, fontWeight:800, color:"white" }}>{["민","지","서","하","도"][i]}</span>
                    </div>
                  ))}
                  <div style={{ position:"absolute", bottom:8, left:"50%", transform:"translateX(-50%)", fontSize:9, color:"rgba(167,139,250,0.6)", fontWeight:600 }}>무대 앞 ▼</div>
                </div>
              </div>
              {/* Timeline bar */}
              <div style={{ marginTop: 10, display: "flex", gap: 4 }}>
                {["오프닝","1절","후렴","브릿지","엔딩"].map((f,i) => (
                  <div key={f} style={{ flex:i===2?2:1, background:i===2?"rgba(108,58,237,0.8)":"rgba(255,255,255,0.1)", borderRadius:6, padding:"4px 0", textAlign:"center" }}>
                    <span style={{ fontSize:8, color:"white", fontWeight:600 }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="landing-section landing-cta" style={{ padding: "80px 60px", textAlign: "center", background: "linear-gradient(160deg, #6C3AED, #8B5CF6)" }}>
        <h2 style={{ fontSize: 36, fontWeight: 800, color: "white", letterSpacing: -1, marginBottom: 16 }}>지금 바로 시작하세요</h2>
        <p style={{ fontSize: 16, color: "rgba(255,255,255,0.8)", marginBottom: 36, lineHeight: 1.6 }}>
          무료로 프로젝트를 생성하고 팀원을 초대해보세요.<br/>신용카드 없이 즉시 시작 가능합니다.
        </p>
        <button onClick={() => navigate("/register")} style={{ padding: "16px 44px", borderRadius: 14, background: "white", color: "#6C3AED", fontSize: 17, fontWeight: 800, border: "none", cursor: "pointer", boxShadow: "0 8px 28px rgba(0,0,0,0.2)" }}>
          무료로 시작하기 →
        </button>
      </section>

      {/* Footer */}
      <footer className="landing-footer" style={{ background: "#111827", padding: "32px 60px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: "linear-gradient(135deg, #6C3AED, #A78BFA)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Music2 size={14} color="white" />
          </div>
          <span style={{ fontSize: 15, fontWeight: 800, color: "white" }}>DPH</span>
        </div>
        <p className="footer-copyright" style={{ fontSize: 12, color: "#6B7280" }}>© 2026 DPH (Dance Performing Helper). 모든 권리 보유.</p>
        <div className="footer-links" style={{ display: "flex", gap: 20 }}>
          <a href="#" style={{ fontSize: 12, color: "#6B7280", textDecoration: "none" }}>개인정보처리방침</a>
          <a href="#" style={{ fontSize: 12, color: "#6B7280", textDecoration: "none" }}>이용약관</a>
        </div>
      </footer>

      <style>{`
        @media (max-width: 768px) {
          .landing-header {
            padding: 0 20px !important;
            height: 56px !important;
          }
          .landing-nav {
            gap: 12px !important;
          }
          .nav-link {
            display: none !important;
          }
          .landing-hero {
            padding: 60px 20px 80px !important;
          }
          .hero-title {
            font-size: 36px !important;
            letter-spacing: -1px !important;
          }
          .hero-subtitle {
            font-size: 16px !important;
            padding: 0 10px !important;
          }
          .hide-mobile {
            display: none;
          }
          .hero-stats {
            gap: 28px !important;
            margin-top: 48px !important;
          }
          .landing-section {
            padding: 48px 20px !important;
          }
          .features-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          .about-content {
            flex-direction: column !important;
            gap: 40px !important;
          }
          .landing-footer {
            padding: 24px 20px !important;
            justify-content: center !important;
            text-align: center;
          }
          .footer-copyright {
            order: 3;
            width: 100%;
          }
          .footer-links {
            order: 2;
          }
        }
        @media (max-width: 480px) {
          .hero-title {
            font-size: 28px !important;
          }
          .hero-subtitle {
            font-size: 14px !important;
          }
          .hero-stats {
            gap: 20px !important;
          }
        }
        .feature-card:hover {
          transform: translateY(-4px);
        }
      `}</style>
    </div>
  );
}
