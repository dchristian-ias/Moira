/**
 * @module templates
 */
var _ = require('underscore');

module.exports = {
    // UI templates.
    'mainContainer': _.template('<div id="ads-found-container"></div>' +
    '<div id="ads-listing-container"></div>' +
    '<div id="data-display-container"></div>'),

    'adCount': _.template('<%= adCount %> AD(S) FOUND'),

    'dataSelection': _.template('<div id="data-model-selection-container">' +
    '	<div class="data-model-selection-wrap">' +
    '		<h1 id="screen-events" class="data-model-selection">SE</h1>' +
    '	</div>' +
    '	<div class="data-model-selection-wrap">' +
    '		<h1 id="cumulative-states" class="data-model-selection">CS</h1>' +
    '	</div>' +
    '	<div class="data-model-selection-wrap">' +
    '		<h1 id="network-calls" class="data-model-selection">NC</h1>' +
    '	</div>' +
    '	<div class="data-model-selection-wrap">' +
    '		<h1 id="detection-results" class="data-model-selection">DR</h1>' +
    '	</div>' +
    '</div>' +
    '<div id="data-display"></div>'),

    // Backbone model templates.
    'detectionResults': _.template('<% _.each(attributes, function(val, key, attributes){ %>' +
    '	<% if (key === "documentation") { %>' +
    '		<li> <a href="<%= val %>" onclick="return false">Visibility Ladder</a></li>' +
    '		<% } else if (key === "visibileUrl") { %>' +
    '			<li><a href="<%= val %>" onclick="return false">Visible Url</a></li>' +
    '		<% } else if (key !== "viewId") { %>' +
    '			<li> <%= key %> : <%= val %></li>' +
    '		<% } %>' +
    '<% }); %>'),

    'networkCalls': _.template('<% _.each(attributes, function(val, key, attributes){ %>' +
    '	<% if (key === "scriptUrl") { %>' +
    '		<li> <a href="<%= val %>" onclick="return false">Script Url</a></li>' +
    '	<% } else if (key !== "viewId" && val !== "na") { %>' +
    '		<li> <%= key %> : <%= val %></li>' +
    '	<% }%>' +
    '<% }); %>'),

    'screenEvents': _.template('<li><a href="https://util01.303net.net/confluence/display/fwnotes/JS+Info" onclick="return false">JS Info Codes</a></li>' +
    '<% _.each(attributes, function(val, key) { %>' +
    '	<% if (key === "details") { %>' +
    '		<% var details = val.split(","), i; %>' +
    '		<li> <%= key %> : </li>' +
    '			<ul>' +
    '				<% for (i = 0; i < details.length; i++) { %>' +
    '					<% if (details[i]) { %>' +
    '						<li> <%= details[i] %></li>' +
    '					<% } %>' +
    '				<% } %>' +
    '			</ul>' +
    '	<% } else if (key === "breakdowns" && val.piv && val.as) { %>' +
    '		<% var piv = val.piv[val.piv.length - 1], as = val.as[val.as.length - 1]; %>' +
    '		<li> <%= key %> : </li>' +
    '			<ol>' +
    '				<li> piv : ' +
    '					<ul>' +
    '						<% if (piv && piv.state && piv.duration) { %>' +
    '							<li> state : <%= piv.state %> </li>' +
    '							<li> duration : <%= piv.duration %> </li>' +
    '						<% } %>' +
    '					</ul>' +
    '				</li>' +
    '				<li> as : '+
    '					<ul>' +
    '						<% if (as && as.state && as.duration) { %>' +
    '							<li> state : <%= as.state %> </li>' +
    '							<li> duration : <%= as.duration %> </li>' +
    '						<% } %>' +
    '					</ul>' +
    '				</li>' +
    '			</ol>' +
    '	<% } else if (key === "winDimensions" || key === "containerDimensions") { %>' +
    '		<li> <%= key %> : </li>' +
    '			<ul>' +
    '				<li> x : <%= val.x %></li>' +
    '				<li> y : <%= val.y %></li>' +
    '				<li> height : <%= val.height %></li>' +
    '				<li> width : <%= val.width %></li>' +
    '			</ul>' +
    '	<% } else if (key !== "viewId" && key !== "id") { %>' +
    '		<li> <%= key %> : <%= val %></li>' +
    '	<% } %>' +
    '<% }); %>'),

    'cumulativeStates': _.template('<li><a href="https://util01.303net.net/confluence/display/fwnotes/JS+Info" onclick="return false">JS Info Codes</a></li>' +
    '<% _.each(attributes, function(val, key, attributes){ %>' +
    '	<% if (key !== "viewId") { %>' +
    '		<li> <%= key %> : <%= val %></li>' +
    '	<% } %>' +
    '<% }); %>')
};
