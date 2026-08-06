/* NDS.Forms — public surface
 * Rides: (none — base component)
 * Methods:
 *   NDS.Forms.init()                       scan + initialize every .nds-form-container
 *   NDS.Forms.initializeContainer(el)      initialize one container
 *   NDS.Forms.initForm(form)               wire one .nds-form (submit validation)
 *   NDS.Forms.setStatus(el, status, msg)   set field status (error/success/warning/info)
 *   NDS.Forms.clearStatus(el)              clear it
 *   NDS.Forms.getStatus(el)                read {status, message}
 *   NDS.Forms.setState(el, name, add)      add/remove a field state ('required' also
 *                                          flips the inputs' required property)
 *   NDS.Forms.syncState(input)             re-sync a control's chrome after setting
 *                                          value/checked from JS
 *   NDS.Forms.setIndeterminate(cb, value)  set a checkbox's indeterminate state
 *   NDS.Forms.validateForm(form, opts)     validate everything → {valid, invalidFields, errors}
 *   NDS.Forms.validateCheckboxGroup(group, opts)
 *   NDS.Forms.validateRadioGroup(group, opts)
 *   NDS.Forms.validateMultiselect(el, opts)
 *   NDS.Forms.validateTaginput(el, opts)
 *   NDS.Forms.validateOtpGroup(el, opts)
 *   NDS.Forms.initCheckboxGroupValidation(group) / .initRadioGroupValidation(group)
 *   NDS.Forms.initMultiselectValidation(el)      live-validation wiring for a group
 * Events:
 *   nds:statusChange         detail {status, message} — from the form container
 *   nds:formValidate         detail {valid, invalidFields, errors} — from the form, every
 *                            validateForm() run
 *   nds:formValid            detail {} — from the form, on a passing submit
 *   nds:formInvalid          detail {invalidFields, errors} — from the form, on a blocked submit
 *   nds:switchChange         detail {checked, value, input} — from the .nds-switch element
 *   nds:indeterminateChange  detail {indeterminate} — from the checkbox
 * Hooks:
 *   data-required · data-min-checked · data-max-checked · data-error-message
 *   data-ajax · data-message · data-feedback-target · data-loading-slot
 *   data-target · data-autofill-apply (auto-fill containers)
 * Gotchas:
 *   - Singleton shape: init() and initializeContainer() only — no reinit(), no create().
 *   - syncState() dispatches nothing, so it cannot re-enter your own input handler. Setting
 *     input.value from JS notifies nothing on its own: call syncState() or dispatch input/change.
 *   - Forms owns the submit listener on every .nds-form. data-ajax makes it preventDefault()
 *     after validation — the request is yours to send from nds:formValid.
 *   - validateForm() is called synchronously at submit; keep it in the main bundle.
 */
// fixture stub — the banner above is the surface under test; real logic lives in the template.
