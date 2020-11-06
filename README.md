This project was bootstrapped with [DHIS2 Application Platform](https://github.com/dhis2/app-platform).

## Functionality

- User chooses a start and an end-date in a calendar.
- A dropdown lets the user choose whether they would like information regarding Index Cases, Contact cases, or both displayed.
- A table situated below the drop down will display the number of people to contact in the given the user input in the calendar and drop down.
- The main table will display “due-date”, first name, last name, phone number, a button that when pressed will display a table showing the contact cases (only displayed if the item is an index case), and a button that will take the user to the case’s profile in the tracker capture app.
- The table providing information about the contacts related to an index case, will be shown in a layer “above” the rest of the page.

- The app does show an overview of overview of cases to contact on a particular day (default = today).
- The user may choose themselves what kind of case (or both) they wish to display.
- The button to the TCA does make it possible to directly to an individual's TCA-profile.
- The workload overview is automatically generated based on the interval provided by the user.

- The user is provided with information regarding the number of contacts per case as it is written on the button to show contacts.
- The app does not provide a “sub-view”, but rather a layer that provides the information regarding contacts linked to the same index case.

## Implementation

- Written in React
- Styled using CSS
- Mainly used DHIS2 components
- Calendar is from
	https://reactdatepicker.com/ 
- Icons are from 
	https://fontawesome.com/icons/external-link-alt?style=solid
	https://fontawesome.com/icons/user-friends?style=solid
with the following license: https://fontawesome.com/license



## Missing functionality, and suboptimal solutions

- The data we fetch from the DHIS2-API is not live as we fetch it when the user loads the app. In order to refresh the data, the user needs to reload the app. This could prove to be a problem if a lot 


## Changes since the first presentation

- Everything is located on the same page.
- Calendar implementation instead of text input to input dates.
- Dropped the sub-table to show the contacts related to an index case. Instead we went for a layer, and a table there.


## Learn More

You can learn more about the platform in the [DHIS2 Application Platform Documentation](https://platform.dhis2.nu/).

You can learn more about the runtime in the [DHIS2 Application Runtime Documentation](https://runtime.dhis2.nu/).

To learn React, check out the [React documentation](https://reactjs.org/).
