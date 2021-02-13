# Debox
## A dynamic, modular boilerplate manager for NodeJS.

### Installation
In any folder, run:

```
npm install debox -g
```
**-g** is VERY important.

### Usage
Run the `add` command (in the folder you want it to be in) to boil up a template
```
debox add <templateName> <path>
```
`<templateName>`  REQUIRED

`<path>` Optional
> If path is not specified, it creates a `./debox-template/` folder.


### Example
In this example, we will use the template "static-page".
```
debox add static-page
```

Result:
```
myFolder (The folder you ran the command in)
    
    debox-template
        
        index.html
        style.css
        script.js
        assets
```

### Example with path
```
debox add static-page ./
```
> ./ means the current folder.

Result:
```
myFolder (The folder you ran the command in)

    index.html
    style.css
    script.js
    assets
```

### Make your own templates
The feature has been implemented, but the documentation will be coming soon!

### Future Enhancements:
- Much more templates
- Publish your own templates
- Install outside templates with URLs