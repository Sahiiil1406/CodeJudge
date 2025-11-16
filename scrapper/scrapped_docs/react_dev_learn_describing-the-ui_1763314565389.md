[Learn React](https://react.dev/learn)

# Describing the UI [Link for this heading](https://react.dev/learn/describing-the-ui\#undefined "Link for this heading")

React is a JavaScript library for rendering user interfaces (UI). UI is built from small units like buttons, text, and images. React lets you combine them into reusable, nestable _components._ From web sites to phone apps, everything on the screen can be broken down into components. In this chapter, you’ll learn to create, customize, and conditionally display React components.

### In this chapter

- [How to write your first React component](https://react.dev/learn/your-first-component)
- [When and how to create multi-component files](https://react.dev/learn/importing-and-exporting-components)
- [How to add markup to JavaScript with JSX](https://react.dev/learn/writing-markup-with-jsx)
- [How to use curly braces with JSX to access JavaScript functionality from your components](https://react.dev/learn/javascript-in-jsx-with-curly-braces)
- [How to configure components with props](https://react.dev/learn/passing-props-to-a-component)
- [How to conditionally render components](https://react.dev/learn/conditional-rendering)
- [How to render multiple components at a time](https://react.dev/learn/rendering-lists)
- [How to avoid confusing bugs by keeping components pure](https://react.dev/learn/keeping-components-pure)
- [Why understanding your UI as trees is useful](https://react.dev/learn/understanding-your-ui-as-a-tree)

## Your first component [Link for Your first component ](https://react.dev/learn/describing-the-ui\#your-first-component "Link for Your first component ")

React applications are built from isolated pieces of UI called _components_. A React component is a JavaScript function that you can sprinkle with markup. Components can be as small as a button, or as large as an entire page. Here is a `Gallery` component rendering three `Profile` components:

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

functionProfile(){

return(

<img

src="https://i.imgur.com/MK3eW3As.jpg"

alt="Katherine Johnson"

/>

);

}

exportdefaultfunctionGallery(){

return(

<section>

<h1>Amazing scientists</h1>

<Profile/>

<Profile/>

<Profile/>

</section>

);

}

Sandpack Preview

# Amazing scientists

![Katherine Johnson](https://i.imgur.com/MK3eW3As.jpg)![Katherine Johnson](https://i.imgur.com/MK3eW3As.jpg)![Katherine Johnson](https://i.imgur.com/MK3eW3As.jpg)

Show more

## Ready to learn this topic?

Read **[Your First Component](https://react.dev/learn/your-first-component)** to learn how to declare and use React components.

[Read More](https://react.dev/learn/your-first-component)

* * *

## Importing and exporting components [Link for Importing and exporting components ](https://react.dev/learn/describing-the-ui\#importing-and-exporting-components "Link for Importing and exporting components ")

You can declare many components in one file, but large files can get difficult to navigate. To solve this, you can _export_ a component into its own file, and then _import_ that component from another file:

Gallery.jsProfile.js

Gallery.js

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

importProfilefrom'./Profile.js';

exportdefaultfunctionGallery(){

return(

<section>

<h1>Amazing scientists</h1>

<Profile/>

<Profile/>

<Profile/>

</section>

);

}

Sandpack Preview

# Amazing scientists

![Alan L. Hart](https://i.imgur.com/QIrZWGIs.jpg)![Alan L. Hart](https://i.imgur.com/QIrZWGIs.jpg)![Alan L. Hart](https://i.imgur.com/QIrZWGIs.jpg)

## Ready to learn this topic?

Read **[Importing and Exporting Components](https://react.dev/learn/importing-and-exporting-components)** to learn how to split components into their own files.

[Read More](https://react.dev/learn/importing-and-exporting-components)

* * *

## Writing markup with JSX [Link for Writing markup with JSX ](https://react.dev/learn/describing-the-ui\#writing-markup-with-jsx "Link for Writing markup with JSX ")

Each React component is a JavaScript function that may contain some markup that React renders into the browser. React components use a syntax extension called JSX to represent that markup. JSX looks a lot like HTML, but it is a bit stricter and can display dynamic information.

If we paste existing HTML markup into a React component, it won’t always work:

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

exportdefaultfunctionTodoList(){

return(

// This doesn't quite work!

<h1>Hedy Lamarr's Todos</h1>

<img

src="https://i.imgur.com/yXOvdOSs.jpg"

alt="Hedy Lamarr"

class="photo"

>

<ul>

<li>Invent new traffic lights

<li>Rehearse a movie scene

<li>Improve spectrum technology

</ul>

);

}

Sandpack Preview

## Error

```
/src/App.js: Adjacent JSX elements must be wrapped in an enclosing tag. Did you want a JSX fragment <>...</>? (5:4)

  3 |     // This doesn't quite work!
  4 |     <h1>Hedy Lamarr's Todos</h1>
> 5 |     <img
    |     ^
  6 |       src="https://i.imgur.com/yXOvdOSs.jpg"
  7 |       alt="Hedy Lamarr"
  8 |       class="photo"
```

Show more

If you have existing HTML like this, you can fix it using a [converter](https://transform.tools/html-to-jsx):

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

exportdefaultfunctionTodoList(){

return(

<>

<h1>Hedy Lamarr's Todos</h1>

<img

src="https://i.imgur.com/yXOvdOSs.jpg"

alt="Hedy Lamarr"

className="photo"

/>

<ul>

<li>Invent new traffic lights</li>

<li>Rehearse a movie scene</li>

<li>Improve spectrum technology</li>

</ul>

</>

);

}

Sandpack Preview

Show more

## Ready to learn this topic?

Read **[Writing Markup with JSX](https://react.dev/learn/writing-markup-with-jsx)** to learn how to write valid JSX.

[Read More](https://react.dev/learn/writing-markup-with-jsx)

* * *

## JavaScript in JSX with curly braces [Link for JavaScript in JSX with curly braces ](https://react.dev/learn/describing-the-ui\#javascript-in-jsx-with-curly-braces "Link for JavaScript in JSX with curly braces ")

JSX lets you write HTML-like markup inside a JavaScript file, keeping rendering logic and content in the same place. Sometimes you will want to add a little JavaScript logic or reference a dynamic property inside that markup. In this situation, you can use curly braces in your JSX to “open a window” to JavaScript:

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

constperson = {

name:'Gregorio Y. Zara',

theme:{

backgroundColor:'black',

color:'pink'

}

};

exportdefaultfunctionTodoList(){

return(

<divstyle={person.theme}>

<h1>{person.name}'s Todos</h1>

<img

className="avatar"

src="https://i.imgur.com/7vQD0fPs.jpg"

alt="Gregorio Y. Zara"

/>

<ul>

<li>Improve the videophone</li>

<li>Prepare aeronautics lectures</li>

<li>Work on the alcohol-fuelled engine</li>

</ul>

</div>

);

}

Sandpack Preview

[Open on CodeSandboxOpen Sandbox](https://codesandbox.io/api/v1/sandboxes/define?undefined&environment=create-react-app "Open in CodeSandbox")

Show more

## Ready to learn this topic?

Read **[JavaScript in JSX with Curly Braces](https://react.dev/learn/javascript-in-jsx-with-curly-braces)** to learn how to access JavaScript data from JSX.

[Read More](https://react.dev/learn/javascript-in-jsx-with-curly-braces)

* * *

## Passing props to a component [Link for Passing props to a component ](https://react.dev/learn/describing-the-ui\#passing-props-to-a-component "Link for Passing props to a component ")

React components use _props_ to communicate with each other. Every parent component can pass some information to its child components by giving them props. Props might remind you of HTML attributes, but you can pass any JavaScript value through them, including objects, arrays, functions, and even JSX!

App.jsutils.js

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

import{getImageUrl}from'./utils.js'

exportdefaultfunctionProfile(){

return(

<Card>

<Avatar

size={100}

person={{

name:'Katsuko Saruhashi',

imageId:'YfeOqp2'

}}

/>

</Card>

);

}

functionAvatar({person,size}){

return(

<img

className="avatar"

src={getImageUrl(person)}

alt={person.name}

width={size}

height={size}

/>

);

}

functionCard({children}){

return(

<divclassName="card">

{children}

</div>

);

}

Sandpack Preview

[Open on CodeSandboxOpen Sandbox](https://codesandbox.io/api/v1/sandboxes/define?undefined&environment=create-react-app "Open in CodeSandbox")

Show more

## Ready to learn this topic?

Read **[Passing Props to a Component](https://react.dev/learn/passing-props-to-a-component)** to learn how to pass and read props.

[Read More](https://react.dev/learn/passing-props-to-a-component)

* * *

## Conditional rendering [Link for Conditional rendering ](https://react.dev/learn/describing-the-ui\#conditional-rendering "Link for Conditional rendering ")

Your components will often need to display different things depending on different conditions. In React, you can conditionally render JSX using JavaScript syntax like `if` statements, `&&`, and `? :` operators.

In this example, the JavaScript `&&` operator is used to conditionally render a checkmark:

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

functionItem({name,isPacked}){

return(

<liclassName="item">

{name}{isPacked && '✅'}

</li>

);

}

exportdefaultfunctionPackingList(){

return(

<section>

<h1>Sally Ride's Packing List</h1>

<ul>

<Item

isPacked={true}

name="Space suit"

/>

<Item

isPacked={true}

name="Helmet with a golden leaf"

/>

<Item

isPacked={false}

name="Photo of Tam"

/>

</ul>

</section>

);

}

Sandpack Preview

Show more

## Ready to learn this topic?

Read **[Conditional Rendering](https://react.dev/learn/conditional-rendering)** to learn the different ways to render content conditionally.

[Read More](https://react.dev/learn/conditional-rendering)

* * *

## Rendering lists [Link for Rendering lists ](https://react.dev/learn/describing-the-ui\#rendering-lists "Link for Rendering lists ")

You will often want to display multiple similar components from a collection of data. You can use JavaScript’s `filter()` and `map()` with React to filter and transform your array of data into an array of components.

For each array item, you will need to specify a `key`. Usually, you will want to use an ID from the database as a `key`. Keys let React keep track of each item’s place in the list even if the list changes.

App.jsdata.jsutils.js

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

import{people}from'./data.js';

import{getImageUrl}from'./utils.js';

exportdefaultfunctionList(){

constlistItems = people.map(person=>

<likey={person.id}>

<img

src={getImageUrl(person)}

alt={person.name}

/>

<p>

<b>{person.name}:</b>

{' ' \+ person.profession \+ ' '}

known for {person.accomplishment}

</p>

</li>

);

return(

<article>

<h1>Scientists</h1>

<ul>{listItems}</ul>

</article>

);

}

Sandpack Preview

[Open on CodeSandboxOpen Sandbox](https://codesandbox.io/api/v1/sandboxes/define?undefined&environment=create-react-app "Open in CodeSandbox")

Show more

## Ready to learn this topic?

Read **[Rendering Lists](https://react.dev/learn/rendering-lists)** to learn how to render a list of components, and how to choose a key.

[Read More](https://react.dev/learn/rendering-lists)

* * *

## Keeping components pure [Link for Keeping components pure ](https://react.dev/learn/describing-the-ui\#keeping-components-pure "Link for Keeping components pure ")

Some JavaScript functions are _pure._ A pure function:

- **Minds its own business.** It does not change any objects or variables that existed before it was called.
- **Same inputs, same output.** Given the same inputs, a pure function should always return the same result.

By strictly only writing your components as pure functions, you can avoid an entire class of baffling bugs and unpredictable behavior as your codebase grows. Here is an example of an impure component:

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

letguest = 0;

functionCup(){

// Bad: changing a preexisting variable!

guest = guest \+ 1;

return<h2>Tea cup for guest #{guest}</h2>;

}

exportdefaultfunctionTeaSet(){

return(

<>

<Cup/>

<Cup/>

<Cup/>

</>

);

}

Sandpack Preview

[Open on CodeSandboxOpen Sandbox](https://codesandbox.io/api/v1/sandboxes/define?undefined&environment=create-react-app "Open in CodeSandbox")

Show more

You can make this component pure by passing a prop instead of modifying a preexisting variable:

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

functionCup({guest}){

return<h2>Tea cup for guest #{guest}</h2>;

}

exportdefaultfunctionTeaSet(){

return(

<>

<Cupguest={1}/>

<Cupguest={2}/>

<Cupguest={3}/>

</>

);

}

Sandpack Preview

## Ready to learn this topic?

Read **[Keeping Components Pure](https://react.dev/learn/keeping-components-pure)** to learn how to write components as pure, predictable functions.

[Read More](https://react.dev/learn/keeping-components-pure)

* * *

## Your UI as a tree [Link for Your UI as a tree ](https://react.dev/learn/describing-the-ui\#your-ui-as-a-tree "Link for Your UI as a tree ")

React uses trees to model the relationships between components and modules.

A React render tree is a representation of the parent and child relationship between components.

![A tree graph with five nodes, with each node representing a component. The root node is located at the top the tree graph and is labelled 'Root Component'. It has two arrows extending down to two nodes labelled 'Component A' and 'Component C'. Each of the arrows is labelled with 'renders'. 'Component A' has a single 'renders' arrow to a node labelled 'Component B'. 'Component C' has a single 'renders' arrow to a node labelled 'Component D'.](https://react.dev/_next/image?url=%2Fimages%2Fdocs%2Fdiagrams%2Fgeneric_render_tree.dark.png&w=1080&q=75)

![A tree graph with five nodes, with each node representing a component. The root node is located at the top the tree graph and is labelled 'Root Component'. It has two arrows extending down to two nodes labelled 'Component A' and 'Component C'. Each of the arrows is labelled with 'renders'. 'Component A' has a single 'renders' arrow to a node labelled 'Component B'. 'Component C' has a single 'renders' arrow to a node labelled 'Component D'.](https://react.dev/_next/image?url=%2Fimages%2Fdocs%2Fdiagrams%2Fgeneric_render_tree.png&w=1080&q=75)

An example React render tree.

Components near the top of the tree, near the root component, are considered top-level components. Components with no child components are leaf components. This categorization of components is useful for understanding data flow and rendering performance.

Modelling the relationship between JavaScript modules is another useful way to understand your app. We refer to it as a module dependency tree.

![A tree graph with five nodes. Each node represents a JavaScript module. The top-most node is labelled 'RootModule.js'. It has three arrows extending to the nodes: 'ModuleA.js', 'ModuleB.js', and 'ModuleC.js'. Each arrow is labelled as 'imports'. 'ModuleC.js' node has a single 'imports' arrow that points to a node labelled 'ModuleD.js'.](https://react.dev/_next/image?url=%2Fimages%2Fdocs%2Fdiagrams%2Fgeneric_dependency_tree.dark.png&w=1080&q=75)

![A tree graph with five nodes. Each node represents a JavaScript module. The top-most node is labelled 'RootModule.js'. It has three arrows extending to the nodes: 'ModuleA.js', 'ModuleB.js', and 'ModuleC.js'. Each arrow is labelled as 'imports'. 'ModuleC.js' node has a single 'imports' arrow that points to a node labelled 'ModuleD.js'.](https://react.dev/_next/image?url=%2Fimages%2Fdocs%2Fdiagrams%2Fgeneric_dependency_tree.png&w=1080&q=75)

An example module dependency tree.

A dependency tree is often used by build tools to bundle all the relevant JavaScript code for the client to download and render. A large bundle size regresses user experience for React apps. Understanding the module dependency tree is helpful to debug such issues.

## Ready to learn this topic?

Read **[Your UI as a Tree](https://react.dev/learn/understanding-your-ui-as-a-tree)** to learn how to create a render and module dependency trees for a React app and how they’re useful mental models for improving user experience and performance.

[Read More](https://react.dev/learn/understanding-your-ui-as-a-tree)

* * *

## What’s next? [Link for What’s next? ](https://react.dev/learn/describing-the-ui\#whats-next "Link for What’s next? ")

Head over to [Your First Component](https://react.dev/learn/your-first-component) to start reading this chapter page by page!

Or, if you’re already familiar with these topics, why not read about [Adding Interactivity](https://react.dev/learn/adding-interactivity)?

[NextYour First Component](https://react.dev/learn/your-first-component)

* * *