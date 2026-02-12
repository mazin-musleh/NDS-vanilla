---
layout: page
title: Code
hero_title: Code Block - National Design System
hero_description: Code display component with syntax highlighting, copy functionality, and line numbers
breadcrumb: ["Components"]
lang: en
direction: ltr
---

<!-- Code Block Overview -->
<section id="codeOverview" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Direct Code Block</h2>
            <p class="nds-section-description">Standalone code blocks with copy button, used for API documentation and code snippets</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-showcase">

            <!-- Basic Direct Code Block -->
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Basic Code Block</div>
                </div>
                <div class="demo-container">
                    <div class="state-demo">
                        <div class="nds-code nds-expandable">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                                </button>
                            </div>
                            <div class="nds-expandable-content">
                                <code class="lang-html code">
<div class="nds-card nds-stroke">
  <div class="nds-card-content">
    <h3 class="nds-card-title">Card Title</h3>
    <p class="nds-card-description">Card description text</p>
  </div>
</div>
                                </code>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container">
                        <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                aria-controls="panel-basic-1" id="tab-basic-1">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example" role="tabpanel" id="panel-basic-1"
                            aria-labelledby="tab-basic-1">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                                </button>
                            </div>
                            <code class="lang-html code">
<div class="nds-code nds-expandable">
  <div class="nds-code-action">
    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
      <i class="hgi hgi-stroke hgi-copy-01"></i>
    </button>
  </div>
  <div class="nds-expandable-content">
    <code class="lang-html code">
      <!-- Your code here -->
    </code>
  </div>
</div>
                            </code>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Code Block with Line Numbers -->
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Code Block with Line Numbers</div>
                </div>
                <div class="demo-container">
                    <div class="state-demo">
                        <div class="nds-code nds-expandable">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                                </button>
                            </div>
                            <div class="nds-expandable-content">
                                <code class="lang-javascript line-numbers">
const alert = NDSAlert.create({
    variant: 'success',
    title: 'Success',
    description: 'Your changes have been saved.',
    target: '#alert-container'
});

NDSAlert.create({
    variant: 'info',
    title: 'Update Available',
    description: 'A new version is available.',
    target: '#container',
    closable: true,
    shadow: true
});
                                </code>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container">
                        <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                aria-controls="panel-linenums-1" id="tab-linenums-1">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example" role="tabpanel" id="panel-linenums-1"
                            aria-labelledby="tab-linenums-1">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                                </button>
                            </div>
                            <code class="lang-html code">
<div class="nds-code nds-expandable">
  <div class="nds-code-action">
    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
      <i class="hgi hgi-stroke hgi-copy-01"></i>
    </button>
  </div>
  <div class="nds-expandable-content">
    <code class="lang-javascript line-numbers">
      // Your code here
    </code>
  </div>
</div>
                            </code>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Expandable Code Block -->
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Expandable Code Block</div>
                </div>
                <div class="demo-container">
                    <div class="state-demo">
                        <div class="nds-code nds-expandable">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                                </button>
                            </div>
                            <div class="nds-expandable-content">
                                <code class="lang-javascript line-numbers">
async function handleFormSubmit(form) {
    const alertContainer = document.getElementById('form-alerts');

    // Clear previous alerts
    NDSAlert.dismissAll(alertContainer);

    try {
        const response = await submitForm(form);

        if (response.success) {
            NDSAlert.create({
                variant: 'success',
                description: 'Form submitted successfully!',
                target: alertContainer,
                title: 'Success',
                prepend: true
            });
        } else {
            NDSAlert.create({
                variant: 'error',
                description: response.message,
                target: alertContainer,
                title: 'Submission Failed'
            });
        }
    } catch (error) {
        NDSAlert.create({
            variant: 'error',
            description: 'An unexpected error occurred.',
            target: alertContainer,
            title: 'Error'
        });
    }
}
                            </code>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container">
                        <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                aria-controls="panel-expandable-1" id="tab-expandable-1">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example" role="tabpanel" id="panel-expandable-1"
                            aria-labelledby="tab-expandable-1">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                                </button>
                            </div>
                            <code class="lang-html code">
<div class="nds-code nds-expandable">
  <div class="nds-code-action">
    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
      <i class="hgi hgi-stroke hgi-copy-01"></i>
    </button>
  </div>
  <div class="nds-expandable-content">
      <code class="lang-javascript line-numbers">
    // Long code content here
    // Will collapse with "Show More" button
  </code>
  </div>
</div>
                            </code>
                        </div>
                    </div>
                </div>
            </div>

            </div>
        </div>
    </div>
</section>

