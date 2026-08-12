# NDS Content Terminology & Editorial Style

When writing or refining NDS documentation, use the terminology, framing, and writing style established across the NDS documentation. The goal is technical clarity and consistency, not marketing copy.

## 1. General Writing Style

Write as a technical product/documentation team would write for experienced developers.

- Be clear, precise, and concise.
- Prefer direct statements over promotional language.
- Explain what something does, how it works, and why it matters.
- Avoid exaggerated claims such as “powerful,” “seamless,” “effortless,” “revolutionary,” or “cutting-edge.”
- Avoid unnecessary adjectives and filler.
- Do not make technical concepts sound simpler than they are.
- Do not add marketing language merely to make a section sound more impressive.
- Preserve technical meaning when refining existing content.
- Prefer short, information-dense sentences over long explanatory paragraphs.
- Use consistent terminology throughout the documentation.

The writing should feel like **technical documentation for a production system**, not product advertising.

## 2. Do Not Repeat Yourself (DRY)

State each fact once, in the place the reader will look for it.

- A fact already shown in a table, code block, numbered step, or alert is not restated in the prose around it. The prose adds what those cannot say, or it says nothing.
- When two sections need the same fact, keep it in the section where the reader acts on it and reference it by name from the other.
- Do not summarize a list immediately before or after it.
- Do not restate a heading in the first sentence under it.
- A rule that lives in NDS IQ is not copied into a guide. The guide states what the developer does; NDS IQ states how the agent does it.

Repetition is not emphasis. Every duplicate is a second copy that can drift out of sync, and the reader pays for the same fact twice.

## 3. NDS Terminology

Use these terms consistently:

- **NDS** — the National Design System and the implementation being documented.
- **NDS Vanilla Template** — the vanilla HTML, CSS, and JavaScript implementation.
- **NDS IQ (Integration Quality)** — the versioned instruction system used by AI coding agents to build with NDS.
- **AI coding agent** or **AI agent** — the preferred term for an AI tool that can inspect files, edit code, run commands, and verify results.
- **Get Started** — the guide covering installation, setup, workflow, and upgrades.
- **template** — the NDS implementation/reference package.
- **runtime** — the CSS, JavaScript, fonts, icons, and other assets required by the implementation.
- **reference source** — canonical NDS source material used by the agent.
- **canonical markup** — markup taken from the authoritative NDS source rather than invented by the agent.
- **project-specific context** — information supplied by the developer about the application, architecture, constraints, integrations, or existing implementation.
- **workflow** — the defined sequence of work, such as inventory, plan, build, and verify.
- **verification** — checking the implemented result in the browser and against the required behavior and visual result.
- **validated baseline** — the model capability level against which NDS IQ has been tested and validated.

Do not introduce alternative terms when an established term already exists.

For example:

- Prefer **“AI coding agent”** over “AI assistant” when referring to an agent that performs development work.
- Prefer **“instruction system”** over “AI training,” “AI knowledge,” or “prompt system” when describing NDS IQ.
- Prefer **“validated baseline”** over “minimum model” when describing model support.
- Prefer **“canonical markup”** over “correct markup” when referring to markup sourced from NDS.
- Prefer **“reference implementation”** over “example implementation” when the implementation is intended to serve as an authoritative reference.

## 4. How to Describe NDS IQ

Do not describe NDS IQ as something that “teaches” or “trains” an AI model.

Use language such as:

> NDS IQ is a versioned instruction system that gives AI agents a consistent way to build with NDS.

When discussing model compatibility, use this framing:

> NDS IQ is built to produce consistent results across AI models rather than relying on the capabilities of the most advanced model available.

> Claude Sonnet is the validated baseline for NDS IQ.

> More capable models can build on the same baseline with greater accuracy and reasoning.

The important distinction is:

**The model provides the capability. NDS IQ provides the rules and workflow for using that capability with NDS.**

## 5. How to Describe AI-Assisted Development

Keep the developer and agent responsibilities distinct.

The developer provides:

- the desired outcome
- project-specific context
- content and data
- constraints
- existing application behavior
- decisions that require human approval

NDS IQ provides:

