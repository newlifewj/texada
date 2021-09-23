@scenario: Equipment list
Given I go to {url: "localhost:3000"}
When I clik the Equipmets tab
Then I can see the equipments list
And I can see the Return button is disabled

@scenario: Equipment search
When I enter "boo" in search bar
And I click the search icon
Then I can see names of all equipments in the table contain "boo"

@scenario: Book an equipent
When I click Book button
Then I can see the popover panel

@scenario: Continue book equipment - select product
When I am in the Book panel
And I click select dropdown to choose an equipment
Then I can see the equipment list
And I can see the equipment list is same as current search table
But I cannot see the unavailable items

@scenario: Continue book equipment - book from-to date
When I am in the Book panel
And there exist From and To datepicker
And I open datepicker to choose date
But I cannot pick From date early than today
And I cannot pick To date early then From date

@scenario: Continue book equipment - book confirmation
When I fill the Book form
And I see the Yes button is enabled
And I click the Yes button
Then I can see the confirm popover is showing
And I can see ...

@scenario: Continue book equipment - Book complete
When I am in the Book confirm popover
And I click the Yes button to confirm
Then I can see popover closed
And I can see the booked equipment in the table is not available now
And I can see the Return button is enabled

@scenario: Continue book more equipments (plain types and meter types)
...

@Scenario: Return equipment
When The Return is enabled
And I click the Return button
Then I can see the popover return panel

@Scenario: Continue return - choose product
When I am in the Return panel
And I click the select dropdown
Then I can see all my rental equipments
And I can choose one product

@Scenario: Continue return - Cannot add miles
When I am in the Return panel
And I choose a plain type product
Then I can see the Mileage input it disabled

@Scenario: Continue return - Add miles
When I am in the Return panel
And I choose a meter type product
Then I can see the Mileage input it enabled
And I can enter miles

@Scenario: Continue return - confirm view
When I complete the Return form
And I see the Yes button is enabled
Then I click the Yes button
And I can see the Return confirm popover


@Scenario: Continue return - confirm
When I am in the Return confirmation
And I click the Yes button
Then I can see the Return popover closed
And I can see the durability points changed
And I can see the mileage changed
And I can see the returned equipment is available now

@Scenario: Continue return - return more equipments
When I return all my rental equipments
Then I can see the Return button is disabled