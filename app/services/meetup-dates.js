import Ember from 'ember';

// 3rd wednesday
var MEETUP_WEEK = 2; // 3rd week of the month (0 based)
var MEETUP_WEEKDAY = 3; // Wednesday (0 based starting with Sunday)

function getMeetupMomentByMonthOffset(offset) {
  var firstDayOfMonth = moment().add(offset, 'months').startOf('month');
  var dateOfFirstMeetupWeekday = ((7 + MEETUP_WEEKDAY - firstDayOfMonth.day()) % 7) + 1;
  return firstDayOfMonth.date(dateOfFirstMeetupWeekday).add((MEETUP_WEEK), 'weeks');
}

export default Ember.Service.extend({
  today: Ember.computed(function() {
    return moment().startOf('day');
  }),
  isMeetupToday: Ember.computed(function() {
    return getMeetupMomentByMonthOffset(0).isSame(this.get('today'));
  }),
  isMonthsMeetupInPast: Ember.computed(function() {
    return this.get('thisMonthsMeetup').isBefore(this.get('today'));
  }),
  isMonthsMeetupInFuture: Ember.computed(function() {
    return this.get('thisMonthsMeetup').isAfter(this.get('today'));
  }),
  previousMeetup: Ember.computed(function() {
    var previousMeetup = this.get('isMonthsMeetupInPast') ? this.get('thisMonthsMeetup') : getMeetupMomentByMonthOffset(-1);
    return previousMeetup.toDate();
  }),
  nextMeetup: Ember.computed(function() {
    var nextMeetup = this.get('isMonthsMeetupInFuture') ? thisMonthsMeetup : getMeetupMomentByMonthOffset(1);
    return nextMeetup.toDate();
  }),
  thisMonthsMeetup: Ember.computed(function() {
    return getMeetupMomentByMonthOffset(0);
  }),
  getMeetupDates({ start, end }) {
    var meetupDates = [];

    for (var offset = start; offset <= end; offset++) {
      meetupDates.push(getMeetupMomentByMonthOffset(offset));
    }

    return meetupDates;
  }
});
