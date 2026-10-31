import { Game } from './game.js'

try {
  window.__ironRequiem = new Game()
} catch (error) {
  console.error(error)
  const el = document.getElementById('boot-error')
  if (el) {
    el.hidden = false
    el.textContent = `The arena failed to open: ${error.message}`
  }
}
