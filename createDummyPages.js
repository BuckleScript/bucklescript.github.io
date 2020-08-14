let fs = require('fs')
let childProcess = require('child_process')

let blogPostBase = 'https://reasonml.org/blog'
let rescriptBase = 'https://rescript-lang.org'
let manualBase = `${rescriptBase}/docs/manual/latest`

let docLanguages = [
  'en',
  'es-ES',
  'fr',
  'ja',
  'ko',
  'pt-BR',
  'ru',
  'zh-CN',
  'zh-TW',
]

let mainPages = {
  'built-with-bucklescript.html': rescriptBase,
  'built-with-bucklescript/index.html': rescriptBase,
  'examples.html': `${manualBase}/newcomer-examples`,
  'examples/index.html': `${manualBase}/newcomer-examples`,
  'faq.html': `${manualBase}/faq`,
  'faq/index.html': `${manualBase}/faq`,
  'gettingStarted.html': `${manualBase}/introduction`,
  'gettingStarted/index.html': `${manualBase}/introduction`,
  'index.html': rescriptBase,
}

let docPages = {
  'automatic-interface-generation.html': `${rescriptBase}/docs/manual/latest/introduction`,
  'automatic-interface-generation/index.html': `${rescriptBase}/docs/manual/latest/introduction`,
  'better-data-structures-printing-debug-mode.html': `${rescriptBase}/docs/manual/latest/shared-data-types`,
  'better-data-structures-printing-debug-mode/index.html': `${rescriptBase}/docs/manual/latest/shared-data-types`,
  'bind-to-global-values.html': `${rescriptBase}/docs/manual/latest/bind-to-global-js-values`,
  'bind-to-global-values/index.html': `${rescriptBase}/docs/manual/latest/bind-to-global-js-values`,
  'browser-support-polyfills.html': `${rescriptBase}/docs/manual/latest/browser-support-polyfills`,
  'browser-support-polyfills/index.html': `${rescriptBase}/docs/manual/latest/browser-support-polyfills`,
  'build-advanced.html': `${rescriptBase}/docs/manual/latest/build-advanced`,
  'build-advanced/index.html': `${rescriptBase}/docs/manual/latest/build-advanced`,
  'build-configuration.html': `${rescriptBase}/docs/manual/latest/build-configuration`,
  'build-configuration/index.html': `${rescriptBase}/docs/manual/latest/build-configuration`,
  'build-overview.html': `${rescriptBase}/docs/manual/latest/build-overview`,
  'build-overview/index.html': `${rescriptBase}/docs/manual/latest/build-overview`,
  'build-performance.html': `${rescriptBase}/docs/manual/latest/build-performance`,
  'build-performance/index.html': `${rescriptBase}/docs/manual/latest/build-performance`,
  'class.html': `${rescriptBase}/docs/manual/latest/bind-to-js-object#bind-to-a-js-object-thats-a-class`,
  'class/index.html': `${rescriptBase}/docs/manual/latest/bind-to-js-object#bind-to-a-js-object-thats-a-class`,
  'common-data-types.html': `${rescriptBase}/docs/manual/latest/shared-data-types`,
  'common-data-types/index.html': `${rescriptBase}/docs/manual/latest/shared-data-types`,
  'community.html': `${rescriptBase}/community`,
  'community/index.html': `${rescriptBase}/community`,
  'comparison-to-jsoo.html': `${rescriptBase}/docs/manual/latest/introduction`,
  'comparison-to-jsoo/index.html': `${rescriptBase}/docs/manual/latest/introduction`,
  'compiler-architecture-principles.html': `${rescriptBase}/docs/manual/latest/introduction`,
  'compiler-architecture-principles/index.html': `${rescriptBase}/docs/manual/latest/introduction`,
  'concepts-overview.html': `${rescriptBase}/docs/manual/latest/concepts-overview`,
  'concepts-overview/index.html': `${rescriptBase}/docs/manual/latest/concepts-overview`,
  'conditional-compilation.html': `${rescriptBase}/docs/manual/latest/introduction`,
  'conditional-compilation/index.html': `${rescriptBase}/docs/manual/latest/introduction`,
  'difference-from-native-ocaml.html': `${rescriptBase}/docs/manual/latest/introduction`,
  'difference-from-native-ocaml/index.html': `${rescriptBase}/docs/manual/latest/introduction`,
  'ecosystem.html': `${rescriptBase}/docs/manual/latest/libraries`,
  'ecosystem/index.html': `${rescriptBase}/docs/manual/latest/libraries`,
  'embed-raw-javascript.html': `${rescriptBase}/docs/manual/latest/embed-raw-javascript`,
  'embed-raw-javascript/index.html': `${rescriptBase}/docs/manual/latest/embed-raw-javascript`,
  'exceptions.html': `${rescriptBase}/docs/manual/latest/exceptions`,
  'exceptions/index.html': `${rescriptBase}/docs/manual/latest/exceptions`,
  'extended-compiler-options.html': `${rescriptBase}/docs/manual/latest/introduction`,
  'extended-compiler-options/index.html': `${rescriptBase}/docs/manual/latest/introduction`,
  'function.html': `${rescriptBase}/docs/manual/latest/function`,
  'function/index.html': `${rescriptBase}/docs/manual/latest/function`,
  'generate-converters-accessors.html': `${rescriptBase}/docs/manual/latest/introduction`,
  'generate-converters-accessors/index.html': `${rescriptBase}/docs/manual/latest/introduction`,
  'import-export.html': `${rescriptBase}/docs/manual/latest/import-from-export-to-js`,
  'import-export/index.html': `${rescriptBase}/docs/manual/latest/import-from-export-to-js`,
  'installation.html': `${rescriptBase}/docs/manual/latest/installation#new-project`,
  'installation/index.html': `${rescriptBase}/docs/manual/latest/installation#new-project`,
  'interop-cheatsheet.html': `${rescriptBase}/docs/manual/latest/interop-cheatsheet`,
  'interop-cheatsheet/index.html': `${rescriptBase}/docs/manual/latest/interop-cheatsheet`,
  'interop-misc.html': `${rescriptBase}/docs/manual/latest/introduction`,
  'interop-misc/index.html': `${rescriptBase}/docs/manual/latest/introduction`,
  'interop-overview.html': `${rescriptBase}/docs/manual/latest/introduction`,
  'interop-overview/index.html': `${rescriptBase}/docs/manual/latest/introduction`,
  'interop-with-js-build-systems.html': `${rescriptBase}/docs/manual/latest/interop-with-js-build-systems`,
  'interop-with-js-build-systems/index.html': `${rescriptBase}/docs/manual/latest/interop-with-js-build-systems`,
  'intro-to-external.html': `${rescriptBase}/docs/manual/latest/external`,
  'intro-to-external/index.html': `${rescriptBase}/docs/manual/latest/external`,
  'json.html': `${rescriptBase}/docs/manual/latest/json`,
  'json/index.html': `${rescriptBase}/docs/manual/latest/json`,
  'load-third-party-libraries.html': `${rescriptBase}/try`,
  'load-third-party-libraries/index.html': `${rescriptBase}/try`,
  'new-project.html': `${rescriptBase}/docs/manual/latest/installation#new-project`,
  'new-project/index.html': `${rescriptBase}/docs/manual/latest/installation#new-project`,
  'nodejs-special-variables.html': `${rescriptBase}/docs/manual/latest/bind-to-global-js-values#special-global-values`,
  'nodejs-special-variables/index.html': `${rescriptBase}/docs/manual/latest/bind-to-global-js-values#special-global-values`,
  'null-undefined-option.html': `${rescriptBase}/docs/manual/latest/null-undefined-option`,
  'null-undefined-option/index.html': `${rescriptBase}/docs/manual/latest/null-undefined-option`,
  'object-2.html': `${rescriptBase}/docs/manual/latest/bind-to-js-object`,
  'object-2/index.html': `${rescriptBase}/docs/manual/latest/bind-to-js-object`,
  'object.html': `${rescriptBase}/docs/manual/latest/bind-to-js-object`,
  'object/index.html': `${rescriptBase}/docs/manual/latest/bind-to-js-object`,
  'pipe-first.html': `${rescriptBase}/docs/manual/latest/pipe`,
  'pipe-first/index.html': `${rescriptBase}/docs/manual/latest/pipe`,
  'playground.html': `${rescriptBase}/try`,
  'playground/index.html': `${rescriptBase}/try`,
  'property-access.html': `${rescriptBase}/docs/manual/latest/bind-to-js-object#bind-using-special-bs-getters--setters`,
  'property-access/index.html': `${rescriptBase}/docs/manual/latest/bind-to-js-object#bind-using-special-bs-getters--setters`,
  'regular-expression.html': `${rescriptBase}/docs/manual/latest/primitive-types#regular-expression`,
  'regular-expression/index.html': `${rescriptBase}/docs/manual/latest/primitive-types#regular-expression`,
  'return-value-wrapping.html': `${rescriptBase}/docs/manual/latest/bind-to-js-function#function-nullable-return-value-wrapping`,
  'return-value-wrapping/index.html': `${rescriptBase}/docs/manual/latest/bind-to-js-function#function-nullable-return-value-wrapping`,
  'roadmap.html': `${rescriptBase}/docs/manual/latest/introduction`,
  'roadmap/index.html': `${rescriptBase}/docs/manual/latest/introduction`,
  'stdlib-overview.html': `${rescriptBase}/apis/latest`,
  'stdlib-overview/index.html': `${rescriptBase}/apis/latest`,
  'try.html': `${rescriptBase}/docs/manual/latest/try`,
  'try/index.html': `${rescriptBase}/docs/manual/latest/try`,
  'upgrade-to-v7.html': `${rescriptBase}/docs/manual/latest/introduction`,
  'upgrade-to-v7/index.html': `${rescriptBase}/docs/manual/latest/introduction`,
  'use-existing-ocaml-libraries.html': `${rescriptBase}/docs/manual/latest/introduction`,
  'use-existing-ocaml-libraries/index.html': `${rescriptBase}/docs/manual/latest/introduction`,
  'what-why.html': `${rescriptBase}/docs/manual/latest/introduction`,
  'what-why/index.html': `${rescriptBase}/docs/manual/latest/introduction`,
  'why-bucklescript-matters-for-javascript-platform.html': `${rescriptBase}/docs/manual/latest/introduction`,
  'why-bucklescript-matters-for-javascript-platform/index.html': `${rescriptBase}/docs/manual/latest/introduction`,
}

