# OpenClaw Agent Router

**지능형 Agent 라우팅 시스템** - OpenClaw 가 자동으로 가장 적합한 Agent 를 호출하도록

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![OpenClaw](https://img.shields.io/badge/OpenClaw-Plugin-green.svg)](https://github.com/openclaw/openclaw)

---

## 🌍 다국어 문서

| 언어 | 문서 |
|------|------|
| 🇨🇳 中文 | [README.md](README.md) |
| 🇬🇧 English | [README.en.md](README.en.md) |
| 🇯🇵 日本語 | [README.ja.md](README.ja.md) |
| 🇰🇷 한국어 | [README.ko.md](README.ko.md) |
| 🇫🇷 Français | [README.fr.md](README.fr.md) |
| 🇪🇸 Español | [README.es.md](README.es.md) |

---

## 🎯 주요 기능

### 1. 자동 라우팅
작업 유형에 따라 가장 적합한 Agent 를 자동으로 호출합니다：
- 게임 디자인 → AI 플래너 팀
- 데이터 분석 → AI 데이터 분석가
- 기사 작성 → 편집팀
- 코드 문제 → AI 개발자 팀

### 2. 스마트 추천
자동 호출 조건이 충족되지 않을 때 관련 Agent 를 적극적으로 추천합니다.

### 3. 실시간 스캔
`agents/` 폴더를 실시간으로 스캔하여 사용 가능한 Agent 목록을 동적으로 가져옵니다.

### 4. 멀티 Agent 협업
복잡한 작업을 자동으로 분해하고 여러 Agent 를 호출하여 협업합니다.

---

## 🚀 빠른 시작

### 제로 컨피그레이션 설치 (권장)

```bash
# 저장소 복제
git clone https://github.com/JingWang-Star996/openclaw-agent-router.git

# 제로 컨피그레이션 설치 스크립트 실행
cd openclaw-agent-router
chmod +x scripts/install.sh
./scripts/install.sh
```

**설치 스크립트가 자동으로 완료**：
1. ✅ Skills 를 워크스페이스에 복사
2. ✅ SOUL.md 에 자동 주입 (자동 호출 규칙 추가, 기존 콘텐츠 유지)
3. ✅ 설치 검증

**수동 컨피그레이션 불필요!** 설치 후 메인 AI 가 자동으로 Agent 를 호출합니다.

---

## 🔒 보안 보장

**SOUL.md 처리 방법**：
- **존재하지 않음** → 전체 파일 생성 (규칙 포함)
- **존재하지만 규칙 없음** → 증분 주입 (파일 맨 앞에 삽입, 기존 콘텐츠 모두 유지)
- **이미 규칙 있음** → 건너뛰기 (중복 방지)

---

## 📊 성능 지표

| 지표 | 값 |
|------|-----|
| 스캔 속도 | ~0.5 초 (100 개 Agent) |
| 매칭 속도 | <100ms |
| 캐시 히트율 | 85%+ (동일 대화) |
| 라우팅 정확도 | 90%+ (테스트 기반) |

---

## 📋 라우팅 규칙

| 작업 유형 | 자동 호출 |
|-----------|-----------|
| 게임 디자인/수치/시스템 | AI 수석 플래너 → 전문 플래너에게 배포 |
| 리텐션/결제/데이터 분석 | AI 데이터 분석가 + AI 수치 플래너 |
| 프로젝트 관리/일정/리소스 | PMO 프로젝트 매니저 |
| 기사 작성/주간 보고서 | 편집팀/주간 보고서 AI |
| 코드/기술 | AI 수석 개발자 |
| 아트/UX | AI 아트 디렉터 + UX 디자이너 |
| 인사 | 인사부서 AI |
| 품질 관리 | 품질부서 AI |
| 운영/이벤트 | 운영 디렉터 + 사용자 운영 |

---

## 🏗️ 프로젝트 구조

```
openclaw-agent-router/
├── README.md                 # 이 문서
├── LICENSE                   # MIT 라이선스
├── package.json              # 프로젝트 설정
├── src/                      # 소스 코드
│   ├── scanner.js            # Agent 실시간 스캐너
│   ├── router.js             # 라우팅 코어 로직
│   └── matcher.js            # 지능형 매칭 엔진
├── docs/                     # 문서
│   ├── ARCHITECTURE.md       # 아키텍처 디자인
│   ├── QUICKSTART.md         # 빠른 시작 가이드
│   └── RELEASE.md            # 릴리스 가이드
└── skills/                   # OpenClaw Skills
    ├── auto-agent-router/    # 자동 라우팅 Skill
    └── agent-scanner/        # 실시간 스캔 Skill
```

---

## 🤝 기여

Issue 와 Pull Request 를 환영합니다!

---

## 📄 라이선스

MIT License

---

## 🙏 감사의 글

- **영감**: OpenClaw 멀티 Agent 협업의 필요성
- **플랫폼 지원**: [OpenClaw](https://github.com/openclaw/openclaw)
- **실전 검증**: ZVP 디자인 에이전시 AI 팀 (100+ Agent)

---

**Made with ❤️ for OpenClaw Community**

**최종 업데이트**: 2026-04-05
