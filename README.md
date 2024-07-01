# dsf-scout-v3

Note: Please ensure you have installed <code><a href="https://nodejs.org/en/download/">nodejs</a></code>

To preview and run the project on your device:
1) Open project folder in <a href="https://code.visualstudio.com/download">Visual Studio Code</a>
2) In the terminal, run `npm install`
3) Run `PORT=8191 npm run dev` to view project in browser. The CORS allows only 8191 port.

## dev/prod

- dev: https://dsscout.dsfootball.dev
- prod: https://dsscout.dsfootball.io


## check compiling for production

The server of dev/prod on GitHub Pages.
You can create built codes by below command if you want to it for production ready.

```bash
$ npm install -g @cloudflare/next-on-pages
$ npm run build-edge
# or
# $ npx @cloudflare/next-on-pages@1
```
