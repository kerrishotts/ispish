export default `
to.native math.random [ ] {
    "
        return this.Token.box(Math.random());
    "
}

to math.random.between [ l h ] {
    r = math.random
    d = (h - l)
    l + (r * d)
}

to.native math.sin [ r ] {
    "
        return this.Token.box(Math.sin({{R}}));
    "
}

to.native math.cos [ r ] {
    "
        return this.Token.box(Math.cos({{R}}));
    "
}

to.native math.pi [ ] {
    "
        return this.Token.box(Math.PI);
    "
}

to math.from.deg.to.rad [ d ] {
    d * ( math.pi / 180 )
}

to math.from.rad.to.deg [ r ] {
    r / ( math.pi / 180 )
}

`;
