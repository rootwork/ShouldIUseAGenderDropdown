# Overview

This page documents the assorted designs, components, styles and markup patterns
defined by the site. You can view the hierarchy of components using the tabbed
menu above, or search the full text of style definitions.

The content below is generated from code comments in the project&rsquo;s Sass
files and processed using
[SC5 Style Guide Generator](https://www.npmjs.com/package/sc5-styleguide), which
runs on [kss-node](https://github.com/kss-node/kss-node), which itself uses
[Knyle Style Sheets (KSS)](https://github.com/kneath/kss). The styleguide
sections are defined in `sass/main.scss`.

Note that [per the KSS documentation](http://warpspire.com/kss/syntax/), "not
every CSS rule should be documented." Only rules that describe visual UI
elements are documented in the styleguide. Therefore, there is not (and does not
need to be) a 1:1 correspondence between the Styleguide sections and the Sass
folders and partials.

## Also see

- The sites's
**[frontend README file](https://github.com/rootwork/ShouldIUseAGenderDropdown/blob/gh-pages/README.frontend.md)**
(markdown) outlines the general approach to the site's design, gives
installation instructions, and lists coding standards.
- Documentation of the theme's **Sass breakpoints, functions and
mixins**:
[SassDoc](https://github.com/rootwork/ShouldIUseAGenderDropdown/blob/gh-pages/documentation/sassdoc/)
- Documentation of the theme's **JavaScript**:
[TRF JSDoc](https://github.com/rootwork/ShouldIUseAGenderDropdown/blob/gh-pages/documentation/jsdoc/index.html)

## Resources

- [KSS documentation syntax](http://warpspire.com/kss/syntax/).
- [SC5-specific additional syntax for complex markup](https://www.npmjs.com/package/sc5-styleguide#documenting-syntax),
including creating "ignore" blocks (useful for SassDoc) and including wrappers
around necessary components.
- [kss-node documentation on the style guide's template](https://github.com/kss-node/kss-node/wiki/Using-custom-templates)
&#8212; our template (the source of this information) is located at
`documentation/styleguide.md`, and default SC5 styles are used to format the
documentation.

## Updating this documentation

This style guide is pulled directly from Sass files using KSS syntax. We use
[Gulp.js](http://gulpjs.com/) to update this documentation automatically when
theme files are updated &#8212; documentation generation is part of the default
`gulp` task. See
[this theme's gulpfile](https://github.com/rootwork/ShouldIUseAGenderDropdown/blob/gh-pages/gulpfile.js)
for more.
