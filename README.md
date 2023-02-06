# Introduction

`eslint-plugin-svelte` is [ESLint] plugin for [Svelte].  
It provides many unique check rules by using the template AST.  
You can check on the [Online DEMO](https://ota-meshi.github.io/eslint-plugin-svelte/playground/).

[![NPM license](https://img.shields.io/npm/l/eslint-plugin-svelte.svg)](https://www.npmjs.com/package/eslint-plugin-svelte)
[![NPM version](https://img.shields.io/npm/v/eslint-plugin-svelte.svg)](https://www.npmjs.com/package/eslint-plugin-svelte)
[![NPM downloads](https://img.shields.io/badge/dynamic/json.svg?label=downloads&colorB=green&suffix=/day&query=$.downloads&uri=https://api.npmjs.org//downloads/point/last-day/eslint-plugin-svelte&maxAge=3600)](http://www.npmtrends.com/eslint-plugin-svelte)
[![NPM downloads](https://img.shields.io/npm/dw/eslint-plugin-svelte.svg)](http://www.npmtrends.com/eslint-plugin-svelte)
[![NPM downloads](https://img.shields.io/npm/dm/eslint-plugin-svelte.svg)](http://www.npmtrends.com/eslint-plugin-svelte)
[![NPM downloads](https://img.shields.io/npm/dy/eslint-plugin-svelte.svg)](http://www.npmtrends.com/eslint-plugin-svelte)
[![NPM downloads](https://img.shields.io/npm/dt/eslint-plugin-svelte.svg)](http://www.npmtrends.com/eslint-plugin-svelte)
[![Build Status](https://github.com/ota-meshi/eslint-plugin-svelte/workflows/CI/badge.svg?branch=main)](https://github.com/ota-meshi/eslint-plugin-svelte/actions?query=workflow%3ACI)

[![type-coverage](https://img.shields.io/badge/dynamic/json.svg?label=type-coverage&prefix=%E2%89%A5&suffix=%&query=$.typeCoverage.atLeast&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fota-meshi%2Feslint-plugin-svelte%2Fmain%2Fpackage.json)](https://github.com/plantain-00/type-coverage)
[![Conventional Commits](https://img.shields.io/badge/conventional%20commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![Code Style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![changesets](https://img.shields.io/badge/maintained%20with-changesets-176de3.svg)](https://github.com/atlassian/changesets)

## :name_badge: What is this plugin?

[ESLint] plugin for [Svelte].  
It provides many unique check rules using the AST generated by [svelte-eslint-parser].

### ❓ Why?

[Svelte] has the official [ESLint] plugin the [eslint-plugin-svelte3]. The [eslint-plugin-svelte3] works well enough to check scripts. However, it does not handle the AST of the template, which makes it very difficult for third parties to create their own the [ESLint] rules for the [Svelte].

The [svelte-eslint-parser] aims to make it easy to create your own rules for the [Svelte] by allowing the template AST to be used in the rules.

### ❗ Attention

The [svelte-eslint-parser] and the `eslint-plugin-svelte` can not be used with the [eslint-plugin-svelte3].

[svelte-eslint-parser]: https://github.com/ota-meshi/svelte-eslint-parser
[eslint-plugin-svelte3]: https://github.com/sveltejs/eslint-plugin-svelte3

<!--DOCS_IGNORE_START-->

## Migration Guide

To migrate from `eslint-plugin-svelte` v1, or [`@ota-meshi/eslint-plugin-svelte`](https://www.npmjs.com/package/@ota-meshi/eslint-plugin-svelte), please refer to the [migration guide](https://ota-meshi.github.io/eslint-plugin-svelte/migration/).

## :book: Documentation

See [documents](https://ota-meshi.github.io/eslint-plugin-svelte/).

## :cd: Installation

```bash
npm install --save-dev eslint eslint-plugin-svelte svelte
```

> **Requirements**
>
> - ESLint v7.0.0 and above
> - Node.js v14.17.x, v16.x and above

<!--DOCS_IGNORE_END-->

## :book: Usage

<!--USAGE_SECTION_START-->
<!--USAGE_GUIDE_START-->

### Configuration

Use `.eslintrc.*` file to configure rules. See also: <https://eslint.org/docs/user-guide/configuring>.

Example **.eslintrc.js**:

```js
module.exports = {
  extends: [
    // add more generic rule sets here, such as:
    // 'eslint:recommended',
    "plugin:svelte/recommended",
  ],
  rules: {
    // override/add rules settings here, such as:
    // 'svelte/rule-name': 'error'
  },
}
```

This plugin provides configs:

- `plugin:svelte/base` ... Configuration to enable correct Svelte parsing.
- `plugin:svelte/recommended` ... Above, plus rules to prevent errors or unintended behavior.
- `plugin:svelte/prettier` ... Turns off rules that may conflict with [Prettier](https://prettier.io/) (You still need to configure prettier to work with svelte yourself, for example by using [prettier-plugin-svelte](https://github.com/sveltejs/prettier-plugin-svelte).).

See [the rule list](https://ota-meshi.github.io/eslint-plugin-svelte/rules/) to get the `rules` that this plugin provides.

::: warning ❗ Attention

The `eslint-plugin-svelte` can not be used with the [eslint-plugin-svelte3].
If you are using [eslint-plugin-svelte3] you need to remove it.

```diff
  "plugins": [
-   "svelte3"
  ]
```

:::

#### Parser Configuration

If you have specified a parser, you need to configure a parser for `.svelte`.

For example, if you are using the `"@babel/eslint-parser"`, configure it as follows:

```js
module.exports = {
  // ...
  extends: ["plugin:svelte/recommended"],
  // ...
  parser: "@babel/eslint-parser",
  // Add an `overrides` section to add a parser configuration for svelte.
  overrides: [
    {
      files: ["*.svelte"],
      parser: "svelte-eslint-parser",
    },
    // ...
  ],
  // ...
}
```

For example, if you are using the `"@typescript-eslint/parser"`, and if you want to use TypeScript in `<script>` of `.svelte`, you need to add more `parserOptions` configuration.

```js
module.exports = {
  // ...
  extends: ["plugin:svelte/recommended"],
  // ...
  parser: "@typescript-eslint/parser",
  parserOptions: {
    // ...
    project: "path/to/your/tsconfig.json",
    extraFileExtensions: [".svelte"], // This is a required setting in `@typescript-eslint/parser` v4.24.0.
  },
  overrides: [
    {
      files: ["*.svelte"],
      parser: "svelte-eslint-parser",
      // Parse the `<script>` in `.svelte` as TypeScript by adding the following configuration.
      parserOptions: {
        parser: "@typescript-eslint/parser",
      },
    },
    // ...
  ],
  // ...
}
```

If you have a mix of TypeScript and JavaScript in your project, use a multiple parser configuration.

```js
module.exports = {
  // ...
  overrides: [
    {
      files: ["*.svelte"],
      parser: "svelte-eslint-parser",
      parserOptions: {
        parser: {
          // Specify a parser for each lang.
          ts: "@typescript-eslint/parser",
          js: "espree",
          typescript: "@typescript-eslint/parser",
        },
      },
    },
    // ...
  ],
  // ...
}
```

See also <https://github.com/ota-meshi/svelte-eslint-parser#readme>.

#### settings.svelte

You can change the behavior of this plugin with some settings.

e.g.

```js
module.exports = {
  // ...
  settings: {
    svelte: {
      ignoreWarnings: [
        "@typescript-eslint/no-unsafe-assignment",
        "@typescript-eslint/no-unsafe-member-access",
      ],
      compileOptions: {
        postcss: {
          configFilePath: "./path/to/my/postcss.config.js",
        },
      },
      kit: {
        files: {
          routes: "src/routes",
        },
      },
    },
  },
  // ...
}
```

#### settings.svelte.ignoreWarnings

Specifies an array of rules that ignore reports in the template.  
For example, set rules on the template that cannot avoid false positives.

#### settings.svelte.compileOptions

Specifies options for Svelte compile. Effects rules that use Svelte compile. The target rules are [svelte/valid-compile](https://ota-meshi.github.io/eslint-plugin-svelte/rules/valid-compile/) and [svelte/no-unused-svelte-ignore](https://ota-meshi.github.io/eslint-plugin-svelte/rules/no-unused-svelte-ignore/). **Note that it has no effect on ESLint's custom parser**.

- `postcss` ... Specifies options related to PostCSS. You can disable the PostCSS process by specifying `false`.
  - `configFilePath` ... Specifies the path of the directory containing the PostCSS configuration.

#### settings.svelte.kit

If you use SvelteKit with not default configuration, you need to set below configurations.
The schema is subset of SvelteKit's configuration.
Therefore please check [SvelteKit docs](https://kit.svelte.dev/docs/configuration) for more details.

e.g.

```js
module.exports = {
  // ...
  settings: {
    svelte: {
      kit: {
        files: {
          routes: "src/routes",
        },
      },
    },
  },
  // ...
}
```

### Running ESLint from the command line

If you want to run `eslint` from the command line, make sure you include the `.svelte` extension using [the `--ext` option](https://eslint.org/docs/user-guide/configuring#specifying-file-extensions-to-lint) or a glob pattern, because ESLint targets only `.js` files by default.

Examples:

```bash
eslint --ext .js,.svelte src
eslint "src/**/*.{js,svelte}"
```

## :computer: Editor Integrations

### Visual Studio Code

Use the [dbaeumer.vscode-eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) extension that Microsoft provides officially.

You have to configure the `eslint.validate` option of the extension to check `.svelte` files, because the extension targets only `*.js` or `*.jsx` files by default.

Example **.vscode/settings.json**:

```json
{
  "eslint.validate": ["javascript", "javascriptreact", "svelte"]
}
```

<!--USAGE_GUIDE_END-->
<!--USAGE_SECTION_END-->

## :white_check_mark: Rules

<!-- prettier-ignore-start -->
<!--RULES_SECTION_START-->

:wrench: Indicates that the rule is fixable, and using `--fix` option on the [command line](https://eslint.org/docs/user-guide/command-line-interface#fixing-problems) can automatically fix some of the reported problems.  
:bulb: Indicates that some problems reported by the rule are manually fixable by editor [suggestions](https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions).  
:star: Indicates that the rule is included in the `plugin:svelte/recommended` config.

<!--RULES_TABLE_START-->

## Possible Errors

These rules relate to possible syntax or logic errors in Svelte code:

| Rule ID | Description |    |
|:--------|:------------|:---|
| [svelte/infinite-reactive-loop](https://ota-meshi.github.io/eslint-plugin-svelte/rules/infinite-reactive-loop/) | Svelte runtime prevents calling the same reactive statement twice in a microtask. But between different microtask, it doesn't prevent. |  |
| [svelte/no-dom-manipulating](https://ota-meshi.github.io/eslint-plugin-svelte/rules/no-dom-manipulating/) | disallow DOM manipulating |  |
| [svelte/no-dupe-else-if-blocks](https://ota-meshi.github.io/eslint-plugin-svelte/rules/no-dupe-else-if-blocks/) | disallow duplicate conditions in `{#if}` / `{:else if}` chains | :star: |
| [svelte/no-dupe-on-directives](https://ota-meshi.github.io/eslint-plugin-svelte/rules/no-dupe-on-directives/) | disallow duplicate `on:` directives |  |
| [svelte/no-dupe-style-properties](https://ota-meshi.github.io/eslint-plugin-svelte/rules/no-dupe-style-properties/) | disallow duplicate style properties | :star: |
| [svelte/no-dupe-use-directives](https://ota-meshi.github.io/eslint-plugin-svelte/rules/no-dupe-use-directives/) | disallow duplicate `use:` directives |  |
| [svelte/no-dynamic-slot-name](https://ota-meshi.github.io/eslint-plugin-svelte/rules/no-dynamic-slot-name/) | disallow dynamic slot name | :star::wrench: |
| [svelte/no-export-load-in-svelte-module-in-kit-pages](https://ota-meshi.github.io/eslint-plugin-svelte/rules/no-export-load-in-svelte-module-in-kit-pages/) | disallow exporting load functions in `*.svelte` module in Svelte Kit page components. |  |
| [svelte/no-not-function-handler](https://ota-meshi.github.io/eslint-plugin-svelte/rules/no-not-function-handler/) | disallow use of not function in event handler | :star: |
| [svelte/no-object-in-text-mustaches](https://ota-meshi.github.io/eslint-plugin-svelte/rules/no-object-in-text-mustaches/) | disallow objects in text mustache interpolation | :star: |
| [svelte/no-shorthand-style-property-overrides](https://ota-meshi.github.io/eslint-plugin-svelte/rules/no-shorthand-style-property-overrides/) | disallow shorthand style properties that override related longhand properties | :star: |
| [svelte/no-store-async](https://ota-meshi.github.io/eslint-plugin-svelte/rules/no-store-async/) | disallow using async/await inside svelte stores because it causes issues with the auto-unsubscribing features |  |
| [svelte/no-unknown-style-directive-property](https://ota-meshi.github.io/eslint-plugin-svelte/rules/no-unknown-style-directive-property/) | disallow unknown `style:property` | :star: |
| [svelte/require-store-callbacks-use-set-param](https://ota-meshi.github.io/eslint-plugin-svelte/rules/require-store-callbacks-use-set-param/) | store callbacks must use `set` param |  |
| [svelte/require-store-reactive-access](https://ota-meshi.github.io/eslint-plugin-svelte/rules/require-store-reactive-access/) | disallow to use of the store itself as an operand. Need to use $ prefix or get function. | :wrench: |
| [svelte/valid-compile](https://ota-meshi.github.io/eslint-plugin-svelte/rules/valid-compile/) | disallow warnings when compiling. | :star: |
| [svelte/valid-prop-names-in-kit-pages](https://ota-meshi.github.io/eslint-plugin-svelte/rules/valid-prop-names-in-kit-pages/) | disallow props other than data or errors in Svelte Kit page components. |  |

## Security Vulnerability

These rules relate to security vulnerabilities in Svelte code:

| Rule ID | Description |    |
|:--------|:------------|:---|
| [svelte/no-at-html-tags](https://ota-meshi.github.io/eslint-plugin-svelte/rules/no-at-html-tags/) | disallow use of `{@html}` to prevent XSS attack | :star: |
| [svelte/no-target-blank](https://ota-meshi.github.io/eslint-plugin-svelte/rules/no-target-blank/) | disallow `target="_blank"` attribute without `rel="noopener noreferrer"` |  |

## Best Practices

These rules relate to better ways of doing things to help you avoid problems:

| Rule ID | Description |    |
|:--------|:------------|:---|
| [svelte/button-has-type](https://ota-meshi.github.io/eslint-plugin-svelte/rules/button-has-type/) | disallow usage of button without an explicit type attribute |  |
| [svelte/no-at-debug-tags](https://ota-meshi.github.io/eslint-plugin-svelte/rules/no-at-debug-tags/) | disallow the use of `{@debug}` | :star: |
| [svelte/no-reactive-functions](https://ota-meshi.github.io/eslint-plugin-svelte/rules/no-reactive-functions/) | it's not necessary to define functions in reactive statements | :bulb: |
| [svelte/no-reactive-literals](https://ota-meshi.github.io/eslint-plugin-svelte/rules/no-reactive-literals/) | don't assign literal values in reactive statements | :bulb: |
| [svelte/no-unused-svelte-ignore](https://ota-meshi.github.io/eslint-plugin-svelte/rules/no-unused-svelte-ignore/) | disallow unused svelte-ignore comments | :star: |
| [svelte/no-useless-mustaches](https://ota-meshi.github.io/eslint-plugin-svelte/rules/no-useless-mustaches/) | disallow unnecessary mustache interpolations | :wrench: |
| [svelte/prefer-destructured-store-props](https://ota-meshi.github.io/eslint-plugin-svelte/rules/prefer-destructured-store-props/) | destructure values from object stores for better change tracking & fewer redraws | :bulb: |
| [svelte/require-event-dispatcher-types](https://ota-meshi.github.io/eslint-plugin-svelte/rules/require-event-dispatcher-types/) | require type parameters for `createEventDispatcher` |  |
| [svelte/require-optimized-style-attribute](https://ota-meshi.github.io/eslint-plugin-svelte/rules/require-optimized-style-attribute/) | require style attributes that can be optimized |  |
| [svelte/require-stores-init](https://ota-meshi.github.io/eslint-plugin-svelte/rules/require-stores-init/) | require initial value in store |  |

## Stylistic Issues

These rules relate to style guidelines, and are therefore quite subjective:

| Rule ID | Description |    |
|:--------|:------------|:---|
| [svelte/derived-has-same-inputs-outputs](https://ota-meshi.github.io/eslint-plugin-svelte/rules/derived-has-same-inputs-outputs/) | derived store should use same variable names between values and callback |  |
| [svelte/first-attribute-linebreak](https://ota-meshi.github.io/eslint-plugin-svelte/rules/first-attribute-linebreak/) | enforce the location of first attribute | :wrench: |
| [svelte/html-closing-bracket-spacing](https://ota-meshi.github.io/eslint-plugin-svelte/rules/html-closing-bracket-spacing/) | require or disallow a space before tag's closing brackets | :wrench: |
| [svelte/html-quotes](https://ota-meshi.github.io/eslint-plugin-svelte/rules/html-quotes/) | enforce quotes style of HTML attributes | :wrench: |
| [svelte/html-self-closing](https://ota-meshi.github.io/eslint-plugin-svelte/rules/html-self-closing/) | enforce self-closing style | :wrench: |
| [svelte/indent](https://ota-meshi.github.io/eslint-plugin-svelte/rules/indent/) | enforce consistent indentation | :wrench: |
| [svelte/max-attributes-per-line](https://ota-meshi.github.io/eslint-plugin-svelte/rules/max-attributes-per-line/) | enforce the maximum number of attributes per line | :wrench: |
| [svelte/mustache-spacing](https://ota-meshi.github.io/eslint-plugin-svelte/rules/mustache-spacing/) | enforce unified spacing in mustache | :wrench: |
| [svelte/no-extra-reactive-curlies](https://ota-meshi.github.io/eslint-plugin-svelte/rules/no-extra-reactive-curlies/) | disallow wrapping single reactive statements in curly braces | :bulb: |
| [svelte/no-spaces-around-equal-signs-in-attribute](https://ota-meshi.github.io/eslint-plugin-svelte/rules/no-spaces-around-equal-signs-in-attribute/) | disallow spaces around equal signs in attribute | :wrench: |
| [svelte/prefer-class-directive](https://ota-meshi.github.io/eslint-plugin-svelte/rules/prefer-class-directive/) | require class directives instead of ternary expressions | :wrench: |
| [svelte/prefer-style-directive](https://ota-meshi.github.io/eslint-plugin-svelte/rules/prefer-style-directive/) | require style directives instead of style attribute | :wrench: |
| [svelte/shorthand-attribute](https://ota-meshi.github.io/eslint-plugin-svelte/rules/shorthand-attribute/) | enforce use of shorthand syntax in attribute | :wrench: |
| [svelte/shorthand-directive](https://ota-meshi.github.io/eslint-plugin-svelte/rules/shorthand-directive/) | enforce use of shorthand syntax in directives | :wrench: |
| [svelte/sort-attributes](https://ota-meshi.github.io/eslint-plugin-svelte/rules/sort-attributes/) | enforce order of attributes | :wrench: |
| [svelte/spaced-html-comment](https://ota-meshi.github.io/eslint-plugin-svelte/rules/spaced-html-comment/) | enforce consistent spacing after the `<!--` and before the `-->` in a HTML comment | :wrench: |

## Extension Rules

These rules extend the rules provided by ESLint itself, or other plugins to work well in Svelte:

| Rule ID | Description |    |
|:--------|:------------|:---|
| [svelte/no-inner-declarations](https://ota-meshi.github.io/eslint-plugin-svelte/rules/no-inner-declarations/) | disallow variable or `function` declarations in nested blocks | :star: |
| [svelte/no-trailing-spaces](https://ota-meshi.github.io/eslint-plugin-svelte/rules/no-trailing-spaces/) | disallow trailing whitespace at the end of lines | :wrench: |

## System

These rules relate to this plugin works:

| Rule ID | Description |    |
|:--------|:------------|:---|
| [svelte/comment-directive](https://ota-meshi.github.io/eslint-plugin-svelte/rules/comment-directive/) | support comment-directives in HTML template | :star: |
| [svelte/system](https://ota-meshi.github.io/eslint-plugin-svelte/rules/system/) | system rule for working this plugin | :star: |

## Deprecated

- :warning: We're going to remove deprecated rules in the next major release. Please migrate to successor/new rules.
- :innocent: We don't fix bugs which are in deprecated rules since we don't have enough resources.

| Rule ID | Replaced by |
|:--------|:------------|
| [svelte/@typescript-eslint/no-unnecessary-condition](https://ota-meshi.github.io/eslint-plugin-svelte/rules/@typescript-eslint/no-unnecessary-condition/) | This rule is no longer needed when using svelte-eslint-parser>=v0.19.0. |

<!--RULES_TABLE_END-->
<!--RULES_SECTION_END-->
<!-- prettier-ignore-end -->

<!--DOCS_IGNORE_START-->

## :beers: Contributing

Welcome contributing!

Please use GitHub's Issues/PRs.

See also [CONTRIBUTING.md](./CONTRIBUTING.md)

### Working With Rules

This plugin uses [svelte-eslint-parser](https://github.com/ota-meshi/svelte-eslint-parser) for the parser. Check [here](https://ota-meshi.github.io/svelte-eslint-parser/) to find out about AST.

<!--DOCS_IGNORE_END-->

## :lock: License

See the [LICENSE](LICENSE) file for license rights and limitations (MIT).

[svelte]: https://svelte.dev/
[eslint]: https://eslint.org/
