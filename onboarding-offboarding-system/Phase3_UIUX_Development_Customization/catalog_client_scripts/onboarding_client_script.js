/**
 * Catalog Client Script: Onboarding - Auto-fill Email & Validate Joining Date
 * Catalog Item: Employee Onboarding Request
 * Type: onChange
 * Variable: joining_date
 * UI Type: All
 */
function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading || newValue === '') {
        return;
    }

    var today = new Date();
    var selected = new Date(newValue);

    if (selected < today) {
        g_form.showFieldMsg('joining_date',
            'Joining date cannot be in the past.', 'error');
        g_form.setValue('joining_date', '');
    } else {
        g_form.hideFieldMsg('joining_date', true);
    }
}
