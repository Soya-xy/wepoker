import pages from 'virtual:generated-pages'
import { NIcon } from 'naive-ui'
import { RouterLink } from 'vue-router'
import type { MenuGroupOption, MenuOption } from 'naive-ui'

interface Route {
  name: string
  children: Route[]
  componentPath: string
  menuName?: string
  menuIcon?: string
  meta?: {
    title: string
    icon: string
    hiddenMenu: boolean
    menuName?: string
    menuIcon?: string
    order?: number
  }
}

function renderIcon(icon?: string) {
  if (!icon)
    return

  return () => h(NIcon, {
    class: icon,
  })
}

const routePage = (pages as unknown as Route[]).sort((a, b) => a.componentPath.split('/').length - b.componentPath.split('/').length)

// 创建父子关系
export function createHierarchy(data: Route[] = routePage, parentPath = '', deep: number = 0): Route[] {
  if (deep >= 40) {
    console.error('达到最大递归深度。')
    return []
  }

  const result: Route[] = []
  data.sort((a, b) => (b.meta?.order || 0) - (a.meta?.order || 0))
  data.forEach((item) => {
    if (!item.meta || item.meta.hiddenMenu || !item.componentPath)
      return

    if (item.componentPath.startsWith(parentPath)) {
      const path = item.componentPath.replace(parentPath, '').split('/')
      const name = path[0]

      if (path.length === 1) {
        result.push({ ...item, children: [] })
      }
      else {
        const existingParent = result.find(parent => parent.name === name)
        if (existingParent) {
          existingParent.children.push(item)
        }
        else {
          const parentItem: Route = { ...item, name, children: [] }

          if (path[path.length - 1] === 'index') {
            parentItem.menuName = item.meta?.menuName
            parentItem.menuIcon = item.meta?.menuIcon
          }

          parentItem.children.push(item)
          result.push(parentItem)
        }
      }
    }
  })

  result.forEach((parent) => {
    if (parent.children.length <= 0)
      return

    parent.children = createHierarchy(parent.children, `${parentPath}${parent.name}/`, deep + 1)
  })

  return result
}

// 获取父子关系并按照路径长短排序

export function createMenu(data: Route[] = [], deep: number = 0) {
  if (deep >= 40) {
    console.error('达到最大递归深度')
    return []
  }
  if (deep === 0)
    data = createHierarchy(routePage)

  if (data.length <= 0)
    return []

  const menu: Array<MenuOption | MenuGroupOption> = []
  data.forEach((v) => {
    if (!v.meta)
      return

    if (!v.meta.hiddenMenu) {
      const item: MenuOption | MenuGroupOption = {
        label: () =>
          v.children.length > 0
            ? (v?.menuName || '未设置菜单名称')
            : h(
              RouterLink,
              {
                to: {
                  name: v.name,
                },
              },
              { default: () => v.meta?.title || '未设置菜单名称' },
            ),
        icon: renderIcon(v.children.length > 0 ? v?.menuIcon : v.meta.icon || 'i-mdi:alert'),
        key: v.name,
      }

      if (v.children && v.children.length > 0)
        item.children = createMenu(v.children, deep + 1)

      menu.push(item)
    }
  })
  return menu
}
