# Contributing to Fluany

:+1::tada: First off, thanks for taking the time to contribute! :tada::+1:


The following is a set of guidelines for contributing to Fluany, which are hosted in the [Fluany Organization](https://github.com/fluany) on GitHub.
These are just guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

#### Table Of Contents

[What should I know before I get started?](#what-should-i-know-before-i-get-started)
  * [Code of Conduct](#code-of-conduct)
  * [Fluany and Packages](#fluany-and-packages)

[How Can I Contribute?](#how-can-i-contribute)
  * [Reporting Bugs](#reporting-bugs)
  * [Suggesting Enhancements](#suggesting-enhancements)
  * [Your First Code Contribution](#your-first-code-contribution)
  * [Pull Requests](#pull-requests)


### Code of Conduct

This project adheres to the Contributor Covenant [code of conduct](CODE_OF_CONDUCT.md).
By participating, you are expected to uphold this code.
Please report unacceptable behavior to [fluanyorganization@gmail.com](mailto:fluanyorganization@gmail.com).


### Fluany and Packages

Fluany is a open source project—it's made up of over [4 repositories](https://github.com/fluany).
When you initially consider contributing to Fluany, you might be unsure about which of those 4 repositories implements the functionality you want to change or report a bug for.
This section should help you with that.

Fluany is intentionally very modular.

Here's a list:

* [Fluany ](https://github.com/fluany/fluany) - The extension for Google Chrome.
* [Fluany Firefox](https://github.com/fluany/fluany-firefox-extension) - The extension for Firefox.
* [Fluany API](https://github.com/fluany/fluany-api) - The API requests for extensions or apps.
* [Fluany DB](https://github.com/fluany/db_phrases_and_questions) - The Database of phrases, questions and texts.

## How Can I Contribute?

### Reporting Bugs

This section guides you through submitting a bug report for Fluany. Following these guidelines helps maintainers and the community understand your report :pencil:, reproduce the behavior :computer: :computer:, and find related reports :mag_right:.

When you are creating a bug report, please [include as many details as possible](#how-do-i-submit-a-good-bug-report). If you'd like, you can use [this template](#template-for-submitting-bug-reports) to structure the information.

#### How Do I Submit A (Good) Bug Report?

Bugs are tracked as [GitHub issues](https://guides.github.com/features/issues/). After you've determined [which repository](https://github.com/fluany) your bug is related to, create an issue on that repository and provide the following information.

Explain the problem and include additional details to help maintainers reproduce the problem:

* **Use a clear and descriptive title** for the issue to identify the problem.
* **Describe the exact steps which reproduce the problem** in as many details as possible. For example, start by explaining how you started Fluany. When listing steps, **don't just say what you did, but explain how you did it**.
* **Describe the behavior you observed after following the steps** and point out what exactly is the problem with that behavior.
* **Explain which behavior you expected to see instead and why.**
* **Include screenshots and animated GIFs** which show you following the described steps and clearly demonstrate the problem. If you use the keyboard while following the steps. You can use [this tool](http://www.cockos.com/licecap/) to record GIFs on macOS and Windows, and [this tool](https://github.com/colinkeenan/silentcast) or [this tool](https://github.com/GNOME/byzanz) on Linux.

Include details about your configuration and environment:

* **Which version of Fluany are you using?** You can get the exact version by manage extensions in your browser.
* **What's the name and version of the Browser you're using**?

#### Template For Submitting Bug Reports

    [Short description of problem here]

    **Reproduction Steps:**

    1. [First Step]
    2. [Second Step]
    3. [Other Steps...]

    **Expected behavior:**

    [Describe expected behavior here]

    **Observed behavior:**

    [Describe observed behavior here]

    **Screenshots and GIFs**

    ![Screenshots and GIFs which follow reproduction steps to demonstrate the problem](url)

    **Fluany version:**
    **Browser and version:**


### Suggesting Enhancements

This section guides you through submitting an enhancement suggestion for Fluany, including completely new features and minor improvements to existing functionality. Following these guidelines helps maintainers and the community understand your suggestion :pencil: and find related suggestions :mag_right:.

Before creating enhancement suggestions, please check [this list](#before-submitting-an-enhancement-suggestion) as you might find out that you don't need to create one. When you are creating an enhancement suggestion, please [include as many details as possible](#how-do-i-submit-a-good-enhancement-suggestion). If you'd like, you can use [this template](#template-for-submitting-enhancement-suggestions) to structure the information.

#### Before Submitting An Enhancement Suggestion

* **Determine [which repository the enhancement should be suggested in](https://github.com/fluany).**

#### How Do I Submit A (Good) Enhancement Suggestion?

Enhancement suggestions are tracked as [GitHub issues](https://guides.github.com/features/issues/). After you've determined [which repository](https://github.com/fluany) your enhancement suggestions is related to, create an issue on that repository and provide the following information:

* **Use a clear and descriptive title** for the issue to identify the suggestion.
* **Provide a step-by-step description of the suggested enhancement** in as many details as possible.
* **Provide specific examples to demonstrate the steps**. Include copy/pasteable snippets which you use in those examples, as [Markdown code blocks](https://help.github.com/articles/markdown-basics/#multiple-lines).
* **Describe the current behavior** and **explain which behavior you expected to see instead** and why.
* **Include screenshots and animated GIFs** which help you demonstrate the steps or point out the part of Fluany which the suggestion is related to. You can use [this tool](http://www.cockos.com/licecap/) to record GIFs on macOS and Windows, and [this tool](https://github.com/colinkeenan/silentcast) or [this tool](https://github.com/GNOME/byzanz) on Linux.
* **List some other website, extensions or applications where this enhancement exists.**
* **Specify which version of Fluany you're using.** You can get the exact version by manage extensions in your browser.
* **Specify the name and version of the Browser you're using.**

#### Template For Submitting Enhancement Suggestions

    [Short description of suggestion]

    **Steps which explain the enhancement**

    1. [First Step]
    2. [Second Step]
    3. [Other Steps...]

    **Current and suggested behavior**

    [Describe current and suggested behavior here]

    **Why would the enhancement be useful to most users**

    [Explain why the enhancement would be useful to most users]

    [List some other website, extensions or applications where this enhancement exists.]

    **Screenshots and GIFs**

    ![Screenshots and GIFs which demonstrate the steps or part of fluany the enhancement suggestion is related to](url)

    **Fluany Version:** [Enter Fluany version here]
    **Browser and Version:** [Enter Browser name and version here]

### Your First Code Contribution

Unsure where to begin contributing to Fluany? You can start by looking through these `help-translate` issues:

* [Help translate issues][help-translate] - issues which should be a bit more involved with `translation` issues.

### Pull Requests

* Include screenshots and animated GIFs in your pull request whenever possible.
* Follow the [JavaScript](#javascript-styleguide) styleguides.
* Document new code based on the
  [Documentation Styleguide](#documentation-styleguide)
* End files with a newline.
* Place requires in the following order:
    * Built in Node Modules (such as `path`)
* Place class properties in the following order:
    * Instance methods and properties
* Using a plain `return` when returning explicitly at the end of a function.
    * Not `return null`, `return undefined`, `null`, or `undefined`
    
    
## Styleguides

### Git Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally
* When only changing documentation, include `[ci skip]` in the commit description
* Consider starting the commit message with an applicable emoji:
    * :art: `:art:` when improving the format/structure of the code
    * :racehorse: `:racehorse:` when improving performance
    * :memo: `:memo:` when writing docs
    * :penguin: `:penguin:` when fixing something on Linux
    * :apple: `:apple:` when fixing something on macOS
    * :checkered_flag: `:checkered_flag:` when fixing something on Windows
    * :bug: `:bug:` when fixing a bug
    * :fire: `:fire:` when removing code or files
    * :green_heart: `:green_heart:` when fixing the CI build
    * :white_check_mark: `:white_check_mark:` when adding tests
    * :lock: `:lock:` when dealing with security
    * :arrow_up: `:arrow_up:` when upgrading dependencies
    * :arrow_down: `:arrow_down:` when downgrading dependencies
    * :shirt: `:shirt:` when removing linter warnings

### JavaScript Styleguide

All JavaScript must adhere to [JavaScript Semi-Standard Style](https://github.com/Flet/semistandard).

* Prefer the object spread operator (`{...anotherObj}`) to `Object.assign()`

  ```js
  // Use this:
  class ClassName {

  }
 
  export default ClassName
 
  // Instead of: 
  export default class ClassName {

  }

  ```

## Additional Notes

### Issue and Pull Request Labels

This section lists the labels we use to help us track and manage issues and pull requests. Most labels are used across all Fluany repositories, but some are specific to `fluany/fluany`.

The labels are loosely grouped by their purpose, but it's not required that every issue have a label from every group or that an issue can't have more than one label from the same group.

Please open an issue on `fluany/fluany` if you have suggestions for new labels, and if you notice some labels are missing on some repositories, then please open an issue on that repository.
