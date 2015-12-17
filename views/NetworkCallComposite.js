var Marionette = require('backbone.marionette');

var NetworkCallItemView = Marionette.ItemView.extend({
    tagName:'tr',
    template:require('../views/templates').networkCallView,
    templateHelpers:{
        callType:function(){
            var lookup = {
                'a':"Ad Talk",
                'b':"Diagnostic information",
                'i':"Presence of third party",
                'l':"Ad Billable because of size",
                'v':"Full complement of video events",
                'p':"In View to MRC spec",
                'pf':"Ad is fully in view",
                'qf':"Fully in view at quartile",
                's': "Fraud measurements",
                'vh': "Fraud measurements",
                't':"Would be in view if not for focus",
                'u':"Final data collection",
                'v':"Non geometric measurement technique ready"
            };
            return lookup[this.callType];
        },
        callTime:function(){
            var result,
                pingTime = this.pingTime;
            if(pingTime >= 0) {
                result = pingTime;
            } else if (pingTime.indexOf('.') !== -1) {
                result = pingTime.slice('.')[1];
            } else {
                result = 'na'
            }
            return result;
        }
    }
});

var NetworkCallCompositeView = Marionette.CompositeView.extend({
    tagName:'table',
    template:require('../views/templates').networkCallView,
    childView:NetworkCallItemView,
    childViewContainer:'tbody'
});

module.exports = NetworkCallCompositeView;