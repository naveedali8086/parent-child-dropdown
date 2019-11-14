## Parent Child Dropdown
A vue plugin that loads data in child dropdown through ajax when an option is selected from a parent dropdown.


## Getting Started
**Step 1:** Install plugin
```
npm install parent-child-dropdown
```


**Step 2:** Go to project's main js file (In Laravel this file is typically called *app.js* and found in *resources/js* directory.)
and import installed plugin.

```
import ParentChildDropdown from 'parent-child-dropdown';

Vue.use(ParentChildDropdown);
```

**Step 3:** Now use this plugin whatever page it is required at.


## How To Use
Suppose we have 3 dropdowns.<br>
1. Country Dropdown<br>
2. City Dropdown (loads cities whenever the country is changed from country dropdown)<br>
3. Location Dropdown (loads locations whenever the city is changed from city dropdown)<br>

Note the hierarchy:
1. Country has no parent.
2. Country (is a parent of) ----> City (is a parent of) Location.
3. Location has no child.

~~~~

<div id='geography_section'>

<parent-child-dropdown
    label="Country"
    name="country"
    url="/get-countries"
    event_to_fire="load_cities">
</parent-child-dropdown>

<parent-child-dropdown
    label="City"
    name="city"
    url="/get-cities"
    request_param="country_id"    
    event_to_listen="load_cities"
    event_to_fire="load_locations">
</parent-child-dropdown>

<parent-child-dropdown
    label="Location"
    name="location"
    url="/get-locations"
    request_param="city_id"
    event_to_listen="load_locations">
</parent-child-dropdown>

<div>

<scritp>

new Vue({el: '#geography_section'});

</script>

~~~~


**Points To Be Noted:**
1. The event fired by 'Country dropdown' is same as the event listened by 'City dropdown' 
and event fired by 'City dropdown' is same as the event listened by 'Location dropdown'.

2. The value 'country_id' of the 'request_param' attribute (in case of City dropdown) will be 
  used at server to filter the cities of coresponding country and same goes for location dropdown.

3. Server side code must be written that will return countries, cities & locations at following URLS:<br>
http://your-domain.com/get-countries<br>
http://your-domain.com/get-cities?country_id=xyz<br>
http://your-domain.com/get-locations?city_id=xyz<br>

Note that the query string will be passed by plugin to server if 'request_param' has been defined as plugin attribute. (as shown above)

## Props
| Name                | Type    | Required                                   | Default              | Description                                                                                                  |
|---------------------|---------|--------------------------------------------|----------------------|--------------------------------------------------------------------------------------------------------------|
| label               | string  | yes                                        |                      | Label of the Dropdown                                                                                        |
| name                | string  | yes                                        |                      | name attribute of the 'select' html control                                                                  |
| required            | boolean | no                                         | false                | Whether the the dropdown's value is required or optional                                                     |
| url                 | string  | yes                                        |                      | The URL where the data for the dropdown will load from                                                       |
| request_param       | string  | Parent Dropdown = no <br>Child Dropdown = yes  |                      | The HTTP request parameter's name that will be used at server to filter dropdown data                        |
| event_to_fire       | string  | Parent Dropdown = yes  <br>Child Dropdown = no |                      | This could be any text but its value must match the value of ' event_to_listen' attribute of child dropdown  |
| event_to_listen     | string  | Parent Dropdown = no  <br>Child Dropdown = yes |                      | This could be any text, but its value must match the value of 'event_to_listen' attribute of parent dropdown |
| old_selected_option | string  | no                                         | empty string i.e. '' | Previously selected value                                                                                    |
| err_msg_from_parent | string  | no                                         | empty string i.e. '' | Message from server if the dropdown value does not meet the validations at server                            |