<!-- Tabbed Code Block -->
<section id="tabbedCode" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Tabbed Code Block</h2>
            <p class="nds-section-description">Code blocks with tab navigation for showing multiple languages or file types</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-showcase">

            <!-- Single Tab -->
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Single Tab</div>
                </div>
                <div class="demo-container">
                    <div class="state-demo">
                        <div class="nds-tabs nds-code nds-divided">
                            <div class="nds-tab-list-container">
                                <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="demo-panel-single-1" id="demo-tab-single-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="demo-panel-single-1"
                                    aria-labelledby="demo-tab-single-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
<button class="nds-btn nds-primary nds-lg">
  <i class="hgi hgi-stroke hgi-plus-sign"></i>
  <span class="label">Button Text</span>
</button>
                                    </code>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container">
                        <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                aria-controls="panel-singletab-1" id="tab-singletab-1">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example" role="tabpanel" id="panel-singletab-1"
                            aria-labelledby="tab-singletab-1">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                                </button>
                            </div>
                            <code class="lang-html code">
<div class="nds-tabs nds-code nds-divided">
  <div class="nds-tab-list-container">
    <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
      <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
        aria-controls="panel-id" id="tab-id">
        <span class="nds-tab-label">HTML</span>
      </button>
    </nav>
  </div>
  <div class="nds-tab-content">
    <div class="nds-tab-panel code-example" role="tabpanel" id="panel-id"
      aria-labelledby="tab-id">
      <div class="nds-code-action">
        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
          <i class="hgi hgi-stroke hgi-copy-01"></i>
        </button>
      </div>
      <code class="lang-html code">
        <!-- Your code here -->
      </code>
    </div>
  </div>
</div>
                            </code>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Multiple Tabs -->
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Multiple Tabs</div>
                </div>
                <div class="demo-container">
                    <div class="state-demo">
                        <div class="nds-tabs nds-code nds-divided">
                            <div class="nds-tab-list-container">
                                <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="demo-panel-multi-html" id="demo-tab-multi-html">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                                        aria-controls="demo-panel-multi-js" id="demo-tab-multi-js">
                                        <span class="nds-tab-label">JavaScript</span>
                                    </button>
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                                        aria-controls="demo-panel-multi-css" id="demo-tab-multi-css">
                                        <span class="nds-tab-label">CSS</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="demo-panel-multi-html"
                                    aria-labelledby="demo-tab-multi-html">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
<div class="nds-alert nds-card" data-status="success">
  <span class="nds-feedback nds-alert-icon nds-outline">
    <span class="nds-feedback-icon">
      <i class="hgi hgi-stroke icon"></i>
    </span>
  </span>
  <div class="nds-alert-content">
    <h4 class="nds-alert-title">Success</h4>
    <p class="nds-alert-description">Operation completed.</p>
  </div>
</div>
                                    </code>
                                </div>
                                <div class="nds-tab-panel code-example" role="tabpanel" id="demo-panel-multi-js"
                                    aria-labelledby="demo-tab-multi-js" hidden>
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-javascript code">
NDSAlert.create({
    variant: 'success',
    title: 'Success',
    description: 'Operation completed.',
    target: '#container'
});
                                    </code>
                                </div>
                                <div class="nds-tab-panel code-example" role="tabpanel" id="demo-panel-multi-css"
                                    aria-labelledby="demo-tab-multi-css" hidden>
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-css code">
.nds-alert {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
}
                                    </code>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container">
                        <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                aria-controls="panel-multitab-1" id="tab-multitab-1">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-multitab-1"
                            aria-labelledby="tab-multitab-1">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                                </button>
                            </div>
                            <div class="nds-expandable-content">
                                <code class="lang-html code">
<div class="nds-tabs nds-code nds-divided">
  <div class="nds-tab-list-container">
    <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
      <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
        aria-controls="panel-html" id="tab-html">
        <span class="nds-tab-label">HTML</span>
      </button>
      <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
        aria-controls="panel-js" id="tab-js">
        <span class="nds-tab-label">JavaScript</span>
      </button>
    </nav>
  </div>
  <div class="nds-tab-content">
    <div class="nds-tab-panel code-example" role="tabpanel" id="panel-html"
      aria-labelledby="tab-html">
      <div class="nds-code-action">
        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
          <i class="hgi hgi-stroke hgi-copy-01"></i>
        </button>
      </div>
      <code class="lang-html code">
        <!-- HTML code here -->
      </code>
    </div>
    <div class="nds-tab-panel code-example" role="tabpanel" id="panel-js"
      aria-labelledby="tab-js" hidden>
      <div class="nds-code-action">
        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
          <i class="hgi hgi-stroke hgi-copy-01"></i>
        </button>
      </div>
      <code class="lang-javascript code">
        // JavaScript code here
      </code>
    </div>
  </div>
