---
layout: page
title: Code
hero_title: Code Block - National Design System
hero_description: Code display component with syntax highlighting, copy functionality, and line numbers
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
---

<!-- Code Block Overview -->
<section id="codeOverview" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Direct Code Block</h2>
            <p class="nds-section-description">Standalone code blocks with copy button, used for API documentation and code snippets</p>
        </div>
        <div class="nds-section-body">
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
                                <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                    <i class="nds-icon nds-hgi-copy-01"></i>
                                </button>
                            </div>
                            <div class="nds-expandable-content">
                                <code class="lang-html code">
&lt;div class="nds-card nds-stroke"&gt;
  &lt;div class="nds-card-content"&gt;
    &lt;span class="nds-card-title"&gt;Card Title&lt;/span&gt;
    &lt;p class="nds-card-description"&gt;Card description text&lt;/p&gt;
  &lt;/div&gt;
&lt;/div&gt;
                                </code>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="demo-code">
                <div class="nds-tabs nds-code nds-divided">
                    <div class="nds-tab-list-container nds-scroll-more">
                        <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                aria-controls="panel-basic-1" id="tab-basic-1">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                        <button class="nds-btn nds-subtle nds-tab nds-show-more" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                        </button>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example" role="tabpanel" id="panel-basic-1"
                            aria-labelledby="tab-basic-1">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                    <i class="nds-icon nds-hgi-copy-01"></i>
                                </button>
                            </div>
                            <code class="lang-html code">
&lt;div class="nds-code nds-expandable"&gt;
  &lt;div class="nds-code-action"&gt;
    &lt;button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example"&gt;
      &lt;i class="nds-icon nds-hgi-copy-01"&gt;&lt;/i&gt;
    &lt;/button&gt;
  &lt;/div&gt;
  &lt;div class="nds-expandable-content"&gt;
    &lt;code class="lang-html code"&gt;
      &lt;!-- Your code here --&gt;
    &lt;/code&gt;
  &lt;/div&gt;
&lt;/div&gt;
                            </code>
                        </div>
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
                                <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                    <i class="nds-icon nds-hgi-copy-01"></i>
                                </button>
                            </div>
                            <div class="nds-expandable-content">
                                <code class="lang-javascript line-numbers">
const alert = NDS.Alert.create({
    variant: 'success',
    title: 'Success',
    description: 'Your changes have been saved.',
    target: '#alert-container'
});

