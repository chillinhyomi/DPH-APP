import { useState } from "react";
import { Upload, Music, Video, FileText, Image, Search, Download, Trash2, Eye, FolderOpen } from "lucide-react";
import { useApp } from "../context/AppContext";
import { MobilePage, PageHeader, PageContent } from "../components/MobilePage";

type FileType = "음악" | "영상" | "문서" | "이미지";

interface MockFile {
  id: string;
  name: string;
  type: FileType;
  size: string;
  projectId: string;
  uploadedBy: string;
  uploadedAt: string;
  description: string;
}

const MOCK_FILES: MockFile[] = [
  { id: "file1", name: "봄_정기공연_BGM.mp3", type: "음악", size: "8.2 MB", projectId: "proj-1", uploadedBy: "김민준", uploadedAt: "2026-05-20", description: "2026 봄 정기공연 메인 배경음악" },
  { id: "file2", name: "인트로_브이드럼.mp3", type: "음악", size: "3.1 MB", projectId: "proj-1", uploadedBy: "김민준", uploadedAt: "2026-05-18", description: "오프닝 인트로 음원" },
  { id: "file3", name: "안무_레퍼런스_영상.mp4", type: "영상", size: "124 MB", projectId: "proj-1", uploadedBy: "이수빈", uploadedAt: "2026-05-15", description: "안무 참고 영상 - 원본 아티스트 무대" },
  { id: "file4", name: "연습_영상_0525.mp4", type: "영상", size: "210 MB", projectId: "proj-1", uploadedBy: "박예린", uploadedAt: "2026-05-25", description: "5월 25일 합동 연습 영상" },
  { id: "file5", name: "무대_도면.pdf", type: "문서", size: "2.4 MB", projectId: "proj-1", uploadedBy: "김민준", uploadedAt: "2026-05-10", description: "한양대 백남음악관 무대 도면" },
  { id: "file6", name: "안무_악보.pdf", type: "문서", size: "1.8 MB", projectId: "proj-1", uploadedBy: "최도윤", uploadedAt: "2026-05-12", description: "공연 음악 악보 및 안무 큐시트" },
  { id: "file7", name: "의상_레퍼런스.jpg", type: "이미지", size: "4.5 MB", projectId: "proj-1", uploadedBy: "정서연", uploadedAt: "2026-05-22", description: "공연 의상 참고 이미지" },
  { id: "file8", name: "버스킹_음악.mp3", type: "음악", size: "5.7 MB", projectId: "proj-2", uploadedBy: "김민준", uploadedAt: "2026-05-16", description: "버스킹 퍼포먼스 배경음악" },
  { id: "file9", name: "홍대_위치도.pdf", type: "문서", size: "0.8 MB", projectId: "proj-2", uploadedBy: "이수빈", uploadedAt: "2026-05-17", description: "버스킹 장소 위치 및 무대 안내" },
  { id: "file10", name: "경연_음악_편집본.mp3", type: "음악", size: "6.3 MB", projectId: "proj-3", uploadedBy: "김민준", uploadedAt: "2026-05-23", description: "축제 경연대회 음악 편집본" },
];

const FILE_ICONS: Record<FileType, typeof Music> = {
  음악: Music,
  영상: Video,
  문서: FileText,
  이미지: Image,
};

const FILE_COLORS: Record<FileType, string> = {
  음악: "var(--accent)",
  영상: "#EF4444",
  문서: "#0EA5E9",
  이미지: "#10B981",
};

const FILE_BG: Record<FileType, string> = {
  음악: "#EDE9FE",
  영상: "#FEE2E2",
  문서: "#E0F2FE",
  이미지: "#D1FAE5",
};

