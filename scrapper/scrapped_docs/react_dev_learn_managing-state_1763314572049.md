[Learn React](https://react.dev/learn)

# Managing State [Link for this heading](https://react.dev/learn/managing-state\#undefined "Link for this heading")

Intermediate

As your application grows, it helps to be more intentional about how your state is organized and how the data flows between your components. Redundant or duplicate state is a common source of bugs. In this chapter, you’ll learn how to structure your state well, how to keep your state update logic maintainable, and how to share state between distant components.

### In this chapter

- [How to think about UI changes as state changes](https://react.dev/learn/reacting-to-input-with-state)
- [How to structure state well](https://react.dev/learn/choosing-the-state-structure)
- [How to “lift state up” to share it between components](https://react.dev/learn/sharing-state-between-components)
- [How to control whether the state gets preserved or reset](https://react.dev/learn/preserving-and-resetting-state)
- [How to consolidate complex state logic in a function](https://react.dev/learn/extracting-state-logic-into-a-reducer)
- [How to pass information without “prop drilling”](https://react.dev/learn/passing-data-deeply-with-context)
- [How to scale state management as your app grows](https://react.dev/learn/scaling-up-with-reducer-and-context)

## Reacting to input with state [Link for Reacting to input with state ](https://react.dev/learn/managing-state\#reacting-to-input-with-state "Link for Reacting to input with state ")

With React, you won’t modify the UI from code directly. For example, you won’t write commands like “disable the button”, “enable the button”, “show the success message”, etc. Instead, you will describe the UI you want to see for the different visual states of your component (“initial state”, “typing state”, “success state”), and then trigger the state changes in response to user input. This is similar to how designers think about UI.

Here is a quiz form built using React. Note how it uses the `status` state variable to determine whether to enable or disable the submit button, and whether to show the success message instead.

App.js

App.js

DownloadReloadClearFork

99

1

2

3

4

5

6

7

8

9

10

11

12

13

14

15

16

17

18

19

20

21

22

23

24

25

26

27

28

29

30

31

32

33

34

35

36

import{useState}from'react';

exportdefaultfunctionForm(){

const\[answer,setAnswer\] = useState('');

const\[error,setError\] = useState(null);

const\[status,setStatus\] = useState('typing');

if(status === 'success'){

return<h1>That's right!</h1>

}

asyncfunctionhandleSubmit(e){

e.preventDefault();

setStatus('submitting');

try{

awaitsubmitForm(answer);

setStatus('success');

}catch(err){

setStatus('typing');

setError(err);

}

}

functionhandleTextareaChange(e){

setAnswer(e.target.value);

}

return(

<>

<h2>City quiz</h2>

<p>

In which city is there a billboard that turns air into drinkable water?

</p>

<formonSubmit={handleSubmit}>

<textarea

value={answer}

Sandpack Preview

Show more

## Ready to learn this topic?

Read **[Reacting to Input with State](https://react.dev/learn/reacting-to-input-with-state)** to learn how to approach interactions with a state-driven mindset.

[Read More](https://react.dev/learn/reacting-to-input-with-state)

* * *

## Choosing the state structure [Link for Choosing the state structure ](https://react.dev/learn/managing-state\#choosing-the-state-structure "Link for Choosing the state structure ")

Structuring state well can make a difference between a component that is pleasant to modify and debug, and one that is a constant source of bugs. The most important principle is that state shouldn’t contain redundant or duplicated information. If there’s unnecessary state, it’s easy to forget to update it, and introduce bugs!

For example, this form has a **redundant**`fullName` state variable:

App.js

App.js

DownloadReloadClearFork

99

1

2

3

4

5

6

7

8

9

10

11

12

13

14

15

16

17

18

19

20

21

22

23

24

25

26

27

28

29

30

31

32

33

34

35

36

import{useState}from'react';

exportdefaultfunctionForm(){

const\[firstName,setFirstName\] = useState('');

const\[lastName,setLastName\] = useState('');

const\[fullName,setFullName\] = useState('');

functionhandleFirstNameChange(e){

setFirstName(e.target.value);

setFullName(e.target.value \+ ' ' \+ lastName);

}

functionhandleLastNameChange(e){

setLastName(e.target.value);

setFullName(firstName \+ ' ' \+ e.target.value);

}

return(

<>

<h2>Let’s check you in</h2>

<label>

First name:{' '}

<input

value={firstName}

onChange={handleFirstNameChange}

/>

</label>

<label>

Last name:{' '}

<input

value={lastName}

onChange={handleLastNameChange}

/>

</label>

<p>

Your ticket will be issued to: <b>{fullName}</b>

Sandpack Preview

Show more

You can remove it and simplify the code by calculating `fullName` while the component is rendering:

App.js

App.js

DownloadReloadClearFork

99

1

2

3

4

5

6

7

8

9

10

11

12

13

14

15

16

17

18

19

20

21

22

23

24

25

26

27

28

29

30

31

32

33

34

35

36

import{useState}from'react';

exportdefaultfunctionForm(){

const\[firstName,setFirstName\] = useState('');

const\[lastName,setLastName\] = useState('');

constfullName = firstName \+ ' ' \+ lastName;

functionhandleFirstNameChange(e){

setFirstName(e.target.value);

}

functionhandleLastNameChange(e){

setLastName(e.target.value);

}

return(

<>

<h2>Let’s check you in</h2>

<label>

First name:{' '}

<input

value={firstName}

onChange={handleFirstNameChange}

/>

</label>

<label>

Last name:{' '}

<input

value={lastName}

onChange={handleLastNameChange}

/>

</label>

<p>

Your ticket will be issued to: <b>{fullName}</b>

</p>

Sandpack Preview

[Open on CodeSandboxOpen Sandbox](https://codesandbox.io/api/v1/sandboxes/define?undefined&environment=create-react-app "Open in CodeSandbox")

Show more

This might seem like a small change, but many bugs in React apps are fixed this way.

## Ready to learn this topic?

Read **[Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure)** to learn how to design the state shape to avoid bugs.

[Read More](https://react.dev/learn/choosing-the-state-structure)

* * *

## Sharing state between components [Link for Sharing state between components ](https://react.dev/learn/managing-state\#sharing-state-between-components "Link for Sharing state between components ")

Sometimes, you want the state of two components to always change together. To do it, remove state from both of them, move it to their closest common parent, and then pass it down to them via props. This is known as “lifting state up”, and it’s one of the most common things you will do writing React code.

In this example, only one panel should be active at a time. To achieve this, instead of keeping the active state inside each individual panel, the parent component holds the state and specifies the props for its children.

App.js

App.js

DownloadReloadClearFork

99

1

2

3

4

5

6

7

8

9

10

11

12

13

14

15

16

17

18

19

20

21

22

23

24

25

26

27

28

29

30

31

32

33

34

35

36

import{useState}from'react';

exportdefaultfunctionAccordion(){

const\[activeIndex,setActiveIndex\] = useState(0);

return(

<>

<h2>Almaty, Kazakhstan</h2>

<Panel

title="About"

isActive={activeIndex === 0}

onShow={()=>setActiveIndex(0)}

>

With a population of about 2 million, Almaty is Kazakhstan's largest city. From 1929 to 1997, it was its capital city.

</Panel>

<Panel

title="Etymology"

isActive={activeIndex === 1}

onShow={()=>setActiveIndex(1)}

>

The name comes from <spanlang="kk-KZ">алма</span>, the Kazakh word for "apple" and is often translated as "full of apples". In fact, the region surrounding Almaty is thought to be the ancestral home of the apple, and the wild <ilang="la">Malus sieversii</i> is considered a likely candidate for the ancestor of the modern domestic apple.

</Panel>

</>

);

}

functionPanel({

title,

children,

isActive,

onShow

}){

return(

<sectionclassName="panel">

<h3>{title}</h3>

{isActive ? (

<p>{children}</p>

Sandpack Preview

Show more

## Ready to learn this topic?

Read **[Sharing State Between Components](https://react.dev/learn/sharing-state-between-components)** to learn how to lift state up and keep components in sync.

[Read More](https://react.dev/learn/sharing-state-between-components)

* * *

## Preserving and resetting state [Link for Preserving and resetting state ](https://react.dev/learn/managing-state\#preserving-and-resetting-state "Link for Preserving and resetting state ")

When you re-render a component, React needs to decide which parts of the tree to keep (and update), and which parts to discard or re-create from scratch. In most cases, React’s automatic behavior works well enough. By default, React preserves the parts of the tree that “match up” with the previously rendered component tree.

However, sometimes this is not what you want. In this chat app, typing a message and then switching the recipient does not reset the input. This can make the user accidentally send a message to the wrong person:

App.jsContactList.jsChat.js

App.js

ReloadClearFork

99

1

2

3

4

5

6

7

8

9

10

11

12

13

14

15

16

17

18

19

20

21

22

23

24

import{useState}from'react';

importChatfrom'./Chat.js';

importContactListfrom'./ContactList.js';

exportdefaultfunctionMessenger(){

const\[to,setTo\] = useState(contacts\[0\]);

return(

<div>

<ContactList

contacts={contacts}

selectedContact={to}

onSelect={contact=>setTo(contact)}

/>

<Chatcontact={to}/>

</div>

)

}

constcontacts = \[\
\
{name:'Taylor',email:'taylor@mail.com'},\
\
{name:'Alice',email:'alice@mail.com'},\
\
{name:'Bob',email:'bob@mail.com'}\
\
\];

Sandpack Preview

[Open on CodeSandboxOpen Sandbox](https://codesandbox.io/api/v1/sandboxes/define?undefined&environment=create-react-app "Open in CodeSandbox")

Show more

React lets you override the default behavior, and _force_ a component to reset its state by passing it a different `key`, like `<Chat key={email} />`. This tells React that if the recipient is different, it should be considered a _different_`Chat` component that needs to be re-created from scratch with the new data (and UI like inputs). Now switching between the recipients resets the input field—even though you render the same component.

App.jsContactList.jsChat.js

App.js

ReloadClearFork

99

1

2

3

4

5

6

7

8

9

10

11

12

13

14

15

16

17

18

19

20

21

22

23

24

import{useState}from'react';

importChatfrom'./Chat.js';

importContactListfrom'./ContactList.js';

exportdefaultfunctionMessenger(){

const\[to,setTo\] = useState(contacts\[0\]);

return(

<div>

<ContactList

contacts={contacts}

selectedContact={to}

onSelect={contact=>setTo(contact)}

/>

<Chatkey={to.email}contact={to}/>

</div>

)

}

constcontacts = \[\
\
{name:'Taylor',email:'taylor@mail.com'},\
\
{name:'Alice',email:'alice@mail.com'},\
\
{name:'Bob',email:'bob@mail.com'}\
\
\];

Sandpack Preview

[Open on CodeSandboxOpen Sandbox](https://codesandbox.io/api/v1/sandboxes/define?undefined&environment=create-react-app "Open in CodeSandbox")

Show more

## Ready to learn this topic?

Read **[Preserving and Resetting State](https://react.dev/learn/preserving-and-resetting-state)** to learn the lifetime of state and how to control it.

[Read More](https://react.dev/learn/preserving-and-resetting-state)

* * *

## Extracting state logic into a reducer [Link for Extracting state logic into a reducer ](https://react.dev/learn/managing-state\#extracting-state-logic-into-a-reducer "Link for Extracting state logic into a reducer ")

Components with many state updates spread across many event handlers can get overwhelming. For these cases, you can consolidate all the state update logic outside your component in a single function, called “reducer”. Your event handlers become concise because they only specify the user “actions”. At the bottom of the file, the reducer function specifies how the state should update in response to each action!

App.js

App.js

ReloadClearFork

99

1

2

3

4

5

6

7

8

9

10

11

12

13

14

15

16

17

18

19

20

21

22

23

24

25

26

27

28

29

30

31

32

33

34

35

36

import{useReducer}from'react';

importAddTaskfrom'./AddTask.js';

importTaskListfrom'./TaskList.js';

exportdefaultfunctionTaskApp(){

const\[tasks,dispatch\] = useReducer(

tasksReducer,

initialTasks

);

functionhandleAddTask(text){

dispatch({

type:'added',

id:nextId++,

text:text,

});

}

functionhandleChangeTask(task){

dispatch({

type:'changed',

task:task

});

}

functionhandleDeleteTask(taskId){

dispatch({

type:'deleted',

id:taskId

});

}

return(

<>

<h1>Prague itinerary</h1>

<AddTask

Sandpack Preview

[Open on CodeSandboxOpen Sandbox](https://codesandbox.io/api/v1/sandboxes/define?undefined&environment=create-react-app "Open in CodeSandbox")

Show more

## Ready to learn this topic?

Read **[Extracting State Logic into a Reducer](https://react.dev/learn/extracting-state-logic-into-a-reducer)** to learn how to consolidate logic in the reducer function.

[Read More](https://react.dev/learn/extracting-state-logic-into-a-reducer)

* * *

## Passing data deeply with context [Link for Passing data deeply with context ](https://react.dev/learn/managing-state\#passing-data-deeply-with-context "Link for Passing data deeply with context ")

Usually, you will pass information from a parent component to a child component via props. But passing props can become inconvenient if you need to pass some prop through many components, or if many components need the same information. Context lets the parent component make some information available to any component in the tree below it—no matter how deep it is—without passing it explicitly through props.

Here, the `Heading` component determines its heading level by “asking” the closest `Section` for its level. Each `Section` tracks its own level by asking the parent `Section` and adding one to it. Every `Section` provides information to all components below it without passing props—it does that through context.

App.jsSection.jsHeading.jsLevelContext.js

App.js

ReloadClearFork

99

1

2

3

4

5

6

7

8

9

10

11

12

13

14

15

16

17

18

19

20

21

22

23

24

25

26

importHeadingfrom'./Heading.js';

importSectionfrom'./Section.js';

exportdefaultfunctionPage(){

return(

<Section>

<Heading>Title</Heading>

<Section>

<Heading>Heading</Heading>

<Heading>Heading</Heading>

<Heading>Heading</Heading>

<Section>

<Heading>Sub-heading</Heading>

<Heading>Sub-heading</Heading>

<Heading>Sub-heading</Heading>

<Section>

<Heading>Sub-sub-heading</Heading>

<Heading>Sub-sub-heading</Heading>

<Heading>Sub-sub-heading</Heading>

</Section>

</Section>

</Section>

</Section>

);

}

Sandpack Preview

[Open on CodeSandboxOpen Sandbox](https://codesandbox.io/api/v1/sandboxes/define?undefined&environment=create-react-app "Open in CodeSandbox")

Show more

## Ready to learn this topic?

Read **[Passing Data Deeply with Context](https://react.dev/learn/passing-data-deeply-with-context)** to learn about using context as an alternative to passing props.

[Read More](https://react.dev/learn/passing-data-deeply-with-context)

* * *

## Scaling up with reducer and context [Link for Scaling up with reducer and context ](https://react.dev/learn/managing-state\#scaling-up-with-reducer-and-context "Link for Scaling up with reducer and context ")

Reducers let you consolidate a component’s state update logic. Context lets you pass information deep down to other components. You can combine reducers and context together to manage state of a complex screen.

With this approach, a parent component with complex state manages it with a reducer. Other components anywhere deep in the tree can read its state via context. They can also dispatch actions to update that state.

App.jsTasksContext.jsAddTask.jsTaskList.js

App.js

ReloadClearFork

99

1

2

3

4

5

6

7

8

9

10

11

12

13

14

importAddTaskfrom'./AddTask.js';

importTaskListfrom'./TaskList.js';

import{TasksProvider}from'./TasksContext.js';

exportdefaultfunctionTaskApp(){

return(

<TasksProvider>

<h1>Day off in Kyoto</h1>

<AddTask/>

<TaskList/>

</TasksProvider>

);

}

Sandpack Preview

[Open on CodeSandboxOpen Sandbox](https://codesandbox.io/api/v1/sandboxes/define?undefined&environment=create-react-app "Open in CodeSandbox")

## Ready to learn this topic?

Read **[Scaling Up with Reducer and Context](https://react.dev/learn/scaling-up-with-reducer-and-context)** to learn how state management scales in a growing app.

[Read More](https://react.dev/learn/scaling-up-with-reducer-and-context)

* * *

## What’s next? [Link for What’s next? ](https://react.dev/learn/managing-state\#whats-next "Link for What’s next? ")

Head over to [Reacting to Input with State](https://react.dev/learn/reacting-to-input-with-state) to start reading this chapter page by page!

Or, if you’re already familiar with these topics, why not read about [Escape Hatches](https://react.dev/learn/escape-hatches)?

[PreviousUpdating Arrays in State](https://react.dev/learn/updating-arrays-in-state) [NextReacting to Input with State](https://react.dev/learn/reacting-to-input-with-state)

* * *