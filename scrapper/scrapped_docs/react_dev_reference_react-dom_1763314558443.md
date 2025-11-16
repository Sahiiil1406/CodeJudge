[API Reference](https://react.dev/reference/react)

# React DOM APIs [Link for this heading](https://react.dev/reference/react-dom\#undefined "Link for this heading")

The `react-dom` package contains methods that are only supported for the web applications (which run in the browser DOM environment). They are not supported for React Native.

* * *

## APIs [Link for APIs ](https://react.dev/reference/react-dom\#apis "Link for APIs ")

These APIs can be imported from your components. They are rarely used:

- [`createPortal`](https://react.dev/reference/react-dom/createPortal) lets you render child components in a different part of the DOM tree.
- [`flushSync`](https://react.dev/reference/react-dom/flushSync) lets you force React to flush a state update and update the DOM synchronously.

## Resource Preloading APIs [Link for Resource Preloading APIs ](https://react.dev/reference/react-dom\#resource-preloading-apis "Link for Resource Preloading APIs ")

These APIs can be used to make apps faster by pre-loading resources such as scripts, stylesheets, and fonts as soon as you know you need them, for example before navigating to another page where the resources will be used.

[React-based frameworks](https://react.dev/learn/creating-a-react-app) frequently handle resource loading for you, so you might not have to call these APIs yourself. Consult your framework’s documentation for details.

- [`prefetchDNS`](https://react.dev/reference/react-dom/prefetchDNS) lets you prefetch the IP address of a DNS domain name that you expect to connect to.
- [`preconnect`](https://react.dev/reference/react-dom/preconnect) lets you connect to a server you expect to request resources from, even if you don’t know what resources you’ll need yet.
- [`preload`](https://react.dev/reference/react-dom/preload) lets you fetch a stylesheet, font, image, or external script that you expect to use.
- [`preloadModule`](https://react.dev/reference/react-dom/preloadModule) lets you fetch an ESM module that you expect to use.
- [`preinit`](https://react.dev/reference/react-dom/preinit) lets you fetch and evaluate an external script or fetch and insert a stylesheet.
- [`preinitModule`](https://react.dev/reference/react-dom/preinitModule) lets you fetch and evaluate an ESM module.

* * *

## Entry points [Link for Entry points ](https://react.dev/reference/react-dom\#entry-points "Link for Entry points ")

The `react-dom` package provides two additional entry points:

- [`react-dom/client`](https://react.dev/reference/react-dom/client) contains APIs to render React components on the client (in the browser).
- [`react-dom/server`](https://react.dev/reference/react-dom/server) contains APIs to render React components on the server.

* * *

## Removed APIs [Link for Removed APIs ](https://react.dev/reference/react-dom\#removed-apis "Link for Removed APIs ")

These APIs were removed in React 19:

- [`findDOMNode`](https://18.react.dev/reference/react-dom/findDOMNode): see [alternatives](https://18.react.dev/reference/react-dom/findDOMNode#alternatives).
- [`hydrate`](https://18.react.dev/reference/react-dom/hydrate): use [`hydrateRoot`](https://react.dev/reference/react-dom/client/hydrateRoot) instead.
- [`render`](https://18.react.dev/reference/react-dom/render): use [`createRoot`](https://react.dev/reference/react-dom/client/createRoot) instead.
- [`unmountComponentAtNode`](https://react.dev/reference/react-dom/unmountComponentAtNode): use [`root.unmount()`](https://react.dev/reference/react-dom/client/createRoot#root-unmount) instead.
- [`renderToNodeStream`](https://18.react.dev/reference/react-dom/server/renderToNodeStream): use [`react-dom/server`](https://react.dev/reference/react-dom/server) APIs instead.
- [`renderToStaticNodeStream`](https://18.react.dev/reference/react-dom/server/renderToStaticNodeStream): use [`react-dom/server`](https://react.dev/reference/react-dom/server) APIs instead.

[Previous<title>](https://react.dev/reference/react-dom/components/title) [NextcreatePortal](https://react.dev/reference/react-dom/createPortal)

* * *