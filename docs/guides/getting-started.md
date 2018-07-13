# Getting Started

- [Start in Interactive mode](#start-in-interactive-mode)
- [Hello, World!](#hello-world)
- [Words](#words)
- [Variables](#variables)
- [Expressions](#expressions)

## Start in Interactive mode

The examples within this section work while in interactive mode. You can start **ispish** interactively like so:

```bash
ispish --interactive
```

Once started, you'll see a simple prompt:

```text
Ready.
```

Return values from any expressions are indicated as such:

```text
→ "Hello, World"
```

## Hello, World!

Let's write our first program that writes "Hello, World" to the console:

```text
print "Hello, World"
```

You should see the following output:

```text
Hello, World
→ "Hello, World"
```

As you can see, `print` can be used to put content onto the console, although it looks like we've printed "Hello, World" twice, right? The _first_ "Hello, World" is what was printed but the second is what was returned.

> **TIP**
>
> Just about everything in **ispish** returns a value, including `print`. When in the interactive
> mode, you'll see this output prefixed with a `→ `, indicating that a value was returned. When not
> in interactive mode, you wouldn't see this printed to the console.

We can print a string by enclosing words in double quotes. What if we wanted to print a number instead?

```text
print 42
42
→ "42"
```

Notice that the return result here has quotes around it: this indicates that the return result is a string, even though we printed a number.

`print` can also print more than just strings or numbers. It can also print lists. When printing lists, the result is joined together with no spaces, so we can use this to join multiple strings together, like so:

```text
print [ "hello" " " "world" ]
hello world
→ "hello world"
```

## Words

In **ispish**, you can tell the computer what to do by using **words**. You've already used a **word** -- `print` itself is a word.

**ispish** expects that the words you use will be defined. Upon initialization, **ispish** knows a few key words (known as the "standard dictionary"), but it's also possible to augment **ispish** with more words.

If you try to use a word that **ispish** doesn't know about, you'll get an error.

```text
printify 10
Error: Can't find PRINTIFY (at 1:1)
```

> **NOTE**: **ispish** will usually try to be helpful and indicate the line and character position of the error. If **ispish** can't indicate the location of the error, the `(at x:y)` portion of the error will be missing.

Unlike natural languages, a **word** doesn't have to be a series of letters. In **ispish** anything that's not a number, string, list, parenthetical, block, or expression is considered a word. This means that `+`, `.`, and `A` are all considered to be words.

New words can be defined using `TO`. For example:

```text
to say.hello [] {
    print "Hello"
}
```

> **NOTE**: this is called a _word definition_. It's essentially a "function", "procedure", or "method" in other languages.

Once a word has been defined, it can be invoked like any other word:

```text
say.hello
Hello
→ "Hello"
```

Words can take arguments too:

```text
to say.hello.to [ name ] {
    PRINT [ "Hello, " name ]
}
say.hello.to "John"
Hello, John
→ "Hello, John"
```

What's `name`, you ask? Well, although `name` itself is a **word**, when saying "hello", we want to use the value passed in as an argument to `say.hello.to`. When `say.hello.to` was invoked, a new **variable** named `name` was created and given the value of `"John"`, so that when `print` evaluates `name`, `"John"` is the value returned.

When used with `to`, the list `[ name ]` is indicating that `say.hello.to` expects one argument, and it'll be given the name `name`. We can later refer to that value in `say.hello.to` using `name`.

Any number of arguments can be specified:

```text
to say.goodbye.to [ first last ] {
    PRINT [ "Goodbye, " first " " last ]
}

say.goodbye.to "John" "Smith"
Goodbye, John Smith
→ "Goodbye, John Smith"
```

> **NOTE**: Once a word is defined, it _cannot_ be redefined with a different number of parameters. If you do so, you'll get the error `Can't redefine word <WORD>. (at x:y)`.

It's also possible to retrieve and pass more arguments than are required:

```text
to print.all [ ] {
    print ...
}

(print.all "hello, " "world!")
hello, world!
→ "hello, world!"
```

The special word `...` represents the list of any arguments not named. **ispish** will automatically collect any additional items inside a parenthetical and assign them as additional arguments. This does mean that you can't do the following:

```text
print.all "hello, " "world!"

→ "world!"
```

Note that `print` didn't print _anything_, and `"world!"` was what was returned. This is because words have a _default_ number of parameters -- these include only named parameters. Additional parameters are allowed, but they are considered additional, and only included when inside parentheticals.

## Variables

You've already seen how to use variables inside of word definitions, but you can define variables whenever you need them using the word `LET` or the assignment operator (`=`).

```text
{
    let name "John"
    print [ "Hello, " name ]
}
Hello, John
→ "Hello, John"
```

> **IMPORTANT:**
> .
> We're wrapping both statements inside a block so that the `print` word has access to the `name` variable. **ispish**'s interactive mode implicitly wraps each entry into a block, which creates a new scope and isolates variables from separate entries. To keep the two together, you have to be explicit about creating a block.

Once a variable is defined using `LET` or `=`, you can refer to it using the `<NAME>` form. Unlike words, you can use `LET` or `=` as many times as you want to redefine a variable.

```text
{
    let name "John"
    let name "Martha"
    print name
}
Martha
→ "Martha"
```

An important thing to remember about variables is that they are **scoped**. `LET` will create variables in the current scope, which also happens to be the current **block**.

A **block** is a series of words inside `{...}`. All programs are implicitly embedded within a block. To see how blocks affect variables, however, let's try this:

```text
{
    name = "John"
    {
        name = "Martha"
        print name
    }
    print name
}
Martha
John
→ "John"
```

As you can see, the moment we entered into a new block, we were free to define a new name ("Martha") without losing the name in the outer block.

Variables outside of the scope can be accessed—they just can't be changed, however. For example:

```text
{
    name = "John"
    {
        print name
    }
}
John
→ "John"
```

Variables defined in word definitions are subject to the same restriction–variables outside of the word definition can be accessed, but new variables are restricted to the inside of the word definition.

## Expressions

Technically everything in **ispish** is an expression—that is, everything returns a value. Some words, however, are used in a manner that's more like mathematical expressions like `2 + 2`, rather than `ADD 2 2`.

Mathematical expressions follow the same rules as typical mathematics ([for more, see the "operator" type](../types/op.md)). This means you can write mathematical expressions naturally, like this:

```text
print 2 + 2
4
→ "4"

print 2 + 4 * 5
22
→ "22"
```

If you need to specify precedence, parentheses are allowed:

```text
print (2 + 4) * 5
30
→ "30"

```