- implementation rules
- canonical sources
- workflow
- verification requirements
- upgrade behavior
- constraints on how NDS should be used

Prefer this framing:

> The developer describes what needs to change. NDS IQ defines how the agent carries out that work within NDS.

Avoid implying that the developer needs to know the internal NDS implementation before asking the agent to perform a task.

## 6. Terminology for Prompts and Requests

When documenting everyday agent usage, call them **asks**, **requests**, or **tasks**, not “commands” unless they are actual shell commands.

An everyday ask should describe:

- what needs to be built or changed
- relevant project context
- content or data
- constraints
- existing integrations that must remain intact

It normally does **not** need to specify:

- which NDS components to use
- the final HTML structure
- NDS implementation details
- how verification should be performed

NDS IQ determines those implementation details.

## 7. Technical Claims

Do not strengthen a claim simply to make the documentation sound better.

For example:

Avoid:

> NDS guarantees perfect results across every AI model.

Prefer:

> NDS IQ provides a validated baseline for consistent AI-assisted development across supported models.

Avoid:

> NDS works flawlessly with every AI assistant.

Prefer:

> NDS IQ is designed to be agent-agnostic and is validated against its documented baseline.

Always distinguish between:

- **designed to**
- **supported**
- **validated**
- **tested**
- **recommended**

Do not use these terms interchangeably.

## 8. Refining Existing Content

When rewriting existing NDS content:

1. Preserve the original technical meaning.
2. Preserve important facts, constraints, examples, and terminology.
3. Remove repetition and filler.
4. Replace promotional wording with precise technical wording.
5. Simplify sentences without removing technical information.
6. Keep the same approximate content depth unless explicitly asked to shorten it.
7. Do not introduce new claims that are not supported by the source.
8. Do not replace established NDS terminology with synonyms merely for stylistic variation.

The goal is **better technical writing, not different technical content**.

## 9. Preferred Before / After Patterns

### Marketing → Technical

Avoid:

> A powerful and seamless solution for modern government websites.

Prefer:

> A production-ready implementation for building accessible, consistent government websites.

### Teaching → Instruction System

Avoid:

> NDS IQ teaches AI agents how to use NDS.

Prefer:

> NDS IQ provides the instructions and workflow AI agents use to build with NDS.

### Absolute → Validated

Avoid:

> NDS works with any AI model.

Prefer:

> NDS IQ is designed to work across AI models, with a documented validated baseline.

### Promotional → Descriptive

Avoid:

> Build beautiful websites effortlessly.

Prefer:

> Build interfaces using the NDS component library without introducing a frontend framework.

### Vague → Specific

Avoid:

> Add information about your project.

Prefer:

> Provide project-specific context such as the technology stack, view or route locations, existing integrations, and constraints the agent must respect.

## 10. Tone by Documentation Type

### Homepage

Concise and informative.

Explain:

- what NDS is
- what the template provides
- who it is for
- how it integrates with AI agents

Avoid turning the homepage into a sales page.

### README

Technical and practical.

Prioritize:

- what the repository contains
- how it is structured
- how to run it
- development requirements
- important architectural decisions
- links to deeper documentation

### Get Started

Procedural and explicit.

Tell the developer:

- what to do
- what the agent does
- what requires approval
- what files are created or changed
- how verification works
- how upgrades work

### NDS IQ / Integration Quality

System-oriented and precise.

Explain:

- how the instruction system works
- where its rules come from
- how they are validated
- how they are versioned
- how they are upgraded
- what assumptions they make about the agent

## 11. Final Editorial Test

Before returning refined NDS content, ask:

- Does this sound like technical documentation rather than marketing copy?
- Is every technical claim supported?
- Are NDS terms used consistently?
- Did I preserve the original meaning?
- Did I remove unnecessary filler?
- Did I state each fact once, rather than restating what a table, code block, or list already shows?
- Did I distinguish the AI model from NDS IQ?
- Did I distinguish developer responsibilities from agent responsibilities?
- Did I use “validated,” “tested,” and “supported” accurately?
- Could an experienced developer understand the statement without additional interpretation?

If the answer is yes, the wording is aligned with the NDS documentation style.