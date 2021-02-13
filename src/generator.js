const fs = require('fs')

let generate =  (path, raw) => {
    let tree = JSON.parse(raw).fileSystem
    for (let item in tree) {
        if (tree[item].type == "folder") {
            let folder_path = path + tree[item].name + "/"
            fs.mkdirSync(folder_path)
            if (Array.isArray(tree[item].content) && JSON.stringify(tree[item].content) != "[]") {
                generate(folder_path, tree[item].content)
            }
        } else if (tree[item].type == "file") {
            let extension = tree[item].name.split('.').pop();
            if (extension == "exe" || extension == "dmg" || extension == "deb" || extension == "appimage") {
                return console.log("The template you chose to add is unsafe.")
            } else {
                if (typeof tree[item].content == "string") {
                    fs.writeFileSync(path + tree[item].name, tree[item].content)
                }
            }
        }
    }
}

module.exports = generate;