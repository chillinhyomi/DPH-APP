import { MobilePage, PageHeader, PageContent } from "../components/MobilePage";

export function TermsOfServicePage() {
  return (
    <MobilePage>
      <PageHeader title="이용약관" showBack={true} />

      <PageContent>
        <div style={{
          background: "var(--card)",
          borderRadius: 16,
          padding: "24px",
          border: "1px solid var(--border)",
          marginBottom: 16,
        }}>
          {/* 제1조 */}
          <h3 style={{
            fontSize: 16,
            fontWeight: 700,
            color: "var(--foreground)",
            marginBottom: 8,
          }}>
            제1조 (목적)
          </h3>
          <p style={{
            fontSize: 15,
            color: "var(--foreground)",
            lineHeight: 1.7,
            marginBottom: 24,
          }}>
            본 약관은 DPH 서비스 이용 시 사용자의 권리와 의무를 정의합니다.
          </p>

          {/* 제2조 */}
          <h3 style={{
            fontSize: 16,
            fontWeight: 700,
            color: "var(--foreground)",
            marginBottom: 8,
          }}>
            제2조 (서비스 이용)
          </h3>
          <p style={{
            fontSize: 15,
            color: "var(--foreground)",
            lineHeight: 1.7,
            marginBottom: 24,
          }}>
            사용자는 플랫폼이 제공하는 기능을 자유롭게 이용할 수 있습니다.
          </p>

          {/* 제3조 */}
          <h3 style={{
            fontSize: 16,
            fontWeight: 700,
            color: "var(--foreground)",
            marginBottom: 8,
          }}>
            제3조 (금지 행위)
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
              <li>다른 사용자의 계정 사용</li>
              <li>저작권 침해</li>
              <li>불법 콘텐츠 업로드</li>
              <li>서비스 운영 방해</li>
            </ul>
          </div>

          {/* 제4조 */}
          <h3 style={{
            fontSize: 16,
            fontWeight: 700,
            color: "var(--foreground)",
            marginBottom: 8,
          }}>
            제4조 (서비스 변경)
          </h3>
          <p style={{
            fontSize: 15,
            color: "var(--foreground)",
            lineHeight: 1.7,
            marginBottom: 24,
          }}>
            DPH는 필요 시 기능과 서비스를 변경할 수 있는 권리를 보유합니다.
          </p>

          {/* 제5조 */}
          <h3 style={{
            fontSize: 16,
            fontWeight: 700,
            color: "var(--foreground)",
            marginBottom: 8,
          }}>
            제5조 (계정 삭제)
          </h3>
          <p style={{
            fontSize: 15,
            color: "var(--foreground)",
            lineHeight: 1.7,
            marginBottom: 24,
          }}>
            사용자는 언제든지 계정을 삭제할 수 있습니다.
          </p>

          {/* 제6조 */}
          <h3 style={{
            fontSize: 16,
            fontWeight: 700,
            color: "var(--foreground)",
            marginBottom: 8,
          }}>
            제6조 (책임 제한)
          </h3>
          <p style={{
            fontSize: 15,
            color: "var(--foreground)",
            lineHeight: 1.7,
            marginBottom: 24,
          }}>
            DPH는 서비스 이용으로 인한 직간접적 손해에 대해 법적 책임을 지지 않습니다. 단, 고의 또는 중대한 과실이 있는 경우는 예외로 합니다.
          </p>

          {/* 제7조 */}
          <h3 style={{
            fontSize: 16,
            fontWeight: 700,
            color: "var(--foreground)",
            marginBottom: 8,
          }}>
            제7조 (지적 재산권)
          </h3>
          <p style={{
            fontSize: 15,
            color: "var(--foreground)",
            lineHeight: 1.7,
            marginBottom: 24,
          }}>
            사용자가 업로드한 콘텐츠에 대한 저작권은 해당 사용자에게 있습니다. DPH는 서비스 제공 목적으로만 콘텐츠를 사용할 수 있습니다.
          </p>

          {/* 제8조 */}
          <h3 style={{
            fontSize: 16,
            fontWeight: 700,
            color: "var(--foreground)",
            marginBottom: 8,
          }}>
            제8조 (서비스 중단)
          </h3>
          <p style={{
            fontSize: 15,
            color: "var(--foreground)",
            lineHeight: 1.7,
            marginBottom: 24,
          }}>
            DPH는 시스템 점검, 보수, 기술적 문제 등으로 인해 서비스를 일시 중단할 수 있으며, 사전에 공지합니다.
          </p>

          {/* 제9조 */}
          <h3 style={{
            fontSize: 16,
            fontWeight: 700,
            color: "var(--foreground)",
            marginBottom: 8,
          }}>
            제9조 (약관 변경)
          </h3>
          <p style={{
            fontSize: 15,
            color: "var(--foreground)",
            lineHeight: 1.7,
            marginBottom: 24,
          }}>
            DPH는 필요 시 본 약관을 변경할 수 있으며, 변경 사항은 서비스 내 공지를 통해 안내됩니다.
          </p>

          {/* 제10조 */}
          <h3 style={{
            fontSize: 16,
            fontWeight: 700,
            color: "var(--foreground)",
            marginBottom: 8,
          }}>
            제10조 (분쟁 해결)
          </h3>
          <p style={{
            fontSize: 15,
            color: "var(--foreground)",
            lineHeight: 1.7,
          }}>
            본 약관과 관련한 분쟁은 대한민국 법률에 따라 해결됩니다.
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
            시행일: 2026년 6월 5일
          </p>
        </div>
      </PageContent>
    </MobilePage>
  );
}
