# Sanity Webhook + Vercel ISR План

## Цель
Заменить полный rebuild (~2 мин) на мгновенный revalidate (~200мс)

## Текущее состояние
- Sanity webhook настроен на вызов build в Vercel
- API endpoint `/api/revalidate-path` создан но не используется
- Переменная `SANITY_HOOK_SECRET` пустая

## План задач

### 1. Sanity Studio - Настройка Webhook
URL: `https://sergeivas.com/api/revalidate-path`

Filter:
```groq
_type in ["blogPost", "project", "author", "page"]
```

Projection:
```json
{
  "_type": _type,
  "slug": slug,
  "path": select(
    _type == "blogPost" => "/blog/" + slug.current,
    _type == "project" => "/projects/" + slug.current,
    _type == "author" => "/",
    "/"
  )
}
```

Trigger: Create, Update, Delete
HTTP Method: POST

### 2. Vercel - Добавить переменную
`SANITY_HOOK_SECRET=<значение из Sanity webhook secret>`

### 3. Тестирование
1. Изменить контент в Sanity Studio
2. Проверить что страница обновилась мгновенно

## Как это работает
1. Sanity → Webhook POST → `/api/revalidate-path`
2. API → revalidatePath(path) из payload
3. Next.js CDN → инвалидирует только нужный путь

## Проверка endpoint
```bash
# Локальный тест
curl -X POST https://sergeivas.com/api/revalidate-path \
  -H "Content-Type: application/json" \
  -d '{"_type":"blogPost","slug":{"current":"test-post"},"path":"/blog/test-post"}'
```

## Удалённые файлы
- force-build.txt