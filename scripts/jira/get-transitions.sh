#!/bin/bash

# Jira Transition ID 조회 스크립트
# 사용법: ./get-transitions.sh ISSUE_KEY
# 예시: ./get-transitions.sh AUDS-123

if [ -z "$1" ]; then
  echo "❌ 사용법: npm run jira:get-transitions ISSUE_KEY"
  echo "예시: npm run jira:get-transitions AUDS-123"
  exit 1
fi

ISSUE_KEY=$1

echo "🔐 GitHub Secrets 값을 직접 입력해주세요:"
echo ""

# JIRA_BASE_URL 입력
if [ -z "$JIRA_BASE_URL" ]; then
  read -p "📍 JIRA_BASE_URL (예: https://your-domain.atlassian.net): " JIRA_BASE_URL
fi

# JIRA_USER_EMAIL 입력
if [ -z "$JIRA_USER_EMAIL" ]; then
  read -p "📧 JIRA_USER_EMAIL (예: your-email@company.com): " JIRA_USER_EMAIL
fi

# JIRA_API_TOKEN 입력
if [ -z "$JIRA_API_TOKEN" ]; then
  read -sp "🔑 JIRA_API_TOKEN (입력 시 화면에 표시되지 않음): " JIRA_API_TOKEN
  echo ""
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔍 $ISSUE_KEY 의 사용 가능한 Transitions 조회 중..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# 현재 상태 확인
ISSUE_RESPONSE=$(curl -s -X GET \
  -H "Content-Type: application/json" \
  -u "$JIRA_USER_EMAIL:$JIRA_API_TOKEN" \
  "$JIRA_BASE_URL/rest/api/2/issue/$ISSUE_KEY")

CURRENT_STATUS=$(echo "$ISSUE_RESPONSE" | jq -r '.fields.status.name // empty')

if [ -z "$CURRENT_STATUS" ]; then
  echo "❌ Issue를 찾을 수 없거나 인증에 실패했습니다: $ISSUE_KEY"
  echo ""
  echo "응답:"
  echo "$ISSUE_RESPONSE" | jq '.'
  exit 1
fi

echo "📌 현재 상태: $CURRENT_STATUS"
echo ""

# Transitions 조회
TRANSITIONS_RESPONSE=$(curl -s -X GET \
  -H "Content-Type: application/json" \
  -u "$JIRA_USER_EMAIL:$JIRA_API_TOKEN" \
  "$JIRA_BASE_URL/rest/api/2/issue/$ISSUE_KEY/transitions")

TRANSITION_COUNT=$(echo "$TRANSITIONS_RESPONSE" | jq '.transitions | length')

if [ "$TRANSITION_COUNT" -eq 0 ]; then
  echo "⚠️  현재 상태에서 사용 가능한 transition이 없습니다."
  exit 0
fi

echo "✅ 사용 가능한 Transitions:"
echo ""

# JSON 파싱 및 포맷팅 (ID를 정렬해서 보기 쉽게)
echo "$TRANSITIONS_RESPONSE" | jq -r '.transitions[] | "  ID: \(.id | tostring | . + (" " * (4 - length))) | \(.name) → \(.to.name)"'

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "💡 설정 방법:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "scripts/jira/jira-workflow-config.json 파일에 아래와 같이 입력:"
echo ""
echo '{'
echo '  "mappings": {'
echo '    "start": "?",        ← 위에서 "진행 중"으로 가는 ID'
echo '    "end": "?",          ← 위에서 "완료"로 가는 ID'
echo '    "inProgress": "?"    ← start와 동일하게'
echo '  }'
echo '}'
echo ""
echo "예시:"
echo '  "start": "21"     ← ID: 21 | Start Progress → 진행 중'
echo '  "end": "31"       ← ID: 31 | Done → 완료'
echo ""
