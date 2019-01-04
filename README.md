# babel-plugin-transform-jsx-url
Convert URL to require or import sytanx in JSX.

## Example

### In
``` html
<img src="/static/image.jpg" />
<link rel="stylesheet" href="/static/style.css" />
```

### Out
``` html
<img src={require("/static/image.jpg")} />
<link rel="stylesheet" href={require("/static/style.css")} />
```

## Installation
``` bash
npm install --save-dev babel-plugin-transform-jsx-url
```

## Usage
Without options:

``` js
{
  "plugins": ["transform-jsx-url"],
}
```

With options:

``` js
{
  "plugins": [
    ["transform-jsx-url", {
      "root": "/src",
      "attrs": ["img:src", "img:data-src", "link:href"],
    }],
  ],
}
```

### Options

#### root
`string`, defaults to `""`.

If a root query parameter is set, however, it will be prepended to the url and then translated.

#### Example
`"root": "/src"`

##### In
``` html
<img data-src="/static/image.jpg" />
```

##### Out
``` html
<img data-src={require("/src/static/image.jpg")} />
```

#### attrs
`Array`, defaults to `["img:src", "link:href"]` .

You can specify which tag-attribute combination should be processed by this loader. Pass an array or a space-separated list of <tag>:<attribute> combinations.

#### Example
`"attrs": ["img:data-src", "custom:src"]`

##### In
``` html
<img data-src="/static/image.jpg" />
<custom src="/static/image.jpg" />
```

##### Out
``` html
<img data-src={require("/static/image.jpg")} />
<custom src={require("/static/image.jpg")} />
```
