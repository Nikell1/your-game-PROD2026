# Браузерная игра «Твоя игра»

#  Общая концепция

---

«Твоя игра» — браузерная интеллектуальная викторина, вдохновленная классической телепередачей «Своя игра». Игра полностью работает на клиентской стороне (без бэкенда) и предназначена для компании от 2 до 8 игроков за одним компьютером.

# Дизайн-система

Интерфейс выполнен в современном темно-синем стиле с использованием glassmorphism — техники, имитирующей матовое стекло. Дизайн сочетает атмосферу интеллектуального телешоу с современными веб-трендами, создавая ощущение глубины, технологичности и премиальности.
Для карточек игроков предусмотрен свой уникальный цвет.

# Экстрафичи:

- **Персонажи игроков:**  
На экране подготовки к игре игрок может нажать на свой аватар и в открывшемся модальном окне выбрать один из восьми предустановленных аватаров или загрузить свой. Аватары сохраняются на протяжении всей игры

- **Звуки:**  
На экраны добавлена фоновая музыка, также добавлены звуки для основных событий игры (правильный/неправильный ответ, отсутствие ответа, время истекло, выпадение кота в мешке или аукциона). Громкость звуков можно изменить в настройках.


- **Анимации:**  
Добавлены анимации, плавность

- **Реакция ведущего на ввод ответов:**  
Добавлен ведущий, который сопровождает игроков на протяжении всей игры и реагирует на большинство событий. Фразы разнообразны.


# Архитектура приложения:

Проект построен на основе Feature-Sliced Design (FSD) — методологии архитектуры фронтенд-приложений. Это обеспечивает четкое разделение ответственности, масштабируемость и поддерживаемость кода.

---

# Детальное описание взаимодействия слоев:

### 1. Слой `app` (Next.js App Router)

**Ответственность:**
- Определение маршрутов
- Получение параметров URL
- Рендеринг соответствующей страницы из `app-pages`

### 2. Слой `app-pages` (композиция страниц)

**Ответственность:**
- Композиция виджетов для конкретной страницы
- Оркестрация данных между виджетами
- Обработка событий страницы

### 3. Слой `widgets` (композиционные блоки)

**Ответственность:**
- Композиция фич в готовые блоки
- Минимальная логика presentation layer
- Передача событий в фичи

### 4. Слой `features` (пользовательские сценарии)

**Ответственность:**
- Реализация конкретного пользовательского сценария
- Взаимодействие с `entities`
- Навигация
- Бизнес-логика сценария

### 5. Слой `entities` (бизнес-сущности)

**Ответственность:**
- Бизнес-логика предметной области
- Типы и интерфейсы
- Store для состояния сущности

### 6. Слой `shared` (переиспользуемый код)

**Ответственность:**
- Переиспользуемые UI компоненты
- Утилиты и хелперы
- Константы, конфиги

### 7. Слой `providers` (провайдеры)

**Ответственность:**
- Глобальные провайдеры состояния
- Контексты (аудио, тема)

---

# Потоки данных в игре

### 1. Начало игры

[app] /game/setup  
        ↓  
[app-pages] SetupGamePage  
        ↓  
[widgets] PlayerSetupList  
        ↓  
[features] usePlayerAvatar, useValidatePlayers  
        ↓  
[entities] player/validate-players.ts  
        ↓  
[shared] ui/input.tsx, ui/button.tsx  
        ↓  
[app] /game/round/1 (редирект после валидации)  

### 2. Выбор вопроса

[widgets] QuestionsTable  
        ↓ (клик)  
[features] useQuestionClick  
        ↓  
[entities] game/question-slice (setCurrentQuestion)  

### 3. Ответ на вопрос

[app] /game/[questionId]  
        ↓  
[app-pages] QuestionPage  
        ↓  
[widgets] CurrentQuestionWidget  
        ↓  
[features]  
├─→ [features] useKeysClick (захват права ответа)  
├─→ [features] useTimer  
├─→ [features] useHandleCorrect / useHandleIncorrect  
└─→ [entities] game/players-slice (updateScore)  
        ↓  
[features] useReturnToTable  
        ↓  
[app] /game/round/[id]  

### 4. Финальный раунд

[app] /game/round/final  
        ↓  
[widgets] FinalRoundWidget  
        ↓  
[features] useStartFinal (фильтрация игроков)  
        ↓  
[widgets] PlayersBets (секретные ставки)  
        ↓  
[features/final-question] useFinalQuestionClick  
        ↓  
[widgets] ProcessTable (поочередные ответы)  
        ↓  
[features] useEndFinal (подсчет результатов)  
        ↓  
[app] /game/ending  

## Ключевые паттерны и принципы

1. Композиция через хуки

2. Изоляция бизнес-логики

3. Публичное API через index.ts

4. Строгие правила импортов


## Полная структура проекта:

src/  
├── app/                           # Слой приложения (Next.js App Router)  
│   ├── game/                      # Группа маршрутов игры  
│   │   ├── [questionId]/          # Динамический маршрут вопроса  
│   │   │   └── page.tsx  
│   │   ├── ending/                 # Завершение игры  
│   │   │   └── page.tsx  
│   │   ├── round/                  # Раунды  
│   │   │   ├── [id]/               # Динамический раунд (1, 2)  
│   │   │   │   └── page.tsx  
│   │   │   └── final/              # Финальный раунд  
│   │   │       └── page.tsx  
│   │   └── setup/                  # Настройка игры  
│   │       └── page.tsx  
│   ├── favicon.ico  
│   ├── globals.css                 # Глобальные стили  
│   ├── layout.tsx                  # Корневой layout  
│   └── page.tsx                     # Главная страница (меню)  
│  
├── app-pages/                      # Композиция страниц  
│   ├── final-round/  
│   │   └── ui/  
│   │       └── final-round-page.tsx  
│   ├── game-ending/  
│   │   └── ui/  
│   │       └── game-ending-page.tsx  
│   ├── game-round/  
│   │   └── ui/  
│   │       └── game-round-page.tsx  
│   ├── main-menu/  
│   │   └── ui/  
│   │       └── main-menu-page.tsx  
│   ├── question-page/  
│   │   └── question-page.tsx  
│   └── setup-game/  
│       ├── lib/  
│       │   └── use-setup-page.ts  
│       ├── model/  
│       │   └── setup-game-store.ts  
│       ├── ui/  
│       │   └── setup-game-page.tsx  
│       └── index.ts  
│  
├── entities/                       # Бизнес-сущности  
│   ├── game/                       # Сущность "Игра"  
│   │   ├── lib/  
│   │   │   ├── create-current-question.ts  
│   │   │   └── get-round-title.ts  
│   │   ├── model/  
│   │   │   ├── slices/             # Слайсы состояния  
│   │   │   │   ├── dev-mode-slice.ts  
│   │   │   │   ├── players-slice.ts  
│   │   │   │   ├── question-slice.ts  
│   │   │   │   ├── status-slice.ts  
│   │   │   │   ├── timer-slice.ts  
│   │   │   │   └── usedIds-slice.ts  
│   │   │   ├── game-constants.ts  
│   │   │   ├── game-store.ts  
│   │   │   ├── game-types.ts  
│   │   │   └── index.ts  
│   │   └── index.ts  
│   │  
│   ├── host/                       # Сущность "Ведущий"  
│   │   ├── lib/  
│   │   │   ├── get-random-phrase.ts  
│   │   │   └── use-host-phrases.ts  
│   │   ├── model/  
│   │   │   └── host-store.ts  
│   │   ├── ui/  
│   │   │   └── host-phrase.tsx  
│   │   ├── host-types.ts  
│   │   └── index.ts  
│   │  
│   └── player/                     # Сущность "Игрок"  
│       ├── lib/  
│       │   ├── use-find-player-in-players.ts  
│       │   └── validate-players.ts  
│       ├── ui/  
│       │   ├── player-active-card.tsx  
│       │   ├── player-card-wrapper.tsx  
│       │   ├── player-setup-card.tsx  
│       │   └── player-winner-card.tsx  
│       ├── player-constants.ts  
│       ├── player-types.ts  
│       └── index.ts  
│  
├── features/                       # Пользовательские сценарии  
│   ├── answer-question/            # Ответ на вопрос  
│   │   ├── lib/  
│   │   │   ├── use-answer-question.ts  
│   │   │   ├── use-disable-question.ts  
│   │   │   ├── use-handle-correct.ts  
│   │   │   ├── use-handle-incorrect.ts   
│   │   │   ├── use-question-timeout.ts  
│   │   │   └── use-timeout-return.ts  
│   │   ├── model/  
│   │   │   └── answer-input-store.ts  
│   │   ├── ui/  
│   │   │   └── answer-input.tsx  
│   │   └── index.ts  
│   │  
│   ├── auction/                    # Механика аукциона  
│   │   ├── lib/  
│   │   │   ├── use-auction-modal.ts  
│   │   │   └── use-auction-table.ts  
│   │   ├── model/  
│   │   │   └── auction-store.ts  
│   │   ├── ui/  
│   │   │   ├── auction-bets-controls.tsx  
│   │   │   └── auction-player-row.tsx  
│   │   ├── auction-constants.ts  
│   │   ├── auction-types.ts  
│   │   └── index.ts  
│   │  
│   ├── cat-in-bag/                 # Кот в мешке  
│   │   ├── lib/  
│   │   │   ├── generate-cat.ts  
│   │   │   ├── use-cat-modal.ts  
│   │   │   └── use-cat-modal-chosen.ts  
│   │   ├── ui/  
│   │   │   └── input-player.tsx  
│   │   └── index.ts  
│   │  
│   ├── end-game/                   # Завершение игры  
│   │   ├── lib/  
│   │   │   └── use-end-game.ts  
│   │   └── index.ts  
│   │  
│   ├── exit-game/                  # Выход из игры  
│   │   ├── lib/  
│   │   │   └── use-exit-game.ts  
│   │   └── index.ts  
│   │  
│   ├── final-question/              # Финальный вопрос  
│   │   ├── lib/  
│   │   │   ├── use-answer-final-question.ts  
│   │   │   ├── use-final-question-click.ts  
│   │   │   ├── use-final-question-timeout.ts  
│   │   │   └── index.ts  
│   │   └── index.ts  
│   │  
│   ├── final-round/                 # Финальный раунд  
│   │   ├── lib/  
│   │   │   ├── use-end-final.ts  
│   │   │   ├── use-start-final.ts  
│   │   │   └── index.ts  
│   │   └── index.ts  
│   │  
│   ├── keys-click/                  # Обработка нажатия клавиш  
│   │   ├── lib/  
│   │   │   ├── use-keys-click.ts  
│   │   │   └── index.ts  
│   │   └── index.ts  
│   │  
│   ├── manage-user-score/           # Управление счетом  
│   │   ├── lib/  
│   │   │   └── use-manage-score.ts  
│   │   ├── ui/  
│   │   │   └── score-controls.tsx  
│   │   ├── score-constants.ts  
│   │   └── index.ts  
│   │  
│   ├── new-round/                   # Начало нового раунда  
│   │   ├── lib/  
│   │   │   ├── filter-material.ts  
│   │   │   ├── generate-positions.ts  
│   │   │   ├── generate-questions.ts  
│   │   │   ├── generate-specials.ts  
│   │   │   ├── get-specials-positions.ts  
│   │   │   ├── set-game-players.ts  
│   │   │   ├── use-new-round.ts  
│   │   │   └── index.ts  
│   │   └── index.ts  
│   │  
│   ├── player-avatar/               # Выбор аватара  
│   │   ├── lib/  
│   │   │   ├── use-player-avatar.ts  
│   │   │   └── index.ts  
│   │   └── index.ts  
│   │  
│   ├── question-click/              # Выбор вопроса  
│   │   ├── lib/  
│   │   │   ├── use-question-click.ts  
│   │   │   └── index.ts  
│   │   └── index.ts  
│   │  
│   ├── return-to-table/             # Возврат к табло  
│   │   ├── lib/  
│   │   │   ├── use-return-to-table.ts  
│   │   │   └── index.ts  
│   │   └── index.ts  
│   │  
│   ├── sounds/                      # Звуковое сопровождение  
│   │   ├── lib/  
│   │   │   └── use-sounds.ts  
│   │   ├── model/  
│   │   │   └── sound-store.ts  
│   │   ├── sound-constants.ts  
│   │   ├── sounds-types.ts  
│   │   └── index.ts  
│   │  
│   ├── timer/                       # Таймер  
│   │   ├── lib/  
│   │   │   ├── use-custom-timer.ts  
│   │   │   └── index.ts  
│   │   └── index.ts  
│   │  
│   └── index.ts  
│  
├── widgets/                         # Композиционные блоки  
│   ├── auction/  
│   │   └── ui/  
│   │       └── auction-widget.tsx  
│   ├── current-question/  
│   │   └── ui/  
│   │       └── current-question-widget.tsx  
│   ├── final/  
│   │   └── ui/  
│   │       ├── ending-table.tsx  
│   │       ├── final-table.tsx  
│   │       ├── player-turn.tsx  
│   │       ├── players-bets.tsx  
│   │       ├── process-table.tsx  
│   │       └── index.ts  
│   ├── header/  
│   │   └── ui/  
│   │       └── header.tsx  
│   ├── host/  
│   │   └── ui/  
│   │       └── host-widget.tsx  
│   ├── modal/  
│   │   └── ui/  
│   │       └── index.ts  
│   ├── players-list/  
│   │   └── ui/  
│   │       └── players-list.tsx  
│   ├── questions-table/  
│   │   └── ui/  
│   │       └── questions-table.tsx  
│   └── index.ts  
│  
├── providers/                       # Провайдеры  
│   ├── audio-provider.tsx  
│   ├── theme-provider.tsx  
│   └── index.ts  
│  
├── shared/                          # Переиспользуемый код  
│   ├── config/  
│   │   ├── pages-url-config.ts  
│   │   └── index.ts  
│   ├── constants/  
│   │   ├── colors-constants.ts  
│   │   ├── seo-constants.ts  
│   │   └── index.ts  
│   ├── lib/  
│   │   ├── compress-image.ts  
│   │   ├── create-enter-listener.ts  
│   │   ├── utils.ts  
│   │   └── index.ts  
│   ├── model/  
│   │   ├── modal-store.ts  
│   │   └── index.ts  
│   └── ui/  
│       ├── backgrounds/  
│       ├── vectors/  
│       ├── badge.tsx  
│       ├── button.tsx  
│       ├── file-input.tsx  
│       ├── frame.tsx  
│       ├── input.tsx  
│       ├── slider.tsx  
│       ├── switch.tsx  
│       └── index.ts  
│  
└── public_original/                  # Статические файлы (в корне проекта)  
    ├── avatars/  
    ├── data/                         # Предустановленные вопросы  
    ├── sounds/                       # Звуковые эффекты  
    ├── host-image.png  
    └── scripts/                      # Скрипты сборки  
        ├── postbuild.js  
        ├── prebuild.js  
        └── predev.js  