</div>
                                </code>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Hidden Tabbed Code (inside demo cards) -->
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Hidden Code in Demo Cards</div>
                </div>
                <div class="demo-container">
                    <div class="state-demo">
                        <p style="padding: var(--spacing-lg); color: var(--text-subdued); text-align: center;">
                            When used inside demo cards, tabbed code blocks start with the <strong>hidden</strong> attribute.
                            The showcase JavaScript reveals them with a toggle button. Click the code icon below any demo card to see this in action.
                        </p>
                    </div>
                </div>
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container">
                        <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                aria-controls="panel-hidden-1" id="tab-hidden-1">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example" role="tabpanel" id="panel-hidden-1"
                            aria-labelledby="tab-hidden-1">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                                </button>
                            </div>
                            <code class="lang-html code">
<!-- Inside a .nds-demo-card, add hidden attribute -->
<div class="nds-tabs nds-code nds-divided" hidden>
  <!-- Tab structure same as above -->
</div>
                            </code>
                        </div>
                    </div>
                </div>
            </div>

            </div>
        </div>
    </div>
</section>

<!-- Syntax Highlighting -->
<section id="syntaxHighlighting" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Syntax Highlighting</h2>
            <p class="nds-section-description">Built-in syntax highlighting classes for HTML, CSS, and JavaScript</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-showcase">

            <!-- HTML Syntax -->
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">HTML Syntax Classes</div>
                </div>
                <div class="demo-container">
                    <div class="state-demo" style="display: grid; gap: var(--spacing-lg); padding: var(--spacing-lg);">
                        <div style="display: flex; align-items: center; gap: var(--spacing-md);">
                            <span class="syntax-tag" style="font-family: monospace; font-weight: 600;">&lt;div&gt;</span>
                            <span style="color: var(--text-subdued);">.syntax-tag — HTML tags</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: var(--spacing-md);">
                            <span class="syntax-attr" style="font-family: monospace;">class</span>
                            <span style="color: var(--text-subdued);">.syntax-attr — Attribute names</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: var(--spacing-md);">
                            <span class="syntax-value" style="font-family: monospace;">"nds-btn"</span>
                            <span style="color: var(--text-subdued);">.syntax-value — Attribute values</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: var(--spacing-md);">
                            <span class="syntax-comment" style="font-family: monospace;">&lt;!-- comment --&gt;</span>
                            <span style="color: var(--text-subdued);">.syntax-comment — Comments</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- CSS Syntax -->
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">CSS Syntax Classes</div>
                </div>
                <div class="demo-container">
                    <div class="state-demo" style="display: grid; gap: var(--spacing-lg); padding: var(--spacing-lg);">
                        <div style="display: flex; align-items: center; gap: var(--spacing-md);">
                            <span class="syntax-selector" style="font-family: monospace; font-weight: 600;">.nds-btn</span>
                            <span style="color: var(--text-subdued);">.syntax-selector — CSS selectors</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: var(--spacing-md);">
                            <span class="syntax-property" style="font-family: monospace;">background-color</span>
                            <span style="color: var(--text-subdued);">.syntax-property — CSS properties</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- JavaScript Syntax -->
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">JavaScript Syntax Classes</div>
                </div>
                <div class="demo-container">
                    <div class="state-demo" style="display: grid; gap: var(--spacing-lg); padding: var(--spacing-lg);">
                        <div style="display: flex; align-items: center; gap: var(--spacing-md);">
                            <span class="syntax-keyword" style="font-family: monospace; font-weight: 600;">const</span>
                            <span style="color: var(--text-subdued);">.syntax-keyword — Keywords (const, let, function, if)</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: var(--spacing-md);">
                            <span class="syntax-string" style="font-family: monospace;">'hello world'</span>
                            <span style="color: var(--text-subdued);">.syntax-string — String values</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: var(--spacing-md);">
                            <span class="syntax-number" style="font-family: monospace;">42</span>
                            <span style="color: var(--text-subdued);">.syntax-number — Numbers</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: var(--spacing-md);">
                            <span class="syntax-literal" style="font-family: monospace;">true</span>
                            <span style="color: var(--text-subdued);">.syntax-literal — Literals (true, false, null)</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: var(--spacing-md);">
                            <span class="syntax-builtin" style="font-family: monospace; font-weight: 600;">console</span>
                            <span style="color: var(--text-subdued);">.syntax-builtin — Built-in objects</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: var(--spacing-md);">
                            <span class="syntax-function" style="font-family: monospace;">querySelector</span>
                            <span style="color: var(--text-subdued);">.syntax-function — Function names</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: var(--spacing-md);">
                            <span class="syntax-class" style="font-family: monospace; font-weight: 600;">NDSAlert</span>
                            <span style="color: var(--text-subdued);">.syntax-class — Class names</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: var(--spacing-md);">
                            <span class="syntax-operator" style="font-family: monospace;">=></span>
                            <span style="color: var(--text-subdued);">.syntax-operator — Operators</span>
                        </div>
                    </div>
                </div>
            </div>

            </div>
        </div>
    </div>