export function FilesPage() {
  const { projects } = useApp();
  const [files] = useState<MockFile[]>(MOCK_FILES);
  const [selectedProjectId, setSelectedProjectId] = useState<string | "all">("all");
  const [selectedType, setSelectedType] = useState<FileType | "전체">("전체");
  const [searchQuery, setSearchQuery] = useState("");
  const [showUpload, setShowUpload] = useState(false);

  const filtered = files.filter(f => {
    const matchProject = selectedProjectId === "all" || f.projectId === selectedProjectId;
    const matchType = selectedType === "전체" || f.type === selectedType;
    const matchSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase()) || f.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchProject && matchType && matchSearch;
  });

  const stats = {
    음악: files.filter(f => f.type === "음악").length,
    영상: files.filter(f => f.type === "영상").length,
    문서: files.filter(f => f.type === "문서").length,
    이미지: files.filter(f => f.type === "이미지").length,
  };

  return (
    <>
      {showUpload && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.5)",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: "blur(4px)",
          padding: "16px",
        }}>
          <div style={{
            background: "var(--card)",
            borderRadius: 16,
            padding: "24px",
            width: "100%",
            maxWidth: 400,
            boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
          }}>
            <h2 style={{
              fontSize: 18,
              fontWeight: 700,
              color: "var(--foreground)",
              marginBottom: 20,
            }}>
              파일 업로드
            </h2>

            <div style={{
              border: "2px dashed var(--border)",
              borderRadius: 12,
              padding: "32px 16px",
              textAlign: "center",
              marginBottom: 16,
              cursor: "pointer",
              background: "var(--muted)",
            }}>
              <Upload size={32} color="var(--muted-foreground)" style={{ margin: "0 auto 12px" }} />
              <p style={{
                fontSize: 14,
                color: "var(--foreground)",
                fontWeight: 600,
              }}>
                파일을 드래그하거나 클릭하여 업로드
              </p>
              <p style={{
                fontSize: 12,
                color: "var(--muted-foreground)",
                marginTop: 4,
              }}>
                음악, 영상, 문서, 이미지 지원 (최대 500MB)
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <select style={{
                padding: "12px",
                borderRadius: 12,
                border: "1px solid var(--border)",
                background: "var(--card)",
                fontSize: 15,
                color: "var(--foreground)",
                outline: "none",
                minHeight: 48,
              }}>
                <option value="">프로젝트 선택</option>
                {projects.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
              </select>

              <input
                placeholder="파일 설명 (선택사항)"
                style={{
                  padding: "12px",
                  borderRadius: 12,
                  border: "1px solid var(--border)",
                  background: "var(--card)",
                  fontSize: 15,
                  color: "var(--foreground)",
                  outline: "none",
                  minHeight: 48,
                }}
              />
            </div>

            <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
              <button
                onClick={() => setShowUpload(false)}
                style={{
                  flex: 1,
                  padding: "14px",
                  borderRadius: 12,
                  background: "var(--muted)",
                  color: "var(--foreground)",
                  fontSize: 15,
                  fontWeight: 700,
                  border: "none",
                  cursor: "pointer",
                  minHeight: 48,
                }}
              >
                취소
              </button>
              <button
                onClick={() => setShowUpload(false)}
                style={{
                  flex: 1,
                  padding: "14px",
                  borderRadius: 12,
                  background: "var(--accent)",
                  color: "white",
                  fontSize: 15,
                  fontWeight: 700,
                  border: "none",
                  cursor: "pointer",
                  minHeight: 48,
                }}
              >
                업로드
              </button>
            </div>
          </div>
        </div>
      )}

      <MobilePage>
        <PageHeader
          title="자료실"
          subtitle={`총 ${files.length}개의 파일`}
          showBack={true}
          action={
            <button
              onClick={() => setShowUpload(true)}
              style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                background: "var(--accent)",
                color: "white",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: 48,
              }}
            >
              <Upload size={24} strokeWidth={2.5} />
            </button>
          }
        />

        {/* Category Cards */}
        <div style={{
          background: "var(--card)",
          padding: "16px",
          borderBottom: "1px solid var(--border)",
        }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 12,
          }}>
            {(["음악", "영상", "문서", "이미지"] as FileType[]).map(type => {
              const Icon = FILE_ICONS[type];
              const isActive = selectedType === type;
              return (
                <button
                  key={type}
                  onClick={() => setSelectedType(selectedType === type ? "전체" : type)}
                  style={{
                    padding: "16px",
                    borderRadius: 12,
                    background: isActive ? FILE_BG[type] : "var(--muted)",
                    border: isActive ? `2px solid ${FILE_COLORS[type]}` : "1px solid var(--border)",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 8,
                    minHeight: 48,
                  }}
                >
                  <Icon size={24} color={FILE_COLORS[type]} />
                  <div style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: isActive ? FILE_COLORS[type] : "var(--foreground)",
                  }}>
                    {type}
                  </div>
                  <div style={{
                    fontSize: 12,
                    color: isActive ? FILE_COLORS[type] : "var(--muted-foreground)",
                  }}>
                    {stats[type]}개
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <PageContent>
          {/* Search + Filter */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 16 }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "12px 16px",
              borderRadius: 12,
              border: "1px solid var(--border)",
              background: "var(--card)",
            }}>
              <Search size={18} color="var(--muted-foreground)" />
              <input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="파일명 또는 설명 검색..."
                style={{
                  flex: 1,
                  border: "none",
                  outline: "none",
                  fontSize: 15,
                  background: "transparent",
                  color: "var(--foreground)",
                  minHeight: 24,
                }}
              />
            </div>

            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "12px 16px",
              borderRadius: 12,
              border: "1px solid var(--border)",
              background: "var(--card)",
            }}>
              <FolderOpen size={18} color="var(--muted-foreground)" />
              <select
                value={selectedProjectId}
                onChange={e => setSelectedProjectId(e.target.value)}
                style={{
                  flex: 1,
                  border: "none",
                  outline: "none",
                  fontSize: 15,
                  background: "transparent",
                  cursor: "pointer",
                  color: "var(--foreground)",
                  minHeight: 24,
                }}
              >
                <option value="all">전체 프로젝트</option>
                {projects.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
              </select>
            </div>
          </div>

          {/* File List */}
          {filtered.length === 0 ? (
            <div style={{
              background: "var(--card)",
              borderRadius: 16,
              padding: "48px 24px",
              textAlign: "center",
              border: "1px solid var(--border)",
            }}>
              <div style={{
                width: 64,
                height: 64,
                borderRadius: 16,
                background: "var(--muted)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
              }}>
                <Search size={32} color="var(--muted-foreground)" />
              </div>
              <p style={{
                fontSize: 16,
                fontWeight: 700,
                color: "var(--foreground)",
                marginBottom: 8,
              }}>
                검색 결과가 없습니다
              </p>
              <p style={{
                fontSize: 14,
                color: "var(--muted-foreground)",
              }}>
                다른 검색어를 시도해보세요
              </p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {filtered.map(file => {
                const Icon = FILE_ICONS[file.type];
                const color = FILE_COLORS[file.type];
                const bg = FILE_BG[file.type];
                return (
                  <div
                    key={file.id}
                    style={{
                      background: "var(--card)",
                      borderRadius: 16,
                      padding: "16px",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{
                        width: 48,
                        height: 48,
                        borderRadius: 12,
                        background: bg,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}>
                        <Icon size={24} color={color} />
                      </div>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{
                          fontSize: 15,
                          fontWeight: 700,
                          color: "var(--foreground)",
                          marginBottom: 4,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}>
                          {file.name}
                        </div>
                        <div style={{
                          fontSize: 13,
                          color: "var(--muted-foreground)",
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                        }}>
                          <span>{file.size}</span>
                          <span>·</span>
                          <span>{file.uploadedAt}</span>
                        </div>
                      </div>

                      <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                        <button style={{
                          width: 40,
                          height: 40,
                          borderRadius: 10,
                          background: "var(--muted)",
                          border: "none",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}>
                          <Eye size={16} color="var(--foreground)" />
                        </button>
                        <button style={{
                          width: 40,
                          height: 40,
                          borderRadius: 10,
                          background: "var(--muted)",
                          border: "none",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}>
                          <Download size={16} color="var(--foreground)" />
                        </button>
                        <button style={{
                          width: 40,
                          height: 40,
                          borderRadius: 10,
                          background: "#FEE2E2",
                          border: "none",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}>
                          <Trash2 size={16} color="#EF4444" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </PageContent>
      </MobilePage>
    </>
  );
}
