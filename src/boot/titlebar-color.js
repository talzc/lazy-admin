import { remote } from 'electron'
import { colors } from 'quasar'
const { setBrand } = colors

export default async () => {
  // function to read accent color from system preferences - we need to strip alpha
  function setTitleBarColor () {
    let windowColor = remote.systemPreferences.getAccentColor()
    const hex = windowColor.substr(0, 6)
    setBrand('window-color', `#${hex}`)
  }
  // set titlebar color on launch
  setTitleBarColor()

  // in case someone changes color theme whil app is launched
  remote.systemPreferences.on('accent-color-changed', function () {
    setTitleBarColor()
  })
}
