# List Manipulation

> **NOTE:**
>
> Requires the `list` module:
>
>     require list
>

## Stack Management

### stack.push _stack_ _x_

Returns a new list with `x` at the end of `stack`.

```text
stack.push [1 2 3] 4
→ [ 1 2 3 4 ]
```

Stacks are immutable, but if you want to keep the result of a `stack.push` and use it again (perhaps in a loop), you can do so:

```text
{
    in = [ 1 2 3 4 ]
    stack = [ ]
    idx = 0

    repeat (size in) [
        stack = (stack.push stack (in . idx))
        idx = idx + 1
    ]
    stack
}
→ [ 1 2 3 4 ]
```

### stack.pop _stack_

`stack.pop` returns the last item pushed on `stack` and returns the resulting stack as well.

```text
stack.pop [1 2 3]
→ [ 3 [ 1 2 ] ]
```

This behavior may be surprising, but everything is technically immutable in **ispish**, which means that a stack can't be modified in place. You can, however, reassign it, like this:

```text
to reverse [ list ] {
    stack = [ ]
    repeat (size list) [
        [p list] = stack.pop list
        stack = stack.push stack p
    ]
    stack
}

reverse [ 1 2 3 ]
→ [ 3 2 1 ]
```

## Queue Management

### queue.enqueue _queue_ _x_

### queue.dequeue _queue

## General list definitions

### list.rotate.right _list_

### list.rotate.left _list_

### list.reduce _list_ _reduceFn_ _acc_

### list.map _list_ _mapFn_

### list.filter _list_ _filterFn_

### list.every _list_ _everyFn_

### list.some _list _someFn_

### list.sum _list_



`;
