# `REPEAT` (Alias: `RPT`)

![REPEAT](../assets/repeat.png)

Repeats the items in `REPEAT-LIST` the number of times specified by `TIMES`. If `EXIT` or `EXITWITH` is used, the loop can be exited early.

Because `REPEAT-LIST` is not in `{...}`, no new scope is created and changes to variables can be persisted. This is useful for keeping track of how many times through the loop one has been. Howver, if new scope is desired, `REPEAT` does also accept a block instead of a list.

```text
idx = 0
repeat 4 [
    idx = idx + 1
    print idx
]
print idx
> 1
> 2
> 3
> 4
> 4
```
