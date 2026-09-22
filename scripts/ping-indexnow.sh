#!/usr/bin/env bash
# Пинг IndexNow (Яндекс) после обновления страниц.
# Использование:
#   ./scripts/ping-indexnow.sh                 # отправить все URL из sitemap.xml
#   ./scripts/ping-indexnow.sh /uslugi /uslugi/podem-domov   # конкретные пути

set -euo pipefail

HOST="betonniy-ritm.by"
KEY="eb14c8e6d68c4b7abde5346e2814c924"
KEY_LOCATION="https://${HOST}/indexnow-key.txt"
ENDPOINT="https://yandex.com/indexnow"

# Собираем URL: либо из аргументов (пути), либо из sitemap
if [ "$#" -gt 0 ]; then
  URLS=()
  for p in "$@"; do
    case "$p" in
      http*) URLS+=("$p") ;;
      *)     URLS+=("https://${HOST}${p}") ;;
    esac
  done
else
  SITEMAP=$(curl -fsS "https://${HOST}/sitemap.xml")
  mapfile -t URLS < <(printf '%s' "$SITEMAP" | grep -o '<loc>[^<]*</loc>' | sed -e 's/<loc>//' -e 's/<\/loc>//')
fi

TOTAL=${#URLS[@]}
if [ "$TOTAL" -eq 0 ]; then
  echo "Нет URL для отправки (sitemap пуст или недоступен)." >&2
  exit 1
fi

# Формируем JSON-массив URL
URL_JSON=$(printf '%s\n' "${URLS[@]}" | sed 's/^/  "/; s/$/"/' | paste -sd ',' -)

STATUS=$(curl -s -o /dev/null -w '%{http_code}' -X POST "$ENDPOINT" \
  -H "Content-Type: application/json; charset=utf-8" \
  -d "{\"host\":\"${HOST}\",\"key\":\"${KEY}\",\"keyLocation\":\"${KEY_LOCATION}\",\"urlList\":[${URL_JSON}]}")

echo "IndexNow: отправлено ${TOTAL} URL, HTTP ${STATUS}"
# 200/202 — принято; 400 — ошибка формата или >10000 URL; 403 — ключ не валиден
