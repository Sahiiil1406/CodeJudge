[Learn React](https://react.dev/learn)

# Adding Interactivity [Link for this heading](https://react.dev/learn/adding-interactivity\#undefined "Link for this heading")

Some things on the screen update in response to user input. For example, clicking an image gallery switches the active image. In React, data that changes over time is called _state._ You can add state to any component, and update it as needed. In this chapter, you’ll learn how to write components that handle interactions, update their state, and display different output over time.

### In this chapter

- [How to handle user-initiated events](https://react.dev/learn/responding-to-events)
- [How to make components “remember” information with state](https://react.dev/learn/state-a-components-memory)
- [How React updates the UI in two phases](https://react.dev/learn/render-and-commit)
- [Why state doesn’t update right after you change it](https://react.dev/learn/state-as-a-snapshot)
- [How to queue multiple state updates](https://react.dev/learn/queueing-a-series-of-state-updates)
- [How to update an object in state](https://react.dev/learn/updating-objects-in-state)
- [How to update an array in state](https://react.dev/learn/updating-arrays-in-state)

## Responding to events [Link for Responding to events ](https://react.dev/learn/adding-interactivity\#responding-to-events "Link for Responding to events ")

React lets you add _event handlers_ to your JSX. Event handlers are your own functions that will be triggered in response to user interactions like clicking, hovering, focusing on form inputs, and so on.

Built-in components like `<button>` only support built-in browser events like `onClick`. However, you can also create your own components, and give their event handler props any application-specific names that you like.

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

exportdefaultfunctionApp(){

return(

<Toolbar

onPlayMovie={()=>alert('Playing!')}

onUploadImage={()=>alert('Uploading!')}

/>

);

}

functionToolbar({onPlayMovie,onUploadImage}){

return(

<div>

<ButtononClick={onPlayMovie}>

Play Movie

</Button>

<ButtononClick={onUploadImage}>

Upload Image

</Button>

</div>

);

}

functionButton({onClick,children}){

return(

<buttononClick={onClick}>

{children}

</button>

);

}

Sandpack Preview

Show more

## Ready to learn this topic?

Read **[Responding to Events](https://react.dev/learn/responding-to-events)** to learn how to add event handlers.

[Read More](https://react.dev/learn/responding-to-events)

* * *

## State: a component’s memory [Link for State: a component’s memory ](https://react.dev/learn/adding-interactivity\#state-a-components-memory "Link for State: a component’s memory ")

Components often need to change what’s on the screen as a result of an interaction. Typing into the form should update the input field, clicking “next” on an image carousel should change which image is displayed, clicking “buy” puts a product in the shopping cart. Components need to “remember” things: the current input value, the current image, the shopping cart. In React, this kind of component-specific memory is called _state._

You can add state to a component with a [`useState`](https://react.dev/reference/react/useState) Hook. _Hooks_ are special functions that let your components use React features (state is one of those features). The `useState` Hook lets you declare a state variable. It takes the initial state and returns a pair of values: the current state, and a state setter function that lets you update it.

```
const [index, setIndex] = useState(0);

const [showMore, setShowMore] = useState(false);
```

Here is how an image gallery uses and updates state on click:

App.jsdata.js

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

import{useState}from'react';

import{sculptureList}from'./data.js';

exportdefaultfunctionGallery(){

const\[index,setIndex\] = useState(0);

const\[showMore,setShowMore\] = useState(false);

consthasNext = index < sculptureList.length \- 1;

functionhandleNextClick(){

if(hasNext){

setIndex(index \+ 1);

}else{

setIndex(0);

}

}

functionhandleMoreClick(){

setShowMore(!showMore);

}

letsculpture = sculptureList\[index\];

return(

<>

<buttononClick={handleNextClick}>

Next

</button>

<h2>

<i>{sculpture.name}</i>

by {sculpture.artist}

</h2>

<h3>

({index \+ 1} of {sculptureList.length})

</h3>

<buttononClick={handleMoreClick}>

{showMore ? 'Hide' : 'Show'} details

</button>

Sandpack Preview

Show more

## Ready to learn this topic?

Read **[State: A Component’s Memory](https://react.dev/learn/state-a-components-memory)** to learn how to remember a value and update it on interaction.

[Read More](https://react.dev/learn/state-a-components-memory)

* * *

## Render and commit [Link for Render and commit ](https://react.dev/learn/adding-interactivity\#render-and-commit "Link for Render and commit ")

Before your components are displayed on the screen, they must be rendered by React. Understanding the steps in this process will help you think about how your code executes and explain its behavior.

Imagine that your components are cooks in the kitchen, assembling tasty dishes from ingredients. In this scenario, React is the waiter who puts in requests from customers and brings them their orders. This process of requesting and serving UI has three steps:

1. **Triggering** a render (delivering the diner’s order to the kitchen)
2. **Rendering** the component (preparing the order in the kitchen)
3. **Committing** to the DOM (placing the order on the table)

1. ![React as a server in a restaurant, fetching orders from the users and delivering them to the Component Kitchen.](https://react.dev/images/docs/illustrations/i_render-and-commit1.png)

Trigger
2. ![The Card Chef gives React a fresh Card component.](https://react.dev/images/docs/illustrations/i_render-and-commit2.png)

Render
3. ![React delivers the Card to the user at their table.](https://react.dev/images/docs/illustrations/i_render-and-commit3.png)

Commit

Illustrated by [Rachel Lee Nabors](https://nearestnabors.com/)

## Ready to learn this topic?

Read **[Render and Commit](https://react.dev/learn/render-and-commit)** to learn the lifecycle of a UI update.

[Read More](https://react.dev/learn/render-and-commit)

* * *

## State as a snapshot [Link for State as a snapshot ](https://react.dev/learn/adding-interactivity\#state-as-a-snapshot "Link for State as a snapshot ")

Unlike regular JavaScript variables, React state behaves more like a snapshot. Setting it does not change the state variable you already have, but instead triggers a re-render. This can be surprising at first!

```
console.log(count);  // 0

setCount(count + 1); // Request a re-render with 1

console.log(count);  // Still 0!
```

This behavior helps you avoid subtle bugs. Here is a little chat app. Try to guess what happens if you press “Send” first and _then_ change the recipient to Bob. Whose name will appear in the `alert` five seconds later?

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

import{useState}from'react';

exportdefaultfunctionForm(){

const\[to,setTo\] = useState('Alice');

const\[message,setMessage\] = useState('Hello');

functionhandleSubmit(e){

e.preventDefault();

setTimeout(()=>{

alert(\`You said ${message} to ${to}\`);

},5000);

}

return(

<formonSubmit={handleSubmit}>

<label>

To:{' '}

<select

value={to}

onChange={e=>setTo(e.target.value)}>

<optionvalue="Alice">Alice</option>

<optionvalue="Bob">Bob</option>

</select>

</label>

<textarea

placeholder="Message"

value={message}

onChange={e=>setMessage(e.target.value)}

/>

<buttontype="submit">Send</button>

</form>

);

}

Sandpack Preview

Show more

## Ready to learn this topic?

Read **[State as a Snapshot](https://react.dev/learn/state-as-a-snapshot)** to learn why state appears “fixed” and unchanging inside the event handlers.

[Read More](https://react.dev/learn/state-as-a-snapshot)

* * *

## Queueing a series of state updates [Link for Queueing a series of state updates ](https://react.dev/learn/adding-interactivity\#queueing-a-series-of-state-updates "Link for Queueing a series of state updates ")

This component is buggy: clicking “+3” increments the score only once.

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

import{useState}from'react';

exportdefaultfunctionCounter(){

const\[score,setScore\] = useState(0);

functionincrement(){

setScore(score \+ 1);

}

return(

<>

<buttononClick={()=>increment()}>+1</button>

<buttononClick={()=>{

increment();

increment();

increment();

}}>+3</button>

<h1>Score: {score}</h1>

</>

)

}

Sandpack Preview

Show more

[State as a Snapshot](https://react.dev/learn/state-as-a-snapshot) explains why this is happening. Setting state requests a new re-render, but does not change it in the already running code. So `score` continues to be `0` right after you call `setScore(score + 1)`.

```
console.log(score);  // 0

setScore(score + 1); // setScore(0 + 1);

console.log(score);  // 0

setScore(score + 1); // setScore(0 + 1);

console.log(score);  // 0

setScore(score + 1); // setScore(0 + 1);

console.log(score);  // 0
```

You can fix this by passing an _updater function_ when setting state. Notice how replacing `setScore(score + 1)` with `setScore(s => s + 1)` fixes the “+3” button. This lets you queue multiple state updates.

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

import{useState}from'react';

exportdefaultfunctionCounter(){

const\[score,setScore\] = useState(0);

functionincrement(){

setScore(s=>s \+ 1);

}

return(

<>

<buttononClick={()=>increment()}>+1</button>

<buttononClick={()=>{

increment();

increment();

increment();

}}>+3</button>

<h1>Score: {score}</h1>

</>

)

}

Sandpack Preview

Show more

## Ready to learn this topic?

Read **[Queueing a Series of State Updates](https://react.dev/learn/queueing-a-series-of-state-updates)** to learn how to queue a sequence of state updates.

[Read More](https://react.dev/learn/queueing-a-series-of-state-updates)

* * *

## Updating objects in state [Link for Updating objects in state ](https://react.dev/learn/adding-interactivity\#updating-objects-in-state "Link for Updating objects in state ")

State can hold any kind of JavaScript value, including objects. But you shouldn’t change objects and arrays that you hold in the React state directly. Instead, when you want to update an object and array, you need to create a new one (or make a copy of an existing one), and then update the state to use that copy.

Usually, you will use the `...` spread syntax to copy objects and arrays that you want to change. For example, updating a nested object could look like this:

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

const\[person,setPerson\] = useState({

name:'Niki de Saint Phalle',

artwork:{

title:'Blue Nana',

city:'Hamburg',

image:'https://i.imgur.com/Sd1AgUOm.jpg',

}

});

functionhandleNameChange(e){

setPerson({

...person,

name:e.target.value

});

}

functionhandleTitleChange(e){

setPerson({

...person,

artwork:{

...person.artwork,

title:e.target.value

}

});

}

functionhandleCityChange(e){

setPerson({

...person,

artwork:{

...person.artwork,

city:e.target.value

}

Sandpack Preview

Show more

If copying objects in code gets tedious, you can use a library like [Immer](https://github.com/immerjs/use-immer) to reduce repetitive code:

package.jsonApp.js

package.json

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

{

"dependencies":{

"immer":"1.7.3",

"react":"latest",

"react-dom":"latest",

"react-scripts":"latest",

"use-immer":"0.5.1"

},

"scripts":{

"start":"react-scripts start",

"build":"react-scripts build",

"test":"react-scripts test --env=jsdom",

"eject":"react-scripts eject"

},

"devDependencies":{}

}

Sandpack Preview

## Ready to learn this topic?

Read **[Updating Objects in State](https://react.dev/learn/updating-objects-in-state)** to learn how to update objects correctly.

[Read More](https://react.dev/learn/updating-objects-in-state)

* * *

## Updating arrays in state [Link for Updating arrays in state ](https://react.dev/learn/adding-interactivity\#updating-arrays-in-state "Link for Updating arrays in state ")

Arrays are another type of mutable JavaScript objects you can store in state and should treat as read-only. Just like with objects, when you want to update an array stored in state, you need to create a new one (or make a copy of an existing one), and then set state to use the new array:

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

constinitialList = \[\
\
{id:0,title:'Big Bellies',seen:false},\
\
{id:1,title:'Lunar Landscape',seen:false},\
\
{id:2,title:'Terracotta Army',seen:true},\
\
\];

exportdefaultfunctionBucketList(){

const\[list,setList\] = useState(

initialList

);

functionhandleToggle(artworkId,nextSeen){

setList(list.map(artwork=>{

if(artwork.id === artworkId){

return{...artwork,seen:nextSeen};

}else{

returnartwork;

}

}));

}

return(

<>

<h1>Art Bucket List</h1>

<h2>My list of art to see:</h2>

<ItemList

artworks={list}

onToggle={handleToggle}/>

</>

);

}

functionItemList({artworks,onToggle}){

return(

Sandpack Preview

Show more

If copying arrays in code gets tedious, you can use a library like [Immer](https://github.com/immerjs/use-immer) to reduce repetitive code:

package.jsonApp.js

package.json

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

{

"dependencies":{

"immer":"1.7.3",

"react":"latest",

"react-dom":"latest",

"react-scripts":"latest",

"use-immer":"0.5.1"

},

"scripts":{

"start":"react-scripts start",

"build":"react-scripts build",

"test":"react-scripts test --env=jsdom",

"eject":"react-scripts eject"

},

"devDependencies":{}

}

Sandpack Preview

## Ready to learn this topic?

Read **[Updating Arrays in State](https://react.dev/learn/updating-arrays-in-state)** to learn how to update arrays correctly.

[Read More](https://react.dev/learn/updating-arrays-in-state)

* * *

## What’s next? [Link for What’s next? ](https://react.dev/learn/adding-interactivity\#whats-next "Link for What’s next? ")

Head over to [Responding to Events](https://react.dev/learn/responding-to-events) to start reading this chapter page by page!

Or, if you’re already familiar with these topics, why not read about [Managing State](https://react.dev/learn/managing-state)?

[PreviousYour UI as a Tree](https://react.dev/learn/understanding-your-ui-as-a-tree) [NextResponding to Events](https://react.dev/learn/responding-to-events)

* * *