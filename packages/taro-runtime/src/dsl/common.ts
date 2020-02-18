import * as React from 'react'
import { isFunction, EMPTY_OBJ, ensure, Shortcuts, isUndefined } from '@tarojs/shared'
import { eventHandler } from '../dom/event'
import { Current } from '../current'
import { document } from '../bom/document'
import { TaroRootElement } from '../dom/root'
import { MpInstance } from '../hydrate'
import { Instance, PageInstance, PageProps } from './instance'
import { incrementId } from '../utils'
import { perf } from '../perf'
import { PAGE_INIT } from '../constants'
import { isBrowser } from '../env'

const instances = new Map<string, Instance>()

export function injectPageInstance (inst: Instance<PageProps>, id: string) {
  instances.set(id, inst)
}

export function getPageInstance (id: string) {
  return instances.get(id)
}

function addLeadingSlash (path?: string) {
  if (path == null) {
    return ''
  }
  return path.charAt(0) === '/' ? path : '/' + path
}

const pageId = incrementId()

export function createPageConfig (component: React.ComponentClass, pageName?: string, data?: Record<string, unknown>) {
  const id = pageName ?? `taro_page_${pageId()}`
  // 小程序 Page 构造器是一个傲娇小公主，不能把复杂的对象挂载到参数上
  let pageElement: TaroRootElement | null = null
  let instance: Instance = EMPTY_OBJ
  const isReact = process.env.FRAMEWORK !== 'vue' // isReact means all kind of react-like library

  function safeExecute (lifecycle: keyof PageInstance, ...args: unknown[]) {
    if (instance == null) {
      return
    }

    if (isReact) {
      if (lifecycle === 'onShow') {
        lifecycle = 'componentDidShow'
      } else if (lifecycle === 'onHide') {
        lifecycle = 'componentDidHide'
      }
    }

    const func = isReact ? instance[lifecycle] : instance.$options[lifecycle]
    if (!isFunction(func)) {
      return
    }

    return func.apply(instance, args)
  }

  const config: PageInstance = {
    onLoad (this: MpInstance, options, cb?: Function) {
      Current.router = {
        params: options,
        path: addLeadingSlash(this.route || this.__route__)
      }

      Current.page = this as any

      perf.start(PAGE_INIT)

      Current.app!.mount(component, id, () => {
        pageElement = document.getElementById<TaroRootElement>(id)
        instance = instances.get(id) || EMPTY_OBJ

        ensure(pageElement !== null, '没有找到页面实例。')
        safeExecute('onLoad', options)
        if (!isBrowser) {
          pageElement.ctx = this
          pageElement.performUpdate(true, cb)
        }
      })
    },
    onUnload () {
      Current.router = null
      Current.page = null

      Current.app!.unmount(id, () => {
        pageElement!.ctx = null
      })
    },
    onShow () {
      safeExecute('onShow')
    },
    onHide () {
      safeExecute('onHide')
    },
    onPullDownRefresh () {
      return safeExecute('onPullDownRefresh')
    },
    onReachBottom () {
      return safeExecute('onReachBottom')
    },
    onPageScroll (options) {
      return safeExecute('onPageScroll', options)
    },
    onShareAppMessage (options) {
      const id = options.target.id
      const element = document.getElementById(id)
      if (element) {
        options.target.dataset = element.dataset
      }
      return safeExecute('onShareAppMessage', options)
    },
    onResize (options) {
      return safeExecute('onResize', options)
    },
    onTabItemTap (options) {
      return safeExecute('onTabItemTap', options)
    },
    onTitleClick () {
      return safeExecute('onTitleClick')
    },
    onOptionMenuClick () {
      return safeExecute('onOptionMenuClick')
    },
    onPopMenuClick () {
      return safeExecute('onPopMenuClick')
    },
    onPullIntercept () {
      return safeExecute('onPullIntercept')
    }
  }

  config.eh = eventHandler

  if (!isUndefined(data)) {
    config.data = data
  }

  return config
}

export function createComponentConfig () {
  return {
    properties: {
      i: {
        type: Object,
        value: {
          [Shortcuts.NodeName]: 'view'
        }
      }
    },
    options: {
      addGlobalClass: true
    },
    methods: {
      eh: eventHandler
    }
  }
}
