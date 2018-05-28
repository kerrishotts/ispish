# Fibonacci Sequence (using `IF`)

```text
TO FIB [N] {
    IF (:N <= 1) {
        1
    } ELSE {
        (FIB :N - 2) + (FIB :N - 1)
    }
}
```