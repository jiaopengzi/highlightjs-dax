import { defineConfig } from "vite-plus"

export default defineConfig({
    pack: {
        dts: {
            tsgo: true,
        },
        format: ["esm", "cjs"],
        minify: true,
        onSuccess: "sass src/theme.scss dist/theme.css --no-source-map --style=compressed",
        exports: {
            customExports: {
                "./theme.css": "./dist/theme.css",
                "./package.json": "./package.json",
            },
        },
    },
    lint: {
        options: {
            typeAware: true,
            typeCheck: true,
        },
        ignorePatterns: ["node_modules/**", "dist/**"], // 忽略node_modules和dist目录
    },
    fmt: {
        semi: false, // 不使用分号
        tabWidth: 4, // 使用4个空格缩进
        singleQuote: false, // 使用单引号
        printWidth: 160, // 每行最大长度为160个字符
        trailingComma: "all", // 保留尾随逗号
        useTabs: false, // 制表符使用空格
        bracketSpacing: true, // 对象大括号带空格
        arrowParens: "always", // 箭头符号参数始终带括号
        ignorePatterns: ["node_modules/**", "dist/**", "*.yaml", "*.yml"], // 忽略node_modules和dist目录
    },
})
