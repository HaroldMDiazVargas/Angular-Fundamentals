// Tabs

// In bootstrap implementing tabs require some complex markup
// With Angular Material => easily add tabs to our app with only 2 elements

// In app.module
// Import MdTabsModule => on imports[]

// In component html
// Put all tabs inside a group => <md-tab-group> => inside this group we will have 1 or more tabs
// <md-tab> to put a tab => for each tab we set the label attribute for set header
//                       => and inside the <md-tab> we put the content 



// Test => Everything is fine but content of the tab is so close to the header 
//      => add padding => inspect element DevTool => we see the class of the element <div with class = "mat-tab-body-content"
//                                                => this element is where the content is set (under the hood)
// So in css => apply 20padding elemetn with this class


//markup
<md-tab-group>
    <md-tab label="Billing">
        Content of the billing tab
    </md-tab>

    <md-tab label="Shipping">
        Content of the shipping tab
    </md-tab>
</md-tab-group>

//stylesheet

.mat-tab-body-content{
    padding-top: 20px;
}


//ts