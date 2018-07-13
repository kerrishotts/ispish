export default `
require math

to.native gfx._init [] {
    "
        const defaults = {
            w: 320,
            h: 240
        };
        const graphics = this.scope.__global__.__graphics__ = {};
        let canvas;
        let ctx;
        if (typeof window !== 'undefined') {
            // we're in a browser, so get canvas and context the browser way
            canvas = document.getElementById('graphics');
            ctx = canvas.getContext('2d');
        } else {
            if (typeof this.scope.__global__.__canvas__ !== 'undefined') {
                canvas = this.scope.__global__.__canvas__.make(defaults.width, defaults.height);
                ctx = canvas.getContext('2d');
            }
        }

        graphics.canvas = canvas;
        graphics.ctx = ctx;

        if (ctx) {
            graphics.width = defaults.width;
            graphics.height = defaults.height;

            ctx.fillStyle = 'black';
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 1;
        }
    "
}

to.native gfx.set.size [ w h ] {
    "
        if (typeof window !== 'undefined') {
            const { ctx } = this.scope.__global__.__graphics__;
            const { canvas } = ctx;

            canvas.width = {{W}} * devicePixelRatio;
            canvas.height = {{H}} * devicePixelRatio;

            canvas.style.width = {{W}} + 'px';
            canvas.style.height = {{H}} + 'px';

            ctx.scale(devicePixelRatio, devicePixelRatio);
        } else {
            if (typeof this.scope.__global__.__canvas__ !== 'undefined') {
                const canvas = this.scope.__global__.__canvas__.make({{W}}, {{H}});
                const ctx = canvas.getContext('2d');
                this.scope.__global__.__graphics__.canvas = canvas;
                this.scope.__global__.__graphics__.ctx = ctx;
            }
        }

        this.scope.__global__.__graphics__.width = {{W}};
        this.scope.__global__.__graphics__.height = {{H}};
    "
}

to.native gfx.export.to.png [ fn ] {
    "

        if (typeof window !== 'undefined') {
            const { ctx } = this.scope.__global__.__graphics__;
            const { canvas } = ctx;

            const dataURL = canvas.toDataURL();
            window.open(dataURL);

        } else {
            if (typeof this.scope.__global__.__canvas__ !== 'undefined') {
                const PImage = this.scope.__global__.__canvas__;
                const { canvas } = this.scope.__global__.__graphics__;
                PImage.encodePNGToStream(canvas, this.scope.__global__.__fs__.createWriteStream({{FN}}))
                .catch((e)=>{
                    console.error('there was an error saving the image');
                });
            }
        }
    "
}

to gfx.init [] {
    gfx._init
    gfx.set.size 320 240
}

to.native gfx.stroke.color [ color ] {
    "
        const { ctx } = this.scope.__global__.__graphics__;
        ctx.strokeStyle = {{COLOR}};
    "
}

to.native gfx.fill.color [ color ] {
    "
        const { ctx } = this.scope.__global__.__graphics__;
        ctx.fillStyle = {{COLOR}};
    "
}

to.native color.random [ ] {
    "
        const pickableColors = [ '00', '33', '66', '99', 'CC', 'FF' ];
        const colors = Array.from({length: 3}, _ => pickableColors[Math.floor(Math.random() * 6)]);
        return this.Token.box('#' + colors.join(''));
    "
}

to.native gfx.line [ x1 y1 x2 y2 ] {
    "
        const { ctx } = this.scope.__global__.__graphics__;
        ctx.beginPath();
        ctx.moveTo({{X1}}, {{Y1}});
        ctx.lineTo({{X2}}, {{Y2}});
        ctx.stroke();
    "
}

to.native gfx.width [] {
    "
        const { width, ctx }= this.scope.__global__.__graphics__;
        return this.Token.box(width);
    "
}

to.native gfx.height [] {
    "
        const { height, ctx }= this.scope.__global__.__graphics__;
        return this.Token.box(height);
    "
}

to.native gfx.clear [] {
    "
        const { width, height, ctx }= this.scope.__global__.__graphics__;
        ctx.clearRect(0, 0, width, height);
    "
}

to.native gfx.rect.fill [ x y w h ] {
    "
        const { ctx } = this.scope.__global__.__graphics__;
        ctx.rect({{X}}, {{Y}}, {{W}}, {{H}});
        ctx.fill();
    "
}

to gfx.test [] {

    gfx.init
    gfx.set.size 640 480

    x1 = 0
    y1 = 0
    x2 = gfx.width
    y2 = gfx.height

    repeat ((x2 / 10) + 1) [
        gfx.stroke.color color.random
        gfx.line x1 y1 x2 y2
        x1 = (x1 + 10)
        x2 = (x2 - 10)
    ]

    x1 = 0
    y1 = 0
    x2 = gfx.width
    y2 = gfx.height

    repeat ((y2 / 10) + 1) [
        gfx.stroke.color color.random
        gfx.line x1 y1 x2 y2
        y1 = (y1 + 10)
        y2 = (y2 - 10)
    ]

}
`;
