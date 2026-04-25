/**
 * FilePath    : highlightjs-dax\src\types.ts
 * Author      : jiaopengzi
 * Blog        : https://jiaopengzi.com
 * Copyright   : Copyright (c) 2026 by jiaopengzi, All Rights Reserved.
 * Description : 定义 DAX 语言模式对象、语言定义对象以及 highlight.js 运行时 API 子集的 TypeScript 类型.
 */

/**
 * 描述 highlight.js 模式对象的最小结构, 供 DAX 语法规则复用.
 */
export type DaxMode = {
    scope?: string | Record<number, string>
    begin?: RegExp | string | Array<RegExp | string>
    end?: RegExp | string | Array<RegExp | string>
    match?: RegExp | string | Array<RegExp | string>
    variants?: DaxMode[]
    contains?: Array<DaxMode | "self">
    relevance?: number
}

/**
 * 描述 DAX 语言工厂返回的完整语言定义对象.
 */
export type DaxLanguage = DaxMode & {
    name: string
    case_insensitive?: boolean
    contains: DaxMode[]
}

/**
 * 描述当前 DAX 语法实现依赖的 highlight.js 运行时 API 子集.
 */
export type DaxHighlightApi = {
    regex: {
        concat: (...args: Array<RegExp | string>) => string
        either: (...args: Array<RegExp | string>) => string
    }
    COMMENT: (begin: string | RegExp, end: string | RegExp, modeOpts?: DaxMode | object) => DaxMode
    C_BLOCK_COMMENT_MODE: DaxMode
}
