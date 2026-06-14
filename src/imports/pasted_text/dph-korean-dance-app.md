CRITICAL LANGUAGE REQUIREMENT

The entire application must be written in Korean.

Use Korean for:

- Navigation menus
- Buttons
- Labels
- Forms
- Tables
- Notifications
- Empty states
- Error messages
- Success messages
- Dialogs
- Tooltips
- Project content
- Sample data

Do not use English anywhere in the user interface.

Forbidden examples:

Dashboard
Projects
Settings
Members
Timeline
Save
Cancel
Delete
Create Project

Required Korean equivalents:

대시보드
프로젝트
설정
팀원
타임라인
저장
취소
삭제
프로젝트 생성

Generate realistic Korean sample content.

Use Korean names such as:

김민준
이수빈
박예린
최도윤
정서연

Use realistic Korean dance team scenarios.

The application should look and feel like a product designed by a Korean company for Korean dancers.

IMPORTANT

This is a Korean service.

Target users are Korean dancers and performance teams.

The application must feel similar to Toss, Wanted, Class101, Notion Korea and modern Korean SaaS products.

Avoid western-style placeholder content.

All examples, project names, notices, comments and user data must be written in Korean.

--------------------------------------------------
PROJECT OVERVIEW
--------------------------------------------------

Redesign DPH (Dance Performing Helper) as a real-world SaaS web platform for Korean dancers, choreographers, directors and performance teams.

This is NOT a presentation prototype.

The goal is to build a production-ready MVP that can actually be used by dance teams.

Language:
- Korean only
- Use natural Korean UX writing
- Use Pretendard font

Design Style:
- Modern Korean SaaS
- Inspired by Toss, Wanted, Notion Korea, Linear and Framer
- Clean and professional
- Desktop-first responsive web application
- Purple gradient design system
- Primary color #6C3AED

Do NOT focus on project cards or dashboard visuals.

The core product is Formation Management and Performance Collaboration.

The entire application should revolve around formation planning, stage movement, communication and rehearsal management.

--------------------------------------------------
USER ROLES
--------------------------------------------------

1. 디렉터
2. 안무가
3. 댄서

Role-based permissions are required.

--------------------------------------------------
MAIN NAVIGATION
--------------------------------------------------

대시보드
프로젝트
포메이션
타임라인
자료실
공지사항
팀원관리
설정

--------------------------------------------------
PROJECT STRUCTURE
--------------------------------------------------

Each project contains:

- 공연 정보
- 팀원 목록
- 타임라인
- 포메이션
- 자료실
- 공지사항

--------------------------------------------------
MOST IMPORTANT FEATURE
--------------------------------------------------

Create a Formation Editor page.

This page is the primary feature of DPH.

Requirements:

- Stage canvas
- Drag and drop dancer positions
- Add dancers
- Rename dancers
- Formation save
- Formation version history
- Formation duplicate
- Stage size settings

Display dancers as circles.

Example:

● 김민준
● 이수빈
● 박예린

Users should be able to move dancers around the stage.

--------------------------------------------------
TIMELINE SYSTEM
--------------------------------------------------

Create a timeline editor.

Example:

00:00 인트로

00:15 포메이션 A

00:42 포메이션 B

01:10 포메이션 C

Timeline should connect formations.

--------------------------------------------------
MOVEMENT PATH SYSTEM
--------------------------------------------------

Allow directors to create movement paths between formations.

Example:

김민준

● ----------→ ●

Display movement routes visually.

--------------------------------------------------
DANCER VIEW
--------------------------------------------------

Create a special dancer mode.

When a dancer opens a formation:

- Their own position is highlighted
- Other dancers are faded
- Easy to understand personal movement path

This should work well on mobile devices.

--------------------------------------------------
DIRECTOR FEEDBACK SYSTEM
--------------------------------------------------

Directors can leave comments directly on formations.

Examples:

"센터에서 한 칸 앞으로"

"라인 정렬 필요"

"동선 수정"

Display comment pins on the stage.

--------------------------------------------------
TEAM MANAGEMENT
--------------------------------------------------

- 팀원 초대
- 역할 부여
- 권한 관리
- 출석 관리

--------------------------------------------------
FILE LIBRARY
--------------------------------------------------

Upload:

- 음악 파일
- 안무 영상
- PDF 문서
- 이미지 자료

Organized by project.

--------------------------------------------------
NOTIFICATION SYSTEM
--------------------------------------------------

- 프로젝트 업데이트
- 포메이션 변경 알림
- 댓글 알림
- 연습 일정 알림

--------------------------------------------------
SETTINGS
--------------------------------------------------

- 프로필 설정
- 알림 설정
- 팀 설정
- 프로젝트 설정

--------------------------------------------------
TECHNICAL REQUIREMENTS
--------------------------------------------------

Create a complete clickable prototype.

Every button must work.

Every menu item must navigate.

Every card must navigate.

No dead links.

No placeholder pages.

Create all missing pages.

Use realistic Korean content.

Generate complete page hierarchy and navigation flow.

This should feel like a real SaaS product ready for React + Supabase implementation.

--------------------------------------------------
IMPORTANT FUNCTIONALITY REQUIREMENTS
--------------------------------------------------

Do not generate static UI mockups.

Generate a fully connected web application prototype with working navigation, realistic user flows and complete page interactions.

Every clickable element must have an action.

Focus on product functionality rather than visual decoration.

Create actual user flows:

로그인
→ 대시보드
→ 프로젝트 생성
→ 팀원 초대
→ 포메이션 생성
→ 타임라인 연결
→ 피드백 작성
→ 자료 업로드
→ 알림 확인

Every screen should be connected.

--------------------------------------------------
REAL PRODUCT REQUIREMENTS
--------------------------------------------------

This is a real service, not a school presentation.

The output should be structured for future implementation using:

- React
- TypeScript
- Tailwind CSS
- Supabase
- PostgreSQL
- Vercel

Generate layouts, components and flows that are realistically implementable.

Avoid decorative concepts that cannot be developed in a real production environment.

Prioritize usability, collaboration and formation management above all other features.