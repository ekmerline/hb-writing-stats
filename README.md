## Writing Stats Tracker
Even if you love writing, making it a consistent habit can be a slog. It's easy to feel like you're getting nowhere without a way to quantify your progress. The Writing Stats Tracker is a single page app that seeks to help with that problem by allowing the user to track their progress on multiple projects in a variety of ways, and display it in an easy to understand and dynamic visual format using ChartJS and React. By allowing the easy visualization of how much gets done, what's being done, and when, it's easier to patterns that could point to ways to optimize writing productivity, as well as gain the satisfaction of seeing progress in a clear, visual format. 


## Contents
* [Tech Stack](#tech-stack)
* [Features](#features)
* [Future Features](#future)
## <a name="tech-stack"></a>Tech Stack
* React
* Material UI
* ChartJS
* Python
* Flask
* PostgreSQL
* SQLAlchemy ORM

## <a name="features"></a>Features

####  Dashboard

After a user signs in, the user's data is loaded to generate a dynamic dashboard using React. The dashboard displays the most recent project and the details about it, a pie chart showing the breakdown of progress between editing, planning, and writing, a line graph showing progress over time, and a detailed table of entries. 

![alt text](https://github.com/mearajennifer/jobtracker/blob/master/static/img/active-jobs.png "JobTracker active jobs dashboard")

#### Dynamic Filtering
Once on the dashboard, a user can use the dropdown in the project box to decide what data they want to display, whether it's all projects, one project, or a particular combination. As all the relevant data is loaded and managed using React state, there are no server calls needed for filtering, so all updates are quick and involve no page reloading.

#### Project Box
In the project box, a user can edit or delete the currently selected project, add a new project, or add an entry to the currently selected project. They can also use the menu to change which project is currently selected, and uncheck or check projects being filtered for the data displays.

#### Entry Table Box
In the entry table box, all entries based on current filtering are displayed. It also allows for the editing and deletion of the entries.

#### Charts
The pie chart and line graph are created using ChartJS, and are integrated with React so that they will update what they display when the state for filtered entries is updated. 

## <a name="future"></a>Future Features
* Adding authorization for login.
* Set initial data load to a set time period by default.
* Editing of user profile.
* More types of charts.
* Allow customization of what appears on the dashboard and how it displays.
* Create mobile friendly table.