NDS.Alert.create({
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
                <div class="demo-code">
                <div class="nds-tabs nds-code nds-divided">
                    <div class="nds-tab-list-container nds-scroll-more">
                        <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                aria-controls="panel-linenums-1" id="tab-linenums-1">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                        <button class="nds-btn nds-subtle nds-tab nds-show-more" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                        </button>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example" role="tabpanel" id="panel-linenums-1"
                            aria-labelledby="tab-linenums-1">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                    <i class="nds-icon nds-hgi-copy-01"></i>
                                </button>
                            </div>
                            <code class="lang-html code">
&lt;div class="nds-code nds-expandable"&gt;
  &lt;div class="nds-code-action"&gt;
    &lt;button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example"&gt;
      &lt;i class="nds-icon nds-hgi-copy-01"&gt;&lt;/i&gt;
    &lt;/button&gt;
  &lt;/div&gt;
  &lt;div class="nds-expandable-content"&gt;
    &lt;code class="lang-javascript line-numbers"&gt;
      // Your code here
    &lt;/code&gt;
  &lt;/div&gt;
&lt;/div&gt;
                            </code>
                        </div>
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
                                <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                    <i class="nds-icon nds-hgi-copy-01"></i>
                                </button>
                            </div>
                            <div class="nds-expandable-content">
                                <code class="lang-javascript line-numbers">
async function handleFormSubmit(form) {
    const alertContainer = document.getElementById('form-alerts');

    // Clear previous alerts
    NDS.Alert.dismissAll(alertContainer);

    try {
        const response = await submitForm(form);

        if (response.success) {
            NDS.Alert.create({
                variant: 'success',
                description: 'Form submitted successfully!',
                target: alertContainer,
                title: 'Success',
                prepend: true
            });
        } else {
            NDS.Alert.create({
                variant: 'error',
                description: response.message,
                target: alertContainer,
                title: 'Submission Failed'
            });
        }
    } catch (error) {
        NDS.Alert.create({
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
                <div class="demo-code">
                <div class="nds-tabs nds-code nds-divided">
                    <div class="nds-tab-list-container nds-scroll-more">
                        <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                aria-controls="panel-expandable-1" id="tab-expandable-1">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                        <button class="nds-btn nds-subtle nds-tab nds-show-more" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                        </button>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example" role="tabpanel" id="panel-expandable-1"
                            aria-labelledby="tab-expandable-1">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                    <i class="nds-icon nds-hgi-copy-01"></i>
                                </button>
                            </div>
                            <code class="lang-html code">
&lt;div class="nds-code nds-expandable"&gt;
  &lt;div class="nds-code-action"&gt;
    &lt;button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example"&gt;
      &lt;i class="nds-icon nds-hgi-copy-01"&gt;&lt;/i&gt;
    &lt;/button&gt;
  &lt;/div&gt;
  &lt;div class="nds-expandable-content"&gt;
      &lt;code class="lang-javascript line-numbers"&gt;
    // Long code content here
    // Will collapse with "Show More" button
  &lt;/code&gt;
  &lt;/div&gt;
&lt;/div&gt;
                            </code>
                        </div>
                    </div>
                </div>
                </div>
            </div>

            </div>
        </div>
    </div>
</section>

<!-- Tabbed Code Block -->
<section id="tabbedCode" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Tabbed Code Block</h2>
            <p class="nds-section-description">Code blocks with tab navigation for showing multiple languages or file types</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">

            <!-- Single Tab -->
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Single Tab</div>
                </div>
                <div class="demo-container">
                    <div class="state-demo">
                        <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided">
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="demo-panel-single-1" id="demo-tab-single-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                                <button class="nds-btn nds-subtle nds-tab nds-show-more" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                </button>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="demo-panel-single-1"
                                    aria-labelledby="demo-tab-single-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;button class="nds-btn nds-primary nds-lg"&gt;
  &lt;i class="nds-icon nds-hgi-plus-sign" aria-hidden="true"&gt;&lt;/i&gt;
  &lt;span class="nds-label"&gt;Button Text&lt;/span&gt;
&lt;/button&gt;
                                    </code>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                <div class="demo-code">
                <div class="nds-tabs nds-code nds-divided">
                    <div class="nds-tab-list-container nds-scroll-more">
                        <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                aria-controls="panel-singletab-1" id="tab-singletab-1">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                        <button class="nds-btn nds-subtle nds-tab nds-show-more" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                        </button>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example" role="tabpanel" id="panel-singletab-1"
                            aria-labelledby="tab-singletab-1">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                    <i class="nds-icon nds-hgi-copy-01"></i>
                                </button>
                            </div>
                            <code class="lang-html code">
&lt;div class="demo-code"&gt;
&lt;div class="nds-tabs nds-code nds-divided"&gt;
  &lt;div class="nds-tab-list-container nds-scroll-more"&gt;
    &lt;nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation"&gt;
      &lt;button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
        aria-controls="panel-id" id="tab-id"&gt;
        &lt;span class="nds-tab-label"&gt;HTML&lt;/span&gt;
      &lt;/button&gt;
    &lt;/nav&gt;
    &lt;button class="nds-btn nds-subtle nds-tab nds-show-more" aria-label="Show more"&gt;&lt;i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"&gt;&lt;/i&gt;
    &lt;/button&gt;
  &lt;/div&gt;
  &lt;div class="nds-tab-content"&gt;
    &lt;div class="nds-tab-panel code-example" role="tabpanel" id="panel-id"
      aria-labelledby="tab-id"&gt;
      &lt;div class="nds-code-action"&gt;
        &lt;button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example"&gt;
          &lt;i class="nds-icon nds-hgi-copy-01"&gt;&lt;/i&gt;
        &lt;/button&gt;
      &lt;/div&gt;
      &lt;code class="lang-html code"&gt;
        &lt;!-- Your code here --&gt;
      &lt;/code&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;
&lt;/div&gt;
                            </code>
                        </div>
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
                        <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided">
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
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
                                <button class="nds-btn nds-subtle nds-tab nds-show-more" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                </button>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="demo-panel-multi-html"
                                    aria-labelledby="demo-tab-multi-html">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;div class="nds-alert nds-card" data-status="success"&gt;
  &lt;span class="nds-feedback nds-alert-icon nds-outline"&gt;
    &lt;span class="nds-feedback-icon"&gt;
      &lt;i class="nds-icon" aria-hidden="true"&gt;&lt;/i&gt;
    &lt;/span&gt;
  &lt;/span&gt;
  &lt;div class="nds-alert-content"&gt;
    &lt;div class="nds-alert-text"&gt;
      &lt;span class="nds-alert-title"&gt;Success&lt;/span&gt;
      &lt;p class="nds-alert-description"&gt;Operation completed.&lt;/p&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;
                                    </code>
                                </div>
                                <div class="nds-tab-panel code-example" role="tabpanel" id="demo-panel-multi-js"
                                    aria-labelledby="demo-tab-multi-js" hidden>
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-javascript code">
NDS.Alert.create({
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
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
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
                </div>
                <div class="demo-code">
                <div class="nds-tabs nds-code nds-divided">
                    <div class="nds-tab-list-container nds-scroll-more">
                        <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                aria-controls="panel-multitab-1" id="tab-multitab-1">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                        <button class="nds-btn nds-subtle nds-tab nds-show-more" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                        </button>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-multitab-1"
                            aria-labelledby="tab-multitab-1">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                    <i class="nds-icon nds-hgi-copy-01"></i>
                                </button>
                            </div>
                            <div class="nds-expandable-content">
                                <code class="lang-html code">
&lt;div class="demo-code"&gt;
&lt;div class="nds-tabs nds-code nds-divided"&gt;
  &lt;div class="nds-tab-list-container nds-scroll-more"&gt;
    &lt;nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation"&gt;
      &lt;button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
        aria-controls="panel-html" id="tab-html"&gt;
        &lt;span class="nds-tab-label"&gt;HTML&lt;/span&gt;
      &lt;/button&gt;
      &lt;button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
        aria-controls="panel-js" id="tab-js"&gt;
        &lt;span class="nds-tab-label"&gt;JavaScript&lt;/span&gt;
      &lt;/button&gt;
    &lt;/nav&gt;
    &lt;button class="nds-btn nds-subtle nds-tab nds-show-more" aria-label="Show more"&gt;&lt;i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"&gt;&lt;/i&gt;
    &lt;/button&gt;
  &lt;/div&gt;
  &lt;div class="nds-tab-content"&gt;
    &lt;div class="nds-tab-panel code-example" role="tabpanel" id="panel-html"
      aria-labelledby="tab-html"&gt;
      &lt;div class="nds-code-action"&gt;
        &lt;button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example"&gt;
          &lt;i class="nds-icon nds-hgi-copy-01"&gt;&lt;/i&gt;
        &lt;/button&gt;
      &lt;/div&gt;
      &lt;code class="lang-html code"&gt;
        &lt;!-- HTML code here --&gt;
      &lt;/code&gt;
    &lt;/div&gt;
    &lt;div class="nds-tab-panel code-example" role="tabpanel" id="panel-js"
      aria-labelledby="tab-js" hidden&gt;
      &lt;div class="nds-code-action"&gt;
        &lt;button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example"&gt;
          &lt;i class="nds-icon nds-hgi-copy-01"&gt;&lt;/i&gt;
        &lt;/button&gt;
      &lt;/div&gt;
      &lt;code class="lang-javascript code"&gt;
        // JavaScript code here
      &lt;/code&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;
&lt;/div&gt;
                                </code>
                            </div>
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
                <div class="demo-code">
                <div class="nds-tabs nds-code nds-divided">
                    <div class="nds-tab-list-container nds-scroll-more">
                        <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                aria-controls="panel-hidden-1" id="tab-hidden-1">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                        <button class="nds-btn nds-subtle nds-tab nds-show-more" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                        </button>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example" role="tabpanel" id="panel-hidden-1"
                            aria-labelledby="tab-hidden-1">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                    <i class="nds-icon nds-hgi-copy-01"></i>
                                </button>
                            </div>
                            <code class="lang-html code">
&lt;!-- Inside a .nds-demo-card, add hidden attribute --&gt;
&lt;div class="demo-code"&gt;
&lt;div class="nds-tabs nds-code nds-divided"&gt;
  &lt;!-- Tab structure same as above --&gt;
&lt;/div&gt;
&lt;/div&gt;
                            </code>
                        </div>
                    </div>
                </div>
                </div>
            </div>

            </div>
        </div>
    </div>
</section>

<!-- Inline Code -->
<section id="inlineCode" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Inline Code</h2>
            <p class="nds-section-description">Use <code class="nds-inline-code lang-html">nds-inline-code</code> on a <code class="nds-inline-code lang-html">&lt;code&gt;</code> element for short inline code references with syntax coloring</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">

            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Inline Code</div>
                </div>
                <div class="demo-container">
                    <div class="state-demo" style="padding: var(--spacing-lg);">
                        <p>Call <code class="nds-inline-code lang-html">NDS.Code.init</code> after inserting dynamic code blocks, or use the class <code class="nds-inline-code lang-html">nds-inline-code</code> directly on any <code class="nds-inline-code lang-html">&lt;code&gt;</code> element.</p>
                    </div>
                </div>
                <div class="demo-code">
                <div class="nds-tabs nds-code nds-divided">
                    <div class="nds-tab-list-container nds-scroll-more">
                        <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                aria-controls="panel-code-inline-1" id="tab-code-inline-1">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                        <button class="nds-btn nds-subtle nds-tab nds-show-more" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                        </button>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example" role="tabpanel" id="panel-code-inline-1"
                            aria-labelledby="tab-code-inline-1">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                    <i class="nds-icon nds-hgi-copy-01"></i>
                                </button>
                            </div>
                            <code class="lang-html code">
&lt;p&gt;Call &lt;code class="nds-inline-code lang-html"&gt;NDS.Code.init&lt;/code&gt; after inserting dynamic code blocks, or use the class &lt;code class="nds-inline-code lang-html"&gt;nds-inline-code&lt;/code&gt; directly on any &lt;code class="nds-inline-code lang-html"&gt;&amp;lt;code&amp;gt;&lt;/code&gt; element.&lt;/p&gt;
                            </code>
                        </div>
                    </div>
                </div>
                </div>
            </div>

            </div>
        </div>
    </div>
</section>

<!-- Language Classes -->
<section id="languageClasses" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Language Classes</h2>
            <p class="nds-section-description">Supported language identifiers for the code element. When no class is present, the lexer sniffs the language from the content automatically.</p>
        </div>
        <div class="nds-section-body">
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
                                    <td><code class="nds-inline-code lang-html">lang-html</code></td>
                                    <td>HTML / XML</td>
                                    <td>Markup and template examples</td>
                                </tr>
                                <tr>
                                    <td><code class="nds-inline-code lang-html">lang-css</code></td>
                                    <td>CSS / SCSS</td>
                                    <td>Stylesheet examples</td>
                                </tr>
                                <tr>
                                    <td><code class="nds-inline-code lang-html">lang-javascript</code> or <code class="nds-inline-code lang-html">lang-js</code></td>
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

<!-- Built-in Features -->
<section id="codeFeatures" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Built-in Features</h2>
        </div>
        <div class="nds-section-body">
            <div class="nds-definition-list nds-divided nds-grid nds-doc-features">
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-source-code"></i>
                        <span class="nds-label">Syntax Highlighting</span>
                    </span>
                    <p class="nds-item-desc">HTML, CSS, and JavaScript are highlighted automatically. Embedded <code class="nds-inline-code lang-html">&lt;style&gt;</code> and <code class="nds-inline-code lang-html">&lt;script&gt;</code> bodies inside HTML blocks are highlighted in their respective languages.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-layers-01"></i>
                        <span class="nds-label">Line Numbers</span>
                    </span>
                    <p class="nds-item-desc">A CSS counter gutter is added automatically when a block has more than one line. Opt in manually by adding <code class="nds-inline-code lang-html">line-numbers</code> to the <code class="nds-inline-code lang-html">&lt;code&gt;</code> element.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                        <span class="nds-label">Copy Button</span>
                    </span>
                    <p class="nds-item-desc">Add <code class="nds-inline-code lang-html">nds-copy</code> to any button inside <code class="nds-inline-code lang-html">.nds-code-action</code> to copy the block's source text. The button shows a brief "Copied" state on success.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-tag-01"></i>
                        <span class="nds-label">Language Auto-detection</span>
                    </span>
                    <p class="nds-item-desc">When no <code class="nds-inline-code lang-html">lang-*</code> class is set, the lexer sniffs the language from the content: leading <code class="nds-inline-code lang-html">&lt;</code> implies HTML, JS keywords imply JavaScript, selector or declaration patterns imply CSS.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-code"></i>
                        <span class="nds-label">Inline Code</span>
                    </span>
                    <p class="nds-item-desc">Apply <code class="nds-inline-code lang-html">nds-inline-code</code> to a <code class="nds-inline-code lang-html">&lt;code&gt;</code> element for short inline references with <code class="nds-inline-code lang-html">nowrap</code> and syntax coloring.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-colors"></i>
                        <span class="nds-label">Themeable Tokens</span>
                    </span>
                    <p class="nds-item-desc">Nine <code class="nds-inline-code lang-html">--syntax-*</code> custom properties let you override every syntax color category at the page or component level.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="codeUsageGuidelines" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-body">

            <div class="nds-block">
                <h3 class="nds-block-title">Data Attributes</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Attribute</th><th>Element</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">data-processed</code></td><td><code class="nds-inline-code lang-html">code</code></td><td>Set to <code class="nds-inline-code lang-html">true</code> by JS after highlighting. Guards against double-processing. Set to <code class="nds-inline-code lang-html">false</code> by <code class="nds-inline-code lang-js">reprocessCodeElement</code> before re-highlighting.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-original-content</code></td><td><code class="nds-inline-code lang-html">code</code></td><td>Stores the pre-highlight innerHTML so <code class="nds-inline-code lang-js">reprocessCodeElement</code> can restore and re-highlight (for example, after a theme switch).</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">CSS Custom Properties</h3>
                <p>These properties apply to both <code class="nds-inline-code lang-html">.nds-code</code> and <code class="nds-inline-code lang-html">.nds-inline-code</code>. Set them on a parent element or <code class="nds-inline-code lang-html">:root</code> to re-theme all code on the page.</p>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Property</th><th>Default</th><th>Highlights</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">--syntax-red</code></td><td><code class="nds-inline-code lang-html">--colors-red-600</code></td><td>Tags and CSS selectors</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--syntax-orange</code></td><td><code class="nds-inline-code lang-html">--colors-yellow-600</code></td><td>Attribute names and numbers</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--syntax-green</code></td><td><code class="nds-inline-code lang-html">--colors-green-600</code></td><td>Attribute values and strings</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--syntax-blue</code></td><td><code class="nds-inline-code lang-html">--colors-blue-600</code></td><td>CSS properties, JS functions and methods</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--syntax-purple</code></td><td><code class="nds-inline-code lang-html">--colors-tertiary-500</code></td><td>Keywords and regex</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--syntax-cyan</code></td><td><code class="nds-inline-code lang-html">--colors-blue-500</code></td><td>Literals and operators</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--syntax-yellow</code></td><td><code class="nds-inline-code lang-html">--colors-yellow-600</code></td><td>Built-in globals and class names</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--syntax-gray</code></td><td><code class="nds-inline-code lang-html">--colors-neutral-500</code></td><td>Comments</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--syntax-gray-dark</code></td><td><code class="nds-inline-code lang-html">--colors-neutral-600</code></td><td>Parameters</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">JavaScript API</h3>
                <p>The <strong>NDS.Code</strong> API is called automatically on page load. Call <strong>NDS.Code.init()</strong> after inserting code blocks dynamically.</p>
                <div class="nds-code nds-expandable">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <div class="nds-expandable-content">
                        <code class="lang-javascript line-numbers">
// ── Initialize all code blocks on the page ───────────
// Processes .code-example code, .nds-code code, and code.nds-inline-code
NDS.Code.init();

// ── Re-highlight a single element ────────────────────
// Restores original content from data-original-content then re-highlights.
// Use after a theme switch or dynamic content change.
NDS.Code.reprocessCodeElement(codeEl);

// ── Detect the language of a block ───────────────────
// Returns 'html', 'css', or 'javascript'.
// Reads the lang-* / language-* class first; falls back to content sniffing.
const lang = NDS.Code.detectLanguage(codeEl, sourceText);
                        </code>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>
