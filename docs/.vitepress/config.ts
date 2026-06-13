import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'How2Remotion',
  description: 'Codex와 AI 에이전트로 모션 그래픽·더빙·영상 편집 만들기',
  lang: 'ko-KR',
  base: '/How2Remotion/',

  themeConfig: {
    logo: '/img/logo.svg',
    siteTitle: 'How2Remotion',

    nav: [
      { text: '홈', link: '/' },
      { text: '시작하기', link: '/01-intro/' },
      { text: '실전 프로젝트', link: '/07-project/step-by-step' },
    ],

    sidebar: [
      {
        text: '1장. 시작하기 전에',
        collapsed: false,
        items: [
          { text: '개요', link: '/01-intro/' },
          { text: 'Remotion이란?', link: '/01-intro/what-is-remotion' },
          { text: '왜 Codex인가', link: '/01-intro/why-ai-agents' },
        ],
      },
      {
        text: '2장. 환경 설정',
        collapsed: false,
        items: [
          { text: '개요', link: '/02-setup/' },
          { text: '필수 설치 목록', link: '/02-setup/prerequisites' },
          { text: 'Remotion 프로젝트 생성', link: '/02-setup/install-remotion' },
          { text: 'Codex 연결하기', link: '/02-setup/install-codex' },
          { text: '첫 번째 렌더링', link: '/02-setup/hello-remotion' },
        ],
      },
      {
        text: '3장. Codex로 모션 그래픽 만들기',
        collapsed: false,
        items: [
          { text: '개요', link: '/03-codex-motion/' },
          { text: '프롬프트 작성법', link: '/03-codex-motion/prompt-basics' },
          { text: '텍스트 애니메이션', link: '/03-codex-motion/text-animation' },
          { text: '도형·색상 애니메이션', link: '/03-codex-motion/shape-animation' },
          { text: '장면 전환', link: '/03-codex-motion/transitions' },
          { text: '이미지·로고 삽입', link: '/03-codex-motion/assets' },
        ],
      },
      {
        text: '4장. 프롬프트 쇼케이스',
        collapsed: false,
        items: [
          { text: '개요', link: '/04-prompt-showcase/' },
          { text: '쇼케이스 활용법', link: '/04-prompt-showcase/how-to-use' },
          { text: '다운로드 및 커스터마이징', link: '/04-prompt-showcase/download-and-customize' },
        ],
      },
      {
        text: '5장. AI 더빙 입히기',
        collapsed: false,
        items: [
          { text: '개요', link: '/05-dubbing/' },
          { text: 'TTS 기초', link: '/05-dubbing/tts-basics' },
          { text: 'ElevenLabs 연동', link: '/05-dubbing/elevenlabs-setup' },
          { text: '오디오 동기화', link: '/05-dubbing/audio-sync' },
          { text: 'Codex로 더빙까지', link: '/05-dubbing/codex-dubbing' },
        ],
      },
      {
        text: '6장. 영상 편집하기',
        collapsed: false,
        items: [
          { text: '개요', link: '/06-video-editing/' },
          { text: '장면 연결하기', link: '/06-video-editing/sequences' },
          { text: '자막 넣기', link: '/06-video-editing/captions' },
          { text: '배경음악 추가', link: '/06-video-editing/bgm' },
          { text: '최종 렌더링', link: '/06-video-editing/rendering' },
        ],
      },
      {
        text: '7장. 실전 프로젝트',
        collapsed: false,
        items: [
          { text: '개요', link: '/07-project/' },
          { text: '처음부터 끝까지', link: '/07-project/step-by-step' },
        ],
      },
      {
        text: '8장. 더 나아가기',
        collapsed: true,
        items: [
          { text: '개요', link: '/08-advanced/' },
          { text: '오류 해결', link: '/08-advanced/troubleshooting' },
          { text: 'Lambda 렌더링', link: '/08-advanced/lambda' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/happyuntilmori/How2Remotion' },
    ],

    footer: {
      message: 'AI와 함께 영상을 만들어 보세요.',
      copyright: '© 2026 How2Remotion',
    },

    search: {
      provider: 'local',
    },

    editLink: {
      pattern: 'https://github.com/happyuntilmori/How2Remotion/edit/main/docs/:path',
      text: '이 페이지 수정하기',
    },
  },
})
