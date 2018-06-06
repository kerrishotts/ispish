# Reduce over a list

```text
TO REDUCE [ LIST FN ACC ] {
    LET ACC ACC
    LET IDX 0
    LET LEN (SIZE LIST)
    REPEAT LEN [
        LET ITEM LIST . IDX
        LET ACC FN
        LET IDX IDX + 1
    ]
    ACC
}

PRINT (REDUCE [10 20 30 40] {ACC + ITEM} 0)
> 100
```
