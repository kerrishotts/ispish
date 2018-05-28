# LET

![LET Syntax](../assets/let.png)

Assigns the result of `EXPR` to a new variable in the current scope named `WORD`. Variables are dereferenced using the `:` form.

> **IMPORTANT**:
>
> `LET` can't modify variables outside of the current scope. It can only create and modify variables within the current scope.

```text
LET A 5
LET B :A + 5
PRINT :B
→ 10
```
