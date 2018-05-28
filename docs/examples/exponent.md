# Exponent

```text
TO POWER [ X Y ] {
    LET TEMP 1
    REPEAT :Y [
        LET TEMP ( :TEMP * :X )
    ]
    :TEMP
}
```