const path = require('path')
module.exports = {
  version: "1.5",
  title: "spright",
  description: "Generate images with spatial accuracy https://huggingface.co/spaces/SPRIGHT-T2I/SPRIGHT-T2I",
  icon: "icon.webp",
  menu: async (kernel) => {
    let installing = await kernel.running(__dirname, "install.js")
    let installed = await kernel.exists(__dirname, "app", "env")
    let running = await kernel.running(__dirname, "start.js")
    if (installing) {
      return [{
        default: true,
        icon: "fa-solid fa-plug",
        text: "Installing",
        href: "install.js",
      }]
    } else if (installed) {
      if (running) {
        let local = kernel.memory.local[path.resolve(__dirname, "start.js")]
        if (local && local.url) {
          return [{
            default: true,
            icon: "fa-solid fa-rocket",
            text: "Open Web UI",
            href: local.url,
          }, {
            icon: 'fa-solid fa-terminal',
            text: "Terminal",
            href: "start.js",
          }]
        } else {
          return [{
            default: true,
            icon: 'fa-solid fa-terminal',
            text: "Terminal",
            href: "start.js",
          }]
        }
      } else {
        return [{
          default: true,
          icon: "fa-solid fa-power-off",
          text: "Start",
          href: "start.js",
        }, {
          icon: "fa-solid fa-plug",
          text: "Update",
          href: "update.js",
        }, {
          icon: "fa-solid fa-plug",
          text: "Install",
          href: "install.js",
        }, {
          icon: "fa-regular fa-circle-xmark",
          text: "Reset",
          href: "reset.js",
        }]
      }
    } else {
      return [{
        default: true,
        icon: "fa-solid fa-plug",
        text: "Install",
        href: "install.js",
      }]
    }
  }
}
