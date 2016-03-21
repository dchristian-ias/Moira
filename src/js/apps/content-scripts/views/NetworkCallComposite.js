var Marionette = require('backbone.marionette'),
    networkCallViewTmplt = require('./templates/network_call_view.hbs'),
    networkCallCompositeTmlpt = require('./templates/network_call_composite.hbs');

var NetworkCallItemView = Marionette.ItemView.extend({
    tagName:'tr',
    template: networkCallViewTmplt,
    templateHelpers:function(){
        var callType, pingTime;
        var lookup = {
            'a':"Ad Talk",
            'b':"Diagnostic information",
            'i':"Presence of third party",
            'l':"Ad Billable because of size",
            // 'v':"Full complement of video events",
            'p':"In View to MRC spec",
            'pf':"Ad is fully in view",
            'qf':"Fully in view at quartile",
            's': "Fraud measurements",
            'vh': "Fraud measurements",
            't':"Would be in view if not for focus",
            'u':"Final data collection",
            'v':"Non geometric measurement technique ready"
        };

        pingTime = this.model.get('pingTime');
        if(pingTime >= 0) {
            callTime = pingTime;
        } else if (pingTime.indexOf('.') !== -1) {
            callTime = pingTime.slice('.')[1];
        } else {
            callTime = 'na';
        }

        return  {
            callTime:callTime,
            callType:lookup[this.model.get('callType')]
        };
    }
});

var NetworkCallCompositeView = Marionette.CompositeView.extend({
    tagName:'table',
    template: networkCallCompositeTmlpt,
    childView:NetworkCallItemView,
    childViewContainer:'tbody'
});

module.exports = NetworkCallCompositeView;