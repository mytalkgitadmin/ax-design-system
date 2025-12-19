module.exports = {
  types: [
    {
      value: "✨ Feat",
      name: "✨ Feat:      새로운 기능 추가",
    },
    {
      value: "⚡ Perf",
      name: "⚡ Perf:      성능 개선(속도/메모리/용량)",
    },
    {
      value: "🐛 Fix",
      name: "🐛 Fix:       버그 수정",
    },
    {
      value: "🎨 UI/UX",
      name: "🎨 UI/UX:     사용자 인터페이스 변경",
    },
    {
      value: "💄 Style",
      name: "💄 Style:     코드 스타일 (비즈니스 로직 변경 없음)",
    },
    {
      value: "➕ Add",
      name: "➕ Add:       의존성 추가",
    },
    {
      value: "♻️ Refactor",
      name: "♻️ Refactor:  코드 리팩토링",
    },
    {
      value: "🔧 Chore",
      name: "🔧 Chore:     기타 변경사항 (빌드 스크립트 등)",
    },
    {
      value: "🏗️ Build",
      name: "🏗️ Build:     빌드 관련 파일 수정",
    },
    {
      value: "👷 CI",
      name: "👷 CI:        CI 관련 설정 수정",
    },
    {
      value: "📝 Docs",
      name: "📝 Docs:      문서 (추가, 수정, 삭제)",
    },
    {
      value: "🔥 Remove",
      name: "🔥 Remove:    코드/파일/기능 삭제",
    },
    {
      value: "🔍 SEO",
      name: "🔍 SEO:       검색 엔진 최적화",
    },
    {
      value: "🚧 WIP",
      name: "🚧 WIP:       작업 진행 중 (Work In Progress)",
    },
    {
      value: "♿ A11y",
      name: "♿ A11y:      접근성 개선",
    },
    {
      value: "🧪 Test",
      name: "🧪 Test:      테스트 (비즈니스 로직 변경 없음)",
    },
  ],

  messages: {
    type: "커밋 타입을 선택하세요:",
    subject: "커밋 제목을 입력하세요 (명령조, 첫글자 대문자, 마침표 X):\n",
    body: "상세 설명을 입력하세요 (선택사항, 무엇을/왜에 초점):\n",
    footer: "Jira 티켓 번호를 입력하세요 (선택사항, 예: FMTW-123):\n",
    confirmCommit: "위 내용으로 커밋하시겠습니까?",
  },

  allowCustomScopes: false,
  allowBreakingChanges: [],
  skipQuestions: ["scope", "breaking"],

  subjectLimit: 100,

  // 커스텀 프롬프트 추가
  prompter: function (cz, commit) {
    const inquirer = require("inquirer");

    // 스마트 커밋 명령어 정보 저장
    let smartCommitData = {
      commands: [],
      comment: "",
      time: "",
    };

    inquirer
      .prompt([
        {
          type: "list",
          name: "type",
          message: this.messages.type,
          choices: this.types,
        },
        {
          type: "input",
          name: "subject",
          message: this.messages.subject,
          validate: function (input) {
            if (!input) {
              return "커밋 제목은 필수입니다!";
            }
            if (input.length > 100) {
              return "커밋 제목은 100자 이내로 작성해주세요!";
            }
            return true;
          },
        },
        {
          type: "input",
          name: "bodyShort",
          message: '상세 설명 (Enter=스킵, "e"=에디터 열기):\n',
        },
        {
          type: "editor",
          name: "bodyLong",
          message: "상세 설명을 작성하세요 (저장 후 닫기):",
          when: function (answers) {
            return answers.bodyShort === "e";
          },
        },
        {
          type: "input",
          name: "jiraTicket",
          message: this.messages.footer,
          validate: function (input) {
            if (!input) return true; // 선택사항
            // Jira 티켓 형식 검증 (예: FMTW-123, PROJ-456)
            if (!/^[A-Z]+-\d+$/.test(input)) {
              return "Jira 티켓 형식이 올바르지 않습니다 (예: FMTW-123)";
            }
            return true;
          },
        },
        {
          type: "checkbox",
          name: "smartCommands",
          message: "Jira 스마트 커밋 명령어를 선택하세요 (선택사항):",
          when: function (answers) {
            return answers.jiraTicket; // Jira 티켓이 있을 때만
          },
          choices: [
            { name: "#comment - Jira에 코멘트 추가", value: "comment" },
            { name: "#time - 작업 시간 기록", value: "time" },
            { name: "#start - 작업 시작 상태로 전환", value: "start" },
            { name: "#resolve - 완료 상태로 전환", value: "resolve" },
            { name: "#close - 이슈 닫기", value: "close" },
          ],
        },
        {
          type: "input",
          name: "commentText",
          message: "코멘트 내용을 입력하세요:",
          when: function (answers) {
            return (
              answers.smartCommands && answers.smartCommands.includes("comment")
            );
          },
          validate: function (input) {
            if (!input) {
              return "코멘트 내용은 필수입니다!";
            }
            return true;
          },
        },
        {
          type: "input",
          name: "timeSpent",
          message: "작업 시간을 입력하세요 (예: 2h 30m, 1h, 45m):",
          when: function (answers) {
            return (
              answers.smartCommands && answers.smartCommands.includes("time")
            );
          },
          validate: function (input) {
            if (!input) {
              return "작업 시간은 필수입니다!";
            }
            // 시간 형식 검증 (예: 2h, 30m, 2h 30m)
            if (!/^\d+[hm](\s+\d+[hm])?$/.test(input)) {
              return "올바른 시간 형식을 입력하세요 (예: 2h, 30m, 2h 30m)";
            }
            return true;
          },
        },
        {
          type: "confirm",
          name: "confirmCommit",
          message: function (answers) {
            const preview = formatCommitPreview(answers);
            return "\n" + preview + "\n\n" + "위 내용으로 커밋하시겠습니까?";
          },
          default: true,
        },
      ])
      .then(function (answers) {
        if (!answers.confirmCommit) {
          console.log("\n❌ 커밋이 취소되었습니다.\n");
          return;
        }

        const message = formatCommitMessage(answers);
        commit(message);
      });

    // 커밋 메시지 미리보기 생성
    function formatCommitPreview(answers) {
      let preview = "\n📝 커밋 메시지 미리보기:\n";
      preview += "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
      preview += formatCommitMessage(answers);
      preview += "\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━";
      return preview;
    }

    // 최종 커밋 메시지 생성
    function formatCommitMessage(answers) {
      const type = answers.type;
      const subject = answers.subject;
      // bodyShort가 'e'면 bodyLong 사용, 아니면 bodyShort 사용
      const body =
        answers.bodyShort === "e" ? answers.bodyLong : answers.bodyShort;
      const jiraTicket = answers.jiraTicket;
      const smartCommands = answers.smartCommands || [];
      const commentText = answers.commentText;
      const timeSpent = answers.timeSpent;

      let message = `${type}: ${subject}`;

      // Jira 티켓 번호 추가
      if (jiraTicket) {
        message += ` ${jiraTicket}`;
      }

      // 스마트 커밋 명령어 추가
      if (smartCommands.length > 0) {
        const commands = [];

        smartCommands.forEach((cmd) => {
          if (cmd === "comment" && commentText) {
            commands.push(`#comment ${commentText}`);
          } else if (cmd === "time" && timeSpent) {
            commands.push(`#time ${timeSpent}`);
          } else if (cmd === "start") {
            commands.push("#start");
          } else if (cmd === "resolve") {
            commands.push("#resolve");
          } else if (cmd === "close") {
            commands.push("#close");
          }
        });

        if (commands.length > 0) {
          message += " " + commands.join(" ");
        }
      }

      // 본문 추가
      if (body) {
        message += "\n\n" + body;
      }

      return message;
    }
  },
};
