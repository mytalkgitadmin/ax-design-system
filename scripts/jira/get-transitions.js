#!/usr/bin/env node

/**
 * Jira Transition ID 조회 스크립트
 * 사용법: npm run jira:get-transitions ISSUE_KEY
 */

const https = require("https");
const { execSync } = require("child_process");

const issueKey = process.argv[2];

if (!issueKey) {
  console.error("❌ 사용법: npm run jira:get-transitions ISSUE_KEY");
  console.error("예시: npm run jira:get-transitions AUDS-123");
  process.exit(1);
}

console.log("🔐 GitHub Secrets에서 Jira 정보 가져오는 중...\n");

// GitHub CLI로 secrets 값 가져오기 (실제 값은 못 가져오므로 안내 메시지)
let JIRA_BASE_URL, JIRA_USER_EMAIL, JIRA_API_TOKEN;

try {
  // GitHub CLI로 secret이 존재하는지만 확인
  execSync("gh secret list | grep JIRA_BASE_URL", { stdio: "pipe" });
  
  console.log("✅ GitHub Secrets가 설정되어 있습니다.");
  console.log("⚠️  하지만 로컬에서는 secret 값을 직접 읽을 수 없습니다.\n");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("📋 다음 값을 직접 입력하거나 환경변수로 설정하세요:");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
  console.log("export JIRA_BASE_URL='https://your-domain.atlassian.net'");
  console.log("export JIRA_USER_EMAIL='your-email@company.com'");
  console.log("export JIRA_API_TOKEN='your-api-token'");
  console.log("\n그 다음 다시 실행:");
  console.log(`npm run jira:get-transitions ${issueKey}\n`);
  
} catch (error) {
  console.log("⚠️  GitHub Secrets가 설정되지 않았습니다.\n");
}

// 환경변수에서 읽기
JIRA_BASE_URL = process.env.JIRA_BASE_URL;
JIRA_USER_EMAIL = process.env.JIRA_USER_EMAIL;
JIRA_API_TOKEN = process.env.JIRA_API_TOKEN;

if (!JIRA_BASE_URL || !JIRA_USER_EMAIL || !JIRA_API_TOKEN) {
  console.error("❌ 환경변수가 설정되지 않았습니다.\n");
  console.error("다음 명령어로 환경변수를 설정한 후 다시 실행하세요:\n");
  console.error("export JIRA_BASE_URL='https://your-domain.atlassian.net'");
  console.error("export JIRA_USER_EMAIL='your-email@company.com'");
  console.error("export JIRA_API_TOKEN='your-api-token'");
  console.error(`npm run jira:get-transitions ${issueKey}\n`);
  process.exit(1);
}

const auth = Buffer.from(`${JIRA_USER_EMAIL}:${JIRA_API_TOKEN}`).toString("base64");
const baseUrl = JIRA_BASE_URL.replace(/\/$/, "");

console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
console.log(`🔍 ${issueKey} 의 사용 가능한 Transitions 조회 중...`);
console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);

// Issue 정보 가져오기
const issueUrl = new URL(`${baseUrl}/rest/api/2/issue/${issueKey}`);
const transitionsUrl = new URL(`${baseUrl}/rest/api/2/issue/${issueKey}/transitions`);

function httpsGet(url) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: url.hostname,
      path: url.pathname,
      method: "GET",
      headers: {
        "Authorization": `Basic ${auth}`,
        "Content-Type": "application/json",
      },
    };

    https.get(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error("Failed to parse JSON: " + data));
        }
      });
    }).on("error", reject);
  });
}

(async () => {
  try {
    // 현재 상태 확인
    const issue = await httpsGet(issueUrl);
    
    if (!issue.fields || !issue.fields.status) {
      console.error("❌ Issue를 찾을 수 없습니다:", issueKey);
      console.error("\n응답:", JSON.stringify(issue, null, 2));
      process.exit(1);
    }
    
    const currentStatus = issue.fields.status.name;
    console.log(`📌 현재 상태: ${currentStatus}\n`);
    
    // Transitions 조회
    const transitionsData = await httpsGet(transitionsUrl);
    
    if (!transitionsData.transitions || transitionsData.transitions.length === 0) {
      console.log("⚠️  현재 상태에서 사용 가능한 transition이 없습니다.");
      process.exit(0);
    }
    
    console.log("✅ 사용 가능한 Transitions:\n");
    
    transitionsData.transitions.forEach(transition => {
      const id = transition.id.padEnd(4);
      console.log(`  ID: ${id} | ${transition.name} → ${transition.to.name}`);
    });
    
    console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("💡 설정 방법:");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
    console.log("scripts/jira/jira-workflow-config.json 파일에 아래와 같이 입력:\n");
    console.log("{");
    console.log('  "mappings": {');
    console.log('    "start": "?",        ← 위에서 "진행 중"으로 가는 ID');
    console.log('    "end": "?",          ← 위에서 "완료"로 가는 ID');
    console.log('    "inProgress": "?"    ← start와 동일하게');
    console.log("  }");
    console.log("}\n");
    console.log("예시:");
    console.log('  "start": "21"     ← ID: 21 | Start Progress → 진행 중');
    console.log('  "end": "31"       ← ID: 31 | Done → 완료\n');
    
  } catch (error) {
    console.error("❌ 오류 발생:", error.message);
    process.exit(1);
  }
})();

