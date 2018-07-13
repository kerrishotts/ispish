# Operator

![Operator](../assets/op.png)

Type        | Operator | Precedence | Meaning
-----------:|:--------:|:----------:|:---------
Logical     | `AND`    | Highest    | Returns `1` if both sides are `1`
Logical     | `OR`     | Highest    | Returns `1` if either side is `1`
Math        |`*`       | High       | Multiply
Math        |`/`       | High       | Divide
Math        |`+`       | Medium     | Add
Math        |`-`       | Medium     | Subtract
Comparision | `<`      | Low        | Less Than
Comparision | `>`      | Low        | Greater Than
Comparision | `<=`     | Low        | Less Than or Equal
Comparision | `>=`     | Low        | Greater Than or Equal
Comparision | `==`     | Low        | Equal
Comparision | `!=`     | Low        | Not Equal
Index       | `.`      | Lower      | Return item at index in list
Assignment  | `=`      | Lowest     | Assign RHS to LHS

**ispish** requires that these words be used in **infix** notation—which is the normal mathematical form. For example:

```text
PRINT 2 + 2
> 4
PRINT 2 + 4 * 5
> 22
```

If you need to specify precedence, parentheses are allowed:

```text
PRINT (2 + 4) * 5
> 30
```

Conditional operators work the same way, but will return `1` if the condition is truthful and `0` if the condition is false. For example:

```text
PRINT 1 < 2
> 1
PRINT 1 == 2
> 0
```

## Behavior with types

Operators change behavior given the types on the left and right hand sides of the operator. All the examples you've seen thus far have been with numbers, but operators can work with strings and lists as well.

LHS Type | Operator | RHS Type | Result
--------:|:--------:|:---------|:-------
 Number  |    `+`   |  Number  | RHS added to LHS
 Number  |    `-`   |  Number  | RHS subtracted from LHS
 Number  |    `*`   |  Number  | LHS multipled by RHS
 Number  |    `/`   |  Number  | LHS divied by RHS
 Number  |    `<`   |  Number  | 1 if LHS is less than RHS; otherwise 0
 Number  |    `>`   |  Number  | 1 if LHS is greater than RHS; otherwise 0
 Number  |    `<=`  |  Number  | 1 if LHS is less than or equal to RHS; otherwise 0
 Number  |    `>=`  |  Number  | 1 if LHS is greater than or equal to RHS; otherwise 0
 Number  |    `==`  |  Number  | 1 if LHS is equal to RHS; otherwise 0
 Number  |    `!=`  |  Number  | 1 if LHS is not equal to RHS; otherwise 0
 Number  |    `AND` |  Number  | 1 if LHS and RHS are 1; otherwise 0
 Number  |    `OR`  |  Number  | 1 if LHS or RHS are 1; otherwise 0
 String  |    `+`   |  String  | LHS and RHS combined
 String  |    `.`   |  Number  | Return character at number in string
 String  |    `.`   |  List    | Return substring of string from first to second number in list (inclusive)
 List    |    `+`   |  List    | Return the combination of LHS and RHS lists
 List    |    `-`   |  List    | Return the LHS list minus any items found in RHS
 List    |    `<`   |  List    | Returns 0
 List    |    `>`   |  List    | Returns 0
 List    |    `<=`  |  List    | Returns 1 if LHS is equal to RHS, otherwise 0
 List    |    `>=`  |  List    | Returns 1 if LHS is equal to RHS, otherwise 0
 List    |    `==`  |  List    | Returns 1 if all entries in LHS and RHS are identical, otherwise 0
 List    |    `!=`  |  List    | Returns 1 if any entry in LHS and RHS is not identical, otherwise 0
 List    |    `.`   |  Number  | Return the item at number in list
 List    |    `.`   |  List    | Return the sublist of the lhs from first to second in rhs