let blogPages = {
  'blog/2017/10/01/announcing-1-0.html': `${blogPostBase}/bucklescript-release-1-0`,
  'blog/2017/10/01/announcing-1-0/index.html': `${blogPostBase}/bucklescript-release-1-0`,
  'blog/2017/10/02/release-1-4-2.html': `${blogPostBase}/bucklescript-release-1-4-2`,
  'blog/2017/10/02/release-1-4-2/index.html': `${blogPostBase}/bucklescript-release-1-4-2`,
  'blog/2017/10/03/release-1-4-3.html': `${blogPostBase}/bucklescript-release-1-4-3`,
  'blog/2017/10/03/release-1-4-3/index.html': `${blogPostBase}/bucklescript-release-1-4-3`,
  'blog/2017/10/04/release-1-5-0.html': `${blogPostBase}/bucklescript-release-1-5-0`,
  'blog/2017/10/04/release-1-5-0/index.html': `${blogPostBase}/bucklescript-release-1-5-0`,
  'blog/2017/10/05/release-1-5-1.html': `${blogPostBase}/bucklescript-release-1-5-1`,
  'blog/2017/10/05/release-1-5-1/index.html': `${blogPostBase}/bucklescript-release-1-5-1`,
  'blog/2017/10/06/release-1-5-2.html': `${blogPostBase}/bucklescript-release-1-5-2`,
  'blog/2017/10/06/release-1-5-2/index.html': `${blogPostBase}/bucklescript-release-1-5-2`,
  'blog/2017/10/07/release-1-7-0.html': `${blogPostBase}/bucklescript-release-1-7-0`,
  'blog/2017/10/07/release-1-7-0/index.html': `${blogPostBase}/bucklescript-release-1-7-0`,
  'blog/2017/10/08/release-1-7-4.html': `${blogPostBase}/bucklescript-release-1-7-4`,
  'blog/2017/10/08/release-1-7-4/index.html': `${blogPostBase}/bucklescript-release-1-7-4`,
  'blog/2017/10/09/release-1-7-5.html': `${blogPostBase}/bucklescript-release-1-7-5`,
  'blog/2017/10/09/release-1-7-5/index.html': `${blogPostBase}/bucklescript-release-1-7-5`,
  'blog/2017/12/01/new-doc-site.html': `${blogPostBase}/new-doc-site`,
  'blog/2017/12/01/new-doc-site/index.html': `${blogPostBase}/new-doc-site`,
  'blog/2018/03/13/a-small-step-for-bucklescript.html': `${blogPostBase}/a-small-step-for-bucklescript`,
  'blog/2018/03/13/a-small-step-for-bucklescript/index.html': `${blogPostBase}/a-small-step-for-bucklescript`,
  'blog/2018/04/16/release-3-0-0.html': `${blogPostBase}/bucklescript-release-3-0-0`,
  'blog/2018/04/16/release-3-0-0/index.html': `${blogPostBase}/bucklescript-release-3-0-0`,
  'blog/2018/05/21/release-3-1-0.html': `${blogPostBase}/bucklescript-release-3-1-0`,
  'blog/2018/05/21/release-3-1-0/index.html': `${blogPostBase}/bucklescript-release-3-1-0`,
  'blog/2018/05/23/release-3-1-4.html': `${blogPostBase}/bucklescript-release-3-1-4`,
  'blog/2018/05/23/release-3-1-4/index.html': `${blogPostBase}/bucklescript-release-3-1-4`,
  'blog/2018/07/17/release-4-0-0.html': `${blogPostBase}/bucklescript-release-4-0-0-pt1`,
  'blog/2018/07/17/release-4-0-0/index.html': `${blogPostBase}/bucklescript-release-4-0-0-pt1`,
  'blog/2018/07/17/release-4-0-0II.html': `${blogPostBase}/bucklescript-release-4-0-0-pt2`,
  'blog/2018/07/17/release-4-0-0II/index.html': `${blogPostBase}/bucklescript-release-4-0-0-pt2`,
  'blog/2018/11/13/arity-zero.html': `${blogPostBase}/arity-zero`,
  'blog/2018/11/13/arity-zero/index.html': `${blogPostBase}/arity-zero`,
  'blog/2018/11/19/next-half.html': `${blogPostBase}/bucklescript-roadmap-q3-4-2018`,
  'blog/2018/11/19/next-half/index.html': `${blogPostBase}/bucklescript-roadmap-q3-4-2018`,
  'blog/2018/12/05/release-4-0-8.html': `${blogPostBase}/bucklescript-release-4-0-8`,
  'blog/2018/12/05/release-4-0-8/index.html': `${blogPostBase}/bucklescript-release-4-0-8`,
  'blog/2019/01/07/release-4-0-17.html': `${blogPostBase}/bucklescript-release-4-0-17`,
  'blog/2019/01/07/release-4-0-17/index.html': `${blogPostBase}/bucklescript-release-4-0-17`,
  'blog/2019/01/11/scalable.html': `${blogPostBase}/scalable`,
  'blog/2019/01/11/scalable/index.html': `${blogPostBase}/scalable`,
  'blog/2019/03/1/feature-preview.html': `${blogPostBase}/feature-preview-variadic`,
  'blog/2019/03/1/feature-preview/index.html': `${blogPostBase}/feature-preview-variadic`,
  'blog/2019/03/21/release-5-0.html': `${blogPostBase}/bucklescript-release-5-0`,
  'blog/2019/03/21/release-5-0/index.html': `${blogPostBase}/bucklescript-release-5-0`,
  'blog/2019/03/31/release-6-0.html': `${blogPostBase}/bucklescript-release-6-0`,
  'blog/2019/03/31/release-6-0/index.html': `${blogPostBase}/bucklescript-release-6-0`,
  'blog/2019/04/09/release-schedule.html': `${blogPostBase}/bucklescript-release-5-0-1`,
  'blog/2019/04/09/release-schedule/index.html': `${blogPostBase}/bucklescript-release-5-0-1`,
  'blog/2019/04/22/release-5-0-4.html': `${blogPostBase}/bucklescript-release-5-0-4`,
  'blog/2019/04/22/release-5-0-4/index.html': `${blogPostBase}/bucklescript-release-5-0-4`,
  'blog/2019/05/21/ffi-overview.html': `${blogPostBase}/ffi-overview`,
  'blog/2019/05/21/ffi-overview/index.html': `${blogPostBase}/ffi-overview`,
  'blog/2019/06/26/release-5-0-5.html': `${blogPostBase}/bucklescript-release-5-0-5`,
  'blog/2019/06/26/release-5-0-5/index.html': `${blogPostBase}/bucklescript-release-5-0-5`,
  'blog/2019/08/12/release-5-10-0.html': `${blogPostBase}/bucklescript-release-5-1-0`,
  'blog/2019/08/12/release-5-10-0/index.html': `${blogPostBase}/bucklescript-release-5-1-0`,
  'blog/2019/09/23/release-5-20-0.html': `${blogPostBase}/bucklescript-release-5-2-0`,
  'blog/2019/09/23/release-5-20-0/index.html': `${blogPostBase}/bucklescript-release-5-2-0`,
  'blog/2019/10/16/another-encoding.html': `${blogPostBase}/another-encoding`,
  'blog/2019/10/16/another-encoding/index.html': `${blogPostBase}/another-encoding`,
  'blog/2019/11/18/whats-new-in-7.html': `${blogPostBase}/whats-new-in-7-pt1`,
  'blog/2019/11/18/whats-new-in-7/index.html': `${blogPostBase}/whats-new-in-7-pt1`,
  'blog/2019/12/20/release-7-02.html': `${blogPostBase}/bucklescript-release-7-0-2`,
  'blog/2019/12/20/release-7-02/index.html': `${blogPostBase}/bucklescript-release-7-0-2`,
  'blog/2019/12/27/whats-new-in-7-cont.html': `${blogPostBase}/whats-new-in-7-pt2`,
  'blog/2019/12/27/whats-new-in-7-cont/index.html': `${blogPostBase}/whats-new-in-7-pt2`,
  'blog/2020/02/04/release-7-1-0.html': `${blogPostBase}/bucklescript-release-7-1-0`,
  'blog/2020/02/04/release-7-1-0/index.html': `${blogPostBase}/bucklescript-release-7-1-0`,
  'blog/2020/02/07/union-types-in-bucklescript.html': `${blogPostBase}/union-types-in-bucklescript`,
  'blog/2020/02/07/union-types-in-bucklescript/index.html': `${blogPostBase}/union-types-in-bucklescript`,
  'blog/2020/02/20/loading-stdlib-in-memory.html': `${blogPostBase}/loading-stdlib-in-memory`,
  'blog/2020/02/20/loading-stdlib-in-memory/index.html': `${blogPostBase}/loading-stdlib-in-memory`,
  'blog/2020/03/12/release-7-2.html': `${blogPostBase}/bucklescript-release-7-2`,
  'blog/2020/03/12/release-7-2/index.html': `${blogPostBase}/bucklescript-release-7-2`,
  'blog/2020/03/26/generalize-uncurry.html': `${blogPostBase}/generalize-uncurry`,
  'blog/2020/03/26/generalize-uncurry/index.html': `${blogPostBase}/generalize-uncurry`,
  'blog/2020/04/13/release-7-3.html': `${blogPostBase}/bucklescript-release-7-3`,
  'blog/2020/04/13/release-7-3/index.html': `${blogPostBase}/bucklescript-release-7-3`,
  'blog/2020/05/06/exception-encoding.html': `${blogPostBase}/a-story-of-exception-encoding`,
  'blog/2020/05/06/exception-encoding/index.html': `${blogPostBase}/a-story-of-exception-encoding`,
  'blog/index.html': `${rescriptBase}/blog`,
  'blog/page2/index.html': `${rescriptBase}/blog`, 
  'blog/page3/index.html': `${rescriptBase}/blog`,
  'blog/page4/index.html': `${rescriptBase}/blog`,
  'blog/page5/index.html': `${rescriptBase}/blog`,
}

let createFile = (filePath, redirectLink) => {
  let p = filePath.split('/')
  if (p.length > 1) {
    let dirs = p.slice(0, p.length - 1).join('/')
    childProcess.execFileSync('mkdir', ['-p', dirs])
  }

  let content = `
    <link rel="canonical" href="${redirectLink}"/> 
    <meta http-equiv="refresh" content="0; url=${redirectLink}" />
  `
  fs.writeFileSync(filePath, content)
}

Object.entries(blogPages).forEach(([pathSpec, redirectLink]) => {
  createFile(pathSpec, redirectLink)
})

Object.entries(mainPages).forEach(([pathSpec, redirectLink]) => {
  createFile(pathSpec, redirectLink)
  docLanguages.forEach(language => {
    createFile(language + '/' + pathSpec, redirectLink)
  })
})

Object.entries(docPages).forEach(([pathSpec, redirectLink]) => {
  createFile('docs/' + pathSpec, redirectLink)
  docLanguages.forEach(language => {
    createFile('docs/' + language + '/' + pathSpec, redirectLink)
  })
})
