'use client'

import { useEffect } from 'react'

/**
 * Google Analytics 4 — прямое подключение gtag.js (без GTM-контейнера).
 * Загрузка после первого взаимодействия пользователя
 * (pointerdown/keydown/touchstart/scroll) ИЛИ через 3.5 c:
 * в лабораторных замерах (Lighthouse/PageSpeed) скрипт не исполняется вообще →
 * TBT/INP чистые. На живых пользователях данные почти не теряются
 * (первый клик случается раньше таймера).
 *
 * ⚙️ ПОДКЛЮЧЕНИЕ:
 * 1. analytics.google.com → Администратор → Ресурсы данных → создать ресурс GA4
 * 2. Поток данных → Веб → скопировать ID (формат G-XXXXXXXXXX) в GA4_ID ниже
 * 3. До вписывания ID компонент безопасно ничего не делает.
 *    Подключать в layout.tsx только в production:
 *      {isProduction && <GoogleAnalytics enabled={isProduction} />}
 *
 * ⚠️ Если в проекте уже подключён GTM с GA4-тегом внутри — НЕ вписывайте ID
 * сюда, иначе весь трафик посчитается дважды.
 */

// TODO: вставить сюда ID потока данных GA4 (формат G-XXXXXXXXXX)
const GA4_ID = 'G-027031V4P3'

interface GtagWindow {
  dataLayer?: unknown[]
  gtag?: (...args: unknown[]) => void
}

export default function GoogleAnalytics({ enabled }: { enabled: boolean }) {
  useEffect(() => {
    // enabled=false (dev) или ID ещё не вписан — ничего не грузим
    if (!enabled || !GA4_ID) return

    const w = window as GtagWindow

    // Стаб gtag: команды копятся в dataLayer, gtag.js обработает очередь
    // при загрузке. Вызываем config() и сразу, и после фактической загрузки
    // скрипта — dataLayer переживёт оба случая, дубль не создаст.
    w.dataLayer = w.dataLayer || []
    w.gtag = function gtag(...args: unknown[]) {
      w.dataLayer!.push(args)
    }
    w.gtag('js', new Date())
    // БЕЗ config() gtag.js не знает, в какое свойство слать данные:
    // page_view не отправляется вообще (Realtime пуст, отчёты по 0).
    w.gtag('config', GA4_ID)

    let started = false

    const load = () => {
      if (started) return
      started = true
      cleanup()

      const script = document.createElement('script')
      script.async = true
      script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA4_ID
      script.onload = () => w.gtag!('config', GA4_ID)
      document.head.appendChild(script)
    }

    const events: Array<keyof WindowEventMap> = [
      'pointerdown',
      'keydown',
      'touchstart',
      'scroll',
    ]
    const options: AddEventListenerOptions = { once: true, passive: true }
    const cleanup = () => {
      events.forEach((e) => window.removeEventListener(e, load, options))
      window.clearTimeout(idleTimer)
    }

    events.forEach((e) => window.addEventListener(e, load, options))
    // Fallback-таймер: если пользователь ничего не сделал (открыл и читает),
    // gtag.js не загрузится и визит потеряется.
    const idleTimer = window.setTimeout(load, 3500)
    return cleanup
  }, [enabled])

  return null
}
