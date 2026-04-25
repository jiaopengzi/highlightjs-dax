/**
 * FilePath    : highlightjs-dax\tests\theme.test.ts
 * Author      : jiaopengzi
 * Blog        : https://jiaopengzi.com
 * Copyright   : Copyright (c) 2026 by jiaopengzi, All Rights Reserved.
 * Description : 使用 Vite Plus 的测试框架对 highlightjs-dax 的主题样式进行单元测试,
 * 验证 package.json 中正确导出主题入口, 确保 dist 目录结构适合发布,
 * 并且能够成功编译 SCSS 主题文件为包含预期 CSS 规则的纯 CSS 输出.
 */

import { readFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { compile } from "sass"
import { expect, test } from "vite-plus/test"

type PackageJsonShape = {
    exports?: Record<string, string | Record<string, string>>
    files?: string[]
    scripts?: Record<string, string>
    style?: string
}

const packageJsonPath = fileURLToPath(new URL("../package.json", import.meta.url))
const themePath = fileURLToPath(new URL("../src/theme.scss", import.meta.url))
const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8")) as PackageJsonShape

test("exports the public css theme entrypoint", () => {
    expect(packageJson.exports?.["./theme.css"]).toBe("./dist/theme.css")
    expect(packageJson.exports?.["./theme.scss"]).toBeUndefined()
})

test("keeps dist publishable and exposes the built css as package style", () => {
    expect(packageJson.files).toContain("dist")
    expect(packageJson.style).toBe("./dist/theme.css")
    expect(packageJson.scripts?.build).toBe("vp pack")
})

test("compiles the dax theme stylesheet to plain css", () => {
    const result = compile(themePath, {
        sourceMap: false,
        style: "expanded",
    })

    expect(result.css).toContain(".hljs {")
    expect(result.css).toContain(".hljs-keyword,")
    expect(result.css).toContain(".hljs-comment,")
    expect(result.css).not.toContain("$")
})
