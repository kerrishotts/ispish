# ispish
A simple lisp/logo-like language

- [ispish](#ispish)
    - [Hello, World!](#hello--world)
    - [Words](#words)
    - [Variables](#variables)
    - [Expressions](#expressions)
    - [Language Definition](#language-definition)
        - [Types](#types)
            - [Number](#number)
            - [String](#string)
            - [Variable Reference](#variable-reference)
            - [Word](#word)
            - [List](#list)
            - [Tuple](#tuple)
            - [Block](#block)
            - [Expression](#expression)
        - [Standard Wordset](#standard-wordset)
            - [LIST `.` N](#list-n)
            - [`EXIT`](#exit)
            - [`EXITWITH` VALUE](#exitwith-value)
            - [`IF` `(` EXPR `)` `{` IF-BLOCK `}` [ `ELSE` `{` ELSE-BLOCK `}`]](#if-expr-if-block-else-else-block)
            - [`LET` WORD EXPR](#let-word-expr)
            - [`MAP` LIST `[` ITEM-VAR [INDEX-VAR] `]` `{` MAP-BLOCK `}`](#map-list-item-var-index-var-map-block)
            - [`PRINT` EXPR](#print-expr)
            - [`REM` EXPR](#rem-expr)
            - [`REPEAT` TIMES `[` REPEAT-LIST `]`](#repeat-times-repeat-list)
            - [`SIZE` LIST](#size-list)
            - [`SUM` LIST](#sum-list)
            - [`TO` WORD-NAME `[` ARG-LIST `]` `{` WORD-DEFINITION `}`](#to-word-name-arg-list-word-definition)
            - [`WHEN` `[` CONDITION EXPR ... DEFAULT-EXPR `]`](#when-condition-expr-default-expr)
    - [Examples](#examples)
        - [Fibonacci Sequence (using `IF`)](#fibonacci-sequence-using-if)
        - [Fibonacci Sequence (using `WHEN`)](#fibonacci-sequence-using-when)
        - [Reduce over a list](#reduce-over-a-list)
        - [Exponent](#exponent)

## Hello, World!

Let's write our first program that writes "Hello, World" to the console:

```text
PRINT "Hello, World"
> Hello, World
```

As you can see, `print` can be used to put content onto the console. We can print a string by enclosing words in double quotes. What if we wanted to print a number instead?

```text
PRINT 42
> 42
```

`print` can also print more than just strings or numbers. It can also print lists. When printing lists, the result is joined together with no spaces, so we can use this to join multiple strings together, like so:

```text
PRINT ["Hello, " "World"]
> Hello, World
```

## Words

In **ispish**, you can tell the computer what to do by using **words**. You've already used a **word** -- `print` itself is a word.

**ispish** expects that the words you use will be defined. Upon initialization, **ispish** knows a few key words (known as the "standard wordset"), but it's also possible to augment **ispish** with more words.

If you try to use a word that **ispish** doesn't know about, you'll get an error.

```text
PRINTIFY 10
> Can't find PRINTIFY (at 1:1)
```

> **NOTE**: **ispish** will usually try to be helpful and indicate the line and character position of the error. If **ispish** can't indicate the location of the error, the `(at x:y)` portion of the error will be missing.

Unlike natural languages, a **word** doesn't have to be a series of letters. In **ispish** anything that's not a number, string, list, tuple, block, or expression is considered a word. This means that `+`, `.`, and `A` are all considered to be words.

New words can be defined using `TO`. For example:

```text
TO SAYHELLO [] {
    PRINT "Hello"
}
```

> **NOTE**: this is called a _word definition_. It's essentially a "function", "procedure", or "method" in other languages.

Once a word has been defined, it can be invoked like any other word:

```text
SAYHELLO
> Hello
```

Words can take arguments too:

```text
TO SAYHELLO [ NAME ] {
    PRINT [ "Hello, " :NAME ]
}
SAYHELLO "John"
> Hello, John
```

What's `:NAME`, you ask? Well, although `NAME` itself is a **word**, when saying "hello", we want to use the value passed in as an argument to `SAYHELLO`. When `SAYHELLO` was invoked, a new **variable** named `NAME` was created and given the value of `"John"`. In order to get the _value_ of a **variable**, a colon (`:`) is used in front of the variable's name.

When used with `TO`, the list `[ NAME ]` is indicating that `SAYHELLO` expects one argument, and it'll be given the name `NAME`. We can later refer to that value in `SAYHELLO` using `:NAME`.

Any number of arguments can be specified:

```text
TO SAYHELLO [ FIRST LAST ] {
    PRINT [ "Hello, " :FIRST " " :LAST ]
}
SAYHELLO "John" "Smith"
> Hello, John Smith
```

> **NOTE**: Once a word is defined, it _cannot_ be redefined. If you do so, you'll get the error `Can't redefine word <WORD>. (at x:y)`.

## Variables

You've already seen how to use variables inside of word definitions, but you can define variables whenever you need them using the word `LET`.

```text
LET NAME "John"
PRINT [ "Hello, " :NAME ]
> Hello, John
```

Just like when defining parameter names in a word definition, `LET` expects that you'll name a variable using a **word**. In fact if you try to use `:` here, you'll get an error:

```text
LET :NAME "John"
> Expected a WORD; got VARIABLE. (at 1:5)
```

Once a variable is defined using `LET` you can refer to it using the `:<NAME>` form. Unlike words, you can use `LET` as many times as you want to redefine a variable.

```text
LET NAME "John"
LET NAME "Martha"
PRINT :NAME
> Martha
```

An important thing to remember about variables is that they are **scoped**. `LET` will create variables in the current scope, which also happens to be the current **block**.

A **block** is a series of words inside `{...}`. Thus far you've not had to use these braces, but all programs are implicitly embedded within a block. To see how blocks affect variables, however, let's try this:

```text
LET NAME "John"
{
    LET NAME "Martha"
    PRINT :NAME
}
PRINT :NAME
> Martha
> John
```

As you can see, the moment we entered into a new block, we were free to define a new name ("Martha") without losing the name in the outer block.

Variables outside of the scope can be accessed—they just can't be changed, however. For example:

```text
LET NAME "John"
{
    PRINT :NAME
}
> John
```

Variables defined in word definitions are subject to the same restriction–variables outside of the word defintion can be accessed, but new words are restricted to the inside of the word definition.

## Expressions

Technically everything in **ispish** is an expression—that is, everything returns a value. Some words, however, are used in a manner that's more like mathematical expressions like `2 + 2`, rather than `ADD 2 2`.

Mathematical expressions follow the same rules as typical mathematics as defined in the following table:

Operator | Precedence | Meaning
:-------:|:----------:|:---------
`*`      | High       | Multiply
`/`      | High       | Divide
`+`      | Medium     | Add
`-`      | Medium     | Subtract

Comparison operators are also present:

Operator | Precedence | Meaning
:-------:|:----------:|:---------
`<`      | Low        | Less Than
`>`      | Low        | Greater Than
`<=`     | Low        | Less Than or Equal
`>=`     | Low        | Greater Than or Equal
`==`     | Low        | Equal
`!=`     | Low        | Not Equal

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

## Language Definition

### Types

#### Number

A number is either a real number or an integer. Numbers can be negative.

```text
12
3.14
-3
```

#### String

A string is a collection of characters.

```text
""
"Hello, World"
"This is a string"
```

#### Variable Reference

**ispish** expects one to signal their intent to reference a variable by using the `:` (colon) sigil. Variables are scoped according to blocks.

> **NOTE**: Variable names are not case sensitive.

```text
:a
:variable
:thisIsAVariableName
:THISISAVARIABLENAME
```

#### Word

A **word** can represent a native command, a call to a function, or the name of a variable definition. A word does not necessarily map to the English definiton of "word" -- operators like `+` are also words.

> **NOTE**: Words are not case sensitive. It is convention to use UPPERCASE when writing words.

```text
+
LET
DOUBLE
A
```

#### List

A list represents a collection of items. Any type can be stored within a list. Lists typically act as arrays in other languages and can be indexed and manipulated.

```text
[]
[ 1 ]
[ 1 2 3 4 ]
[ "hello" "this" "is" "a" "list" ]
[ "lists" "are" "not" "required" "to" "have" "the" "same" "types" 1 2 3 4 ]
[ LISTS CAN ALSO CONTAIN WORDS ]
[ [ 1 2 3 4 ] [ 5 6 7 9 ] ]
```

#### Tuple

A tuple is a parenthetical list, of which only the last value is returned. Typically used to group portions of expressions in order to influence evaluation order.

```text
1 * (2 + 3)
```

#### Block

A block is a list of of other types that is executed whenever it is encountered. The last value handled is the return value of the block. A block also creates a new scope, so variables created within a block are not visible outside of the block.

```text
LET A 9
{
    LET A 5  # "A is now 5, but scoped to this block"
    :A * 2   # "A is now 10"
} # "A is 9 -- outside of the block"
```

#### Expression

An expression is typically a mathematical expression. For example "2 + 2" is an expression represented by the `+` word and two numbers. Expressions occur naturally in the course of writing a program, and the return result is the result of evaluating the expression.

### Standard Wordset

#### LIST `.` N

Returns the `N`th item in `LIST` (zero based). If `N` is negative, the `N`th item from the end of the list is returned.

```text
[1 2 3] . 0
> 1

[1 2 3] . 2
> 3

[1 2 3] . -1
> 3

[1 2 3] . -3
> 1
```

#### `EXIT`

Exits the block immediately. Useful in `REPEAT` and word definitions.

#### `EXITWITH` VALUE

Exits the block immediately, returning `VALUE`. Used to exit word definitions early.

#### `IF` `(` EXPR `)` `{` IF-BLOCK `}` [ `ELSE` `{` ELSE-BLOCK `}`]

If `EXPR` evaluates to `1`, the `IF-BLOCK` is executed and returned. If `ELSE` is present and `EXPR` evaluted to `0`, the `ELSE-BLOCK` is executed and returned instead.

```text
IF (1 < 2) {
    "true"
}
> "true

IF (1 > 2) {
    "true!"
} ELSE {
    "false"
}
> "false"
```

#### `LET` WORD EXPR

Assigns the result of `EXPR` to a new variable in the current scope named `WORD`. Variables are dereferenced using the `:` form.

```text
LET A 5
LET B :A + 5
PRINT :B
> 10
```

#### `MAP` LIST `[` ITEM-VAR [INDEX-VAR] `]` `{` MAP-BLOCK `}`

Iterates over each item in `LIST`, executing `MAP-BLOCK` for each item. `ITEM-VAR` and `INDEX-VAR` can be used to indicate the variable names for the list item and the list index respectively.

```text
MAP [1 2 3 4] [ X IDX ] { :X + :IDX }
> [1 3 5 7]

MAP [1 2 3 4] [ X ] { :X * 2 }
> [2 4 6 8]

MAP [1 2 3 4] X { :X * 2 }
> [2 4 6 8]
```

#### `PRINT` EXPR

Prints the value of `EXPR` to the console. If `EXPR` is a list, the list is printed with no spaces in between.

#### `REM` EXPR

Consumes `EXPR` and ignores it. Useful for remarks (comments).

```text
REM "This will be ignored completely"
```

#### `REPEAT` TIMES `[` REPEAT-LIST `]`

Repeats the items in `REPEAT-LIST` the number of times specified by `TIMES`. If `EXIT` or `EXITWITH` is used, the loop can be exited early.

Because `REPEAT-LIST` is not in `{...}`, no new scope is created and changes to variables can be persisted. This is useful for keeping track of how many times through the loop one has been.

```text
LET IDX 0
REPEAT 4 [
    LET IDX :IDX + 1
    PRINT :IDX
]
PRINT :IDX
> 1
> 2
> 3
> 4
> 4
```

#### `SIZE` LIST

Returns the number of items contained with `LIST`.

```text
SIZE [1 2 3]
> 3
```

#### `SUM` LIST

Returns the sum of all the numbers within `LIST`.

```text
SUM [10 20 30 40]
> 100
```

#### `TO` WORD-NAME `[` ARG-LIST `]` `{` WORD-DEFINITION `}`

Creates a new word definition.

#### `WHEN` `[` CONDITION EXPR ... DEFAULT-EXPR `]`

`WHEN` is useful when you need to test for multiple conditional expressions. The conditions don't have to be mutually exclusive, however execution _is_ stopped upon the first successfully matched condition.

```
LET A 10
LET B 20
WHEN [
    (:A < :B) "less"
    (:A > :B) "greater"
    "equal"
]
> "less"
```

## Examples

### Fibonacci Sequence (using `IF`)

```text
TO FIB [N] {
    IF (:N <= 1) {
        1
    } ELSE {
        (FIB :N - 2) + (FIB :N - 1)
    }
}
```

### Fibonacci Sequence (using `WHEN`)

```text
TO FIB [n] {
    WHEN [
        (:N <= 1) 1
        (FIB :N - 2) + (FIB :N - 1)
    ]
}
```

### Reduce over a list

```text
TO REDUCE [ LIST FN ACC ] {
    LET ACC :ACC
    LET IDX 0
    LET LEN (SIZE :LIST)
    REPEAT :LEN [
        LET ITEM :LIST . :IDX
        LET ACC :FN
        LET IDX :IDX + 1
    ]
    :ACC
}

PRINT (REDUCE [10 20 30 40] {:ACC + :ITEM} 0)
> 100
```

### Exponent

```text
TO POWER [ X Y ] {
    LET TEMP 1
    REPEAT :Y [
        LET TEMP ( :TEMP * :X )
    ]
    :TEMP
}
```