import { supabase } from "../lib/supabase";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// ─── Types (Firebase-ready structures) ───────────────────────────────────────

export interface User {
  uid: string;
  name: string;
  email: string;
  avatarColor: string;
  profileImage?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  stageWidth: number; // meters
  stageHeight: number;
  inviteCode: string;
  password: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
  memberCount: number;
  formationCount: number;
  isFavorite: boolean;
}

export interface Member {
  id: string;
  projectId: string;
  userId: string;
  name: string;
  color: string;
  role: "owner" | "editor" | "viewer";
  dancerRole: string;
}

export interface Position {
  memberId: string;
  x: number; // 0–1 normalized
  y: number;
}

export interface Formation {
  id: string;
  projectId: string;
  name: string;
  order: number;
  duration: number; // seconds
  positions: Position[];
}

export interface MusicFile {
  id: string;
  projectId: string;
  fileName: string;
  duration: number; // seconds
  fileUrl: string; // object URL or Firebase storage URL
  uploadedAt: string;
}

export interface Notice {
  id: string;
  projectId: string | null;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  isPinned: boolean;
  createdAt: string;
  comments: Comment[];
  attachments: string[];
}

export interface Comment {
  id: string;
  authorName: string;
  content: string;
  createdAt: string;
}

export interface ScheduleEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  startTime: string;
  endTime: string;
  type: "리허설" | "공연" | "회의" | "기타";
  place: string;
  projectId: string | null;
}

export interface QnAReply {
  id: string;
  postId: string;
  content: string;
  authorId: string;
  authorName: string;
  isAdmin: boolean;
  createdAt: string;
}

