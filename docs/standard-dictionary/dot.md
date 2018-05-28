# `.`

![DOT syntax](../assets/dot.png)

Returns the `N`th item in `LIST` (zero based). If `N` is negative, the `N`th item from the end of the list is returned.

```text
[1 2 3] . 0
→ 1

[1 2 3] . 2
→ 3

[1 2 3] . -1
→ 3

[1 2 3] . -3
→ 1
```
