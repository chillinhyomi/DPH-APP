import { MobilePage, PageHeader, PageContent } from "../components/MobilePage";

export function PrivacyPolicyPage() {
  return (
    <MobilePage>
      <PageHeader title="개인정보 처리방침" showBack={true} />

      <PageContent>
        <div style={{
          background: "var(--card)",
          borderRadius: 16,
          padding: "24px",
          border: "1px solid var(--border)",
          marginBottom: 16,
        }}>
          <p style={{
            fontSize: 15,
            color: "var(--foreground)",
            lineHeight: 1.7,
            marginBottom: 24,
          }}>
            DPH는 서비스 제공을 위해 최소한의 개인정보만을 수집합니다.
          </p>

          {/* 수집하는 정보 */}
          <h3 style={{
            fontSize: 16,
            fontWeight: 700,
            color: "var(--foreground)",
            marginBottom: 12,
          }}>
            수집하는 정보
          </h3>
          <div style={{
            background: "var(--muted)",
            borderRadius: 12,
            padding: "16px",
            marginBottom: 24,
          }}>
            <ul style={{
              margin: 0,
              paddingLeft: 20,
              fontSize: 15,
              color: "var(--foreground)",
              lineHeight: 1.8,
            }}>
              <li>이메일 주소</li>
              <li>닉네임</li>
              <li>프로필 이미지</li>
            </ul>
          </div>

          {/* 수집 목적 */}
          <h3 style={{
            fontSize: 16,
            fontWeight: 700,
            color: "var(--foreground)",
            marginBottom: 12,
          }}>
            수집 목적
          </h3>
          <div style={{
            background: "var(--muted)",
            borderRadius: 12,
            padding: "16px",
            marginBottom: 24,
          }}>
            <ul style={{
              margin: 0,
              paddingLeft: 20,
              fontSize: 15,
              color: "var(--foreground)",
              lineHeight: 1.8,
            }}>
              <li>계정 관리</li>
              <li>서비스 운영</li>
              <li>고객 지원</li>
            </ul>
          </div>

          {/* 보유 기간 */}
          <h3 style={{
            fontSize: 16,
            fontWeight: 700,
            color: "var(--foreground)",
            marginBottom: 12,
          }}>
            데이터 보유 기간
          </h3>
          <div style={{
            background: "var(--muted)",
            borderRadius: 12,
            padding: "16px",
            marginBottom: 24,
          }}>
            <p style={{
              margin: 0,
              fontSize: 15,
              color: "var(--foreground)",
              lineHeight: 1.7,
            }}>
              계정 삭제 시까지 보관됩니다.
            </p>
          </div>

          {/* 사용자 권리 */}
          <h3 style={{
            fontSize: 16,
            fontWeight: 700,
            color: "var(--foreground)",
            marginBottom: 12,
          }}>
            사용자 권리
          </h3>
          <p style={{
            fontSize: 15,
            color: "var(--foreground)",
            lineHeight: 1.7,
            marginBottom: 24,
          }}>
            사용자는 언제든지 자신의 개인정보에 대한 열람, 수정, 삭제를 요청할 수 있습니다.
          </p>

          {/* 제3자 제공 */}
          <h3 style={{
            fontSize: 16,
            fontWeight: 700,
            color: "var(--foreground)",
            marginBottom: 12,
          }}>
            제3자 제공
          </h3>
          <p style={{
            fontSize: 15,
            color: "var(--foreground)",
            lineHeight: 1.7,
            marginBottom: 24,
          }}>
            DPH는 사용자의 동의 없이 개인정보를 제3자에게 제공하지 않습니다.
          </p>

          {/* 쿠키 사용 */}
          <h3 style={{
            fontSize: 16,
            fontWeight: 700,
            color: "var(--foreground)",
            marginBottom: 12,
          }}>
            쿠키 사용
          </h3>
          <p style={{
            fontSize: 15,
            color: "var(--foreground)",
            lineHeight: 1.7,
            marginBottom: 24,
          }}>
            DPH는 로그인 상태 유지와 서비스 개선을 위해 쿠키를 사용합니다. 브라우저 설정에서 쿠키 사용을 거부할 수 있으나, 일부 기능 이용이 제한될 수 있습니다.
          </p>

          {/* 보안 */}
          <h3 style={{
            fontSize: 16,
            fontWeight: 700,
            color: "var(--foreground)",
            marginBottom: 12,
          }}>
            보안
          </h3>
          <p style={{
            fontSize: 15,
            color: "var(--foreground)",
            lineHeight: 1.7,
            marginBottom: 24,
          }}>
            DPH는 개인정보 보호를 위해 기술적, 관리적 보안 조치를 취하고 있습니다.
          </p>

          {/* 문의 */}
          <h3 style={{
            fontSize: 16,
            fontWeight: 700,
            color: "var(--foreground)",
            marginBottom: 12,
          }}>
            문의
          </h3>
          <p style={{
            fontSize: 15,
            color: "var(--foreground)",
            lineHeight: 1.7,
          }}>
            개인정보 처리방침에 관한 문의는 support@dph.com으로 연락주시기 바랍니다.
          </p>
        </div>

        <div style={{
          background: "var(--muted)",
          borderRadius: 12,
          padding: "16px",
          textAlign: "center",
        }}>
          <p style={{
            fontSize: 13,
            color: "var(--muted-foreground)",
            margin: 0,
          }}>
            마지막 업데이트: 2026년 6월 5일
          </p>
        </div>
      </PageContent>
    </MobilePage>
  );
}