export interface QnAPost {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  isAnonymous: boolean;
  status: "waiting" | "answered";
  createdAt: string;
  updatedAt: string;
  replies: QnAReply[];
  views: number;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MOCK_USER: User = {
  uid: "user-1",
  name: "김민준",
  email: "minj@dph.kr",
  avatarColor: "#6C3AED",
};

const DANCER_COLORS = [
  "#6C3AED", "#EC4899", "#0EA5E9", "#10B981",
  "#F59E0B", "#EF4444", "#8B5CF6", "#14B8A6",
];

const MOCK_MEMBERS: Record<string, Member[]> = {
  "proj-1": [
    { id: "m1", projectId: "proj-1", userId: "user-1", name: "김민준", color: "#6C3AED", role: "owner", dancerRole: "리드댄서" },
    { id: "m2", projectId: "proj-1", userId: "user-2", name: "이지은", color: "#EC4899", role: "editor", dancerRole: "메인댄서" },
    { id: "m3", projectId: "proj-1", userId: "user-3", name: "박서준", color: "#0EA5E9", role: "editor", dancerRole: "댄서" },
    { id: "m4", projectId: "proj-1", userId: "user-4", name: "최하린", color: "#10B981", role: "editor", dancerRole: "댄서" },
    { id: "m5", projectId: "proj-1", userId: "user-5", name: "정도현", color: "#F59E0B", role: "viewer", dancerRole: "댄서" },
    { id: "m6", projectId: "proj-1", userId: "user-6", name: "한소희", color: "#EF4444", role: "editor", dancerRole: "메인댄서" },
  ],
  "proj-2": [
    { id: "m7", projectId: "proj-2", userId: "user-1", name: "김민준", color: "#6C3AED", role: "owner", dancerRole: "리드댄서" },
    { id: "m8", projectId: "proj-2", userId: "user-2", name: "이지은", color: "#EC4899", role: "editor", dancerRole: "댄서" },
    { id: "m9", projectId: "proj-2", userId: "user-7", name: "오준서", color: "#8B5CF6", role: "editor", dancerRole: "댄서" },
  ],
};

const MOCK_FORMATIONS: Record<string, Formation[]> = {
  "proj-1": [
    {
      id: "f1", projectId: "proj-1", name: "오프닝", order: 0, duration: 8,
      positions: [
        { memberId: "m1", x: 0.5, y: 0.3 },
        { memberId: "m2", x: 0.3, y: 0.5 },
        { memberId: "m3", x: 0.7, y: 0.5 },
        { memberId: "m4", x: 0.25, y: 0.7 },
        { memberId: "m5", x: 0.5, y: 0.75 },
        { memberId: "m6", x: 0.75, y: 0.7 },
      ],
    },
    {
      id: "f2", projectId: "proj-1", name: "1절", order: 1, duration: 16,
      positions: [
        { memberId: "m1", x: 0.5, y: 0.25 },
        { memberId: "m2", x: 0.2, y: 0.45 },
        { memberId: "m3", x: 0.8, y: 0.45 },
        { memberId: "m4", x: 0.35, y: 0.65 },
        { memberId: "m5", x: 0.5, y: 0.65 },
        { memberId: "m6", x: 0.65, y: 0.65 },
      ],
    },
    {
      id: "f3", projectId: "proj-1", name: "후렴", order: 2, duration: 12,
      positions: [
        { memberId: "m1", x: 0.5, y: 0.35 },
        { memberId: "m2", x: 0.15, y: 0.4 },
        { memberId: "m3", x: 0.85, y: 0.4 },
        { memberId: "m4", x: 0.3, y: 0.6 },
        { memberId: "m5", x: 0.5, y: 0.7 },
        { memberId: "m6", x: 0.7, y: 0.6 },
      ],
    },
    {
      id: "f4", projectId: "proj-1", name: "브릿지", order: 3, duration: 8,
      positions: [
        { memberId: "m1", x: 0.2, y: 0.3 },
        { memberId: "m2", x: 0.4, y: 0.3 },
        { memberId: "m3", x: 0.6, y: 0.3 },
        { memberId: "m4", x: 0.8, y: 0.3 },
        { memberId: "m5", x: 0.3, y: 0.65 },
        { memberId: "m6", x: 0.7, y: 0.65 },
      ],
    },
    {
      id: "f5", projectId: "proj-1", name: "엔딩", order: 4, duration: 8,
      positions: [
        { memberId: "m1", x: 0.5, y: 0.3 },
        { memberId: "m2", x: 0.3, y: 0.5 },
        { memberId: "m3", x: 0.7, y: 0.5 },
        { memberId: "m4", x: 0.25, y: 0.7 },
        { memberId: "m5", x: 0.5, y: 0.75 },
        { memberId: "m6", x: 0.75, y: 0.7 },
      ],
    },
  ],
  "proj-2": [
    {
      id: "f6", projectId: "proj-2", name: "인트로", order: 0, duration: 6,
      positions: [
        { memberId: "m7", x: 0.3, y: 0.4 },
        { memberId: "m8", x: 0.5, y: 0.4 },
        { memberId: "m9", x: 0.7, y: 0.4 },
      ],
    },
    {
      id: "f7", projectId: "proj-2", name: "메인", order: 1, duration: 20,
      positions: [
        { memberId: "m7", x: 0.5, y: 0.3 },
        { memberId: "m8", x: 0.3, y: 0.6 },
        { memberId: "m9", x: 0.7, y: 0.6 },
      ],
    },
  ],
};

const MOCK_PROJECTS: Project[] = [
  {
    id: "proj-1",
    title: "2026 봄 정기공연",
    description: "한양대 STEP 댄스동아리 2026년 봄 정기공연. 총 3곡 구성.",
    stageWidth: 10,
    stageHeight: 8,
    inviteCode: "STEP2026",
    password: "1234",
    ownerId: "user-1",
    createdAt: "2026-03-01",
    updatedAt: "2026-05-28",
    memberCount: 6,
    formationCount: 5,
    isFavorite: true,
  },
  {
    id: "proj-2",
    title: "버스킹 퍼포먼스",
    description: "홍대 버스킹 쇼케이스. 3인 퍼포먼스.",
    stageWidth: 6,
    stageHeight: 5,
    inviteCode: "BUSK01",
    password: "0000",
    ownerId: "user-1",
    createdAt: "2026-02-15",
    updatedAt: "2026-05-20",
    memberCount: 3,
    formationCount: 2,
    isFavorite: false,
  },
  {
    id: "proj-3",
    title: "축제 경연대회",
    description: "6월 대학 축제 경연대회 참가팀 구성 및 안무 기획.",
    stageWidth: 12,
    stageHeight: 8,
    inviteCode: "FEST26",
    password: "5678",
    ownerId: "user-1",
    createdAt: "2026-05-10",
    updatedAt: "2026-06-02",
    memberCount: 9,
    formationCount: 0,
    isFavorite: false,
  },
];

const MOCK_NOTICES: Notice[] = [
  {
    id: "n1",
    projectId: null,
    title: "[공지] DPH 서비스 오픈 안내",
    content: "DPH 댄스 퍼포밍 헬퍼 서비스가 정식 오픈되었습니다. 많은 이용 부탁드립니다. 버그 제보 및 기능 제안은 공지사항 댓글로 남겨주세요.",
    authorId: "admin",
    authorName: "DPH 운영팀",
    isPinned: true,
    createdAt: "2026-05-01",
    comments: [],
    attachments: [],
  },
  {
    id: "n2",
    projectId: "proj-1",
    title: "최종 리허설 일정 안내",
    content: "6월 15일(월) 오후 2시부터 공연장 현장 리허설을 진행합니다. 무대 의상 착용 필수. 반드시 참석해주세요.",
    authorId: "user-1",
    authorName: "김민준",
    isPinned: true,
    createdAt: "2026-05-28",
    comments: [
      { id: "c1", authorName: "이지은", content: "확인했습니다!", createdAt: "2026-05-28" },
      { id: "c2", authorName: "박서준", content: "참석 가능합니다.", createdAt: "2026-05-29" },
    ],
    attachments: [],
  },
  {
    id: "n3",
    projectId: null,
    title: "6월 연습 일정표 공유",
    content: "6월 전체 연습 일정을 공유합니다. 개인 사정으로 불참 시 사전에 알려주세요.",
    authorId: "user-1",
    authorName: "김민준",
    isPinned: false,
    createdAt: "2026-06-01",
    comments: [],
    attachments: [],
  },
];

const MOCK_SCHEDULE: ScheduleEvent[] = [
  { id: "s1", title: "합동 리허설", date: "2026-06-03", startTime: "15:00", endTime: "18:00", type: "리허설", place: "공연 연습실 B", projectId: "proj-1" },
  { id: "s2", title: "개인 안무 연습", date: "2026-06-05", startTime: "19:00", endTime: "21:00", type: "리허설", place: "자유 연습실 3", projectId: null },
  { id: "s3", title: "무대 체크", date: "2026-06-07", startTime: "10:00", endTime: "12:00", type: "기타", place: "공연장 현장", projectId: "proj-1" },
  { id: "s4", title: "경연 연습", date: "2026-06-10", startTime: "14:00", endTime: "17:00", type: "리허설", place: "소극장", projectId: "proj-3" },
  { id: "s5", title: "최종 리허설", date: "2026-06-15", startTime: "14:00", endTime: "18:00", type: "리허설", place: "공연장", projectId: "proj-1" },
  { id: "s6", title: "2026 봄 정기공연", date: "2026-06-18", startTime: "17:00", endTime: "21:00", type: "공연", place: "한양대학교 백남음악관", projectId: "proj-1" },
  { id: "s7", title: "운영진 회의", date: "2026-06-22", startTime: "19:00", endTime: "20:00", type: "회의", place: "동아리방", projectId: null },
  { id: "s8", title: "버스킹 공연", date: "2026-06-25", startTime: "16:00", endTime: "18:00", type: "공연", place: "홍대 걷고싶은거리", projectId: "proj-2" },
];

const MOCK_QNA_POSTS: QnAPost[] = [
  {
    id: "q1",
    title: "포메이션 편집 시 멤버 위치가 저장되지 않습니다",
    content: "포메이션을 편집하고 저장 버튼을 눌렀는데, 다음에 들어가면 이전 위치로 돌아가 있어요. 어떻게 해결하나요?",
    authorId: "user-1",
    authorName: "김민준",
    isAnonymous: false,
    status: "answered",
    createdAt: "2026-06-01 14:30",
    updatedAt: "2026-06-01 16:45",
    views: 24,
    replies: [
      {
        id: "r1",
        postId: "q1",
        content: "안녕하세요. 브라우저 캐시를 삭제하고 다시 시도해 보세요. 문제가 지속되면 support@dph.com으로 문의해 주세요.",
        authorId: "admin-1",
        authorName: "DPH 관리자",
        isAdmin: true,
        createdAt: "2026-06-01 16:45",
      }
    ],
  },
  {
    id: "q2",
    title: "프로젝트 초대 코드를 잃어버렸어요",
    content: "팀원들에게 공유한 초대 코드를 찾을 수 없습니다. 어디서 확인할 수 있나요?",
    authorId: "user-3",
    authorName: "익명",
    isAnonymous: true,
    status: "answered",
    createdAt: "2026-06-02 10:15",
    updatedAt: "2026-06-02 11:20",
    views: 18,
    replies: [
      {
        id: "r2",
        postId: "q2",
        content: "프로젝트 페이지 > 프로젝트 선택 > 설정 메뉴에서 초대 코드를 확인하실 수 있습니다.",
        authorId: "admin-1",
        authorName: "DPH 관리자",
        isAdmin: true,
        createdAt: "2026-06-02 11:20",
      }
    ],
  },
  {
    id: "q3",
    title: "타임라인에서 음악이 재생되지 않습니다",
    content: "음악 파일을 업로드했는데 타임라인 페이지에서 재생 버튼이 작동하지 않습니다.",
    authorId: "user-2",
    authorName: "익명",
    isAnonymous: true,
    status: "waiting",
    createdAt: "2026-06-03 09:45",
    updatedAt: "2026-06-03 09:45",
    views: 12,
    replies: [],
  },
  {
    id: "q4",
    title: "모바일에서 포메이션 편집이 어렵습니다",
    content: "모바일 화면에서 댄서 위치를 정확하게 조정하기 어려워요. 줌 기능이나 그리드 스냅 기능이 있나요?",
    authorId: "user-5",
    authorName: "정도현",
    isAnonymous: false,
    status: "waiting",
    createdAt: "2026-06-04 11:30",
    updatedAt: "2026-06-04 11:30",
    views: 8,
    replies: [],
  },
  {
    id: "q5",
    title: "프로젝트를 삭제했는데 복구할 수 있나요?",
    content: "실수로 프로젝트를 삭제했습니다. 복구 방법이 있을까요?",
    authorId: "user-4",
    authorName: "익명",
    isAnonymous: true,
    status: "answered",
    createdAt: "2026-05-30 16:00",
    updatedAt: "2026-05-30 17:15",
    views: 32,
    replies: [
      {
        id: "r3",
        postId: "q5",
        content: "죄송하지만 삭제된 프로젝트는 복구할 수 없습니다. 중요한 프로젝트는 삭제 전 백업을 권장드립니다.",
        authorId: "admin-1",
        authorName: "DPH 관리자",
        isAdmin: true,
        createdAt: "2026-05-30 17:15",
      }
    ],
  },
];

// ─── Context ──────────────────────────────────────────────────────────────────

interface AppContextType {
  currentUser: User | null;
  projects: Project[];
  members: Record<string, Member[]>;
  formations: Record<string, Formation[]>;
  musicFiles: Record<string, MusicFile | null>;
  notices: Notice[];
  scheduleEvents: ScheduleEvent[];
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
  createProject: (data: Omit<Project, "id" | "ownerId" | "createdAt" | "updatedAt" | "inviteCode" | "memberCount" | "formationCount" | "isFavorite">) => Project;
  joinProject: (inviteCode: string, password: string) => Project | null;
  updateFormations: (projectId: string, formations: Formation[]) => void;
  updateMembers: (projectId: string, members: Member[]) => void;
  uploadMusic: (projectId: string, file: File) => Promise<MusicFile>;
  removeMusic: (projectId: string) => void;
  renameProject: (projectId: string, newTitle: string) => void;
  deleteProject: (projectId: string) => void;
  toggleFavorite: (projectId: string) => void;
  addNotice: (notice: Omit<Notice, "id" | "createdAt" | "comments">) => void;
  addComment: (noticeId: string, content: string) => void;
  addScheduleEvent: (event: Omit<ScheduleEvent, "id">) => void;
  qnaPosts: QnAPost[];
  createQnAPost: (data: Omit<QnAPost, "id" | "status" | "createdAt" | "updatedAt" | "replies" | "views">) => QnAPost;
  updateQnAPost: (postId: string, data: { title: string; content: string }) => void;
  deleteQnAPost: (postId: string) => void;
  addQnAReply: (postId: string, content: string, isAdmin?: boolean) => void;
  incrementQnAViews: (postId: string) => void;
  DANCER_COLORS: string[];
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {

   const API_BASE_URL = import.meta.env.VITE_API_URL;
console.log("API_BASE_URL =", API_BASE_URL);
console.log("SUPABASE_URL =", import.meta.env.VITE_SUPABASE_URL);
console.log("SUPABASE_KEY =", import.meta.env.VITE_SUPABASE_ANON_KEY);

async function getAuthHeaders() {
  const { 
    data: { session},
   } = await supabase.auth.getSession();
  
  console.log("SESSION:", session);

  const token = session?.access_token;

  console.log("TOKEN =", token);

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

async function fetchProjects() {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_BASE_URL}/projects`, { headers });
  const data = await res.json();
  setProjects(data);
}

async function fetchNotices() {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_BASE_URL}/notices`, { headers });
  const data = await res.json();
  setNotices(data);
}

async function fetchScheduleEvents() {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_BASE_URL}/schedule-events`, { headers });
  const data = await res.json();
  setScheduleEvents(data);
}

async function fetchQnaPosts() {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_BASE_URL}/qna-posts`, { headers });
  const data = await res.json();
  setQnaPosts(data);
}

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [members, setMembers] = useState<Record<string, Member[]>>({});
  const [formations, setFormations] = useState<Record<string, Formation[]>>({});
  const [musicFiles, setMusicFiles] = useState<Record<string, MusicFile | null>>({});
  const [notices, setNotices] = useState<Notice[]>([]);
  const [scheduleEvents, setScheduleEvents] = useState<ScheduleEvent[]>([]);
  const [qnaPosts, setQnaPosts] = useState<QnAPost[]>([]);

  useEffect(() => {
  const setUserFromSession = (session: any) => {
    console.log("setUserFromSession 호출", session);
    
    const user = session?.user;

    if (!user) {
      setCurrentUser(null);
      return;
    }

    setCurrentUser({
      uid: user.id,
      name:
        user.user_metadata?.full_name ||
        user.user_metadata?.name ||
        user.email?.split("@")[0] ||
        "사용자",
      email: user.email || "",
      avatarColor: "#6C3AED",
      profileImage: user.user_metadata?.avatar_url,
    });
  };

  supabase.auth.getSession().then(({ data }) => {
    console.log("초기 세션=", data.session);
    setUserFromSession(data.session);
    // OAuth 콜백 후 세션이 이미 있으면 projects로 이동 (SIGNED_IN 이벤트 타이밍 보완)
    if (data.session?.user && window.location.pathname === "/") {
      window.location.href = "/projects";
    }
  });

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((event, session) => {
    console.log("EVENT:", event);
    console.log("SESSION:", session);

    setUserFromSession(session);

    if(event === "SIGNED_IN"&& session?.user){
      window.location.href = "/projects";
    }
  });
  

  return () => {
    subscription.unsubscribe();
  };
}, []);
useEffect(() => {
  if (!currentUser) return;

  fetchProjects();
  fetchNotices();
  fetchScheduleEvents();
  fetchQnaPosts();
}, [currentUser]);

  async function login(email: string, password: string): Promise<boolean> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.user) {
    console.error("로그인 실패:", error?.message);
    return false;
  }

  setCurrentUser({
    uid: data.user.id,
    name:
      data.user.user_metadata?.full_name ||
      data.user.user_metadata?.name ||
      data.user.email?.split("@")[0] ||
      "사용자",
    email: data.user.email || "",
    avatarColor: "#6C3AED",
  });

  return true;
}
    async function loginWithGoogle(): Promise<void> {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
        redirectTo: window.location.origin,
    },
  });
  
  if (error) {
    console.error("구글 로그인 실패:", error.message);
  }
}

  async function register(name: string, email: string, password: string) {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (data.user) {
      setCurrentUser(data.user);
    }
  }

  async function logout() {
    await supabase.auth.signOut();
    setCurrentUser(null);
  }

  function updateUser(user: User) {
    setCurrentUser(user);
  }

  function createProject(data: Omit<Project, "id" | "ownerId" | "createdAt" | "updatedAt" | "inviteCode" | "memberCount" | "formationCount" | "isFavorite">): Project {
    const id = `proj-${Date.now()}`;
    const inviteCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    const project: Project = {
      ...data,
      id,
      ownerId: currentUser?.uid || "user-1",
      inviteCode,
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
      memberCount: 1,
      formationCount: 0,
      isFavorite: false,
    };
    setProjects(prev => [project, ...prev]);
    if (currentUser) {
      setMembers(prev => ({
        ...prev,
        [id]: [{ id: `m-${Date.now()}`, projectId: id, userId: currentUser.uid, name: currentUser.name, color: DANCER_COLORS[0], role: "owner", dancerRole: "리드댄서" }],
      }));
    }
    setFormations(prev => ({ ...prev, [id]: [] }));
    return project;
  }

  function joinProject(inviteCode: string, password: string): Project | null {
    const project = projects.find(p => p.inviteCode === inviteCode && p.password === password);
    if (!project || !currentUser) return null;
    const existing = members[project.id]?.find(m => m.userId === currentUser.uid);
    if (!existing) {
      const colorIdx = (members[project.id]?.length || 0) % DANCER_COLORS.length;
      setMembers(prev => ({
        ...prev,
        [project.id]: [...(prev[project.id] || []), {
          id: `m-${Date.now()}`,
          projectId: project.id,
          userId: currentUser.uid,
          name: currentUser.name,
          color: DANCER_COLORS[colorIdx],
          role: "viewer",
          dancerRole: "댄서",
        }],
      }));
    }
    return project;
  }

  function updateFormations(projectId: string, newFormations: Formation[]) {
    setFormations(prev => ({ ...prev, [projectId]: newFormations }));
    setProjects(prev => prev.map(p => p.id === projectId ? { ...p, formationCount: newFormations.length, updatedAt: new Date().toISOString().split("T")[0] } : p));
  }

  function updateMembers(projectId: string, newMembers: Member[]) {
    setMembers(prev => ({ ...prev, [projectId]: newMembers }));
  }

  function addNotice(notice: Omit<Notice, "id" | "createdAt" | "comments">) {
    setNotices(prev => [{ ...notice, id: `n-${Date.now()}`, createdAt: new Date().toISOString().split("T")[0], comments: [] }, ...prev]);
  }

  function addComment(noticeId: string, content: string) {
    setNotices(prev => prev.map(n => n.id === noticeId
      ? { ...n, comments: [...n.comments, { id: `c-${Date.now()}`, authorName: currentUser?.name || "익명", content, createdAt: new Date().toISOString().split("T")[0] }] }
      : n
    ));
  }

  function addScheduleEvent(event: Omit<ScheduleEvent, "id">) {
    setScheduleEvents(prev => [...prev, { ...event, id: `s-${Date.now()}` }]);
  }

  async function uploadMusic(projectId: string, file: File): Promise<MusicFile> {
    return new Promise((resolve, reject) => {
      // Create object URL for the audio file
      const fileUrl = URL.createObjectURL(file);

      // Create audio element to get duration
      const audio = new Audio(fileUrl);
      audio.addEventListener('loadedmetadata', () => {
        const musicFile: MusicFile = {
          id: `music-${Date.now()}`,
          projectId,
          fileName: file.name,
          duration: audio.duration,
          fileUrl,
          uploadedAt: new Date().toISOString(),
        };

        setMusicFiles(prev => ({ ...prev, [projectId]: musicFile }));
        resolve(musicFile);
      });

      audio.addEventListener('error', () => {
        URL.revokeObjectURL(fileUrl);
        reject(new Error('Failed to load audio file'));
      });
    });
  }

  function removeMusic(projectId: string) {
    const existingMusic = musicFiles[projectId];
    if (existingMusic) {
      // Revoke the object URL to free memory
      URL.revokeObjectURL(existingMusic.fileUrl);
    }
    setMusicFiles(prev => ({ ...prev, [projectId]: null }));
  }

  function renameProject(projectId: string, newTitle: string) {
    setProjects(prev => prev.map(p => p.id === projectId ? { ...p, title: newTitle, updatedAt: new Date().toISOString().split("T")[0] } : p));
  }

  function deleteProject(projectId: string) {
    setProjects(prev => prev.filter(p => p.id !== projectId));
    setMembers(prev => {
      const { [projectId]: _, ...rest } = prev;
      return rest;
    });
    setFormations(prev => {
      const { [projectId]: _, ...rest } = prev;
      return rest;
    });
    const existingMusic = musicFiles[projectId];
    if (existingMusic) {
      URL.revokeObjectURL(existingMusic.fileUrl);
    }
    setMusicFiles(prev => {
      const { [projectId]: _, ...rest } = prev;
      return rest;
    });
  }

  function toggleFavorite(projectId: string) {
    setProjects(prev => prev.map(p => p.id === projectId ? { ...p, isFavorite: !p.isFavorite } : p));
  }

  function createQnAPost(data: Omit<QnAPost, "id" | "status" | "createdAt" | "updatedAt" | "replies" | "views">): QnAPost {
    const now = new Date().toISOString().slice(0, 16).replace("T", " ");
    const newPost: QnAPost = {
      ...data,
      id: `q${Date.now()}`,
      status: "waiting",
      createdAt: now,
      updatedAt: now,
      replies: [],
      views: 0,
    };
    setQnaPosts(prev => [newPost, ...prev]);
    return newPost;
  }

  function updateQnAPost(postId: string, data: { title: string; content: string }) {
    const now = new Date().toISOString().slice(0, 16).replace("T", " ");
    setQnaPosts(prev => prev.map(p => p.id === postId ? { ...p, ...data, updatedAt: now } : p));
  }

  function deleteQnAPost(postId: string) {
    setQnaPosts(prev => prev.filter(p => p.id !== postId));
  }

  function addQnAReply(postId: string, content: string, isAdmin: boolean = false) {
    const now = new Date().toISOString().slice(0, 16).replace("T", " ");
    const newReply: QnAReply = {
      id: `r${Date.now()}`,
      postId,
      content,
      authorId: isAdmin ? "admin-1" : currentUser?.uid || "",
      authorName: isAdmin ? "DPH 관리자" : currentUser?.name || "",
      isAdmin,
      createdAt: now,
    };
    setQnaPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          replies: [...p.replies, newReply],
          status: isAdmin ? "answered" : p.status,
          updatedAt: now,
        };
      }
      return p;
    }));
  }

  function incrementQnAViews(postId: string) {
    setQnaPosts(prev => prev.map(p => p.id === postId ? { ...p, views: p.views + 1 } : p));
  }

  return (
    <AppContext.Provider value={{ currentUser, projects, members, formations, musicFiles, notices, scheduleEvents, qnaPosts, isAuthenticated: !!currentUser, login, register, logout, updateUser, createProject, joinProject, updateFormations, updateMembers, uploadMusic, removeMusic, renameProject, deleteProject, toggleFavorite, addNotice, addComment, addScheduleEvent, createQnAPost, updateQnAPost, deleteQnAPost, addQnAReply, incrementQnAViews, loginWithGoogle, DANCER_COLORS }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
