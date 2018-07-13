export default `
require math
require gfx

to.native turtle.init [] {
    "
        this.scope.__global__.__turtle__ = {
            heading: 0,
            width: 1,
            x: this.scope.__global__.__graphics__.width / 2,
            y: this.scope.__global__.__graphics__.height / 2,
            down: true,
            color: 'black'
        };
    "
}

to.native turtle.moveto [ x y ] {
    "
        const turtle = this.scope.__global__.__turtle__;
        const {width, height} = this.scope.__global__.__graphics__;
        const { ctx } = this.scope.__global__.__graphics__;
        const newX = {{X}};
        const newY = {{Y}};

        if (turtle.down) {
            // pen draws as it goes along
            const { color, width, x, y } = turtle;
            ctx.strokeStyle = color;
            ctx.lineWidth= width;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(newX, newY);
            ctx.stroke();
        }

        turtle.x = newX;
        turtle.y = newY;
    "
}

to.native turtle.set.heading [ heading ] {
    "
        this.scope.__global__.__turtle__.heading = {{HEADING}};
        return this.Token.box(this.scope.__global__.__turtle__.heading);
    "
}

to.native turtle.heading [ ] {
    "
        return this.Token.box(this.scope.__global__.__turtle__.heading);
    "
}

to.native turtle.x [ ] {
    "
        return this.Token.box(this.scope.__global__.__turtle__.x);
    "
}

to.native turtle.y [ ] {
    "
        return this.Token.box(this.scope.__global__.__turtle__.y);
    "
}

to turtle.set.pos [ x y ] {
    turtle.moveto x y
}

to turtle.set.x [ x ] {
    turtle.moveto x turtle.y
}

to turtle.set.y [ y ] {
    turtle.moveto turtle.x y
}

to turtle.home [ ] {
    turtle.moveto (gfx.width / 2) (gfx.height / 2)
}

to.native turtle.set.pen.color [ color ] {
    "
        this.scope.__global__.__turtle__.color = {{COLOR}};
        return this.Token.box({{COLOR}});
    "
}

to.native turtle.pen.color [ ] {
    "
        return this.Token.box( this.scope.__global__.__turtle__.color );
    "
}

to.native turtle.pen.up [ ] {
    "
        this.scope.__global__.__turtle__.down = false;
        return this.Token.box(0);
    "
}

to.native turtle.pen.down [ ] {
    "
        this.scope.__global__.__turtle__.down = true;
        return this.Token.box(1);
    "
}

to pu [ ] {
    turtle.pen.up
}

to pd [ ] {
    turtle.pen.down
}

to pc [ color ] {
    turtle.set.pen.color color
}

to turtle.right [ deg ] {
    turtle.set.heading (turtle.heading + deg)
}

to rt [ deg ] {
    turtle.right deg
}

to turtle.left [ deg ] {
    turtle.set.heading (turtle.heading - deg)
}

to lt [ deg ] {
    turtle.left deg
}

to turtle.forward [ dist ] {
    let x turtle.x
    let y turtle.y
    let heading turtle.heading
    let r (math.from.deg.to.rad heading)
    let x2 (x + (dist * (math.sin r)))
    let y2 (y - (dist * (math.cos r)))
    turtle.moveto x2 y2
}

to fd [ dist ] {
    turtle.forward dist
}

to turtle.backward [ dist ] {
    turtle.forward ( dist * -1 )
}

to bk [ dist ] {
    turtle.backward dist
}

to turtle.circle [ s ] {
    repeat 36 [
        fd s
        rt 10
    ]
}

to turtle.square [ s ] {
    repeat 4 [
        fd s
        rt 90
    ]
}

to turtle.flag [ s ] {
    fd s
    turtle.square s
    lt 180
    fd s
}

to turtle.test [ ] {
    gfx.init
    gfx.set.size 640 480
    gfx.clear
    turtle.init

    pd
    repeat 10 [
        repeat 28 [
            pc color.random
            repeat 2 [
                repeat 9 [
                    fd 10 rt 4
                ]
                rt 145
            ]
            rt 11
        ]
        pu
        fd 75
        lt 40
        pd
    ]
}

`;
