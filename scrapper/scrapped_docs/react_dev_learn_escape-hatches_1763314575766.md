[Learn React](https://react.dev/learn)

# Escape Hatches [Link for this heading](https://react.dev/learn/escape-hatches\#undefined "Link for this heading")

Advanced

Some of your components may need to control and synchronize with systems outside of React. For example, you might need to focus an input using the browser API, play and pause a video player implemented without React, or connect and listen to messages from a remote server. In this chapter, you’ll learn the escape hatches that let you “step outside” React and connect to external systems. Most of your application logic and data flow should not rely on these features.

### In this chapter

- [How to “remember” information without re-rendering](https://react.dev/learn/referencing-values-with-refs)
- [How to access DOM elements managed by React](https://react.dev/learn/manipulating-the-dom-with-refs)
- [How to synchronize components with external systems](https://react.dev/learn/synchronizing-with-effects)
- [How to remove unnecessary Effects from your components](https://react.dev/learn/you-might-not-need-an-effect)
- [How an Effect’s lifecycle is different from a component’s](https://react.dev/learn/lifecycle-of-reactive-effects)
- [How to prevent some values from re-triggering Effects](https://react.dev/learn/separating-events-from-effects)
- [How to make your Effect re-run less often](https://react.dev/learn/removing-effect-dependencies)
- [How to share logic between components](https://react.dev/learn/reusing-logic-with-custom-hooks)

## Referencing values with refs [Link for Referencing values with refs ](https://react.dev/learn/escape-hatches\#referencing-values-with-refs "Link for Referencing values with refs ")

When you want a component to “remember” some information, but you don’t want that information to [trigger new renders](https://react.dev/learn/render-and-commit), you can use a _ref_:

```
const ref = useRef(0);
```

Like state, refs are retained by React between re-renders. However, setting state re-renders a component. Changing a ref does not! You can access the current value of that ref through the `ref.current` property.

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

import{useRef}from'react';

exportdefaultfunctionCounter(){

letref = useRef(0);

functionhandleClick(){

ref.current = ref.current \+ 1;

alert('You clicked ' \+ ref.current \+ ' times!');

}

return(

<buttononClick={handleClick}>

Click me!

</button>

);

}

Sandpack Preview

Click me!

Show more

A ref is like a secret pocket of your component that React doesn’t track. For example, you can use refs to store [timeout IDs](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout#return_value), [DOM elements](https://developer.mozilla.org/en-US/docs/Web/API/Element), and other objects that don’t impact the component’s rendering output.

## Ready to learn this topic?

Read **[Referencing Values with Refs](https://react.dev/learn/referencing-values-with-refs)** to learn how to use refs to remember information.

[Read More](https://react.dev/learn/referencing-values-with-refs)

* * *

## Manipulating the DOM with refs [Link for Manipulating the DOM with refs ](https://react.dev/learn/escape-hatches\#manipulating-the-dom-with-refs "Link for Manipulating the DOM with refs ")

React automatically updates the DOM to match your render output, so your components won’t often need to manipulate it. However, sometimes you might need access to the DOM elements managed by React—for example, to focus a node, scroll to it, or measure its size and position. There is no built-in way to do those things in React, so you will need a ref to the DOM node. For example, clicking the button will focus the input using a ref:

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

import{useRef}from'react';

exportdefaultfunctionForm(){

constinputRef = useRef(null);

functionhandleClick(){

inputRef.current.focus();

}

return(

<>

<inputref={inputRef}/>

<buttononClick={handleClick}>

Focus the input

</button>

</>

);

}

Sandpack Preview

Focus the input

Show more

## Ready to learn this topic?

Read **[Manipulating the DOM with Refs](https://react.dev/learn/manipulating-the-dom-with-refs)** to learn how to access DOM elements managed by React.

[Read More](https://react.dev/learn/manipulating-the-dom-with-refs)

* * *

## Synchronizing with Effects [Link for Synchronizing with Effects ](https://react.dev/learn/escape-hatches\#synchronizing-with-effects "Link for Synchronizing with Effects ")

Some components need to synchronize with external systems. For example, you might want to control a non-React component based on the React state, set up a server connection, or send an analytics log when a component appears on the screen. Unlike event handlers, which let you handle particular events, _Effects_ let you run some code after rendering. Use them to synchronize your component with a system outside of React.

Press Play/Pause a few times and see how the video player stays synchronized to the `isPlaying` prop value:

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

import{useState,useRef,useEffect}from'react';

functionVideoPlayer({src,isPlaying}){

constref = useRef(null);

useEffect(()=>{

if(isPlaying){

ref.current.play();

}else{

ref.current.pause();

}

},\[isPlaying\]);

return<videoref={ref}src={src}loopplaysInline/>;

}

exportdefaultfunctionApp(){

const\[isPlaying,setIsPlaying\] = useState(false);

return(

<>

<buttononClick={()=>setIsPlaying(!isPlaying)}>

{isPlaying ? 'Pause' : 'Play'}

</button>

<VideoPlayer

isPlaying={isPlaying}

src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"

/>

</>

);

}

Sandpack Preview

Show more

Many Effects also “clean up” after themselves. For example, an Effect that sets up a connection to a chat server should return a _cleanup function_ that tells React how to disconnect your component from that server:

App.jschat.js

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

import{useState,useEffect}from'react';

import{createConnection}from'./chat.js';

exportdefaultfunctionChatRoom(){

useEffect(()=>{

constconnection = createConnection();

connection.connect();

return()=>connection.disconnect();

},\[\]);

return<h1>Welcome to the chat!</h1>;

}

Sandpack Preview

[Open on CodeSandboxOpen Sandbox](https://codesandbox.io/api/v1/sandboxes/define?undefined&environment=create-react-app "Open in CodeSandbox")

In development, React will immediately run and clean up your Effect one extra time. This is why you see `"✅ Connecting..."` printed twice. This ensures that you don’t forget to implement the cleanup function.

## Ready to learn this topic?

Read **[Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects)** to learn how to synchronize components with external systems.

[Read More](https://react.dev/learn/synchronizing-with-effects)

* * *

## You Might Not Need An Effect [Link for You Might Not Need An Effect ](https://react.dev/learn/escape-hatches\#you-might-not-need-an-effect "Link for You Might Not Need An Effect ")

Effects are an escape hatch from the React paradigm. They let you “step outside” of React and synchronize your components with some external system. If there is no external system involved (for example, if you want to update a component’s state when some props or state change), you shouldn’t need an Effect. Removing unnecessary Effects will make your code easier to follow, faster to run, and less error-prone.

There are two common cases in which you don’t need Effects:

- **You don’t need Effects to transform data for rendering.**
- **You don’t need Effects to handle user events.**

For example, you don’t need an Effect to adjust some state based on other state:

```
function Form() {

  const [firstName, setFirstName] = useState('Taylor');

  const [lastName, setLastName] = useState('Swift');

  // 🔴 Avoid: redundant state and unnecessary Effect

  const [fullName, setFullName] = useState('');

  useEffect(() => {

    setFullName(firstName + ' ' + lastName);

  }, [firstName, lastName]);

  // ...

}
```

Instead, calculate as much as you can while rendering:

```
function Form() {

  const [firstName, setFirstName] = useState('Taylor');

  const [lastName, setLastName] = useState('Swift');

  // ✅ Good: calculated during rendering

  const fullName = firstName + ' ' + lastName;

  // ...

}
```

However, you _do_ need Effects to synchronize with external systems.

## Ready to learn this topic?

Read **[You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)** to learn how to remove unnecessary Effects.

[Read More](https://react.dev/learn/you-might-not-need-an-effect)

* * *

## Lifecycle of reactive effects [Link for Lifecycle of reactive effects ](https://react.dev/learn/escape-hatches\#lifecycle-of-reactive-effects "Link for Lifecycle of reactive effects ")

Effects have a different lifecycle from components. Components may mount, update, or unmount. An Effect can only do two things: to start synchronizing something, and later to stop synchronizing it. This cycle can happen multiple times if your Effect depends on props and state that change over time.

This Effect depends on the value of the `roomId` prop. Props are _reactive values,_ which means they can change on a re-render. Notice that the Effect _re-synchronizes_ (and re-connects to the server) if `roomId` changes:

App.jschat.js

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

import{useState,useEffect}from'react';

import{createConnection}from'./chat.js';

constserverUrl = 'https://localhost:1234';

functionChatRoom({roomId}){

useEffect(()=>{

constconnection = createConnection(serverUrl,roomId);

connection.connect();

return()=>connection.disconnect();

},\[roomId\]);

return<h1>Welcome to the {roomId} room!</h1>;

}

exportdefaultfunctionApp(){

const\[roomId,setRoomId\] = useState('general');

return(

<>

<label>

Choose the chat room:{' '}

<select

value={roomId}

onChange={e=>setRoomId(e.target.value)}

>

<optionvalue="general">general</option>

<optionvalue="travel">travel</option>

<optionvalue="music">music</option>

</select>

</label>

<hr/>

<ChatRoomroomId={roomId}/>

</>

);

}

Sandpack Preview

Console (3)

✅ Connecting to "general" room at https://localhost:1234...

❌ Disconnected from "general" room at https://localhost:1234

✅ Connecting to "general" room at https://localhost:1234...

Show more

React provides a linter rule to check that you’ve specified your Effect’s dependencies correctly. If you forget to specify `roomId` in the list of dependencies in the above example, the linter will find that bug automatically.

## Ready to learn this topic?

Read **[Lifecycle of Reactive Events](https://react.dev/learn/lifecycle-of-reactive-effects)** to learn how an Effect’s lifecycle is different from a component’s.

[Read More](https://react.dev/learn/lifecycle-of-reactive-effects)

* * *

## Separating events from Effects [Link for Separating events from Effects ](https://react.dev/learn/escape-hatches\#separating-events-from-effects "Link for Separating events from Effects ")

Event handlers only re-run when you perform the same interaction again. Unlike event handlers, Effects re-synchronize if any of the values they read, like props or state, are different than during last render. Sometimes, you want a mix of both behaviors: an Effect that re-runs in response to some values but not others.

All code inside Effects is _reactive._ It will run again if some reactive value it reads has changed due to a re-render. For example, this Effect will re-connect to the chat if either `roomId` or `theme` have changed:

App.jschat.jsnotifications.js

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

import{useState,useEffect}from'react';

import{createConnection,sendMessage}from'./chat.js';

import{showNotification}from'./notifications.js';

constserverUrl = 'https://localhost:1234';

functionChatRoom({roomId,theme}){

useEffect(()=>{

constconnection = createConnection(serverUrl,roomId);

connection.on('connected',()=>{

showNotification('Connected!',theme);

});

connection.connect();

return()=>connection.disconnect();

},\[roomId,theme\]);

return<h1>Welcome to the {roomId} room!</h1>

}

exportdefaultfunctionApp(){

const\[roomId,setRoomId\] = useState('general');

const\[isDark,setIsDark\] = useState(false);

return(

<>

<label>

Choose the chat room:{' '}

<select

value={roomId}

onChange={e=>setRoomId(e.target.value)}

>

<optionvalue="general">general</option>

<optionvalue="travel">travel</option>

<optionvalue="music">music</option>

</select>

</label>

<label>

Sandpack Preview

[Open on CodeSandboxOpen Sandbox](https://codesandbox.io/api/v1/sandboxes/define?undefined&environment=create-react-app "Open in CodeSandbox")

Show more

This is not ideal. You want to re-connect to the chat only if the `roomId` has changed. Switching the `theme` shouldn’t re-connect to the chat! Move the code reading `theme` out of your Effect into an _Effect Event_:

App.jschat.js

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

import{useState,useEffect}from'react';

import{useEffectEvent}from'react';

import{createConnection,sendMessage}from'./chat.js';

import{showNotification}from'./notifications.js';

constserverUrl = 'https://localhost:1234';

functionChatRoom({roomId,theme}){

constonConnected = useEffectEvent(()=>{

showNotification('Connected!',theme);

});

useEffect(()=>{

constconnection = createConnection(serverUrl,roomId);

connection.on('connected',()=>{

onConnected();

});

connection.connect();

return()=>connection.disconnect();

},\[roomId\]);

return<h1>Welcome to the {roomId} room!</h1>

}

exportdefaultfunctionApp(){

const\[roomId,setRoomId\] = useState('general');

const\[isDark,setIsDark\] = useState(false);

return(

<>

<label>

Choose the chat room:{' '}

<select

value={roomId}

onChange={e=>setRoomId(e.target.value)}

>

<optionvalue="general">general</option>

Sandpack Preview

[Open on CodeSandboxOpen Sandbox](https://codesandbox.io/api/v1/sandboxes/define?undefined&environment=create-react-app "Open in CodeSandbox")

Show more

Code inside Effect Events isn’t reactive, so changing the `theme` no longer makes your Effect re-connect.

## Ready to learn this topic?

Read **[Separating Events from Effects](https://react.dev/learn/separating-events-from-effects)** to learn how to prevent some values from re-triggering Effects.

[Read More](https://react.dev/learn/separating-events-from-effects)

* * *

## Removing Effect dependencies [Link for Removing Effect dependencies ](https://react.dev/learn/escape-hatches\#removing-effect-dependencies "Link for Removing Effect dependencies ")

When you write an Effect, the linter will verify that you’ve included every reactive value (like props and state) that the Effect reads in the list of your Effect’s dependencies. This ensures that your Effect remains synchronized with the latest props and state of your component. Unnecessary dependencies may cause your Effect to run too often, or even create an infinite loop. The way you remove them depends on the case.

For example, this Effect depends on the `options` object which gets re-created every time you edit the input:

App.jschat.js

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

import{useState,useEffect}from'react';

import{createConnection}from'./chat.js';

constserverUrl = 'https://localhost:1234';

functionChatRoom({roomId}){

const\[message,setMessage\] = useState('');

constoptions = {

serverUrl:serverUrl,

roomId:roomId

};

useEffect(()=>{

constconnection = createConnection(options);

connection.connect();

return()=>connection.disconnect();

},\[options\]);

return(

<>

<h1>Welcome to the {roomId} room!</h1>

<inputvalue={message}onChange={e=>setMessage(e.target.value)}/>

</>

);

}

exportdefaultfunctionApp(){

const\[roomId,setRoomId\] = useState('general');

return(

<>

<label>

Choose the chat room:{' '}

<select

value={roomId}

onChange={e=>setRoomId(e.target.value)}

Sandpack Preview

## Lint Error

```
9:9 - The 'options' object makes the dependencies of useEffect Hook (at line 18) change on every render. Move it inside the useEffect callback. Alternatively, wrap the initialization of 'options' in its own useMemo() Hook.
```

[Open on CodeSandboxOpen Sandbox](https://codesandbox.io/api/v1/sandboxes/define?undefined&environment=create-react-app "Open in CodeSandbox")

Show more

You don’t want the chat to re-connect every time you start typing a message in that chat. To fix this problem, move creation of the `options` object inside the Effect so that the Effect only depends on the `roomId` string:

App.jschat.js

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

import{useState,useEffect}from'react';

import{createConnection}from'./chat.js';

constserverUrl = 'https://localhost:1234';

functionChatRoom({roomId}){

const\[message,setMessage\] = useState('');

useEffect(()=>{

constoptions = {

serverUrl:serverUrl,

roomId:roomId

};

constconnection = createConnection(options);

connection.connect();

return()=>connection.disconnect();

},\[roomId\]);

return(

<>

<h1>Welcome to the {roomId} room!</h1>

<inputvalue={message}onChange={e=>setMessage(e.target.value)}/>

</>

);

}

exportdefaultfunctionApp(){

const\[roomId,setRoomId\] = useState('general');

return(

<>

<label>

Choose the chat room:{' '}

<select

value={roomId}

onChange={e=>setRoomId(e.target.value)}

>

Sandpack Preview

Show more

Notice that you didn’t start by editing the dependency list to remove the `options` dependency. That would be wrong. Instead, you changed the surrounding code so that the dependency became _unnecessary._ Think of the dependency list as a list of all the reactive values used by your Effect’s code. You don’t intentionally choose what to put on that list. The list describes your code. To change the dependency list, change the code.

## Ready to learn this topic?

Read **[Removing Effect Dependencies](https://react.dev/learn/removing-effect-dependencies)** to learn how to make your Effect re-run less often.

[Read More](https://react.dev/learn/removing-effect-dependencies)

* * *

## Reusing logic with custom Hooks [Link for Reusing logic with custom Hooks ](https://react.dev/learn/escape-hatches\#reusing-logic-with-custom-hooks "Link for Reusing logic with custom Hooks ")

React comes with built-in Hooks like `useState`, `useContext`, and `useEffect`. Sometimes, you’ll wish that there was a Hook for some more specific purpose: for example, to fetch data, to keep track of whether the user is online, or to connect to a chat room. To do this, you can create your own Hooks for your application’s needs.

In this example, the `usePointerPosition` custom Hook tracks the cursor position, while `useDelayedValue` custom Hook returns a value that’s “lagging behind” the value you passed by a certain number of milliseconds. Move the cursor over the sandbox preview area to see a moving trail of dots following the cursor:

App.jsusePointerPosition.jsuseDelayedValue.js

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

import{usePointerPosition}from'./usePointerPosition.js';

import{useDelayedValue}from'./useDelayedValue.js';

exportdefaultfunctionCanvas(){

constpos1 = usePointerPosition();

constpos2 = useDelayedValue(pos1,100);

constpos3 = useDelayedValue(pos2,200);

constpos4 = useDelayedValue(pos3,100);

constpos5 = useDelayedValue(pos4,50);

return(

<>

<Dotposition={pos1}opacity={1}/>

<Dotposition={pos2}opacity={0.8}/>

<Dotposition={pos3}opacity={0.6}/>

<Dotposition={pos4}opacity={0.4}/>

<Dotposition={pos5}opacity={0.2}/>

</>

);

}

functionDot({position,opacity}){

return(

<divstyle={{

position:'absolute',

backgroundColor:'pink',

borderRadius:'50%',

opacity,

transform:\`translate(${position.x}px, ${position.y}px)\`,

pointerEvents:'none',

left: -20,

top: -20,

width:40,

height:40,

}}/>

);

}

Sandpack Preview

Show more

You can create custom Hooks, compose them together, pass data between them, and reuse them between components. As your app grows, you will write fewer Effects by hand because you’ll be able to reuse custom Hooks you already wrote. There are also many excellent custom Hooks maintained by the React community.

## Ready to learn this topic?

Read **[Reusing Logic with Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)** to learn how to share logic between components.

[Read More](https://react.dev/learn/reusing-logic-with-custom-hooks)

* * *

## What’s next? [Link for What’s next? ](https://react.dev/learn/escape-hatches\#whats-next "Link for What’s next? ")

Head over to [Referencing Values with Refs](https://react.dev/learn/referencing-values-with-refs) to start reading this chapter page by page!

[PreviousScaling Up with Reducer and Context](https://react.dev/learn/scaling-up-with-reducer-and-context) [NextReferencing Values with Refs](https://react.dev/learn/referencing-values-with-refs)

* * *