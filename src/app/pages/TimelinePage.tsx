import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { Plus, Music, Clock, Upload, Play, Pause, X } from "lucide-react";
import { useApp } from "../context/AppContext";
import { MobilePage, PageHeader, PageContent } from "../components/MobilePage";

interface TimelineItem {
  id: string;
  time: string;
  title: string;
  section: string;
  formationId?: string;
}

const MOCK_TIMELINE: Record<string, TimelineItem[]> = {
  "proj-1": [
    { id: "1", time: "0:00", title: "오프닝 포메이션", section: "인트로", formationId: "f1" },
    { id: "2", time: "0:32", title: "1절 시작", section: "1절", formationId: "f2" },
    { id: "3", time: "1:04", title: "후렴 집결", section: "후렴", formationId: "f3" },
    { id: "4", time: "1:28", title: "브릿지 전환", section: "브릿지", formationId: "f4" },
    { id: "5", time: "1:44", title: "엔딩 포메이션", section: "엔딩", formationId: "f5" },
  ],
  "proj-2": [
    { id: "6", time: "0:00", title: "인트로", section: "시작" },
    { id: "7", time: "0:06", title: "메인 포메이션", section: "메인", formationId: "f6" },
  ],
};

export function TimelinePage() {
  const navigate = useNavigate();
  const { projects, musicFiles, uploadMusic, removeMusic } = useApp();
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0]?.id || "");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const selectedProject = projects.find(p => p.id === selectedProjectId);
  const timeline = MOCK_TIMELINE[selectedProjectId] || [];
  const currentMusic = musicFiles[selectedProjectId];

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Clear any previous error
    setUploadError("");

    // Validate file type
    const validTypes = ["audio/mpeg", "audio/wav", "audio/mp4", "audio/aac", "audio/m4a", "audio/x-m4a"];
    const validExtensions = [".mp3", ".wav", ".m4a", ".aac"];
    const fileExtension = file.name.toLowerCase().slice(file.name.lastIndexOf("."));

    if (!validTypes.includes(file.type) && !validExtensions.includes(fileExtension)) {
      setUploadError("지원하지 않는 파일 형식입니다. MP3, WAV, M4A, AAC 파일만 업로드 가능합니다.");
      return;
    }

    // Validate file size (max 100MB)
    if (file.size > 100 * 1024 * 1024) {
      setUploadError("파일 크기가 너무 큽니다. 100MB 이하의 파일만 업로드 가능합니다.");
      return;
    }

    try {
      await uploadMusic(selectedProjectId, file);
      // Reset playback state
      setIsPlaying(false);
      setCurrentTime(0);
    } catch (error) {
      setUploadError("음악 파일 업로드에 실패했습니다. 다시 시도해주세요.");
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handlePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleRemoveMusic = () => {
    if (confirm("음악 파일을 삭제하시겠습니까?")) {
      removeMusic(selectedProjectId);
      setIsPlaying(false);
      setCurrentTime(0);
      setDuration(0);
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <MobilePage>
      <PageHeader
        title="타임라인"
        subtitle={selectedProject?.title || "프로젝트 선택"}
        action={
          <button
            onClick={() => selectedProjectId && navigate(`/project/${selectedProjectId}`)}
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
            <Plus size={24} strokeWidth={2.5} />
          </button>
        }
      />

      {/* Project Selector */}
      <div style={{ background: "var(--card)", padding: "12px 16px", borderBottom: "1px solid var(--border)" }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: "var(--muted-foreground)", marginBottom: 8 }}>프로젝트 선택</p>
        <div style={{ display: "flex", gap: 8, overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
          {projects.map(p => {
            const isActive = p.id === selectedProjectId;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedProjectId(p.id)}
                style={{
                  padding: "10px 16px",
                  borderRadius: 12,
                  background: isActive ? "var(--accent)" : "var(--muted)",
                  border: "none",
                  cursor: "pointer",
                  flexShrink: 0,
                  fontSize: 14,
                  fontWeight: 700,
                  color: isActive ? "white" : "var(--foreground)",
                  whiteSpace: "nowrap",
                  minHeight: 44,
                }}
              >
                {p.title}
              </button>
            );
          })}
        </div>
      </div>

      <PageContent>
        {/* Music Section */}
        <div style={{
          background: "var(--card)",
          borderRadius: 16,
          padding: "16px",
          border: "1px solid var(--border)",
          marginBottom: 16,
        }}>
          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="audio/mpeg,audio/wav,audio/mp4,audio/aac,audio/m4a,.mp3,.wav,.m4a,.aac"
            onChange={handleFileSelect}
            style={{ display: "none" }}
          />

          {/* Hidden audio element */}
          {currentMusic && (
            <audio
              ref={audioRef}
              src={currentMusic.fileUrl}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={() => setIsPlaying(false)}
            />
          )}

          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
            <div style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: currentMusic ? "var(--accent)" : "var(--muted)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: currentMusic ? 1 : 0.3,
            }}>
              <Music size={24} color={currentMusic ? "white" : "var(--muted-foreground)"} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: "var(--foreground)" }}>
                {currentMusic ? currentMusic.fileName : "음악 파일"}
              </div>
              <div style={{ fontSize: 13, color: "var(--muted-foreground)", marginTop: 2 }}>
                {currentMusic ? `${formatTime(duration)} / ${(currentMusic.duration || 0).toFixed(0)}초` : "MP3, WAV, M4A, AAC 지원"}
              </div>
            </div>
            {currentMusic && (
              <button
                onClick={handleRemoveMusic}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: "#FEE2E2",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <X size={18} color="var(--destructive)" />
              </button>
            )}
          </div>

          {/* Error message */}
          {uploadError && (
            <div style={{
              padding: "12px",
              borderRadius: 10,
              background: "#FEE2E2",
              border: "1px solid var(--destructive)",
              marginBottom: 12,
            }}>
              <p style={{ fontSize: 13, color: "var(--destructive)", lineHeight: 1.5 }}>
                {uploadError}
              </p>
            </div>
          )}

          {/* Music player controls */}
          {currentMusic ? (
            <div style={{ marginBottom: 12 }}>
              {/* Progress bar */}
              <div style={{ marginBottom: 12 }}>
                <input
                  type="range"
                  min="0"
                  max={duration || 0}
                  value={currentTime}
                  onChange={handleSeek}
                  style={{
                    width: "100%",
                    height: 6,
                    borderRadius: 3,
                    appearance: "none",
                    background: `linear-gradient(to right, var(--accent) 0%, var(--accent) ${(currentTime / duration) * 100}%, var(--muted) ${(currentTime / duration) * 100}%, var(--muted) 100%)`,
                    cursor: "pointer",
                    outline: "none",
                  }}
                />
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 4,
                  fontSize: 12,
                  color: "var(--muted-foreground)",
                }}>
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Play/Pause button */}
              <button
                onClick={handlePlayPause}
                style={{
                  width: "100%",
                  padding: "14px",
                  borderRadius: 12,
                  background: "var(--accent)",
                  color: "white",
                  fontSize: 15,
                  fontWeight: 700,
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  minHeight: 48,
                }}
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                {isPlaying ? "일시정지" : "재생"}
              </button>
            </div>
          ) : (
            <button
              onClick={() => fileInputRef.current?.click()}
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: 12,
                background: "var(--accent)",
                color: "white",
                fontSize: 15,
                fontWeight: 700,
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                minHeight: 48,
              }}
            >
              <Upload size={20} />
              음악 업로드
            </button>
          )}
        </div>

        {/* Timeline */}
        {timeline.length === 0 ? (
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
              <Clock size={32} color="var(--muted-foreground)" />
            </div>
            <p style={{ fontSize: 16, fontWeight: 700, color: "var(--foreground)", marginBottom: 8 }}>
              타임라인이 비어있습니다
            </p>
            <p style={{ fontSize: 14, color: "var(--muted-foreground)", marginBottom: 24 }}>
              편집기에서 타임라인을 만들어보세요
            </p>
            <button
              onClick={() => selectedProjectId && navigate(`/project/${selectedProjectId}`)}
              style={{
                padding: "14px 24px",
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
              편집기 열기
            </button>
          </div>
        ) : (
          <div>
            <h3 style={{
              fontSize: 16,
              fontWeight: 700,
              color: "var(--foreground)",
              marginBottom: 12,
            }}>
              곡 타임라인
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {timeline.map((item, idx) => (
                <div
                  key={item.id}
                  onClick={() => item.formationId && navigate(`/project/${selectedProjectId}`)}
                  style={{
                    background: "var(--card)",
                    borderRadius: 16,
                    padding: "16px",
                    border: "1px solid var(--border)",
                    cursor: item.formationId ? "pointer" : "default",
                    position: "relative",
                  }}
                >
                  {/* Timeline connector */}
                  {idx < timeline.length - 1 && (
                    <div style={{
                      position: "absolute",
                      left: 30,
                      top: "100%",
                      width: 2,
                      height: 12,
                      background: "var(--border)",
                    }} />
                  )}

                  <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                    <div style={{
                      width: 48,
                      height: 48,
                      borderRadius: 12,
                      background: "var(--accent)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}>
                      <span style={{
                        fontSize: 16,
                        fontWeight: 800,
                        color: "white",
                        lineHeight: 1,
                      }}>
                        {item.time}
                      </span>
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontSize: 15,
                        fontWeight: 700,
                        color: "var(--foreground)",
                        marginBottom: 4,
                      }}>
                        {item.title}
                      </div>
                      <div style={{
                        display: "inline-block",
                        fontSize: 12,
                        fontWeight: 600,
                        color: "var(--accent)",
                        background: "var(--muted)",
                        borderRadius: 8,
                        padding: "4px 10px",
                      }}>
                        {item.section}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </PageContent>

      <style>{`
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: var(--accent);
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        input[type="range"]::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: var(--accent);
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </MobilePage>
  );
}
