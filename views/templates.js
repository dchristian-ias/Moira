/**
 * @module templates
 */
var _ = require('underscore');

module.exports = {
    // UI templates.
    'mainContainer': _.template('<H1>INTEGRAL TAGS</H1><div id="ads-found-container"></div>'),
    'smallAdView': _.template('<span class="idType"><%= tagIdType %></span>:<span class="tagId"><%= tagId %></span> <span> <%= id %></span>' +
    '   <div class="dt-calls"></div>'),
    'networkCallView': _.template('<td><%=callType %></td><td><%=callTime %></td>'),
    'networkCallComposite':_.template('<thead>' +
    '       <tr><th>Call Type</th><th>Call Number</th></tr>' +
    '   </thead>' +
    '    <tbody class="dt-call-list"></tbody>')
};
