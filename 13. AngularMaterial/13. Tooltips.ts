// Tooltips

// In app.module
// import tooltip module => MdTooltipModule => on imports[]

// component html
// add a <span>  => when user hover to this span => the user will se tooltip
//               => so apply the mdTooltip directive => set to the actual tool tip => "Here is my tooltip"
// We can see that the tooltip is kind off of the screen => left side => close to edge
// This is because we dont have any padding to elements 
// However we can have control over this tooltip

// Head over material.angular.io
// components => Popups & modals => tooltip => overview tab => see all the position we can set: above, below, left, right, before, so on
// To set this position => Look API tab => see all properties of this directive mdTooltip
//                                      => e.x mdTooltipPosition => set to a position => e.x "right"


// Test
// Hover the span => see tooltip on the right side 

//markup
<span mdTooltip="Here is my tooltip" mdTooltipPosition = "right">Some text here</span>

//ts