# Frontend development

Styles are compiled from Sass into CSS using `gulp`. We use `gulp-sass`, which
uses `node-sass`, which runs on `libsass`.

First, you will need to install Node.js and Gulp; ample documentation exists
online to guide you.

To compile the Sass into updated CSS, from the command line, `cd` into the theme
directory and run `npm install` to fetch all dependencies. Then, run `gulp` to
start watching and compiling. The default gulp task will update documentation as
necessary, as well as minify images and scripts, and auto-prefix CSS rulesets.

## [Style Guide (SC5)](https://github.com/rootwork/ShouldIUseAGenderDropdown/blob/gh-pages/documentation/styleguide/)

Documents the assorted designs, components, styles and markup patterns defined
by the site. You'll probably want to start here. Generated automatically using
the default `gulp` task using comments in the Sass files.

## [SassDoc](https://github.com/rootwork/ShouldIUseAGenderDropdown/blob/gh-pages/documentation/sassdoc/)

Documents Sass breakpoints, functions and mixins, which are not included in a
style guide. Generated automatically using the default `gulp` task using
comments in the Sass files.

## [JSDoc](https://github.com/rootwork/ShouldIUseAGenderDropdown/blob/gh-pages/documentation/jsdoc/index.html)

Documents custom JavaScript on the site.

## Coding standards

The site includes an [.editorconfig](http://editorconfig.org/) file; you should
install the appropriate plugin for your text editor if necessary and these
standards will be enforced automatically:

* Indentation: 2 spaces, no tabs
* Insert final new line: yes

Additional standards for all files:

* 80-character wide lines, with the exception of URLs or other strings that
can't be broken across lines.

## Standards for writing Sass files

* For class names, use SMACSS principles and BEM syntax, with styles broken into
componentized Sass partials. Note this often means altering default Drupal
templates or views to insert the appropriate class names.
* Write in SCSS format ("CSS-style"), not Sass format.
* Write rule sets across multiple lines, not all on a single line.
* Insert a space between a property's colon and its value.
* Insert a blank line between rule sets.
* Comment heavily. Adhere to the KSS syntax for documenting styles
automatically on builds, and SassDoc syntax for documenting breakpoints,
functions and mixins.
* Follow the Sass Inception Rule: Never nest more than four levels deep (and
usually only one or two).
* Strings such as URLs and font-families should be wrapped in 'single quotes'.
* Numbers should be written with a preceding 0 if less than 1, e.g. `0.5`, for
readability. The number 0 should never have units (such as px or em).
* Mathematical operations in Sass should be wrapped in percentages for
readability, e.g. `padding: (2 * $padding);`
* In general, color rules should be referencing a Sass variable; if a color that
does not have a Sass variable is being written in directly you should have a
very good reason (not laziness).
* When using multivalue rules, use a comma followed by a space, e.g.
`color: rgba(0, 0, 0, 0.1);`
* Many other conventions are followed from Hugo Giraudel's
[Sass Guidelines](http://sass-guidelin.es/); when in doubt, follow the guideline
there.
