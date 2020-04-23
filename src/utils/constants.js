export const statuses = {
  // { status: [[action, newStatus], ...] }
  // underscore starting actions are not user triggered
  // minus starting items are patient triggered
  // plus starting items are triggered by pharmacists
  new: [
    ['_see', 'seen'],
    ['-cancel', 'cancelled'],
    ['-edit', 'edited']
  ],
  seen: [
    ['+accept', 'accepted'],
    ['+refuse', 'refused'],
    ['-cancel', 'cancelled'],
    ['+suggestChange', 'changeSuggested']
  ],
  cancelled: [],
  edited: [],
  changeSuggested: [
    ['-acceptChange', 'changeAccepted'],
    ['-refuseChange', 'changeRefused'],
    ['-cancel', 'cancelled']
  ],
  accepted: [
    ['+prepare', 'preparing'],
    ['-cancel', 'cancelled']
  ],
  preparing: [['+ready', 'ready']],
  ready: [['_ship', 'shipping']],
  shipping: [['_deliver', 'delivered']],
  refused: []
}
