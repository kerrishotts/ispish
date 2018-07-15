# Tree

![Tree 10 55](../../assets/turtle/tree.png)

```text
require turtle

gfx.init
gfx.set.size 500 500
turtle.init

pc "green"

to tree [ d l ] {
    h = l / 2

    fd d
    lt h
    fd d

    if (l > 0) {
        tree (d - 1) (l - 5)
    }

    bk d
    rt l
    fd d

    if (l > 0) {
        tree (d - 1) (l - 5)
    }

    bk d
    lt h
    bk d
}

tree 10 55
```
