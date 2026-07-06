/**
 * Catalog Client Script: Offboarding - Auto-fill Employee Email & Department
 * Catalog Item: Employee Offboarding Request
 * Type: onChange
 * Variable: employee_name
 * UI Type: All
 */
function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading || newValue === '') {
        return;
    }

    var ga = new GlideAjax('LifecycleRequestUtils'); // client-callable wrapper (see note below)
    ga.addParam('sysparm_name', 'getEmployeeDetails');
    ga.addParam('sysparm_user_sys_id', newValue);
    ga.getXML(function (response) {
        var email = response.responseXML.documentElement.getAttribute('answer_email');
        var dept = response.responseXML.documentElement.getAttribute('answer_department');
        if (email) {
            g_form.setValue('employee_email', email);
        }
        if (dept) {
            g_form.setValue('department', dept);
        }
    });
}

/**
 * NOTE: To use GlideAjax from a catalog client script, expose a
 * client-callable Script Include, e.g.:
 *
 * var LifecycleRequestUtilsAjax = Class.create();
 * LifecycleRequestUtilsAjax.prototype = Object.extendsObject(AbstractAjaxProcessor, {
 *     getEmployeeDetails: function () {
 *         var userGr = new GlideRecord('sys_user');
 *         if (userGr.get(this.getParameter('sysparm_user_sys_id'))) {
 *             this.getXMLAnswer = function () {};
 *         }
 *         return '';
 *     }
 * });
 */
