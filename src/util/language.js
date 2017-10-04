
export function iso639ToLang(lang) {
  switch (lang) {
    case 'nob':
      return 'Norwegian Bokmål'
    case 'deu':
      return 'German'
    default:
      return 'Unspecified language'
  }
}
