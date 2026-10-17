const specs = import.meta.webpackContext('.', { recursive: true, regExp: /\.spec\.jsx?$/ })
specs.keys().forEach(specs)

const sources = import.meta.webpackContext('..', { recursive: true, regExp: /^\.\/(?!tests\/|main\.jsx).*\.jsx?$/ })
sources.keys().forEach(sources)