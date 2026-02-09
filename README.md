# React + TypeScript + Vite + Chakra UI

## Макет https://www.figma.com/design/aFJkLdtdqmspfSk7cMkBGx/%D0%A2%D0%B5%D1%81%D1%82%D0%BE%D0%B2%D0%BE%D0%B5-%D0%B7%D0%B0%D0%B4%D0%B0%D0%BD%D0%B8%D0%B5?node-id=1-2&t=KGRlAhgOUch7eFzq-0

## Структура проекта

- `src/components/` — UI-компоненты, например Header, NotificationBadge, кнопки, иконки
- `src/layouts/` — Layout-компоненты, например MainLayout с Header и Outlet для страниц
- `src/pages/` — Страницы приложения (RequestsPage, ReportsPage и т.д.)
- `src/router/` — Конфигурация роутов через react-router-dom
- `src/assets/` — Изображения, SVG и другие статические ресурсы
- `src/App.tsx` — Точка входа в приложение, подключает роутер
- `src/main.tsx` — Точка монтирования React и глобальных провайдеров (ChakraProvider и т.д.)

## Технологии

- [React 18](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Chakra UI](https://chakra-ui.com/)
- [React Router v6](https://reactrouter.com/)
- Поддержка SVG иконок через отдельные компоненты

## Как запустить проект

```bash
# Установить зависимости
npm install

# Запустить дев-сервер
npm dev

# Собрать продакшн
npm build
```
