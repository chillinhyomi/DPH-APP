import { useState, useCallback, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { ChevronLeft, Share2, Eye, Settings, Play, Pause, SkipBack, SkipForward, Save, Users, Upload, Music, X } from "lucide-react";
import { useApp, Formation, Member, Position } from "../context/AppContext";
import { StageCanvas } from "../components/workspace/StageCanvas";
import { MemberPanel } from "../components/workspace/MemberPanel";
import { PropertyPanel } from "../components/workspace/PropertyPanel";
import { FormationPanel } from "../components/workspace/FormationPanel";

export function ProjectWorkspacePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { projects, members: allMembers, formations: allFormations, musicFiles, uploadMusic, removeMusic, updateFormations, updateMembers, DANCER_COLORS } = useApp();

  const project = projects.find(p => p.id === id);
  const projectMembers = allMembers[id!] || [];
  const projectMusic = musicFiles[id!];
  const [formations, setFormations] = useState<Formation[]>(allFormations[id!] || []);
  const [members, setMembers] = useState<Member[]>(projectMembers);
  const [activeFormationId, setActiveFormationId] = useState<string | null>(formations[0]?.id || null);
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [saved, setSaved] = useState(false);

  // Panel visibility states
  const [showMemberPanel, setShowMemberPanel] = useState(true);
  const [showPropertyPanel, setShowPropertyPanel] = useState(true);

  // Music upload states
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showMusicInfo, setShowMusicInfo] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const activeFormation = formations.find(f => f.id === activeFormationId) || null;
  const selectedMember = members.find(m => m.id === selectedMemberId) || null;

  if (!project) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 16, background: "#F8FAFC" }}>
        <p style={{ fontSize: 16, color: "#6B7280" }}>프로젝트를 찾을 수 없습니다.</p>
        <button onClick={() => navigate("/projects")} style={{ padding: "10px 20px", borderRadius: 10, background: "#6C3AED", color: "white", border: "none", cursor: "pointer", fontSize: 14, fontWeight: 700 }}>
          프로젝트 목록으로
        </button>
      </div>
    );
  }

  function handlePositionChange(memberId: string, x: number, y: number) {
    setFormations(prev => prev.map(f => {
      if (f.id !== activeFormationId) return f;
      const hasPos = f.positions.find(p => p.memberId === memberId);
      const newPositions: Position[] = hasPos
        ? f.positions.map(p => p.memberId === memberId ? { ...p, x, y } : p)
        : [...f.positions, { memberId, x, y }];
      return { ...f, positions: newPositions };
    }));
  }

  function handleAddFormation() {
    const names = ["오프닝", "1절", "후렴", "브릿지", "엔딩", "파트1", "파트2", "파트3"];
    const existingNames = new Set(formations.map(f => f.name));
    const newName = names.find(n => !existingNames.has(n)) || `포메이션 ${formations.length + 1}`;
    const newId = `f-${Date.now()}`;
    const newF: Formation = {
      id: newId,
      projectId: id!,
      name: newName,
      order: formations.length,
      duration: 8,
      positions: activeFormation
        ? activeFormation.positions.map(p => ({ ...p }))
        : members.slice(0, 6).map((m, i) => ({ memberId: m.id, x: 0.2 + (i % 3) * 0.3, y: 0.3 + Math.floor(i / 3) * 0.4 })),
    };
    const updated = [...formations, newF];
    setFormations(updated);
    setActiveFormationId(newId);
  }

  function handleDeleteFormation(fid: string) {
    const updated = formations.filter(f => f.id !== fid);
    setFormations(updated);
    if (activeFormationId === fid) setActiveFormationId(updated[0]?.id || null);
  }

  function handleDuplicateFormation(fid: string) {
    const orig = formations.find(f => f.id === fid);
    if (!orig) return;
    const newId = `f-${Date.now()}`;
    const dup: Formation = { ...orig, id: newId, name: `${orig.name} (복사)`, order: formations.length, positions: orig.positions.map(p => ({ ...p })) };
    const updated = [...formations, dup];
    setFormations(updated);
    setActiveFormationId(newId);
  }

  function handleRenameFormation(fid: string, name: string) {
    setFormations(prev => prev.map(f => f.id === fid ? { ...f, name } : f));
  }

  function handleAddMember(name: string, color: string) {
    const newM: Member = { id: `m-${Date.now()}`, projectId: id!, userId: `u-${Date.now()}`, name, color, role: "editor", dancerRole: "댄서" };
    const updated = [...members, newM];
    setMembers(updated);
    // Add to active formation with default position
    if (activeFormationId) {
      const idx = updated.length - 1;
      handlePositionChange(newM.id, 0.1 + (idx % 5) * 0.18, 0.3 + Math.floor(idx / 5) * 0.35);
    }
  }

  function handleUpdateMember(m: Member) {
    setMembers(prev => prev.map(x => x.id === m.id ? m : x));
  }

  function handleSave() {
    updateFormations(id!, formations);
    updateMembers(id!, members);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  // Music upload handlers
  async function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validFormats = ['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/m4a', 'audio/aac', 'audio/x-m4a'];
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    const validExtensions = ['mp3', 'wav', 'm4a', 'aac'];

    if (!validFormats.includes(file.type) && !validExtensions.includes(fileExtension || '')) {
      setUploadError('지원하지 않는 파일 형식입니다. MP3, WAV, M4A, AAC 파일만 업로드 가능합니다.');
      return;
    }

    setUploadError(null);
    setIsUploading(true);

    try {
      const musicFile = await uploadMusic(id!, file);

      // Load the audio file into the audio element
      if (audioRef.current) {
        audioRef.current.src = musicFile.fileUrl;
        audioRef.current.load();
      }

      setShowMusicInfo(true);
    } catch (error) {
      setUploadError('음악 파일 업로드에 실패했습니다. 다시 시도해주세요.');
      console.error('Music upload error:', error);
    } finally {
      setIsUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  }

  function handleRemoveMusic() {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
    }
    removeMusic(id!);
    setIsPlaying(false);
    setShowMusicInfo(false);
  }

  function handlePlayPause() {
    if (!isPlaying && formations.length > 0) {
      setIsPlaying(true);

      // If music is loaded, play it
      if (audioRef.current && projectMusic) {
        audioRef.current.play().catch(err => {
          console.error('Audio playback failed:', err);
          setIsPlaying(false);
        });
      }

      let idx = formations.findIndex(f => f.id === activeFormationId);
      function advance() {
        idx = (idx + 1) % formations.length;
        setActiveFormationId(formations[idx].id);
        if (idx < formations.length - 1) {
          setTimeout(advance, (formations[idx].duration || 4) * 500);
        } else {
          setIsPlaying(false);
          if (audioRef.current) {
            audioRef.current.pause();
          }
        }
      }
      setTimeout(advance, (activeFormation?.duration || 4) * 500);
    } else {
      setIsPlaying(false);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    }
  }

  // Handle audio end
  useEffect(() => {
    if (!audioRef.current) return;

    const handleEnded = () => {
      setIsPlaying(false);
    };

    audioRef.current.addEventListener('ended', handleEnded);
    return () => audioRef.current?.removeEventListener('ended', handleEnded);
  }, []);

  const currentFormationIdx = formations.findIndex(f => f.id === activeFormationId);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden", background: "#0F0A1E", fontFamily: "var(--font-family)" }}>
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="audio/mpeg,audio/mp3,audio/wav,audio/m4a,audio/aac,.mp3,.wav,.m4a,.aac"
        onChange={handleFileUpload}
        style={{ display: "none" }}
      />

      {/* Hidden audio element */}
      <audio ref={audioRef} />

      {/* Top toolbar */}
      <header style={{ height: 52, background: "#150D2E", borderBottom: "1px solid rgba(167,139,250,0.12)", display: "flex", alignItems: "center", padding: "0 16px", gap: 12, flexShrink: 0 }}>
        <button onClick={() => navigate("/projects")} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", padding: "6px 8px", borderRadius: 8, color: "rgba(167,139,250,0.7)" }}>
          <ChevronLeft size={16} />
          <span style={{ fontSize: 13, fontWeight: 600 }}>프로젝트</span>
        </button>
        <div style={{ width: 1, height: 20, background: "rgba(167,139,250,0.15)" }} />
        <div style={{ flex: 1 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: "rgba(255,255,255,0.9)" }}>{project.title}</span>
          <span style={{ fontSize: 11, color: "rgba(167,139,250,0.5)", marginLeft: 10 }}>무대 {project.stageWidth}×{project.stageHeight}m · 멤버 {members.length}명</span>
        </div>

        {/* Playback controls */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.05)", borderRadius: 12, padding: "6px 12px", border: "1px solid rgba(167,139,250,0.1)" }}>
          <button onClick={() => setActiveFormationId(formations[Math.max(0, currentFormationIdx - 1)]?.id)} style={{ background: "none", border: "none", cursor: "pointer", padding: 2 }}>
            <SkipBack size={14} color="rgba(167,139,250,0.7)" />
          </button>
          <button onClick={handlePlayPause} style={{ width: 40, height: 40, borderRadius: "50%", background: isPlaying ? "rgba(108,58,237,0.8)" : "rgba(108,58,237,0.4)", border: "1px solid rgba(108,58,237,0.6)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {isPlaying ? <Pause size={16} color="white" fill="white" /> : <Play size={16} color="white" fill="white" style={{ marginLeft: 2 }} />}
          </button>
          <button onClick={() => setActiveFormationId(formations[Math.min(formations.length - 1, currentFormationIdx + 1)]?.id)} style={{ background: "none", border: "none", cursor: "pointer", padding: 2 }}>
            <SkipForward size={14} color="rgba(167,139,250,0.7)" />
          </button>
          <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.1)", margin: "0 4px" }} />
          {!projectMusic ? (
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              title="음악 업로드"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "6px 10px",
                borderRadius: 8,
                background: isUploading ? "rgba(255,255,255,0.05)" : "rgba(16,185,129,0.2)",
                border: "1px solid rgba(16,185,129,0.3)",
                color: "rgba(16,185,129,0.9)",
                fontSize: 12,
                fontWeight: 600,
                cursor: isUploading ? "not-allowed" : "pointer",
                opacity: isUploading ? 0.6 : 1,
              }}
            >
              <Upload size={13} />
              {isUploading ? "업로드 중..." : "음악"}
            </button>
          ) : (
            <button
              onClick={() => setShowMusicInfo(!showMusicInfo)}
              title={projectMusic.fileName}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "6px 10px",
                borderRadius: 8,
                background: "rgba(16,185,129,0.2)",
                border: "1px solid rgba(16,185,129,0.3)",
                color: "rgba(16,185,129,0.9)",
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              <Music size={13} />
              음악
            </button>
          )}
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => navigate(`/view/${id}`)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 10, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(167,139,250,0.2)", color: "rgba(167,139,250,0.8)", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
            <Eye size={14} />
            조회 화면
          </button>
          <button onClick={handleSave} style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 10, background: saved ? "rgba(16,185,129,0.3)" : "rgba(108,58,237,0.7)", border: "1px solid rgba(108,58,237,0.5)", color: "white", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
            <Save size={14} />
            {saved ? "저장됨 ✓" : "저장"}
          </button>
          <div style={{ display: "flex", gap: 6, alignItems: "center", padding: "0 4px" }}>
            {members.slice(0, 4).map(m => (
              <div key={m.id} title={m.name} style={{ width: 26, height: 26, borderRadius: 8, background: m.color, display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #150D2E" }}>
                <span style={{ fontSize: 9, fontWeight: 800, color: "white" }}>{m.name[0]}</span>
              </div>
            ))}
            {members.length > 4 && <span style={{ fontSize: 10, color: "rgba(167,139,250,0.6)", marginLeft: 2 }}>+{members.length - 4}</span>}
          </div>
        </div>
      </header>

      {/* Upload error message */}
      {uploadError && (
        <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", padding: "10px 16px", display: "flex", alignItems: "center", gap: 10 }}>
          <X size={14} color="#EF4444" />
          <span style={{ fontSize: 12, color: "#FCA5A5", flex: 1 }}>{uploadError}</span>
          <button onClick={() => setUploadError(null)} style={{ background: "none", border: "none", cursor: "pointer", padding: 2 }}>
            <X size={14} color="#EF4444" />
          </button>
        </div>
      )}

      {/* Music info popup */}
      {showMusicInfo && projectMusic && (
        <div style={{ background: "rgba(16,185,129,0.05)", border: "1px solid rgba(16,185,129,0.2)", padding: "10px 16px", display: "flex", alignItems: "center", gap: 12 }}>
          <Music size={16} color="rgba(16,185,129,0.8)" />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.9)", marginBottom: 2 }}>
              {projectMusic.fileName}
            </div>
            <div style={{ fontSize: 10, color: "rgba(167,139,250,0.6)" }}>
              재생시간: {Math.floor(projectMusic.duration / 60)}:{String(Math.floor(projectMusic.duration % 60)).padStart(2, '0')}
            </div>
          </div>
          <button
            onClick={handleRemoveMusic}
            style={{
              padding: "5px 12px",
              borderRadius: 6,
              background: "rgba(239,68,68,0.2)",
              border: "1px solid rgba(239,68,68,0.3)",
              color: "#FCA5A5",
              fontSize: 11,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            제거
          </button>
          <button onClick={() => setShowMusicInfo(false)} style={{ background: "none", border: "none", cursor: "pointer", padding: 2 }}>
            <X size={14} color="rgba(167,139,250,0.6)" />
          </button>
        </div>
      )}

      {/* Main workspace */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {/* Left: member panel */}
        {showMemberPanel && (
          <MemberPanel
            members={members}
            selectedMemberId={selectedMemberId}
            onSelectMember={setSelectedMemberId}
            onUpdateMember={handleUpdateMember}
            onAddMember={handleAddMember}
            onClose={() => setShowMemberPanel(false)}
            colors={DANCER_COLORS}
          />
        )}

        {/* Center: canvas */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {/* Formation name badge and panel toggles */}
          <div style={{ padding: "8px 16px", background: "#0F0A1E", borderBottom: "1px solid rgba(167,139,250,0.08)", display: "flex", alignItems: "center", gap: 10 }}>
            {!showMemberPanel && (
              <button
                onClick={() => setShowMemberPanel(true)}
                style={{
                  padding: "5px 10px",
                  borderRadius: 8,
                  background: "rgba(167,139,250,0.15)",
                  border: "1px solid rgba(167,139,250,0.3)",
                  color: "rgba(167,139,250,0.9)",
                  fontSize: 11,
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <Users size={12} />
                멤버
              </button>
            )}
            <span style={{ fontSize: 11, color: "rgba(167,139,250,0.5)" }}>현재 포메이션</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#C4B5FD", background: "rgba(108,58,237,0.3)", borderRadius: 8, padding: "2px 10px" }}>{activeFormation?.name || "포메이션 없음"}</span>
            <span style={{ fontSize: 11, color: "rgba(167,139,250,0.4)" }}>{currentFormationIdx + 1} / {formations.length}</span>
            {!showPropertyPanel && (
              <button
                onClick={() => setShowPropertyPanel(true)}
                style={{
                  padding: "5px 10px",
                  borderRadius: 8,
                  background: "rgba(167,139,250,0.15)",
                  border: "1px solid rgba(167,139,250,0.3)",
                  color: "rgba(167,139,250,0.9)",
                  fontSize: 11,
                  fontWeight: 600,
                  cursor: "pointer",
                  marginLeft: "auto",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <Settings size={12} />
                속성
              </button>
            )}
          </div>
          <StageCanvas
            members={members}
            formation={activeFormation}
            selectedMemberId={selectedMemberId}
            onSelectMember={setSelectedMemberId}
            onPositionChange={handlePositionChange}
            stageWidth={project.stageWidth}
            stageHeight={project.stageHeight}
          />
        </div>

        {/* Right: property panel */}
        {showPropertyPanel && (
          <PropertyPanel
            selectedMember={selectedMember}
            formation={activeFormation}
            onUpdateMember={handleUpdateMember}
            onClose={() => setShowPropertyPanel(false)}
          />
        )}
      </div>

      {/* Bottom: formation panel */}
      <FormationPanel
        formations={formations}
        activeId={activeFormationId}
        onSelect={setActiveFormationId}
        onAdd={handleAddFormation}
        onDelete={handleDeleteFormation}
        onDuplicate={handleDuplicateFormation}
        onRename={handleRenameFormation}
      />

      <style>{`
        @media (max-width: 1024px) {
          /* Hide panels by default on tablets and mobile */
          .workspace-member-panel,
          .workspace-property-panel {
            position: fixed !important;
            top: 0;
            bottom: 0;
            z-index: 200;
            transform: translateX(-100%);
            transition: transform 0.3s ease;
          }
          .workspace-member-panel.open {
            transform: translateX(0) !important;
          }
          .workspace-property-panel {
            transform: translateX(100%) !important;
            right: 0;
            left: auto;
          }
          .workspace-property-panel.open {
            transform: translateX(0) !important;
          }
        }
        @media (max-width: 768px) {
          .sidebar {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
