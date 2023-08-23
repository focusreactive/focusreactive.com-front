# FR Blog

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

### Installation

```
$ yarn
```

### Local Development

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Using SSH:

```
$ USE_SSH=true yarn deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

We can customize components by [swizzling](https://docusaurus.io/docs/swizzling) and styles by [styling](https://docusaurus.io/docs/swizzling)

Custom plugin `plugins/blog-plugin.js` based on default one `plugin-content-blog` but extended to add relatedPosts to metadata.

TODO:
1 Trigger deployment when post is published in Sanity studio
2 Use document action to create permalink field in a tag?
3 Deploy fr sanity studio and import content
