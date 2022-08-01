
<a href="https://webden.dev" target="_blank"><img src="img/brand.png" width="300px" alt="WebDen"/></a>

[WebDen.dev](https://webden.dev) is an open source mobile and tablet friendly alternative to JSFiddle and JSBin.
It is a fully client-side app so you can install it as a progressive web app (PWA) on
your device to use offline.

![WebDen Screenshot](img/ipad-1.png)


## Features

* HTML, CSS & JS editors
* JavaScript console emulation
* Preview panel
* Designed first for mobile and tablet use
* Import and export projects
* Save code as HTML
* Light & dark themes
* Keyboard shortcuts
* Offline support

## Why?

The landscape of online editors aren't currently optimized for mobile or tablet. The iOS apps
in this space have improved but were limited when this project originally started.


## How to install

**iOS Safari**

Go to *Share Menu > Add to Home Screen*

**Chrome**

Go to *Settings > Add to Home Screen*


## How to use libraries or frameworks

Add any scripts to the HTML tab as you would in a HTML file.


## Coming Soon

[Sign up](http://eepurl.com/gntUvf) to get updates on new features and releases.

* Save as Github Gist
* Pushing / Pulling from Github
* Updated console features
* Updated editor theme features
* Capture JavaScript errors (for console)


## License

* The program is distributed under the terms of the Simplified BSD License. The license details can be found in the file `LICENSE`
* The ACE editor is BSD licensed.


## Contributing

1. Fork and clone the repo
2. Run any local web server in the root directory

```
$ git clone git@github.com:chrisdiana/webden.git
$ cd webden/
$ python3 -m http.server 8080
```

3. Navigate to the local webserver and pass the `debug=1` param to bypass service workers

```
http://localhost:8080?debug=1
```

## Running as a Container

A Dockerfile is provided for running this as a container.

1. Build the container -

```
docker build . -t chrisdiana/webden:latest
```

2. Run the container -

```
docker run -d -p 8080:8080 chrisdiana/webden:latest
```

3. Access the running container via http://localhost:8080


## Thanks!

* [Ace](http://ace.c9.io)
* [Framework7](http://framework7.io/)
* [RenderJSON](https://github.com/caldwell/renderjson)
