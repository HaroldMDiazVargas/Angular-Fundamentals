// Chips
// Useful component
// We can use these chips to some kind of tags below an object => e.x all the tags below a product
//                                                             => e.x using to implement some kind of filters => click to each filter/category to see ...

// In app.module
// Import MdChipsModule => on imports[]


// Component html
// <md-chip-list>  => inside this elment we are gonna have a bunch of chips => use <md-chip> with each label
// We get two chips => with a neutral background(gray)
// we can use selected attr => to mark one chip => selected="true" or use binding syntax
// We can also the color of the selected chips => color="accent"  => remember this depends of the curren ttheme

// Component ts
// Define an array for categories => each category has an object => one porperty name => e.x { name: 'intermidate'}
// This to apply dynamically and reder the chips

// Component html
// we use *ngFor directive => to <md-chip> => to binding the categories field array
// And when user click to one chip => we want that chip get seelcted 
//                                 => apply (click) event => binding to => selected property of this category => (click)="category.selected = !category.selected "
// finally bind the [selected] property => "category.selected"

// Test 
// With this implementation we can select any chip => so we can even select all chips
// to select only one at time, make changes

//Component html
// Instead of toggle the property here => "category.selected = !category.selected" => we are gonna call a method in our component
// In that method => we can diselect other categories and then select the category
// So (click) = "selectCategory()" => pass the category object 

//Component ts
// To diselect the other categories => filter the categories object => to get the others categories except the current category
// Then iterate over them using forEach => set selected property to fallse
//                                     => error because c object(categories) doesnt have selected property
//                                    => we need to use square bracket syntax
// Finally => we need to toggle the selected property of this category  => toggle means   a = !a

//Test
// it works fine

//markup

<md-chip-list>
    <md-chip 
    *ngFor = "let category of categories"
    // (click) = "category.selected = !category.selected "
    (click) = "selectCategory(category)"
    [selected] = "category.selected"
    // selected="true" 
    // color="accent" 
    >  {{ category.name  }} </md-chip>
    // <md-chip>Two</md-chip>
</md-chip-list>


//ts
categories= [
    { name: 'begginer' },
    { name: 'intermidate' },
    { name: 'advanced' }
]

selectCategory(category){

    this.categories
        .filter(c => c != category)
            .forEach(c => c['selected'] = false);
    
    category.selected = !category.selected;
}
