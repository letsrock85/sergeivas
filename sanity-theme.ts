import { buildLegacyTheme } from 'sanity'

// Параметры для увеличения высоты элементов навигации
const props = {
  '--main-navigation-item-height': '78px',
  '--card-padding-large': '124px',          // Увеличиваем отступы карточек
  '--list-item-height': '178px',            // Высота элементов списка
  '--selectable-item-height': '178px',      // Высота выбираемых элементов
  '--small-button-height': '138px',         // Высота маленьких кнопок
  '--large-button-height': '160px',         // Высота больших кнопок
  '--button-default-height': '150px',       // Стандартная высота кнопок
}

export const myTheme = buildLegacyTheme({
  /* Base theme colors */
  '--black': '#1a1a1a',
  '--white': '#fff',
  
  '--gray': '#666',
  '--gray-base': '#666',
  
  '--component-bg': '#2a2a2a',
  '--component-text-color': '#fff',
  
  /* Brand colors */
  '--brand-primary': '#2276FC',
  
  // Боковая панель навигации (темная)
  '--main-navigation-color': '#1a1a1a',
  '--main-navigation-color--inverted': '#fff',
  
  // Добавляем наши пользовательские переменные для высоты элементов
  ...props
}) 