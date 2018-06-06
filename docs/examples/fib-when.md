# Fibonacci Sequence (using `WHEN`)

```text
TO FIB [n] {
    WHEN [
        (N <= 1) 1
        (FIB N - 2) + (FIB N - 1)
    ]
}
```
