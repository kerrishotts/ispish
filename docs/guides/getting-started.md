# Getting Started

- [Hello, World!](#hello-world)
- [Words](#words)
- [Variables](#variables)
- [Expressions](#expressions)

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
    PRINT [ "Hello, " NAME ]
}
SAYHELLO "John"
> Hello, John
```

What's `NAME`, you ask? Well, although `NAME` itself is a **word**, when saying "hello", we want to use the value passed in as an argument to `SAYHELLO`. When `SAYHELLO` was invoked, a new **variable** named `NAME` was created and given the value of `"John"`, so that when `PRINT` evaluates `NAME`, `"John"` is the value returned.

When used with `TO`, the list `[ NAME ]` is indicating that `SAYHELLO` expects one argument, and it'll be given the name `NAME`. We can later refer to that value in `SAYHELLO` using `NAME`.

Any number of arguments can be specified:

```text
TO SAYHELLO [ FIRST LAST ] {
    PRINT [ "Hello, " FIRST " " LAST ]
}
SAYHELLO "John" "Smith"
> Hello, John Smith
```

> **NOTE**: Once a word is defined, it _cannot_ be redefined. If you do so, you'll get the error `Can't redefine word <WORD>. (at x:y)`.

## Variables

You've already seen how to use variables inside of word definitions, but you can define variables whenever you need them using the word `LET`.

```text
LET NAME "John"
PRINT [ "Hello, " NAME ]
> Hello, John
```

Once a variable is defined using `LET` you can refer to it using the `<NAME>` form. Unlike words, you can use `LET` as many times as you want to redefine a variable.

```text
LET NAME "John"
LET NAME "Martha"
PRINT NAME
> Martha
```

An important thing to remember about variables is that they are **scoped**. `LET` will create variables in the current scope, which also happens to be the current **block**.

A **block** is a series of words inside `{...}`. Thus far you've not had to use these braces, but all programs are implicitly embedded within a block. To see how blocks affect variables, however, let's try this:

```text
LET NAME "John"
{
    LET NAME "Martha"
    PRINT NAME
}
PRINT NAME
> Martha
> John
```

As you can see, the moment we entered into a new block, we were free to define a new name ("Martha") without losing the name in the outer block.

Variables outside of the scope can be accessed—they just can't be changed, however. For example:

```text
LET NAME "John"
{
    PRINT NAME
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
