export default `
REM "LIST HANDLING FOR ISPISH"

to stack.push [ stack x ] {
    stack + [ x ]
}

to stack.pop [ stack ] {
    [
        stack . -1
        stack . [ 0 -2 ]
    ]
}

to queue.enqueue [ queue x ] {
    queue + [ x ]
}

to queue.dequeue [ queue ] {
    [
        queue . 0
        queue . [ 1 -1 ]
    ]
}

to list.rotate.right [ list ] {
    [ list . -1 ] + (list . [0 -2])
}

to list.rotate.left [ list ] {
    (list . [1 -1]) + [ list . 0 ]
}

to list.map2 [ list mapFn ] {
    idx = 0
    mapList = [ ]
    len = size list
    repeat len [
        item = (list . idx)
        mapList = (mapList + [ (mapFn item idx list) ])
        idx = (idx + 1)
    ]
    mapList
}

to list.reduce [ list reduceFn acc ] {
    acc = acc
    idx = 0
    len = (size list)
    repeat len [
        item = list . idx
        acc = (reduceFn acc item idx list)
        idx = (idx + 1)
    ]
    acc
}

to list.map [ list mapFn ] {
    list.reduce list {
        [ acc item idx list ] = ...
        acc + [ (mapFn item idx list) ]
    } [ ]
}

to list.filter [ list filterFn ] {
    list.reduce list {
        [ acc item idx list ] = ...
        if ((filterFn item idx list) == 1) {
            acc + [ item ]
        } else {
            acc
        }
    } [ ]
}

to list.every [ list everyFn ] {
    result = (list.filter list {
        [item idx list] = ...
        (everyFn item idx list)
    })
    result == list
}

to list.some [ list someFn ] {
    result = (list.filter list {
        [ item idx list ] = ...
        (someFn item idx list)
    })
    (size result) > 0
}

to list.sum [ l ] {
    list.reduce l {acc + item} 0
}



`;
