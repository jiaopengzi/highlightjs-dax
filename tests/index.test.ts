/**
 * FilePath    : highlightjs-dax\tests\index.test.ts
 * Author      : jiaopengzi
 * Blog        : https://jiaopengzi.com
 * Copyright   : Copyright (c) 2026 by jiaopengzi, All Rights Reserved.
 * Description : 使用 Vite Plus 的测试框架对 highlightjs-dax 进行单元测试,
 * 验证其正确导出语言定义工厂函数, 能正确高亮 DAX 语法, 并且在特定场景下不会误将 VAR 赋值语句识别为度量标题.
 * 测试覆盖了基本的语法高亮、关键字识别、字符串和数字高亮以及注释处理等方面.
 */

import hljs from "highlight.js/lib/core"
import { expect, test } from "vite-plus/test"
import dax from "../src/index.ts"

test("exports a standard highlight.js language factory", () => {
    const language = dax(hljs)

    expect(typeof dax).toBe("function")
    expect(language.name).toBe("DAX")
    expect(language.case_insensitive).toBe(true)
    expect(language.contains?.length).toBeGreaterThan(0)
})

test("highlights representative DAX syntax", () => {
    hljs.registerLanguage("dax-test", dax)

    const result = hljs.highlight("Total Sales = VAR SalesAmount = sum('Sales'[Amount]) RETURN SalesAmount + 1 // note", { language: "dax-test" })

    expect(result.language).toBe("dax-test")
    expect(result.value).toContain('<span class="hljs-title">Total Sales </span>')
    expect(result.value).toContain('<span class="hljs-keyword">VAR</span>')
    expect(result.value).toContain('<span class="hljs-built_in">sum</span>')
    expect(result.value).toContain('<span class="hljs-symbol">&#x27;Sales&#x27;</span>')
    expect(result.value).toContain('<span class="hljs-symbol">[Amount]</span>')
    expect(result.value).toContain('<span class="hljs-variable">SalesAmount</span>')
    expect(result.value).toContain('<span class="hljs-number">1</span>')
    expect(result.value).toContain('<span class="hljs-comment">// note</span>')
})

test("does not treat VAR assignments as measure titles", () => {
    hljs.registerLanguage("dax-measure-guard-test", dax)

    const result = hljs.highlight("Sales YTD =\nVAR CurrentDate = MAX('Date'[Date])\nRETURN CurrentDate", { language: "dax-measure-guard-test" })

    expect(result.value).toContain('<span class="hljs-title">Sales YTD </span>')
    expect(result.value).toContain('<span class="hljs-keyword">VAR</span> <span class="hljs-variable">CurrentDate</span>')
    expect(result.value).not.toContain('<span class="hljs-title">VAR CurrentDate </span>')
})

test("highlights lowercase keywords, strings, decimals, and block comments", () => {
    hljs.registerLanguage("dax-query-syntax-test", dax)

    const result = hljs.highlight("evaluate FILTER(\n  'Product',\n  'Product'[Category] = \"Bikes\" && 'Product'[ListPrice] > 1000.50\n)\n/* note */", {
        language: "dax-query-syntax-test",
    })

    expect(result.value).toContain('<span class="hljs-keyword">evaluate</span>')
    expect(result.value).toContain('<span class="hljs-built_in">FILTER</span>')
    expect(result.value).toContain('<span class="hljs-string">&quot;Bikes&quot;</span>')
    expect(result.value).toContain('<span class="hljs-number">1000.50</span>')
    expect(result.value).toContain('<span class="hljs-comment">/* note */</span>')
})
