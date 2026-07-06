/**
 * Business Rule: Send Notification On State Change
 * Table: x_onb_lifecycle_request
 * When: after
 * Insert: true | Update: true | Delete: false
 * Condition: current.state.changes()
 * Order: 200
 *
 * Description: Fires a scoped event whenever a lifecycle request changes
 * state. A matching Notification (see
 * Phase5_.../notifications/notification_definitions.json) is configured
 * to listen for this event and email HR + the requester.
 */
(function executeRule(current, previous) {

    var eventName = 'x_onb_lifecycle.request.state_changed';

    gs.eventQueue(
        eventName,
        current,
        current.getValue('state'),
        previous ? previous.getValue('state') : ''
    );

    gs.info('SendNotificationOnStateChange: event queued for ' +
        current.number + ' (state ' +
        (previous ? previous.getValue('state') : 'N/A') + ' -> ' +
        current.getValue('state') + ')');

})(current, previous);