</section>

<!-- Language Classes -->
<section id="languageClasses" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Language Classes</h2>
            <p class="nds-section-description">Supported language identifiers for the code element</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-showcase">

            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Available Language Classes</div>
                </div>
                <div class="demo-container">
                    <div class="state-demo" style="padding: var(--spacing-lg);">
                        <table class="nds-table nds-responsive" style="--min-width:500px;">
                            <thead>
                                <tr>
                                    <th>Class</th>
                                    <th>Language</th>
                                    <th>Usage</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>lang-html</td>
                                    <td>HTML / XML</td>
                                    <td>Markup and template examples</td>
                                </tr>
                                <tr>
                                    <td>lang-css</td>
                                    <td>CSS / SCSS</td>
                                    <td>Stylesheet examples</td>
                                </tr>
                                <tr>
                                    <td>lang-javascript</td>
                                    <td>JavaScript</td>
                                    <td>Script and API examples</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="codeGuidelines" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-content">
            <div class="nds-guidelines-grid">

                <div class="nds-guideline-item">
                    <h3>Structure</h3>
                    <ul>
                        <li>All code blocks must be wrapped in .nds-code.nds-expandable</li>
                        <li>Use .nds-code-action for the copy button container</li>
                        <li>Wrap the code element inside div.nds-expandable-content</li>
                        <li>Add language class to the code element (lang-html, lang-css, lang-javascript)</li>
                    </ul>
                </div>

                <div class="nds-guideline-item">
                    <h3>Direct vs Tabbed</h3>
                    <ul>
                        <li>Direct: .nds-code.nds-expandable > .nds-expandable-content > code</li>
                        <li>Tabbed: .nds-tabs.nds-code.nds-divided > .nds-tab-panel > code</li>
                        <li>Add hidden attribute when tabbed code is inside demo cards</li>
                        <li>Tabbed variant inherits tab component behavior</li>
                    </ul>
                </div>

                <div class="nds-guideline-item">
                    <h3>Features</h3>
                    <ul>
                        <li>Add line-numbers class for numbered lines</li>
                        <li>.nds-expandable enables auto show/hide for long code</li>
                        <li>Copy button auto-copies content and shows "Copied" feedback</li>
                        <li>Code is always rendered LTR regardless of page direction</li>
                    </ul>
                </div>

                <div class="nds-guideline-item">
                    <h3>Best Practices</h3>
                    <ul>
                        <li>Keep code examples concise and focused</li>
                        <li>Use expandable for code longer than ~15 lines</li>
                        <li>Match tab labels to the actual language shown</li>
                        <li>Ensure all panel IDs and tab IDs are unique per page</li>
                    </ul>
                </div>

            </div>
        </div>
    </div>
</section>

<!-- CSS Implementation -->
<section id="codeCSS" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">CSS Implementation</h2>
            <p class="nds-section-description">Core styles for the code block component</p>
        </div>
        <div class="nds-section-content">

            <div class="nds-code nds-expandable">
                <div class="nds-code-action">
                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                    </button>
                </div>
                <div class="nds-expandable-content">
                    <code class="lang-css line-numbers">
.nds-code {
    margin: var(--spacing-xl);
    border: 1px solid var(--border-neutral-secondary);
    border-radius: var(--radius-md);
    padding: 0;
    position: relative;
    overflow: clip;
}

.nds-code .nds-code-action {
    position: absolute;
    top: 0;
    right: 0;
    background-color: var(--alpha-white-70);
    z-index: 2;
}

.nds-code code {
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: var(--nds-text-sm-FS);
    line-height: var(--nds-text-sm-LH);
    font-weight: 600;
    direction: ltr;
    text-align: left;
    white-space: pre;
    padding: var(--spacing-xl) 0;
}

/* Line numbers variant */
.nds-code code.line-numbers {
    counter-reset: line;
    display: flex;
    flex-direction: column;
}

.nds-code code.line-numbers .code-line::before {
    counter-increment: line;
    content: counter(line);
    width: 3em;
    margin-right: 1rem;
    color: var(--colors-neutral-500);
    font-size: var(--nds-text-xs-FS);
}
                </code>
                </div>
            </div>

        </div>
    </div>
</section>
